# FROM node

# WORKDIR /app

# COPY . .

# RUN npm install

# EXPOSE 3000

# CMD ["node","server.js"]

FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV PORT 3000

EXPOSE $PORT

CMD [ "node","server.js" ]