package com.example.demo.dao.repository;

import java.util.List;

import com.example.demo.dao.entity.Character;
import com.example.demo.dao.entity.Friends;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
@Repository
public interface CharacterRepository extends JpaRepository<Character, String> {
List<Character> findCharacterByIdOrFname(String id, String fname);
List<Character> findCharactersByIdOrFname(String id, String fname);
List<Character> findAllById(String id);
//@Query("SELECT h.charid FROM HEROES h.charid LEFT JOIN characters c on h.charid=c.id")    
//List<Character> findWithAllDetails(String charid);

}