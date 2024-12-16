FROM node:latest
WORKDIR /usr/src/app
COPY package.json app.js ./
COPY . .
RUN npm install --quiet
EXPOSE 3000
CMD ["node", "app.js"]
