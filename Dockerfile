FROM node:6-alpine

ARG mongodb
ARG admin_token
ARG server_domain

ENV DOMAIN $server_domain
ENV API_ADMIN_TOKEN $admin_token
ENV MONGODB_URL $mongodb
ENV NODE_ENV production

WORKDIR /usr/src/app
COPY ["package.json", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .

EXPOSE 3000
CMD npm start