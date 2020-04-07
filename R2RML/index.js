/* Mecanismo para crear ficheros y directorios*/
const funciones= require('../R2RML/funciones_ttl');
const fs=require('fs');
const arrayMove= require('array-move');
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

var entityFiles = [pathAppearsEntityFile, pathCharacterEntityFile, pathCharacterTypeEntityFile,
    pathEpisodeEntityFile, pathFriendsEntityFile, pathHeroesEntityFile];

/*-------------VARIABLES FICHEROS DIRECTORIO REPOSITORY--------------------*/
const pathAppearsRepositoryFile= pathDaoRepositoryDir +"/"+  arrayEntities[0] +  "Repository.java";
const pathCharacterRepositoryFile= pathDaoRepositoryDir +"/"+  arrayEntities[1] +  "Repository.java";
const pathCharacterTypeRepositoryFile= pathDaoRepositoryDir +"/"+  arrayEntities[2] + "Repository.java";
const pathEpisodeRepositoryFile= pathDaoRepositoryDir +"/"+  arrayEntities[3] +  "Repository.java";
const pathFriendsRepositoryFile= pathDaoRepositoryDir +"/"+  arrayEntities[4] +   "Repository.java";
const pathHeroesRepositoryFile= pathDaoRepositoryDir +"/"+  arrayEntities[5] +  "Repository.java";
var repositoryFiles = [pathAppearsRepositoryFile, pathCharacterRepositoryFile, pathCharacterTypeRepositoryFile,
    pathEpisodeRepositoryFile, pathFriendsRepositoryFile, pathHeroesRepositoryFile];
   
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

