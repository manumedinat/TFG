package com.example.demo.mutation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.example.demo.dao.entity.*;
import com.example.demo.dao.entity.Character;
import com.example.demo.service.*;
@Component
	public class Mutation implements GraphQLMutationResolver{
	@Autowired
	private FriendshipService friendshipService;
	public Friendship createFriendship(String id,String fid){
		return this.friendshipService.createFriendship (id,fid);
	}

	@Autowired
	private HeroesService heroesService;
	public Heroes createHeroes(String episodeid,String charid){
		return this.heroesService.createHeroes (episodeid,charid);
	}

	@Autowired
	private AppearsService appearsService;
	public Appears createAppears(String charid,String episodeid){
		return this.appearsService.createAppears (charid,episodeid);
	}

	@Autowired
	private CharacterService characterService;
	public Character createCharacter(String id,String fname,String lname){
		return this.characterService.createCharacter (id,fname,lname);
	}

	@Autowired
	private EpisodeService episodeService;
	public Episode createEpisode(String id,String code){
		return this.episodeService.createEpisode (id,code);
	}

	@Autowired
	private CharacterTypeService characterTypeService;
	public CharacterType createCharacterType(String id,String name){
		return this.characterTypeService.createCharacterType (id,name);
	}

}