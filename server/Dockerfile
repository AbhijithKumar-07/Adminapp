# ---- Production runtime image ----
FROM node:20-slim

# Prevent zombie processes and install curl for healthcheck
RUN apt-get update && apt-get install -y --no-install-recommends tini curl \
  && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production \
    PORT=5000

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source code
COPY . .

# Expose API port
EXPOSE 5000

# Healthcheck (expects your app has GET /health returning 200)
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD curl -fsS http://localhost:${PORT}/health || exit 1

# Drop root privileges for security
USER node

ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["npm", "start"]
