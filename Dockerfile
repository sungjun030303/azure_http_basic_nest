FROM mcr.microsoft.com/azure-functions/node:4-node16

WORKDIR /sample
COPY package*.json /azure-sample/
RUN npm install

ADD ./ /azure-sample

CMD npm run test:e2e