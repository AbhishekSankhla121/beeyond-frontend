FROM node:22-alpine  AS deps
RUN apk add --no-cache git libc6-compat
WORKDIR /beeyond-frontend
COPY package*.json ./
RUN npm ci


FROM node:22-alpine  AS builder
RUN apk add --no-cache git libc6-compat
WORKDIR /beeyond-frontend
ARG REACT_APP_SERVER_URL
ENV REACT_APP_SERVER_URL=${REACT_APP_SERVER_URL}
COPY --from=deps /beeyond-frontend/node_modules ./node_modules
COPY . .
RUN npm run build


FROM node:22-alpine  AS runner
RUN apk add --no-cache git libc6-compat
WORKDIR /beeyond-frontend
RUN npm install -g serve
COPY --from=builder /beeyond-frontend ./build
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]