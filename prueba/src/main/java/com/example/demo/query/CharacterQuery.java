package com.example.demo.query;



import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.example.demo.dao.entity.Character;
import com.example.demo.service.CharacterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CharacterQuery implements GraphQLQueryResolver {
    @Autowired
    private CharacterService characterService;
    public Iterable<Character> listCharacter(String id, String fname, String lname, String type) {
        return this.characterService.getAllCharacters(id,fname,lname,type);
    }
    
}