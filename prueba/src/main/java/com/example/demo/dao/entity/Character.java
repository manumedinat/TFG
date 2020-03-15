package com.example.demo.dao.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;



import java.io.Serializable;

@Data
@EqualsAndHashCode
@Entity
@Table (name="characters")
public class Character implements Serializable {

  

    private static final long serialVersionUID = 1L;
    
    //foreign key de friends
    @Id
    private String id;
    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name="id")
    private Friends friends;
    
    @Column(name = "fname", nullable = false)
    private String fname;

    @Column(name = "lname")
    private String lname;

    @Column(name = "type", nullable = false)
    private String personType;
    

    /*@OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "type", referencedColumnName = "type")
    private CharacterType characterType;*/
}