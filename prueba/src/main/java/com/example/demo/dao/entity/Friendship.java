package com.example.demo.dao.entity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
@Data
@EqualsAndHashCode
@Entity
@Table (name="friendship_SW")
@IdClass(FriendshipId.class)
public class Friendship implements Serializable{
private static final long serialVersionUID = 1L;
	@Id
	@ManyToOne
	@JoinColumn(name="id")
	private Character id;

	@Id
	@ManyToOne
	@JoinColumn(name="fid")
	private Character fid;
	//@Column(name="fid")
	//private String fid;

	/*@OneToMany(mappedBy="id")
	private List <Character> character;
	*/
	public String getIdentifier(){
        String identifier= "http://starwars.mappingpedia.linkeddata.es/friends/";
        identifier+= id.getId() + "/" + fid.getId() ;
        return identifier;
	}

}
