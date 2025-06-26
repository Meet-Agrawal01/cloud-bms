# this is a docker file
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 5173
CMD ["npm", "run",  "dev"]
