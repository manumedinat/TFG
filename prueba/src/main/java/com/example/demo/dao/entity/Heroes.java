package com.example.demo.dao.entity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
@Data
@EqualsAndHashCode
@Entity
@Table (name="heroes_SW")
public class Heroes implements Serializable{
private static final long serialVersionUID = 1L;
	@Id
	@Column(name="episodeid")
	private String episodeid;

	@ManyToOne
	@JoinColumn(name="episodeid", insertable = false, updatable = false)
	private Episode episode;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="charid")
	private Character charid;

	public String getIdentifier(){
        String identifier= "http://starwars.mappingpedia.linkeddata.es/heroes/";
        identifier+= episode.getId() + "/" + charid.getId() ;
        return identifier;
	}
	
}
