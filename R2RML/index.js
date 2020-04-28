/* Mecanismo para crear ficheros y directorios*/
const funciones= require('../R2RML/funciones_ttl');
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
const pathMutationDir= pathDemo + 'mutation';
const pathResolverDir= pathDemo + 'resolver';
const pathDaoDir= pathDemo + 'dao';
const pathDaoEntityDir= pathDaoDir + '/entity';
const pathDaoRepositoryDir= pathDaoDir + '/repository';
const pathGQLDir= '../prueba/src/main/resources/graphql';
/*-------------VARIABLES FICHEROS DIRECTORIO SERVICE--------------------*/
var arrayEntities= ["Appears", "Character", "CharacterType", "Episode", "Friendship", "Heroes"]
const pathAppearsServiceFile=pathServiceDir + "/" + arrayEntities[0] + "Service.java";
const pathCharacterServiceFile=pathServiceDir + "/" + arrayEntities[1] + "Service.java";
const pathCharacterTypeServiceFile=pathServiceDir + "/" + arrayEntities[2] + "Service.java";
const pathEpisodeServiceFile=pathServiceDir + "/" + arrayEntities[3] + "Service.java";
const pathFriendsServiceFile=pathServiceDir + "/" + arrayEntities[4] + "Service.java";
const pathHeroesServiceFile=pathServiceDir + "/" + arrayEntities[5] + "Service.java";

var serviceFiles = [pathFriendsServiceFile, pathHeroesServiceFile,
    pathAppearsServiceFile, pathCharacterServiceFile,  pathEpisodeServiceFile, pathCharacterTypeServiceFile];
/*-------------VARIABLES FICHEROS DIRECTORIO QUERY--------------------*/
const pathQueryFile= pathQueryDir + "/Query.java";
/*-------------VARIABLES FICHEROS DIRECTORIO MUTATION--------------------*/
const pathMutationFile= pathMutationDir + "/Mutation.java";
/*-------------VARIABLES FICHEROS DIRECTORIO RESOLVER--------------------*/
const pathAppearsResolverFile= pathResolverDir + "/"+ arrayEntities[0] + "Resolver.java";
const pathCharacterResolverFile= pathResolverDir + "/"+ arrayEntities[1] + "Resolver.java";
const pathHeroesResolverFile= pathResolverDir + "/"+ arrayEntities[5] + "Resolver.java";

var resolverFiles = [pathHeroesResolverFile, pathAppearsResolverFile, pathCharacterResolverFile];
var resolverEnt= [arrayEntities[0],arrayEntities[1], arrayEntities[5]];
/*-------------VARIABLES FICHEROS DIRECTORIO ENTITY--------------------*/
const pathAppearsEntityFile= pathDaoEntityDir + "/"+ arrayEntities[0] + ".java";
const pathCharacterEntityFile= pathDaoEntityDir + "/"+ arrayEntities[1] + ".java";
const pathCharacterTypeEntityFile= pathDaoEntityDir + "/"+ arrayEntities[2] + ".java";
const pathEpisodeEntityFile= pathDaoEntityDir + "/"+ arrayEntities[3] + ".java";
const pathFriendsEntityFile= pathDaoEntityDir + "/"+ arrayEntities[4] + ".java";
const pathHeroesEntityFile= pathDaoEntityDir + "/"+ arrayEntities[5] + ".java";

var entityFiles = [pathFriendsEntityFile,pathHeroesEntityFile,pathAppearsEntityFile, pathCharacterEntityFile, 
    pathEpisodeEntityFile,pathCharacterTypeEntityFile];




//---------CONSTRUCCION APP---------------------------*/

/*1. Función que inserta el texo a generar para los ficheros pertenecientes al directorio service*/

//function generateService(triplesMap){
exports.generateService= function(triplesMap){
    let serviceInit="";
    serviceInit+="package com.example.demo.service;\n"
    serviceInit+="import com.example.demo.dao.entity.*;\n"
    serviceInit+="import com.example.demo.dao.entity.Character;\n"
    serviceInit+="import com.example.demo.dao.repository.*;\n"
    serviceInit+="import org.springframework.stereotype.Service;\n"
    serviceInit+="import org.springframework.transaction.annotation.Transactional;\n"
    serviceInit+="import java.util.List;\n"
    serviceInit+="import java.util.ArrayList;\n"
    serviceInit+="import javax.persistence.EntityManager;\n"
    serviceInit+="import javax.persistence.PersistenceContext;\n\n"
    serviceInit+="@Service\n";
    let subjMap= funciones.getIdsFromTripleMap(triplesMap).subjectMapId;
    let typeClass= funciones.getClassNameFromSubjMap(subjMap);
    var typeClassLow= typeClass;
    typeClassLow= typeClassLow.charAt(0).toLowerCase() + typeClassLow.slice(1);
    serviceInit+= "public class " + typeClass + "Service{\n"
    serviceInit+= "@PersistenceContext\n";
    serviceInit+= "private EntityManager entityManager;\n"
    serviceInit+= "private final "+ typeClass + "Repository " + typeClassLow + "Repository;\n";
    serviceInit+= "\tpublic " + typeClass + "Service (final " + typeClass + "Repository ";
    serviceInit+=  typeClassLow + "Repository){\n";
    serviceInit+= "\tthis." + typeClassLow + "Repository = " + typeClassLow + "Repository;\n";
    serviceInit+=  "}\n"
    serviceInit+= "@Transactional(readOnly= true)\n";
    var arrayService=[];
    let poms= funciones.getIdsFromTripleMap(triplesMap).predicateObjectMapIds;
        for(var i=0; i<poms.length;i++){
            let objMap= funciones.getIdsFromPredObjMap(poms[i]).objectMapId;
            var dataType= funciones.getDataTypeFromObjMap(objMap).dataType;
            var identifier= "identifier";
            var id1= funciones.getTemplateFromSubjMap(subjMap).templateId;
            var id2= funciones.getTemplateFromSubjMap(subjMap).templateId2;
            var parent= funciones.getDataTypeFromObjMap_JoinCondition(objMap).parent;
            //para que solo haya un único id en array de datos de cada entidad
            if(!arrayService.includes(identifier)){
                arrayService.push(identifier);
            }
            if (dataType!=null && dataType.charAt(0)=="{"){
                var dataType2= funciones.getDataTypeFromObjMap(objMap).arrayTemplates;
                for(var m=0; m<dataType2.length;m++){
                    dataType= dataType2[m];
                    arrayService.push(dataType);
                }
            }else if(dataType!=null && !arrayService.includes(dataType) && dataType.charAt(0)!="{"){
                arrayService.push(dataType);
             }
    
        }
            serviceInit+= "public List <" + typeClass + "> getAll" + typeClass;
            serviceInit+="(";
            for (var k=0; k<arrayService.length;k++){
                serviceInit+= "final String ";
                if(k!=arrayService.length-1){
                    serviceInit+= arrayService[k] + ", ";
                }else{
                    serviceInit+= arrayService[k] + "){\n";
                }
            }
            serviceInit+= "\tList <" + typeClass + "> filter= new ArrayList<" + typeClass + ">();\n";
            serviceInit+= "\tif(";
            for (var k2=0; k2<arrayService.length;k2++){
                if(k2!=arrayService.length-1){
                    serviceInit+= arrayService[k2] + "==null && ";
                }else{
                    serviceInit+= arrayService[k2] + "==null){\n";
                }
            }
            serviceInit+= "\t\tfilter=this." + typeClassLow + "Repository.findAll();\n";
            serviceInit+= "\t}";
            for (var k3=0; k3<arrayService.length;k3++){
                if(k3==0 ||(k3==0 && k3==arrayService.length-1)){
                    serviceInit+= "else if (" + arrayService[k3] + "!=null){\n";
                    serviceInit+= '\t\tString template="';
                    serviceInit+= funciones.getTemplateFromSubjMap(subjMap).template + '";\n';
                    serviceInit+= "\t\tfilter = entityManager.createQuery\n";
                    serviceInit+= `\t("SELECT ` + typeClassLow +  ` FROM ` + typeClass + ` ` + typeClassLow + ` WHERE '"`;
                    serviceInit+= `+ template + "' || ` + typeClassLow + `.`;
                    var templateId= funciones.getTemplateFromSubjMap(subjMap).templateId;
                    var templateId2= funciones.getTemplateFromSubjMap(subjMap).templateId2;
                        if(templateId2==null){
                            serviceInit+= templateId;
                        }else{
                            serviceInit+= templateId;
                            serviceInit+= ` || '/' || `;
                            serviceInit+= typeClassLow + `.`;
                            serviceInit+= templateId2;
                        }
                    serviceInit+=` || '' = '" + identifier + "'" ).getResultList();\n`;
                }else if(k3!=arrayService.length-1){
                    serviceInit+= "\t}else{\n";
                    serviceInit+= "\t\tfilter= this." + typeClassLow + "Repository.findAllBy";
                }
            }
            
            for(k5=1;k5<arrayService.length;k5++){
                if(k5!=arrayService.length-1){
                    var paramUpper= arrayService[k5];
                    paramUpper= paramUpper.charAt(0).toUpperCase() + paramUpper.slice(1);
                    serviceInit+= paramUpper + "Or";
                }else if (k5==1 && k5==arrayService.length-1){
                    serviceInit+= "\t}else{\n";
                    serviceInit+= "\t\tfilter= this." + typeClassLow + "Repository.findAllBy";
                    var paramUpper= arrayService[k5];
                    paramUpper= paramUpper.charAt(0).toUpperCase() + paramUpper.slice(1);
                    serviceInit+= paramUpper + "(";
                }else{
                    var paramUpper= arrayService[k5];
                    paramUpper= paramUpper.charAt(0).toUpperCase() + paramUpper.slice(1);
                    serviceInit+= paramUpper + "(";
                }
            }

            for(k4=1;k4<arrayService.length && arrayService[k4]!=null;k4++){
                if(k4!=arrayService.length-1){
                    serviceInit+=  arrayService[k4] + ",";
                }else{
                    serviceInit+=  arrayService[k4] + ");\n";
                }
            }
            serviceInit+= "\t\t}\n\n";
            serviceInit+= "\treturn filter;\n";
            serviceInit+= "\t}\n\n";
            serviceInit+= "}\n";
            return serviceInit;
}
/*
let triplesMaps10= funciones.getTriplesId();
for(var j=0;j<triplesMaps10.length;j++){
    //console.log(generateService(triplesMaps10[j]));
    //createFile(serviceFiles[i],textoService);
}


/*************************************************************************** */


