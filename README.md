# Chatify-Server

## About
Chatify is a web app that allows users create their personal account, send and search messages. Beside text, users can also send image. This is a server-side that created with Node.js and Express.js. It uses PostgreSQL as its database. [Frontend part](https://github.com/deaedria/chatify-react-ui.git) is built using React, Redux. 

## Getting started

To get the Node server running locally:

* Clone this repo with `git clone https://github.com/deaedria/chatify-server.git`
* `cd chatify-server`
* `yarn install` to install all required dependencies
* Create a `.env` file and reference the `env.example` file
* `yarn start` to start the local server

## Folder Structure

    ├── controllers                    
    │   ├── Chatlist.js              
    │   ├── Contact.js              
    │   ├── ContactListEachUser.js             
    │   ├── Message.js
    |   └── User.js
    ├── helpers
    │   ├── connector.js
    │   ├── fromResponse.js              
    │   ├── fromUpload.js             
    |   └── verifyToken.js
    ├── models
    │   ├── Chatlist.js              
    │   ├── Contact.js              
    │   ├── ContactListEachUser.js             
    │   ├── Message.js
    |   └── User.js
    ├── routes            
    │   ├── Upload.js    
    │   ├── index.js
    │   ├── Chatlist.js              
    │   ├── Contact.js              
    │   ├── ContactListEachUser.js             
    │   ├── Message.js
    |   └── User.js
    └── index.js
    
## Documentation
Open [Postman Collection](https://documenter.getpostman.com/view/14707903/Tz5p6dWQ)
    
## Endpoints

when put under a domain with `PREFIX_URI`, it would look like:

    https://www.example.com/api/v1/users
    
**Authentication**

    POST     /users/login
    POST     /users/register

**User** endpoint

    GET      /users
    GET      /users/get_user?id=1
    POST     /users
    POST     /users/search_user?name=a
    PATCH    /users/1
    DEL      /users/1

**Contact** endpoint

    GET      /contacts
    GET      /contacts/1
    POST     /contacts
    POST     /contacts/search_contact?name=a
   
**User's contact list** endpoint

    GET      /contactlist/user_id?id=1
    POST     /contactlist/user_id?id=1
    PATCH    /contactlist/1
    DEL      /contactlist/1

**Paginate**

    POST     /users?limit=4&page=2
