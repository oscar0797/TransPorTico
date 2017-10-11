/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.project.controller;

import com.google.gson.Gson;
import cr.ac.una.prograiv.project.bl.UsuarioBL;
import cr.ac.una.prograiv.project.domain.Usuario;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.Serializable;
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
public class UsuarioServlet extends HttpServlet {

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
            int idUsuario;
            Usuario usuario = new Usuario();
            UsuarioBL usuBL = new UsuarioBL();
            HttpSession sesion = request.getSession();
            String accion = request.getParameter("accion");
            switch (accion) {
                case "agregarUsuario": case "modificarUsuario":
                    usuario.setNombreUsuario(request.getParameter("nombreUsuario"));
                    usuario.setContrasena(request.getParameter("contrasena"));
                    usuario.setNombre(request.getParameter("nombre"));
                    usuario.setApellido1(request.getParameter("apellido1"));
                    usuario.setApellido2(request.getParameter("apellido2"));
                    usuario.setCorreo(request.getParameter("correo"));
                    String fechatxt = request.getParameter("fechaNacimiento");
                    DateFormat format = new SimpleDateFormat("dd-MM-yyyy", Locale.ENGLISH);
                    Date date = format.parse(fechatxt);
                    usuario.setFechaNacimiento(date);
                    usuario.setTelefono(request.getParameter("telefono"));
                    usuario.setDireccion(request.getParameter("direccion"));
                    usuario.setTipo(Integer.parseInt(request.getParameter("tipo")));

                    if (accion.equals("modificarUsuario")) {
                        usuario.setPkIdUsuario(Integer.parseInt(request.getParameter("idUsuario")));
                        usuBL.merge(usuario);
                        out.print("C~Usuario modificado con exito");
                    } else {
                        usuBL.save(usuario);
                        out.print("C~Usuario agregado con exito");
                    }
                    break;

                case "eliminarUsuario":
                    usuario.setPkIdUsuario(Integer.parseInt(request.getParameter("idUsuario")));
                    usuBL.delete(usuario);
                    out.print("C~Usuario Eliminado con exito");
                    break;
                case "consultarUsuarioByID":
                    idUsuario = Integer.parseInt(request.getParameter("idUsuario"));
                    usuario = usuBL.findByID(idUsuario);
                    json = new Gson().toJson(usuario);
                    out.print(json);
                    break;
                case "consultarUsuarios":
                    json = new Gson().toJson(usuBL.findAll());
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
