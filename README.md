# Tumult - Discord Clone

Welcome to Tumult, your go-to destination for creating and managing online communities with ease! Tumult is an open-source project that brings the power of communication and collaboration to your fingertips. Whether you're a gaming group, a study club, or just a bunch of friends looking to argue, Tumult provides you with all the tools you need to forge your exclusive battleground where you belong. Come check out our live application at:

https://tumult.onrender.com/

![Tumult](public/images/tumult_splash_header1.png)

## ReadMe Table of Contents

- [Project Wiki](https://github.com/BoJamesH/tumult-project/wiki)



I apologize for the confusion. To create a link that takes you straight to the #database section within the wiki's page, you should make sure that the #database section is correctly defined with an HTML id attribute in your wiki page. Here's how you can do it:

Edit your wiki page on GitHub.
Locate the #database section within your wiki content.
Make sure it's formatted like this:
markdown
Copy code
## Database Schema

<!-- Your content for the database schema section here -->
Add an id attribute to the heading, like this:
markdown
Copy code
## Database Schema {#database}

<!-- Your content for the database schema section here -->
Save your changes to the wiki page.
Now, you can create a link in your README.md that goes directly to this section by using the URL of your wiki page followed by #database, like this:

markdown
Copy code
- [Database Schema](https://github.com/BoJamesH/tumult-project/wiki#database-schema)
- [Features](#features)
- [Contributing](#Contributing)
- [Getting Started](#getting-started) <!-- Added link to Getting Started section -->

## Contributing

If you'd like to contribute to Tumult, please check out our team members' GitHub profiles:

- [Bo](https://github.com/BoJamesH)
- [Jordan](https://github.com/Jordo707)
- [Nick](https://github.com/nita94)
- [Ryan](https://github.com/RjRosales19)

Feel free to reach out to any of us to collaborate on this project!

## Features

- **Topic-Based Channels**: Organize your server with channels for different topics, keeping your discussions clean and organized.

- **Real-Time Voice and Video**: Enjoy low-latency voice and video calls that make it feel like you're in the same room.

- **Easy Collaboration**: Collaborate, share, and chat about your day without clogging up a group chat.

- **Instant Access**: Join text channels effortlessly when you're free, and let friends pop in to talk without having to call.

- **Moderation and Customization**: Customize your server with moderation tools and custom member access, giving you control over your community.



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
