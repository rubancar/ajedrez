package es.uv.twcam.pls.ajedrez.api;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.UUID;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import es.uv.twcam.pls.bug.model.Club;
import es.uv.twcam.pls.bug.model.ClubFactory;
import es.uv.twcam.pls.bug.model.Entrenador;
import es.uv.twcam.pls.bug.model.EntrenadorFactory;
import es.uv.twcam.pls.bug.model.Entrenamiento;
import es.uv.twcam.pls.bug.model.EntrenamientosDia;
import es.uv.twcam.pls.bug.model.Federacion;
import es.uv.twcam.pls.bug.model.FederacionFactory;
import es.uv.twcam.pls.bug.model.Jugador;
import es.uv.twcam.pls.bug.model.JugadorFactory;
import es.uv.twcam.pls.bug.model.Partida;
import es.uv.twcam.pls.bug.model.PartidaFactory;
import es.uv.twcam.pls.bug.model.Torneo;
import es.uv.twcam.pls.bug.model.TorneoFactory;
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
		
		
		Club club1 = new Club("Master TWCAM", "ETSE Burjassot", federacion1);
		Club club2 = new Club("Valencia", "Carrer Valencia 214", federacion1);
		ClubFactory.getInstance().create(club1);
		ClubFactory.getInstance().create(club2);
		
		Calendar myCalendar = new GregorianCalendar(1995,GregorianCalendar.SEPTEMBER,12);
		Date jugadorDate = myCalendar.getTime();
		Jugador jugador1 = new Jugador("Fernando", "12345", "fer", "player", 1346, "", false, jugadorDate, club1);
		Jugador jugador2 = new Jugador("Ruben", "12345", "ruben", "player", 1498, "", false, jugadorDate, club1);
		Jugador jugador3 = new Jugador("Alexis", "12345", "alexis", "player", 1411, "", false, jugadorDate, club1);
		Jugador jugador4 = new Jugador("Pepe", "12345", "pepe", "player", 1411, "", false, jugadorDate, club1);
		Jugador jugador5 = new Jugador("Pablo", "12345", "pablo", "player", 1411, "", false, jugadorDate, club1);
		Jugador jugador6 = new Jugador("Alberto", "12345", "alberto", "player", 1411, "", false, jugadorDate, club1);
		JugadorFactory.getInstance().create(jugador1);
		JugadorFactory.getInstance().create(jugador2);
		JugadorFactory.getInstance().create(jugador3);
		JugadorFactory.getInstance().create(jugador4);
		JugadorFactory.getInstance().create(jugador5);
		JugadorFactory.getInstance().create(jugador6);
		
		ArrayList<String> jugadores1 = new ArrayList<String>();
		jugadores1.add(jugador1.getId());
		jugadores1.add(jugador2.getId());
		jugadores1.add(jugador3.getId());
		Torneo torneo1 = new Torneo(null, "Torneo1", "Club1", jugadores1, null);
		TorneoFactory.getInstance().create(torneo1);

		ArrayList<String> jugadores2 = new ArrayList<String>();
		jugadores2.add(jugador3.getId());
		jugadores2.add(jugador4.getId());
		jugadores2.add(jugador5.getId());
		jugadores2.add(jugador6.getId());
		Torneo torneo2 = new Torneo(null, "Memorial Capablanca", "Club2", jugadores2, null);
		TorneoFactory.getInstance().create(torneo2);

		
		ArrayList<EntrenamientosDia> entrenamientos = new ArrayList<EntrenamientosDia>();
		Calendar myCalendar2 = new GregorianCalendar(2022,GregorianCalendar.JANUARY,10);
		Date entrenamientoDate = myCalendar2.getTime();
		EntrenamientosDia entrenamientosHoy =  new EntrenamientosDia(entrenamientoDate);
		entrenamientosHoy.setEntrenamiento1(new Entrenamiento(jugador1, club1));
		entrenamientosHoy.setEntrenamiento3(new Entrenamiento(jugador2, club1));
		entrenamientos.add(entrenamientosHoy);
		Entrenador entrenador1 = new Entrenador("Entrenador1", entrenamientos);
		Entrenador entrenador2 = new Entrenador("Entrenador2", entrenamientos);
		EntrenadorFactory.getInstance().create(entrenador1);
		EntrenadorFactory.getInstance().create(entrenador2);
		
		club1.setEntrenador_id(entrenador1.getId());
		club2.setEntrenador_id(entrenador2.getId());
		
			

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}
