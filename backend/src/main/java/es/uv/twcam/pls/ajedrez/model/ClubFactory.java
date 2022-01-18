package es.uv.twcam.pls.ajedrez.model;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public class ClubFactory {
	
private static ClubFactory the;
	
	Map<String,Club> dictionary;
	
	private ClubFactory() {
		dictionary = new Hashtable<String,Club>();
	}
	
	/* Retorna la factoria que maneja a los jugadores, la crea, si esta no existe */
	public static ClubFactory getInstance() {
		
		if (the==null) {
			the = new ClubFactory();
		}
		
		return the;
	}
	
	public Club create(Club club) throws Exception {
		
		if (club != null && (club.getId() == null || club.getId().isEmpty())) {
			club.setId(UUID.randomUUID().toString());
			dictionary.put(club.getId(), club);
		} else {
			throw new Exception("Error creando al Club");
		}
		
		return club;
	}
	
	public Club update(Club club) throws Exception {
		
		if (dictionary.containsKey(club.getId())) {
			dictionary.put(club.getId(), club);
		} else {
			throw new Exception("No existe Club");
		}
		
		return club;
	}
	
	public List<Club> listAll() {
		List<Club> clubes = new ArrayList<Club>();
		
		clubes.addAll(dictionary.values());
		
		return clubes;
	}

	public Club find(String id) {
		return dictionary.get(id);
	}

	public void delete(String id) throws EntityNotExistException {
		
		if (dictionary.containsKey(id)) {
			dictionary.remove(id);
		} else {
			throw new EntityNotExistException(id);
		}
		
		
	}

}
