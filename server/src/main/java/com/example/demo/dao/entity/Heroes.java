package com.example.demo.dao.entity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
@Data
@EqualsAndHashCode
@Entity
@Table (name="heroes_sw")
public class Heroes implements Serializable{
private static final long serialVersionUID = 1L;

	@Id
	@Column(name="episodeid")
	private String episodeid;

	@Column(name="charid")
	private String charid;

	@ManyToOne
	@JoinColumn(name="episodeid", insertable=false, updatable=false)
	private Episode episode;

	@ManyToOne
	@JoinColumn(name="charid", insertable=false, updatable=false)
	private Character character;

	public String getIdentifier(){
		String identifier = "http://starwars.mappingpedia.linkeddata.es/heroes/";
		identifier+= episodeid + "/" + charid;
		return identifier;
	}
}
