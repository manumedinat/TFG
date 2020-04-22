package com.example.demo.dao.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
@Data
@EqualsAndHashCode
@Entity
@Table (name="character_SW")
public class Character implements Serializable{
private static final long serialVersionUID = 1L;
	@Id
	@Column(name="id")
	private String id;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="typeid")
	private CharacterType typeid;
	
	@Column(name="fname")
	private String fname;

	@Column(name="lname")
	private String lname;


	public String getIdentifier(){
        String identifier= "http://starwars.mappingpedia.linkeddata.es/character/";
        identifier+= id;
        return identifier;
	}
}
