package com.example.demo.service;

import java.util.Optional;

import com.example.demo.dao.entity.*;
import com.example.demo.dao.entity.Character;
import com.example.demo.dao.repository.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class AppearsService {

    private final AppearsRepository appearsRepository ;

    public AppearsService(final AppearsRepository appearsRepository) {
        this.appearsRepository = appearsRepository ;
    }

    @Transactional
    public Appears createAppears(final String charid, final String episodeid) {
        final Appears appears = new Appears();
        appears.setCharid(charid);
        appears.setEpisodeid(episodeid);
        return this.appearsRepository.save(appears);
    }

    @Transactional(readOnly = true)
    public Iterable<Appears> getAllAppears(final String charid) {
        return this.appearsRepository.findByCharid(charid);
    }

   
}

