package es.uv.twcam.pls.bug.model;

import java.util.Date;

public class Jugador {
	
	/**
	 * Identificador
	 */
	private String id;
	
	private String name;
	
	
	public Jugador(String id, String name, Date fechaNacimiento) {
		super();
		this.id = id;
		this.name = name;
		//this.fechaNacimiento = fechaNacimiento;
	}
	
	public Jugador() {
		super();
	}
	
	public Jugador(String id) {
		super();
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	
	
	

}
