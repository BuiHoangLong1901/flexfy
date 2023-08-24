# 1. Install dependencies only when needed 
FROM node:16-alpine AS builder

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* ./
RUN \
    if [ -f yarn.lock ]; then yarn; \
    elif [ -f package-lock.json ]; then npm ci; \
    else echo "Lockfile not found." && exit 1; \
    fi

COPY . .
# This will do the trick, use the corresponding env file for each environment.
# COPY .env.production.sample .env.production
RUN yarn build

# 3. Install dependencies production only
FROM node:18-alpine AS prod_deps

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* ./
RUN \
    if [ -f yarn.lock ]; then yarn --prod; \
    elif [ -f package-lock.json ]; then npm install -omit=dev; \
    else echo "Lockfile not found." && exit 1; \
    fi

# 3. Production image, copy all the files and run next
FROM node:18-alpine

USER 1001

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000

CMD ["yarn", "start"]
