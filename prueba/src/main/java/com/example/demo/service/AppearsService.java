package com.example.demo.service;

import com.example.demo.dao.entity.*;
import com.example.demo.dao.entity.Character;
import com.example.demo.dao.repository.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AppearsService {

    private final AppearsRepository appearsRepository;
public AppearsService (final AppearsRepository appearsRepository){
this.appearsRepository = appearsRepository;
}
@Transactional
public Appears createAppears (final String charid, final String episodeid) {
 final Appears appears = new Appears();
         //appears.setCharid(charid);
         //appears.setEpisodeid(episodeid);
         return this.appearsRepository.save(appears);
       }
        
    @Transactional(readOnly = true)
       public Iterable<Appears> getAllAppears(final String identifier, final String episodeid) {
         if(appearsRepository.findAllByCharidOrEpisodeid(identifier,episodeid).isEmpty()){
            return this.appearsRepository.findAll();
           }
            return this.appearsRepository.findAllByCharidOrEpisodeid(identifier,episodeid);
        }
    }