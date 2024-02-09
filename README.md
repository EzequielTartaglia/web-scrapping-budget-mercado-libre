## Invoicing system NextJS - Mysql

### Preparacion del entorno

1. Instala las herramientas necesarias: 
    - MySql8.1: https://downloads.mysql.com/archives/get/p/23/file/mysql-8.1.0-winx64.msi (`Nota: instalar en el path: C:\Program Files\MySQL\MySQL Server 8.1`)
    - MySql(cli): https://downloads.mysql.com/archives/get/p/43/file/mysql-shell-8.1.1-windows-x86-64bit.msi (`Nota: instalar en el path: C:\Program Files\MySQL\MySQL Server 8.1`)
    - NodeJs: https://nodejs.org/en/download/

2. Instala las dependencias con `npm i`

3. En el archivo `/config/db.js` cambia las configuraciones segun lo tengas en tu pc, por ejemplo la contraseña si es root (normalmente), o si el port es diferente al que alli aparece si no es el que viene por defecto que es el 3306 para MySQL.

4. Ejecuta en MySQL(cli) o MySqlWorkbench los scripts que se encuentran en `/db/db.sql` y `/db/seed.sql` en ese orden.

5. Ejecuta el comando `npm run db:dev:up` para inicializar el servidor bd (localhost) y el comando `npm run dev` en simultaneo.

6. Abrir http://localhost:3000 en tu navegador.