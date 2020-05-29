package com.example.demo.dao.entity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
@Data
@EqualsAndHashCode
@Entity
@Table (name="episodes_sw")
public class Episode implements Serializable{
private static final long serialVersionUID = 1L;

	@Id
	@Column(name="id")
	private String id;

	@Column(name="code")
	private String code;

	@OneToMany(mappedBy="episodeid")
	private List <Appears> appears;

	@OneToMany(mappedBy="episodeid")
	private List <Heroes> heroes;

	public String getIdentifier(){
		String identifier = "http://starwars.mappingpedia.linkeddata.es/episode/";
		identifier+= id;
		return identifier;
	}
}
