package com.example.demo.resolver;

import java.util.List;
import java.util.Optional;

import javax.validation.constraints.NotBlank;

import com.coxautodev.graphql.tools.GraphQLResolver;
import com.example.demo.dao.*;
import com.example.demo.dao.entity.*;
import com.example.demo.dao.entity.Character;
import com.example.demo.dao.repository.*;

import org.springframework.stereotype.Component;
@Component
public class AppearsResolver implements GraphQLResolver <Appears>{
private final EpisodeRepository episodeRepository;
public AppearsResolver (final EpisodeRepository episodeRepository){
this.episodeRepository = episodeRepository;
    }
    public String identifier (Appears appears){
        String resultado= "http://starwars.mappingpedia.linkeddata.es/movie/";
        resultado+= appears.getCharid().getId() + "/" + appears.getEpisodeid().getId();
        return resultado;
    }
    public List<Episode> getEpisode(Appears appears,  String id,  String code) {
        if(id!=null){
           return episodeRepository.findAllByIdOrCode(id,code);
        }else if (code!=null){
            return episodeRepository.findAllByIdOrCode(id,code);
        }
        return episodeRepository.findAllByIdOrCode(id,code);
     }
}