# Canteen-Management-System
The Project is aimed at solving various issues involved during the ordering of food from Night Canteens. It aims at providing an organized, dynamic platform for handling concurrent requests. Customers can place orders on this platform by using the intuitive interface. They can view all the Night Canteens on the website with their Menus. Customers can choose an NC and place orders. The NC can accept or reject an order based on the situation.

## Installation

1. Install Node JS  
https://nodejs.org/en/ for windows  
```sudo apt-get nodejs``` for Ubuntu

1. Install MySql workbench and MySql Server (while installing please create a password for root and always use root)
https://downloads.mysql.com/archives/installer/ (8.0 version)

1. Create a connection with user : root and use password for root and remember the connection address

1. Clone the repo

1. Installing packages required for building and using the packages
   1. ```npm install```
   1. cd into ```client``` folder and ```npm install```

1. In the root directory (outside client) setup a .env file with the following variables
   1. ```mysqlpassword = <your MySql password for root user>```
   1. ```secret = <any random string>```
   1. ```jwt_secret = <any random string>```
 
1. Setting up the database:  Using the root user on your workbench execute the ```FinalSqlScript.sql``` on the workbench to create the schema and the tables.

1. Run the script ```npm run dev``` to run the node js server and react app concurrently. (see package,json for ither scripts).


### Workflow
1. Create a branch from ```develop```
1. Push your changes to your branch and make a PR to ```develop``` branch alone.
