package es.uv.twcam.pls.bug.api;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import es.uv.twcam.pls.bug.model.Bug;
import es.uv.twcam.pls.bug.model.BugFactory;

/**
 * Servlet implementation of the BugEndpoint
 * 
 * @author <a href="mailto:raul.penya@uv.es">Ra&uacute;l Pe&ntilde;a-Ortiz</a>
 */
@WebServlet("/api/bug/*") // <1>
public class BugEndpoint extends HttpServlet {
	
	private static final long serialVersionUID = 1L;

	/**
	 * Gson parser
	 */
	private Gson g;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public BugEndpoint() {
		super();
		g = new GsonBuilder().create();
		System.out.println("Bug EndPoint creado"); // <7>
	}
	
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		// TO-DO: Optimizar código
		
		String result = null;
		
		String id = getBugId(request);
		
		System.out.println("GET at:"+request.getContextPath()+" with ID: "+id); // <7>
		
		if (id==null) {
			List<Bug> bugs = BugFactory.getInstance().listAll();
			result = g.toJson(bugs);
		} else {
			Bug bug = BugFactory.getInstance().find(id);
			if (bug!=null)
				result = g.toJson(bug);
		}

		if (result!=null) {
			addSecurityHeaders(response); // <2>
			PrintWriter pw = response.getWriter();
			pw.println(result);
			pw.flush();
			pw.close();
		} else {
			response.setStatus(HttpServletResponse.SC_NOT_FOUND); // <3>
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {		
		
		// TO-DO: Optimizar código
		
		try {
			
			Bug bug = getBugFromInputStream(request.getInputStream());

			bug = BugFactory.getInstance().create(bug);


			StringBuffer msg = new StringBuffer();

			msg.append("POST at:").append(request.getContextPath()).append(" with "+bug);

			System.out.println(msg.toString()); // <7>

			addSecurityHeaders(response); // <2>

			PrintWriter pw = response.getWriter();
			pw.println(g.toJson(bug));
			pw.flush();
			pw.close();
			
		} catch (Exception e) {
			// TO-DO: Devolver el código HTTP adecuado
			e.printStackTrace();
		}
	}

	/**
	 * @see HttpServlet#doPut(HttpServletRequest, HttpServletResponse)
	 */
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		// TO-DO: Optimizar código
		
		Bug bug = null;
		
		try {

			bug = getBugFromRequest(request);
			
			bug = BugFactory.getInstance().update(bug);
			
			StringBuffer msg = new StringBuffer();

			msg.append("PUT at:").append(request.getContextPath()).append(" with "+bug);

			System.out.println(msg.toString()); // <7>

			addSecurityHeaders(response); // <2>

			//response.getWriter().append(msg.toString());

			PrintWriter pw = response.getWriter();
			pw.println(g.toJson(bug));
			pw.flush();
			pw.close();
			

		} catch (Exception e) {
			// TO-DO: Devolver el código HTTP adecuado
			e.printStackTrace();
		}
		
	}

	/**
	 * @see HttpServlet#doDelete(HttpServletRequest, HttpServletResponse)
	 */
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		// TO-DO: Optimizar código
		
		try {

			String id = getBugId(request);
			
			BugFactory.getInstance().delete(id);
			
			StringBuffer msg = new StringBuffer();

			msg.append("DELETE at:").append(request.getContextPath()).append(" with id="+id);

			System.out.println(msg.toString()); // <7>

			addSecurityHeaders(response); // <2>

			PrintWriter pw = response.getWriter();
			pw.flush();
			pw.close();
			

		} catch (Exception e) {
			// TO-DO: Devolver el código HTTP adecuado
			e.printStackTrace();
		}
	}
	
	@Override
	protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		addSecurityHeaders(response); // <2>

		super.doOptions(request, response);
	}

	/**
	 * Obtiene el Bug de un stream JSON
	 * @param stream Stream JSON
	 * @return Bug
	 */
	private Bug getBugFromInputStream(InputStream stream) { // <4>

		Bug bug = null;

		try {

			bug = g.fromJson(new InputStreamReader(stream), Bug.class);


		} catch (Exception e) {
			bug = null;
			e.printStackTrace();
		}

		return bug;

	}
	
	/**
	 * Obtiene el identificador de un Bug como parte de la URL de la petición HTTP.
	 * @param request Petición HTTP
	 * @return Identificador del Bug
	 */
	private String getBugId(HttpServletRequest request) {  // <5>
		
		String url = request.getRequestURL().toString();
		
		int pos = url.lastIndexOf("/");
		
		String id = url.substring(pos+1);
		
		System.out.println("ID: "+id);// <7>
		
		if (id.trim().isEmpty()) {
			id = null;
		}
		
		return id;
	}
	
	/**
	 * Obtiene el Bug desde la petición HTTP localizando el identificador como parte de la URL.
	 * @param request Petición HTTP
	 * @return Bug
	 */
	private Bug getBugFromRequest(HttpServletRequest request) {  // <6>

		Bug bug = null;
		
		String id = getBugId(request);
		
		
		try {

			bug = getBugFromInputStream(request.getInputStream());
			bug.setId(id);

		} catch (Exception e) {
			bug = null;
			e.printStackTrace();
		}

		return bug;

	}

	/**
	 * Añade las cabeceras necesarias para poder invocaar el API REST desde Angular
	 * @param response Repuesta HTTP a la que añadir cabeceras
	 */
	private void addSecurityHeaders(HttpServletResponse response) { // <2>
		response.addHeader("Access-Control-Allow-Origin", "*");
		response.addHeader("Access-Control-Allow-Methods", 
						   "POST, GET, OPTIONS, PUT, DELETE, HEAD");
		response.addHeader("Access-Control-Allow-Headers", 
						   "X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept");
		response.addHeader("Access-Control-Max-Age", "1728000");
	}

}
