package com.example.demo.service;

import com.example.demo.dao.entity.*;
import com.example.demo.dao.entity.Character;
import com.example.demo.dao.repository.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

@Service
public class HeroesService {
@PersistenceContext
private EntityManager entityManager;
private final HeroesRepository heroesRepository;
public HeroesService (final HeroesRepository heroesRepository){
this.heroesRepository = heroesRepository;
}
@Transactional
public Heroes createHeroes (String episodeid, String charid) {
 final Heroes heroes = new Heroes();
        //heroes.setEpisodeid(episodeid);
        //heroes.setCharid(charid);
        return this.heroesRepository.save(heroes);
    }

    @Transactional(readOnly = true)
    public List<Heroes> getAllHeroes(String identifier) {
        List<Heroes> filter;
        if(identifier==null){
            filter= this.heroesRepository.findAll();
        }else{
            String template= "http://starwars.mappingpedia.linkeddata.es/heroes/";
            filter= entityManager.createQuery
            (" SELECT h FROM Heroes h WHERE '" + template + "' || h.episodeid || '/' || h.charid || '' = '" 
            + identifier + "'" ).getResultList();     
        }
        return filter;
    }
}