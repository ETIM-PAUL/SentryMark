FROM node:20-slim

# ------------------------------------------------------
# Install system deps required by c2pa native modules
# ------------------------------------------------------
RUN apt-get update && apt-get install -y \
    libssl-dev \
    libc6 \
    libgcc1 \
    libstdc++6 \
    ca-certificates \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# ------------------------------------------------------
# Create app directory
# ------------------------------------------------------
WORKDIR /app

# ------------------------------------------------------
# Install dependencies
# ------------------------------------------------------
COPY package*.json ./
RUN npm install --omit=dev

# ------------------------------------------------------
# Copy rest of source code
# ------------------------------------------------------
COPY . .

# ------------------------------------------------------
# Ensure temp directory exists for C2PA
# ------------------------------------------------------
RUN mkdir -p /tmp/c2pa-temp

# ------------------------------------------------------
# Expose and run
# ------------------------------------------------------
EXPOSE 3000
CMD ["node", "src/app.js"]
