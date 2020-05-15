# TFG
R2RML to GraphQL

NOTES: Para poder ejecutar esta herramienta, se necesita tener instalado los siguientes componentes:
  - JDK 1.8
  - Node.js

Funcionalidades:


Carpeta 'server': A partir de fichero 'DemoApplication.java', se arranca Spring Boot Application.

Carpeta 'generator': 

  -Fichero 'funciones_ttl.js' con las funciones para tratar el JSON a partir de un fichero *.ttl

  -Fichero 'index.js' por el cual se genera los ficheros que componen el servidor
  
  -Fichero 'ServerGenerator.js' con el que se genera el servidor de Java


Pasos a seguir para ejecutar el servidor:
1. Ejecutar el siguiente comando: ./startup.bat

2. Una vez creada la carpeta prueba , hay que modificar el fichero 'application.properties' según tu conexión en MySQL Workbench
- Si se usa usuario root, no hace falta cambiarlo.
- Si se usa otra contraseña (o ninguna), cambiar el parámetro 'spring.datasource.password' por la que se utilice en MySQL.

3. Importar la BBDD almacenada en la carpeta 'SQL' para la inserción de los datos en las tablas correspondientes.
4. Acceder a la carpeta server y ejecutar el siguiente comando: ./mvnw spring-boot:run
5. Ir a localhost:8080/graphiql y realizar las consultas que se requiera
