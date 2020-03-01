package com.example.demo.dao.repository;

import java.util.List;

import com.example.demo.dao.entity.Episode;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface EpisodeRepository extends JpaRepository<Episode, String> {
List<Episode> findEpisodeByeidOrEcode (String eid, String ecode);

}