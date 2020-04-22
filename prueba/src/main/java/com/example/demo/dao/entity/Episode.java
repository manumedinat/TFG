package com.example.demo.dao.entity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
@Data
@EqualsAndHashCode
@Entity
@Table (name="episode_SW")
public class Episode implements Serializable{
private static final long serialVersionUID = 1L;
	@Id
	@Column(name="id")
	private String id;
	/*
	@ManyToOne
	@Id
	@JoinColumn(name="id", referencedColumnName = "episodeid")
	private Appears appears;
	*/
	@Column(name="code")
	private String code;

	public String getIdentifier(){
        String identifier= "http://starwars.mappingpedia.linkeddata.es/episode/";
        identifier+= id;
        return identifier;
	}
}
