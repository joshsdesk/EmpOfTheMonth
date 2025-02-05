import { pool } from "./connection.js";
import figlet from "figlet";
const displayTitle = () => {
    console.log("\n");
    console.log(figlet.textSync("Employee Manager", {
        font: "Big",
        horizontalLayout: "default",
        verticalLayout: "default"
    }));
    console.log("\n");
};
displayTitle(); // Show title when app starts
export default class Db {
    constructor() {
        Object.defineProperty(this, "exit", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
    }
    async query(sql, args = []) {
        const client = await pool.connect();
        try {
            const result = await client.query(sql, args);
            return result;
        }
        catch (error) {
            console.error(error);
        }
        finally {
            client.release();
        }
    }
    findAllEmployees() {
        const sql = `
        SELECT employee.id, employee.first_name, employee.last_name, 
        role.title, department.name AS department, role.salary, 
        CONCAT(manager.first_name, ' ', manager.last_name) AS manager
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee manager ON manager.id = employee.manager_id;
    `;
        return this.query(sql);
    }
    viewEmployeesByManager(manager) {
        const sql = `SELECT * FROM employee WHERE manager_id = '${manager}'`;
        return this.query(sql);
    }
    ViewEmployeesByDepartment(department) {
        const sql = `SELECT employee.first_name, employee.last_name, role.title, department.name AS department_name, employee.manager_id FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE department.name = '${department}' ORDER BY employee.last_name, employee.first_name;`;
        return this.query(sql);
    }
    addNewEmployee(employee) {
        const { first_name, last_name, role_id, manager_id } = employee;
        const sql = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)";
        return this.query(sql, [first_name, last_name, role_id, manager_id]);
    }
    updateEmployeeRole(update) {
        const { name, role_id } = update;
        const sql = `UPDATE employee SET role_id = ${role_id} WHERE id = ${name}`;
        this.query(sql);
    }
    findAllRoles() {
        const sql = "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;";
        return this.query(sql);
    }
    findAllDepartments() {
        const sql = "SELECT * FROM department";
        return this.query(sql);
    }
    addRole(role) {
        const { role_title, role_salary, department_id } = role;
        const sql = "INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)";
        return this.query(sql, [role_title, role_salary, department_id]);
    }
    addDepartment(department_name) {
        const sql = "INSERT INTO department (name) VALUES ($1)";
        return this.query(sql, [department_name]);
    }
    chooseNewManager(newManager, employee) {
        const sql = `UPDATE employee SET manager_id = ${newManager} WHERE id = ${employee}`;
        return this.query(sql);
    }
    deleteDepartment(deletedDepartment) {
        const sql1 = `DELETE FROM employee WHERE role_id IN (SELECT id FROM role WHERE department_id = ( SELECT id FROM department WHERE name = '${deletedDepartment}') );
    DELETE FROM role WHERE department_id = (SELECT id FROM department WHERE name = '${deletedDepartment}'); DELETE FROM department WHERE name = '${deletedDepartment}';`;
        return this.query(sql1);
    }
    totalSalary() {
        const sql = "SELECT SUM(r.salary) AS total_salary FROM employee e JOIN role r ON e.role_id = r.id;";
        return this.query(sql);
    }
    quit() {
        this.exit = true;
    }
}
