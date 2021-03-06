package com.example.demo.service;
import com.example.demo.dao.entity.*;
import com.example.demo.dao.entity.Character;
import com.example.demo.dao.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.ArrayList;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Service
public class EpisodeService{
@PersistenceContext
private EntityManager entityManager;
private final EpisodeRepository episodeRepository;
	public EpisodeService (final EpisodeRepository episodeRepository){
	this.episodeRepository = episodeRepository;
}
@Transactional(readOnly= true)
public List <Episode> getAllEpisode(final String identifier, final String code){
	List <Episode> filter= new ArrayList<Episode>();
	if(identifier==null && code==null){
		filter=this.episodeRepository.findAll();
	}else if (identifier!=null){
		String template="http://starwars.mappingpedia.linkeddata.es/episode/";
		filter = entityManager.createQuery
	("SELECT episode FROM Episode episode WHERE '"+ template + "' || episode.id || '' = '" + identifier + "'" ).getResultList();
	}else{
		filter= this.episodeRepository.findAllByCode(code);
		}

	return filter;
	}

}
