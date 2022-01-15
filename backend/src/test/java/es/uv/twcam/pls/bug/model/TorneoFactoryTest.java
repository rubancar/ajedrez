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
  static ArrayList<String> jugadores;
  static ArrayList<Partida> partidas;
  public static Torneo torneo1;

  
  @BeforeAll
  public static void setUpClass() {

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
    torneo1 = new Torneo(null, name, sede, jugadores, partidas);
    System.out.println(torneo1);

  }

  @Test
  void testCreate() throws Exception {
		Torneo torneo2 = TorneoFactory.getInstance().create(torneo1);
		
		TorneoFactoryTest.id = torneo1.getId();
		
		assertNotNull(TorneoFactoryTest.id);
		assertEquals(torneo1.getName(), torneo2.getName());
		assertEquals(torneo1.getSede(), torneo2.getSede());
		assertEquals(torneo1.getPartidas().size(),3);
  }
}
 