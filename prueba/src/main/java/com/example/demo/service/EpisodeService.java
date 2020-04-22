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

@Service
public class EpisodeService {
@PersistenceContext
private EntityManager entityManager;    
private final EpisodeRepository episodeRepository;
public EpisodeService (final EpisodeRepository episodeRepository){
this.episodeRepository = episodeRepository;
}
@Transactional
public Episode createEpisode (String id, String code) {
 final Episode episode = new Episode();
        episode.setCode(code);
        //episode.setId(id);
        return this.episodeRepository.save(episode);
    }

    @Transactional(readOnly = true)
    public Iterable<Episode> getAllEpisode(String identifier, String code) {
        List<Episode> filter;
        if(identifier== null && code == null){
            filter=this.episodeRepository.findAll();
        }else if(identifier!=null){
            String template= "http://starwars.mappingpedia.linkeddata.es/episode/";
            filter=entityManager.createQuery
            (" SELECT e FROM Episode e WHERE '" + template + "' || e.id || '' = '" 
            + identifier + "'" ).getResultList();  
        }else{
            filter= this.episodeRepository.findAllByCode(code);
        }
        return filter;
    }
   
}