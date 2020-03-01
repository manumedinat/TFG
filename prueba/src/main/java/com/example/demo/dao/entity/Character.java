package com.example.demo.dao.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;



import java.io.Serializable;

@Data
@EqualsAndHashCode
@Entity
public class Character implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "ID_Character", nullable = false)
    private String id;
    @OneToOne(mappedBy = "character", optional = true, cascade = CascadeType.PERSIST)
    private Appears appears;


    @Column(name = "f_name", nullable = false)
    private String fname;

    @Column(name = "l_name")
    private String lname;

    @Column(name = "type", nullable = false)
    private String type;

}