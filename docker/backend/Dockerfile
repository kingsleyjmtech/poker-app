FROM node:20-alpine AS build

WORKDIR /app

# Install build dependencies
COPY package*.json ./
RUN npm install

# Copy source files and compile
COPY . .
RUN npm run build

# Production image
FROM node:20-alpine AS production

WORKDIR /app

COPY --from=build /app ./

EXPOSE 3030

CMD ["npm", "run", "start"]