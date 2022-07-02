# Employee-Tracker


This application allows for a user to update and track employees within their company. A user is presented with a starter prompt that allows a user to enter the action they wish to complete and inlude : 'View all departments?','View all roles?', 'View all employees?','Add new department?','Add new employee?','Add new role?','Update Employee Role?', 'EXIT?'. Each choice corresponds to an action and the view choices build out the current table for that portion and the add or update choices prompt a user for input to either add a new data piece or update an established one. Viewing all employees pulls information from all three tables which are established in the db/schema.sql. 

To run this application the user must first have Node.js and initialize the application as such, they must install the mysql2 package to create the database, console.table to create and output tables, and inquirer to allow for inputs from the user. Once these are met a user must then enter "npm start" from the command line. 
                    
https://watch.screencastify.com/v/wHFXmxzRHCjzcHkATJxC

The first video doesn't include an example of the Update Role Function, this video includes just that last portion : https://watch.screencastify.com/v/XlIyDOQCxwAy690cNCFX


![2022-07-01](https://user-images.githubusercontent.com/100645317/176984278-ab5a82ed-bc57-4a90-9e95-64494effb596.png)
