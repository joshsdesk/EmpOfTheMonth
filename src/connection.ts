import { Pool } from 'pg';
import inquirer from 'inquirer';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: 'localhost',
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432, // Default PostgreSQL port
});

// Helper to execute SQL queries
const executeQuery = async (query: string, params?: any[]) => {
  const client = await pool.connect();
  try {
    const res = await client.query(query, params);
    return res.rows;
  } finally {
    client.release();
  }
};

// View all departments
export const viewDepartments = async () => {
  const departments = await executeQuery('SELECT * FROM department');
  console.table(departments);
};

// View all roles
export const viewRoles = async () => {
  const roles = await executeQuery(`
    SELECT role.id, role.title, role.salary, department.name AS department
    FROM role
    JOIN department ON role.department_id = department.id
  `);
  console.table(roles);
};

// View all employees
export const viewEmployees = async () => {
  const employees = await executeQuery(`
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
           CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id
  `);
  console.table(employees);
};

// Add a department
export const addDepartment = async () => {
  const { name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the name of the new department:',
    },
  ]);

  await executeQuery('INSERT INTO department (name) VALUES ($1)', [name]);
  console.log(`Department "${name}" added successfully.`);
};

// Add a role
export const addRole = async () => {
  const departments = await executeQuery('SELECT * FROM department');
  const { title, salary, departmentId } = await inquirer.prompt([
    { type: 'input', name: 'title', message: 'Enter the role title:' },
    { type: 'number', name: 'salary', message: 'Enter the role salary:' },
    {
      type: 'list',
      name: 'departmentId',
      message: 'Select the department for the role:',
      choices: departments.map((dept: any) => ({
        name: dept.name,
        value: dept.id,
      })),
    },
  ]);

  await executeQuery('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [
    title,
    salary,
    departmentId,
  ]);
  console.log(`Role "${title}" added successfully.`);
};

// Add an employee
export const addEmployee = async () => {
  const roles = await executeQuery('SELECT * FROM role');
  const employees = await executeQuery('SELECT * FROM employee');
  const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
    { type: 'input', name: 'firstName', message: 'Enter the employee\'s first name:' },
    { type: 'input', name: 'lastName', message: 'Enter the employee\'s last name:' },
    {
      type: 'list',
      name: 'roleId',
      message: 'Select the employee\'s role:',
      choices: roles.map((role: any) => ({ name: role.title, value: role.id })),
    },
    {
      type: 'list',
      name: 'managerId',
      message: 'Select the employee\'s manager:',
      choices: [{ name: 'None', value: null }].concat(
        employees.map((emp: any) => ({
          name: `${emp.first_name} ${emp.last_name}`,
          value: emp.id,
        }))
      ),
    },
  ]);

  await executeQuery('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [
    firstName,
    lastName,
    roleId,
    managerId,
  ]);
  console.log(`Employee "${firstName} ${lastName}" added successfully.`);
};

// Update an employee role
export const updateEmployeeRole = async () => {
  const employees = await executeQuery('SELECT * FROM employee');
  const roles = await executeQuery('SELECT * FROM role');
  const { employeeId, roleId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: 'Select the employee to update:',
      choices: employees.map((emp: any) => ({
        name: `${emp.first_name} ${emp.last_name}`,
        value: emp.id,
      })),
    },
    {
      type: 'list',
      name: 'roleId',
      message: 'Select the new role:',
      choices: roles.map((role: any) => ({ name: role.title, value: role.id })),
    },
  ]);

  await executeQuery('UPDATE employee SET role_id = $1 WHERE id = $2', [roleId, employeeId]);
  console.log(`Employee role updated successfully.`);
};
