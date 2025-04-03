Tablero Kanban (Laravel + React)

Este proyecto consiste en un backend en Laravel y un frontend en React que, en conjunto, forman un tablero Kanban funcional.

Requisitos

- Backend:
  - PHP 7.4 o superior
  - Composer
  - Laravel
  - Base de datos SQLite
- Frontend:
  - Node.js y npm

Instrucciones para Levantar el Proyecto

Levantar el Backend (Laravel)

1. Instala las dependencias de Laravel:

   En terminal proporcionar lo siguiente:
   cd kanban-backend
   composer install

2. Configura la base de datos:

Crea un archivo vacío en kanban-backend/database/database.sqlite.

Crea el archivo .env en kanban-backend y copia y pega las siguientes líneas (asegurarse que el DB_DATABASE sea la ruta completa):

APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:t1IN/ae2sLvvAkd9hxHxE1HH98LupVq3QdI+GABHgJ8=
APP_DEBUG=true
APP_URL=http://localhost

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=sqlite  
DB_DATABASE=/ruta/completa/al/proyecto/kanban-backend/database/database.sqlite
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_HOST=
PUSHER_PORT=443
PUSHER_SCHEME=https
PUSHER_APP_CLUSTER=mt1

VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
VITE_PUSHER_HOST="${PUSHER_HOST}"
VITE_PUSHER_PORT="${PUSHER_PORT}"
VITE_PUSHER_SCHEME="${PUSHER_SCHEME}"
VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"


3. Una vez instaladas las dependencias y configurada la base de datos   ejecuta las migraciones:

php artisan migrate

4. Levanta el servidor de Laravel:

php artisan serve

Esto iniciará el backend en http://localhost:8000.

##############################################################################################

Levantar el Frontend (React)

En una nueva terminal proporcionar lo siguiente:

1. Instala las dependencias de React:

cd kanban-frontend
npm install

2. Instala el paquete para drag & drop compatible:

npm install @hello-pangea/dnd

(este es compatible con react 18.1.0)

3. Levanta la aplicación React:

npm start

La aplicación se abrirá en http://localhost:3000.
