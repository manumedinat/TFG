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

var serviceFiles = [pathAppearsServiceFile, pathCharacterServiceFile, pathCharacterTypeServiceFile,
pathEpisodeServiceFile, pathFriendsServiceFile, pathHeroesServiceFile];
/*-------------VARIABLES FICHEROS DIRECTORIO QUERY--------------------*/
const pathQueryFile= pathQueryDir + "/Query.java";
/*-------------VARIABLES FICHEROS DIRECTORIO MUTATION--------------------*/
const pathMutationFile= pathMutationDir + "/Mutation.java";
/*-------------VARIABLES FICHEROS DIRECTORIO RESOLVER--------------------*/
const pathAppearsResolverFile= pathResolverDir + "/"+ arrayEntities[0] + "Resolver.java";
const pathCharacterResolverFile= pathResolverDir + "/"+ arrayEntities[1] + "Resolver.java";
const pathHeroesResolverFile= pathResolverDir + "/"+ arrayEntities[5] + "Resolver.java";

var resolverFiles = [pathAppearsResolverFile, pathCharacterResolverFile,  pathHeroesResolverFile];
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

/*-------------VARIABLES FICHEROS DIRECTORIO REPOSITORY--------------------*/
const pathAppearsRepositoryFile= pathDaoRepositoryDir +"/"+  arrayEntities[0] +  "Repository.java";
const pathCharacterRepositoryFile= pathDaoRepositoryDir +"/"+  arrayEntities[1] +  "Repository.java";
const pathCharacterTypeRepositoryFile= pathDaoRepositoryDir +"/"+  arrayEntities[2] + "Repository.java";
const pathEpisodeRepositoryFile= pathDaoRepositoryDir +"/"+  arrayEntities[3] +  "Repository.java";
const pathFriendsRepositoryFile= pathDaoRepositoryDir +"/"+  arrayEntities[4] +   "Repository.java";
const pathHeroesRepositoryFile= pathDaoRepositoryDir +"/"+  arrayEntities[5] +  "Repository.java";
var repositoryFiles = [pathFriendsRepositoryFile,pathHeroesRepositoryFile,pathAppearsRepositoryFile, 
    pathCharacterRepositoryFile,pathEpisodeRepositoryFile,pathCharacterTypeRepositoryFile];
   
/*-------------VARIABLES FICHERO SCHEMA GQL--------------------*/
const pathGQLFile= '../prueba/src/main/resources/graphql/starwarsql.graphqls';
const pathAppPtyFile= '../prueba/src/main/resources/application.properties';

//---------CONSTRUCCION APP---------------------------*/

/*1. Crear directorio service y ficheros pertenecientes al directorio service*/
createDir(pathServiceDir); //directorio

var textoServiceInicio= 
`package com.example.demo.service;

import com.example.demo.dao.entity.*;
import com.example.demo.dao.entity.Character;
import com.example.demo.dao.repository.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class `;

