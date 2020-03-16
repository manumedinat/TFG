/* Mecanismo para crear ficheros y directorios*/
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

/* ------------VARIABLES DIRECTORIOS-----------------*/
const pathDemo='../prueba2/src/main/java/com/example/demo/';
const pathServiceDir= pathDemo + 'service';
const pathQueryDir= pathDemo + 'query';
const pathMutationDir= pathDemo + 'mutation';
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

/*-------------VARIABLES FICHEROS DIRECTORIO ENTITY--------------------*/
const pathEntityFile= "../prueba2/src/main/java/com/example/demo/dao/entity/Vehicle.java";

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
const pathGQLFile= '../prueba2/src/main/resources/graphql/vehicleql.graphqls'

//---------CONSTRUCCION APP---------------------------*/

/*1. Crear directorio service y ficheros pertenecientes al directorio service*/
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
const textoQuery=
`package com.example.demo.query;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.example.demo.dao.entity.*;
import com.example.demo.dao.entity.Character;
import com.example.demo.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Query implements GraphQLQueryResolver{
    //APPEARS
    @Autowired
    private AppearsService appearsService;
    public Iterable<Appears> listAppears(final String charid) {
        return this.appearsService.getAllAppears(charid);
    }
    //CHARACTER
    @Autowired
    private CharacterService characterService;
    public Iterable<Character> listCharacter(String id, String fname, String lname, String type) {
        return this.characterService.getAllCharacters(id,fname,lname,type);
    }

    //CHARACTERTYPE
    @Autowired
    private CharacterTypeService characterTypeService;
    public Iterable<CharacterType> listCharacterType(String id, String name) {
        return this.characterTypeService.getAllCharactersType(id,name);
    }
    //EPISODE
    @Autowired
    private EpisodeService episodeService;
    public Iterable<Episode> listEpisode(String eid, String ecode) {
        return this.episodeService.getAllEpisodes(eid, ecode);
    }
    //FRIENDS
    @Autowired
    private FriendsService friendsService;
    public Iterable<Friends> listFriends(String id, String fid) {
        return this.friendsService.getAllFriends(id, fid);
    }
    //HEROES
    @Autowired
    private HeroesService heroesService;
    public Iterable<Heroes> listHeroes(String episodeid, String charid) {
        return this.heroesService.getAllHeroes(episodeid, charid);
    }
}`;

createFile(pathQueryFile,textoQuery);
/****************************************************************************** */
/*3. Crer directorio y fichero mutation*/
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

/*4. Crear directorio dao*/
createDir(pathDaoDir); //directorio

/*4.1 Crear directorio entity y fichero entity
createDir(pathDaoEntityDir);
const textoEntity=
`package com.example.demo.dao.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Data
@EqualsAndHashCode
@Entity
public class Vehicle implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "ID", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "model_code", nullable = false)
    private String modelCode;

    @Column(name = "brand_name")
    private String brandName;

    @Column(name = "launch_date")
    private LocalDate launchDate;

    @Column(name="seats", nullable=false)
    private int seats;

    private transient  String formattedDate;

    // Getter and setter
    public String getFormattedDate() {
        return getLaunchDate().toString();
    }
}`;

createFile(pathEntityFile,textoEntity); //fichero

/*4.2 Crear directorio y fichero repository*/
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


//createFile(pathRepositoryFile,textoRepository); //fichero


/*5.Crear arcihivo graphqls y su directorio*
createDir(pathGQLDir);
const textogql=
`type Vehicle {
	id: ID!,
	type: String,
	modelCode: String,
	brandName: String,
	seats: Int,
	launchDate: String
}

type Query {
	vehicles(count: Int):[Vehicle]
	vehicle(id: ID):Vehicle
}

type Mutation {
	createVehicle(type: String!, modelCode: String!, brandName: String, seats: Int, launchDate: String):Vehicle
	deleteVehicle(id:ID!): Boolean
}`;

createFile(pathGQLFile,textogql);

/*6. Añadir dependencias graphql y lombok a pom.xml */
/*
var str =`\n
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
 </dependency>`
var position = 1024;
var file_path = '../prueba/pom.xml';
    
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
*/

