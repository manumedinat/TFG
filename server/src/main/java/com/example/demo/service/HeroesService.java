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
public class HeroesService{
@PersistenceContext
private EntityManager entityManager;
private final HeroesRepository heroesRepository;
	public HeroesService (final HeroesRepository heroesRepository){
	this.heroesRepository = heroesRepository;
}
@Transactional(readOnly= true)
public List <Heroes> getAllHeroes(final String identifier){
	List <Heroes> filter= new ArrayList<Heroes>();
	if(identifier==null){
		filter=this.heroesRepository.findAll();
	}else if (identifier!=null){
		String template="http://starwars.mappingpedia.linkeddata.es/heroes/";
		filter = entityManager.createQuery
	("SELECT heroes FROM Heroes heroes WHERE '"+ template + "' || heroes.episodeid || '/' || heroes.charid || '' = '" + identifier + "'" ).getResultList();
		}

	return filter;
	}

}
