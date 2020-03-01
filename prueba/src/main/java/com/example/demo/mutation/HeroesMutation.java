package com.example.demo.mutation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.example.demo.dao.entity.*;
import com.example.demo.service.*;

//import java.time.LocalDate;
@Component
public class HeroesMutation implements GraphQLMutationResolver {
    @Autowired
    private HeroesService heroesService;
    public Heroes createHeroes(String episode, String charid) {
        return this.heroesService.createHeroes(episode, charid);
    }
}