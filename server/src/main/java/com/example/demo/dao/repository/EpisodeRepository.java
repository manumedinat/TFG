package com.example.demo.dao.repository;
import com.example.demo.dao.entity.*;
import com.example.demo.dao.entity.Character;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface EpisodeRepository extends JpaRepository<Episode, String> {
List <Episode> findAllByCode(String code);
List <Episode> findAllByAppears(Appears appears);
List <Episode> findAllByAppearsAndCode(Appears appears, String code);
List <Episode> findAllByAppearsAndId(Appears appears, String id);
List <Episode> findAllByHeroes(Heroes heroes);
List <Episode> findAllByHeroesAndCode(Heroes heroes, String code);
List <Episode> findAllByHeroesAndId(Heroes heroes, String id);
}
