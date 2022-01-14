package es.uv.twcam.pls.bug.model;

import java.util.ArrayList;

public class Torneo {

	private String id;
	private String name;
	private String sede;
//	private ArrayList<Jugador> jugadores;
	private ArrayList<String> jugadores;
	private ArrayList<Partida> partidas;
	

	public Torneo(String id, String name, String sede, ArrayList<String> jugadores, ArrayList<Partida> partidas) {
		super();
		this.id = id;
		this.name = name;
		this.sede = sede;
		this.jugadores = jugadores;
		this.partidas = partidas;
	}

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

	/**
	 * @return the jugadores
	 */
	public ArrayList<String> getJugadores() {
		return jugadores;
	}


	/**
	 * @param jugadores the jugadores to set
	 */
	public void setJugadores(ArrayList<String> jugadores) {
		this.jugadores = jugadores;
	}

	/**
	 * @return the partidas
	 */
	public ArrayList<Partida> getPartidas() {
		return partidas;
	}


	/**
	 * @param partidas the partidas to set
	 */
	public void setPartidas(ArrayList<Partida> partidas) {
		this.partidas = partidas;
	}

}
