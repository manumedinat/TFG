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
public class AppearsService{
@PersistenceContext
private EntityManager entityManager;
private final AppearsRepository appearsRepository;
	public AppearsService (final AppearsRepository appearsRepository){
	this.appearsRepository = appearsRepository;
}
@Transactional(readOnly= true)
public List <Appears> getAllAppears(final String identifier){
	List <Appears> filter= new ArrayList<Appears>();
	if(identifier==null){
		filter=this.appearsRepository.findAll();
	}else if (identifier!=null){
		String template="http://starwars.mappingpedia.linkeddata.es/movie/";
		filter = entityManager.createQuery
	("SELECT appears FROM Appears appears WHERE '"+ template + "' || appears.charid || '/' || appears.episodeid || '' = '" + identifier + "'" ).getResultList();
		}

	return filter;
	}

}
