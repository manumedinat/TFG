package com.example.demo.dao.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

import com.example.demo.dao.repository.EpisodeRepository;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;

@Data
@EqualsAndHashCode
@Entity
@Table(name="appears")
public class Appears implements Serializable {

    private static final long serialVersionUID = 1L;


    @Id
    private String charid;

    @OneToOne
    @MapsId
    @JoinColumn(name="charid")
    private Character character;
    
    @Column(name = "episodeid", nullable = false)
    private String episodeid;

    @OneToOne (mappedBy = "appears", cascade = CascadeType.ALL, fetch = FetchType.LAZY, optional = false)
    private Episode episode;
    
    
    /*public Episode getEpisode (String eid, String ecode){
        return episode;
    }*/

}