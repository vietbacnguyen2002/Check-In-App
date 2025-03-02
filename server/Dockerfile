# --- Stage 1: Build Stage ---
FROM node:22.3.0-alpine AS build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (including dev dependencies for building, if needed)
RUN npm install

# Copy the rest of the application
COPY . .

# --- Stage 2: Production Stage ---
FROM node:22.3.0-alpine AS production-stage

# Set environment variables (if needed)
# ENV NODE_ENV=production

# Set working directory
WORKDIR /app

# Copy dependencies from build-stage
COPY --from=build-stage /app/node_modules ./node_modules
COPY --from=build-stage /app/package*.json ./
COPY --from=build-stage /app ./

# Copy .env file (if it exists)
# RUN if [ -f /app/.env ]; then cp /app/.env .; else echo "No .env file found"; fi

# Expose port (match your Express app's port)
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]