/*2. Crear fichero query*/
//createDir(pathQueryDir); //directorio

/** QUERY ROOT IMPLEMENTATION */
//function generateQueryRoot(mappingDoc){
exports.generateQueryRoot= function(mappingDoc){
    let queryInit="";
    queryInit+="package com.example.demo.query;\n";
    queryInit+="import com.coxautodev.graphql.tools.GraphQLQueryResolver;\n";
    queryInit+="import com.example.demo.dao.entity.*;\n";
    queryInit+="import com.example.demo.dao.entity.Character;\n";
    queryInit+="import com.example.demo.service.*;\n";
    queryInit+="import org.springframework.beans.factory.annotation.Autowired;\n";
    queryInit+="import org.springframework.stereotype.Component;\n";
    queryInit+="@Component\n";
    queryInit+="\tpublic class Query implements GraphQLQueryResolver{\n";
    let triplesMaps= funciones.getTriplesId();

        /*recorrer todas las triplesMaps*/
        for (var j=0; j< triplesMaps.length;j++){
            let subjMap= funciones.getIdsFromTripleMap(triplesMaps[j]).subjectMapId;
            let typeClass= funciones.getClassNameFromSubjMap(subjMap);
            var typeClassLow= typeClass;
            typeClassLow= typeClassLow.charAt(0).toLowerCase() + typeClassLow.slice(1);
            queryInit+="\t@Autowired\n";
            queryInit+="\tprivate " + typeClass + "Service " + typeClassLow + "Service;\n";
            queryInit+="\tpublic Iterable <" + typeClass+ "> list" + typeClass + "(";
            let poms= funciones.getIdsFromTripleMap(triplesMaps[j]).predicateObjectMapIds;
            var arrayData=[];
            var aux=[];
            /* recorrer todos los objectMaps*/
                for (var k=0; k<poms.length;k++){
                     let objMap= funciones.getIdsFromPredObjMap(poms[k]).objectMapId;
                     var dataType= funciones.getDataTypeFromObjMap(objMap).dataType;
                     //var dataType3= funciones.getTemplateFromSubjMap(subjMap); //sacar id de template
                     var identifier= "identifier";
                     //para que solo haya un único id en array de datos de cada entidad
                     if(!arrayData.includes(identifier)){
                     arrayData.push(identifier);
                     }
                     if(dataType!=null && !arrayData.includes(dataType) && dataType.charAt(0)!="{"){
                        arrayData.push(dataType);
                     }else if (dataType!=null && dataType.charAt(0)=="{"){
                         var dataType2= funciones.getDataTypeFromObjMap(objMap).arrayTemplates;
                         for(var m=0; m<dataType2.length;m++){
                             dataType= dataType2[m];
                             arrayData.push(dataType);
                         }
                     } 
            }

                //recorrer parametros de List
                for(var k=0;k<arrayData.length;k++){
                    if(k!=arrayData.length-1){
                        queryInit+= "String " + arrayData[k] + ",";
                    }else{
                        queryInit+= "String " + arrayData[k] + "){\n";
                    }
                }
                queryInit+= "\t\treturn this."+ typeClassLow + "Service.getAll" + typeClass + " (";
                
                //recorrer parametros de return service
                for(var k2=0;k2<arrayData.length;k2++){
                    if(k2!=arrayData.length-1){
                        queryInit+= arrayData[k2] + ",";
                    }else{
                        queryInit+= arrayData[k2] + ");\n";
                    }
                }
                queryInit+= "\t}\n\n";
        }
        queryInit+="}";
        return queryInit;
        
}
//console.log(generateQueryRoot(mappingDoc));
//createFile(pathQueryFile, generateQueryRoot(mappingDoc));
/****************************************************************************** */
/*3. Crear fichero mutation*/
//createDir(pathMutationDir); //directorio

