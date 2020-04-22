package com.example.demo.resolver;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.coxautodev.graphql.tools.GraphQLResolver;
import com.example.demo.dao.entity.*;
import com.example.demo.dao.entity.Character;
import com.example.demo.dao.repository.*;
import com.example.demo.service.CharacterService;
import org.springframework.stereotype.Component;

@Component
public class CharacterResolver implements GraphQLResolver <Character>{
@PersistenceContext
private EntityManager entityManager;
private final AppearsRepository appearsRepository;
private final FriendshipRepository friendshipRepository;
private final CharacterTypeRepository characterTypeRepository;
private final CharacterService characterService;
public CharacterResolver (final CharacterService characterService,
final AppearsRepository appearsRepository, final FriendshipRepository friendshipRepository,
 final CharacterTypeRepository characterTypeRepository){
this.appearsRepository = appearsRepository;
this.characterService=characterService;
        this.friendshipRepository = friendshipRepository;
        this.characterTypeRepository= characterTypeRepository;
    }
    List<Character> prueba2;
    boolean flag;
    public List<Appears> getAppearsIn(final Character character, final String identifier) {
        List<Appears> join = new ArrayList<Appears>();
        if(identifier!=null){
            //flag=true;
            this.characterService.setFlag(true);
            String template= "http://starwars.mappingpedia.linkeddata.es/movie/";
            List<Appears> prueba=entityManager.createQuery(
                    " SELECT ap FROM Character c LEFT JOIN Appears ap ON c.id=ap.charid WHERE '"
                            + template + "' || ap.charid || '/' || ap.episodeid || '' = '" + identifier + "'")
                    .getResultList();
            prueba2= entityManager.createQuery(
                " SELECT c FROM Character c LEFT JOIN Appears ap ON c.id=ap.charid WHERE '"
                        + template + "' || ap.charid || '/' || ap.episodeid || '' = '" + identifier + "'")
                .getResultList();
            this.characterService.setFilter(prueba2);
            for(int i=0;i<prueba.size();i++){
                if(character.equals(prueba.get(i).getCharid())){
                    join.add(prueba.get(i));
                }
            }
        }else{
            this.characterService.setFlag(false);
            //flag=false;
            join= appearsRepository.findAllByCharid(character);
        }
        return join;
    }
    public List<Friendship> getFriends(final Character character, final String identifier, final String id,final String fid) {
        if(identifier!=null){
            return friendshipRepository.findAllByIdOrFid(identifier,fid);
        } else if (fid!=null){
            return friendshipRepository.findAllByIdOrFid(identifier,fid);
        }
        return friendshipRepository.findAllByIdOrFid(identifier,fid);
    }
    public List<CharacterType> getType (final Character character, final String identifier, final String name){
        List<CharacterType> join = new ArrayList<CharacterType>();
        if(identifier!=null){
            String template= "http://starwars.mappingpedia.linkeddata.es/type/";
            List<CharacterType> prueba;
            prueba=entityManager.createQuery(
                    " SELECT DISTINCT ct FROM Character c LEFT JOIN CharacterType ct ON c.typeid=ct.id WHERE '"
                            + template + "' || ct.id || '' = '" + identifier + "'")
                    .getResultList();
            for(int i=0;i<prueba.size();i++){
                if(character.getTypeid().getId().equals(prueba.get(i).getId())){
                    join.add(prueba.get(i));
                }
            }
            //return characterTypeRepository.findAllByIdOrName(identifier, name);
        } else if (name!=null){
            if(name.equals(character.getTypeid().getName())){
                join.add(character.getTypeid());
            }
        }else{
            join.add(character.getTypeid());
        }
        return join;
        //return characterTypeRepository.findAllByIdOrName(id, name);
    }
    /*
    public boolean getFlag(){
        return flag;
    }
    public List<Character> getList(){
        return prueba2;
    }
    */
}