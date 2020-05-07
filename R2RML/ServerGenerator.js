/**Referencia a clase con generación de Templates */
const server= require('./index');
const funciones= require('./funciones_ttl');
/*Mecanismo para generar ficheros y directorios*/
const fs=require('fs');
const createDir=(dirPath)=>{
    fs.mkdirSync(dirPath, {recursive:true}, (error) =>{
        if (error){
            console.error('error', error);
        }else{
            console.log('directorio creado');
        }
    });
}
const createFile=(filePath,fileContent)=>{
    fs.writeFileSync(filePath, fileContent, (error) =>{
        if (error){
            console.error('error', error);
        }else{
            console.log('fichero creado');
        }
    });
}

/*Referencia a fichero de mappeo*/
var fileMapping= fs.readFileSync("./mappings.r2rml.json"); //leer fichero en formato utf8
var jsonFile= JSON.parse(fileMapping); //parsear fichero 
var mappingDoc=jsonFile;

/* ------------VARIABLES DIRECTORIOS-----------------*/
const pathDemo='../prueba/src/main/java/com/example/demo/';
const pathServiceDir= pathDemo + 'service';
const pathQueryDir= pathDemo + 'query';
const pathResolverDir= pathDemo + 'resolver';
const pathDaoDir= pathDemo + 'dao';
const pathDaoEntityDir= pathDaoDir + '/entity';
const pathDaoRepositoryDir= pathDaoDir + '/repository';
const pathGQLDir= '../prueba/src/main/resources/graphql';

/*-------------VARIABLES FICHEROS--------------------*/
const pathGQLFile= '../prueba/src/main/resources/graphql/starwarsql.graphqls';
const pathAppPtyFile= '../prueba/src/main/resources/application.properties';
const pathPom= '../prueba/pom.xml';
const pathQueryFile= pathQueryDir + "/Query.java";

/** 1. Generar fichero application.properties */
createFile(pathAppPtyFile, server.getApplicationProperties());

/**2. Generar fichero pom.xml */
createFile(pathPom, server.getPom());

/**3. Generar QueryRoot */
createDir(pathQueryDir); // crear directorio de query
createFile(pathQueryFile, server.generateQueryRoot(mappingDoc)); //crear fichero query

/**4. Generar Resources (Entity, Repository) */

/*4.1 Creación de los directorios*/ 
createDir(pathDaoEntityDir); //crear directorio de todas las entidades
createDir(pathDaoRepositoryDir); // crear directorio de todos los repositorios
createDir(pathResolverDir); //crear directorio de los resolvers correspondientes a las entidades relacionales 
createDir(pathServiceDir);

let triplesMaps= funciones.getTriplesId();
for(var i=0;i<triplesMaps.length;i++){
    let subjMap= funciones.getIdsFromTripleMap(triplesMaps[i]).subjectMapId;
    let typeClass= funciones.getClassNameFromSubjMap(subjMap);

    //Crear IdClass para entidades con composite PK
    if(server.hasIdClass(triplesMaps[i])){
        var idClassFile= pathDaoEntityDir + "/" + typeClass + "Id.java";
        createFile(idClassFile, server.generateIdClass(triplesMaps[i]));
    }
    //Crear entidad de cada una de las clases del directorio entity
    var entityFile= pathDaoEntityDir + "/" + typeClass + ".java"
    createFile(entityFile, server.generateEntities(triplesMaps[i]));

    //Crear repositorio de cada una de las clases del directorio repository
    var repositoryFile= pathDaoRepositoryDir + "/" + typeClass + "Repository.java";
    createFile(repositoryFile,server.generateRepositories(triplesMaps[i]));

    //Crear resolver para query root correspondiente a cada una de las clases
    var serviceFile=pathServiceDir + "/" + typeClass + "Service.java";
    createFile(serviceFile,server.generateService(triplesMaps[i]));

    //Crear resolver para las entidades con relación
    if(server.hasRelationship(triplesMaps[i])){
        var resolverFile= pathResolverDir + "/" + typeClass + "Resolver.java";
        createFile(resolverFile,server.generateResolver(triplesMaps[i]));
    }
}

/**5. Generar GraphQL Schema */
createDir(pathGQLDir);
createFile(pathGQLFile, server.generateSchema());