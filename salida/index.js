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
//const pathServiceDir= '../prueba/src/main/java/com/example/demo/service';
const pathQueryDir= '../prueba/src/main/java/com/example/demo/query';
const pathMutationDir= '../prueba/src/main/java/com/example/demo/mutation';
const pathDaoDir= '../prueba/src/main/java/com/example/demo/dao';
const pathDaoEntityDir= '../prueba/src/main/java/com/example/demo/dao/entity';
const pathDaoRepositoryDir= '../prueba/src/main/java/com/example/demo/dao/repository';
const pathGQLDir= '../prueba/src/main/resources/graphql'

/*-------------VARIABLES FICHEROS--------------------*/
//const pathServiceFile= "../prueba/src/main/java/com/example/demo/service/VehicleService.java"
const pathQueryFile= "../prueba/src/main/java/com/example/demo/query/VehicleQuery.java"
const pathMutationFile= "../prueba/src/main/java/com/example/demo/mutation/VehicleMutation.java"
const pathEntityFile= "../prueba/src/main/java/com/example/demo/dao/entity/Vehicle.java"
const pathRepositoryFile= "../prueba/src/main/java/com/example/demo/dao/repository/VehicleRepository.java"
const pathGQLFile= '../prueba/src/main/resources/graphql/vehicleql.graphqls'

//---------CONSTRUCCION APP---------------------------*/

/*1. Crear directorio service y fichero service*/
/*createDir(pathServiceDir); //directorio
const textoService= 
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
public class VehicleService {

    private final VehicleRepository vehicleRepository ;

    public VehicleService(final VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository ;
    }

    @Transactional
    public Vehicle createVehicle(final String type,final String modelCode, final String brandName, final int seats, final String launchDate) {
        final Vehicle vehicle = new Vehicle();
        vehicle.setType(type);
        vehicle.setModelCode(modelCode);
        vehicle.setBrandName(brandName);
        vehicle.setSeats(seats);
        vehicle.setLaunchDate(LocalDate.parse(launchDate));
        return this.vehicleRepository.save(vehicle);
    }

    @Transactional(readOnly = true)
    public List<Vehicle> getAllVehicles(final int count) {
        return this.vehicleRepository.findAll().stream().limit(count).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Optional<Vehicle> getVehicle(final int id) {
        return this.vehicleRepository.findById(id);
    }
    public Boolean deleteVehicle(final int id){
        this.vehicleRepository.deleteById(id);
        return true;
    }
}`;

createFile(pathServiceFile,textoService); //fichero
*/
/*2. Crear directorio query y fichero query*
createDir(pathQueryDir); //directorio
const textoQuery=
`package com.example.demo.query;
import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.example.demo.dao.entity.Vehicle;
import com.example.demo.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;
@Component
public class VehicleQuery implements GraphQLQueryResolver {
    @Autowired
    private VehicleService vehicleService;
    public List<Vehicle> getVehicles(final int count) {
        return this.vehicleService.getAllVehicles(count);
    }
    public Optional<Vehicle> getVehicle(final int id) {
        return this.vehicleService.getVehicle(id);
    }

    
}`;

createFile(pathQueryFile,textoQuery);

/*3. Crer directorio y fichero mutation*
createDir(pathMutationDir); //directorio
const textoMutation=
`package com.example.demo.mutation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.example.demo.dao.entity.*;
import com.example.demo.service.*;

//import java.time.LocalDate;
@Component
public class VehicleMutation implements GraphQLMutationResolver {
    @Autowired
    private VehicleService vehicleService;
    public Vehicle createVehicle(final String type, final String modelCode, final String brandName, final int seats,final String launchDate) {
        return this.vehicleService.createVehicle(type, modelCode, brandName, seats, launchDate);
    }
    public void deleteVehicle(final int id) {
         this.vehicleService.deleteVehicle(id);
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

/*4.2 Crear directorio y fichero repository*
createDir(pathDaoRepositoryDir); //directorio
const textoRepository=
`package com.example.demo.dao.repository;
import com.example.demo.dao.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Integer> {
}`;

createFile(pathRepositoryFile,textoRepository); //fichero
*/

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


