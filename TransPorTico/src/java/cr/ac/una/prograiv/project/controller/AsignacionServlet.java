/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.project.controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import cr.ac.una.prograiv.project.bl.AsignacionBL;
import cr.ac.una.prograiv.project.domain.Asignacion;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Oscar
 */
public class AsignacionServlet extends HttpServlet {

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
            Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy").create();
            int idAsignacion;
            Asignacion asig = new Asignacion();
            AsignacionBL asigBL = new AsignacionBL();
            String accion = request.getParameter("accion");

            switch (accion) {
                case "agregarAsignacion":
                case "modificarAsignacion":

                    if (accion.equals("modificarAsignacion")) {
                        asig = new Asignacion(Integer.parseInt(request.getParameter("chofer")), Integer.parseInt(request.getParameter("vehiculo")));
                        asig.setPkIdAsignacion(Integer.parseInt(request.getParameter("idAsignacion")));
                        asigBL.merge(asig);
                        out.print("C~Asignacion modificado con exito");
                    } else {
                        asigBL.save(new Asignacion(Integer.parseInt(request.getParameter("chofer")), Integer.parseInt(request.getParameter("vehiculo"))));
                        out.print("C~Asignacion agregado con exito");
                    }
                    break;

                case "eliminarAsignacion":
                    asig.setPkIdAsignacion(Integer.parseInt(request.getParameter("idAsignacion")));
                    asigBL.delete(asig);
                    out.print("C~Asignacion Eliminado con exito");
                    break;
                case "consultarAsignacionByID":
                    idAsignacion = Integer.parseInt(request.getParameter("idAsignacion"));
                    asig = asigBL.findByID(idAsignacion);
                    json = new Gson().toJson(asig);
                    out.print(json);
                    break;
                case "buscarAsignacion":
                    asig = asigBL.findByID(Integer.parseInt(request.getParameter("idAsignacion")));
                    json = gson.toJson(asig);
                    out.print(json);
                    break;
                case "consultarAsignaciones":
                    json = gson.toJson(asigBL.findAll());
                    out.print(json);
                    break;
                    case "listaChoferes":
                    json = gson.toJson(asigBL.findByQuery("FROM Chofer WHERE cedula=" + request.getParameter("cedula")));
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
