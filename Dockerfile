FROM node:15.12.0 AS build

WORKDIR /usr/app
COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm build

RUN git clone https://github.com/vishnubob/wait-for-it.git

EXPOSE 4000
CMD ["npm", "start"]
