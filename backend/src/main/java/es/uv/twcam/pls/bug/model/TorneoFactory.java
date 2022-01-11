package es.uv.twcam.pls.bug.model;

import java.util.ArrayList;
import java.util.Hashtable;
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
			System.out.println("Creando el torneo con id: " + torneo.getId());
			dictionary.put(torneo.getId(), torneo);
		} else {
			throw new Exception("Error creando el torneo");
		}

		return torneo;
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
