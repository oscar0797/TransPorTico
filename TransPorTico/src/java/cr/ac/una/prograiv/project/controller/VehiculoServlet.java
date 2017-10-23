/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.project.controller;

import com.google.gson.Gson;
import cr.ac.una.prograiv.project.bl.VehiculoBL;
import cr.ac.una.prograiv.project.domain.Vehiculo;
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
public class VehiculoServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    
    /* private Integer pkIdVehiculo;
     private Integer usuario;
     private int ano;
     private String modelo;
     private String placa;
     private String color;
     private Serializable ubicacion;
     private boolean activo;
     private boolean espera;
     private Date ultimaFecha;
     private String ultimoUsuario;*/
    
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        try {
            String json;
            int idVehiculo;
            Vehiculo vehiculo = new Vehiculo();
            VehiculoBL vehiculoBL = new VehiculoBL();
            HttpSession sesion = request.getSession();
            String accion = request.getParameter("accion");

            switch (accion) {
                case "agregarVehiculo":
                case "modificarVehiculo":
                   
                    vehiculo.setPkIdVehiculo(Integer.parseInt(request.getParameter("idVehiculo")));
                    vehiculo.setUsuario(Integer.parseInt(request.getParameter("cedula")));
                    vehiculo.setAno(Integer.parseInt(request.getParameter("nombre")));
                    String ultFecha = request.getParameter("UltimaFecha");
                    DateFormat format = new SimpleDateFormat("dd-MM-yyyy", Locale.ENGLISH);
                    Date date = format.parse(ultFecha);
                    vehiculo.setUltimaFecha(date);
                    vehiculo.setModelo(request.getParameter("modelo"));
                    vehiculo.setPlaca(request.getParameter("placa"));
                    vehiculo.setModelo(request.getParameter("color"));
                    vehiculo.setUltimoUsuario(request.getParameter("ultimoUsuario"));

                    if (accion.equals("modificarVehiculo")) {
                        vehiculo.setPkIdVehiculo(Integer.parseInt(request.getParameter("idVehiculo")));
                        vehiculoBL.merge(vehiculo);
                        out.print("C~Vehiculo modificado con exito");
                    } else {
                        vehiculoBL.save(vehiculo);
                        out.print("C~Vehiculo agregado con exito");
                    }
                    break;

                case "eliminarVehiculo":
                    vehiculo.setPkIdVehiculo(Integer.parseInt(request.getParameter("idVehiculo")));
                    vehiculoBL.delete(vehiculo);
                    out.print("C~Vehiculo Eliminado con exito");
                    break;
                case "consultarVehiculoByID":
                    idVehiculo = Integer.parseInt(request.getParameter("idVehiculo"));
                    vehiculo = vehiculoBL.findByID(idVehiculo);
                    json = new Gson().toJson(vehiculo);
                    out.print(json);
                    break;
                case "consultarVehiculoes":
                    json = new Gson().toJson(vehiculoBL.findAll());
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
