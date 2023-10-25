# Tumult - Discord-like Web Application

Welcome to Tumult, your go-to destination for creating and managing online communities with ease! Tumult is an open-source project that brings the power of communication and collaboration to your fingertips. Whether you're a gaming group, a study club, or just a bunch of friends looking to argue, Tumult provides you with all the tools you need to forge your exclusive battleground where you belong. Come check out our live application at:

[https://tumult.onrender.com/](https://tumult.onrender.com/)

## Tech Stack

### Frameworks and Libraries

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Babel](https://img.shields.io/badge/Babel-F9DC3e?style=for-the-badge&logo=babel&logoColor=black)

### Database

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

### Hosting

![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

## ReadMe Table of Contents

- [Project Wiki](https://github.com/BoJamesH/tumult-project/wiki)
- [Database Schema](https://github.com/BoJamesH/tumult-project/wiki#database-schema)
- [Features](#features)
- [Contributing](#contributing)
- [Getting Started](#getting-started)
- [Local Development](#local-development)
- [Deployment on Render.com](#deployment-on-rendercom)

## Previews

### Landing Page
![tumult-landing-gif](https://github.com/BoJamesH/tumult-project/assets/128858490/90afda07-54c0-45bf-bbaf-0489842431f6)

### Server/Channel Selection
![tumult-server-selection-gif](https://github.com/BoJamesH/tumult-project/assets/128858490/de464d6e-199e-4e28-a6b5-acf6b2c35da7)

### Chat/Reactions
![tumult-chat-reaction-gif](https://github.com/BoJamesH/tumult-project/assets/128858490/46a7aeb2-7bca-46b6-9ee7-d9a2265b0f3d)

### Server Create / Update
![tumult-create-update-server-gif](https://github.com/BoJamesH/tumult-project/assets/128858490/94e56c03-1fba-4e72-a816-92d759e5d584)

## Contributing

If you'd like to contribute to Tumult, please check out our team members' GitHub profiles:
- [Bo](https://github.com/BoJamesH)
- [Jordan](https://github.com/Jordo707)
- [Nick](https://github.com/nita94)
- [Ryan](https://github.com/RjRosales19)

## Endpoints
### Auth
| Request                        | Purpose                | Return Value  |
| :----------------------------- | :--------------------: | :------------------------------ |
| GET /api/auth/        | This fetch is sent upon initial app load and on subsequent refreshes.<br>It returns an object representing the current user, if user is logged in.                                 | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'username': STRING,<br>&nbsp;&nbsp;&nbsp;'email': STRING,<br>&nbsp;&nbsp;&nbsp;'display_name': STRING,<br>&nbsp;&nbsp;&nbsp;'created_at': DATETIME,<br>&nbsp;&nbsp;&nbsp;'updated_at': DATETIME,<br>}<br><br>Status: 200<br>|
| POST /api/auth/unauthorized      | This endpoint will be routed to in the case that a protected route does not pass validations for the current user.<br>It returns an object with an errors property, which is an array with the value 'Unauthorized'          | {<br>&nbsp;&nbsp;&nbsp;'errors': ARRAY[STRINGS]<br>}<br><br>Status: 401<br>|
| POST /api/auth/signup        | This fetch sends the form data signup from data to the backend to process the creation of a new user.<br>It returns an object representing the current user, after logging them in, if account creation succeeds.                                 | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'username': STRING,<br>&nbsp;&nbsp;&nbsp;'email': STRING,<br>&nbsp;&nbsp;&nbsp;'display_name': STRING,<br>&nbsp;&nbsp;&nbsp;'created_at': DATETIME,<br>&nbsp;&nbsp;&nbsp;'updated_at': DATETIME,<br>}<br><br>Status: 200<br>|
| POST /api/auth/login | This fetch attempts to login a user with the provided credentials.<br>It returns an object representing the current user, if validation succeeds.                                 | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'username': STRING,<br>&nbsp;&nbsp;&nbsp;'email': STRING,<br>&nbsp;&nbsp;&nbsp;'display_name': STRING,<br>&nbsp;&nbsp;&nbsp;'created_at': DATETIME,<br>&nbsp;&nbsp;&nbsp;'updated_at': DATETIME,<br>}<br><br>Status: 200<br>|
| POST /api/auth/logout | This fetch will logout the current user.<br>It returns an object with the message 'User logged Out' if it succeeds.                                 | {<br>&nbsp;&nbsp;&nbsp;'message': STRING<br>}<br><br>Status: 200<br>|

### Server
| Request                        | Purpose                | Return Value  |
| :----------------------------- | :--------------------: | :------------------------------ |
| GET /api/servers       | This fetch retrieves a list of all servers.                 | [ {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'name': STRING,<br>&nbsp;&nbsp;&nbsp;'owner_id': INT,<br>&nbsp;&nbsp;&nbsp;'label_image': STRING,<br>&nbsp;&nbsp;&nbsp;'private': Boolean,<br>&nbsp;&nbsp;&nbsp;'created_at': DATETIME,<br>&nbsp;&nbsp;&nbsp;'updated_at': DATETIME}]<br><br>Status: 200<br>|
| GET /api/servers/<server_id>        | This fetch is sent to retrieve information for a specific server.                 | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'name': STRING,<br>&nbsp;&nbsp;&nbsp;'owner_id': INT,<br>&nbsp;&nbsp;&nbsp;'label_image': STRING,<br>&nbsp;&nbsp;&nbsp;'private': Boolean,<br>&nbsp;&nbsp;&nbsp;'created_at': DATETIME,<br>&nbsp;&nbsp;&nbsp;'updated_at': DATETIME}<br><br>Status: 200<br>|
| POST /api/servers       | This fetch is used to create a new server                | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'name': STRING,<br>&nbsp;&nbsp;&nbsp;'owner_id': INT,<br>&nbsp;&nbsp;&nbsp;'label_image': STRING,<br>&nbsp;&nbsp;&nbsp;'private': Boolean,<br>&nbsp;&nbsp;&nbsp;'created_at': DATETIME,<br>&nbsp;&nbsp;&nbsp;'updated_at': DATETIME}<br><br>Status: 200<br>|
| DELETE /api/servers/<server_id> | This fetch is used to delete a server. | {<br>&nbsp;&nbsp;&nbsp;'message': STRING<br>}<br><br>Status: 200<br>
| PUT /api/servers/<server_id> | This fetch is used to edit a server. | {<br>&nbsp;&nbsp;&nbsp;'message': STRING<br>}<br><br>Status: 200<br>


### Channel
| Request                        | Purpose                | Return Value  |
| :----------------------------- | :--------------------: | :------------------------------ |
| GET /api/channels/<server_id>       | This fetch retrieves a list of all channels for a given server.                 | [ {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'name': STRING,<br>&nbsp;&nbsp;&nbsp;'owner_id': INT,<br>&nbsp;&nbsp;&nbsp;'server_id': INT,<br>&nbsp;&nbsp;&nbsp;'private': Boolean,<br>&nbsp;&nbsp;&nbsp;'created_at': DATETIME,<br>&nbsp;&nbsp;&nbsp;'updated_at': DATETIME}]<br><br>Status: 200<br>|
| POST /api/channels/<server_id>        | This fetch is used to create a new channel within a server.                 | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'name': STRING,<br>&nbsp;&nbsp;&nbsp;'owner_id': INT,<br>&nbsp;&nbsp;&nbsp;'server_id': INT,<br>&nbsp;&nbsp;&nbsp;'private': Boolean,<br>&nbsp;&nbsp;&nbsp;'created_at': DATETIME,<br>&nbsp;&nbsp;&nbsp;'updated_at': DATETIME}<br><br>Status: 200<br>|
| PUT /api/channels/<channel_id>       | This fetch is used to edit an existing channel.                | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'name': STRING,<br>&nbsp;&nbsp;&nbsp;'owner_id': INT,<br>&nbsp;&nbsp;&nbsp;'server_id': INT,<br>&nbsp;&nbsp;&nbsp;'private': Boolean,<br>&nbsp;&nbsp;&nbsp;'created_at': DATETIME,<br>&nbsp;&nbsp;&nbsp;'updated_at': DATETIME}<br><br>Status: 200<br>|
| DELETE /api/channels/<channel_id> | This fetch is used to delete a channel. | {<br>&nbsp;&nbsp;&nbsp;'message': STRING<br>}<br><br>Status: 200<br>
|

## Features

- **Topic-Based Channels**: Tumult allows you to organize your server with channels dedicated to different topics, making it easy to keep your discussions clean and well-organized.
- **Real-Time Voice and Video**: Experience the thrill of low-latency voice and video calls that create a sense of being in the same room, whether you're gaming with friends or having a virtual meeting.
- **Effortless Collaboration**: Collaborate, share, and have meaningful conversations without cluttering up a group chat, thanks to Tumult's easy-to-use interface.
- **Instant Access**: Join text channels with unparalleled ease whenever you're available, and let friends drop in for a quick chat without the need for a formal call.
- **Moderation and Customization**: Tailor your server to your exact specifications with Tumult's robust moderation tools and customizable member access, giving you complete control over your online community.
- **Full Emoji-Reaction capability using emoji-picker-react** at [emoji-picker-react](https://github.com/ealush/emoji-picker-react)

## Getting Started:

1. Clone this repository (only this branch).
2. Install dependencies:
pipenv install -r requirements.txt


3. Create a `.env` file based on the example with proper settings for your development environment. Make sure to set the following variables:
   - `SECRET_KEY` (click "Generate" to generate a secure secret for production)
   - `FLASK_ENV` set to `production`
   - `FLASK_APP` set to `app`
   - `SCHEMA` (your unique schema name, in snake_case)
   - `REACT_APP_BASE_URL` (use Render.com URL, located at the top of the page, similar to `https://this-application-name.onrender.com`)
4. Ensure the SQLite3 database connection URL is correctly set in the `.env` file.
5. Organize all tables inside the `flask_schema` schema (defined by the `SCHEMA` environment variable). Replace the value for `SCHEMA` with your chosen name following the snake_case convention.

## Local Development:

6. Get into your pipenv shell, migrate your database, seed your database, and run your Flask app:
pipenv shell
flask db upgrade
flask seed all
flask run

7. To run the React App in development, follow the README inside the `react-app` directory.

## Deployment on Render.com:

### Part A: Configure the Start and Build Commands

8. From the Render.com dashboard, click on the "New +" button in the navigation bar, then select "Web Service" to create the application for deployment.
9. Fill out the form to configure the build and start commands, and add environment variables:
   - Application Name: Set a unique name for your application.
   - Root Directory: Leave it blank (Render will run commands from the root directory).
   - Environment: Set to "Python 3".
   - Region: Choose the location closest to you.
   - Branch: Set to "main".
10. Add the Build command in the Build field (all in one line):
npm install --prefix react-app && npm run build --prefix react-app && pip install -r requirements.txt && pip install psycopg2 && flask db upgrade && flask seed all

11. Add the Start command in the Start field:
gunicorn app:app

### Part B: Add Environment Variables

12. Click on the "Advanced" button at the bottom of the form to configure environment variables for production.
13. Add the following keys and values in the Render GUI form:
   - `SECRET_KEY` (click "Generate" to generate a secure secret for production)
   - `FLASK_ENV` set to `production`
   - `FLASK_APP` set to `app`
   - `SCHEMA` (your unique schema name, in snake_case)
   - `REACT_APP_BASE_URL` (use Render.com URL, similar to `https://this-application-name.onrender.com`)
14. In another tab, navigate to your Render.com dashboard and click on your Postgres database instance.
15. Add the following key and value:
   - `DATABASE_URL` (copy value from Internal Database URL field)
16. Add any other keys and values that may be present in your local `.env` file, as needed.
17. Choose "Yes" for the Auto-Deploy field to automatically redeploy your application every time you push to the `main` branch.
18. Click "Create Web Service" to deploy your project on Render.com. The deployment process will likely take about 10-15 minutes.
19. Monitor the logs to see your build and start commands being executed and check for any errors in the build process.
20. Once deployment is complete, open your deployed site and verify that 
