package es.uv.twcam.pls.bug.model;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public class JugadorFactory {
	
	private static JugadorFactory the;
	
	Map<String,Jugador> dictionary;
	
	private JugadorFactory() {
		dictionary = new Hashtable<String,Jugador>();
	}
	
	/* Retorna la factoria que maneja a los jugadores, la crea, si esta no existe */
	public static JugadorFactory getInstance() {
		
		if (the==null) {
			the = new JugadorFactory();
		}
		
		return the;
	}
	
	public Jugador create(Jugador jugador) throws Exception {
		
		if (jugador != null && (jugador.getId() == null || jugador.getId().isEmpty())) {
			jugador.setId(UUID.randomUUID().toString());
			dictionary.put(jugador.getId(), jugador);
		} else {
			throw new Exception("Error creando al Jugador");
		}
		
		return jugador;
	}
	
	public Jugador update(Jugador jugador) throws Exception {
		System.out.println(jugador.getId());
		if (dictionary.containsKey(jugador.getId())) {
			dictionary.put(jugador.getId(), jugador);
		} else {
			throw new Exception("No existe Jugador");
		}
		
		return jugador;
	}
	
	public List<Jugador> listAll() {
		List<Jugador> jugadores = new ArrayList<Jugador>();
		
		jugadores.addAll(dictionary.values());
		
		return jugadores;
	}

	public Jugador find(String id) {
		return dictionary.get(id);
	}

}