function generateMutationRoot(mappingDoc){
    let mutationInit="";
    mutationInit+="package com.example.demo.mutation;\n";
    mutationInit+="import org.springframework.beans.factory.annotation.Autowired;\n";
    mutationInit+="import org.springframework.stereotype.Component;\n";
    mutationInit+="import com.coxautodev.graphql.tools.GraphQLMutationResolver;\n";
    mutationInit+="import com.example.demo.dao.entity.*;\n";
    mutationInit+="import com.example.demo.dao.entity.Character;\n";
    mutationInit+="import com.example.demo.service.*;\n";
    mutationInit+="@Component\n";
    mutationInit+="\tpublic class Mutation implements GraphQLMutationResolver{\n";
    let triplesMaps= funciones.getTriplesId();
    var map= new Map();
    var map2= new Map();
    var map3= new Map();
    var mapOneToMany= new Map();
    var mapOneToMany2= new Map();
    var mapOneToMany3= new Map();
    var mapOneToMany4= new Map();
    /*recorrer todas las triplesMaps*/
    for (var j=0; j< triplesMaps.length;j++){
        let subjMap= funciones.getIdsFromTripleMap(triplesMaps[j]).subjectMapId;
        let typeClass= funciones.getClassNameFromSubjMap(subjMap);
        var typeClassLow= typeClass;
        typeClassLow= typeClassLow.charAt(0).toLowerCase() + typeClassLow.slice(1);
        mutationInit+="\t@Autowired\n";
        mutationInit+="\tprivate " + typeClass + "Service " + typeClassLow + "Service;\n";
        mutationInit+="\tpublic " + typeClass+ " create" + typeClass + "(";
        let poms= funciones.getIdsFromTripleMap(triplesMaps[j]).predicateObjectMapIds;
        var arrayData=[];
        var aux=[];
        /* recorrer todos los objectMaps*/
            for (var k=0; k<poms.length;k++){
                 let objMap= funciones.getIdsFromPredObjMap(poms[k]).objectMapId;
                 let predicVal= funciones.getIdsFromPredObjMap(poms[k]).predicateId;
                 var dataType= funciones.getDataTypeFromObjMap(objMap).dataType;
                 //var dataType3= funciones.getTemplateFromSubjMap(subjMap); //sacar id de template
                 var identifier= "identifier";
                 var child= funciones.getDataTypeFromObjMap_JoinCondition(objMap).child; //sacar columna (foreign key)
                 var parent=funciones.getDataTypeFromObjMap_JoinCondition(objMap).parent;//sacar tripleta padre 
                 var parentCond= funciones.getDataTypeFromObjMap_JoinCondition(objMap).parentCond;
                 var parentSubjMap= funciones.getIdsFromTripleMap(parent).subjectMapId;
                 var parentClass= funciones.getClassNameFromSubjMap(parentSubjMap);
                 var id1= funciones.getTemplateFromSubjMap(subjMap).templateId;
                 var id2= funciones.getTemplateFromSubjMap(subjMap).templateId2;
                 if(parentClass!=null){
                    map.set(parentClass,[typeClass]);//Map con padre y clase relativa
                    mapOneToMany.set(parentClass,[child, typeClass]); //Map con: padre--> hijo y clase a la que pertenece el hijo
                 }
                 if(map2.has(typeClass) && id2!=null){
                    map3.set(typeClass,[child, parentClass]);// Map con: clase hija-> elemento hijo y clase padre
                 }else if (child!=null && child!=id2){
                     map2.set(typeClass,[child, parentClass]); // Map con: clase hija-> elemento hijo y clase padre (siguiente iteración)
                     mapOneToMany2.set(parentClass,[child,typeClass]);
                }

                if(child==id1 && mapOneToMany3.has(typeClass)){
                    mapOneToMany4.set(typeClass,[parentCond,parentClass])
                }else if (child==id1){
                    mapOneToMany3.set(typeClass,[parentCond,parentClass])
                }
                 //para que solo haya un único id en array de datos de cada entidad
                 if(!arrayData.includes(identifier)){
                     arrayData.push(identifier);
                 }
                 if(dataType!=null && !arrayData.includes(dataType) && dataType.charAt(0)!="{"){
                    arrayData.push(dataType);
                 }else if (dataType!=null && dataType.charAt(0)=="{"){
                     var dataType2= funciones.getDataTypeFromObjMap(objMap).arrayTemplates;
                     for(var m=0; m<dataType2.length;m++){
                         dataType= dataType2[m];
                         arrayData.push(dataType);
                     }
                 }
            }
        
            //recorrer parametros de List
            for(var k=0;k<arrayData.length;k++){
                if(k!=arrayData.length-1){
                mutationInit+= "String " + arrayData[k] + ",";
                }else{
                mutationInit+= "String " + arrayData[k] + "){\n";
                }
                
            }
            mutationInit+= "\t\treturn this."+ typeClassLow + "Service.create" + typeClass + " (";
        
            //recorrer parametros de return service
            for(var k2=0;k2<arrayData.length;k2++){
                if(k2!=arrayData.length-1){
                    mutationInit+= arrayData[k2] + ",";
                }else{
                mutationInit+= arrayData[k2] + ");\n";
            }
        }
        mutationInit+= "\t}\n\n";
    }

    mutationInit+="}";
    return {mutationInit,map,map2,map3,mapOneToMany,mapOneToMany2,mapOneToMany3,mapOneToMany4};
    
}
//console.log(generateMutationRoot(mappingDoc));
//createFile(pathMutationFile, generateMutationRoot(mappingDoc).mutationInit);

/************************************************************** */
/*4. Crear directorio dao*/
createDir(pathDaoDir); //directorio

/*4.1 Crear directorio entity y fichero entity*/
createDir(pathDaoEntityDir);

