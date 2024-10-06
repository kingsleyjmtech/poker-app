#!/bin/bash

# Function to display a message with formatting
function print_message() {
    echo "============================================"
    echo "$1"
    echo "============================================"
}

# Step 1: Install dependencies for the backend (root directory)
print_message "Installing dependencies for the backend (server)"
npm install

# Step 2: Copy .env.example to .env for the backend (root directory)
print_message "Setting up environment variables for the backend (server)"
if [ -f ".env.example" ]; then
    cp .env.example .env
    echo ".env file created for the backend."
else
    echo ".env.example file not found for the backend."
fi

# Step 3: Run backend tests
print_message "Running tests for the backend (server)"
npm run test

# Step 4: Build the backend (root directory)
print_message "Building the backend (server)"
npm run build

# Step 5: Install dependencies for the frontend (client directory)
print_message "Installing dependencies for the frontend (client)"
cd client || exit
npm install

# Step 6: Copy .env.example to .env for the frontend (client directory)
print_message "Setting up environment variables for the frontend (client)"
if [ -f ".env.example" ]; then
    cp .env.example .env
    echo ".env file created for the frontend."
else
    echo ".env.example file not found for the frontend."
fi

# Step 7: Run type-check, lint, and format for the frontend (client directory)
print_message "Running type-check, lint, and format for the frontend"
npm run type-check
npm run lint
npm run format

# Step 8: Build the frontend (client directory)
print_message "Building the frontend (client)"
npm run build

# Step 9: Run the backend and frontend concurrently
print_message "Running both backend and frontend concurrently"
cd .. # Move back to the root directory to run both
npx concurrently "npm run start" "cd client && npm run preview"
