package es.uv.twcam.pls.bug.model;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.BeforeAll;
import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

@TestMethodOrder(OrderAnnotation.class)
public class PartidaFactoryTest {

  static String id = null;
	static String sede = "Club1";
	static String torneoID = "id-de-torneo";
	static Jugador jugador1 = new Jugador();
	static Jugador jugador2  = new Jugador();
	static String resultado = "Pendiente";
  public static Partida partida1;

  @BeforeAll
  public static void setUpClass() {
    partida1 = new Partida(null, sede, torneoID, jugador1, jugador2, resultado);

  }

  @Test
  @Order(1)
  void testCreate() throws Exception {

	  Partida partida2 = PartidaFactory.getInstance().create(partida1);
    PartidaFactoryTest.id = partida1.getId();

		assertNotNull(PartidaFactoryTest.id);
		assertEquals(partida1.getSede(), partida2.getSede());
		assertEquals(partida1.getTorneoID(), partida2.getTorneoID());

  }

  @Test
  @Order(2)
  void testListAll() throws Exception {
   	
    List<Partida> partidas = PartidaFactory.getInstance().listAll();
    System.out.println(partidas);
		
		assertTrue(partidas.size()>0);
  }

  @Test
  @Order(3)
  void testListByTournament() throws Exception {

    System.out.println(torneoID);
    Partida partida3 = new Partida(null, sede, "otro-torneo-ID", jugador1, jugador2, resultado);
	  PartidaFactory.getInstance().create(partida3);

    List<Partida> partidasxtorneo = PartidaFactory.getInstance().listByTournament(torneoID);
    
    assertEquals(1,partidasxtorneo.size());
  }

  @Test
  @Order(4)
  void testFind() throws Exception {
    Partida partida4 = PartidaFactory.getInstance().find(PartidaFactoryTest.id);
    assertNotNull(partida4);
  }

  @Test
  @Order(5)
  void testUpdate() throws Exception {
    Partida partida5 = PartidaFactory.getInstance().find(PartidaFactoryTest.id);
		partida5.setSede("Clup Capablanca");
		Partida partida6 = PartidaFactory.getInstance().update(partida5);
		
		assertEquals(partida5.getSede(), partida6.getSede());
		assertEquals(partida5.getTorneoID(), partida6.getTorneoID());

  }

  @Test
  @Order(6)
  void testDelete() throws Exception {
    PartidaFactory.getInstance().delete(PartidaFactoryTest.id);
		Partida partida7 = PartidaFactory.getInstance().find(PartidaFactoryTest.id);
		assertNull(partida7);
  }

}
 