package es.uv.twcam.pls.bug.model;

import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;
import java.util.ArrayList;

public class TorneoFactoryTest {

  static String id = null;
  static String name;
  static String sede;
  static ArrayList<String> jugadores = new ArrayList();
  static ArrayList<Partida> partidas;
  public static Torneo torneo1;

  
  @BeforeAll
  public static void setUpClass() {

    torneo1 = new Torneo(null, name, sede, jugadores, partidas);

  }
  
  @BeforeEach
  public void setUp() {
	    Jugador jugador1 = new Jugador();
	    Jugador jugador2 = new Jugador();
	    Jugador jugador3 = new Jugador();
	    jugador1.setId("1");
	    jugador1.setName("Pepe");
	    jugador2.setId("2");
	    jugador2.setName("Juan");
	    jugador3.setId("3");
	    jugador3.setName("Pedro");
	    System.out.println("test id jugador: " + jugador2.getId());
	    jugadores.add(jugador1.getId());
	    jugadores.add(jugador2.getId());
	    jugadores.add(jugador3.getId());      
  }

  @Test
  void testCreate() throws Exception {
	    System.out.println("test id jugador: " + jugadores);

	    Torneo torneo2 = TorneoFactory.getInstance().create(torneo1);
		
		TorneoFactoryTest.id = torneo1.getId();
		
		assertNotNull(TorneoFactoryTest.id);
		assertEquals(torneo1.getName(), torneo2.getName());
		assertEquals(torneo1.getSede(), torneo2.getSede());
		assertEquals(torneo1.getPartidas().size(),3);
  }
}
 