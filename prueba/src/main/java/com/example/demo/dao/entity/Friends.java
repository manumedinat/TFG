package com.example.demo.dao.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;


import java.io.Serializable;

@Data
@EqualsAndHashCode
@Entity
public class Friends implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "ID_Friends", nullable = false)
    private String id;

    @Column(name = "fid", nullable = false)
    private String fid;
}