/* Creates database and tables and their corresponding values using mysql*/
DROP DATABASE IF EXISTS employeeTracker_DB;
CREATE DATABASE employeeTracker_DB;

USE employeeTracker_DB;


CREATE TABLE departmentInfo(
    id INTEGER NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id) 
);

CREATE TABLE departmentRole(
    id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL ,
    PRIMARY KEY (id),
     FOREIGN KEY (department_id) REFERENCES departmentInfo (id)
    
);

CREATE TABLE employeeInfo(
    id INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER,
   
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES departmentRole (id)
    
);


SELECT * FROM departmentInfo;
SELECT * FROM departmentRole;
SELECT * FROM employeeInfo;