# Tumult - Discord-like Web Application

Welcome to Tumult, your go-to destination for creating and managing online communities with ease! Tumult is an open-source project that brings the power of communication and collaboration to your fingertips. Whether you're a gaming group, a study club, or just a bunch of friends looking to argue, Tumult provides you with all the tools you need to forge your exclusive battleground where you belong. Come check out our live application at:

https://tumult.onrender.com/

![Tumult](https://github.com/BoJamesH/repo/raw/main/public/images/tumult_splash_header1.png)

## ReadMe Table of Contents

- [Project Wiki](https://github.com/BoJamesH/tumult-project/wiki) 
- [Database Schema](https://github.com/BoJamesH/tumult-project/wiki#database-schema) 
- [Features](#features)
- [Contributing](#Contributing)
- [Getting Started](#getting-started)

## Contributing
If you'd like to contribute to Tumult, please check out our team members' GitHub profiles:
- [Bo](https://github.com/BoJamesH)
- [Jordan](https://github.com/Jordo707)
- [Nick](https://github.com/nita94)
- [Ryan](https://github.com/RjRosales19)

## Features

- **Topic-Based Channels**: Tumult allows you to organize your server with channels dedicated to different topics, making it easy to keep your discussions clean and well-organized.

- **Real-Time Voice and Video**: Experience the thrill of low-latency voice and video calls that create a sense of being in the same room, whether you're gaming with friends or having a virtual meeting.

- **Effortless Collaboration**: Collaborate, share, and have meaningful conversations without cluttering up a group chat, thanks to Tumult's easy-to-use interface.

- **Instant Access**: Join text channels with unparalleled ease whenever you're available, and let friends drop in for a quick chat without the need for a formal call.

- **Moderation and Customization**: Tailor your server to your exact specifications with Tumult's robust moderation tools and customizable member access, giving you complete control over your online community.
- **Full Emoji-Reaction capability using emoji-picker-react at https://github.com/ealush/emoji-picker-react

## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


## Deployment through Render.com

First, refer to your Render.com deployment articles for more detailed
instructions about getting started with [Render.com], creating a production
database, and deployment debugging tips.

From the [Dashboard], click on the "New +" button in the navigation bar, and
click on "Web Service" to create the application that will be deployed.

Look for the name of the application you want to deploy, and click the "Connect"
button to the right of the name.

Now, fill out the form to configure the build and start commands, as well as add
the environment variables to properly deploy the application.

### Part A: Configure the Start and Build Commands

Start by giving your application a name.

Leave the root directory field blank. By default, Render will run commands from
the root directory.

Make sure the Environment field is set set to "Python 3", the Region is set to
the location closest to you, and the Branch is set to "main".

Next, add your Build command. This is a script that should include everything
that needs to happen _before_ starting the server.

For your Flask project, enter the following command into the Build field, all in
one line:

```shell
# build command - enter all in one line
npm install --prefix react-app &&
npm run build --prefix react-app &&
pip install -r requirements.txt &&
pip install psycopg2 &&
flask db upgrade &&
flask seed all
```

This script will install dependencies for the frontend, and run the build
command in the __package.json__ file for the frontend, which builds the React
application. Then, it will install the dependencies needed for the Python
backend, and run the migration and seed files.

Now, add your start command in the Start field:

```shell
# start script
gunicorn app:app
```

_If you are using websockets, use the following start command instead for increased performance:_

`gunicorn --worker-class eventlet -w 1 app:app`

### Part B: Add the Environment Variables

Click on the "Advanced" button at the bottom of the form to configure the
environment variables your application needs to access to run properly. In the
development environment, you have been securing these variables in the __.env__
file, which has been removed from source control. In this step, you will need to
input the keys and values for the environment variables you need for production
into the Render GUI.

Click on "Add Environment Variable" to start adding all of the variables you
need for the production environment.

Add the following keys and values in the Render GUI form:

- SECRET_KEY (click "Generate" to generate a secure secret for production)
- FLASK_ENV production
- FLASK_APP app
- SCHEMA (your unique schema name, in snake_case)
- REACT_APP_BASE_URL (use render.com url, located at top of page, similar to
  https://this-application-name.onrender.com)

In a new tab, navigate to your dashboard and click on your Postgres database
instance.

Add the following keys and values:

- DATABASE_URL (copy value from Internal Database URL field)

_Note: Add any other keys and values that may be present in your local __.env__
file. As you work to further develop your project, you may need to add more
environment variables to your local __.env__ file. Make sure you add these
environment variables to the Render GUI as well for the next deployment._

Next, choose "Yes" for the Auto-Deploy field. This will re-deploy your
application every time you push to main.

Now, you are finally ready to deploy! Click "Create Web Service" to deploy your
project. The deployment process will likely take about 10-15 minutes if
everything works as expected. You can monitor the logs to see your build and
start commands being executed, and see any errors in the build process.

When deployment is complete, open your deployed site and check to see if you
successfully deployed your Flask application to Render! You can find the URL for
your site just below the name of the Web Service at the top of the page.

[Render.com]: https://render.com/
[Dashboard]: https://dashboard.render.com/
