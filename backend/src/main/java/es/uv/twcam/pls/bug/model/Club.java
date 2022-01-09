package es.uv.twcam.pls.bug.model;

public class Club {
	
	private String id;
	private String nombre;
	private String direccion;
	private String usuario_entrenador;
	private Federacion federacion;
	
	public Club() {
		super();
	}
	
	public Club(String id){
		super();
		this.id = id;
	}
	
	public Club(String nombre, String direccion, String usuario_entrenador, Federacion federacion) {
		super();
		this.nombre = nombre;
		this.direccion = direccion;
		this.usuario_entrenador = usuario_entrenador;
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
	public String getUsuario_entrenador() {
		return usuario_entrenador;
	}
	public void setUsuario_entrenador(String usuario_entrenador) {
		this.usuario_entrenador = usuario_entrenador;
	}
	public Federacion getFederacion() {
		return federacion;
	}
	public void setFederacion(Federacion federacion) {
		this.federacion = federacion;
	}
	
	

}
