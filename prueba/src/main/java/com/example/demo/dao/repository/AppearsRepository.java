package com.example.demo.dao.repository;
import com.example.demo.dao.entity.*;
import com.example.demo.dao.entity.Character;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface AppearsRepository extends JpaRepository<Appears, String> {
List <Appears> findAllByCharidOrEpisodeid(String charid, String episodeid);
List <Appears> findAllByCharid(Character character);
List <Appears> findAllByCharidAndCharid_id(Character character, String identifier);
/*List <Appears> findAllByCharacterAndCharid(Character character, String charid);
List <Appears> findAllByCharacterAndEpisodeid(Character character, String episodeid);
*/
}
