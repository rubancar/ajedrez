package es.uv.twcam.pls.ajedrez.model;

import com.google.gson.annotations.Expose;

public class Federacion {

	@Expose
	private String id;
	@Expose
	private String nombre;
	@Expose
	private String direccion;

	public Federacion() {
		super();
	}

	public Federacion(String nombre, String direccion) {
		super();
		this.nombre = nombre;
		this.direccion = direccion;
	}

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getNombre() {
		return this.nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getDireccion() {
		return this.direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

}