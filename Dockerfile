# Build stage
FROM node:20.10.0-alpine3.19 as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM node:20.10.0-alpine3.19 as production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=build /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["npm", "run", "start"]

