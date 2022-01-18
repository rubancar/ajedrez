package es.uv.twcam.pls.ajedrez.model;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public class EntrenadorFactory {

	private static EntrenadorFactory the;

	Map<String, Entrenador> dictionary;

	private EntrenadorFactory() {
		dictionary = new Hashtable<String, Entrenador>();
	}

	/*
	 * Retorna la factoria que maneja los entrenadores, la crea, si esta no existe
	 */
	public static EntrenadorFactory getInstance() {

		if (the == null) {
			the = new EntrenadorFactory();
		}

		return the;
	}

	public Entrenador create(Entrenador entrenador) throws Exception {

		if (entrenador != null && (entrenador.getId() == null || "".equals(entrenador.getId())) && entrenador.isEntrenamientosOk()) {
			entrenador.setId(UUID.randomUUID().toString());
			dictionary.put(entrenador.getId(), entrenador);
		} else {
			throw new Exception("Error creando el entrenador");
		}

		return entrenador;
	}

	public List<Entrenador> listAll() {
		List<Entrenador> entrenadores = new ArrayList<Entrenador>();

		entrenadores.addAll(dictionary.values());

		return entrenadores;
	}

	public Entrenador update(Entrenador entrenador) throws Exception {

		if (dictionary.containsKey(entrenador.getId())) {
			dictionary.put(entrenador.getId(), entrenador);
		} else {
			throw new EntityNotExistException("El entrenador con id: " + entrenador.getId() + " no existe.");
		}

		return entrenador;
	}

	public void delete(String id) throws Exception {
		if (dictionary.containsKey(id)) {
			dictionary.remove(id);
		} else {
			throw new EntityNotExistException("El entrenador con id: " + id + " no existe.");
		}
	}

	public Entrenador find(String id) {
		return dictionary.get(id);
	}


}
