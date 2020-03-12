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


    public HeroesResolver(final CharacterRepository characterRepository, EpisodeRepository episodeRepository) {
        this.characterRepository = characterRepository;
        this.episodeRepository= episodeRepository;
    }

    public List<Episode> getEpisode(Heroes heroes, final String eid, final String ecode) {
       // return episodeRepository.findEpisodeByeidOrEcode(eid, ecode);
            if(heroes.getEpisodeid() != null) {
            return episodeRepository.findAll().stream().filter((episode-> heroes.getEpisodeid().equals(eid))).collect(Collectors.toList());
            }else{
                return episodeRepository.findAll();
            }
        }
        public List<Character> getHero(Heroes heroes, final String id, final String fname) {
            // return episodeRepository.findEpisodeByeidOrEcode(eid, ecode);
                 if(heroes.getEpisodeid() != null) {
                 return characterRepository.findAll().stream().filter((character-> heroes.getCharid().equals(id))).collect(Collectors.toList());
                 }else{
                     return characterRepository.findAll();
                 }
             }    

}