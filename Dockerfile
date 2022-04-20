###############
### STAGE 1: Build app
###############
FROM node:16-alpine as build

WORKDIR /usr/local/app
# Add the source code to app
COPY ./ /usr/local/app/
# Install all the dependencies
RUN yarn install
# Generate the build of the application
RUN yarn run build

###############
### STAGE 2: Serve app with nginx ###
###############
FROM nginx:1.21.6-alpine
COPY  --from=build /usr/local/app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
