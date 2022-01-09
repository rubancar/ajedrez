package es.uv.twcam.pls.bug.model;

import java.util.Date;

public class Entrenamiento {
	private Jugador jugador1;
	private Jugador jugador2;
	private Club club;
	
	
	public Entrenamiento() {
		super();
	}

	public Entrenamiento(Jugador jugador1, Club club) {
		super();
		this.jugador1 = jugador1;
		this.club = club;
	}
	
	public boolean IsEntrenamientoOk() {
		
		boolean valuesOk =  this.jugador1 != null && this.club != null;
		// TODO CON OTRO BOOLEANO COMPROBAR QUE SI EXISTE JUGADOR 2 SEAN DEL MISMO CLUB
		
		return valuesOk ;
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

	public Club getClub() {
		return club;
	}

	public void setClub(Club club) {
		this.club = club;
	}

}
