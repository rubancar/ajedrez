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
import com.google.gson.JsonSyntaxException;

import es.uv.twcam.pls.ajedrez.model.BugFactory;
import es.uv.twcam.pls.ajedrez.model.Club;
import es.uv.twcam.pls.ajedrez.model.ClubFactory;
import es.uv.twcam.pls.ajedrez.model.EntityNotExistException;
import es.uv.twcam.pls.ajedrez.model.Jugador;
import es.uv.twcam.pls.ajedrez.model.JugadorFactory;
import es.uv.twcam.pls.ajedrez.model.ValidationException;

/**
 * Servlet implementation class JugadorEndpoint
 */
@WebServlet("/api/jugador/*")
public class JugadorEndpoint extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	/**
	 * Gson parser
	 */
	private Gson g;
	private ClubFactory clubFactory;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public JugadorEndpoint() {
        super();
        g = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
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
			response.setContentType("Application/JSON");
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
	try {
		
			Jugador jugador = getJugadorFromInputStream(request.getInputStream());
			jugador = JugadorFactory.getInstance().create(jugador);
			StringBuffer msg = new StringBuffer();

			msg.append("POST at:").append(request.getContextPath()).append(" with "+jugador);

			System.out.println(msg.toString());
			EndpointUtils.addSecurityHeaders(response);
			PrintWriter pw = response.getWriter();
			response.setContentType("Application/JSON");
			pw.println(g.toJson(jugador));
			pw.flush();
			pw.close();
			
		} catch (ValidationException|JsonSyntaxException e) {
			e.printStackTrace();
			PrintWriter pw = response.getWriter();
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			response.setContentType("Application/JSON");
			pw.println("{\"mensaje\":\"Error validando campos de Jugador\"}");
			pw.flush();
			pw.close();
		} catch (Exception e) {
			e.printStackTrace();
			response.sendError(500);
		} 
	}
	
	
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			
		Jugador jugador = null;
		
		try {
			jugador = getJugadorFromRequest(request);
			jugador = JugadorFactory.getInstance().update(jugador);
			StringBuffer msg = new StringBuffer();
			msg.append("PUT at:").append(request.getContextPath()).append(" with "+jugador);
			System.out.println(msg.toString()); 
			EndpointUtils.addSecurityHeaders(response);
			PrintWriter pw = response.getWriter();
			response.setContentType("Application/JSON");
			pw.println(g.toJson(jugador));
			pw.flush();
			pw.close();
			
		} catch (Exception e) {
			// TO-DO: Devolver el c??digo HTTP adecuado
			e.printStackTrace();
			PrintWriter pw = response.getWriter();
			response.setContentType("Application/JSON");
			pw.println("{\"mensaje\":\"Error actualizando jugador\"}");
			pw.flush();
			pw.close();
		}
				
	}
	

	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String id = "";
		try {

			id = getJugadorId(request);
			JugadorFactory.getInstance().delete(id);
			
			StringBuffer msg = new StringBuffer();
			msg.append("DELETE at:").append(request.getContextPath()).append(" with id="+id);
			System.out.println(msg.toString());
			EndpointUtils.addSecurityHeaders(response);

			PrintWriter pw = response.getWriter();
			response.setContentType("Application/JSON");
			pw.println("{\"mensaje\":\"Jugador con id "+ id +"  borrado correctamente\"}");
			pw.flush();
			pw.close();

		} catch(EntityNotExistException e) {
			
			PrintWriter pw = response.getWriter();
			response.setStatus(HttpServletResponse.SC_NOT_FOUND);
			response.setContentType("Application/JSON");
			pw.println("{\"mensaje\":\"Jugador con id "+ id +" no existe \"}");
			pw.flush();
			pw.close();
			
		} catch (Exception e) {
			e.printStackTrace();
			response.sendError(500);
		}
	}
	
	@Override
	protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		EndpointUtils.addSecurityHeaders(response);
		super.doOptions(request, response);
		
	}

	
	
	private String getJugadorId(HttpServletRequest request) {  // <5>
		
		String url = request.getRequestURL().toString();
		int pos = url.lastIndexOf("/");
		String id = url.substring(pos+1);
		System.out.println("IDjugador: "+id);
		
		if (id.trim().isEmpty()) {
			id = null;
		}
		
		return id;
	}
	
	private Jugador getJugadorFromInputStream(InputStream stream) throws Exception { // <4>

		Jugador jugador = null;
		jugador = g.fromJson(new InputStreamReader(stream), Jugador.class);
		System.out.println("Name: " + jugador.getName());
		System.out.println("Password: " +jugador.getPassword());
		System.out.println("Usuario: " +jugador.getUsuario());
		System.out.println("F. Nacimiento: " +jugador.getFecha_nacimiento());
		System.out.println("Id: " +jugador.getId());
		System.out.println("Club Id: " +jugador.getClub_id());
		if(jugador.getName() == null || jugador.getPassword() == null || jugador.getUsuario() == null 
				|| jugador.getFecha_nacimiento() == null) {
			System.out.println("Error validando datos de usuario!!");
			throw new ValidationException("Error en datos de usuario"); 
		}
		
		if(jugador.getClub_id() != null) {
			Club club = clubFactory.getInstance().find(jugador.getClub_id());
			System.out.println("Registrando club a Jugador!!");
			jugador.setClub(club);
		}

		return jugador;

	}
	
	private Jugador getJugadorFromRequest(HttpServletRequest request) {  // <6>

		Jugador jugador = null;
		
		String id = getJugadorId(request);
		
		
		try {

			jugador = getJugadorFromInputStream(request.getInputStream());
			jugador.setId(id);

		} catch (Exception e) {
			jugador = null;
			e.printStackTrace();
		}

		return jugador;

	}

}
