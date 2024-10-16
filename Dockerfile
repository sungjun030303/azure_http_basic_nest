FROM mcr.microsoft.com/azure-functions/node:4-node16

WORKDIR /azure_http_basic_nest

COPY package*.json /azure_http_basic_nest/
# Clean up old files and cache
RUN rm -rf package-lock.json node_modules
RUN npm cache clean --force


# Install dependencies
RUN npm install

ADD ./ /azure_http_basic_nest

CMD npm run test:e2e