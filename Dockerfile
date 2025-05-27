# --- Build Stage ---
FROM node:22.14.0-alpine AS builder

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Generate Prisma Client
RUN npx prisma generate --schema=src/config/prisma/schema.prisma

# Build artifact
RUN npm run build


# --- Production Stage ---
FROM node:22.14.0-alpine AS production

# Create app directory
WORKDIR /app

# Copy dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

RUN ls -la

# ⬇️ Copy built artifact dan Prisma Client
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma /app/node_modules/@prisma

# Copy built artifact
COPY --from=builder /app/build ./build

# Copy .env
COPY .env* ./

# Expose port
EXPOSE 3000

# Run app
CMD ["node", "build/index.js"]
