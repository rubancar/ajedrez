/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.uv.twcam.pls.bug.api;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

/**
 * Servlet de inicializaci&oacute;n
 * 
 * 
 * @author <a href="mailto:raul.penya@uv.es">Ra&uacute;l Pe&ntilde;a-Ortiz</a>
 */
public class InitServlet extends HttpServlet {
	
	
	private static final long serialVersionUID = 1L;
	
    /**
     * Servlet to init the web application
     * @throws ServletException Errors when init
     */
	public InitServlet() throws ServletException {
        try {

        	System.out.println("Starting angular-j2e-example apirest ...");
        	
        
            // Init code should be written here
            
            
            System.out.println("angular-j2e-example apirest is started");
            
        } catch (Exception e) {
            System.err.println("angular-j2e-example apirest is not able to be started: "+e);
            throw new ServletException(e);
        }

    }
}