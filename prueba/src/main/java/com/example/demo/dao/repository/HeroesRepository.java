package com.example.demo.dao.repository;
import com.example.demo.dao.entity.*;
import com.example.demo.dao.entity.Character;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface HeroesRepository extends JpaRepository<Heroes, String> {
List <Heroes> findAllByEpisodeidOrCharid(String episodeid, String charid);
}
