# ---------- FRONTEND BUILD ----------
FROM node:22 AS builder
WORKDIR /app

# Copy frontend
COPY frontend ./frontend
RUN cd frontend && npm install && npm run build

# Copy backend
COPY backend ./backend
RUN cd backend && npm install --production

# Copy frontend build → backend/public
RUN rm -rf backend/public && mkdir -p backend/public && \
    cp -R frontend/dist/* backend/public/

# ---------- FINAL RUNTIME ----------
FROM node:22
WORKDIR /app

# Copy backend only
COPY --from=builder /app/backend ./

# Expose port
EXPOSE 3000

# Run backend
CMD ["node", "server.js"]
