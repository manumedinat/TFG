//import { json } from 'express';
var fs= require('fs');
var _= require('lodash');
var file= fs.readFileSync("./mappings.r2rml.json"); //leer fichero en formato utf8
var jsonFile= JSON.parse(file); //parsear fichero 

/*1. Funcion para obtener el TriplesMap*/
exports.getTriplesId= function(){
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
/*const result= this.getTriplesId();
console.log(result);

/********************************************************************* */
/*2. Función para obtener subjectMap, predicateObjectMap y logicalTable a partir del mapa de tripletas dado */

exports.getIdsFromTripleMap= function(triplesId){
    var elemento2, logicalTableId, subjectMapId;
    var predicateObjectMapIds=[];
    for (var j in jsonFile["@graph"]){
        elemento2= jsonFile["@graph"][j];

        if(elemento2["@id"]===triplesId){
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

/*console.log(`\nTarea 2: Obtener Subject, PO Map y Logical Table a partir de tripleta`)
const result1= this.getIdsFromTripleMap(result[2]);
const logicalTableId= result1.logicalTableId;
const predicateObjectMapIds= result1.predicateObjectMapIds;
const subjectMapId=result1.subjectMapId;
console.log(`Datos de TRIPLES MAP: ${result[4]}\n`);
console.log(`Logical Table = ${logicalTableId}`);
console.log(`Predicate Object Maps = ${predicateObjectMapIds}`);
console.log(`Subject Map = ${subjectMapId}`);
/****************************************************************************** */
/*3. Función para obtener Predicate y ObjectMap a partir del PredicateObjectMap*/
exports.getIdsFromPredObjMap= function(PredObjId){
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

/*console.log(`\nTarea 3: Obtener predicate y object Map`)
const result2= this.getIdsFromPredObjMap(predicateObjectMapIds[0]);
const predicateId= result2.predicateId;
const objectMapId= result2.objectMapId;
console.log(`Object Map = ${objectMapId}`);
console.log(`Predicate = ${predicateId}`);
/***************************************** */

/*4. Función para obtener nombre de la clase a partir de un subject map*/

exports.getClassNameFromSubjMap=function(subjMapId){
    var className, aux,elemento4;
    for(var j in jsonFile["@graph"]){
        elemento4 = jsonFile["@graph"][j];

        if(elemento4['@id']=== subjMapId){
            aux= elemento4['rr:class']['@id'];
            className= aux.split(":")[1];
        }
    }
    return className;
}
/*
console.log(`\nTarea 4: Obtener Class Name`)
const result3= this.getClassNameFromSubjMap(subjectMapId);
console.log(`Class Name = ${result3}`);
*/

/*5. Función para obtener datatype a partir de un objectMap */
exports.getDataTypeFromObjMap=function(objMapId){
    var dataType, aux2,elemento4,arrayTemplates,parent,child,parentCond;
    for(var j in jsonFile["@graph"]){
        elemento4 = jsonFile["@graph"][j];

        if(elemento4['@id']=== objMapId){
            if(!elemento4['rr:joinCondition'] && !elemento4['rr:template']){
                dataType= elemento4['rr:column'];

            /*}else if (!elemento4['rr:column'] && !elemento4['rr:template']){
                aux2=elemento4['rr:joinCondition']['@id'];    
                child= getIdsFromJoin(aux2).child;
                parentCond= getIdsFromJoin(aux2).parent;
                dataType=child;
                parent= elemento4['rr:parentTriplesMap'] ['@id'];
                    */
           }else if(!elemento4['rr:joinCondition'] && !elemento4['rr:column']){
                dataType= elemento4['rr:template'];
                arrayTemplates= columnsFromTemplate(dataType);
        }
    }
}
    return {dataType,arrayTemplates,parent,child, parentCond};
}

/*console.log(`\nTarea 5: Obtener Data Type`)
const result4= this.getDataTypeFromObjMap(objectMapId).parent;
console.log(`Data Type = ${result4}`);


/*6. Función para obtener atributo a partir de un predicateMap */
exports.getAttributeFromPredMap=function(predMapId){
        var attribute= predMapId.split(":")[1];
        return attribute;
}

/*console.log(`\nTarea 6: Obtener attribute`)
const result5= this.getAttributeFromPredMap(predicateId);
console.log(`Attribute = ${result5}`);
*/

/*7. Función para obtener datos de joinCondition */
//exports.getIdsFromJoin=function(joinCondId){
    function getIdsFromJoin(joinCondId){
    var child, parent,elemento6;
    for(var j in jsonFile["@graph"]){
        elemento6 = jsonFile["@graph"][j];

        if(elemento6['@id']=== joinCondId){
            child= elemento6['rr:child'];
            parent= elemento6['rr:parent']
        }
    }
    return {child,parent};
}

//console.log(`\nTarea 7: Obtener ids`);

/*8. Extraer columnas de template*/
function columnsFromTemplate(templatetest){
    var columns=[];
    var split = templatetest.split("{");

    for(var i=1;i<split.length;i++){
        var value = split[i].split("}")[0];
        columns.push(value);
    }
    return columns;
}


/*9: obtener ids que faltan para completar queryRoot*/
exports.getTemplateFromSubjMap=function(subjMapId){
    var template,templateId, aux2,elemento6, templateId2;
    for(var j in jsonFile["@graph"]){
        elemento6 = jsonFile["@graph"][j];

        if(elemento6['@id']=== subjMapId){
            aux2= elemento6['rr:template'];
            template= aux2;
            template= template.split('/').slice(0,4).join('/') + "/";
            templateId= aux2.match(/{(.*)}/)[1];
            templateId2= templateId;
            templateId=templateId.split("}")[0];
            templateId2= templateId2.split("}/{")[1];
        }
    }
    return {template,templateId, templateId2};
}

/*10: Extraer elementos de join condition*/
exports.getDataTypeFromObjMap_JoinCondition=function(objMapId){
    var dataType2,aux3,elemento10,parent,child,parentCond;
    for(var j in jsonFile["@graph"]){
        elemento10 = jsonFile["@graph"][j];

        if(elemento10['@id']=== objMapId){
            if (!elemento10['rr:column'] && !elemento10['rr:template']){
                aux3=elemento10['rr:joinCondition']['@id'];    
                child= getIdsFromJoin(aux3).child;
                parentCond= getIdsFromJoin(aux3).parent;
                dataType2=child;
                parent= elemento10['rr:parentTriplesMap'] ['@id'];
        }
    }
}
    return {dataType2,parent,child, parentCond};
}



