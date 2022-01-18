package es.uv.twcam.pls.ajedrez.model;

public class BugNotExistException extends BugException {

	private static final long serialVersionUID = 1L;

	public BugNotExistException(String id) {
		super("El bug "+id+" no existe");
	}

}
