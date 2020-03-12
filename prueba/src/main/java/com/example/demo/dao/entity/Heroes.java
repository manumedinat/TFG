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

   // @Column(name = "char_id", nullable = false)
    private String charid;
}