#!/bin/sh
# Sonde l'endpoint de santé servi par nginx (docker/nginx/default.conf).
# wget est fourni par busybox : aucune dépendance à installer, y compris dans
# l'image de production (stack-conventions.md, §7).
set -e

exec wget --quiet --tries=1 --spider "http://127.0.0.1:80/healthz"
