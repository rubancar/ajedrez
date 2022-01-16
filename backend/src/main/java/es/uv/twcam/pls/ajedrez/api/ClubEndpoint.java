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

import es.uv.twcam.pls.bug.model.Club;
import es.uv.twcam.pls.bug.model.ClubFactory;
import es.uv.twcam.pls.bug.model.Entrenador;
import es.uv.twcam.pls.bug.model.EntrenadorFactory;
import es.uv.twcam.pls.bug.model.ValidationException;

/**
 * Servlet implementation class ClubEndpoint
 */
@WebServlet("/api/club/*")
public class ClubEndpoint extends HttpServlet {
	private static final long serialVersionUID = 1L;
      
	private Gson g;
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ClubEndpoint() {
        super();
        g = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();;
		System.out.println("CLub EndPoint creado");
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String result = null;
		
		String id = getClubId(request);
		
		System.out.println("GET at:"+request.getContextPath()+" with ID: "+id); // <7>
		
		if (id==null) {
			List<Club> clubes = ClubFactory.getInstance().listAll();
			result = g.toJson(clubes);
		} else {
			Club club = ClubFactory.getInstance().find(id);
			if (club!=null)
				result = g.toJson(club);
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
			
			Club club = getClubFromInputStream(request.getInputStream());
			club = ClubFactory.getInstance().create(club);
			StringBuffer msg = new StringBuffer();

			msg.append("POST at:").append(request.getContextPath()).append(" with "+club);

			System.out.println(msg.toString()); // <7>

			EndpointUtils.addSecurityHeaders(response); // <2>

			PrintWriter pw = response.getWriter();
			response.setContentType("Application/JSON");
			pw.println(g.toJson(club));
			pw.flush();
			pw.close();
			
		} catch (ValidationException|JsonSyntaxException e) {
			e.printStackTrace();
			PrintWriter pw = response.getWriter();
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			response.setContentType("Application/JSON");
			pw.println("{\"mensaje\":\"Error validando campos de Club\"}");
			pw.flush();
			pw.close();
		} catch (Exception e) {
			// TO-DO: Devolver el código HTTP adecuado
			e.printStackTrace();
		} 
		
	}
	
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		Club club = null;
		
		try {
			club = getClubFromRequest(request);
			club = ClubFactory.getInstance().update(club);
			StringBuffer msg = new StringBuffer();
			msg.append("PUT at:").append(request.getContextPath()).append(" with "+club);
			System.out.println(msg.toString()); 
			EndpointUtils.addSecurityHeaders(response);
			PrintWriter pw = response.getWriter();
			response.setContentType("Application/JSON");
			pw.println(g.toJson(club)); 
			pw.flush();
			pw.close();
			
		} catch (Exception e) {
			// TO-DO: Devolver el código HTTP adecuado
			e.printStackTrace();
			PrintWriter pw = response.getWriter();
			response.setContentType("Application/JSON");
			pw.println("{\"mensaje\":\"Error actualizando club\"}");
			pw.flush();
			pw.close();
		}
				
	}
	
	private String getClubId(HttpServletRequest request) {  // <5>
		
		String url = request.getRequestURL().toString();
		int pos = url.lastIndexOf("/");
		String id = url.substring(pos+1);
		System.out.println("IDclub: "+id);
		
		if (id.trim().isEmpty()) {
			id = null;
		}
		
		return id;
	}
	
	
	private Club getClubFromRequest(HttpServletRequest request) {  // <6>

		Club club = null;
		
		String id = getClubId(request);

		try {

			club = getClubFromInputStream(request.getInputStream());
			club.setId(id);

		} catch (Exception e) {
			club = null;
			e.printStackTrace();
		}

		return club;

	}
	
	private Club getClubFromInputStream(InputStream stream) throws Exception { // <4>

		Club club = null;
		club = g.fromJson(new InputStreamReader(stream), Club.class);
		System.out.println(club.getNombre());
		System.out.println(club.getDireccion());
		System.out.println(club.getEntrenador_id());
		
		if(club.getNombre() == null || club.getDireccion() == null) {
			System.out.println("Error validando datos de club!!");
			throw new ValidationException("Error en datos de club"); 
		}
		
		if(club.getEntrenador_id() != null) {
			Entrenador entrenador = EntrenadorFactory.getInstance().find(club.getEntrenador_id());
			System.out.println("Registrando entrenador a club!!");
			//club.setEntrenador(entrenador);
			club.setEntrenador_id(entrenador.getId());
		}


		return club;

	}

}