import java.time.LocalDate;
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
         if(appearsRepository.findByCharid(charid).isEmpty()){
            return this.appearsRepository.findAll();
           }
            return this.appearsRepository.findByCharid(charid);
        }
    }`
     }else if(i==1){
      textoService+= ` (final String id, final String fname, final String lname, final String typeid) {\n`;
      textoService+= ` final Character character = new Character();
      character.setId(id);
      character.setFname(fname);
      character.setLname(lname);
      character.setTypeid(typeid);
      return this.characterRepository.save(character);
    }
        
    @Transactional(readOnly = true)
      public Iterable<Character> getAllCharacters(final String id, final String fname, final String lname,final String typeid) {
         if (characterRepository.findCharacterByIdOrFname(id, fname).isEmpty()) {
                return this.characterRepository.findAll();
           }
              return this.characterRepository.findCharacterByIdOrFname(id, fname); 
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
         if (characterTypeRepository.findAllCharacterTypeByIdOrName(id,name).isEmpty()) {
        return this.characterTypeRepository.findAll();
      }
      return this.characterTypeRepository.findAllCharacterTypeByIdOrName(id,name);
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
        if(episodeRepository.findEpisodeByIdOrCode(id, code).isEmpty()){
            return this.episodeRepository.findAll();
        }
        return this.episodeRepository.findEpisodeByIdOrCode(id, code);
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
        if(friendshipRepository.findFriendshipByIdOrFid(id, fid).isEmpty()){
            return this.friendshipRepository.findAll();
        }
        return this.friendshipRepository.findFriendshipByIdOrFid(id, fid);
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
        if(heroesRepository.findHeroesByEpisodeidOrCharid(episodeid,charid).isEmpty()){
        return this.heroesRepository.findAll();
        }
        return this.heroesRepository.findByEpisodeidOrCharid(episodeid,charid);
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
                     //let attribute= funciones.getAttributeFromPredMap(predicVal);
                     
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
            if(poms.length<=2){

                //para añadir campo que falta en la clase [Episode,Appears,Heroes]
                if(arrayData.length==1){
                    var dataType3= funciones.getTemplateFromSubjMap(subjMap);
                    arrayData.push(dataType3);
                }
            //clase heroes
            if(typeClass=="Heroes"){
                arrayData=arrayMove(arrayData,1,0);
            }

            //resto de clases (para mantener orden con respecto al schema)
                for (var k= arrayData.length-1;k>=0;k--){    
                    if(k==0){
                        queryInit+= "String " + arrayData[k] + "){\n";
                        queryInit+= "\t\treturn this."+ typeClassLow + "Service.getAll" + typeClass;
                        queryInit+= " (" + arrayData[k+1] +"," + arrayData[k] + ");\n"
                    }else{
                        queryInit+= "String " + arrayData[k] + ",";
                    }
                }
                    queryInit+= "\t}\n\n";

            //clase characters
            }else{
                //reordenacion array
                arrayData=arrayMove(arrayData,1,2);
                arrayData=arrayMove(arrayData,2,3);
                
                //recorrer parametros de List
                for(var k=0;k<arrayData.length;k++){
                    if(k!=arrayData.length-1){
                        queryInit+= "String " + arrayData[k] + ",";
                    }else{
                        queryInit+= "String " + arrayData[k] + "){\n";
                    }
                }
                queryInit+= "\t\treturn this."+ typeClassLow + "Service.getAll" + typeClass + "s (";
                
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
                 //let attribute= funciones.getAttributeFromPredMap(predicVal);
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
        if(poms.length<=2){
            //para añadir campo que falta en la clase [Episode,Appears,Heroes]
            if(arrayData.length==1){
                var dataType3= funciones.getTemplateFromSubjMap(subjMap);
                arrayData.push(dataType3);
            }
        //clase heroes
        if(typeClass=="Heroes"){
            arrayData= arrayMove(arrayData,1,0);
        }
        //resto de clases (para mantener orden con respecto al schema)    
            for (var k= arrayData.length-1;k>=0;k--){    
                if(k==0){
                    mutationInit+= "String " + arrayData[k] + "){\n";
                    mutationInit+= "\t\treturn this."+ typeClassLow + "Service.create" + typeClass;
                    mutationInit+= " (" + arrayData[k+1] +"," + arrayData[k] + ");\n"
                }else{
                    mutationInit+= "String " + arrayData[k] + ",";
                }
            }
            mutationInit+= "\t}\n\n";
        //clase characters
        }else{
            //reordenacion array
            arrayData=arrayMove(arrayData,1,2);
            arrayData=arrayMove(arrayData,2,3);
        
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
const textoEntityInicio=`
package com.example.demo.dao.entity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Data
@EqualsAndHashCode
@Entity\n`;

//public class `;
var textoEntity;

    for (var i=0;i<arrayEntities.length;i++){
    textoEntity=textoEntityInicio;
    if(i==1){
        textoEntity+= `@Table (name="characters")`;
    }
    textoEntity+= 'public class ' + arrayEntities[i] + ` implements Serializable{\n`;
    textoEntity+= `private static final long serialVersionUID = 1L;\n`;
    textoEntity+= `@Id\n`;
    if(i==0){
        textoEntity+= `@Column(name="ID",nullable = false)\n`;
        textoEntity+= `@GeneratedValue\n`;
        textoEntity+= `private int _id;\n`;
        textoEntity+=
       `@Column(unique = false)
        private String charid;
   
        @Column(name = "episodeid", nullable = false)
        private String episodeid;
    }` 
    }else if(i==1){
        textoEntity+= `private String id;\n`;
        textoEntity+= `@OneToOne(fetch = FetchType.LAZY)\n`;
        textoEntity+=
      `@MapsId
       @JoinColumn(name="id")
       private Friendship friendship;
       
       @Column(name = "fname", nullable = false)
       private String fname;
   
       @Column(name = "lname")
       private String lname;
   
       @Column(name = "type", nullable = false)
       private String typeid;
    }`

    }else if(i==2){
        textoEntity+= `@Column(name="type")\n`;
        textoEntity+= `private String id;\n`;
        textoEntity+=
      `@Column(name = "name", nullable = false)
       private String name;  
    }`
    }else if(i==3){
        textoEntity+= `@Column(name="eid")\n`;
        textoEntity+= `private String id;\n`;
        textoEntity+=
      `@Column(name = "ecode", nullable = false)
       private String code;  
    }`
    }else if(i==4){
        textoEntity+= `@Column(name= "ID",unique = false)\n`;
        textoEntity+= `private String id;\n`;
        textoEntity+=
      `@Column(name = "FR_ID")
       private String fid; 
    }`
    }else{
        textoEntity+= `private String episodeid;\n`;
        textoEntity+= `@Column(name = "characters_id")\n`;
        textoEntity+= `private String charid;
    }`
    }
    for (var j=0;j<entityFiles.length;j++){
        createFile(entityFiles[i],textoEntity);
    }

}


/*4.2 Crear directorio y fichero repository*/
createDir(pathDaoRepositoryDir); //directorio
const textoRepositoryInicio=
`package com.example.demo.dao.repository;
import com.example.demo.dao.entity.*;
import com.example.demo.dao.entity.Character;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository\n
`;
var textoRepository;
for (var i=0; i<arrayEntities.length;i++){
    textoRepository= textoRepositoryInicio;
    textoRepository+=`public interface ` + arrayEntities[i] + `Repository extends JpaRepository <`;
    textoRepository+= arrayEntities[i] + `,String> {\n`;
      if(i==0){
      textoRepository+= `List <Appears> findByCharid(String charid);\n`;
      textoRepository+= `List <Appears> findAppearsInByCharid(String charid);\n`;
      textoRepository+=`}`;
     }else if(i==1){
      textoRepository+= `List<Character> findCharacterByIdOrFname(String id, String fname);\n`;
      textoRepository+= `List<Character> findCharactersByIdOrFname(String id, String fname);\n`;
      textoRepository+= `List<Character> findAllById(String id);\n`;
      textoRepository+=`}`;
     }else if (i==2){
        textoRepository+= `List<CharacterType> findAllCharacterTypeByIdOrName(String id, String name);\n`;
        textoRepository+=`}`;
    }else if (i==3){
        textoRepository+= `List <Episode> findEpisodeByIdOrCode (String id, String code);\n`;
        textoRepository+=`}`;
    }else if(i==4){
        textoRepository+= ` List<Friendship> findFriendshipByIdOrFid(String id, String fid);\n`;
        textoRepository+= ` List <Friendship> findAllByIdOrFid(String id, String fid);\n`;
        textoRepository+=`}`;
    }else{
        textoRepository+= ` List<Heroes> findHeroesByEpisodeidOrCharid(String episodeid, String charid);\n`;
        textoRepository+= ` List<Heroes> findByEpisodeidOrCharid(String episodeid, String charid); \n`;
        textoRepository+= ` List<Heroes> findAllByEpisodeid(String episodeid);\n`;
        textoRepository+= ` List<Heroes> findAllByCharid(String charid);\n`;
        textoRepository+=`}`;
    }
    for (var j=0;j<serviceFiles.length;j++){
        createFile(repositoryFiles[i],textoRepository);
    }
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

        //para comprobar si es una función de join entre tablas, se va guardando para compare
        var aux=["appearsIn", "hero", "type", "friends", "episode"];
        if (aux.indexOf(funcionesAux)>-1){
            aux2.push(funcionesAux);
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

        if(arrayType.length==1|| typeClass=="Appears"){
            var dataType3= funciones.getTemplateFromSubjMap(subjMap);
            arrayType.push(dataType3);       
        }
        if(arrayType.length<3 && typeClass!="Heroes"){
            arrayType= arrayMove(arrayType,0,1);
        }else if(typeClass!="Heroes"){
            arrayType= arrayMove(arrayType,1,2);
            arrayType= arrayMove(arrayType,2,3);
        }
        for (var k= 0;k<arrayType.length;k++){
            textoType+= "\t" + arrayType[k] + ": String\n";
        }
        //meter funciones con joins en array de types
        var arrayFinal;
        for(var l=0;l<aux2.length;l++){
            if(aux2[l]== 'friends'){
                arrayFinal=generateType(parentTriples[l]).arrayType; //obtener parametros de la tripleta padre
                textoType+= "\t" + aux2[l] + " (";
                for(var j=arrayFinal.length-1;j>=0;j--){
                    if(j==0){
                        textoType+= arrayFinal[j] + ": String)";
                    }else{
                        textoType+= arrayFinal[j] + ": String, "
                    }
                }
                textoType+=": [" + parents[l] + "]\n";
            }else if (aux2[l]=='episode'){
                arrayFinal=generateType(parentTriples[l]).arrayType; //obtener parametros de la tripleta padre
                textoType+= "\t" + aux2[l] + " (";
                for(var j=arrayFinal.length-1;j>=0;j--){
                    if(j==0){
                        textoType+= arrayFinal[j] + ": String)";
                    }else{
                        textoType+= arrayFinal[j] + ": String, "
                    }
                }
                textoType+=": [" + parents[l] + "]\n";
            }else if (aux2[l]=='hero'){
                var arrayFinalAux=[]; //creado para insertar solo los parámetros necesarios
                arrayFinal=generateType(parentTriples[l]).arrayType; //obtener parametros de la tripleta padre
                    for (var k in arrayFinal){
                        if(arrayFinal[k]=='id'|| arrayFinal[k]=='fname'){
                            arrayFinalAux.push(arrayFinal[k]);
                        }
                    }
                textoType+= "\t" + aux2[l] + " (";
                for(var j=0;j<arrayFinalAux.length;j++){
                    if(j==1){
                        textoType+= arrayFinalAux[j] + ": String)";
                    }else{
                        textoType+= arrayFinalAux[j] + ": String, "
                    }
                }
                textoType+=": [" + parents[l] + "]\n";
            }else if (aux2[l]=='appearsIn'){
                textoType+="\t" + aux2[l] + ": [" + parents[l] + "]\n";
            }else{
                arrayFinal=generateType(parentTriples[l]).arrayType; //obtener parametros de la tripleta padre
                textoType+= "\t" + aux2[l] + " (";
                for(var j=arrayFinal.length-1;j>=0;j--){
                    if(j==0){
                        textoType+= arrayFinal[j] + ": String)";
                    }else{
                        textoType+= arrayFinal[j] + ": String, "
                    }
                }
                textoType+=": [" + parents[l] + "]\n";
            }
            arrayType.push(aux2[l]);
        }

        textoType+= "}\n"; 
        //console.log(arrayType);
        return {textoType,arrayType};
}

//let querySchema= "type Query {"
function generateQuery(triplesMap){
    let querySchema="";
    let subjMap= funciones.getIdsFromTripleMap(triplesMap).subjectMapId;
    let typeClass= funciones.getClassNameFromSubjMap(subjMap);
    var arrayQuery=[];
    var parents=[];
    var aux2=[];
    var parentTriples=[];
    //querySchema+="type Query {\n";
    let poms= funciones.getIdsFromTripleMap(triplesMap).predicateObjectMapIds;
    for(var i=0; i<poms.length;i++){
        let objMap= funciones.getIdsFromPredObjMap(poms[i]).objectMapId;
        let predicate=funciones.getIdsFromPredObjMap(poms[i]).predicateId;
        //var funcionesAux= funciones.getAttributeFromPredMap(predicate);
        var dataType= funciones.getDataTypeFromObjMap(objMap).dataType;
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

        if(arrayQuery.length==1|| typeClass=="Appears"){
            var dataType3= funciones.getTemplateFromSubjMap(subjMap);
            arrayQuery.push(dataType3);       
        }

        if(arrayQuery.length<3 && typeClass!="Heroes"){
            arrayQuery= arrayMove(arrayQuery,0,1);
        }else if(typeClass!="Heroes"){
            arrayQuery= arrayMove(arrayQuery,1,2);
            arrayQuery= arrayMove(arrayQuery,2,3);
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
type Mutation {
	createFriendship(id:String, fid:String): Friendship
	createAppears(charid:String, episodeid:String): Appears
	createHeroes(episode:String, charid:String): Heroes
	createCharacter(id:String, fname:String, lname:String, typeid:String): Character
	createEpisode(id:String, code:String): Episode
}`;
*/
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
texto+="}";
texto+=`
type Mutation {
	createFriendship(id:String, fid:String): Friendship
	createAppears(charid:String, episodeid:String): Appears
	createHeroes(episode:String, charid:String): Heroes
	createCharacter(id:String, fname:String, lname:String, typeid:String): Character
	createEpisode(id:String, code:String): Episode
    }\n`;
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
        return episodeRepository.findEpisodeByIdOrCode(appears.getEpisodeid(), code);
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

    public List<Appears> getAppearsIn(final Character character) {
            return appearsRepository.findAppearsInByCharid(character.getId()); 
        }
    public List<Friendship> getFriends(final Character character, final String id, final String fid) {
        return friendshipRepository.findAllByIdOrFid(character.getId(), character.getId());
    }
    public List<CharacterType> getType (final Character character, final String id, final String name){
        return characterTypeRepository.findAllCharacterTypeByIdOrName(character.getId(),name);
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
        return episodeRepository.findEpisodeByIdOrCode(heroes.getEpisodeid(), code);
    }
    public Iterable<Character> getHero(Heroes heroes, final String id, final String fname) {
        return characterRepository.findCharactersByIdOrFname(heroes.getCharid(), fname);
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
//var position = 1018;
var file_path = '../prueba/pom.xml';
fs.readFile(file_path, function read(err, data) {
        if (err) {
            throw err;
        }
    var file_content = data.toString();
    var position= file_content.lastIndexOf("y");
    console.log(position);
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


