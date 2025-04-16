# Todo App

This is a simple Todo application built with Next.js (TypeScript) and MongoDB. The app uses Tailwind CSS for styling, React Query for client-side data fetching/caching, and is set up with ESLint and Prettier for linting and formatting. It is deployable to Vercel and uses MongoDB Atlas as the database.

# Features

Create todos – quickly add new tasks to the list.
Edit todos – update the title, description, or status.
Delete todos – remove them once they’re completed or no longer needed.
Filter todos – easily search and narrow down your list by keywords.

# Technologies Used

Next.js – React framework for server-side rendering and file-based routing
TypeScript – Strongly typed JavaScript
Tailwind CSS – Utility-first CSS framework
MongoDB Atlas – Cloud-hosted MongoDB database
Mongoose – ODM library for MongoDB
React Query – Data fetching and state management library
ESLint & Prettier – Linting and code formatting
Vercel – Deployment platform (optional but recommended)

# Prerequisites

Node.js and npm (or Yarn) installed.

MongoDB Atlas cluster (or any other MongoDB instance) for the database.

# Setup & Installation

1. Clone this repository:

git clone https://github.com/47codemonkey/todo-app.git
cd <your-repo>

2. Install dependencies:

npm install
or
yarn

3. Create a .env file in the root directory (same level as package.json) and add your MongoDB connection string:

MONGODB_URI="<your_mongodb_atlas_connection_string>"
For example, MONGODB_URI="mongodb+srv://<user>:<password>@cluster0.mongodb.net/<database>?retryWrites=true&w=majority"

4. Run the development server:

npm run dev
or
yarn dev

Open http://localhost:3000 to view it in the browser.

# Running in Production

1. Build the project:

npm run build
or
yarn build

2. Start in production mode:

npm run start
or
yarn start

Your app will be served at http://localhost:3000.
