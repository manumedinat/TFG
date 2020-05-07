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
private final EpisodeRepository episodeRepository;
private final CharacterRepository characterRepository;
	public HeroesResolver(final EpisodeRepository episodeRepository,final CharacterRepository characterRepository){
		this.episodeRepository = episodeRepository;
		this.characterRepository = characterRepository;
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

	public List<Character> getHero(Heroes heroes,final String identifier,final String fname,final String lname){
		List<Character> join = new ArrayList<Character>();
			if (identifier!=null){
				String id1=identifier.substring(identifier.lastIndexOf('/') + 1,identifier.length());
				join=characterRepository.findAllByHeroesAndId(heroes, id1);
			}else if (fname!=null){
				join=characterRepository.findAllByHeroesAndFname(heroes,fname);
			}else if (lname!=null){
				join=characterRepository.findAllByHeroesAndLname(heroes,lname);
			}else{
				join=characterRepository.findAllByHeroes(heroes);
			}
			return join;
		}

}
