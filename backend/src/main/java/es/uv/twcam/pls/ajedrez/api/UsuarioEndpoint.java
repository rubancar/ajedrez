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

import es.uv.twcam.pls.bug.model.Usuario;
import es.uv.twcam.pls.bug.model.UsuarioFactory;
import es.uv.twcam.pls.bug.model.ValidationException;

/**
 * Servlet implementation class UsuarioEndpoint
 */
@WebServlet("/api/usuario/*")
public class UsuarioEndpoint extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private Gson g;   
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UsuarioEndpoint() {
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

		String userName = EndpointUtils.getRequestId(request, "IdUsuario");

		System.out.println("GET at:" + request.getContextPath() + " with userName: " + userName); // <7>

		if (userName == null) {
			List<Usuario> usuarios = UsuarioFactory.getInstance().listAll();
			result = g.toJson(usuarios);
		} else {
			Usuario usuario = UsuarioFactory.getInstance().find(userName);
			if (usuario != null)
				result = g.toJson(usuario);
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

			Usuario usuario = getUsuarioFromInputStream(request.getInputStream());
			usuario = UsuarioFactory.getInstance().create(usuario);

			StringBuffer msg = new StringBuffer();
			msg.append("POST at:").append(request.getContextPath()).append(" with " + usuario);
			System.out.println(msg.toString()); // <7>

			EndpointUtils.addSecurityHeaders(response); // <2>

			PrintWriter pw = response.getWriter();
			response.setContentType("Application/JSON");
			pw.println(g.toJson(usuario));
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
	
	private Usuario getUsuarioFromInputStream(InputStream stream) throws Exception { // <4>

		Usuario usuario = null;
		usuario = g.fromJson(new InputStreamReader(stream), Usuario.class);

		if (usuario.getName() == null || usuario.getPassword() == null || usuario.getUsuario() == null || usuario.getRol() == null) {
			System.out.println("Error validando datos de la usuario!!");
			throw new ValidationException("Error en datos de usuario:" + usuario.toString());
		}

		return usuario;
	}

}