//function generateEntities(triplesMap){
exports.generateEntities= function(triplesMap){
var textoEntity="";
textoEntity+= "package com.example.demo.dao.entity;\n";
textoEntity+= "import lombok.Data;\n";
textoEntity+= "import lombok.EqualsAndHashCode;\n";
textoEntity+= "import javax.persistence.*;\n";
textoEntity+= "import java.io.Serializable;\n";
textoEntity+= "import java.util.List;\n";
textoEntity+= "@Data\n";
textoEntity+= "@EqualsAndHashCode\n";
textoEntity+= "@Entity\n";
    let subjMap= funciones.getIdsFromTripleMap(triplesMap).subjectMapId;
    let typeClass= funciones.getClassNameFromSubjMap(subjMap);
    var typeClassLow= typeClass;
    typeClassLow= typeClassLow.charAt(0).toLowerCase() + typeClassLow.slice(1);
    textoEntity+= '@Table (name="' + typeClassLow + '_SW")\n';
    var arrayEntities=[];
    var arrayChilds=[];
    var arrayParents=[];
    let poms= funciones.getIdsFromTripleMap(triplesMap).predicateObjectMapIds;
    for(var i=0; i<poms.length;i++){
        let objMap= funciones.getIdsFromPredObjMap(poms[i]).objectMapId;
        var dataType= funciones.getDataTypeFromObjMap(objMap).dataType;
        //var identifier= "identifier";
        var template= funciones.getTemplateFromSubjMap(subjMap).template;
        var dataType3= funciones.getTemplateFromSubjMap(subjMap).templateId; //sacar id de template (1º o unico)
        var idsArray=[dataType3]; //array con ids de la template de la triplesMap
        var id1= funciones.getTemplateFromSubjMap(subjMap).templateId1;
        var id2= funciones.getTemplateFromSubjMap(subjMap).templateId2;
        //para que no inserte id2 nulo
        if(id2!=null && !idsArray.includes(id2)){
            idsArray.push(id2);
        }
        
        var child= funciones.getDataTypeFromObjMap(objMap).child; //sacar columna (foreign key)
        arrayChilds.push(child);
        var parent=funciones.getDataTypeFromObjMap_JoinCondition(objMap).parent;//sacar tripleta padre  
        var parentSubjMap= funciones.getIdsFromTripleMap(parent).subjectMapId;
        var parentClass= funciones.getClassNameFromSubjMap(parentSubjMap);  
        arrayParents.push(parentClass); //nombres de las clases padres en arrayParents
        var map= generateMutationRoot(mappingDoc).map;
        var map2= generateMutationRoot(mappingDoc).map2;
        var map3= generateMutationRoot(mappingDoc).map3;
        var mapOneToMany1= generateMutationRoot(mappingDoc).mapOneToMany;
        var mapOneToMany2= generateMutationRoot(mappingDoc).mapOneToMany2;
        var mapOneToMany3= generateMutationRoot(mappingDoc).mapOneToMany3;
        var mapOneToMany4= generateMutationRoot(mappingDoc).mapOneToMany4;
        //para que solo haya un único id en array de datos de cada entidad
        if(!arrayEntities.includes(dataType3)){
            arrayEntities.push(dataType3);
        }
        if (dataType!=null && dataType.charAt(0)=="{"){
            var dataType2= funciones.getDataTypeFromObjMap(objMap).arrayTemplates;
            for(var m=0; m<dataType2.length;m++){
                dataType= dataType2[m];
                arrayEntities.push(dataType);
            }
        }else if(dataType!=null && !arrayEntities.includes(dataType) && dataType.charAt(0)!="{"){
            arrayEntities.push(dataType);
         }

    }
        
        if(map.has(typeClass) && id2!=null){
            //inicialización de clases con composite primary key (typeClassid.java)
            let textoEntityId= "";
            textoEntityId+= "package com.example.demo.dao.entity;\n";
            textoEntityId+= "import java.io.Serializable;\n";
            textoEntityId+= "public class " + typeClass + "Id implements Serializable{\n";

                for (var kAux=0; kAux<idsArray.length;kAux++){
                    if(parentClass!=null && kAux!=0){
                        textoEntityId+= "\tpublic " + parentClass + " "; 
                    }else{
                        textoEntityId+= "\tpublic String "; 
                    }
                    
                    textoEntityId+= idsArray[kAux] + ";\n";
                }
            textoEntityId+="}\n";
            var classAux= pathDaoEntityDir + "/" + typeClass + "Id.java";
            //console.log(textoEntityId);
            createFile(classAux,textoEntityId);
            /*************************************************** */
            textoEntity+= "@IdClass(" + typeClass + "Id.class)\n";
            textoEntity+= "public class " + typeClass + " implements Serializable{\n"
            textoEntity+= "private static final long serialVersionUID = 1L;\n"
            for(var k1=0; k1<idsArray.length;k1++){
                textoEntity+= "\t@Id\n";
                var arrayAux1= map.get(typeClass);
                if(parentClass==null){    
                    textoEntity+= "\tprivate String " + idsArray[k1] + ";\n\n";
                    if(k1==0){
                        textoEntity+= "\t@ManyToOne\n";
                        textoEntity+= '\t@JoinColumn(name="' + idsArray[k1] + '", insertable=false, updatable=false)\n';
                    }
                }else if(parentClass!=null){

                    textoEntity+= "\t@ManyToOne\n";
                    textoEntity+= '\t@JoinColumn(name="' + idsArray[k1] + '")\n';
                }

                //insertar episode de appears
                if(parentClass!=null && k1!=0){
                    var parentLow= parentClass;
                    parentLow= parentLow.charAt(0).toLowerCase() + parentLow.slice(1);
                    textoEntity+= "\tprivate " + parentClass + " ";
                    textoEntity+=  idsArray[k1] + ";\n\n";
                }else if (k1==0 && parentClass==null){
                    var arrayFriendsK1= map.get(typeClass);
                    var auxType= arrayFriendsK1[k1];
                    auxType= auxType.charAt(0).toLowerCase() + auxType.slice(1);
                    textoEntity+= "\tprivate " + map.get(typeClass) + " " + auxType +";\n\n";
                }else if(parentClass!=null){
                    textoEntity+= "\tprivate " + map.get(typeClass) + " ";
                    textoEntity+=  idsArray[k1] + ";\n\n";
                }
            }
                textoEntity+= "\tpublic String getIdentifier(){\n";
                textoEntity+= '\t\tString identifier = "' + template + '";\n';
                textoEntity+= "\t\tidentifier+= ";
                for (var k2=0;k2<idsArray.length;k2++){
                    if(k2!=idsArray.length-1){
                        if(parentClass!=null){
                            textoEntity+= idsArray[k2];
                        }else{
                            var arrayFriendsK2= map.get(typeClass);
                            //console.log(arrayFriendsK2)
                            var auxType2= arrayFriendsK2[k2];
                            auxType2= auxType2.charAt(0).toLowerCase() + auxType2.slice(1);
                            textoEntity+=  auxType2;
                        }
                        textoEntity+= '.getId() + "/" ';    
                    }else{
                        if(parentClass!=null){
                            textoEntity+= "+ " + idsArray[k2] + ".getId();\n";
                        }else{
                            textoEntity+= "+ " + idsArray[k2] + ";\n";
                        }    
                    }
                }
                textoEntity+= "\t\treturn identifier;\n";
                textoEntity+= "\t}\n";
        }else{
            textoEntity+= "public class " + typeClass + " implements Serializable{\n"
            textoEntity+= "private static final long serialVersionUID = 1L;\n\n"
            for (var k3=0; k3<arrayEntities.length;k3++){
                if(k3==0){
                    textoEntity+="\t@Id\n";
                }
                    textoEntity+= '\t@Column(name="' + arrayEntities[k3] + '")\n'; 
                    textoEntity+= "\tprivate String " + arrayEntities[k3] + ";\n\n";
                }

                //para insertar columna episodeid en heroes y typeid en Character
                if(map2.has(typeClass)){
                    var arrayFinal = map2.get(typeClass);
                    for(var k4=0; k4<arrayFinal.length;k4++){
                        if(k4!=arrayFinal.length-1){
                            textoEntity+= "\t@ManyToOne\n";
                            textoEntity+= '\t@JoinColumn(name="' + arrayFinal[k4] + '"';
                            if(dataType3== arrayFinal[k4]){
                                textoEntity+=", insertable = false, updatable = false";
                            }
                            textoEntity+=")\n";
                        }else{
                            if(id2!=null){
                                var auxLower=arrayFinal[k4];
                                auxLower= auxLower.charAt(0).toLowerCase() + auxLower.slice(1);
                                textoEntity+= "\tprivate " + arrayFinal[k4] + " " + auxLower + ";\n\n";
                            }else{
                                textoEntity+= "\tprivate " + arrayFinal[k4] + " " + arrayFinal[k4-1] + ";\n\n";
                            }
                        }
                    }
                }

                //para insertar columna charid en Heroes
                if (map3.has(typeClass)){
                    var arrayFinal2 = map3.get(typeClass);
                    for(var k5=0; k5<arrayFinal2.length;k5++){
                        if(k5==0){
                            textoEntity+= "\t@ManyToOne\n";
                            textoEntity+= '\t@JoinColumn (name="' + arrayFinal2[k5] + '"';
                            textoEntity+=")\n";
                        }else{
                            var low3= arrayFinal2[k5];
                            low3= low3.charAt(0).toLowerCase() + low3.slice(1);
                            textoEntity+= "\tprivate " + arrayFinal2[k5] + " " + idsArray[k5] + ";\n\n";
                        }
                    }
                }

                /**CASOS ONE TO MANY */
                if(mapOneToMany1.has(typeClass)){
                    var arrayOneToMany= mapOneToMany1.get(typeClass);
                    for(var w=0; w<arrayOneToMany.length;w++){
                        if(w==0){
                            textoEntity+= '\t@OneToMany(mappedBy="' + arrayOneToMany[w] + '")\n';
                        }else{
                            var aux= arrayOneToMany[w];
                            aux= aux.charAt(0).toLowerCase() + aux.slice(1);
                            textoEntity+= "\tprivate List <" + arrayOneToMany[w] + "> " + aux + ";\n\n";
                        }
                    }
                
                if(mapOneToMany2.has(typeClass)){
                    var arrayOneToMany2= mapOneToMany2.get(typeClass);
                    for(var w=0; w<arrayOneToMany2.length;w++){
                        if(arrayOneToMany[arrayOneToMany.length-1] != arrayOneToMany2[arrayOneToMany2.length-1]){
                            if(w==0){
                                textoEntity+= '\t@OneToMany(mappedBy="' + arrayOneToMany2[w] + '")\n';
                            }else{
                                var aux= arrayOneToMany2[w];
                                aux= aux.charAt(0).toLowerCase() + aux.slice(1);
                                textoEntity+= "\tprivate List <" + arrayOneToMany2[w] + "> " + aux + ";\n\n";
                            }
                        }
                    }
                }

                if(mapOneToMany3.has(typeClass)){
                    var arrayOneToMany3= mapOneToMany3.get(typeClass);
                    for(var w=0; w<arrayOneToMany3.length;w++){
                        if(w==0){
                            textoEntity+= '\t@OneToMany(mappedBy="' + arrayOneToMany3[w] + '")\n';
                        }else{
                            var aux= arrayOneToMany3[w];
                            aux= aux.charAt(0).toLowerCase() + aux.slice(1);
                            textoEntity+= "\tprivate List <" + arrayOneToMany3[w] + "> " + aux + ";\n\n";
                        }
                    }
                }

                if(mapOneToMany4.has(typeClass)){
                    var arrayOneToMany4= mapOneToMany4.get(typeClass);
                    for(var w=0; w<arrayOneToMany4.length;w++){
                        if(w==0){
                            textoEntity+= '\t@OneToMany(mappedBy="' + arrayOneToMany4[w] + '")\n';
                        }else{
                            var aux= arrayOneToMany4[w];
                            aux= aux.charAt(0).toLowerCase() + aux.slice(1);
                            textoEntity+= "\tprivate List <" + arrayOneToMany4[w] + "> " + aux + ";\n\n";
                        }
                    }
                }
        }

                /***IDENTIFIER PARA RESTO DE CLASES DISTINTAS DE FRIENDSHIP y CHARACTER*/
                textoEntity+= "\tpublic String getIdentifier(){\n";
                textoEntity+= '\t\tString identifier = "' + template + '";\n';
                textoEntity+= "\t\tidentifier+= ";
                for (var k2=0;k2<idsArray.length;k2++){
                    if(k2!=idsArray.length-1){
                        textoEntity+=  idsArray[k2] + ' + "/" + ';
                    }else{
                        if(map3.has(typeClass)){
                            var arrayFinal3= map3.get(typeClass);
                            var low3= arrayFinal3[k2];
                            low3= low3.charAt(0).toLowerCase() + low3.slice(1);
                            textoEntity+= idsArray[k2] + ".getId();\n";
                        }else{
                            textoEntity+=  idsArray[k2] + ";\n";
                        }
                    }
                }
                textoEntity+= "\t\treturn identifier;\n";
                textoEntity+= "\t}\n";
        }
        textoEntity+="}\n";
        return textoEntity;
}
/*
let triplesMaps2= funciones.getTriplesId();
for(var j=0;j<triplesMaps2.length;j++){
    //console.log(this.generateEntities(triplesMaps2[j]));
    //createFile(entityFiles[j],generateEntities(triplesMaps2[j]));
}
*/
/*4.2 Crear directorio y fichero repository*/
//createDir(pathDaoRepositoryDir); //directorio
exports.generateRepositories= function(triplesMap){
    var textoRepository="";
    textoRepository+= "package com.example.demo.dao.repository;\n";
    textoRepository+= "import com.example.demo.dao.entity.*;\n";
    textoRepository+= "import com.example.demo.dao.entity.Character;\n";
    textoRepository+= "import java.util.List;\n";
    textoRepository+= "import org.springframework.data.jpa.repository.JpaRepository;\n";
    textoRepository+= "import org.springframework.stereotype.Repository;\n";
    textoRepository+= "@Repository\n";
        let subjMap= funciones.getIdsFromTripleMap(triplesMap).subjectMapId;
        let typeClass= funciones.getClassNameFromSubjMap(subjMap);
        textoRepository+= "public interface " + typeClass + "Repository extends JpaRepository<";
        textoRepository+= typeClass + ", String> {\n"
        let arrayRepositories= new Array();
        var idsTemplate=[];
        let poms= funciones.getIdsFromTripleMap(triplesMap).predicateObjectMapIds;
        for(var i=0; i<poms.length;i++){
            let objMap= funciones.getIdsFromPredObjMap(poms[i]).objectMapId;
            var dataType= funciones.getDataTypeFromObjMap(objMap).dataType;
            var id1= funciones.getTemplateFromSubjMap(subjMap).templateId;
            var id2= funciones.getTemplateFromSubjMap(subjMap).templateId2;
            idsTemplate.push(id1);
            idsTemplate.push(id2);
            var parent=funciones.getDataTypeFromObjMap_JoinCondition(objMap).parent;
            var parentSubjMap= funciones.getIdsFromTripleMap(parent).subjectMapId;
            var parentClass= funciones.getClassNameFromSubjMap(parentSubjMap);
            if(id2==null && !arrayRepositories.includes(id1)){
                arrayRepositories.push(id1);
            }
            if (dataType!=null && dataType.charAt(0)=="{"){
                var dataType2= funciones.getDataTypeFromObjMap(objMap).arrayTemplates;
                for(var m=0; m<dataType2.length;m++){
                    dataType= dataType2[m];
                    arrayRepositories.push(dataType);
                }
            }else if(dataType!=null && !arrayRepositories.includes(dataType) && dataType.charAt(0)!="{"){
                arrayRepositories.push(dataType);
             }
    
        }
            var map= generateMutationRoot(mappingDoc).map;
            var mapOneToMany2= generateMutationRoot(mappingDoc).mapOneToMany2;
            if(arrayRepositories.length>0){
            textoRepository+= "List <" + typeClass + "> findAllBy";
            var k;
            if(id2!=null){ k=0; k2=0;}else{k=1;k2=1}
            for (k; k<arrayRepositories.length;k++){
                var repositoryUpper= arrayRepositories[k];
                repositoryUpper= repositoryUpper.charAt(0).toUpperCase() + repositoryUpper.slice(1);
                    if(k!=arrayRepositories.length-1){
                        textoRepository+= repositoryUpper + "Or";
                    }else{
                        textoRepository+= repositoryUpper;
                }
            }
            textoRepository+="(";
            for (var k2; k2<arrayRepositories.length;k2++){
                textoRepository+= "String ";
                if(k2!=arrayRepositories.length-1){
                    textoRepository+= arrayRepositories[k2] + ", ";
                }else{
                    textoRepository+= arrayRepositories[k2] + ");\n";
                 }
            }
        }   
            //console.log(map);
            //console.log(mapOneToMany2);  
            if(map.has(typeClass)){
                var textoRepositoryTemplate="List <" + typeClass + "> findAllBy";
                var arrayLast= map.get(typeClass);
                for(var m=0; m<arrayLast.length;m++){
                    textoRepository+= textoRepositoryTemplate;
                    if(parentClass!=null){
                        var tempid1= id1;
                        tempid1= tempid1.charAt(0).toUpperCase() + tempid1.slice(1);
                        textoRepository+= tempid1;
                    }else{
                        textoRepository+= arrayLast[m];
                    }
                    var typeClassLow= arrayLast[m];
                    typeClassLow= typeClassLow.charAt(0).toLowerCase() + typeClassLow.slice(1);
                    textoRepository+= "(" + arrayLast[m] + " " + typeClassLow + ");\n";

                    //inserción de findBy necesarios para friendship y appears
                    if(id2!=null){
                        textoRepository+= textoRepositoryTemplate;
                        if(parentClass!=null){
                            var tempid1= id1;
                            tempid1= tempid1.charAt(0).toUpperCase() + tempid1.slice(1);
                            var tempid2= id2;
                            tempid2= tempid2.charAt(0).toUpperCase() + tempid2.slice(1);
                            var id= id1;
                            id= id.slice(id.indexOf('i'));
                            id= id.charAt(0).toUpperCase() + id.slice(1);
                            textoRepository+= tempid1 + "And" + tempid1 + id + "And" + tempid2 + id + "(";
                        }else{
                            var id1Upper= id1;
                            var id2Upper=id2;
                            id1Upper= id1Upper.charAt(0).toUpperCase() + id1Upper.slice(1);
                            id2Upper= id2Upper.charAt(0).toUpperCase() + id2Upper.slice(1);
                            textoRepository+= arrayLast[m] + "And" + id1Upper+ "And" + id2Upper + "(";
                        }
                        textoRepository+= arrayLast[m] + " " + typeClassLow + ",String " + id1 + "," + "String " + id2 + ");\n";
                    }
                    for(var k3=0; k3<arrayRepositories.length;k3++){
                        textoRepository+= textoRepositoryTemplate + arrayLast[m];
                        var typeClassUp= arrayRepositories[k3];
                        typeClassUp= typeClassUp.charAt(0).toUpperCase() + typeClassUp.slice(1);
                        textoRepository+= "And" + typeClassUp;
                        textoRepository+= "(" + arrayLast[m] + " " + typeClassLow;
                        textoRepository+= ", String " + arrayRepositories[k3] + ");\n";
                    } 
                }

                if(mapOneToMany2.has(typeClass)){
                    var textoRepositoryTemplate="List <" + typeClass + "> findAllBy";
                    var arrayLast= mapOneToMany2.get(typeClass);
                    if(mapOneToMany2.get(typeClass)[1]!= map.get(typeClass)){
                    for(var m=1; m<arrayLast.length;m++){
                        var typeClassLow= arrayLast[m];
                        typeClassLow= typeClassLow.charAt(0).toLowerCase() + typeClassLow.slice(1);
                        textoRepository+= textoRepositoryTemplate + arrayLast[m];
                        textoRepository+= "(" + arrayLast[m] + " " + typeClassLow + ");\n";
                    for(var k3=0; k3<arrayRepositories.length;k3++){
                        textoRepository+= textoRepositoryTemplate + arrayLast[m];
                        var typeClassUp= arrayRepositories[k3];
                        typeClassUp= typeClassUp.charAt(0).toUpperCase() + typeClassUp.slice(1);
                        textoRepository+= "And" + typeClassUp;
                        textoRepository+= "(" + arrayLast[m] + " " + typeClassLow;
                        textoRepository+= ", String " + arrayRepositories[k3] + ");\n";
                    } 
                }
              }
            }
        }
            textoRepository+="}\n";
            return textoRepository;
    }
    /*
    let triplesMaps3= funciones.getTriplesId();
    for(var l=0;l<triplesMaps3.length;l++){
        //console.log(this.generateRepositories(triplesMaps3[l]));
        //createFile(repositoryFiles[l],generateRepositories(triplesMaps3[l]));
    }
/*5.Crear archivo graphqls y su directorio*/
//createDir(pathGQLDir);

