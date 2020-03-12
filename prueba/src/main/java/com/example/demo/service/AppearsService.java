package com.example.demo.service;

import java.util.List;
import java.util.stream.Collectors;

import com.example.demo.dao.entity.*;
import com.example.demo.dao.entity.Character;
import com.example.demo.dao.repository.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class AppearsService {

    private final AppearsRepository appearsRepository ;
    private final EpisodeRepository episodeRepository ;

    public AppearsService(final AppearsRepository appearsRepository, final EpisodeRepository episodeRepository) {
        this.appearsRepository = appearsRepository;
        this.episodeRepository = episodeRepository;
    }

    @Transactional
    public Appears createAppears(final String charid, final String episodeid) {
        final Appears appears = new Appears();
        appears.setCharid(charid);
        appears.setEpisodeid(episodeid);
        return this.appearsRepository.save(appears);
    }

    @Transactional(readOnly = true)
    public Iterable<Appears> getAllAppears(final String charid) {
        return this.appearsRepository.findByCharid(charid);
    }
    
    @Transactional(readOnly = true)
    public List <Episode> getEpisodesFromAppears(final String eid, final String ecode){
        return episodeRepository.findEpisodeByeidOrEcode(eid, ecode);
    }
   
}

