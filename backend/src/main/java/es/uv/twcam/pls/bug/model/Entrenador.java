package es.uv.twcam.pls.bug.model;

import java.util.ArrayList;

public class Entrenador {

	private String id;
	private String nombre;
	private ArrayList<Entrenamiento> calendarioEntrenamientos;

	public Entrenador() {
		super();
	}

	public Entrenador(String id, String nombre, ArrayList<Entrenamiento> calendarioEntrenamientos) {
		super();
		this.id = id;
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

	public ArrayList<Entrenamiento> getCalendarioEntrenamientos() {
		return calendarioEntrenamientos;
	}

	public void setCalendarioEntrenamientos(ArrayList<Entrenamiento> calendarioEntrenamientos) {
		this.calendarioEntrenamientos = calendarioEntrenamientos;
	}

	public boolean isEntrenamientosOk() {
		boolean isOk = true;

		if (this.calendarioEntrenamientos != null) {
			for (Entrenamiento entrenamiento : this.calendarioEntrenamientos) {
				if (!entrenamiento.IsEntrenamientoOk()) {
					isOk = false;
					break;
				}
			}
		}

		return isOk;
	}
}
