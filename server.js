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

// prompts user with list of options to choose from
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
                    case 'EXIT?': 
                        connection.end();
                        break;
                   
                }
        })
};

function viewDepartmentInfo() {
    const query = "SELECT * FROM  departmentInfo";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      startPrompt();
    });
  }
  
  function viewDepartmentRole() {
    const query = "SELECT * FROM departmentRole";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      startPrompt();
    });
  }
  
  function viewEmployeeInfo() {
    const query = 'SELECT * FROM employeeInfo INNER JOIN departmentRole ON employeeInfo.role_id = departmentRole.id';
    connection.query(query, function(err, res) {
      if (err) throw err;
     console.table(res);
      startPrompt();
    });
  }

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

function updateRole(){
    inquirer.prompt
}
