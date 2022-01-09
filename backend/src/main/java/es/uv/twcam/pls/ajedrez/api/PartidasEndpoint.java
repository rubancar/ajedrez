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

import es.uv.twcam.pls.bug.model.Partida;
import es.uv.twcam.pls.bug.model.PartidaFactory;
import es.uv.twcam.pls.bug.model.ValidationException;

/**
 * Servlet implementation class PartidasEndpoint
 */
@WebServlet("/api/partidas/*")
public class PartidasEndpoint extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private Gson g;
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public PartidasEndpoint() {
        super();
		g = new GsonBuilder().setDateFormat("MM/dd/yyyy HH:mm:ss").create();
		System.out.println("Partidas EndPoint creado");
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String result = null;

		String id = EndpointUtils.getRequestId(request, "IdPartida");

		System.out.println("GET at:" + request.getContextPath() + " with ID: " + id); // <7>

		if (id == null) {
			List<Partida> partidas = PartidaFactory.getInstance().listAll();
			result = g.toJson(partidas);
		} else {
			System.out.println("doing get, partida: " + id);
			Partida partida = PartidaFactory.getInstance().find(id);
			if (partida != null)
				result = g.toJson(partida);
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
			
			System.out.println("entering post");
			
			Partida partida = getPartidaFromInputStream(request.getInputStream());
			partida = PartidaFactory.getInstance().create(partida);

			StringBuffer msg = new StringBuffer();
			msg.append("POST at:").append(request.getContextPath()).append(" with " + partida);
			System.out.println(msg.toString()); // <7>

			EndpointUtils.addSecurityHeaders(response); // <2>

			PrintWriter pw = response.getWriter();
			response.setStatus(HttpServletResponse.SC_CREATED);
			response.setContentType("Application/JSON");
			pw.println(g.toJson(partida));
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

		Partida partida = null;

		try {

			partida = getPartidaFromRequest(request);
			partida = PartidaFactory.getInstance().update(partida);

			StringBuffer msg = new StringBuffer();
			msg.append("PUT at:").append(request.getContextPath()).append(" with " + partida);
			System.out.println(msg.toString()); // <7>

			EndpointUtils.addSecurityHeaders(response); // <2>

			PrintWriter pw = response.getWriter();
			pw.println(g.toJson(partida));
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

			String id = EndpointUtils.getRequestId(request, "IdPartida");
			PartidaFactory.getInstance().delete(id);

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

	private Partida getPartidaFromInputStream(InputStream stream) throws Exception { // <4>

		Partida partida = null;
		partida = g.fromJson(new InputStreamReader(stream), Partida.class);
		System.out.println("from inputstream, partida: " + partida.getId());
		System.out.println("from inputstream, sede: " + partida.getSede());

		if (partida.getSede() == null || partida.getJugador1() == null || partida.getJugador2() == null) {
			System.out.println("Error validando datos de partida!!");
			throw new ValidationException("Error en datos de partida");
		}

		return partida;
	}

	private Partida getPartidaFromRequest(HttpServletRequest request) { // <6>

		Partida partida = null;
		String id = EndpointUtils.getRequestId(request, "IdPartida");

		try {

			partida = getPartidaFromInputStream(request.getInputStream());
			partida.setId(id);


		} catch (Exception e) {
			partida = null;
			e.printStackTrace();
		}

		return partida;
	}

}