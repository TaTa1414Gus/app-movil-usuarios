# App Móvil

## Objetivo de la Aplicación
El objetivo de este proyecto es implementar una arquitectura frontend-backend robusta para dispositivos móviles. La aplicación permite autenticar usuarios y administrar un panel de control (CRUD completo) utilizando componentes modernos e independientes (Standalone Components) para mejorar el rendimiento y la escalabilidad del sistema.

## Stack Tecnológico
* **Frontend:** Ionic Framework + Angular (Standalone Components)
* **Peticiones HTTP:** Axios
* **Backend:** API REST construida en PHP nativo (PDO)
* **Base de Datos:** MySQL
* **Seguridad:** Encriptación de contraseñas mediante `password_hash` y protección CORS.

## Instrucciones de Ejecución
1. Configurar la base de datos MySQL usando el script incluido.
2. Colocar los archivos `api_usuarios.php` y `login.php` en la ruta `htdocs/api_movil` de XAMPP.
3. Clonar este repositorio y ejecutar `npm install` para restaurar los módulos.
4. Ejecutar `ionic serve` para visualizar la aplicación en el navegador.