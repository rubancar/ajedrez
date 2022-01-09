package es.uv.twcam.pls.bug.model;

public class EntrenamientosDia {
	
	private String fecha;
	private Entrenamiento entrenamiento1;
	private Entrenamiento entrenamiento2;
	private Entrenamiento entrenamiento3;
	private Entrenamiento entrenamiento4;
	
	
	
	public EntrenamientosDia(String fecha) {
		super();
		this.fecha = fecha;
	}
	public String getFecha() {
		return fecha;
	}
	public void setFecha(String fecha) {
		this.fecha = fecha;
	}
	public Entrenamiento getEntrenamiento1() {
		return entrenamiento1;
	}
	public void setEntrenamiento1(Entrenamiento entrenamiento1) {
		this.entrenamiento1 = entrenamiento1;
	}
	public Entrenamiento getEntrenamiento2() {
		return entrenamiento2;
	}
	public void setEntrenamiento2(Entrenamiento entrenamiento2) {
		this.entrenamiento2 = entrenamiento2;
	}
	public Entrenamiento getEntrenamiento3() {
		return entrenamiento3;
	}
	public void setEntrenamiento3(Entrenamiento entrenamiento3) {
		this.entrenamiento3 = entrenamiento3;
	}
	public Entrenamiento getEntrenamiento4() {
		return entrenamiento4;
	}
	public void setEntrenamiento4(Entrenamiento entrenamiento4) {
		this.entrenamiento4 = entrenamiento4;
	}
	
	public boolean isEntramientosOK() {
		return (entrenamiento1 == null || entrenamiento1.IsEntrenamientoOk()) 
				&& (entrenamiento2 == null || entrenamiento2.IsEntrenamientoOk())
				&& (entrenamiento3 == null || entrenamiento3.IsEntrenamientoOk())
				&& (entrenamiento4 == null || entrenamiento4.IsEntrenamientoOk());
	}
	
	
}
