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
import es.uv.twcam.pls.bug.model.Jugador;
import es.uv.twcam.pls.bug.model.JugadorFactory;

/**
 * Servlet implementation class JugadorEndpoint
 */
@WebServlet("/api/jugador/")
public class JugadorEndpoint extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	/**
	 * Gson parser
	 */
	private Gson g;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public JugadorEndpoint() {
        super();
        g = new GsonBuilder().create();
		System.out.println("Jugador EndPoint creado");
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String result = null;
		
		String id = getJugadorId(request);
		
		System.out.println("GET at:"+request.getContextPath()+" with ID: "+id); // <7>
		
		if (id==null) {
			List<Jugador> jugadores = JugadorFactory.getInstance().listAll();
			result = g.toJson(jugadores);
		} else {
			Jugador jugador = JugadorFactory.getInstance().find(id);
			if (jugador!=null)
				result = g.toJson(jugador);
		}

		if (result!=null) {
			EndpointUtils.addSecurityHeaders(response); // <2>
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
		// TODO Auto-generated method stub
	try {
			
			Jugador jugador = getJugadorFromInputStream(request.getInputStream());

			jugador = JugadorFactory.getInstance().create(jugador);


			StringBuffer msg = new StringBuffer();

			msg.append("POST at:").append(request.getContextPath()).append(" with "+jugador);

			System.out.println(msg.toString()); // <7>

			EndpointUtils.addSecurityHeaders(response); // <2>

			PrintWriter pw = response.getWriter();
			pw.println(g.toJson(jugador));
			pw.flush();
			pw.close();
			
		} catch (Exception e) {
			// TO-DO: Devolver el código HTTP adecuado
			e.printStackTrace();
		}
	}
	
	
	private String getJugadorId(HttpServletRequest request) {  // <5>
		
		String url = request.getRequestURL().toString();
		int pos = url.lastIndexOf("/");
		String id = url.substring(pos+1);
		System.out.println("IDjugador: "+id);// <7>
		
		if (id.trim().isEmpty()) {
			id = null;
		}
		
		return id;
	}
	
	private Jugador getJugadorFromInputStream(InputStream stream) { // <4>

		Jugador jugador = null;

		try {

			jugador = g.fromJson(new InputStreamReader(stream), Jugador.class);


		} catch (Exception e) {
			jugador = null;
			System.out.println(e.toString());
			e.printStackTrace();
		}

		return jugador;

	}

}
