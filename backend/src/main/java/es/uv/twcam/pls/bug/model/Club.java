package es.uv.twcam.pls.bug.model;

import com.google.gson.annotations.Expose;

public class Club {
	
	private String id;
	private String nombre;
	private String direccion;
	private String entrenador_id;
	private Federacion federacion;
	
	public Club() {
		super();
	}
	
	public Club(String id){
		super();
		this.id = id;
	}
	
	public Club(String nombre, String direccion, Federacion federacion) {
		super();
		this.nombre = nombre;
		this.direccion = direccion;
		this.federacion = federacion;
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getDireccion() {
		return direccion;
	}
	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}
	public Federacion getFederacion() {
		return federacion;
	}
	public void setFederacion(Federacion federacion) {
		this.federacion = federacion;
	}

	public String getEntrenador_id() {
		return entrenador_id;
	}

	public void setEntrenador_id(String entrenador_id) {
		this.entrenador_id = entrenador_id;
	}
	
	
	
	

}
