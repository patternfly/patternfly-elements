# Install node dependencies
FROM node:12.16.3 as nodejs-12

# Create working directory
WORKDIR /usr/src/patternfly-elements

RUN apt-get update

# install Chrome
RUN apt-get install -y curl
RUN curl -sL https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN echo 'deb http://dl.google.com/linux/chrome/deb/ stable main' >> /etc/apt/sources.list.d/google.list
RUN apt-get update
RUN apt-get install -y google-chrome-stable

# install Firefox 78
RUN apt-get install -y wget tar
RUN wget -O /usr/local/firefox-78.0.1.tar.bz2 https://ftp.mozilla.org/pub/firefox/releases/78.0.1/linux-x86_64/en-US/firefox-78.0.1.tar.bz2
RUN tar xvjf /usr/local/firefox-78.0.1.tar.bz2 -C /usr/local
RUN ln -s /usr/local/firefox/firefox /usr/bin/firefox

# install xvfb
RUN apt-get install -y xvfb

# install java; needed by selenium
RUN apt-get install -y default-jre

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

EXPOSE 8000
CMD [ "npm", "run", "start" ]
