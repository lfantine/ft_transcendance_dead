ARG VERSION_FRONT=${VERSION_FRONT}

FROM node:${VERSION_FRONT} AS base

RUN apk add curl

################################################################################
################################################################################
#							DEV BUILD
################################################################################
################################################################################
FROM base AS development

ENV NODE_ENV="development"

USER node
WORKDIR /srv/app

CMD npm i && npm run dev


################################################################################
################################################################################
#							PROD BUILD
################################################################################
################################################################################
FROM base AS production

ENV NODE_ENV="production"

COPY ./frontend /srv/app

RUN chown -R node:node /srv/app

USER node
WORKDIR /srv/app

RUN npm i

RUN npm run build

CMD npm run start
