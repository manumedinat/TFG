package com.example.demo.query;
import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.example.demo.dao.entity.Heroes;
import com.example.demo.service.HeroesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class HeroesQuery implements GraphQLQueryResolver {
    @Autowired
    private HeroesService heroesService;
    public Iterable<Heroes> listHeroes(String episodeid, String charid) {
        return this.heroesService.getAllHeroes(episodeid, charid);
    }
}