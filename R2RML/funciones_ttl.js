var fs= require('fs');
var _= require('lodash');
var file= fs.readFileSync("./mappings.r2rml.json"); //leer fichero en formato utf8
var jsonFile= JSON.parse(file); //parsear fichero 

/*1. Funcion para obtener el TriplesMap*/
function getTriplesId(){
var array=[];
var elemento;
    for (var j in jsonFile["@graph"]){
        elemento= jsonFile["@graph"][j];
     
    //se usa ownproperty para que compruebe solo de ese hilo    
    if(elemento.hasOwnProperty('rr:subjectMap')){ 
            var TriplesMapId= elemento["@id"];
            array.push(TriplesMapId);
        }
    }
    //console.log(array);
    return array;
    
}
const result=getTriplesId();
console.log('Tarea 1: Obtener todos los Triples Maps:')
console.log(result);

/********************************************************************* */
/*2. Función para obtener subjectMap, predicateObjectMap y logicalTable a partir del mapa de tripletas dado */

function getIdsFromTripleMap(TriplesId){
    var elemento2, logicalTableId, subjectMapId;
    var predicateObjectMapIds=[];
    for (var j in jsonFile["@graph"]){
        elemento2= jsonFile["@graph"][j];

        if(elemento2["@id"]===TriplesId){
                logicalTableId=elemento2["rr:logicalTable"]["@id"]; 
                subjectMapId=elemento2["rr:subjectMap"]["@id"];
                if(elemento2['rr:predicateObjectMap'].length==null){
                    predicateObjectMapIds.push(elemento2['rr:predicateObjectMap']['@id']);
                }else{
                    for(var k=0; k<elemento2['rr:predicateObjectMap'].length;k++){
                        var predicateObjectMapId= elemento2['rr:predicateObjectMap'][k]['@id'];
                        predicateObjectMapIds.push(predicateObjectMapId);
                    }
                }   
            }
        }
    return {logicalTableId, predicateObjectMapIds, subjectMapId};
}
console.log(`\nTarea 2: Obtener Subject, PO Map y Logical Table a partir de tripleta`)
const result1= getIdsFromTripleMap(result[3]);
const logicalTableId= result1.logicalTableId;
const predicateObjectMapIds= result1.predicateObjectMapIds;
const subjectMapId=result1.subjectMapId;
console.log(`Datos de TRIPLES MAP: ${result[3]}\n`);
console.log(`Logical Table = ${logicalTableId}`);
console.log(`Predicate Object Maps = ${predicateObjectMapIds}`);
console.log(`Subject Map = ${subjectMapId}`);
/****************************************************************************** */
/*3. Función para obtener Predicate y ObjectMap a partir del PredicateObjectMap*/
function getIdsFromPredObjMap(PredObjId){
    var objectMapId, predicateId,elemento3;
    for (var j in jsonFile["@graph"]){
        elemento3= jsonFile["@graph"][j];

        if(elemento3["@id"]===PredObjId){
            objectMapId= elemento3['rr:objectMap']['@id'];
            predicateId= elemento3['rr:predicate'] ['@id'];
        }
    }
    return {objectMapId, predicateId};
}
console.log(`\nTarea 3: Obtener predicate y object Map`)
const result2= getIdsFromPredObjMap(predicateObjectMapIds[1]);
const predicateId= result2.predicateId;
const objectMapId= result2.objectMapId;
console.log(`Object Map = ${objectMapId}`);
console.log(`Predicate = ${predicateId}`);
/***************************************** */

/*4. Función para obtener nombre tabla a partir de logicalTable*/
function getTableName (logTableId){
    var tableName, elemento4;
    for (var j in jsonFile["@graph"]){
        elemento4= jsonFile["@graph"][j];

        if(elemento4["@id"]===logTableId){
            tableName= elemento4['rr:tableName'];
        }
    }
    return tableName;
}
console.log(`\nTarea 4: Obtener nombre de tabla`);
const result3= getTableName(logicalTableId);
console.log(`Table Name = ${result3}`);
/*************************************************** */
/*5. Obtener joinCondition y ParentTriplesMap si existe; Sino, obtener template */ 
function getIdsFromObjectMap (ObjMapId){
    var joinConditionId, parentTriplesMapId, elemento4;
    for (var j in jsonFile["@graph"]){
        elemento5= jsonFile["@graph"][j];

        if((elemento5["@id"]===ObjMapId) && elemento5.hasOwnProperty('rr:joinCondition')){
            joinConditionId= elemento5['rr:joinCondition']['@id'];
            parentTriplesMapId= elemento5['rr:parentTriplesMap']['@id'];
        }
    }
    return {joinConditionId, parentTriplesMapId};
}
console.log(`\nTarea 5: Obtener join y tripleta padre`);
const result4= getIdsFromObjectMap(objectMapId);
const joinConditionId= result4.joinConditionId;
const parentTriplesMapId= result4.parentTriplesMapId;
console.log(`Join Condition = ${joinConditionId}`);
console.log(`Parent Triples Map = ${parentTriplesMapId}`);
/********************************************************* */