package com.example.demo.dao.repository;
import com.example.demo.dao.entity.*;
import com.example.demo.dao.entity.Character;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface CharacterRepository extends JpaRepository<Character,String> {
List <Character> findAllByIdOrFnameOrLname(String id, String fname, String lname);
List <Character> findAllByFnameOrLname(String fname, String lname);
}
