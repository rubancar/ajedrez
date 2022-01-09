package es.uv.twcam.pls.bug.model;

public class Partida {

	private String id;
	private String sede;
//	TODO adicionar fecha de la partida
//	private Date fecha;
	private String torneo_id;
	private Jugador jugador1;
	private Jugador jugador2;
	// tablas = -1 || id del ganador
	private String resultado;

	public Partida(String id,
			String sede,
//			Date fecha,
			String torneo_id,
			Jugador jugador1,
			Jugador jugador2,
			String resultado) {
		this.id = id;
		this.sede = sede;
		this.torneo_id = torneo_id;
		this.jugador1 = jugador1;
		this.jugador2 = jugador2;
		this.resultado = resultado;
	}

	public String getTorneo_id() {
		return torneo_id;
	}

	public void setTorneo_id(String torneo_id) {
		this.torneo_id = torneo_id;
	}

	public Jugador getJugador1() {
		return jugador1;
	}

	public void setJugador1(Jugador jugador1) {
		this.jugador1 = jugador1;
	}

	public Jugador getJugador2() {
		return jugador2;
	}

	public void setJugador2(Jugador jugador2) {
		this.jugador2 = jugador2;
	}

	public String getResultado() {
		return resultado;
	}

	public void setResultado(String resultado) {
		this.resultado = resultado;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getSede() {
		return sede;
	}

	public void setSede(String sede) {
		this.sede = sede;
	}

}