package com.example.demo.service;

import java.util.List;

import com.example.demo.dao.entity.*;
import com.example.demo.dao.entity.Character;
import com.example.demo.dao.repository.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



@Service
public class HeroesService {

    private final HeroesRepository heroesRepository ;

    public HeroesService(final HeroesRepository heroesRepository) {
        this.heroesRepository = heroesRepository ;
    }

    @Transactional
    public Heroes createHeroes(String episodeid, String charid) {
        final Heroes heroes = new Heroes();
        //final Character character= new Character();
        heroes.setEpisodeid(episodeid);
        heroes.setCharid(charid);
        return this.heroesRepository.save(heroes);
    }

    @Transactional(readOnly = true)
    public List<Heroes> getAllHeroes(String episodeid, String charid) {
      // if(heroesRepository.findHeroesByEpisodeid(episodeid, charid).isEmpty()){
        if(heroesRepository.findHeroesByEpisodeidOrCharid(episodeid,charid).isEmpty()){
        return this.heroesRepository.findAll();
        }
        return this.heroesRepository.findByEpisodeidOrCharid(episodeid,charid);
    }
}