function generateType(triplesMap){
    let textoType="";
    let subjMap= funciones.getIdsFromTripleMap(triplesMap).subjectMapId;
    let typeClass= funciones.getClassNameFromSubjMap(subjMap);
    var arrayType=[];
    var parents=[];
    var aux2=[];
    var parentTriples=[];
    textoType+="type " + typeClass + "{\n";
    let poms= funciones.getIdsFromTripleMap(triplesMap).predicateObjectMapIds;
    for(var i=0; i<poms.length;i++){
        let objMap= funciones.getIdsFromPredObjMap(poms[i]).objectMapId;
        let predicate=funciones.getIdsFromPredObjMap(poms[i]).predicateId;
        var funcionesAux= funciones.getAttributeFromPredMap(predicate);
        var dataType= funciones.getDataTypeFromObjMap(objMap).dataType;

        //sacar tripleta padre y sus objectos para funciones de joins (appearsIn, episode,hero...)
        var parent= funciones.getDataTypeFromObjMap_JoinCondition(objMap).parent;
        var subjAux=funciones.getIdsFromTripleMap(parent).subjectMapId;
        var classAux= funciones.getClassNameFromSubjMap(subjAux);
        parents.push(classAux); 
        parentTriples.push(parent); // insertar padre en array de parents de la tripleta correspondiente
        aux2.push(funcionesAux); //guardar funciones auxiliares (appearsIn, episode, hero,type)
        
        var identifier= "identifier";            
        //para que solo haya un único id en array de datos de cada entidad
        if(!arrayType.includes(identifier)){
            arrayType.push(identifier);
        }
        if (dataType!=null && dataType.charAt(0)=="{"){
            var dataType2= funciones.getDataTypeFromObjMap(objMap).arrayTemplates;
            for(var m=0; m<dataType2.length;m++){
                dataType= dataType2[m];
                arrayType.push(dataType);
            }
        }else if(dataType!=null && !arrayType.includes(dataType) && dataType.charAt(0)!="{"){
            arrayType.push(dataType);
         }
         

    }

        for (var k=0;k<arrayType.length;k++){
            textoType+= "\t" + arrayType[k] + ": String\n";
        }
        //meter funciones con joins en array de types
        var arrayFinal;
        for(var l=0;l<aux2.length;l++){
                arrayFinal=generateType(parentTriples[l]).arrayType; //obtener parametros de la tripleta padre
                if(parents[l]!=null){
                textoType+= "\t" + aux2[l] + " (";
                for(var j=0;j<arrayFinal.length;j++){
                    if(j==arrayFinal.length-1){
                        textoType+= arrayFinal[j] + ": String)";
                    }else{
                        textoType+= arrayFinal[j] + ": String, "
                    }
                }
                textoType+=": [" + parents[l] + "]\n";
            }    
        }
        textoType+= "}\n\n"; 
        return {textoType,arrayType};
}


