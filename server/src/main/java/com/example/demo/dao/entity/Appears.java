package com.example.demo.dao.entity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
@Data
@EqualsAndHashCode
@Entity
@Table (name="appears_SW")
@IdClass(AppearsId.class)
public class Appears implements Serializable{
private static final long serialVersionUID = 1L;

	@Id
	@Column(name="charid")
	private String charid;

	@Id
	@Column(name="episodeid")
	private String episodeid;

	@ManyToOne
	@JoinColumn(name="charid", insertable=false, updatable=false)
	private Character character;

	@ManyToOne
	@JoinColumn(name="episodeid", insertable=false, updatable=false)
	private Episode episode;

	public String getIdentifier(){
		String identifier = "http://starwars.mappingpedia.linkeddata.es/movie/";
		identifier+= charid + "/" + episodeid;
		return identifier;
	}
}
