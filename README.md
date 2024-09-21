# React + Vite

To set up, run, and test the project using the provided code, follow these steps:

1.SETUP THE APPLICATION-

1). Project Setup

First, create a new directory for your project and navigate into it:
mkdir event-calendar-app
cd event-calendar-app

Initialize a new Node.js project:
npm init -y

2). Install Dependencies
 
Install the necessary dependencies for both the frontend and backend:
npm install react react-dom react-router-dom @clerk/clerk-react react-big-calendar moment axios react-toastify
npm install express mongoose cors dotenv
npm install --save-dev vite @vitejs/plugin-react

3). Environment Variables
Create a `.env` file in the root directory and add:

VITE_APP_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
MONGODB_URI=your_mongodb_connection_string
PORT=4000

2.RUN THE APPLICATION
To run the frontend and backend->
npm run dev

3.TEST THE APPLICATION

To test the application:

a. Open your browser and navigate to `http://localhost:5173` (or the port Vite is running on).

b. Sign up or log in using Clerk authentication.

c. Test creating, editing, and deleting events:

- Click on a date in the calendar to create a new event.
- Click on an existing event to edit or delete it.
- Verify that events are displayed correctly on the calendar.

d. Test the reminder functionality by setting a reminder for an event.

e. Verify that events are persisted by refreshing the page.

f. Test error handling by intentionally causing errors (e.g., disconnecting from the internet while saving an event).



