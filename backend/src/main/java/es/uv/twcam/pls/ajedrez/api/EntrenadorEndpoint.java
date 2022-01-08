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

import es.uv.twcam.pls.bug.model.Entrenador;
import es.uv.twcam.pls.bug.model.EntrenadorFactory;
import es.uv.twcam.pls.bug.model.ValidationException;

/**
 * Servlet implementation class EntrenadorEndpoint
 */
@WebServlet("/api/entrenador/")
public class EntrenadorEndpoint extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private Gson g;
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public EntrenadorEndpoint() {
        super();
		g = new GsonBuilder().setDateFormat("MM/dd/yyyy HH:mm:ss").create();
		System.out.println("Federacion EndPoint creado");
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String result = null;

		String id = EndpointUtils.getRequestId(request, "IdEntrenador");

		System.out.println("GET at:" + request.getContextPath() + " with ID: " + id); // <7>

		if (id == null) {
			List<Entrenador> entrenadores = EntrenadorFactory.getInstance().listAll();
			result = g.toJson(entrenadores);
		} else {
			Entrenador entrenador = EntrenadorFactory.getInstance().find(id);
			if (entrenador != null)
				result = g.toJson(entrenador);
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
			
			Entrenador entrenador = getEntrenadorFromInputStream(request.getInputStream());
			entrenador = EntrenadorFactory.getInstance().create(entrenador);

			StringBuffer msg = new StringBuffer();
			msg.append("POST at:").append(request.getContextPath()).append(" with " + entrenador);
			System.out.println(msg.toString()); // <7>

			EndpointUtils.addSecurityHeaders(response); // <2>

			PrintWriter pw = response.getWriter();
			response.setContentType("Application/JSON");
			pw.println(g.toJson(entrenador));
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

		Entrenador entrenador = null;

		try {

			entrenador = getEntrenadorFromRequest(request);
			entrenador = EntrenadorFactory.getInstance().update(entrenador);

			StringBuffer msg = new StringBuffer();
			msg.append("PUT at:").append(request.getContextPath()).append(" with " + entrenador);
			System.out.println(msg.toString()); // <7>

			EndpointUtils.addSecurityHeaders(response); // <2>

			PrintWriter pw = response.getWriter();
			pw.println(g.toJson(entrenador));
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

			String id = EndpointUtils.getRequestId(request, "IdEntrenador");
			EntrenadorFactory.getInstance().delete(id);

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

	private Entrenador getEntrenadorFromInputStream(InputStream stream) throws Exception { // <4>

		Entrenador entrenador = null;
		entrenador = g.fromJson(new InputStreamReader(stream), Entrenador.class);

		if (entrenador.getNombre() == null || !entrenador.isEntrenamientosOk()) {
			System.out.println("Error validando datos del entrenador!!");
			throw new ValidationException("Error en datos del entrenador");
		}

		return entrenador;
	}

	private Entrenador getEntrenadorFromRequest(HttpServletRequest request) { // <6>

		Entrenador entrenador = null;
		String id = EndpointUtils.getRequestId(request, "IdEntrenador");

		try {

			entrenador = getEntrenadorFromInputStream(request.getInputStream());
			entrenador.setId(id);

		} catch (Exception e) {
			entrenador = null;
			e.printStackTrace();
		}

		return entrenador;
	}

}
