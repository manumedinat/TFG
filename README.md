# TFG
R2RML to GraphQL

Funcionalides:
Carpeta 'Salida': A partir de fichero index.js, se genera el servidor en Java en la carpeta 'prueba'.
Carpeta 'prueba': A partir de fichero 'DemoApplication.java', se arranca Spring Boot Application
Carpeta 'R2RML': Fichero 'funciones_ttl.js' con las funciones para tratar el JSON a partir de un fichero *.ttl

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
Pasos:
1. Crear carpeta nueva, llamada 'prueba'.
2. Insertar comandos(spring initializr):
npm install -g yo
npm install -g generator-spring-initializr
yo spring-initializr
3. Seleccionar dependencias: Web, JPA, lombok
4. Una vez generada carpeta prueba, ejecutar fichero 'index.js' de la carpeta 'Salida'
