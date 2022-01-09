package es.uv.twcam.pls.bug.model;

import java.util.Date;

public class Jugador extends Usuario {
	
	/**
	 * Identificador
	 */
	private Integer elo;
	private String responsable;
	private Boolean es_moroso;
	private Date fecha_nacimiento;
	private Club club;
	private String club_id;
	
	
	public Jugador() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Jugador(String name, String password, String usuario, Integer elo, String responsable, Boolean es_moroso, Date fecha_nacimiento, Club club) {
		super(name, password, usuario);
		this.elo = elo;
		this.responsable = responsable;
		this.es_moroso = es_moroso;
		this.fecha_nacimiento = fecha_nacimiento;
		this.club = club;
	}
	
	public Club getClub() {
		return club;
	}
	public void setClub(Club club) {
		this.club = club;
	}
	public String getClub_id() {
		return club_id;
	}
	public void setClub_id(String club_id) {
		this.club_id = club_id;
	}
	public Integer getElo() {
		return elo;
	}
	
	public void setElo(Integer elo) {
		this.elo = elo;
	}
	
	public String getResponsable() {
		return responsable;
	}
	
	public void setResponsable(String responsable) {
		this.responsable = responsable;
	}
	
	public Boolean getEs_moroso() {
		return es_moroso;
	}
	
	public void setEs_moroso(Boolean es_moroso) {
		this.es_moroso = es_moroso;
	}
	
	public Date getFecha_nacimiento() {
		return fecha_nacimiento;
	}
	
	public void setFecha_nacimiento(Date fecha_nacimiento) {
		this.fecha_nacimiento = fecha_nacimiento;
	} 
	
	
	
	

}
