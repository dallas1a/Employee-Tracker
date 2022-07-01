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
                    'View all employees',
                    'View all departments',
                    'View all roles',
                    'EXIT'
                    ]
            }).then(function (answer) {
                switch (answer.option) {
                    case 'View all employees':
                        viewEmployeeInfo();
                        break;
                    case 'View all departments':
                        viewDepartmentInfo();
                        break;
                    case 'View all roles':
                        viewDepartmentRole();
                        break;
                    
                    case 'EXIT': 
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
    const query = "SELECT * FROM employeeInfo";
    connection.query(query, function(err, res) {
      if (err) throw err;
     console.table(res);
      startPrompt();
    });
  }