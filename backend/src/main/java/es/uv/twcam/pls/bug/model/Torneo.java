package es.uv.twcam.pls.bug.model;

public class Torneo {

	private String id;
	private String name;
	private String sede;
//	TODO adicionar fecha de la partida
//	private Date fecha;
//	TODO tabla de resultados
//	private String resultado;



	public String getId() {
		return id;
	}

	/**
	 * @param the id
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param nombre the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @param the location
	 */
	public String getSede() {
		return sede;
	}

	/**
	 * @param sede nombre de la sede
	 */
	public void setSede(String sede) {
		this.sede = sede;
	}

}
