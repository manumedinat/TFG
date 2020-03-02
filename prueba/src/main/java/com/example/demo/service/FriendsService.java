package com.example.demo.service;

import com.example.demo.dao.entity.*;
import com.example.demo.dao.repository.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



@Service
public class FriendsService {

    private final FriendsRepository friendsRepository ;

    public FriendsService(final FriendsRepository friendsRepository) {
        this.friendsRepository = friendsRepository ;
    }

    @Transactional
    public Friends createFriends(String id, String fid) {
        final Friends friends = new Friends();
        friends.setId(id);
        friends.setFid(fid);
        return this.friendsRepository.save(friends);
    }

    @Transactional(readOnly = true)
    public Iterable<Friends> getAllFriends(String id, String fid) {
        return this.friendsRepository.findFriendsByIdOrFid(id, fid);
    }
   
}

