# STAGE 1 : BASE
FROM node:10.12.0-slim AS base
WORKDIR /app
EXPOSE 3000

#STAGE 2: BUILD
FROM node:10.12.0 as builder
SHELL ["/bin/bash", "-c"]
WORKDIR /buildapp
ADD package.json ./
ADD ./source ./source
# ADD ./test ./test
ADD ./tsconfig.json ./
# ADD config ./config
RUN npm install;npm install;npm run build

# STAGE 3: UNIT-TEST
FROM builder as tests
ARG TEST_IMAGE_UNIQUE_ID=0
LABEL worker_${TEST_IMAGE_UNIQUE_ID}=true
WORKDIR /buildapp
RUN npm run test

# STAGE 4: PUBLISH  
FROM builder as publish
WORKDIR /app
# Copy the node_modules folder
RUN cp -r /buildapp/node_modules /app/node_modules; cp -r /buildapp/dist /app/dist; cp -r /buildapp/static /app/static; rm -r -f /app/dist/test
# Copy the required build output files
# RUN mkdir /app/lib && cp -r /buildapp/lib/ /app/lib/ 
#&& cp -r /buildapp/lib/test /app/lib/test

# RUN mkdir /app/config && cp -r /buildapp/config /app
# Copy the package.json file
RUN cp -r /buildapp/package.json /app
RUN npm prune --production

# STAGE 5: PRODUCTION 
FROM base as production
COPY --from=publish /app /app
#ENTRYPOINT ["node"]
CMD ["node", "./lib/index.js"]
