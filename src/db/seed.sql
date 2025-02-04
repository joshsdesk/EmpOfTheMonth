-- Drop the database if it already exists
\c department_db

-- Insert data into the department table
INSERT INTO department ( name) VALUES
('Engineering'),
('Finance'),
('Human Resources'),
('Marketing');

-- Insert data into the role table
INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 90000, 1),
('Data Analyst', 75000, 1),
('Accountant', 70000, 2),
('HR Specialist', 65000, 3),
('Marketing Manager', 80000, 4);

-- Insert data into the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Robert', 'Brown', 3, NULL),
('Emily', 'Davis', 4, NULL),
('Michael', 'Wilson', 5, 3);
