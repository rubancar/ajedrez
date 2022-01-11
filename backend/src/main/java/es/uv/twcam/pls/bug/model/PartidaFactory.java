package es.uv.twcam.pls.bug.model;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public class PartidaFactory {

	private static PartidaFactory the;

	Map<String, Partida> dictionary;

	private PartidaFactory() {
		dictionary = new Hashtable<String, Partida>();
	}

	/*
	 * Retorna la factoria que maneja los partidas, la crea, si esta no existe
	 */
	public static PartidaFactory getInstance() {

		if (the == null) {
			the = new PartidaFactory();
		}

		return the;
	}

	public Partida create(Partida partida) throws Exception {

		System.out.println("Creando la partida: " + partida.getId());

		if (partida != null && partida.getId() == null) {

			partida.setId(UUID.randomUUID().toString());
//			System.out.println("Creando la partida con id: " + partida.getId());
			dictionary.put(partida.getId(), partida);
		} else {
			throw new Exception("Error creando la partida");
		}

		return partida;
	}

	public List<Partida> listAll() {
		List<Partida> partidas = new ArrayList<Partida>();
		partidas.addAll(dictionary.values());
		return partidas;
	}
	
	public List<Partida> listByTournament(String tournamentId) {
		List<Partida> partidas = new ArrayList<Partida>();
		for (Partida partida : dictionary.values()) {
			if (partida.getTorneoID().equals(tournamentId)) {
				partidas.add(partida);
			}
		}
		return partidas;
	}

	public Partida update(Partida partida) throws Exception {

		if (dictionary.containsKey(partida.getId())) {
			System.out.println("Haciendo put del resultado" + partida.getResultado());
			System.out.println("Haciendo put del resultado" + partida.getJugador1());
			dictionary.put(partida.getId(), partida);
		} else {
			throw new EntityNotExistException("La partida con id: " + partida.getId() + " no existe.");
		}

		return partida;
	}

	public void delete(String id) throws Exception {	
		if (dictionary.containsKey(id)) {
			dictionary.remove(id);
		} else {
			throw new EntityNotExistException("La partida con id: " + id + " no existe.");
		}
	}

	public Partida find(String id) {
		return dictionary.get(id);
	}


}