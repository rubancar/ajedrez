package es.uv.twcam.pls.bug.model;

import java.util.Date;

public class Entrenamiento {
	private Date fecha;
	private int franjaHoraria; // del 1 al 12 (franjas diarias de 2 horas)
	private Jugador jugador1;
	private Jugador jugador2;
	private Club club;
	
	
	public Entrenamiento() {
		super();
	}

	public Entrenamiento(Date fecha, int franjaHoraria, Jugador jugador1, Club club) {
		super();
		this.fecha = fecha;
		this.franjaHoraria = franjaHoraria;
		this.jugador1 = jugador1;
		this.club = club;
	}
	
	public boolean IsEntrenamientoOk() {
		
		boolean valuesOk = this.fecha != null && this.franjaHoraria >= 0 && this.franjaHoraria <= 12 && this.jugador1 != null && this.club != null;
		// TODO CON OTRO BOOLEANO COMPROBAR QUE SI EXISTE JUGADOR 2 SEAN DEL MISMO CLUB
		
		return valuesOk ;
	}
	
	public Date getFecha() {
		return fecha;
	}
	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}
	public int getFranjaHoraria() {
		return franjaHoraria;
	}
	public void setFranjaHoraria(int franjaHoraria) {
		this.franjaHoraria = franjaHoraria;
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
