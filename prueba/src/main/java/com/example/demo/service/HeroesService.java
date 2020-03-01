package com.example.demo.service;

import com.example.demo.dao.entity.*;
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
    public Heroes createHeroes(String episode, String charid) {
        final Heroes heroes = new Heroes();
        heroes.setEpisode(episode);
        heroes.setCharid(charid);
        return this.heroesRepository.save(heroes);
    }

    @Transactional(readOnly = true)
    public Iterable<Heroes> getAllHeroes(String episode, String charid) {
        return this.heroesRepository.findHeroesByCharidOrEpisode(episode, charid);
    }
   
}

