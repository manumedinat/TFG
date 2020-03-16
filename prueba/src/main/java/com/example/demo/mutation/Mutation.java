package com.example.demo.mutation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.example.demo.dao.entity.*;
import com.example.demo.dao.entity.Character;
import com.example.demo.service.*;

//import java.time.LocalDate;
@Component
public class Mutation implements GraphQLMutationResolver {
    //APPEARS
    @Autowired
    private AppearsService appearsService;
    public Appears createAppears(String charid, String episodeid) {
        return this.appearsService.createAppears(charid,episodeid);
    }
    //CHARACTER
    @Autowired
    private CharacterService characterService;
    public Character createCharacter(String id, String fname, String lname, String type) {
        return this.characterService.createCharacter(id,fname,lname,type);
    }
    //CHARACTERTYPE
    @Autowired
    private CharacterTypeService characterTypeService;
    public CharacterType createCharacterType(String id, String name) {
        return this.characterTypeService.createCharacterType(id,name);
    }

    //EPISODE
    @Autowired
    private EpisodeService episodeService;
    public Episode createEpisode(String eid, String ecode) {
        return this.episodeService.createEpisode(eid, ecode);
    }

    //FRIENDS
    @Autowired
    private FriendsService friendsService;
    public Friends createFriends(String id, String fid) {
        return this.friendsService.createFriends(id,fid);
    }

    //HEROES
    @Autowired
    private HeroesService heroesService;
    public Heroes createHeroes(String episodeid, String charid) {
        return this.heroesService.createHeroes(episodeid, charid);
    }
}