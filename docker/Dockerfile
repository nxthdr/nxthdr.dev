FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Build with production environment (using .env.production from repository)
RUN npm run build


FROM caddy:latest

WORKDIR /www/html

COPY ./docker/config/Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /app/dist .

EXPOSE 443/tcp
