# Use the official Node.js image
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular app
RUN npm run build --prod

# Use nginx to serve the Angular app
FROM nginx:alpine
COPY --from=0 /usr/src/app/dist /usr/share/nginx/html

# Expose the port nginx is running on
EXPOSE 80

# Command to run nginx
CMD ["nginx", "-g", "daemon off;"]
