package es.uv.twcam.pls.ajedrez.model;

public class Club {
	
	private String id;
	private String nombre;
	private String direccion;
	private String entrenador_id;
	private String federacion_id;
	
	public Club() {
		super();
	}
	
	public Club(String id){
		super();
		this.id = id;
	}
	
	public Club(String nombre, String direccion, String federacionId) {
		super();
		this.nombre = nombre;
		this.direccion = direccion;
		this.federacion_id = federacionId;
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
	public String getFederacionId() {
		return federacion_id;
	}
	public void setFederacionId(String federacion_id) {
		this.federacion_id = federacion_id;
	}

	public String getEntrenador_id() {
		return entrenador_id;
	}

	public void setEntrenador_id(String entrenador_id) {
		this.entrenador_id = entrenador_id;
	}
	
	
	
	

}
