FROM node:16.13.1-alpine
RUN apk update && apk add --no-cache \
    git \
    openssh

CMD ["yarn", "dev"]