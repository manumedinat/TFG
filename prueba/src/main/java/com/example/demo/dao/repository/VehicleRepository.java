package com.example.demo.dao.repository;
import com.example.demo.dao.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Integer> {
}