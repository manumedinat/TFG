package com.example.demo.service;

import com.example.demo.dao.entity.*;
import com.example.demo.dao.entity.Character;
import com.example.demo.dao.repository.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Service
public class CharacterTypeService {
@PersistenceContext
private EntityManager entityManager;
private final CharacterTypeRepository characterTypeRepository;
public CharacterTypeService (final CharacterTypeRepository characterTypeRepository){
this.characterTypeRepository = characterTypeRepository;
}
@Transactional
public CharacterType createCharacterType (final String id, final String name) {
 final CharacterType characterType = new CharacterType();
        //characterType.setId(id);
        characterType.setName(name);
        return this.characterTypeRepository.save(characterType);
    }

     @Transactional(readOnly = true)
       public Iterable<CharacterType> getAllCharacterType(final String identifier, final String name) {
        List<CharacterType> filter; 
        if (identifier==null && name==null) {
            filter=this.characterTypeRepository.findAll();
        }else if(identifier!=null){
          String template= "http://starwars.mappingpedia.linkeddata.es/type/";
            filter=entityManager.createQuery
            (" SELECT ct FROM CharacterType ct WHERE '" + template + "' || ct.id || '' = '" 
            + identifier + "'" ).getResultList();  
        }else{
            filter= this.characterTypeRepository.findAllByName(name);
        } 
          return filter;
    }
}