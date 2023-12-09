FROM node:18

# Path: /app
WORKDIR /app

# Path: /app/package.json
COPY package.*json .


# Path: /app
RUN npm install

# Path: /app
COPY . .


EXPOSE 6000

CMD ["npm", "start"]