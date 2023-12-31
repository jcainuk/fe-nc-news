# Northcoders News Front-end

A React application I built as my coursework assessment for the front-end module of the [Northcoders Software Engineering bootcamp](https://www.northcoders.com).

This is the front-end of the Northcoders News application, a platform for reading and discussing articles on various topics. This React-based web application allows users to browse articles, read their contents, add and delete comments, and vote on articles. You can also filter articles by comment count, number of votes or date in ascending or descending order.

Here is a link to a demo of the app:
[jcain-news](https://jcainuk-news.netlify.app/)

This React application makes requests to the API I built which is hosted here: [Northcoders News API](https://nc-news-ry7t.onrender.com/api/articles)

Please note that the API hosted on Render at the above hyperlink sometimes spins down when not in use. If you are having issues viewing the articles, please consider forking and cloning my API for this project on Github in another terminal and hosting it locally. Here is the link to my back-end API for this project on Github where you can also find full installation instructions:

[be-nc-news](https://github.com/jcainuk/be-nc-news)

## Table of Contents

- [Screenshots](#screenshots)
- [General Info](#general-info)
- [Demo Link](#demo-link)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Status](#status)
- [Contact](#contact)

## Screenshots

![App Screenshot 1](/screenshots/screenshot1.png)
![App Screenshot 2](/screenshots/screenshot2.png)

## General Info

This front-end application is part of a full-stack project developed for the Northcoders Software Engineering bootcamp. It provides a user-friendly interface for interacting with articles, comments, and users. Users can browse articles by topic, view article details, post and delete comments, vote on and filter articles.

## Demo Link

You can access a live demo of the application here: [jcain-news](https://jcainuk-news.netlify.app/)

## Technologies Used

- [React](https://reactjs.org/)
- [Bootstrap](https://getbootstrap.com/)
- [Axios](https://axios-http.com/)
- [React Router](https://reactrouter.com/)
- [FontAwesome](https://fontawesome.com/)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)

- React Hooks and Router

In this project, I leveraged various React hooks to manage state and side-effects efficiently, making the application dynamic and responsive. Additionally, I utilized [React Router](https://reactrouter.com/) to handle client-side routing, enabling seamless navigation and URL-based content rendering.

- React Hooks Used

In this project, I utilized several React hooks to manage state and side effects efficiently:

- `useState`: Used for managing local component state, such as handling form inputs and toggling UI elements.

- `useEffect`: Employed for handling side effects, including fetching data from the API, updating the document title, and managing subscriptions.

- `useContext`: Utilized to manage global state and share data and functions across components efficiently.

- `useNavigate` (from `react-router-dom`): Enabled navigation and redirection within the application by programmatically changing the URL.

- `useParams` (from `react-router-dom`): Extracted dynamic parameters from the URL to customize the content based on route parameters.

These hooks allowed me to build a robust and responsive user interface while efficiently managing component state and side effects.

## Features

- Browse articles by topic
- View article details
- Post and delete comments
- Vote on articles
- Responsive design for mobile and desktop using Bootstrap
- Filter articles by comment count, votes or data in ascending or descending order

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (minimum version: 14.x)
- [npm](https://www.npmjs.com/)

### Installation

1. Fork and clone the repository:

   ```sh
   git clone https://github.com/jcainuk/fe-nc-news
   ```

2. Navigate into the project:

   ```sh
   cd  fe-nc-news
   ```

3. Open a new terminal and install dependencies:

   ```sh
   npm install
   ```

4. Get the app running by typing in the terminal:

   ```sh
   npm run dev
   ```

5. Open your browser and navigate to this link to see the application:

   ```
   http://localhost:5173/
   ```

## Status

Project is: Complete

## Contact

Created by [@jcainuk](https://twitter.com/JCainuk) - feel free to reach out for inquiries and feedback.
