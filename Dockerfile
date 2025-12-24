# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy dependency files first (better layer caching)
COPY package*.json ./

# Install dependencies (production only)
RUN npm ci --only=production

# Copy application source code
COPY . .

# Expose the port your Express app listens on
EXPOSE 5000

# Start the app
CMD ["node", "messagingService.js"]
