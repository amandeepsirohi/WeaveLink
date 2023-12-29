## Welcome to WeaveLink , where we take threads to a whole new level of togetherness! 🎉

Why WeaveLink?
Because, let's face it, threads were tired of being the lonely strings of the internet. They wanted a party, a carnival, a circus of connections! So, i decided to clone them(afterall it's a clone of X(twitter)😬), because who wouldn't want more of a good thing?

## Introduction

WeaveLink is a full-stack web application built using the MERN (MongoDB, Express, React, Node.js) stack. It is a platform for users to engage in meaningful discussions and share their thoughts on various topics. The application allows users to create threads, post comments, and interact with other users in a dynamic and user-friendly environment.

## Features

>- <h4> User Authentication</h4> Users can sign up, log in, and log out securely. Passwords are encrypted before storage.

>- <h4>Post Creation</h4> Users can create new pots on a wide range of topics. They can provide a title and photo.

>- <h4>Comments</h4> Users can post comments on existing posts, enabling discussions and interactions within the community.

>- <h4>Real-time Updates</h4> The app employs recoil to provide better state management when new posts or comments are posted.

>- <h4>Upvoting</h4> Users can upvote posts , allowing for the recognition of quality content.

>- <h4>User Profiles</h4> Each user has a profile page displaying their activity, including posts they've created and comments they've posted.

## Installation
clone the repo
```console
git clone https://github.com/amandeepsirohi/WeaveLink.git
```

## Install server dependencies
```console
cd backend
npm install
```

## Install client dependencies
```console
cd frontend
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
cd backend
nodemon server.js
```
### Start the client
```console
cd frontend
npm run dev
```

## Usage
> - Open your web browser and go to http://localhost:3000
> - Sign up or log in and start sharing your thoughts.

## Server (Node.js / Express.js)
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

```
Threads_app
├─ README.md
├─ backend
│  ├─ .env
│  ├─ controllers
│  │  ├─ postController.js
│  │  └─ userController.js
│  ├─ db
│  │  └─ connectDB.js
│  ├─ middleware
│  │  └─ protectRoute.js
│  ├─ models
│  │  ├─ postModel.js
│  │  └─ userModel.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ routes
│  │  ├─ postRoutes.js
│  │  └─ userRoutes.js
│  ├─ server.js
│  └─ utils
│     └─ helpers
│        └─ generateTokenAndSetCookie.js
└─ frontend
   ├─ .eslintrc.cjs
   ├─ README.md
   ├─ index.html
   ├─ package-lock.json
   ├─ package.json
   ├─ public
   │  ├─ dark-logo.svg
   │  ├─ elon.jpg
   │  ├─ elon_icon.jpg
   │  ├─ favicon.png
   │  ├─ jack_icon.webp
   │  ├─ light-logo.svg
   │  ├─ post1.png
   │  ├─ post2.png
   │  ├─ post3.png
   │  ├─ verified.png
   │  ├─ zuck-avatar.png
   │  └─ zuckstare.webp
   ├─ src
   │  ├─ App.jsx
   │  ├─ atom
   │  │  ├─ authAtom.js
   │  │  ├─ postsAtom.js
   │  │  └─ userAtom.js
   │  ├─ components
   │  │  ├─ Actions.jsx
   │  │  ├─ Comment.jsx
   │  │  ├─ CreatePost.jsx
   │  │  ├─ Header.jsx
   │  │  ├─ LogoutButton.jsx
   │  │  ├─ Post.jsx
   │  │  ├─ SignupCard.jsx
   │  │  ├─ UserHeader.jsx
   │  │  ├─ UserPost.jsx
   │  │  └─ loginCard.jsx
   │  ├─ index.css
   │  ├─ main.jsx
   │  └─ pages
   │     ├─ AuthPage.jsx
   │     ├─ HomePage.jsx
   │     ├─ PostPage.jsx
   │     ├─ UpdateProfilePage.jsx
   │     └─ UserPage.jsx
   └─ vite.config.js

```