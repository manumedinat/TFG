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


