package com.example.demo.dao.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;


import java.io.Serializable;

@Data
@EqualsAndHashCode
@Entity
@Table (name= "episodes")
public class Episode implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name="eid")
    private String eid;
   /* @OneToOne
    @JoinColumn(name="eid")
    private Appears appears;
    */
    @Column(name = "ecode", nullable = false)
    private String ecode;

    
}