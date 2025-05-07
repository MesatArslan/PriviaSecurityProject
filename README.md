# User Management System

A NextJS 15 application with Material UI that showcases a user management system.

## Features

- List all users with MUI DataGrid
- Create new users
- Edit existing users
- Delete users with confirmation dialog
- Search users by name
- **Persistent data storage** using local storage

## Technologies

- NextJS 15 with App Router
- TypeScript
- Material UI
- React Hooks
- Browser Local Storage

## Running the Project

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Implementation Notes

This project stores user data in the browser's local storage, which means:

- Data persists when you refresh the page
- Data persists when you close and reopen the browser
- Data is specific to each browser and device
- Clearing browser data will remove the stored users
