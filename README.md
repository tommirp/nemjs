# NEMjs
Current Version : 0.5

NEMjs is Nodejs + Expressjs + Mongodb/Mysql.
NEMjs is Open Source & Created just for Nodejs beginner.
NEMjs is permissible to develop again.
NEMjs created only to make it easier for developers who need a ready-to-use web server side template

Follow this step for getting start :
```
1. Clone this project
2. Go to the folder
3. Install dependencies by terminal => 'npm install'
4. Run the app by terminal => 'npm start'
```

## Development instructions :

### Client Folder
The Client folder contains all asset files that can be accessed publicly and contains an html asset folder to display UI or app content

### Config Folder
Contains configuration file notation for database accounts, e-mail, port settings and others. The configuration file is divided into 2:

Default (for development environment) and Production environment.

By default the app will run in the development environment.

### Server Folder
Contains main modules, functions and programming logic.

The file server implementation is divided into 3 types:
1. Router as the application endpoint manager.
2. Controller as manager of core programming logic.
3. Then the Model is the manager of access to the database and processing logic and data storage.

Then there is the helpers sub folder as a collection of middleware and additional functions needed

### app.js
The main configuration of the application, here all initial configuration forms such as parsers, cookies, sessions and handler errors are set.

### server.js
The main place for setting up the server and running the application on the server.

### Package.json
The place to record package usage and dependencies is stored.

### node_modules
The place where to store all the installed dependencies

### This Project use Recommended Eslint Standard
To harmonize the neat and good coding process, NEMjs is equipped with eslint that will maintain the coding performance to be harmonious and neat and minimize human errors in writing code.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
