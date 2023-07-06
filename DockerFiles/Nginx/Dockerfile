ARG VERSION_NGINX=${VERSION_NGINX}

FROM nginx:${VERSION_NGINX} AS base

RUN apk add curl

################################################################################
################################################################################
#							DEV BUILD
################################################################################
################################################################################
FROM base as development

###### CREATE SELF SIGNED CERTIFICATE
RUN apk add openssl
RUN	mkdir -p /var/www/ssl/private/ /var/www/ssl/public/ /etc/nginx/templates/
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
	-keyout /var/www/ssl/private/localhost.key \
    -out /var/www/ssl/public/localhost.crt \
	-subj '/C=FR/ST=PACA/L=Nice/O=localhost/CN=localhost'

###### REPLACE NGINX CONF
COPY DockerFiles/Nginx/conf/default.conf.template /etc/nginx/templates/

###### NON ROOT CONTAINER DIRECTIVE
RUN chown -R nginx:nginx /var/www && chmod -R 755 /var/www && \
        chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /var/log/nginx && \
        chown -R nginx:nginx /etc/nginx/conf.d
        
RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid

USER nginx


################################################################################
################################################################################
#							PROD BUILD
################################################################################
################################################################################
FROM base as production

###### CREATE SELF SIGNED CERTIFICATE
RUN apk add openssl
RUN	mkdir -p /var/www/ssl/private/ /var/www/ssl/public/ /etc/nginx/templates/
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
	-keyout /var/www/ssl/private/localhost.key \
    -out /var/www/ssl/public/localhost.crt \
	-subj '/C=FR/ST=PACA/L=Nice/O=localhost/CN=localhost'

###### REPLACE NGINX CONF
COPY DockerFiles/Nginx/conf-prod/default.conf.template /etc/nginx/templates/

###### NON ROOT CONTAINER DIRECTIVE
RUN chown -R nginx:nginx /var/www && chmod -R 755 /var/www && \
        chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /var/log/nginx && \
        chown -R nginx:nginx /etc/nginx/conf.d
        
RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid

USER nginx