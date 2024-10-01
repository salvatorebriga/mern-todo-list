A simple Api Service for CRUD operation for a ToDo App with validation

run these command:

    cd todos-express-api
    npm i nodemon --save-dev
    npm i
    npm start

But first copy the .env.examples file and rename as .env and add your db connection credentials.
If you are using MAMP or XAMP check the port for PHPMyAdmin (if is default no problem, go ahead), and in case modify the port in config/db.js.
Ultimately you have to manually create a db into phpMyAdmin and run the command:

    npx sequelize-cli db:migrate

The request must be a Content-Type = application/json, and in the body of the request just the title.
If are you using postman, in the head of the request add Content-Type with his value, and in the body select 'raw' and sent a JSON with 'title' as a key
Api endpoints:

    GET http://your-local-host/api/todos -> for all the todos
    GET http://your-local-host/api/todos/:id -> for a specific todos
    POST http://your-local-host/api/todos -> with title as query parameters
    PUT http://your-local-host/api/todos/:id -> with the new title as query parameters
    DELETE http://your-local-host/api/todos/:id -> for delete a specific todos
