package es.uv.twcam.pls.bug.model;

import java.util.ArrayList;

public class Entrenador {

	private String id;
	private String nombre;
	private ArrayList<EntrenamientosDia> calendarioEntrenamientos;

	public Entrenador() {
		super();
	}

	public Entrenador(String nombre, ArrayList<EntrenamientosDia> calendarioEntrenamientos) {
		super();
		this.nombre = nombre;
		this.calendarioEntrenamientos = calendarioEntrenamientos;
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

	public ArrayList<EntrenamientosDia> getCalendarioEntrenamientos() {
		return calendarioEntrenamientos;
	}

	public void setCalendarioEntrenamientos(ArrayList<EntrenamientosDia> calendarioEntrenamientos) {
		this.calendarioEntrenamientos = calendarioEntrenamientos;
	}

	public boolean isEntrenamientosOk() {
		boolean isOk = true;

		if (this.calendarioEntrenamientos != null) {
			for (EntrenamientosDia entrenamiento : this.calendarioEntrenamientos) {
				if (!entrenamiento.isEntramientosOK()) {
					isOk = false;
					break;
				}
			}
		}

		return isOk;
	}
}
