package es.uv.twcam.pls.bug.model;

public class Usuario {
	
	private String id;
	private String name;
	private String password;
	private String usuario;
	private String rol;
	
	
	public Usuario(String id, String name, String password, String usuario, String rol) {
		super();
		this.id = id;
		this.name = name;
		this.password = password;
		this.usuario = usuario;
		this.rol = rol;
	}
	
	public Usuario() {
		super();
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getUsuario() {
		return usuario;
	}
	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}
	public String getRol() {
		return rol;
	}

	public void setRol(String rol) {
		this.rol = rol;
	}

	
}
