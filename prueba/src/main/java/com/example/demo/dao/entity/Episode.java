package com.example.demo.dao.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;


import java.io.Serializable;

@Data
@EqualsAndHashCode
@Entity
public class Episode implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "ID_Episode", nullable = false)
    private String eid;

    @Column(name = "e_code", nullable = false)
    private String ecode;
}