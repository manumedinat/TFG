package com.example.demo.resolver;

import java.util.List;
import com.coxautodev.graphql.tools.GraphQLResolver;
import com.example.demo.dao.entity.Character;
import com.example.demo.dao.entity.CharacterType;
import com.example.demo.dao.entity.Friends;
import com.example.demo.dao.entity.Appears;
import com.example.demo.dao.repository.AppearsRepository;

import org.springframework.stereotype.Component;
import javax.persistence.*;

import com.example.demo.dao.repository.CharacterRepository;
import com.example.demo.dao.repository.CharacterTypeRepository;
import com.example.demo.dao.repository.FriendsRepository;

@Component
public class CharacterResolver implements GraphQLResolver<Character> {
    protected EntityManager em;
    private final AppearsRepository appearsRepository;
    private final FriendsRepository friendsRepository;
    private final CharacterTypeRepository characterTypeRepository;
    private final CharacterRepository characterRepository;

    public CharacterResolver(final EntityManager em,final CharacterRepository characterRepository,
    final AppearsRepository appearsRepository, final FriendsRepository friendsRepository, final CharacterTypeRepository characterTypeRepository) {
        this.em=em;
        this.characterRepository= characterRepository;
        this.appearsRepository = appearsRepository;
        this.friendsRepository = friendsRepository;
        this.characterTypeRepository= characterTypeRepository;
    }

    public List<Appears> getAppearsIn(final Character character, final String charid) {
            /*if(appearsRepository.findAppearsInByCharid(charid).isEmpty()){
            //return appearsRepository.findAll().stream().filter((appears-> character.getId().equals(charid))).collect(Collectors.toList());
            return appearsRepository.findAll();
            }*/
            return appearsRepository.findAppearsInByCharid(character.getId()); 
            
           
        }
    public List<Friends> getFriendship(final Character character, final String id, final String fid) {
        return friendsRepository.findAllByIdOrFid(character.getId(), character.getId());
    }
    public List<CharacterType> getType (final Character character, final String id, final String name){
        return characterTypeRepository.findAllCharacterTypeByIdOrName(character.getId(),name);
    }    

}