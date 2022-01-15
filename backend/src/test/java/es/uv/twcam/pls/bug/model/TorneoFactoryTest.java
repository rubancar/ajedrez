package es.uv.twcam.pls.bug.model;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.BeforeAll;
import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;

public class TorneoFactoryTest {

  static String id = null;
  static String name;
	static String sede;
	static ArrayList<Jugadores> jugadores;
	static ArrayList<Partida> partidas;
  public static Torneo torneo1;

  
  @BeforeAll
  public static void setUpClass() {
    torneo1 = new Torneo(null, name, sede, jugadores, partidas);
    Jugador jugador1 = new Jugador();
    Jugador jugador2 = new Jugador();
    Jugador jugador3 = new Jugador();
    jugadores.add(e)

  }

  @Test
  void testCrearPartidasTorneo() {

		Torneo bug2 = TorneoFactory.getInstance().create(bug1);
		
		TorneoFactoryTest.id = bug1.getId();
		
		assertNotNull(TorneoFactoryTest.id);
		assertEquals(bug1.getIssueName(), bug2.getIssueName());
		assertEquals(bug1.getIssueMessage(), bug2.getIssueMessage());

  }

  @Test
  void testCreate() {

  }
}
 