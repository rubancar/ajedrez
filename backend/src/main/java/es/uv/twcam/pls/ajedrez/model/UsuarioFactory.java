package es.uv.twcam.pls.ajedrez.model;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public class UsuarioFactory {
	private static UsuarioFactory the;
	
	Map<String,Usuario> dictionary;
	
	private UsuarioFactory() {
		dictionary = new Hashtable<String,Usuario>();
	}
	
	/* Retorna la factoria que maneja los usuarios, la crea, si esta no existe */
	public static UsuarioFactory getInstance() {
		
		if (the==null) {
			the = new UsuarioFactory();
		}
		
		return the;
	}
	
	public Usuario create(Usuario usuario) throws Exception {
		
		System.out.println(usuario.toString());
		
		if (usuario != null && (usuario.getId() == null || usuario.getId().isBlank())) {
			usuario.setId(UUID.randomUUID().toString());
			dictionary.put(usuario.getUsuario(), usuario);
		} else {
			throw new Exception("Error creando el Usuario");
		}
		
		return usuario;
	}
	
	public List<Usuario> listAll() {
		List<Usuario> usuarios = new ArrayList<Usuario>();
		
		usuarios.addAll(dictionary.values());
		
		return usuarios;
	}
	
	
	public Usuario update(Usuario usuario) throws Exception {
		
		if (dictionary.containsKey(usuario.getId())) {
			dictionary.put(usuario.getId(), usuario);
		} else {
			throw new EntityNotExistException("El usuario con id: "+ usuario.getId()+" no existe.");
		}
		
		return usuario;
	}

	public void delete(String userName) throws Exception {
		if (dictionary.containsKey(userName)) {
			dictionary.remove(userName);
		} else {
			throw new EntityNotExistException("El usuario con username: "+ userName +" no existe.");
		}
	}


	public Usuario find(String userName) {
		return dictionary.get(userName);
	}

}
