# syntax=docker/dockerfile:1

# Les ARG alimentés par compose se déclarent sans valeur par défaut
# (stack-conventions.md, §5) : la source de vérité est le `.env` racine.
ARG NGINX_VERSION

# --- base : configuration commune, sans contenu -----------------------------
FROM nginx:${NGINX_VERSION} AS base

COPY docker/nginx/default.conf          /etc/nginx/conf.d/default.conf
COPY docker/nginx/docker-healthcheck.sh /usr/local/bin/docker-healthcheck
RUN chmod +x /usr/local/bin/docker-healthcheck \
 && mkdir -p /srv/site /etc/nginx/snippets

WORKDIR /srv/site

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
    CMD ["docker-healthcheck"]

# --- dev : le contenu arrive par bind mount (compose.dev.yml) ---------------
FROM base AS dev

COPY docker/nginx/cache.dev.conf /etc/nginx/snippets/cache.conf

# --- prod : le contenu est figé dans l'image --------------------------------
FROM base AS prod

COPY docker/nginx/cache.prod.conf /etc/nginx/snippets/cache.conf
COPY site/ /srv/site/
