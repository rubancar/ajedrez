package es.uv.twcam.pls.ajedrez.api;

import java.util.ArrayList;
import java.util.Date;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import es.uv.twcam.pls.bug.model.Club;
import es.uv.twcam.pls.bug.model.ClubFactory;
import es.uv.twcam.pls.bug.model.Entrenador;
import es.uv.twcam.pls.bug.model.EntrenadorFactory;
import es.uv.twcam.pls.bug.model.Entrenamiento;
import es.uv.twcam.pls.bug.model.Federacion;
import es.uv.twcam.pls.bug.model.FederacionFactory;
import es.uv.twcam.pls.bug.model.Jugador;
import es.uv.twcam.pls.bug.model.JugadorFactory;
import es.uv.twcam.pls.bug.model.Usuario;
import es.uv.twcam.pls.bug.model.UsuarioFactory;

/**
 * Application Lifecycle Listener implementation class AjedrezContextListener
 *
 */
@WebListener
public class AjedrezContextListener implements ServletContextListener {

	/**
	 * Default constructor.
	 */
	public AjedrezContextListener() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see ServletContextListener#contextDestroyed(ServletContextEvent)
	 */
	public void contextDestroyed(ServletContextEvent sce) {
		// TODO Auto-generated method stub
	}

	/**
	 * @see ServletContextListener#contextInitialized(ServletContextEvent)
	 */
	public void contextInitialized(ServletContextEvent sce) {
		System.out.println("Rellenando datos...");
		try {
			
		Usuario user1 = new Usuario("admin", "12345", "admin", "admin");
		UsuarioFactory.getInstance().create(user1);
		
		Federacion federacion1 = new Federacion("Federacion Valencia", "Campus Burjassot");
		Federacion federacion2 = new Federacion("Federacion Madrid", "Campus URJC");
		Federacion federacion3 = new Federacion("Federacion Alicante", "Calle Falsa, 123");
		FederacionFactory.getInstance().create(federacion1);
		FederacionFactory.getInstance().create(federacion2);
		FederacionFactory.getInstance().create(federacion3);
		
		
		Club club1 = new Club("Master TWCAM", "ETSE Burjassot", "Entrenador1", federacion1);
		ClubFactory.getInstance().create(club1);
		
		
		Jugador jugador1 = new Jugador("Fernando", "12345", "fer", "player", 1346, "", false, new Date(1996,7,18));
		Jugador jugador2 = new Jugador("Ruben", "12345", "ruben", "player", 1498, "", false, new Date(1999,7,18));
		Jugador jugador3 = new Jugador("Alexis", "12345", "alexis", "player", 1411, "", false, new Date(1990,7,18));
		JugadorFactory.getInstance().create(jugador1);
		JugadorFactory.getInstance().create(jugador2);
		JugadorFactory.getInstance().create(jugador3);
		
		ArrayList<Entrenamiento> entrenamientos = new ArrayList<Entrenamiento>();
		entrenamientos.add(new Entrenamiento(new Date(2022,1,9), 1, jugador1, club1));
		entrenamientos.add(new Entrenamiento(new Date(2022,1,9), 2, jugador2, club1));
		Entrenador entrenador1 = new Entrenador("Entrenador1", entrenamientos);
		EntrenadorFactory.getInstance().create(entrenador1);
		
			

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}
