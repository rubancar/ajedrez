package es.uv.twcam.pls.ajedrez.api;

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

import es.uv.twcam.pls.bug.model.Torneo;
import es.uv.twcam.pls.bug.model.TorneoFactory;
import es.uv.twcam.pls.bug.model.ValidationException;

/**
 * Servlet implementation class TorneosEndpoint
 */
@WebServlet("/api/torneos/*")
public class TorneoEndpoint extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private Gson g;
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public TorneoEndpoint() {
        super();
		g = new GsonBuilder().setDateFormat("MM/dd/yyyy HH:mm:ss").create();
		System.out.println("Torneos EndPoint creado");
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String result = null;

		String id = EndpointUtils.getRequestId(request, "IdTorneo");

		System.out.println("GET at:" + request.getContextPath() + " with ID: " + id); // <7>

		if (id == null) {
			List<Torneo> torneos = TorneoFactory.getInstance().listAll();
			result = g.toJson(torneos);
		} else {
			System.out.println("doing get, torneo: " + id);
			Torneo torneo = TorneoFactory.getInstance().find(id);
			if (torneo != null)
				result = g.toJson(torneo);
		}

		if (result != null) {
			EndpointUtils.addSecurityHeaders(response); // <2>
			PrintWriter pw = response.getWriter();
			response.setContentType("Application/JSON");
			pw.println(result);
			pw.flush();
			pw.close();
		} else {
			response.setStatus(HttpServletResponse.SC_NOT_FOUND); // <3>
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try {
			
			System.out.println("entering torneo post");
			
			Torneo torneo = getTorneoFromInputStream(request.getInputStream());
			torneo = TorneoFactory.getInstance().create(torneo);

			StringBuffer msg = new StringBuffer();
			msg.append("POST at:").append(request.getContextPath()).append(" with " + torneo);
			System.out.println(msg.toString()); // <7>

			EndpointUtils.addSecurityHeaders(response); // <2>

			PrintWriter pw = response.getWriter();
			response.setStatus(HttpServletResponse.SC_CREATED);
			response.setContentType("Application/JSON");
			pw.println(g.toJson(torneo));
			pw.flush();
			pw.close();

		} catch (Exception e) {
			e.printStackTrace();
			PrintWriter pw = response.getWriter();
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			response.setContentType("Application/JSON");

			pw.println("{\"mensaje\":\"" + e.getMessage() + "\"}");
			pw.flush();
			pw.close();
		}
	}

	protected void doPut(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		Torneo torneo = null;

		try {

			torneo = getTorneoFromRequest(request);
			torneo = TorneoFactory.getInstance().update(torneo);

			StringBuffer msg = new StringBuffer();
			msg.append("PUT at:").append(request.getContextPath()).append(" with " + torneo);
			System.out.println(msg.toString()); // <7>

			EndpointUtils.addSecurityHeaders(response); // <2>

			PrintWriter pw = response.getWriter();
			pw.println(g.toJson(torneo));
			pw.flush();
			pw.close();

		} catch (Exception e) {
			e.printStackTrace();
			PrintWriter pw = response.getWriter();
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			response.setContentType("Application/JSON");

			pw.println("{\"mensaje\":\"" + e.getMessage() + "\"}");
			pw.flush();
			pw.close();
		}
	}

	/**
	 * @see HttpServlet#doDelete(HttpServletRequest, HttpServletResponse)
	 */
	protected void doDelete(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		try {

			String id = EndpointUtils.getRequestId(request, "IdTorneo");
			TorneoFactory.getInstance().delete(id);

			StringBuffer msg = new StringBuffer();
			msg.append("DELETE at:").append(request.getContextPath()).append(" with id=" + id);
			System.out.println(msg.toString()); // <7>

			EndpointUtils.addSecurityHeaders(response); // <2>

			PrintWriter pw = response.getWriter();
			pw.flush();
			pw.close();

		} catch (Exception e) {
			e.printStackTrace();
			PrintWriter pw = response.getWriter();
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			response.setContentType("Application/JSON");

			pw.println("{\"mensaje\":\"" + e.getMessage() + "\"}");
			pw.flush();
			pw.close();
		}
	}

	private Torneo getTorneoFromInputStream(InputStream stream) throws Exception { // <4>

		Torneo torneo = null;
			
		torneo = g.fromJson(new InputStreamReader(stream), Torneo.class);
		
		System.out.println("from inputstream, torneo: " + torneo.getName());
		System.out.println("from inputstream, sede: " + torneo.getSede());

		if (torneo.getSede() == null || torneo.getName() == null) {
			System.out.println("Error validando datos de torneo!!");
			throw new ValidationException("Error en datos de torneo");
		}

		return torneo;
	}

	private Torneo getTorneoFromRequest(HttpServletRequest request) { // <6>

		Torneo torneo = null;
		String id = EndpointUtils.getRequestId(request, "IdTorneo");

		try {

			torneo = getTorneoFromInputStream(request.getInputStream());
			torneo.setId(id);


		} catch (Exception e) {
			torneo = null;
			e.printStackTrace();
		}

		return torneo;
	}

}