for (var i=0; i<arrayEntities.length;i++){
    textoService= textoServiceInicio;
    textoService+= arrayEntities[i];
    var name= arrayEntities[i];
    name= arrayEntities[i].charAt(0).toLowerCase() + name.slice(1);
    textoService+=`Service {

    private final `;

    textoService+=arrayEntities[i]+ `Repository `;
    textoService+= name + `Repository;\n`;
    textoService+= `public ` + arrayEntities[i] + `Service (final ` + arrayEntities[i] + `Repository ` + name + `Repository){\n`; 
    textoService+= `this.` + name + `Repository = ` + name + `Repository;\n`;
    textoService+= `}\n`;
    textoService+= `@Transactional\n`;
    textoService+= `public ` + arrayEntities[i] + ` create` + arrayEntities[i];
      if(i==0){
      textoService+= ` (final String charid, final String episodeid) {\n`;
      textoService+= ` final Appears appears = new Appears();
         appears.setCharid(charid);
         appears.setEpisodeid(episodeid);
         return this.appearsRepository.save(appears);
       }
        
    @Transactional(readOnly = true)
       public Iterable<Appears> getAllAppears(final String charid, final String episodeid) {
         if(appearsRepository.findAllByCharidOrEpisodeid(charid,episodeid).isEmpty()){
            return this.appearsRepository.findAll();
           }
            return this.appearsRepository.findAllByCharidOrEpisodeid(charid,episodeid);
        }
    }`
     }else if(i==1){
      textoService+= ` (final String id, final String typeid,final String fname, final String lname) {\n`;
      textoService+= ` final Character character = new Character();
      character.setId(id);
      character.setTypeid(typeid);
      character.setFname(fname);
      character.setLname(lname);
      return this.characterRepository.save(character);
    }
        
    @Transactional(readOnly = true)
      public Iterable<Character> getAllCharacter(final String id, final String typeid, final String fname, final String lname) {
         if (characterRepository.findAllByIdOrTypeidOrFnameOrLname(id,typeid,fname,lname).isEmpty()) {
                return this.characterRepository.findAll();
           }
              return this.characterRepository.findAllByIdOrTypeidOrFnameOrLname(id,typeid,fname,lname); 
        }  
    }`
     }else if (i==2){
        textoService+= ` (final String id, final String name) {\n`;
        textoService+= ` final CharacterType characterType = new CharacterType();
        characterType.setId(id);
        characterType.setName(name);
        return this.characterTypeRepository.save(characterType);
    }

     @Transactional(readOnly = true)
       public Iterable<CharacterType> getAllCharacterType(final String id, final String name) {
         if (characterTypeRepository.findAllByIdOrName(id,name).isEmpty()) {
        return this.characterTypeRepository.findAll();
      }
      return this.characterTypeRepository.findAllByIdOrName(id,name);
    }
}`
    }else if (i==3){
        textoService+= ` (String id, String code) {\n`;
        textoService+= ` final Episode episode = new Episode();
        episode.setCode(code);
        episode.setId(id);
        return this.episodeRepository.save(episode);
    }

    @Transactional(readOnly = true)
    public Iterable<Episode> getAllEpisode(String id, String code) {
        if(episodeRepository.findAllByIdOrCode(id, code).isEmpty()){
            return this.episodeRepository.findAll();
        }
        return this.episodeRepository.findAllByIdOrCode(id, code);
    }
   
}`
    
    }else if(i==4){
        textoService+= ` (String id, String fid) {\n`;
        textoService+= ` final Friendship friendship = new Friendship();
        friendship.setId(id);
        friendship.setFid(fid);
        return this.friendshipRepository.save(friendship);
    }

    @Transactional(readOnly = true)
    public Iterable<Friendship> getAllFriendship(String id, String fid) {
        if(friendshipRepository.findAllByIdOrFid(id, fid).isEmpty()){
            return this.friendshipRepository.findAll();
        }
        return this.friendshipRepository.findAllByIdOrFid(id, fid);
    }
   
}`
    }else{
        textoService+= ` (String episodeid, String charid) {\n`;
        textoService+= ` final Heroes heroes = new Heroes();
        heroes.setEpisodeid(episodeid);
        heroes.setCharid(charid);
        return this.heroesRepository.save(heroes);
    }

    @Transactional(readOnly = true)
    public List<Heroes> getAllHeroes(String episodeid, String charid) {
      // if(heroesRepository.findHeroesByEpisodeid(episodeid, charid).isEmpty()){
        if(heroesRepository.findAllByEpisodeidOrCharid(episodeid,charid).isEmpty()){
        return this.heroesRepository.findAll();
        }
        return this.heroesRepository.findAllByEpisodeidOrCharid(episodeid,charid);
    }
}` 
    }
    for (var j=0;j<serviceFiles.length;j++){
        createFile(serviceFiles[i],textoService);
    }
  }

