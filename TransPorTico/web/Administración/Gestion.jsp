
<%-- 
    Document   : Gestion
    Created on : 05/10/2017, 04:49:52 AM
    Author     : Oscar
--%>

<%@page import="cr.ac.una.prograiv.project.domain.Usuario"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%
    HttpSession sesion = request.getSession(true);
        Integer tipoUsuario = 0;
    Usuario usuario = null;
    if(sesion!=null){
        if (sesion.getAttribute("usuario")  == null) {
        }else{
            tipoUsuario = (Integer)sesion.getAttribute("tipoUsuario");
            usuario = (Usuario)sesion.getAttribute("usuario");
        }
    }else{        
        response.sendRedirect("../SecciónPública/Inicio.jsp");
    }
%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title >Administración</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <link href="http://fonts.googleapis.com/css?family=Cookie" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link href="../CSS/CSSAdministración.css" rel="stylesheet" type="text/css"/>
        <script src="../JS/Gestión.js" type="text/javascript"></script>
        <link href="../Imágenes/Inicio/mundo.gif" rel="icon">
        <meta charset="utf-8">
    </head>
    <body >
        <div  class="container-fluid FondoTB">
            <h2 class="TB hidden-xs">ADMINISTRACIÓN</h2> 
            <!--<img class="img-circle" src="../Imágenes/Inicio/mundo.gif" alt=""/> -->
        </div>
        <div class="container-fluid fondo">
            <div class="row">
                <div class="col-sm-2 padding-0" >
                    <div class="float-left">
                        <div class="sidebar-nav">
                            <div class="navbar" role="navigation">
                                <div class="navbar-header">
                                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".sidebar-navbar-collapse">
                                        <span class="sr-only">Opciones de administración</span>
                                        <span class="icon-bar"></span>
                                        <span class="icon-bar"></span>
                                        <span class="icon-bar"></span>
                                    </button>
                                    <span class="visible-xs navbar-brand">Administración</span>
                                </div>
                                <div class="navbar-collapse collapse sidebar-navbar-collapse col-sm-2">
                                    <ul class="nav navbar-nav ">
                                        <li class="active" title="En este apartado puede gestionar todo lo relacionado a los usuarios"> <a href="GestiónDeUsuarios.jsp"target="frame" ><span class="glyphicon glyphicon-user"></span>  Gestión de Usuarios</a></li>
                                        <li class="active" title="En este apartado puede gestionar todo lo relacionado a los chofere"> <a href="GestiónDeChoferes.jsp"target="frame" ><span class="glyphicon glyphicon-user"></span>  Gestión de Choferes</a></li>
                                        <li class="active" title="En este apartado puede gestionar todo lo relacionado a los vehículos"> <a href="GestiónDeVehículos.jsp"target="frame" ><span class="fa fa-car"></span>  Gestión de Vehículos</a></li>
                                        <li class="active" title="En este apartado puede gestionar todo lo relacionado a los historiales"> <a href="GestiónDeHistoriales.jsp"target="frame" ><span class="fa fa-file-text"></span>  Gestión de Viajes</a></li>
                                    </ul>
                                </div><!--/.nav-collapse -->
                            </div>
                        </div>
                    </div>
                    <img class=" float-left padding-0 nav navbar-nav row image hidden-xs img-responsive" src="../Imágenes/Inicio/llanta.PNG" alt="" /> 
                    <p class=" float-left padding-0 nav navbar-nav col-xs-1 col-sm-1 col-md-2 col-lg-2 row hidden-xs TB1 img-responsive"><b>Trans~Por~Tico</b></p> 
                </div>
                <div class="col-sm-10 padding-0 ">  
                    <iframe class="embed-responsive-item" scrolling="yes" frameBorder="2" name="frame" src= "GestiónDeUsuarios.jsp" style=" width: 100%; height: 800px;  overflow: hidden;"> </iframe>
                </div>
            </div>
        </div>

<footer>
    <div class="container-fluid pie">
        <div class="row">
            <br>
            <p class="text-center aum2">SÍGUENOS TAMBIÉN AQUÍ</p>
            <p class="text-center aum"><i class="fa">&#xf230;</i> <i class="fa">&#xf081;</i> <i class="fa">&#xf16d;</i> <i class="fa">&#xf2c6;</i> <i class="fa">&#xf0d5;</i></p>
            <p class="text-center">Copyright <i class="fa">&#xf1f9;</i> 2017 Trans~Por~Tico, aviso legal y política de privacidad y de aflición</p>
            <p class="text-center">Estamos a su disposición, contáctenos al 8998-9889 ó ingrese a www.TransPortTico.com</p>
        </div>
    </div>
</footer>
</body>
</html>
