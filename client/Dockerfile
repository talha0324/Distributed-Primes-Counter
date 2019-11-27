# STAGE 1 : BASE
FROM node:10.12.0-slim AS base
WORKDIR /app
EXPOSE 9000

#STAGE 2: BUILD
FROM node:10.12.0 as builder
SHELL ["/bin/bash", "-c"]
WORKDIR /buildapp
ADD package.json ./
ADD ./source ./source
ADD ./public ./public
ADD ./views ./views
# ADD ./test ./test
ADD ./tsconfig.json ./
# ADD config ./config
RUN npm install;npm install;npm run build

# STAGE 3: UNIT-TEST
FROM builder as tests
ARG TEST_IMAGE_UNIQUE_ID=0
LABEL client_${TEST_IMAGE_UNIQUE_ID}=true
WORKDIR /buildapp
RUN npm run test

# STAGE 4: PUBLISH  
FROM builder as publish
WORKDIR /app
# Copy the node_modules folder
RUN cp -r /buildapp/node_modules /app/node_modules; cp -r /buildapp/dist /app/dist; cp -r /buildapp/public /app/public;cp -r /buildapp/views /app/views; rm -r -f /app/dist/test
# Copy the required build output files

# RUN mkdir /app/config && cp -r /buildapp/config /app
# Copy the package.json file
RUN cp -r /buildapp/package.json /app
RUN npm prune --production

# STAGE 5: PRODUCTION 
FROM base as production
COPY --from=publish /app /app
#ENTRYPOINT ["node"]
CMD ["node", "./dist/code/index.js"]
