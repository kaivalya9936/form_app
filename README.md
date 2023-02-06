# Formsy - A form creation/ filling platform

Formsy is a platform which allows admins to create forms, and view reponses and basic analytics for those responses. It also allows users to view forms, and fill them and submit their repsonses.
It uses the MERN stack to achieve its goal.

## Backend

I have used MongoDB as my database for storing and retrieving data, and have used ExpressJS for my backend server.

## Frontend

I have used ReactJS as my ferontend to manage routing, and display various components to users in an interactive manner.

## Getting Started

To get started with Formsy, you will need to have Node.js and npm installed on your machine.

* Clone the repository from https://github.com/kaivalya9936/form_app

### Backend dependencies

Run the following code in the terminal open in the root directory 

```
cd backend
npm install
```

Start the backend server by running 
```
mongod
npm start
```
Note: Run both of the above commands in differnt terminals.

### Frontend dependencies
Run the following commands in a separate terminal
```
cd frontend
npm install
```

Start the frontend by running ```npm start```
 
The application should now be running on http://localhost:3000

## Features
* Admins can create forms and view responses and analytics
* Users can view and fill forms and submit their responses
* Dynamic form creation using MongoDB database
