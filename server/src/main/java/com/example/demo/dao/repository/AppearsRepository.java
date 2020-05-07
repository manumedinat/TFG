package com.example.demo.dao.repository;
import com.example.demo.dao.entity.*;
import com.example.demo.dao.entity.Character;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface AppearsRepository extends JpaRepository<Appears, String> {
List <Appears> findAllByCharacter(Character character);
List <Appears> findAllByCharacterAndCharidAndEpisodeid(Character character,String charid,String episodeid);
}
