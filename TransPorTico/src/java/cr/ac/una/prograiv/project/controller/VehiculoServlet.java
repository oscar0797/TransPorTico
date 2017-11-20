/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.project.controller;

import com.google.gson.Gson;
import cr.ac.una.prograiv.project.Validaciones.Validaciones;
import cr.ac.una.prograiv.project.bl.VehiculoBL;
import cr.ac.una.prograiv.project.domain.Vehiculo;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
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
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        try {
            String json;
            Vehiculo vehiculo = new Vehiculo();
            VehiculoBL vehBL = new VehiculoBL();
            String accion = request.getParameter("accion");
            switch (accion) {
                case "agregarVehiculo":
                case "modificarVehiculo":

                    if (accion.equals("modificarVehiculo")) {
                        vehiculo = new Vehiculo(
                                Integer.parseInt(request.getParameter("ano")),
                                request.getParameter("modelo"),
                                request.getParameter("placa"),
                                request.getParameter("color"),
                                Double.parseDouble(request.getParameter("ubicacionX")),
                                Double.parseDouble(request.getParameter("ubicacionY")),
                                true,
                                false,
                                new Date(),
                                "anybody"
                        );
                        vehiculo.setPkIdVehiculo(Integer.parseInt(request.getParameter("idVehiculo")));
                        vehBL.merge(vehiculo);
                        out.print("C~Vehículo modificado con exito");
                    } else {
                        vehBL.save(
                                new Vehiculo(
                                        Integer.parseInt(request.getParameter("ano")),
                                        request.getParameter("modelo"),
                                        request.getParameter("placa"),
                                        request.getParameter("color"),
                                        Double.parseDouble(request.getParameter("ubicacionX")),
                                        Double.parseDouble(request.getParameter("ubicacionY")),
                                        true,
                                        false,
                                        new Date(),
                                        "anybody"
                                )
                        );
                        out.print("C~Vehiculo agregado con exito");
                    }
                    break;

                case "consultarVehiculos":
                    json = new Gson().toJson(vehBL.findAll());
                    out.print(json);
                    break;

                case "consultarVehiculosActivos":
                    json = new Gson ( ).toJson ( vehBL.findByQuery ( "FROM Vehiculo WHERE activo=true" ) ) ;
                    out.print ( json ) ;
                    break ;

                case "eliminarVehiculo":
                {
                    vehiculo.setPkIdVehiculo ( Integer.parseInt ( request.getParameter ( "idVehiculo" ) ) ) ;
                    vehBL.delete ( vehiculo ) ;
                    out.print ( "C~Vehículo eliminado con exito" ) ;
                    break ;
                }
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
