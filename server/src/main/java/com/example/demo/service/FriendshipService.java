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
public class FriendshipService{
@PersistenceContext
private EntityManager entityManager;
private final FriendshipRepository friendshipRepository;
	public FriendshipService (final FriendshipRepository friendshipRepository){
	this.friendshipRepository = friendshipRepository;
}
@Transactional(readOnly= true)
public List <Friendship> getAllFriendship(final String identifier, final String charid, final String friendId){
	List <Friendship> filter= new ArrayList<Friendship>();
	if(identifier==null && charid==null && friendId==null){
		filter=this.friendshipRepository.findAll();
	}else if (identifier!=null){
		String template="http://starwars.mappingpedia.linkeddata.es/friends/";
		filter = entityManager.createQuery
	("SELECT friendship FROM Friendship friendship WHERE '"+ template + "' || friendship.id || '/' || friendship.fid || '' = '" + identifier + "'" ).getResultList();
	}else{
		filter= this.friendshipRepository.findAllByIdOrFid(charid,friendId);
		}

	return filter;
	}

}
