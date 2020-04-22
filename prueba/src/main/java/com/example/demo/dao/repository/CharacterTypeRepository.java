package com.example.demo.dao.repository;
import com.example.demo.dao.entity.*;
import com.example.demo.dao.entity.Character;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface CharacterTypeRepository extends JpaRepository<CharacterType, String> {
List <CharacterType> findAllByIdOrName(String id, String name);
List <CharacterType> findAllByName(String name);
/*List <CharacterType> findAllByCharacter(Character character);
List <CharacterType> findAllByCharacter_CharacterType(CharacterType characterType);
List <CharacterType> findAllByCharacterAndId(Character character, String id);
List <CharacterType> findAllByCharacterAndName(Character character, String name);
*/
}
