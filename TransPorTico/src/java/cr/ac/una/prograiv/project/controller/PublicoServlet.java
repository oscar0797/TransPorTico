/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.project.controller;

import cr.ac.una.prograiv.project.bl.UsuarioBL;
import cr.ac.una.prograiv.project.domain.Usuario;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringReader;
import java.io.StringWriter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.xml.namespace.QName;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Source;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;
import javax.xml.ws.Dispatch;
import javax.xml.ws.Service;
import javax.xml.ws.WebServiceRef;

/**
 *
 * @author Oscar
 */
public class PublicoServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        try {
            Usuario usuario = new Usuario();
            UsuarioBL uBL = new UsuarioBL();
            String accion = request.getParameter("accion");
            Thread.sleep(1000);

            switch (accion) {                
                case "loginUsuario":
                    
                    usuario = uBL.findByNombreUsuario(request.getParameter("nombreUsuario"));
                    if (usuario == null) {
                        out.print("E~Usuario no registrado en el sistema");
                    }
                    if (usuario != null) {
                        if (!usuario.getContrasena1().equals(request.getParameter("contrasena"))) {
                            out.print("E~Usuario o contraseña incorrectoS");
                        } else {
                            HttpSession session = request.getSession(true);
                            session.setAttribute("usuario", usuario);
                            session.setAttribute("nombreUsuario", usuario.getNombreUsuario());
                            session.setAttribute("loginStatus", "login");
                            if (usuario.getTipo() == 1) {
                                session.setAttribute("tipoUsuario", 1);
                                out.print("A~TransPorTico/Administración/Gestion.jsp");
                            } else {
                                session.setAttribute("tipoUsuario", 2);
                                out.print("U~TransPorTico/Servicios/SecciónCliente.jsp");
                            }
                        }
                    }
                    break;
                /*
                case "consultarTipoCambio":
                    QName portQName = new QName("http://ws.sdde.bccr.fi.cr" , "wsIndicadoresEconomicosSoap12");
                    String req = "<ObtenerIndicadoresEconomicosXML  xmlns=\"http://ws.sdde.bccr.fi.cr\"><tcIndicador>317</tcIndicador><tcFechaInicio>20/06/2017</tcFechaInicio><tcFechaFinal>20/06/2017</tcFechaFinal><tcNombre>Compra</tcNombre><tnSubNiveles>N</tnSubNiveles></ObtenerIndicadoresEconomicosXML>";
                    
                    try { // Call Web Service Operation
                        
                        //******************************************************
                        //Consulta del servicio Web
                        //******************************************************
                        Dispatch<Source> sourceDispatch = null;
                        sourceDispatch = service.createDispatch(portQName, Source.class, Service.Mode.PAYLOAD);
                        Source result = sourceDispatch.invoke(new StreamSource(new StringReader(req)));
                        //******************************************************
                        //Convertir la consulta a XML
                        //******************************************************
                        StreamResult xmlOutput=new StreamResult(new StringWriter());
                        Transformer transformer=TransformerFactory.newInstance().newTransformer();
                        transformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount","2");
                        transformer.setOutputProperty(OutputKeys.INDENT,"yes");
                        transformer.transform(result,xmlOutput);
                        
                        String XMLResult = xmlOutput.getWriter().toString();
                        out.print(XMLResult);
                        
                                
                    } catch (Exception ex) {
                        out.print("E~Error a la hora de consultar el SOA");
                    }
                    break;
                 */
                default:
                    out.print("E~No se indicó la acción que se desea realizar");
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
