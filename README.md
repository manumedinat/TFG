# TFG
R2RML to GraphQL

Funcionalides:


Carpeta 'prueba': A partir de fichero 'DemoApplication.java', se arranca Spring Boot Application.

Carpeta 'R2RML': 

  -Fichero 'funciones_ttl.js' con las funciones para tratar el JSON a partir de un fichero *.ttl

  -Fichero 'index.js' por el cual se genera los ficheros del servidor
  
  -Fichero 'ServerGenerator.js' con el que se genera el servidor de Java

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

Pasos:
1. Crear carpeta nueva, llamada 'prueba'.
2. Insertar comandos(spring initializr):

npm install -g yo

npm install -g generator-spring-initializr

yo spring-initializr

3. Seleccionar dependencias: Web, JPA
4. Una vez creada la carpeta prueba , hay que modificar el fichero 'application.properties' según tu conexión en MySQL Workbench
- Si se usa usuario root, no hace falta cambiarlo.
- Si se usa otra contraseña (o ninguna), cambiar el parámetro 'spring.datasource.password' por la que se utilice en MySQL.

5. Ejecutar fichero 'ServerGenerator.js' de la carpeta 'R2RML'
6. Arrancar la clase 'DemoApplication.java'
7. Ir a localhost:8080/graphiql y realizar las consultas que se requiera
