package com.example.demo.dao.repository;

import java.util.List;
import com.example.demo.dao.entity.CharacterType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface CharacterTypeRepository extends JpaRepository<CharacterType, String> {
//List<CharacterType> findCharacterTypeByIdOrName(String id, String name);    
List<CharacterType> findAllCharacterTypeByIdOrName(String id, String name);  
}