# Poker App

Test your luck and skill with a hand of poker!

## Prerequisites

Before setting up the project, ensure you have the following installed on your system:

- **Node.js**: Version 18.x, or 20.x is required.
- **npm**: Comes with Node.js installation.
- **Git**: For cloning the repository.
- **Docker**: (if using the Docker setup).

You can verify the installation by running the following commands:

```sh
node -v
npm -v
git --version
docker --version
docker-compose --version
```

## Endpoints For Backend

- **GET /api/v1/deal**: Responds with a random hand of 5 cards and evaluation.
- **GET /api/v1/ping**: Responds with "pong".
- **POST /api/v1/ping**: Responds with "pong from POST".

## Postman Collection Poker App.postman_collection.json in root dir

## Clone the repository:
   ```sh
   git clone https://github.com/kingsleyjmtech/poker-app.git
   ```

# Setup for Mac and Linux (Run in a single terminal)

The `build-and-run.sh` is included to streamline the setup, build, and running of both backend and frontend.

1. Navigate to the project directory:
   ```sh
   cd poker-app
   ```

2. If you encounter issues running the script due to line endings (-bash: ./build-and-run.sh: /bin/bash^M: bad
   interpreter: No such file or directory), use dos2unix to convert it:
   - Install `dos2unix` (if not installed):
     ```sh
     brew install dos2unix # for macOS
     ```
     ```sh
     sudo apt-get install dos2unix # for Debian/Ubuntu
     ```
   - Convert the script:
     ```sh
     dos2unix build-and-run.sh
     ```

3. Make the script executable:
   ```sh
   chmod +x build-and-run.sh
   ```

4. Run the script:
   ```sh
    ./build-and-run.sh      
    ```

5. The server should now be running at `http://localhost:3030`.

6. The client should now be running at `http://localhost:4173`.

# Docker Setup (Run in a single terminal)

You can also run the entire app (both backend and frontend) using Docker. This simplifies the setup by eliminating the need to manually install Node.js and npm.

1. Navigate to the project directory:
   ```sh
   cd poker-app
   ```

2. Build and run the Docker containers for both backend and frontend:
   ```sh
   docker-compose build --no-cache && docker-compose up -d
   ```
   
3. The server should now be running at `http://localhost:3030`.

4. The client should now be running at `http://localhost:4173`.

# Setup (For any OS)

## Backend (Node.js)

1. Navigate to the project directory:
   ```sh
   cd poker-app
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Copy the example environment:
   ```sh
   cp .env.example .env
   ```

4. Update `.env` with your specific settings:
   Edit the `.env` file to include your actual configuration values.

5. Build the project:
   ```sh
   npm run build
   ```

6. To run tests:
   ```sh
   npm run test
   ```

7. Start the server:
   ```sh
   npm run start
   ```

8. The server should now be running at `http://localhost:3030`.

## Frontend (Vue.js) NB: Frontend is inside the client folder in the root dir of the project (Run in a separate terminal)

1. Navigate to the root directory of the project:

2. Navigate to the client folder:
   ```sh
   cd client
   ```

3. Install dependencies:
   ```sh
    npm install
    ```

4. Copy the example environment:
   ```sh
   cp .env.example .env
   ```

5. Update `.env` with your specific settings:
   Edit the `.env` file to include your actual configuration values.

6. Build the project:
   ```sh
    npm run build
    ```

7. Type Check, Lint and format the code (Optional):
   ```sh
    npm run type-check
    npm run lint
    npm run format   
    ```

8. Start the server:
    ```sh
     npm run preview
     ```

9. The server should now be running at `http://localhost:4173`.

## Screenshots of the App (Frontend and Backend)

![Screenshot 1](screenshots/screenshot-1.png)
![Screenshot 2](screenshots/screenshot-2.png)
![Screenshot 3](screenshots/screenshot-3.png)
![Screenshot 4](screenshots/screenshot-4.png)
![Screenshot 5](screenshots/screenshot-5.png)
![Screenshot 6](screenshots/screenshot-6.png)
![Screenshot 7](screenshots/screenshot-7.png)
![Screenshot 8](screenshots/screenshot-8.png)
![Screenshot 9](screenshots/screenshot-9.png)