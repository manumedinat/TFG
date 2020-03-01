package com.example.demo.query;
import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.example.demo.dao.entity.Episode;
import com.example.demo.service.EpisodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class EpisodeQuery implements GraphQLQueryResolver {
    @Autowired
    private EpisodeService episodeService;
    public Iterable<Episode> listEpisode(String eid, String ecode) {
        return this.episodeService.getAllEpisodes(eid, ecode);
    }
}