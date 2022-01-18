package es.uv.twcam.pls.ajedrez.model;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public class BugFactory {
	
	private static BugFactory the;
	
	Map<String,Bug> dictionary;

	
	private BugFactory() {
		dictionary = new Hashtable<String,Bug>();
	}
	
	public static BugFactory getInstance() {
		
		if (the==null) {
			the = new BugFactory();
		}
		
		return the;
	}
	
	public Bug create(Bug bug) throws BugException {
		
		if (bug != null && bug.getId() == null) {
			bug.setId(UUID.randomUUID().toString());
			dictionary.put(bug.getId(), bug);
		} else {
			throw new IncorrectBugException(bug.toString());
		}
		
		return bug;
		
	}
	
	public List<Bug> listAll() {
		List<Bug> bugs = new ArrayList<Bug>();
		
		bugs.addAll(dictionary.values());
		
		return bugs;
	}

	public Bug update(Bug bug) throws BugException {
		
		if (dictionary.containsKey(bug.getId())) {
			dictionary.put(bug.getId(), bug);
		} else {
			throw new BugNotExistException(bug.getId());
		}
		
		return bug;
	}

	public void delete(String id) throws BugException {
		if (dictionary.containsKey(id)) {
			dictionary.remove(id);
		} else {
			throw new BugNotExistException(id);
		}
	}

	public Bug find(String id) {
		return dictionary.get(id);
	}

}
