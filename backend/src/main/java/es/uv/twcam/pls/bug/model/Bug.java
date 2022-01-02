package es.uv.twcam.pls.bug.model;

/**
 * Bug 
 * 
 * @author <a href="mailto:raul.penya@uv.es">Ra&uacute;l Pe&ntilde;a-Ortiz</a>
 *
 */
public class Bug {
	
	/**
	 * Identificador
	 */
	private String id;
	
	/**
	 * Nombre
	 */
	private String issueName;
	
	/**
	 * Mensaje
	 */
	private String issueMessage;
	
	/**
	 * Crea un Bug a partir de atributos
	 * @param id Identificador
	 * @param issueName Nombre
	 * @param issueMessage Mensaje
	 */
	public Bug(String id, String issueName, String issueMessage) {
		super();
		this.id = id;
		this.issueName = issueName;
		this.issueMessage = issueMessage;
	}
	
	/**
	 * Crea un Bug vacío
	 */
	public Bug() {
		super();	
	}
	
	/**
	 * Crea un Bug a partir del identificador
	 * @param id Identificador
	 */
	public Bug(String id) {
		super();
		this.id = id;
	}


	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getIssueName() {
		return issueName;
	}

	public void setIssueName(String issueName) {
		this.issueName = issueName;
	}

	public String getIssueMessage() {
		return issueMessage;
	}

	public void setIssueMessage(String issueMessage) {
		this.issueMessage = issueMessage;
	}	
	
	@Override
	public String toString() {
		return "Bug [id=" + id + ", issueName=" + issueName + ", issueMessage=" + issueMessage + "]";
	}

}
