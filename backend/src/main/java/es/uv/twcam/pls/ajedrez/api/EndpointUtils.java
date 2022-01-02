package es.uv.twcam.pls.ajedrez.api;

import javax.servlet.http.HttpServletResponse;

public class EndpointUtils {
	
	public static void addSecurityHeaders(HttpServletResponse response) { // <2>
		response.addHeader("Access-Control-Allow-Origin", "*");
		response.addHeader("Access-Control-Allow-Methods", 
						   "POST, GET, OPTIONS, PUT, DELETE, HEAD");
		response.addHeader("Access-Control-Allow-Headers", 
						   "X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept");
		response.addHeader("Access-Control-Max-Age", "1728000");
	}

}
