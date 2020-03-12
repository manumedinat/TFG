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
    

    @Id
    //@Column(name = "ch_id", nullable = false)
    private String id;

    @OneToOne
    @MapsId
    @JoinColumn(name="id")
    private Friends friends;

    @Column(name = "fname", nullable = false)
    private String fname;

    @Column(name = "lname")
    private String lname;

    @Column(name = "type", nullable = false)
    private String type;


}