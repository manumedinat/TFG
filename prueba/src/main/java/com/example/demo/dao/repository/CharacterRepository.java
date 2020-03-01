package com.example.demo.dao.repository;

import java.util.List;

import com.example.demo.dao.entity.Character;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface CharacterRepository extends JpaRepository<Character, String> {
List<Character> findCharacterByIdOrFname(String id, String fname);    

}