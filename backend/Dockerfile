FROM node:16-alpine AS build

WORKDIR /var/www/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:16-alpine as production

WORKDIR /var/www/app

COPY --from=build /var/www/app/package*.json ./

RUN npm ci --omit=dev

COPY --from=build /var/www/app/dist ./dist/

EXPOSE 3000

CMD ["node", "/var/www/app/dist/app.js"]