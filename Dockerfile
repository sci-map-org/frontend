FROM node:13-alpine

ENV PORT 3000

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# # cache node_modules
# COPY yarn.lock package.json
# ./ RUN yarn install
# # copy app code
# COPY . .

# Installing dependencies
COPY yarn.lock package.json /usr/src/app/
RUN yarn install --frozen-lockfile

# Copying source files
COPY . /usr/src/app/

# Building app
RUN npm run build
EXPOSE 3000

# Running the app
CMD "npm" "run" "start"