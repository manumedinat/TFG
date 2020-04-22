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
	@ManyToOne
	@JoinColumn(name="charid")
	private Character charid;

	@Id
	@ManyToOne
	@JoinColumn(name="episodeid")
	private Episode episodeid;
	
}
