package com.example.demo.dao.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;


import java.io.Serializable;

@Data
@EqualsAndHashCode
@Entity
public class Appears implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name="ID_Appears", nullable = false, unique = false)
    private String charid;
    
    @MapsId
    @OneToOne(optional=false)
    Character character;

    @Column(name = "episode_id", nullable = false)
    private String episodeid;

    

}