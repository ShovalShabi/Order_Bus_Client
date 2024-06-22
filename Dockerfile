# Using Node LTS Alpine version
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# Install build dependencies and tools
RUN npm install && \
    npm cache clean --force  # Cleanup after installation

# Copy application code
COPY . .