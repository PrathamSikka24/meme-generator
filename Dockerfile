# Specify the base image
FROM node:19-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source inside Docker image
COPY . .

# Build your app
RUN npm run build

# Expose the port the app runs on
EXPOSE 5173

# Command to run your app
CMD ["npm", "start"]
