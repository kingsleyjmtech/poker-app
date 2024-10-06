# Stage 1: Build the Vue app
FROM node:20-alpine AS build

WORKDIR /usr/src/app

# Copy the package.json and package-lock.json first to install dependencies
COPY client/package*.json ./

# Install the dependencies
RUN npm install

# Copy the Vue project from the client directory into the container
COPY client/ .

# Build the Vue app
RUN npm run build

# Stage 2: Serve the built files with Nginx
FROM nginx:stable-alpine AS production

# Copy built Vue files from the build stage
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
