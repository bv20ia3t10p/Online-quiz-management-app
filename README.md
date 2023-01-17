# Online-quiz-managment-app

- Online quiz app with mysql database using react, xampp and php

# Accessibility

- Best viewed on Firefox at 150% FHD display zoom

# Running on local machine

- Requires Node.js

* Move to projects directory (e.g cd D:/Online-quiz-managment-app) then run the following commands:
* npm install
* npm install react-router-dom
* npm install react-icons
* npm install --save chart.js react-chartjs-2
* npm start

# Database

- The project communicates with MYSQL database through a local server hosted by xampp
- To establish connection with database navigate to 'src/setup/Context.js' and change the value for 'phpHandler' property in 'initialState' variable

# Database creation

- Navigate to 'database' for database creation, data inserts and php file

# PHP

- Uses default values for database config, should be changed to match current's host if not running by default settings

# Designated test users (ID/pw):

- Student: 20521/123
- Lecturer: 8081/456
- Admin: 9900/admin
