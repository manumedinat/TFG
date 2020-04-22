package com.example.demo.service;

import com.example.demo.dao.entity.*;
import com.example.demo.dao.entity.Character;
import com.example.demo.dao.repository.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Service
public class FriendshipService {

@PersistenceContext
private EntityManager entityManager;
private final FriendshipRepository friendshipRepository;
public FriendshipService (final FriendshipRepository friendshipRepository){
this.friendshipRepository = friendshipRepository;
}
@Transactional
public Friendship createFriendship (String id, String fid) {
 final Friendship friendship = new Friendship();
        //friendship.setId(id);
        //friendship.setFid(fid);
        return this.friendshipRepository.save(friendship);
    }

    @Transactional(readOnly = true)
    public Iterable<Friendship> getAllFriendship(String identifier,String id, String fid) {
        List<Friendship> filter;
        if(identifier==null && id==null && fid==null){
            filter= this.friendshipRepository.findAll();
        }else if (identifier!=null){
            String template= "http://starwars.mappingpedia.linkeddata.es/heroes/";
            filter= entityManager.createQuery
            (" SELECT f FROM Friendship f WHERE '" + template + "' || f.id || '/' || f.fid || '' = '" 
            + identifier + "'" ).getResultList();   
        }else{
            filter= this.friendshipRepository.findAllByIdOrFid(id, fid);
        }
        return filter;
    }
   
}