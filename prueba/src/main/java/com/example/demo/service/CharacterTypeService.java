package com.example.demo.service;

import java.util.Optional;

import com.example.demo.dao.entity.CharacterType;
import com.example.demo.dao.entity.Character;
import com.example.demo.dao.repository.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



@Service
public class CharacterTypeService {

    private final CharacterTypeRepository characterTypeRepository ;

    public CharacterTypeService(final CharacterTypeRepository characterTypeRepository) {
        this.characterTypeRepository = characterTypeRepository ;
    }

    @Transactional
    public CharacterType createCharacterType(final String id, final String name) {
       // final Character character= new Character();
        final CharacterType characterType = new CharacterType();
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

   
}

