FROM node:18-alpine

WORKDIR /app

# Copy root package files
COPY package.json yarn.lock ./

# Copy server-specific package files
COPY server/package.json ./server/

# Install dependencies
RUN yarn install

# Copy server source code
COPY server ./server

WORKDIR /app/server

# Build the server
RUN yarn build

EXPOSE 4000

CMD ["yarn", "start"]
