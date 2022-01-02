package es.uv.twcam.pls.bug.model;

public class IncorrectBugException extends BugException {

	public IncorrectBugException(String bug) {
		super(bug+" con formato erróneo");
	}

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

}
