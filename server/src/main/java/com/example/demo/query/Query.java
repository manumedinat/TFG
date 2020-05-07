package com.example.demo.query;
import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.example.demo.dao.entity.*;
import com.example.demo.dao.entity.Character;
import com.example.demo.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
@Component
	public class Query implements GraphQLQueryResolver{
	@Autowired
	private FriendshipService friendshipService;
	public Iterable <Friendship> listFriendship(String identifier,String fid,String id){
		return this.friendshipService.getAllFriendship (identifier,fid,id);
	}

	@Autowired
	private HeroesService heroesService;
	public Iterable <Heroes> listHeroes(String identifier){
		return this.heroesService.getAllHeroes (identifier);
	}

	@Autowired
	private AppearsService appearsService;
	public Iterable <Appears> listAppears(String identifier){
		return this.appearsService.getAllAppears (identifier);
	}

	@Autowired
	private CharacterService characterService;
	public Iterable <Character> listCharacter(String identifier,String fname,String lname){
		return this.characterService.getAllCharacter (identifier,fname,lname);
	}

	@Autowired
	private EpisodeService episodeService;
	public Iterable <Episode> listEpisode(String identifier,String code){
		return this.episodeService.getAllEpisode (identifier,code);
	}

	@Autowired
	private CharacterTypeService characterTypeService;
	public Iterable <CharacterType> listCharacterType(String identifier,String name){
		return this.characterTypeService.getAllCharacterType (identifier,name);
	}

}