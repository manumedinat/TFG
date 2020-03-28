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
const pathDemo='../prueba2/src/main/java/com/example/demo/';
const pathServiceDir= pathDemo + 'service';
const pathQueryDir= pathDemo + 'query';
const pathMutationDir= pathDemo + 'mutation';
const pathResolverDir= pathDemo + 'resolver';
const pathDaoDir= pathDemo + 'dao';
const pathDaoEntityDir= pathDaoDir + '/entity';
const pathDaoRepositoryDir= pathDaoDir + '/repository';
const pathGQLDir= '../prueba2/src/main/resources/graphql';
/*-------------VARIABLES FICHEROS DIRECTORIO SERVICE--------------------*/
var arrayEntities= ["Appears", "Character", "CharacterType", "Episode", "Friends", "Heroes"]
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
const pathGQLFile= '../prueba2/src/main/resources/graphql/starwarsql.graphqls';
const pathAppPtyFile= '../prueba2/src/main/resources/application.properties';

//---------CONSTRUCCION APP---------------------------*/

/*1. Crear directorio service y ficheros pertenecientes al directorio service*
createDir(pathServiceDir); //directorio

var textoServiceInicio= 
`package com.example.demo.service;

import com.example.demo.dao.entity.*;
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
       public Iterable<Appears> getAllAppears(final String charid) {
         if(appearsRepository.findByCharid(charid).isEmpty()){
            return this.appearsRepository.findAll();
           }
            return this.appearsRepository.findByCharid(charid);
        }
    }`
     }else if(i==1){
      textoService+= ` (final String id, final String fname, final String lname, final String personType) {\n`;
      textoService+= ` final Character character = new Character();
      character.setId(id);
      character.setFname(fname);
      character.setLname(lname);
      character.setPersonType(personType);
      return this.characterRepository.save(character);
    }
        
    @Transactional(readOnly = true)
      public Iterable<Character> getAllCharacters(final String id, final String fname, final String lname,final String personType) {
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
       public Iterable<CharacterType> getAllCharactersType(final String id, final String name) {
         if (characterTypeRepository.findAllCharacterTypeByIdOrName(id,name).isEmpty()) {
        return this.characterTypeRepository.findAll();
      }
      return this.characterTypeRepository.findAllCharacterTypeByIdOrName(id,name);
    }
}`
    }else if (i==3){
        textoService+= ` (String eid, String ecode) {\n`;
        textoService+= ` final Episode episode = new Episode();
        episode.setEcode(ecode);
        episode.setEid(eid);
        return this.episodeRepository.save(episode);
    }

    @Transactional(readOnly = true)
    public Iterable<Episode> getAllEpisodes(String eid, String ecode) {
        if(episodeRepository.findEpisodeByEidOrEcode(eid, ecode).isEmpty()){
            return this.episodeRepository.findAll();
        }
        return this.episodeRepository.findEpisodeByEidOrEcode(eid, ecode);
    }
   
}`
    
    }else if(i==4){
        textoService+= ` (String id, String fid) {\n`;
        textoService+= ` final Friends friends = new Friends();
        friends.setId(id);
        friends.setFid(fid);
        return this.friendsRepository.save(friends);
    }

    @Transactional(readOnly = true)
    public Iterable<Friends> getAllFriends(String id, String fid) {
        if(friendsRepository.findFriendsByIdOrFid(id, fid).isEmpty()){
            return this.friendsRepository.findAll();
        }
        return this.friendsRepository.findFriendsByIdOrFid(id, fid);
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
            //console.log('hola entro' +subjMap);
            let typeClass= funciones.getClassNameFromSubjMap(subjMap);
            //console.log(typeClass);
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
                     var dataTypeParent= funciones.getDataTypeFromObjMap(objMap).dataTypeParent;
                     if(dataTypeParent!=null){
                        aux.push(dataTypeParent);
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
            if(poms.length<=2){
                if(arrayData.length==1){
                    var dataType3= funciones.getTemplateFromSubjMap(subjMap);
                    arrayData.push(dataType3);
                }
            //clase heroes
            if(typeClass=="Heroes"){
            queryInit+= "String " + arrayData[0] + ", String " + arrayData[1] + "){\n";
            queryInit+= "\t\treturn this."+ typeClassLow + "Service.getAll" + typeClass + " (" + arrayData[0] +"," + arrayData[1] + ");\n"
            queryInit+= "\t}\n";
            }else{
            //resto de clases (para mantener orden con respecto al schema)    
            queryInit+= "String " + arrayData[1] + ", String " + arrayData[0] + "){\n";
            queryInit+= "\t\treturn this."+ typeClassLow + "Service.getAll" + typeClass + " (" + arrayData[1] +"," + arrayData[0] + ");\n"
            queryInit+= "\t}\n";
        }

            //clase characters
            }else{
            queryInit+= "String " + arrayData[0] + ", String " + arrayData[2] + "," + "String " +arrayData[3] + ","+ "String " +arrayData[1] + "){\n";
            queryInit+= "\t\treturn this."+ typeClassLow + "Service.getAll" + typeClass + "s (" + arrayData[0] +"," + arrayData[2] + "," + arrayData[3] + "," + arrayData[1] + ");\n"
            queryInit+= "\t}\n";
            }

        }
        queryInit+="}";
        return queryInit;
        
}
//console.log(generateQueryRoot(mappingDoc));
createFile(pathQueryFile, generateQueryRoot(mappingDoc));
/****************************************************************************** */
/*3. Crear directorio y fichero mutation*
createDir(pathMutationDir); //directorio
const textoMutation=
`package com.example.demo.mutation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.example.demo.dao.entity.*;
import com.example.demo.dao.entity.Character;
import com.example.demo.service.*;

//import java.time.LocalDate;
@Component
public class Mutation implements GraphQLMutationResolver {
    //APPEARS
    @Autowired
    private AppearsService appearsService;
    public Appears createAppears(String charid, String episodeid) {
        return this.appearsService.createAppears(charid,episodeid);
    }
    //CHARACTER
    @Autowired
    private CharacterService characterService;
    public Character createCharacter(String id, String fname, String lname, String type) {
        return this.characterService.createCharacter(id,fname,lname,type);
    }
    //CHARACTERTYPE
    @Autowired
    private CharacterTypeService characterTypeService;
    public CharacterType createCharacterType(String id, String name) {
        return this.characterTypeService.createCharacterType(id,name);
    }

    //EPISODE
    @Autowired
    private EpisodeService episodeService;
    public Episode createEpisode(String eid, String ecode) {
        return this.episodeService.createEpisode(eid, ecode);
    }

    //FRIENDS
    @Autowired
    private FriendsService friendsService;
    public Friends createFriends(String id, String fid) {
        return this.friendsService.createFriends(id,fid);
    }

    //HEROES
    @Autowired
    private HeroesService heroesService;
    public Heroes createHeroes(String episodeid, String charid) {
        return this.heroesService.createHeroes(episodeid, charid);
    }
}`;

createFile(pathMutationFile,textoMutation); //fichero

/*4. Crear directorio dao*
createDir(pathDaoDir); //directorio

/*4.1 Crear directorio entity y fichero entity*
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
@Entity
public class `;
var textoEntity;

    for (var i=0;i<arrayEntities.length;i++){
    textoEntity=textoEntityInicio;
    textoEntity+= arrayEntities[i] + ` implements Serializable{\n`;
    textoEntity+= `private static final long serialVersionUID = 1L;\n`;
    textoEntity+= `@id\n`;
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
       private Friends friends;
       
       @Column(name = "fname", nullable = false)
       private String fname;
   
       @Column(name = "lname")
       private String lname;
   
       @Column(name = "type", nullable = false)
       private String personType;
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
        textoEntity+= `private String eid;\n`;
        textoEntity+=
      `@Column(name = "ecode", nullable = false)
       private String ecode;  
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


/*4.2 Crear directorio y fichero repository*
createDir(pathDaoRepositoryDir); //directorio
const textoRepositoryInicio=
`package com.example.demo.dao.repository;
import com.example.demo.dao.entity.*;
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
        textoRepository+= `List <Episode> findEpisodeByEidOrEcode (String eid, String ecode);\n`;
        textoRepository+=`}`;
    }else if(i==4){
        textoRepository+= ` List<Friends> findFriendsByIdOrFid(String id, String fid);\n`;
        textoRepository+= ` List <Friends> findAllByIdOrFid(String id, String fid);\n`;
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



/*5.Crear archivo graphqls y su directorio*
createDir(pathGQLDir);
const textogql=
`type Friends{
	id: String
	fid: String
}

type Appears {
	_id: ID!
	charid: String
	episodeid: String
	episode(eid: String, ecode: String): [Episode]
}
type Heroes{
	episodeid: String
	charid: String
	episode(eid:String , ecode:String): [Episode]
	hero(id:String, fname:String): [Character]
}

type Character{
	id: String
	fname: String
	lname: String
	personType:String
	appearsIn(charid:String): [Appears]
	friendship(id:String, fid:String) : [Friends]
	type(id: String, name: String): [CharacterType] 
}
type Episode{
	eid: String
	ecode: String
}

type CharacterType{
	id: String
	name: String
}

type Query {
	listFriends(id:String, fid:String): [Friends]
	listAppears(charid:String):[Appears]
	listHeroes(episode:String, charid:String): [Heroes]
	listCharacter(id: String, fname:String, lname:String, personType:String) : [Character]
	listEpisode(eid:String, ecode:String): [Episode]
	listCharacterType(id: String, name: String): [CharacterType]
}

type Mutation {
	createFriends(id:String, fid:String): Friends
	createAppears(charid:Long, episodeid:String): Appears
	createHeroes(episode:String, charid:String): Heroes
	createCharacter(id:Long, fname:String, lname:String, personType:String): Character
	createEpisode(eid:String, ecode:String): Episode
}`;

createFile(pathGQLFile,textogql);

/*6. Crear directorio resolver y sus ficheros correspondientes*
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
    public Iterable<Episode> getEpisode(Appears appears,  String eid,  String ecode) {
        return episodeRepository.findEpisodeByEidOrEcode(appears.getEpisodeid(), ecode);
     }
}`;
    }else if (i==1){
        textoResolver+=`private final AppearsRepository appearsRepository;\n`;
        textoResolver+=`private final FriendsRepository friendsRepository;\n`;
        textoResolver+=`private final CharacterTypeRepository characterTypeRepository;\n`;
        textoResolver+=`public CharacterResolver (final AppearsRepository appearsRepository, final FriendsRepository friendsRepository, final CharacterTypeRepository characterTypeRepository){\n`;
        textoResolver+=
        `this.appearsRepository = appearsRepository;
        this.friendsRepository = friendsRepository;
        this.characterTypeRepository= characterTypeRepository;
    }

    public List<Appears> getAppearsIn(final Character character, final String charid) {
            return appearsRepository.findAppearsInByCharid(character.getId()); 
        }
    public List<Friends> getFriendship(final Character character, final String id, final String fid) {
        return friendsRepository.findAllByIdOrFid(character.getId(), character.getId());
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
        this.heroesRepository= heroesRepository;
    }

    public List<Episode> getEpisode(Heroes heroes, final String eid, final String ecode) {
        return episodeRepository.findEpisodeByEidOrEcode(heroes.getEpisodeid(), ecode);
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
/*7. Añadir dependencias graphql y lombok a pom.xml *

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
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.8</version>
    <optional>true</optional>
</dependency>\n`
var position = 1018;
var file_path = '../prueba2/pom.xml';
    
fs.readFile(file_path, function read(err, data) {
        if (err) {
            throw err;
        }
    var file_content = data.toString();
    file_content = file_content.substring(position);
    var file = fs.openSync(file_path,'r+');
    var bufferedText = new Buffer(str+file_content);
    fs.writeSync(file, bufferedText, 0, bufferedText.length, position);
    fs.close(file);
 });

 /*9. Añadir especificaciones a application.properties*

 const textoAppPty= `
 spring.datasource.url=jdbc:h2:mem:exampledb
 spring.datasource.username=example
 spring.datasource.password=
 spring.jpa.hibernate.ddl-auto=update
 spring.jpa.show-sql=true
 spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect
 
 # Enable H2 web console at http://localhost:8080/h2-console
 spring.h2.console.enabled=true`;

 createFile(pathAppPtyFile,textoAppPty);
*/