function generateQuery(triplesMap){
    let querySchema="";
    let subjMap= funciones.getIdsFromTripleMap(triplesMap).subjectMapId;
    let typeClass= funciones.getClassNameFromSubjMap(subjMap);
    var arrayQuery=[];
    let poms= funciones.getIdsFromTripleMap(triplesMap).predicateObjectMapIds;
    for(var i=0; i<poms.length;i++){
        let objMap= funciones.getIdsFromPredObjMap(poms[i]).objectMapId;
        var dataType= funciones.getDataTypeFromObjMap(objMap).dataType;
        //var dataType3= funciones.getTemplateFromSubjMap(subjMap); //sacar id de template
        var identifier= "identifier";            
        //para que solo haya un único id en array de datos de cada entidad
        if(!arrayQuery.includes(identifier)){
            arrayQuery.push(identifier);
        }
        if (dataType!=null && dataType.charAt(0)=="{"){
            var dataType2= funciones.getDataTypeFromObjMap(objMap).arrayTemplates;
            for(var m=0; m<dataType2.length;m++){
                dataType= dataType2[m];
                arrayQuery.push(dataType);
            }
        }else if(dataType!=null && !arrayQuery.includes(dataType) && dataType.charAt(0)!="{"){
            arrayQuery.push(dataType);
         }

    }
        querySchema+= "\t list" + typeClass + "(";
        for (var k= 0;k<arrayQuery.length;k++){
            if(k!=arrayQuery.length-1){
                querySchema+= arrayQuery[k] + ": String, ";
            }else{
                querySchema+= arrayQuery[k] + ": String):";
            }
        }
        querySchema+= "[" + typeClass + "]";
        return querySchema;
}
/*
function generateMutation(triplesMap){
    let mutationSchema="";
    let subjMap= funciones.getIdsFromTripleMap(triplesMap).subjectMapId;
    let typeClass= funciones.getClassNameFromSubjMap(subjMap);
    var arrayMutation=[];
    let poms= funciones.getIdsFromTripleMap(triplesMap).predicateObjectMapIds;
    for(var i=0; i<poms.length;i++){
        let objMap= funciones.getIdsFromPredObjMap(poms[i]).objectMapId;
        var dataType= funciones.getDataTypeFromObjMap(objMap).dataType;
       // var dataType3= funciones.getTemplateFromSubjMap(subjMap); //sacar id de template
        var identifier= "identifier";            
        //para que solo haya un único id en array de datos de cada entidad
        if(!arrayMutation.includes(identifier)){
            arrayMutation.push(identifier);
        }
        if (dataType!=null && dataType.charAt(0)=="{"){
            var dataType2= funciones.getDataTypeFromObjMap(objMap).arrayTemplates;
            for(var m=0; m<dataType2.length;m++){
                dataType= dataType2[m];
                arrayMutation.push(dataType);
            }
        }else if(dataType!=null && !arrayMutation.includes(dataType) && dataType.charAt(0)!="{"){
            arrayMutation.push(dataType);
         }

    }
        mutationSchema+= "\t create" + typeClass + "(";
        for (var k= 0;k<arrayMutation.length;k++){
            if(k!=arrayMutation.length-1){
                mutationSchema+= arrayMutation[k] + ": String, ";
            }else{
                mutationSchema+= arrayMutation[k] + ": String):";
            }
        }
        mutationSchema+= typeClass;
        return mutationSchema;
}*/

