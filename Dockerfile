FROM node:16-alpine
WORKDIR /Hotel_ML_Front_Service
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "5000"]
