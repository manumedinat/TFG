package com.example.demo.service;

import com.example.demo.dao.entity.*;
import com.example.demo.dao.entity.Character;
import com.example.demo.dao.repository.*;
import com.example.demo.resolver.CharacterResolver;

import org.springframework.context.annotation.DependsOn;
import org.springframework.data.annotation.Reference;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kotlin.jvm.Synchronized;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.EntityManager;

@Service
public class CharacterService {
@PersistenceContext
private EntityManager entityManager;
private final CharacterRepository characterRepository;
public CharacterService (//CharacterResolver characterResolver,
final CharacterRepository characterRepository){
this.characterRepository = characterRepository;
}
@Transactional
public Character createCharacter (final String id, final String fname, final String lname) {
 final Character character = new Character();
      character.setId(id);
      //character.setTypeid(typeid);
      character.setFname(fname);
      character.setLname(lname);
      return this.characterRepository.save(character);
    } 
    List<Character> filter= new ArrayList<Character>();
    boolean flag;
    String parameter;
    //@Transactional
      public List<Character> getAllCharacter(final String identifier, final String fname, final String lname) {
          //this.setParameter(identifier);
          if (identifier==null && fname==null && lname==null && flag==false){//characterResolver.getFlag()==false) {
                filter=this.characterRepository.findAll();
           }else if(identifier!=null){
            String template= "http://starwars.mappingpedia.linkeddata.es/character/";
            filter= entityManager
                .createQuery
            (" SELECT c FROM Character c WHERE '" + template + "' || c.id || '' = '" 
            + identifier + "'" ).getResultList();  
           }else if(fname!=null && lname!=null){
             filter= this.characterRepository.findAllByFnameOrLname(fname, lname);
           }else{
             filter= this.getFilter();
              //flag=false;
           }
              return filter;
        }
        public void setParameter(String parameter){
            this.parameter=parameter;
        }

        public String getParameter(){
          return parameter;
        }

        public void setFilter (List<Character> filter){
            this.filter=filter;
        }
        public List<Character> getFilter(){
          return filter;
      }

        public void setFlag(boolean flag){
            this.flag=flag;
        }

        public boolean getFlag(){
          return flag;
        }
        
    }