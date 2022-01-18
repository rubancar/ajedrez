package es.uv.twcam.pls.ajedrez.api;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import es.uv.twcam.pls.ajedrez.model.Usuario;
import es.uv.twcam.pls.ajedrez.model.UsuarioFactory;
import es.uv.twcam.pls.ajedrez.model.ValidationException;

/**
 * Servlet implementation class LoginEndpoint
 */
@WebServlet("/api/login/*")
public class LoginEndpoint extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private Gson g;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public LoginEndpoint() {
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
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try {

			Usuario usuarioLogging = getLoginFromInputStream(request.getInputStream());
			System.out.println("POST LOGIN WITH USER " + usuarioLogging.getUsuario()); // <7>
			Usuario usuario = UsuarioFactory.getInstance().find(usuarioLogging.getUsuario());
			HttpSession session = request.getSession(true);

			EndpointUtils.addSecurityHeaders(response); // <2>

			PrintWriter pw = response.getWriter();
			response.setContentType("Application/JSON");
			
			if (usuario != null && usuario.getPassword().equals(usuarioLogging.getPassword())) {
				session.setAttribute("CurrentUser", usuario.getUsuario());
				
				pw.println(g.toJson(usuario));
			} else {
				pw.println("{\"mensaje\":\"Credenciales incorrectos\"}");
			}

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

	private Usuario getLoginFromInputStream(InputStream stream) throws Exception { // <4>

		Usuario usuario = null;
		usuario = g.fromJson(new InputStreamReader(stream), Usuario.class);

		if (usuario.getUsuario() == null || usuario.getPassword() == null || usuario.getUsuario().isBlank()
				|| usuario.getPassword().isBlank()) {
			System.out.println("Error validando datos de la usuario!!");
			throw new ValidationException("Error obteniendo los datos del usuario.");
		}

		return usuario;
	}

}