exports.generateSchema= function(){
var texto="";
let triplesMaps= funciones.getTriplesId();
for(var j=0;j<triplesMaps.length;j++){
    texto+=generateType(triplesMaps[j]).textoType;
    //console.log(generateType(triplesMaps[j]).textoType);
}

texto+= "\ntype Query {\n";
for(var m=0;m<triplesMaps.length;m++){
    texto+=generateQuery(triplesMaps[m]) + "\n";
    //console.log(generateQuery(triplesMaps[m]));
}
texto+="}\n";
/*texto+= "\ntype Mutation {\n";
for(var n=0;n<triplesMaps.length;n++){
    texto+=generateMutation(triplesMaps[n]) + "\n";
    //console.log(generateMutation(triplesMaps[n]));
}*/
return texto;
}

//console.log(this.generateSchema());
//createFile(pathGQLFile,texto);

/*6. Crear ficheros correspondientes al Resolver (van a implementar funciones Auxiliares: type, AppearsIn, Episode, hero)*/
createDir(pathResolverDir);
exports.hasRelationship=function(triplesMap){
    var related=false;
    let subjMap= funciones.getIdsFromTripleMap(triplesMap).subjectMapId;
    let typeClass= funciones.getClassNameFromSubjMap(subjMap);
    let poms= funciones.getIdsFromTripleMap(triplesMap).predicateObjectMapIds;
    for(var i=0; i<poms.length;i++){
        let objMap= funciones.getIdsFromPredObjMap(poms[i]).objectMapId;
        //sacar tripleta padre y sus objectos para funciones de joins (appearsIn, episode,hero...)
        var parent= funciones.getDataTypeFromObjMap_JoinCondition(objMap).parent;
        if(parent!=null){
            related=true;
        }
    }
    return related;
}

