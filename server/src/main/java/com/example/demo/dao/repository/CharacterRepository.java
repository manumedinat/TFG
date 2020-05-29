package com.example.demo.dao.repository;
import com.example.demo.dao.entity.*;
import com.example.demo.dao.entity.Character;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface CharacterRepository extends JpaRepository<Character, String> {
List <Character> findAllByHeroes(Heroes heroes);
List <Character> findAllByHeroesAndId(Heroes heroes, String id);
List <Character> findAllByHeroesAndFnameAndLname(Heroes heroes, String fname, String lname);
}
