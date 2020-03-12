package com.example.demo.resolver;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import com.coxautodev.graphql.tools.GraphQLResolver;
import com.example.demo.dao.*;
import com.example.demo.dao.entity.Appears;
import com.example.demo.dao.entity.Episode;
import com.example.demo.dao.repository.EpisodeRepository;

import org.springframework.stereotype.Component;

import com.example.demo.dao.repository.AppearsRepository;

@Component
public class AppearsResolver implements GraphQLResolver<Appears> {
    private final EpisodeRepository episodeRepository;
    // private AppearsRepository appearsRepository;

    public AppearsResolver(final EpisodeRepository episodeRepository) {
        this.episodeRepository = episodeRepository;
    }

    public List<Episode> getEpisode(Appears appears, final String eid, final String ecode) {
       // return episodeRepository.findEpisodeByeidOrEcode(eid, ecode);
            if(appears.getEpisodeid() != null) {
            return episodeRepository.findAll().stream().filter((episode-> appears.getEpisodeid().equals(eid))).collect(Collectors.toList());
            }else{
                return episodeRepository.findAll();
            }
        }

}