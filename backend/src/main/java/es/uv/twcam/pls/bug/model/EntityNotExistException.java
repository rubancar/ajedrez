package es.uv.twcam.pls.bug.model;

public class EntityNotExistException extends Exception {
	
	private static final long serialVersionUID = 1L;
	
	public EntityNotExistException(String msg) {
		super(msg);
	}

}
