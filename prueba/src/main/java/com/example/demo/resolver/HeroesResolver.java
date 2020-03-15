package com.example.demo.resolver;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import com.coxautodev.graphql.tools.GraphQLResolver;
import com.example.demo.dao.*;
import com.example.demo.dao.entity.*;
import com.example.demo.dao.entity.Character;
import com.example.demo.dao.repository.*;

import org.springframework.stereotype.Component;



@Component
public class HeroesResolver implements GraphQLResolver<Heroes> {
    private final CharacterRepository characterRepository;
    private final EpisodeRepository episodeRepository;
    private final HeroesRepository heroesRepository;


    public HeroesResolver(final HeroesRepository heroesRepository,final CharacterRepository characterRepository, EpisodeRepository episodeRepository) {
        this.characterRepository = characterRepository;
        this.episodeRepository= episodeRepository;
        this.heroesRepository= heroesRepository;
    }

    public List<Episode> getEpisode(Heroes heroes, final String eid, final String ecode) {
        return episodeRepository.findEpisodeByEidOrEcode(heroes.getEpisodeid(), ecode);
    }
        public Iterable<Character> getHero(Heroes heroes, final String id, final String fname) {
            if(characterRepository.findCharactersByIdOrFname(id, fname).isEmpty()){
                return characterRepository.findCharactersByIdOrFname(heroes.getCharid(), fname);
            }
            return characterRepository.findCharactersByIdOrFname(id, fname);
           //return characterRepository.findAll().stream().filter(character-> id.equals(heroes.getCharid())).collect(Collectors.toSet());
        }    

}