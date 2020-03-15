package com.example.demo.resolver;

import java.util.List;
import com.coxautodev.graphql.tools.GraphQLResolver;
import com.example.demo.dao.entity.Appears;
import com.example.demo.dao.entity.Episode;
import com.example.demo.dao.repository.AppearsRepository;
import com.example.demo.dao.repository.EpisodeRepository;

import org.springframework.stereotype.Component;



@Component
public class AppearsResolver implements GraphQLResolver<Appears> {
    private final EpisodeRepository episodeRepository;
    private final AppearsRepository appearsRepository;
 

    public AppearsResolver(final EpisodeRepository episodeRepository, final AppearsRepository appearsRepository) {
        this.episodeRepository = episodeRepository;
        this.appearsRepository= appearsRepository;
    }

    public Iterable<Episode> getEpisode(Appears appears,  String eid,  String ecode) {
        if(appearsRepository.findByCharid(appears.getCharid()).isEmpty()){
            return episodeRepository.findAll();
        }
        return episodeRepository.findEpisodeByEidOrEcode(eid, ecode);
           /* if(episodeRepository.findEpisodeByeidOrEcode(eid, ecode).isEmpty()) {
            return episodeRepository.findAll().stream().filter((episode-> appears.getEpisodeid().equals(eid))).collect(Collectors.toList());
            }else{
                return episodeRepository.findAll();
            }*/
        }

}