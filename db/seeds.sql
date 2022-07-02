/* Creates seeds to insert for initial values that are constructed in the schema using mysql*/

USE employeeTracker_DB;



INSERT INTO departmentInfo
    (dept_name)
VALUES
("Human Resources"),
("Payroll"),
("Information Technology"),
("Sales"),
("Logistics");


INSERT INTO departmentRole
    (title, salary, department_id)
VALUES
("manager", 81000.00, 5),
("i.t technician", 67250.00, 3),
("payroll analyst", 59000.00, 2),
("hr assistant", 45500.00, 1),
("sales person", 75000.00, 4);


INSERT INTO employeeInfo
    (first_name, last_name, role_id, manager_id)
VALUES
("Tyler", "Keith", 1, NULL),
("Phil", "Finta", 2, 1),
("Clay", "Aching", 3, 2),
("Rob", "Cafo", 5, 2),
("Tom", "Riddle", 4, 1);