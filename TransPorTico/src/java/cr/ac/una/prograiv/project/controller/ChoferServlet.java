/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.project.controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import cr.ac.una.prograiv.project.bl.ChoferBL;
import cr.ac.una.prograiv.project.domain.Chofer;
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
import cr.ac.una.prograiv.project.Validaciones.Validaciones;

/**
 *
 * @author Oscar
 */
public class ChoferServlet extends HttpServlet {

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
            int idChofer;
            Chofer chofer = new Chofer();
            ChoferBL choferBL = new ChoferBL();
            Validaciones val = new Validaciones();
            HttpSession sesion = request.getSession();
            String accion = request.getParameter("accion");

            switch (accion) {
                case "agregarChofer":
                case "modificarChofer":
                    String fechaNac = request.getParameter("fechaNacimiento");
                    DateFormat format1 = new SimpleDateFormat("dd/MM/yyyy", Locale.ENGLISH);
                    Date date1 = format1.parse(fechaNac);

                    String fechaVencimiento = request.getParameter("vencimientoLicencia");
                    DateFormat format2 = new SimpleDateFormat("dd/MM/yyyy", Locale.ENGLISH);
                    Date date2 = format2.parse(fechaVencimiento);

                    if (accion.equals("modificarChofer")) {
                        chofer = new Chofer(request.getParameter("cedula"), request.getParameter("nombre"), date1, request.getParameter("tipoLicencia"), date2, new Date(), "anybody");
                        chofer.setPkIdChofer(Integer.parseInt(request.getParameter("idChofer")));
                        choferBL.merge(chofer);
                        out.print("C~Chofer modificado con exito");
                    } else {
                        choferBL.save(new Chofer(request.getParameter("cedula"), request.getParameter("nombre"), date1, request.getParameter("tipoLicencia"), date2, new Date(), "anybody"));
                        out.print("C~Chofer agregado con exito");
                    }
                    break;

                case "eliminarChofer":
                    chofer.setPkIdChofer(Integer.parseInt(request.getParameter("idChofer")));
                    choferBL.delete(chofer);
                    out.print("C~Chofer Eliminado con exito");
                    break;
                case "consultarChoferByID":
                    idChofer = Integer.parseInt(request.getParameter("idChofer"));
                    chofer = choferBL.findByID(idChofer);
                    json = new Gson().toJson(chofer);
                    out.print(json);
                    break;
                case "buscarChofer":
                    chofer = choferBL.findByID(Integer.parseInt(request.getParameter("idChofer")));
                    json = gson.toJson(chofer);
                    out.print(json);
                    break;
                case "consultarChoferes":
                    json = gson.toJson(choferBL.findAll());
                    out.print(json);
                    break;
                default:
                    out.print("E~No se indico la acción que se desea realizar");
                    break;
                case "verificarCedula":
                    boolean existe = val.existeCedula(request.getParameter("cedula"));
                    if (existe) {
                        out.print("E~La cédula digitada ya existe");
                    } else {
                        out.print("C~La cédula digitada no existe");
                    }
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
