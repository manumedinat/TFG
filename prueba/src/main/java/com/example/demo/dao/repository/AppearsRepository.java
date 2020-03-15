package com.example.demo.dao.repository;

import java.util.List;
import java.util.Optional;

import com.example.demo.dao.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
@Repository
public interface AppearsRepository extends JpaRepository<Appears, String> {
List <Appears> findByCharid(String charid);

//@Query(" where (charid = coalesce(?:charid,charid))")
List <Appears> findAppearsInByCharid(String charid);
//List <Episode> findByEpisodes(List<Episode> episodes);
}