/*************************************************************************** */


/*2. Crear directorio query y fichero query*/
createDir(pathQueryDir); //directorio


/** QUERY ROOT IMPLEMENTATION */
function generateQueryRoot(mappingDoc){
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
                     let predicVal= funciones.getIdsFromPredObjMap(poms[k]).predicateId;
                     var dataType= funciones.getDataTypeFromObjMap(objMap).dataType;
                     var dataType3= funciones.getTemplateFromSubjMap(subjMap); //sacar id de template
                     
                     //para que solo haya un único id en array de datos de cada entidad
                     if(!arrayData.includes(dataType3)){
                     arrayData.push(dataType3);
                     }
                     
                     if(dataType!=null && !arrayData.includes(dataType) && dataType.charAt(0)!="{"){
                        arrayData.push(dataType);
                     }else if (dataType.charAt(0)=="{"){
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
createFile(pathQueryFile, generateQueryRoot(mappingDoc));
/****************************************************************************** */
/*3. Crear directorio y fichero mutation*/
createDir(pathMutationDir); //directorio

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
                 var dataType3= funciones.getTemplateFromSubjMap(subjMap); //sacar id de template
                     
                 //para que solo haya un único id en array de datos de cada entidad
                 if(!arrayData.includes(dataType3)){
                     arrayData.push(dataType3);
                 }
                 if(dataType!=null && !arrayData.includes(dataType) && dataType.charAt(0)!="{"){
                    arrayData.push(dataType);
                 }else if (dataType.charAt(0)=="{"){
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
    return mutationInit;
    
}
//console.log(generateMutationRoot(mappingDoc));
createFile(pathMutationFile, generateMutationRoot(mappingDoc));

/*4. Crear directorio dao*/
createDir(pathDaoDir); //directorio

/*4.1 Crear directorio entity y fichero entity*/
createDir(pathDaoEntityDir);

function generateEntities(triplesMap){
var textoEntity="";
textoEntity+= "package com.example.demo.dao.entity;\n";
textoEntity+= "import lombok.Data;\n";
textoEntity+= "import lombok.EqualsAndHashCode;\n";
textoEntity+= "import javax.persistence.*;\n";
textoEntity+= "import java.io.Serializable;\n";
textoEntity+= "@Data\n";
textoEntity+= "@EqualsAndHashCode\n";
textoEntity+= "@Entity\n";
    let subjMap= funciones.getIdsFromTripleMap(triplesMap).subjectMapId;
    let typeClass= funciones.getClassNameFromSubjMap(subjMap);
    var typeClassLow= typeClass;
    typeClassLow= typeClassLow.charAt(0).toLowerCase() + typeClassLow.slice(1);
    textoEntity+= '@Table (name="' + typeClassLow + '_SW")\n';
    textoEntity+= "public class " + typeClass + " implements Serializable{\n"
    textoEntity+= "private static final long serialVersionUID = 1L;\n"
    var arrayEntities=[];
    var arrayChilds=[];
    const arrayAux=[];
    var arrayParents=[];
    let poms= funciones.getIdsFromTripleMap(triplesMap).predicateObjectMapIds;
    for(var i=0; i<poms.length;i++){
        let objMap= funciones.getIdsFromPredObjMap(poms[i]).objectMapId;
        var dataType= funciones.getDataTypeFromObjMap(objMap).dataType;
        var dataType3= funciones.getTemplateFromSubjMap(subjMap); //sacar id de template
        var child= funciones.getDataTypeFromObjMap(objMap).child; //sacar columna (foreign key)
        var parentCond= funciones.getDataTypeFromObjMap(objMap).parentCond; //para sacar charid de Appears
       // if(!arrayChilds.includes(child)){
            arrayChilds.push(child);
        //} 

        var parent=funciones.getDataTypeFromObjMap(objMap).parent;//sacar tripleta padre   
        var parentSubjMap= funciones.getIdsFromTripleMap(parent).subjectMapId;
        var parentClass= funciones.getClassNameFromSubjMap(parentSubjMap);  
        arrayParents.push(parentClass); //nombres de las clases padres en arrayParents   

        //para que solo haya un único id en array de datos de cada entidad
        if(!arrayEntities.includes(dataType3)){
            arrayEntities.push(dataType3);
        }
        if (dataType.charAt(0)=="{"){
            var dataType2= funciones.getDataTypeFromObjMap(objMap).arrayTemplates;
            for(var m=0; m<dataType2.length;m++){
                dataType= dataType2[m];
                arrayEntities.push(dataType);
            }
        }else if(dataType!=null && !arrayEntities.includes(dataType) && dataType.charAt(0)!="{"){
            arrayEntities.push(dataType);
         }

    }
        for (var k=0; k<arrayEntities.length;k++){
            if(k==0){
                textoEntity+="\t@Id\n";
            }
           // textoEntity+= '\t@Column(name="' + arrayEntities[k] + '")\n'; 
            //textoEntity+= "\tprivate String " + arrayEntities[k] + ";\n\n";
            if(arrayChilds.includes(arrayEntities[k])){
            for(var m=0; m<arrayChilds.length;m++){
            if(arrayChilds[m]== arrayEntities[k] && arrayParents[m]!=null){
                if(arrayChilds[m+1]!= arrayChilds[m]){
                textoEntity+= '\t@Column(name="' + arrayChilds[m] + '")\n'; 
                textoEntity+= "\tprivate String " + arrayChilds[m] + ";\n\n";
                textoEntity+= "\t@ManyToOne(fetch = FetchType.EAGER)\n";
                textoEntity+= '\t@JoinColumn(name="' + arrayChilds[m] + '", insertable=false, updatable=false)\n';
                var typeClassLow= arrayParents[m];
                typeClassLow= typeClassLow.charAt(0).toLowerCase() + typeClassLow.slice(1);
                textoEntity+= "\tprivate " + arrayParents[m] + " " + typeClassLow + ";\n\n";
                }
            }
            }
        }else{
            textoEntity+= '\t@Column(name="' + arrayEntities[k] + '")\n'; 
            textoEntity+= "\tprivate String " + arrayEntities[k] + ";\n\n";
        }
        }
        textoEntity+="}\n";
        return textoEntity;
}
let triplesMaps2= funciones.getTriplesId();
for(var j=0;j<triplesMaps2.length;j++){
    //console.log(generateEntities(triplesMaps2[j]));
    createFile(entityFiles[j],generateEntities(triplesMaps2[j]));
}
/*******************************************************
 * 
 * 
 */


/*4.2 Crear directorio y fichero repository*/
createDir(pathDaoRepositoryDir); //directorio
function generateRepositories(triplesMap){
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
        var arrayRepositories=[];
        let poms= funciones.getIdsFromTripleMap(triplesMap).predicateObjectMapIds;
        for(var i=0; i<poms.length;i++){
            let objMap= funciones.getIdsFromPredObjMap(poms[i]).objectMapId;
            var dataType= funciones.getDataTypeFromObjMap(objMap).dataType;
            var dataType3= funciones.getTemplateFromSubjMap(subjMap); //sacar id de template
            //para que solo haya un único id en array de datos de cada entidad
            if(!arrayRepositories.includes(dataType3)){
                arrayRepositories.push(dataType3);
            }
            if (dataType.charAt(0)=="{"){
                var dataType2= funciones.getDataTypeFromObjMap(objMap).arrayTemplates;
                for(var m=0; m<dataType2.length;m++){
                    dataType= dataType2[m];
                    arrayRepositories.push(dataType);
                }
            }else if(dataType!=null && !arrayRepositories.includes(dataType) && dataType.charAt(0)!="{"){
                arrayRepositories.push(dataType);
             }
    
        }
            textoRepository+= "List <" + typeClass + "> findAllBy";
            for (var k=0; k<arrayRepositories.length;k++){
                var repositoryUpper= arrayRepositories[k];
                repositoryUpper= repositoryUpper.charAt(0).toUpperCase() + repositoryUpper.slice(1);
                    if(k!=arrayRepositories.length-1){
                        textoRepository+= repositoryUpper + "Or";
                    }else{
                        textoRepository+= repositoryUpper;
                }
            }
            textoRepository+="(";
            for (var k2=0; k2<arrayRepositories.length;k2++){
                textoRepository+= "String ";
                if(k2!=arrayRepositories.length-1){
                    textoRepository+= arrayRepositories[k2] + ", ";
                }else{
                    textoRepository+= arrayRepositories[k2] + ");\n";
                }
            }
            textoRepository+="}\n";
            return textoRepository;
    }
    let triplesMaps3= funciones.getTriplesId();
    for(var l=0;l<triplesMaps3.length;l++){
        //console.log(generateRepositories(triplesMaps3[l]));
        createFile(repositoryFiles[l],generateRepositories(triplesMaps3[l]));
    }

/*5.Crear archivo graphqls y su directorio*/
createDir(pathGQLDir);

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
        var parent= funciones.getDataTypeFromObjMap(objMap).parent;
        var subjAux=funciones.getIdsFromTripleMap(parent).subjectMapId;
        var classAux= funciones.getClassNameFromSubjMap(subjAux);
        parents.push(classAux); 
        parentTriples.push(parent); // insertar padre en array de parents de la tripleta correspondiente
        aux2.push(funcionesAux); //guardar funciones auxiliares (appearsIn, episode, hero,type)
        var dataType3= funciones.getTemplateFromSubjMap(subjMap); //sacar id de template
                     
        //para que solo haya un único id en array de datos de cada entidad
        if(!arrayType.includes(dataType3)){
            arrayType.push(dataType3);
        }
        if (dataType.charAt(0)=="{"){
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
        textoType+= "}\n"; 
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
        var dataType3= funciones.getTemplateFromSubjMap(subjMap); //sacar id de template
                     
        //para que solo haya un único id en array de datos de cada entidad
        if(!arrayQuery.includes(dataType3)){
            arrayQuery.push(dataType3);
        }
        if (dataType.charAt(0)=="{"){
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

function generateMutation(triplesMap){
    let mutationSchema="";
    let subjMap= funciones.getIdsFromTripleMap(triplesMap).subjectMapId;
    let typeClass= funciones.getClassNameFromSubjMap(subjMap);
    var arrayMutation=[];
    let poms= funciones.getIdsFromTripleMap(triplesMap).predicateObjectMapIds;
    for(var i=0; i<poms.length;i++){
        let objMap= funciones.getIdsFromPredObjMap(poms[i]).objectMapId;
        var dataType= funciones.getDataTypeFromObjMap(objMap).dataType;
        var dataType3= funciones.getTemplateFromSubjMap(subjMap); //sacar id de template
                     
        //para que solo haya un único id en array de datos de cada entidad
        if(!arrayMutation.includes(dataType3)){
            arrayMutation.push(dataType3);
        }
        if (dataType.charAt(0)=="{"){
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
}
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
texto+= "\ntype Mutation {\n";
for(var n=0;n<triplesMaps.length;n++){
    texto+=generateMutation(triplesMaps[n]) + "\n";
    //console.log(generateMutation(triplesMaps[n]));
}
texto+="}";
//console.log(texto);
createFile(pathGQLFile,texto);

/*6. Crear directorio resolver y sus ficheros correspondientes*/
createDir(pathResolverDir);

var textoResolverInicio=
`package com.example.demo.resolver;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import com.coxautodev.graphql.tools.GraphQLResolver;
import com.example.demo.dao.*;
import com.example.demo.dao.entity.*;
import com.example.demo.dao.entity.Character;
import com.example.demo.dao.repository.*;

import org.springframework.stereotype.Component;
@Component\n`
var textoResolver;
for (var i=0; i< resolverEnt.length;i++){
    textoResolver=textoResolverInicio;
    textoResolver+= `public class ` + resolverEnt[i] + "Resolver implements GraphQLResolver <" + resolverEnt[i] + `>{\n`;
    if(i==0){
        textoResolver+= `private final EpisodeRepository episodeRepository;\n`
        textoResolver+= `public AppearsResolver (final EpisodeRepository episodeRepository){\n`
        textoResolver+= 
        `this.episodeRepository = episodeRepository;
    }
    public Iterable<Episode> getEpisode(Appears appears,  String id,  String code) {
        return episodeRepository.findAllByIdOrCode(appears.getEpisodeid(), code);
     }
}`;
    }else if (i==1){
        textoResolver+=`private final AppearsRepository appearsRepository;\n`;
        textoResolver+=`private final FriendshipRepository friendshipRepository;\n`;
        textoResolver+=`private final CharacterTypeRepository characterTypeRepository;\n`;
        textoResolver+=`public CharacterResolver (final AppearsRepository appearsRepository, final FriendshipRepository friendshipRepository, final CharacterTypeRepository characterTypeRepository){\n`;
        textoResolver+=
        `this.appearsRepository = appearsRepository;
        this.friendshipRepository = friendshipRepository;
        this.characterTypeRepository= characterTypeRepository;
    }

    public List<Appears> getAppearsIn(final Character character, final String charid, final String episodeid) {
            return appearsRepository.findAllByCharidOrEpisodeid(character.getId(),episodeid); 
        }
    public List<Friendship> getFriends(final Character character, final String id, final String fid) {
        return friendshipRepository.findAllByIdOrFid(character.getId(), character.getId());
    }
    public List<CharacterType> getType (final Character character, final String id, final String name){
        return characterTypeRepository.findAllByIdOrName(character.getTypeid(),name);
    }   
}`;
    }else{
        textoResolver+=`private final CharacterRepository characterRepository;\n`;
        textoResolver+=`private final EpisodeRepository episodeRepository;\n`;
        textoResolver+=`public HeroesResolver (final CharacterRepository characterRepository, final EpisodeRepository episodeRepository){\n`;
        textoResolver+=
        `this.characterRepository = characterRepository;
         this.episodeRepository= episodeRepository;
    }

    public List<Episode> getEpisode(Heroes heroes, final String id, final String code) {
        return episodeRepository.findAllByIdOrCode(heroes.getEpisodeid(), code);
    }
    public Iterable<Character> getHero(Heroes heroes, final String id, final String typeid, final String fname, final String lname) {
        return characterRepository.findAllByIdOrTypeidOrFnameOrLname(heroes.getCharid(), typeid, fname, lname);
    }    
}`;
   }
      for (var j=0;j<resolverFiles.length;j++){
        createFile(resolverFiles[i],textoResolver);
    }
}
/*7. Añadir dependencias graphql y lombok a pom.xml */

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
</dependency>\n`
var file_path = '../prueba/pom.xml';
fs.readFile(file_path, function read(err, data) {
        if (err) {
            throw err;
        }
    var file_content = data.toString();
    var position= file_content.lastIndexOf("y");
    file_content = file_content.substring(position+2);
    var file = fs.openSync(file_path,'r+');
    var bufferedText = new Buffer(str+file_content);
    fs.writeSync(file, bufferedText, 0, bufferedText.length, position+2);
    fs.close(file);
 });

 /*9. Añadir especificaciones a application.properties*/

 const textoAppPty= `
spring.datasource.url=jdbc:mysql://localhost:3306/mydb?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=Pasapurar14
spring.jpa.hibernate.use-new-id-generator-mappings=false
spring.jpa.hibernate.ddl-auto=update`;
createFile(pathAppPtyFile,textoAppPty);


