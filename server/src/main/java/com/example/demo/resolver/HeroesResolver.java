package com.example.demo.resolver;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import com.coxautodev.graphql.tools.GraphQLResolver;
import java.util.List;
import com.example.demo.dao.entity.*;
import com.example.demo.dao.entity.Character;
import org.springframework.stereotype.Component;
import com.example.demo.dao.repository.*;
@Component
public class HeroesResolver implements GraphQLResolver <Heroes>{
private final CharacterRepository characterRepository;
private final EpisodeRepository episodeRepository;
	public HeroesResolver(final CharacterRepository characterRepository,final EpisodeRepository episodeRepository){
		this.characterRepository = characterRepository;
		this.episodeRepository = episodeRepository;
	}
	public List<Character> getHero(Heroes heroes,final String identifier,final String name){
		List<Character> join = new ArrayList<Character>();
			if (identifier!=null){
				String id1=identifier.substring(identifier.lastIndexOf('/') + 1,identifier.length());
				join=characterRepository.findAllByHeroesAndId(heroes, id1);
			}else if (name!=null){
				String fname=name.split(" ") [0];
				String lname=name.split(" ") [1];
				join=characterRepository.findAllByHeroesAndFnameAndLname(heroes,fname,lname);
			}else{
				join=characterRepository.findAllByHeroes(heroes);
			}
			return join;
		}

	public List<Episode> getEpisode(Heroes heroes,final String identifier,final String code){
		List<Episode> join = new ArrayList<Episode>();
			if (identifier!=null){
				String id1=identifier.substring(identifier.lastIndexOf('/') + 1,identifier.length());
				join=episodeRepository.findAllByHeroesAndId(heroes, id1);
			}else if (code!=null){
				join=episodeRepository.findAllByHeroesAndCode(heroes,code);
			}else{
				join=episodeRepository.findAllByHeroes(heroes);
			}
			return join;
		}

}
