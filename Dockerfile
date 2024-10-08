FROM node:22-slim

RUN apt update && apt install -y openssl procps

RUN npm install -g @nestjs/cli@10.4.4

WORKDIR /home/node/app

USER node

CMD tail -f /dev/null