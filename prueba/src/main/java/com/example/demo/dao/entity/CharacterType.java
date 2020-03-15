package com.example.demo.dao.entity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.Optional;

@Data
@EqualsAndHashCode
@Entity
@Table(name="characterType")
public class CharacterType implements Serializable {

    private static final long serialVersionUID = 1L;


    @Id
   // @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="type")
    private String id;
    
    /*@Column(name="type")
    private String id;
    */
    @Column(name = "name", nullable = false)
    private String name;    


    /*@OneToOne (mappedBy = "characterType")
    private Character character;
    */
}