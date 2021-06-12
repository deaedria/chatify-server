## Chatify-Server

This is a ExpressJs-based API for [frontend project](https://github.com/deaedria/chatify-react-ui.git). It uses PostgreSQL as its database

## Getting started

To get the Node server running locally:

* Clone this repo with `git clone https://github.com/deaedria/chatify-server.git`
* `cd chatify-server`
* `yarn install` to install all required dependencies
* Create a `.env` file and reference the `.env.example` file
* `yarn test` to start the local server

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
    
## Endpoints

user endpoint

    GET      /users
    GET      /users/get_user?id=1
    POST     /users
    POST     /users/search_user?name=a
    PATCH    /users/1
    DEL      /users/1

contact endpoint

    GET      /contacts
    GET      /contacts/1
    POST     /contacts
    POST     /contacts/search_contact?name=a
   
user's contact list endpoint

    GET      /contactlist/user_id?id=1
    POST     /contactlist/user_id?id=1
    PATCH    /contactlist/1
    DEL      /contactlist/1

authentication

    POST     /users/login
    POST     /users/register

when put under a domain with `PREFIX_URI`, it would look like:

    https://www.example.com/api/v1/users

Paginate

    POST     /users?limit=4&page=2
