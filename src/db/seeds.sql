 
\c department_db

-- epartment table
INSERT INTO department ( name) VALUES
('Engineering'),
('Finance'),
('Human Resources'),
('Marketing');

-- role table
INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 90000, 1),
('Data Analyst', 75000, 1),
('Accountant', 70000, 2),
('HR Specialist', 65000, 3),
('Marketing Manager', 80000, 4);

--  employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Robert', 'Brown', 3, NULL),
('Emily', 'Davis', 4, NULL),
('Michael', 'Wilson', 5, 3);