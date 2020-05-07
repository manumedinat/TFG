package com.example.demo.dao.repository;
import com.example.demo.dao.entity.*;
import com.example.demo.dao.entity.Character;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface FriendshipRepository extends JpaRepository<Friendship, String> {
List <Friendship> findAllByFidOrId(String fid, String id);
List <Friendship> findAllByCharacter(Character character);
List <Friendship> findAllByCharacterAndIdAndFid(Character character,String id,String fid);
List <Friendship> findAllByCharacterAndFid(Character character, String fid);
List <Friendship> findAllByCharacterAndId(Character character, String id);
}