//function generateResolver(triplesMap){
exports.generateResolver= function(triplesMap){
    var textoResolver="";
    textoResolver+= "package com.example.demo.resolver;\n";
    textoResolver+= "import java.util.ArrayList;\n";
    textoResolver+= "import java.util.List;\n";
    textoResolver+= "import javax.persistence.EntityManager;\n";
    textoResolver+= "import javax.persistence.PersistenceContext;\n";
    textoResolver+= "import com.coxautodev.graphql.tools.GraphQLResolver;\n";
    textoResolver+= "import java.util.List;\n";
    textoResolver+= "import com.example.demo.dao.entity.*;\n";
    textoResolver+= "import com.example.demo.dao.entity.Character;\n";
    textoResolver+= "import org.springframework.stereotype.Component;\n";
    textoResolver+= "import com.example.demo.dao.repository.*;\n";
    textoResolver+= "@Component\n";
        let subjMap= funciones.getIdsFromTripleMap(triplesMap).subjectMapId;
        let typeClass= funciones.getClassNameFromSubjMap(subjMap);
        var typeClassLow= typeClass;
        typeClassLow= typeClassLow.charAt(0).toLowerCase() + typeClassLow.slice(1);
        textoResolver+= "public class " + typeClass + "Resolver implements GraphQLResolver <" + typeClass + ">{\n";
        var aux2=[];
        var parents=[];
        var parentTriples=[];
        var map= new Map();
        var map2= new Map();
        var map3= new Map();
        var idsArray=[];
        let poms= funciones.getIdsFromTripleMap(triplesMap).predicateObjectMapIds;
        for(var i=0; i<poms.length;i++){
            let objMap= funciones.getIdsFromPredObjMap(poms[i]).objectMapId;
            var dataType= funciones.getDataTypeFromObjMap(objMap).dataType;
            let predicate=funciones.getIdsFromPredObjMap(poms[i]).predicateId;
            var funcionesAux= funciones.getAttributeFromPredMap(predicate);
            var dataType3= funciones.getTemplateFromSubjMap(subjMap).templateId; //sacar id de template (1º o unico)
            //sacar tripleta padre y sus objectos para funciones de joins (appearsIn, episode,hero...)
            var parent= funciones.getDataTypeFromObjMap_JoinCondition(objMap).parent;
            var child= funciones.getDataTypeFromObjMap_JoinCondition(objMap).child;
            var parentCond= funciones.getDataTypeFromObjMap_JoinCondition(objMap).parentCond;
            //si id hijo es igual a id padre
            var subjAux=funciones.getIdsFromTripleMap(parent).subjectMapId;
            var classAux= funciones.getClassNameFromSubjMap(subjAux);
            if(child==parentCond){
                map2.set(classAux,child);
            }
            var templateId= funciones.getTemplateFromSubjMap(subjAux).templateId;
            var templateId2= funciones.getTemplateFromSubjMap(subjAux).templateId2;
            if(!idsArray.includes(templateId) && templateId!=null){
                idsArray= templateId;
            }
            //map solo contiene clases padre con 2º id en template
            if(templateId2!=null){
                map.set(classAux,[templateId2]);
                map3.set(classAux,templateId);
            }
            if(classAux!=null){
                parents.push(classAux); 
            }
            parentTriples.push(parent); // insertar padre en array de parents de la tripleta correspondiente
            aux2.push(funcionesAux); //guardar funciones auxiliares (appearsIn, episode, hero,type) 
        }

        var map4= generateMutationRoot(mappingDoc).mapOneToMany;
        for(var j=0; j<parents.length;j++){
            var parentLow= parents[j];
            parentLow= parentLow.charAt(0).toLowerCase() + parentLow.slice(1);
            textoResolver+= "private final " + parents[j] + "Repository "+ parentLow + "Repository;\n"; 
        }
        textoResolver+= "\tpublic "+ typeClass + "Resolver(";
        for(var k=0; k<parents.length;k++){
            var parentLow= parents[k];
            parentLow= parentLow.charAt(0).toLowerCase() + parentLow.slice(1);
            if(k!= parents.length-1){
                textoResolver+= "final " + parents[k] + "Repository "+ parentLow + "Repository,"; 
            }else{
                textoResolver+= "final " + parents[k] + "Repository "+ parentLow + "Repository){\n"; 
            } 
        }
        for(var l=0; l<parents.length;l++){
            var parentLow= parents[l];
            parentLow= parentLow.charAt(0).toLowerCase() + parentLow.slice(1);
            textoResolver+= "\t\tthis." + parentLow + "Repository = "+ parentLow + "Repository;\n"; 
        }
        textoResolver+="\t}\n";

        //recorrer funciones auxiliares (type, appearsIn..)
        var arrayFinal;
        for(var m=0;m<parents.length;m++){
            var auxUpper= aux2[m];
            auxUpper= auxUpper.charAt(0).toUpperCase() + auxUpper.slice(1);
            textoResolver+="\tpublic List<" + parents[m] + "> get" + auxUpper + "(";
            textoResolver+= typeClass + " " + typeClassLow + ",";
            arrayFinal=generateType(parentTriples[m]).arrayType;
            for(var m2=0; m2<arrayFinal.length;m2++){
                if(m2!=arrayFinal.length-1){
                    textoResolver+= "final String " + arrayFinal[m2] + ",";
                }else{
                    textoResolver+= "final String " + arrayFinal[m2] + "){\n"
                }
            }
            textoResolver+= "\t\tList<" + parents[m] + "> join = new ArrayList<" + parents[m] + ">();\n";
            for(var m3=0; m3<arrayFinal.length;m3++){
                var parentLow= parents[m];
                parentLow= parentLow.charAt(0).toLowerCase() + parentLow.slice(1);
                var elementUpper= arrayFinal[m3];
                elementUpper= elementUpper.charAt(0).toUpperCase() + elementUpper.slice(1);
                var auxId= elementUpper;
                auxId= auxId.slice(0,2);
                if(m3==0){
                    textoResolver+= "\t\t\tif (" + arrayFinal[m3] + "!=null){\n";
                    if(map.has(parents[m])){
                    textoResolver+= "\t\t\t\tString id1="+ arrayFinal[m3] + ".substring(" + arrayFinal[m3] + ".lastIndexOf('/')-4";
                    textoResolver+=  "," + arrayFinal[m3] + ".lastIndexOf('/'));\n";
                    textoResolver+= "\t\t\t\tString id2=" + arrayFinal[m3] + ".substring(" + arrayFinal[m3] + ".lastIndexOf('/') + 1,";
                    textoResolver+=  arrayFinal[m3] + ".length());\n";
                    textoResolver+= "\t\t\t\tjoin=" + parentLow + "Repository.findAllBy";
                        if(!map2.has(parents[m])){
                            var parentId1=map3.get(parents[m]);
                            var parentId2= map.get(parents[m]);
                            var auxParent= parentId2[m3];
                            auxParent= auxParent.charAt(0).toUpperCase() + auxParent.slice(1); 
                            parentId1= parentId1.charAt(0).toUpperCase() + parentId1.slice(1);
                            textoResolver+= parentId1 + "And" + parentId1 + auxId +  "And" + auxParent + auxId;
                        }else{
                            textoResolver+= typeClass + "And";
                            for(var m4=arrayFinal.length-1;m4>0;m4--){
                                var elementUpper2= arrayFinal[m4];
                                elementUpper2= elementUpper2.charAt(0).toUpperCase() + elementUpper2.slice(1);
                                if(m4!=1){
                                    textoResolver+= elementUpper2 + "And";
                                }else{
                                    textoResolver+= elementUpper2;
                                }
                            }
                            
                        }
                        textoResolver+= "(" + typeClassLow + ",id1,id2);\n";
                       
                    }else{
                    textoResolver+= "\t\t\t\tString id1=" + arrayFinal[m3] + ".substring(" + arrayFinal[m3] + ".lastIndexOf('/') + 1,";
                    textoResolver+=  arrayFinal[m3] + ".length());\n";
                    textoResolver+=  "\t\t\t\tjoin=" + parentLow + "Repository.findAllBy" + typeClass + "And" + auxId;
                    textoResolver+= "(" + typeClassLow + ", id1);\n";
                    }
                }else{
                    textoResolver+= "\t\t\t}else if (" + arrayFinal[m3] + "!=null){\n";
                    textoResolver+=  "\t\t\t\tjoin=" + parentLow + "Repository.findAllBy" + typeClass + "And" + elementUpper;
                    textoResolver+= "(" + typeClassLow + "," + arrayFinal[m3] + ");\n";
                }
            }

            textoResolver+= "\t\t\t}else{\n";
            textoResolver+= "\t\t\t\tjoin=" + parentLow + "Repository.findAllBy" ;
            if(idsArray==map3.get(parents[m]) && map3.has(parents[m])){
                var auxUpper= map3.get(parents[m]);
                auxUpper= auxUpper.charAt(0).toUpperCase() + auxUpper.slice(1);
                textoResolver+= auxUpper;
            }else{
               textoResolver+=typeClass;
            }
            textoResolver+= "(" + typeClassLow + ");\n"; 
            textoResolver+="\t\t\t}\n";
            textoResolver+="\t\t\treturn join;\n";
            textoResolver+="\t\t}\n\n";
        }
        textoResolver+= "}\n";
        return textoResolver;
}
    /*
     let triplesMaps4= funciones.getTriplesId();
     var resolvers=[];
     for(var i=0; i<triplesMaps4.length;i++){
         if(triplesMaps4[i]=='file:///base/data/home/apps/s%7Erdf-translator/2.408516547054015808/TMAppears' ||
         triplesMaps4[i]=='file:///base/data/home/apps/s%7Erdf-translator/2.408516547054015808/TMCharacters' ||
         triplesMaps4[i]=='file:///base/data/home/apps/s%7Erdf-translator/2.408516547054015808/TMHeroes'){
            resolvers.push(triplesMaps4[i]);
         }
     }
      for (var j=0;j<triplesMaps4.length;j++){
        //createFile(resolverFiles[i],textoResolver);
        //console.log(triplesMaps4[j]+ ":" + this.hasRelationship(triplesMaps4[j]))
        if(this.hasRelationship(triplesMaps4[j])){
            console.log(this.generateResolver(triplesMaps4[j]));
        }
    }

/*7. Añadir dependencias graphql y lombok a pom.xml */
exports.getPom=function(){
var str =`
    <dependency>
       <groupId>com.graphql-java</groupId>
       <artifactId>graphql-spring-boot-starter</artifactId>
       <version>5.0.2</version>
    </dependency>
    <dependency>
       <groupId>com.graphql-java</groupId>
       <artifactId>graphql-java-tools</artifactId>
       <version>5.2.4</version>
    </dependency>
    <dependency>
       <groupId>com.graphql-java</groupId>
       <artifactId>graphiql-spring-boot-starter</artifactId>
       <version>5.0.2</version>
    </dependency>
    <dependency>
         <groupId>mysql</groupId>
         <artifactId>mysql-connector-java</artifactId>
         <scope>runtime</scope>
   </dependency>
    <dependency>
       <groupId>org.projectlombok</groupId>
       <artifactId>lombok</artifactId>
       <version>1.18.8</version>
       <optional>true</optional>
   </dependency>\n`;
   return str;
}
/*9. Añadir especificaciones a application.properties*/
exports.getApplicationProperties=function(){
const textoAppPty= `
spring.datasource.url=jdbc:mysql://localhost:3306/mydb?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=Pasapurar14
spring.jpa.hibernate.use-new-id-generator-mappings=false
spring.jpa.hibernate.ddl-auto=update`;
return textoAppPty;
}


