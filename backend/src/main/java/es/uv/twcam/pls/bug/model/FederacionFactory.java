package es.uv.twcam.pls.bug.model;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public class FederacionFactory {
	
	private static FederacionFactory the;
	
	Map<String,Federacion> dictionary;
	
	private FederacionFactory() {
		dictionary = new Hashtable<String,Federacion>();
	}
	
	/* Retorna la factoria que maneja las federaciones, la crea, si esta no existe */
	public static FederacionFactory getInstance() {
		
		if (the==null) {
			the = new FederacionFactory();
		}
		
		return the;
	}
	
	public Federacion create(Federacion federacion) throws Exception {
		
		if (federacion != null && federacion.getId() == null) {
			federacion.setId(UUID.randomUUID().toString());
			dictionary.put(federacion.getId(), federacion);
		} else {
			throw new Exception("Error creando la Federación");
		}
		
		return federacion;
	}
	
	public List<Federacion> listAll() {
		List<Federacion> federaciones = new ArrayList<Federacion>();
		
		federaciones.addAll(dictionary.values());
		
		return federaciones;
	}
	
	
	public Federacion update(Federacion federacion) throws Exception {
		
		if (dictionary.containsKey(federacion.getId())) {
			dictionary.put(federacion.getId(), federacion);
		} else {
			throw new EntityNotExistException("La federación con id: "+ federacion.getId()+" no existe.");
		}
		
		return federacion;
	}

	public void delete(String id) throws Exception {
		if (dictionary.containsKey(id)) {
			dictionary.remove(id);
		} else {
			throw new EntityNotExistException("La federación con id: "+ id +" no existe.");
		}
	}


	public Federacion find(String id) {
		return dictionary.get(id);
	}

}
