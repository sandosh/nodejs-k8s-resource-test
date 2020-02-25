FROM node:10.18.0-stretch-slim

# Default to the service port
ENV PORT 80

# define workspace (will be created if not mounted)
RUN mkdir /app

# conventional application path
WORKDIR /app

ENV NODE_INSTANCES=1

ADD pm2.config.js /pm2.config.js

# Add process manager
RUN npm install pm2@3.5.1 -g

# Copy package.json
COPY package.json /app/package.json

# Install deps
RUN yarn install

# application code
COPY . /app

# application "talks" on a single port
EXPOSE 80

# start app process
ENTRYPOINT ["pm2-docker", "start", "--raw", "/pm2.config.js"]
# adjustable arguments
CMD ["--env", "production"]
