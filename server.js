//sets all the constants necessary for the application to work and establishes the connection 
const mysql = require('mysql2')

const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
   port:  3306,
    user: "root",
    password: "Qxpvnw21!?!?",
    database: "employeeTracker_DB",
  });


  connection.connect(function(err){
    if (err) throw err;
    startPrompt();
})

// prompts user with list of options to choose from and starts the corresponding function 
function startPrompt() {
    inquirer
        .prompt({
            name: 'option',
            type: 'list',
            message: 'How would you like to proceed?',
            choices: [
                    
                    'View all departments?',
                    'View all roles?',
                    'View all employees?',
                    'Add new department?',
                    'Add new employee?',
                    'Add new role?',
                    'Update Employee Role?',
                    'EXIT?'
                    ]
            }).then(function (answer) {
                switch (answer.option) {
                    case 'View all employees?':
                        viewEmployeeInfo();
                        break;
                    case 'View all departments?':
                        viewDepartmentInfo();
                        break;
                    case 'View all roles?':
                        viewDepartmentRole();
                        break;
                    case 'Add new department?':
                            addNewDepartment();
                            break;
                    case 'Add new employee?':
                    addNewEmployee();
                    break;
                    case 'Add new role?':
                    addNewRole();
                    break;
                    case 'Update Employee Role?':
                    updateRole();
                    break;
                    case 'EXIT?': 
                        connection.end();
                        break;
                   
                }
        })
};
//selects all the table values from departmentInfo, builds and shows the table and re-enters the startPrompt 
function viewDepartmentInfo() {
    const query = "SELECT * FROM  departmentInfo";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      startPrompt();
    });
  }
  //selects all the table values from departmentRole, builds and shows the table and re-enters the startPrompt 
  function viewDepartmentRole() {
    const query = "SELECT * FROM departmentRole";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      startPrompt();
    });
  }
  //selects values from each of the three tables selecting based on column names from each table,
  // joining the tables based on foreign key references in the schema table creations 
  function viewEmployeeInfo() {
    const query = 'SELECT employeeInfo.id, employeeInfo.first_name, employeeInfo.last_name, departmentRole.title, departmentInfo.dept_name AS department, departmentRole.salary FROM employeeInfo LEFT JOIN departmentRole ON employeeInfo.role_id = departmentRole.id LEFT JOIN departmentInfo on departmentRole.department_id = departmentInfo.id';
    connection.query(query, function(err, res) {
      if (err) throw err;
     console.table(res);
      startPrompt();
    });
  }
//adds a new department using inquirer and inserts the data into the departmentInfo Table, showing an updated list after success 
  function addNewDepartment() {
    inquirer
        .prompt([
            {
                name: 'newDept', 
                type: 'input', 
                message: 'Which department would you like to add?'
            }
            ]).then(function (answer) {
                connection.query(
                    'INSERT INTO departmentInfo SET ?',
                    {
                        dept_name: answer.newDept
                    });
                var query = 'SELECT * FROM departmentInfo';
                connection.query(query, function(err, res) {
                if(err)throw err;
                console.log('Your department has been added! Updated List Below:');
                console.table( res);
               startPrompt();
                })
            })
};
//adds a new employee using inquirer and inserts the data into the employeeInfo Table, showing an updated list after success 
function addNewEmployee() {
    inquirer
        .prompt([
            {
                name: 'newFirst', 
                type: 'input', 
                message: 'What is the first name of the employee you would like to add?'
            },
            {
                name: 'newLast', 
                type: 'input', 
                message: 'What is the last name of the employee you would like to add?'
            },
            {
                name: 'newEmployeeRole', 
                type: 'input', 
                message: 'What is the role of this employee?'
            },
            {
            name: 'managerId', 
            type: 'input', 
            message: 'What is the ID# of their manager?'
            }
            ]).then(function (answer) {
                connection.query(
                    'INSERT INTO employeeInfo SET ?',
                    {
                        first_name: answer.newFirst,
                        last_name: answer.newLast,
                        role_id: answer.newEmployeeRole,
                        manager_id: answer.managerId
                    });
                var query = 'SELECT * FROM employeeinfo';
                connection.query(query, function(err, res) {
                if(err)throw err;
                console.log('Your new employee has been added! Updated List Below:');
                console.table( res);
               startPrompt();
                })
            })
};
//adds a new role using inquirer and inserts it into the departmentRole Table, showing an updated list after success 
function addNewRole() {
    inquirer
        .prompt([
            {
                name: 'newTitle', 
                type: 'input', 
                message: 'What is the title of the new role you would like to add?'
            },
            {
                name: 'newSalary', 
                type: 'input', 
                message: 'What is the salary of the new role?'
            },
            {
                name: 'deptID', 
                type: 'input', 
                message: 'What is the department ID# of this role?'
            },
            
            ]).then(function (answer) {
                connection.query(
                    'INSERT INTO departmentRole SET ?',
                    {
                        title: answer.newTitle,
                        salary: answer.newSalary,
                        department_id: answer.deptID,
                        
                    });
                var query = 'SELECT * FROM departmentRole';
                connection.query(query, function(err, res) {
                if(err)throw err;
                console.log('Your new employee has been added! Updated List Below:');
                console.table( res);
               startPrompt();
                })
            })
        };
//updates employee role utilizing inquirer for new information and then inserts that data into the employee who matches the id
function updateRole(){
    inquirer.prompt([
        {
          type: "input",
          message: "Enter the employee's ID# whose role you want to update:",
          name: "updateEmployee"
        },
        {
          type: "input",
          message: "Enter the new role ID# for that employee:",
          name: "newRole"
        }
      ])
      .then(function (res) {
          const updateEmployee = res.updateEmployee;
          const newRole = res.newRole;
          const queryUpdate = `UPDATE employeeInfo SET role_id = "${newRole}" WHERE id = "${updateEmployee}"`;
          connection.query(queryUpdate, function (err, res) {
            if (err) {
              throw err;
            }
            console.table(res);
           startPrompt();
          })
        });
}
