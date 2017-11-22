/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.project.controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import cr.ac.una.prograiv.project.bl.HistorialBL;
import cr.ac.una.prograiv.project.domain.Historial;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Oscar
 */
public class HistorialServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest ( HttpServletRequest request, HttpServletResponse response ) throws ServletException, IOException
    {
        response.setContentType ( "text/html;charset=UTF-8" ) ;
        PrintWriter out = response.getWriter ( ) ;
        
        try
        {
            String json ;
            Gson gson = new GsonBuilder ( ).setDateFormat ( "dd/MM/yyyy" ).create ( ) ;
            int idHistorial ;
            Historial H1 = new Historial ( ) ;
            HistorialBL HBL1 = new HistorialBL ( ) ;
            String accion = request.getParameter ( "accion" ) ;
            
            switch ( accion )
            {
                case "agregarHistorial":
                    
                    System.out.println ( request.getParameter ( "FKidChofer" ) ) ;
                    System.out.println ( request.getParameter ( "FKidUsuario" ) ) ;
                    System.out.println ( request.getParameter ( "FKidVehiculo" ) ) ;
                    System.out.println ( request.getParameter ( "origenX" ) ) ;
                    System.out.println ( request.getParameter ( "origenY" ) ) ;
                    System.out.println ( request.getParameter ( "destinoX" ) ) ;
                    System.out.println ( request.getParameter ( "destinoY" ) ) ;
                    System.out.println ( request.getParameter ( "monto" ) ) ;
                    System.out.println ( request.getParameter ( "tiempo" ) ) ;
                    
                    H1 = new Historial
                    (
                        Integer.parseInt ( request.getParameter ( "FKidChofer" ) ),
                        Integer.parseInt ( request.getParameter ( "FKidUsuario" ) ),
                        Integer.parseInt ( request.getParameter ( "FKidVehiculo" ) ),
                        Double.parseDouble ( request.getParameter ( "origenX" ) ),
                        Double.parseDouble ( request.getParameter ( "origenY" ) ),
                        Double.parseDouble ( request.getParameter ( "destinoX" ) ),
                        Double.parseDouble ( request.getParameter ( "destinoY" ) ),
                        Double.parseDouble ( request.getParameter ( "monto" ) ),
                        Integer.parseInt ( request.getParameter ( "tiempo" ) ),
                        "Sin comentarios",
                        new Date ( ),
                        "anybody"
                    ) ;            
                    
                    HBL1.save ( H1 ) ;
                    
                    out.print ( "C~Historial agregado con exito" ) ;
                    break ;
                    
                case "consultarHistorial":
                    json = new Gson ( ).toJson ( HBL1.findAll ( ) ) ;
                    out.print ( json ) ;
                    break ;
                    
                case "consultarHistorialUsuario":
                    String dato = request.getParameter ( "FKidUsuario" ) ;
                    json = new Gson ( ).toJson ( HBL1.findByQuery ( "FROM Historial WHERE FK_idUsuario=" + dato ) ) ;
                    out.print ( json ) ;
                    break ;
                
                default:
                    out.print ( "E~No se indico la acción que se desea realizar" ) ;
                    break ;
            }
        }
        catch ( NumberFormatException e )
        {
            out.print ( "E~" + e.getMessage ( ) ) ;
        }
        catch ( Exception e )
        {
            out.print ( "E~" + e.getMessage ( ) ) ;
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
