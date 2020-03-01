package com.example.demo.dao.repository;

import java.util.List;

import com.example.demo.dao.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface AppearsRepository extends JpaRepository<Appears, String> {
List <Appears> findByCharid(String charid);
}