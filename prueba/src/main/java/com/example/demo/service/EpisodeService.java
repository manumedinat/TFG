package com.example.demo.service;

import com.example.demo.dao.entity.*;
import com.example.demo.dao.repository.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



@Service
public class EpisodeService {

    private final EpisodeRepository episodeRepository ;

    public EpisodeService(final EpisodeRepository episodeRepository) {
        this.episodeRepository = episodeRepository ;
    }

    @Transactional
    public Episode createEpisode(String eid, String ecode) {
        final Episode episode = new Episode();
        episode.setEcode(ecode);
        episode.setEid(eid);
        return this.episodeRepository.save(episode);
    }

    @Transactional(readOnly = true)
    public Iterable<Episode> getAllEpisodes(String eid, String ecode) {
        return this.episodeRepository.findEpisodeByeidOrEcode(eid, ecode);
    }
   
}

