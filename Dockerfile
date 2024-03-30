FROM node:14 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:14
WORKDIR /app
COPY --from=build /app/build .
CMD ["npm", "start"]
