-- Seed Data for Employee Tracker

-- Insert initial data into 'department' table
INSERT INTO department (name) VALUES
('Sales'),
('Engineering'),
('Finance'),
('Human Resources');

-- Insert initial data into 'role' table
INSERT INTO role (title, salary, department_id) VALUES
('Sales Manager', 75000, 1),
('Salesperson', 50000, 1),
('Software Engineer', 90000, 2),
('Lead Engineer', 120000, 2),
('Accountant', 65000, 3),
('HR Specialist', 55000, 4);

-- Insert initial data into 'employee' table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL), -- Manager with no manager
('Jane', 'Smith', 2, 1),
('Alice', 'Johnson', 3, NULL),
('Bob', 'Brown', 4, 3),
('Charlie', 'Davis', 5, NULL),
('Dana', 'White', 6, NULL);
