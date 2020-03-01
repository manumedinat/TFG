package com.example.demo.mutation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.example.demo.dao.entity.Character;
import com.example.demo.service.*;

//import java.time.LocalDate;
@Component
public class CharacterMutation implements GraphQLMutationResolver {
    @Autowired
    private CharacterService characterService;
    public Character createCharacter(String id, String fname, String lname, String type) {
        return this.characterService.createCharacter(id,fname,lname,type);
    }
}