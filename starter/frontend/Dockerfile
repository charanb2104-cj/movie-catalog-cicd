# Build stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG REACT_APP_MOVIE_API_URL=http://localhost:5000
ENV REACT_APP_MOVIE_API_URL=$REACT_APP_MOVIE_API_URL

RUN npm run build

# Production serve stage
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
RUN sed -i 's/listen       80;/listen       3000;/g' /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
