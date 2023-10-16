## Welcome to WeaveLink , where we take threads to a whole new level of togetherness! 🎉

Why WeaveLink?
Because, let's face it, threads were tired of being the lonely strings of the internet. They wanted a party, a carnival, a circus of connections! So, i decided to clone them(afterall it's a clone of X(twitter)😬), because who wouldn't want more of a good thing?

## Introduction

WeaveLink is a full-stack web application built using the MERN (MongoDB, Express, React, Node.js) stack. It is a platform for users to engage in meaningful discussions and share their thoughts on various topics. The application allows users to create threads, post comments, and interact with other users in a dynamic and user-friendly environment.

## Features

>- <h4> User Authentication</h4> Users can sign up, log in, and log out securely. Passwords are encrypted before storage.

>- <h4>Thread Creation</h4> Users can create new threads on a wide range of topics. They can provide a title and photo.

>- <h4>Comments</h4> Users can post comments on existing posts, enabling discussions and interactions within the community.

>- <h4>Real-time Updates</h4> The app employs WebSocket technology to provide real-time updates when new threads or comments are posted.

>- <h4>Upvoting</h4> Users can upvote posts , allowing for the recognition of quality content.

>- <h4>User Profiles</h4> Each user has a profile page displaying their activity, including threads they've created and comments they've posted.

## Installation
clone the repo
```console
git clone https://github.com/amandeepsirohi/WeaveLink.git
```

## Install server dependencies
```console
cd api
npm install
```

## Install client dependencies
```console
cd client
npm install
```

## Set up environment variables
```console
MONGO_URI=your_mongo_db_connection_string
SECRET_KEY=your_secret_key_for_jwt
CLOUDINARY_CLOUD_NAME=cloud_name
CLOUDINARY_API_KEY=cloud_api_key
CLOUDINARY_API_SECRET=api_secret
```

## Start the server and client

### Start the server
```console
cd api
nodemon server.js
```
### Start the client
```console
cd clinet
npm run dev
```

## Usage
> - Open your web browser and go to http://localhost:3000
> - Sign up or log in and start sharing your thoughts.

### Server (Node.js / Express.js)
> - Express.js
> - Mongoose
> - bcryptjs
> - dotenv
> - cloudinary

## Client (React.js)
> - React
> - React Router
> - recoil
> - Chakra UI

## Authentication 
> - JWT (JSON Web Tokens)
