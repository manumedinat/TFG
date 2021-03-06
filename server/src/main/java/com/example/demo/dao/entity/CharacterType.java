package com.example.demo.dao.entity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
@Data
@EqualsAndHashCode
@Entity
@Table (name="types_sw")
public class CharacterType implements Serializable{
private static final long serialVersionUID = 1L;

	@Id
	@Column(name="id")
	private String id;

	@Column(name="name")
	private String name;

	@OneToMany(mappedBy="typeid")
	private List <Character> character;

	public String getIdentifier(){
		String identifier = "http://starwars.mappingpedia.linkeddata.es/type/";
		identifier+= id;
		return identifier;
	}
}
