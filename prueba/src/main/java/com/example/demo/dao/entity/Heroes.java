package com.example.demo.dao.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;


import java.io.Serializable;

@Data
@EqualsAndHashCode
@Entity
public class Heroes implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
   // @Column(name = "ID_Heroes", nullable = false)
    private String episodeid;
    
    
    /*@Column(name = "charid", nullable = false)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="characters_id")
    private Character character;
    */
    @Column(name = "characters_id")
    private String charid;
    
    
    
}