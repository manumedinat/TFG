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
public class HeroesResolver implements GraphQLResolver <Heroes>{
private final CharacterRepository characterRepository;
private final EpisodeRepository episodeRepository;
public HeroesResolver (final CharacterRepository characterRepository, final EpisodeRepository episodeRepository){
this.characterRepository = characterRepository;
         this.episodeRepository= episodeRepository;
    }
    
    public List<Episode> getEpisode(Heroes heroes, final String id, final String code) {
        if(id!=null){
            return episodeRepository.findAllByIdOrCode(id,code);
        }else if(code!=null){
            return episodeRepository.findAllByIdOrCode(id,code);
        }
        return episodeRepository.findAllByIdOrCode(id,code);
    }
    public Iterable<Character> getHero(Heroes heroes, final String id, final String fname, final String lname) {
        if(id!=null){
            return characterRepository.findAllByIdOrFnameOrLname(id, fname, lname);
        }else if(fname!=null){
            return characterRepository.findAllByIdOrFnameOrLname(id, fname, lname);
        }
        return characterRepository.findAllByIdOrFnameOrLname(id, fname, lname);
    }    
}