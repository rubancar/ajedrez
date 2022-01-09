package es.uv.twcam.pls.bug.model;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public class PartidaFactory {

	private static PartidaFactory the;

	ArrayList<Partida> partidas;
	Map<String, Partida> dictionary;
	Integer partida_id;

	// El uso de ETag seria interesante tambien
	private PartidaFactory() {
		dictionary = new Hashtable<String, Partida>();
		partidas = new ArrayList();
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
			partida_id =  partidas.size() + 1;
			partida.setId(partida_id.toString());
//			partida.setId(UUID.randomUUID().toString());
			System.out.println("Creando la partida con id: " + partida.getId());
			partidas.add(partida);
//			dictionary.put(partida.getId(), partida);
		} else {
			throw new Exception("Error creando la partida");
		}

		return partida;
	}

	public List<Partida> listAll() {
//		List<Partida> partidas = new ArrayList<Partida>();
//		partidas.addAll(dictionary.values());
		return partidas;
	}

	public Partida update(Partida partida) throws Exception {

		for (int i = 0; i < partidas.size(); i++) {
			if (partidas.get(i).getId() == partida.getId()) {
				partidas.set(i, partida);
			}
		}
//		if (dictionary.containsKey(partida.getId())) {
//			dictionary.put(partida.getId(), partida);
//		} else {
//			throw new EntityNotExistException("La partida con id: " + partida.getId() + " no existe.");
//		}

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
