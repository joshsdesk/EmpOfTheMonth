# Employee Tracker

## Description

The **Employee Tracker** is a command-line application that allows business owners to view and manage company departments, roles, and employees. This content management system (CMS) helps organize and plan business operations efficiently by using **Node.js, Inquirer, and PostgreSQL**.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Database Schema](#database-schema)
- [License](#license)

## Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```sh
   cd employee-tracker
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Install Inquirer package version 8.2.4:
   ```sh
   npm i inquirer@8.2.4
   ```
5. Set up the PostgreSQL database by running the provided schema and seeds files.
6. Update database credentials in the `.env` file (if applicable).

## Usage

1. Start the application:
   ```sh
   node index.js
   ```
2. Select options from the command-line menu to view and manage employees, roles, and departments.
3. Follow the prompts to add, update, or delete records in the database.

## Features

- View all departments, roles, and employees
- Add new departments, roles, and employees
- Update employee roles
- User-friendly command-line interface

### Bonus Features:
- Update employee managers
- View employees by manager
- View employees by department
- Delete departments, roles, and employees
- View total budget utilization by department

## Demo

Watch the application in action:
[![Demo Video](./Assets/12-sql-homework-video-thumbnail.png)](https://2u-20.wistia.com/medias/2lnle7xnpk)

## Technologies Used

- **Node.js**
- **Inquirer.js** (8.2.4)
- **PostgreSQL**
- **pg package**

## Database Schema

The application follows the schema below:

- **Department Table**
  - `id`: SERIAL PRIMARY KEY
  - `name`: VARCHAR(30) UNIQUE NOT NULL

- **Role Table**
  - `id`: SERIAL PRIMARY KEY
  - `title`: VARCHAR(30) UNIQUE NOT NULL
  - `salary`: DECIMAL NOT NULL
  - `department_id`: INTEGER NOT NULL (foreign key to Department)

- **Employee Table**
  - `id`: SERIAL PRIMARY KEY
  - `first_name`: VARCHAR(30) NOT NULL
  - `last_name`: VARCHAR(30) NOT NULL
  - `role_id`: INTEGER NOT NULL (foreign key to Role)
  - `manager_id`: INTEGER (foreign key to Employee, nullable)

## License

This project is licensed under the MIT License.

## Questions
Github: https://github.com/joshsdesk/EmpOfTheMonth

For additional questions, contact JoshsDesk@gmail.com

