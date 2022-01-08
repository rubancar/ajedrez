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
import es.uv.twcam.pls.bug.model.Federacion;
import es.uv.twcam.pls.bug.model.FederacionFactory;
import es.uv.twcam.pls.bug.model.ValidationException;

/**
 * Servlet implementation class FederacionEndpoint
 */
@WebServlet("/api/federacion/")
public class FederacionEndpoint extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private Gson g;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public FederacionEndpoint() {
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

		String id = EndpointUtils.getRequestId(request, "IdFederacoin");

		System.out.println("GET at:" + request.getContextPath() + " with ID: " + id); // <7>

		if (id == null) {
			List<Federacion> federaciones = FederacionFactory.getInstance().listAll();
			result = g.toJson(federaciones);
		} else {
			Federacion federacion = FederacionFactory.getInstance().find(id);
			if (federacion != null)
				result = g.toJson(federacion);
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

			Federacion federacion = getFederacionFromInputStream(request.getInputStream());
			federacion = FederacionFactory.getInstance().create(federacion);

			StringBuffer msg = new StringBuffer();
			msg.append("POST at:").append(request.getContextPath()).append(" with " + federacion);
			System.out.println(msg.toString()); // <7>

			EndpointUtils.addSecurityHeaders(response); // <2>

			PrintWriter pw = response.getWriter();
			response.setContentType("Application/JSON");
			pw.println(g.toJson(federacion));
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

		Federacion federacion = null;

		try {

			federacion = getFederacionFromRequest(request);
			federacion = FederacionFactory.getInstance().update(federacion);

			StringBuffer msg = new StringBuffer();
			msg.append("PUT at:").append(request.getContextPath()).append(" with " + federacion);
			System.out.println(msg.toString()); // <7>

			EndpointUtils.addSecurityHeaders(response); // <2>

			PrintWriter pw = response.getWriter();
			pw.println(g.toJson(federacion));
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

			String id = EndpointUtils.getRequestId(request, "IdFederacion");
			FederacionFactory.getInstance().delete(id);

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

	private Federacion getFederacionFromInputStream(InputStream stream) throws Exception { // <4>

		Federacion federacion = null;
		federacion = g.fromJson(new InputStreamReader(stream), Federacion.class);

		if (federacion.getId() == null || federacion.getNombre() == null || federacion.getDireccion() == null) {
			System.out.println("Error validando datos de la federacion!!");
			throw new ValidationException("Error en datos de federacion");
		}

		return federacion;
	}

	private Federacion getFederacionFromRequest(HttpServletRequest request) { // <6>

		Federacion federacion = null;
		String id = EndpointUtils.getRequestId(request, "IdFederacion");

		try {

			federacion = getFederacionFromInputStream(request.getInputStream());
			federacion.setId(id);

		} catch (Exception e) {
			federacion = null;
			e.printStackTrace();
		}

		return federacion;
	}
}
