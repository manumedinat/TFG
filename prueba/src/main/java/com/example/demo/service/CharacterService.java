package com.example.demo.service;

import java.util.Optional;

import com.example.demo.dao.entity.Character;
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
    public Character createCharacter(String id, String fname, String lname, String type) {
        final Character character = new Character();
        character.setId(id);
        character.setFname(fname);
        character.setLname(lname);
        character.setType(type);
        return this.characterRepository.save(character);
    }

    @Transactional(readOnly = true)
    public Iterable<Character> getAllCharacters(String id, String fname, String lname, String type) {
      return this.characterRepository.findCharacterByIdOrFname(id, fname);
    }

   
}

