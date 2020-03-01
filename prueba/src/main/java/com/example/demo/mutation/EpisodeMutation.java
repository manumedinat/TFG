package com.example.demo.mutation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.example.demo.dao.entity.*;
import com.example.demo.service.*;

//import java.time.LocalDate;
@Component
public class EpisodeMutation implements GraphQLMutationResolver {
    @Autowired
    private EpisodeService episodeService;
    public Episode createEpisode(String eid, String ecode) {
        return this.episodeService.createEpisode(eid, ecode);
    }
}