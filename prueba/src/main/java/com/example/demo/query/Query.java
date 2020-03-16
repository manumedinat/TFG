package com.example.demo.query;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.example.demo.dao.entity.*;
import com.example.demo.dao.entity.Character;
import com.example.demo.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Query implements GraphQLQueryResolver{
    //APPEARS
    @Autowired
    private AppearsService appearsService;
    public Iterable<Appears> listAppears(final String charid) {
        return this.appearsService.getAllAppears(charid);
    }
    //CHARACTER
    @Autowired
    private CharacterService characterService;
    public Iterable<Character> listCharacter(String id, String fname, String lname, String type) {
        return this.characterService.getAllCharacters(id,fname,lname,type);
    }

    //CHARACTERTYPE
    @Autowired
    private CharacterTypeService characterTypeService;
    public Iterable<CharacterType> listCharacterType(String id, String name) {
        return this.characterTypeService.getAllCharactersType(id,name);
    }
    //EPISODE
    @Autowired
    private EpisodeService episodeService;
    public Iterable<Episode> listEpisode(String eid, String ecode) {
        return this.episodeService.getAllEpisodes(eid, ecode);
    }
    //FRIENDS
    @Autowired
    private FriendsService friendsService;
    public Iterable<Friends> listFriends(String id, String fid) {
        return this.friendsService.getAllFriends(id, fid);
    }
    //HEROES
    @Autowired
    private HeroesService heroesService;
    public Iterable<Heroes> listHeroes(String episodeid, String charid) {
        return this.heroesService.getAllHeroes(episodeid, charid);
    }
}