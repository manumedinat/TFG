package com.example.demo.dao.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import javax.persistence.*;

import org.checkerframework.common.aliasing.qual.Unique;

import java.io.Serializable;

@Data
@EqualsAndHashCode
@Entity
@Table(name= "friends")
public class Friends implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name= "ID",unique = false)
   // @Column(name = "ID_Friends", nullable = false)
    private String id;

    @Column(name = "FR_ID")
    private String fid;
}