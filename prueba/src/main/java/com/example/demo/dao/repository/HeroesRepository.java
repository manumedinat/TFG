package com.example.demo.dao.repository;

import java.util.List;

import com.example.demo.dao.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface HeroesRepository extends JpaRepository<Heroes, String> {
List<Heroes> findHeroesByCharidOrEpisode(String episode, String charid); 
}