package com.example.demo.dao.entity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
@Data
@EqualsAndHashCode
@Entity
@Table (name="friends_sw")
@IdClass(FriendshipId.class)
public class Friendship implements Serializable{
private static final long serialVersionUID = 1L;

	@Id
	@Column(name="id")
	private String id;

	@Id
	@Column(name="fid")
	private String fid;

	@ManyToOne
	@JoinColumn(name="id", insertable=false, updatable=false)
	private Character character;

	public String getIdentifier(){
		String identifier = "http://starwars.mappingpedia.linkeddata.es/friends/";
		identifier+= id + "/" + fid;
		return identifier;
	}
	public String getCharid(){
		return id;
	}
	public String getFriendId(){
		return fid;
	}
}
