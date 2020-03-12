package com.example.demo.resolver;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import com.coxautodev.graphql.tools.GraphQLResolver;
import com.example.demo.dao.*;
import com.example.demo.dao.entity.Character;
import com.example.demo.dao.entity.Friends;
import com.example.demo.dao.entity.Appears;
import com.example.demo.dao.repository.AppearsRepository;

import org.springframework.stereotype.Component;

import com.example.demo.dao.repository.CharacterRepository;
import com.example.demo.dao.repository.FriendsRepository;

@Component
public class CharacterResolver implements GraphQLResolver<Character> {
    private final AppearsRepository appearsRepository;
    private final FriendsRepository friendsRepository;
    // private CharacterRepository CharacterRepository;

    public CharacterResolver(final AppearsRepository appearsRepository, final FriendsRepository friendsRepository) {
        this.appearsRepository = appearsRepository;
        this.friendsRepository = friendsRepository;
    }

    public List<Appears> getAppearsIn(Character character, final String charid) {
       // return AppearsRepository.findEpisodeByeidOrEcode(eid, ecode);
            if(character.getId() != null) {
            return appearsRepository.findAll().stream().filter((appears-> character.getId().equals(charid))).collect(Collectors.toList());
            }else{
                return appearsRepository.findAll();
            }
        }
    public List<Friends> getFriendship(Character character, final String id, final String fid) {
       // return AppearsRepository.findEpisodeByeidOrEcode(eid, ecode);
            if(character.getId() != null) {
            return friendsRepository.findAll().stream().filter((friends-> character.getId().equals(id))).collect(Collectors.toList());
            }else{
                return friendsRepository.findAll();
            }
        }    

}