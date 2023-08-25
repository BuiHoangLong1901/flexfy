# 1. Install dependencies only when needed 
FROM node:16-alpine AS builder

WORKDIR /app

COPY . .
# This will do the trick, use the corresponding env file for each environment.
# COPY .env.production.sample .env.production
RUN yarn build

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000

CMD ["yarn", "start"]
