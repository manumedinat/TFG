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
public class CharacterService{
@PersistenceContext
private EntityManager entityManager;
private final CharacterRepository characterRepository;
	public CharacterService (final CharacterRepository characterRepository){
	this.characterRepository = characterRepository;
}
@Transactional(readOnly= true)
public List <Character> getAllCharacter(final String identifier, final String fname, final String lname){
	List <Character> filter= new ArrayList<Character>();
	if(identifier==null && fname==null && lname==null){
		filter=this.characterRepository.findAll();
	}else if (identifier!=null){
		String template="http://starwars.mappingpedia.linkeddata.es/character/";
		filter = entityManager.createQuery
	("SELECT character FROM Character character WHERE '"+ template + "' || character.id || '' = '" + identifier + "'" ).getResultList();
	}else{
		filter= this.characterRepository.findAllByFnameOrLname(fname,lname);
		}

	return filter;
	}

}
