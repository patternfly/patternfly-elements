# Install node dependencies
FROM node:12.16.3 as nodejs-12

# Create working directory
WORKDIR /usr/src/patternfly-elements

RUN chown -R node /usr/src/patternfly-elements

USER node

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# TODO: COPY does not support ** wildcards
# COPY package*.json,lerna.json,elements/**/package.json ./

# Lerna requires the package.json files from each element be present
# TODO: create a list of all element directories and copy just packages
COPY --chown=node:node . .

# Install dependencies
RUN npm install

# TODO: Use this once the above command just copies the packages
# COPY --chown=node:node . .

RUN npm run build

EXPOSE 8001
CMD [ "npm", "run", "start" ]
