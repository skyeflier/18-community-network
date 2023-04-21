# <Community-Network>

## Description
This is a social network API that allows users to create, update, and delete users, thoughts, reactions, and friends. The API is built with Express.js, MongoDB, and Mongoose.

## Table of Contents
- [Installation](#installation)
- [Useage](#useage)
- [Credits](#credits)
- [License](#License)

## Installation
To run this application, you will need to have Node.js and MongoDB installed on your local machine.

Clone the repository onto your local machine
Run npm install in the root directory to install the necessary dependencies
Create a .env file in the root directory and add the following environment variables:
makefile

Copy code below:
MONGODB_URI=<your MongoDB URI>
JWT_SECRET=<your JWT secret key>

Run npm start in the root directory to start the server
Use a tool like Insomnia or Postman to test the API routes.

## Usage
GET Routes
/api/users: retrieves all users
/api/users/:id: retrieves a single user by id
/api/thoughts: retrieves all thoughts
/api/thoughts/:id: retrieves a single thought by id

POST Routes
/api/users: creates a new user
/api/thoughts: creates a new thought

PUT Routes
/api/users/:id: updates a user by id
/api/thoughts/:id: updates a thought by id

DELETE Routes
/api/users/:id: deletes a user by id
/api/thoughts/:id: deletes a thought by id

Reactions
/api/thoughts/:thoughtId/reactions: adds a new reaction to a thought
/api/thoughts/:thoughtId/reactions/:reactionId: deletes a reaction to a thought

Friends
/api/users/:userId/friends/:friendId: adds a new friend to a user's friend list
/api/users/:userId/friends/:friendId: deletes a friend from a user's friend list

## Credits
This application was created by https://github.com/skyeflier

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.