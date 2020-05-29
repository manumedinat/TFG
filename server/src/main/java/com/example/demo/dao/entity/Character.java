package com.example.demo.dao.entity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
@Data
@EqualsAndHashCode
@Entity
@Table (name="characters_sw")
public class Character implements Serializable{
private static final long serialVersionUID = 1L;

	@Id
	@Column(name="id")
	private String id;

	@Column(name="fname")
	private String fname;

	@Column(name="lname")
	private String lname;

	@Column(name="typeid")
	private String typeid;

	@OneToMany(mappedBy="charid")
	private List <Heroes> heroes;

	@OneToMany(mappedBy="id")
	private List <Friendship> friendship;

	@OneToMany(mappedBy="charid")
	private List <Appears> appears;

	public String getIdentifier(){
		String identifier = "http://starwars.mappingpedia.linkeddata.es/character/";
		identifier+= id;
		return identifier;
	}
	public String getName(){
		return fname+ ' ' + lname;
	}
}
