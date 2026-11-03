#!/bin/sh
# Выкладка демо на VPS Timeweb. Запускать из папки site:  sh deploy/deploy.sh
# Вход по SSH-ключу (Host sites в ~/.ssh/config). Паролей в файле нет и быть не должно.
# Под VPN SSH на голый IP зависает, поэтому идём через имя ylk89.ru (тот же сервер).
set -eu

SERVER="${SERVER:-sites}"
SSH_OPTS="${SSH_OPTS:--o HostName=ylk89.ru -o HostKeyAlias=37.77.106.12}"

npm run build

ssh $SSH_OPTS "$SERVER" "mkdir -p /var/www/dom-dlya-doma"
rsync -az --delete -e "ssh $SSH_OPTS" out/ "$SERVER:/var/www/dom-dlya-doma/"
rsync -az -e "ssh $SSH_OPTS" deploy/nginx.conf "$SERVER:/etc/nginx/sites-available/dom-dlya-doma"
ssh $SSH_OPTS "$SERVER" "ln -sf /etc/nginx/sites-available/dom-dlya-doma /etc/nginx/sites-enabled/dom-dlya-doma \
  && ufw allow 8082/tcp comment 'dom-dlya-doma demo' >/dev/null \
  && nginx -t && systemctl reload nginx"

echo "Готово: http://37.77.106.12:8082/"
