/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.project.controller;

import com.google.gson.Gson;
import cr.ac.una.prograiv.project.bl.HistorialBL;
import cr.ac.una.prograiv.project.domain.Historial;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

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
    
    /* private Integer pkIdHistorial;
     private Integer chofer;
     private Integer usuario;
     private Integer vehiculo;
     private Serializable origen;
     private Serializable destino;
     private double monto;
     private int tiempo;
     private String retroalimentacion;
     private Date ultimaFecha;
     private String ultimoUsuario;*/

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        try {
            String json;
            int idHistorial;
            Historial historial = new Historial();
            HistorialBL historialBL = new HistorialBL();
            HttpSession sesion = request.getSession();
            String accion = request.getParameter("accion");

            switch (accion) {
                case "agregarHistorial":
                case "modificarHistorial":
                   
           /*         historial.setChofer(Integer.parseInt(request.getParameter("chofer")));
                    historial.setUsuario(Integer.parseInt(request.getParameter("usuario")));
                    historial.setVehiculo(Integer.parseInt(request.getParameter("vehiculo")));
                    String ultimaFecha = request.getParameter("ultimaFecha");
                    DateFormat format = new SimpleDateFormat("dd-MM-yyyy", Locale.ENGLISH);
                    Date date = format.parse(ultimaFecha);
                    historial.setUltimaFecha(date);
                    historial.setTipoLicencia(request.getParameter("tipoLicencia"));
                    String fechaVencimiento = request.getParameter("vencimientoLicencia");
                    Date fecha = format.parse(fechaVencimiento);
                    historial.setVencimientoLicencia(fecha);
                    historial.setUltimoUsuario(request.getParameter("ultimoUsuario"));

                    if (accion.equals("modificarHistorial")) {
                        historial.setPkIdHistorial(Integer.parseInt(request.getParameter("idHistorial")));
                        historialBL.merge(historial);
                        out.print("C~Historial modificado con exito");
                    } else {
                        historialBL.save(historial);
                        out.print("C~Historial agregado con exito");
                    }
                    break;
*/
                case "eliminarHistorial":
                    historial.setPkIdHistorial(Integer.parseInt(request.getParameter("idHistorial")));
                    historialBL.delete(historial);
                    out.print("C~Historial Eliminado con exito");
                    break;
                case "consultarHistorialByID":
                    idHistorial = Integer.parseInt(request.getParameter("idHistorial"));
                    historial = historialBL.findByID(idHistorial);
                    json = new Gson().toJson(historial);
                    out.print(json);
                    break;
                case "consultarHistoriales":
                    json = new Gson().toJson(historialBL.findAll());
                    out.print(json);
                    break;
                default:
                    out.print("E~No se indico la acción que se desea realizar");
                    break;
            }
        } catch (NumberFormatException e) {
            out.print("E~" + e.getMessage());
        } catch (Exception e) {
            out.print("E~" + e.getMessage());
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
