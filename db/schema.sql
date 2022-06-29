DROP DATABASE IF EXISTS employeeTracker_DB;
CREATE DATABASE employeeTracker_DB;

USE employeeTracker_DB;
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS departmentRole;
DROP TABLE IF EXISTS employee;

CREATE TABLE department(
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id) 
);

CREATE TABLE departmentRole(
    id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department (id)
)

CREATE TABLE employee(
    id INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role (id)
)


SELECT * FROM department;
SELECT * FROM departmentRole;
SELECT * FROM employee;