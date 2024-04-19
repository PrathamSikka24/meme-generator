# Meme Generator

## Overview
The Meme Generator is a web application built with Remix JS that allows users to create memes dynamically. Users can select from a variety of templates, add custom text, and generate a meme image. The generated meme can then be viewed, and the link to the meme is saved in a MongoDB database for later retrieval.

## Features
- **Template Selection:** Users can choose from a list of predefined meme templates.
- **Text Customization:** Users can add custom text to their selected meme template.
- **Dynamic Meme Generation:** Memes are generated dynamically using the `https://api.memegen.link` service.
- **Database Integration:** Generated memes are saved with their URLs in MongoDB, allowing for later access and sharing.
- **Responsive Design:** The application is fully responsive and works well on both desktop and mobile devices.

## Technologies Used
- **Remix JS:** A full-stack web framework for building better user experiences with speed in mind.
- **MongoDB:** A NoSQL database used for storing meme data.
- **Node.js:** The runtime environment for the server-side logic.
- **Express.js:** A web application framework for Node.js, used to build the web server.

## Prerequisites
Before you begin, ensure you have the following installed:
- Node.js
- npm (Node Package Manager)
- MongoDB

## Installation
Follow these steps to set up the project locally:

1. **Clone the Repository**
   ```
   git clone https://github.com/your-username/meme-generator.git
   cd meme-generator
   ```
```
docker compose up
```

This command will start the server and the application should be accessible via http://localhost:5173.

   
