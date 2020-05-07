package com.example.demo.resolver;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import com.coxautodev.graphql.tools.GraphQLResolver;
import java.util.List;
import com.example.demo.dao.entity.*;
import com.example.demo.dao.entity.Character;
import org.springframework.stereotype.Component;
import com.example.demo.dao.repository.*;
@Component
public class CharacterResolver implements GraphQLResolver <Character>{
private final FriendshipRepository friendshipRepository;
private final AppearsRepository appearsRepository;
private final CharacterTypeRepository characterTypeRepository;
	public CharacterResolver(final FriendshipRepository friendshipRepository,final AppearsRepository appearsRepository,final CharacterTypeRepository characterTypeRepository){
		this.friendshipRepository = friendshipRepository;
		this.appearsRepository = appearsRepository;
		this.characterTypeRepository = characterTypeRepository;
	}
	public List<Friendship> getFriends(Character character,final String identifier,final String fid,final String id){
		List<Friendship> join = new ArrayList<Friendship>();
			if (identifier!=null){
				String id1=identifier.substring(identifier.lastIndexOf('/')-4,identifier.lastIndexOf('/'));
				String id2=identifier.substring(identifier.lastIndexOf('/') + 1,identifier.length());
				join=friendshipRepository.findAllByCharacterAndIdAndFid(character,id1,id2);
			}else if (fid!=null){
				join=friendshipRepository.findAllByCharacterAndFid(character,fid);
			}else if (id!=null){
				join=friendshipRepository.findAllByCharacterAndId(character,id);
			}else{
				join=friendshipRepository.findAllByCharacter(character);
			}
			return join;
		}

	public List<Appears> getAppearsIn(Character character,final String identifier){
		List<Appears> join = new ArrayList<Appears>();
			if (identifier!=null){
				String id1=identifier.substring(identifier.lastIndexOf('/')-4,identifier.lastIndexOf('/'));
				String id2=identifier.substring(identifier.lastIndexOf('/') + 1,identifier.length());
				join=appearsRepository.findAllByCharacterAndCharidAndEpisodeid(character,id1,id2);
			}else{
				join=appearsRepository.findAllByCharacter(character);
			}
			return join;
		}

	public List<CharacterType> getType(Character character,final String identifier,final String name){
		List<CharacterType> join = new ArrayList<CharacterType>();
			if (identifier!=null){
				String id1=identifier.substring(identifier.lastIndexOf('/') + 1,identifier.length());
				join=characterTypeRepository.findAllByCharacterAndId(character, id1);
			}else if (name!=null){
				join=characterTypeRepository.findAllByCharacterAndName(character,name);
			}else{
				join=characterTypeRepository.findAllByCharacter(character);
			}
			return join;
		}

}
