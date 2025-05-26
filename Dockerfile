# --- Build Stage ---
FROM node:22.14.0-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


# --- Production Stage ---
FROM node:22.14.0-alpine AS production

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY --from=builder /app/build ./build

COPY .env* ./

EXPOSE 3000

CMD ["node", "build/index.js"]
