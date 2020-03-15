package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import com.example.demo.dao.entity.Character;
import com.example.demo.dao.entity.CharacterType;
import com.example.demo.dao.repository.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



@Service
public class CharacterService {

    private final CharacterRepository characterRepository ;

    public CharacterService(final CharacterRepository characterRepository) {
        this.characterRepository = characterRepository ;
    }

    @Transactional
    public Character createCharacter(final String id, final String fname, final String lname, final String personType) {
        final Character character = new Character();
        //final CharacterType characterType= new CharacterType();
        character.setId(id);
        character.setFname(fname);
        character.setLname(lname);
        character.setPersonType(personType);
        return this.characterRepository.save(character);
    }

    @Transactional(readOnly = true)
    public Iterable<Character> getAllCharacters(final String id, final String fname, final String lname,
            final String personType) {
      if (characterRepository.findCharacterByIdOrFname(id, fname).isEmpty()) {
        return this.characterRepository.findAll();
      }
      return this.characterRepository.findCharacterByIdOrFname(id, fname);
      
    }
    
   
}

