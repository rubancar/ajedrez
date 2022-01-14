package es.uv.twcam.pls.bug.model;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public class TorneoFactory {

	private static TorneoFactory the;

	Map<String, Torneo> dictionary;

	// El uso de ETag seria interesante tambien
	private TorneoFactory() {
		dictionary = new Hashtable<String, Torneo>();
	}

	/*
	 * Retorna la factoria que maneja los torneos, la crea, si esta no existe
	 */
	public static TorneoFactory getInstance() {

		if (the == null) {
			the = new TorneoFactory();
		}

		return the;
	}

	public Torneo create(Torneo torneo) throws Exception {

		if (torneo != null && torneo.getId() == null) {
			torneo.setId(UUID.randomUUID().toString());
			ArrayList<Partida> partidas = crearPartidasTorneo(torneo.getJugadores(), torneo.getId(), torneo.getSede());
			torneo.setPartidas(partidas);
			System.out.println("Creando el torneo con id: " + torneo.getId());
			dictionary.put(torneo.getId(), torneo);
		} else {
			throw new Exception("Error creando el torneo");
		}

		return torneo;
	}
	
	public ArrayList<Partida> crearPartidasTorneo(ArrayList<String> jugadores, String torneoId, String sede){
		ArrayList<Partida> partidas = new ArrayList<Partida>();
		try {		
	        for (int i = 0; i < jugadores.size()-1; i++) {
	        	for (int j = i + 1; j < jugadores.size(); j++) {
	        		String jugador1ID = jugadores.get(i);
	        		String jugador2ID = jugadores.get(j);
	        		Jugador jugador1 = JugadorFactory.getInstance().find(jugador1ID);
	        		Jugador jugador2 = JugadorFactory.getInstance().find(jugador2ID);
		        	Partida partida = new Partida(null, sede, torneoId, jugador1, jugador2, "-1");
		        	PartidaFactory.getInstance().create(partida);
//		        	TODO cambiar a partida.getId() y crear una lista de IDs de partida
		        	partidas.add(partida);
	        	}
	        	
	        }
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return partidas;			

	}

	public List<Torneo> listAll() {
		List<Torneo> torneos = new ArrayList<Torneo>();
		torneos.addAll(dictionary.values());
		return torneos;
	}

	public Torneo update(Torneo torneo) throws Exception {

		if (dictionary.containsKey(torneo.getId())) {
			dictionary.put(torneo.getId(), torneo);
		} else {
			throw new EntityNotExistException("El torneo con id: " + torneo.getId() + " no existe.");
		}

		return torneo;
	}

	public void delete(String id) throws Exception {	
		if (dictionary.containsKey(id)) {
			dictionary.remove(id);
		} else {
			throw new EntityNotExistException("EL torneo con id: " + id + " no existe.");
		}
	}

	public Torneo find(String id) {
		return dictionary.get(id);
	}


}
