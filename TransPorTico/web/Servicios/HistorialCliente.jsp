<%-- 
    Document   : HistorialCliente
    Created on : 09/11/2017, 09:32:22 PM
    Author     : Oscar
--%>

<%@page import="cr.ac.una.prograiv.project.domain.Usuario"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%
    HttpSession sesion = request.getSession(true);
    Integer tipoUsuario = 0;
    Usuario usuario = null;
    if (sesion != null) {
        if (sesion.getAttribute("usuario") == null) {
        } else {
            tipoUsuario = (Integer) sesion.getAttribute("tipoUsuario");
            usuario = (Usuario) sesion.getAttribute("usuario");
        }
    }
%>
<!DOCTYPE html>
<html>
    <head>
        <title>Servicios</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBe7lRExeChAWuRiEpRkE-l8aldatSkkAw&libraries=places"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link href="../CSS/CSS_Servicio.css" rel="stylesheet" type="text/css"/>  
        

        <script src="../JS/datetimepicker.js" type="text/javascript"></script>
        <script src="../JS/Geolocalizacion.js" type="text/javascript"></script>
        <script src="../JS/Mapa_de_usuario.js" type="text/javascript"></script>
        <script src="../JS/utils.js" type="text/javascript"></script>
        <script src="../JS/Servicio.js" type="text/javascript"></script>
        <script src="../JS/Publico.js" type="text/javascript"></script>        
        <script src="../JS/UsuarioJS.js" type="text/javascript"></script>
        <script src="../JS/Validaciones.js" type="text/javascript"></script>
    </head>
    <body id="imagenFondoServicio">
        <div class="container">
            <div id="sesionContent" class="collapse modal fade">
                <button style="color: #FF0101;" data-toggle="collapse" href="#collapseOne" class="close btn-danger" data-dismiss="modal" aria-label="Close"><span>&times;</span></button>
                <p><b>Usuario :</b> <% out.print(usuario.getNombreUsuario()); %></p>
                <p><b>Nombre :</b> <% out.print(usuario.getNombre() + " " + usuario.getApellido1() + " " + usuario.getApellido2()); %></p>
                <p><b>Teléfono :</b> <% out.print(usuario.getTelefono()); %></p>
                <p><b>Correo :</b> <% out.print(usuario.getCorreo());%></p>
                <a href="../SecciónPública/Inicio.jsp" class="center-block"><button type="button" class="btn btn-danger" > Cerrar sesión</button></a> 
            </div>
        </div>   
        <div id="encabezado">
            <h1>
                Trans~Por~Tico
            </h1>
            <img class="img-circle" src="../Imágenes/Inicio/mundo.gif" alt=""/>
        </div>
        <div id="navBar">
            <nav class="navbar navbar-inverse" role="navigation">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-exl-collapse">
                        <span class="sr-only">Desplegar navegación</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                </div>
                <div class="collapse navbar-collapse navbar-ex1-collapse img-responsive">
                    <ul class="nav navbar-nav">       
                        <li><a href="SecciónCliente.jsp" class="btn-lg glyphicon glyphicon"><b>Servicio</b></a></li>
                        <li class="active"><a href="HistorialCliente.jsp" class="btn-lg glyphicon glyphicon"> Historial</a></li>
                    </ul>
                    <div id="modalCliente" class=" col-sm-2 col-md-2 col-lg-2" border="2px">
                        <a data-toggle="collapse" href="#sesionContent" aria-expanded="true" aria-controls="sesionContent">
                            <p class="estilo2 btn-warning btn-lg "><span class="glyphicon glyphicon-user"></span>Usuario Actual</p>                                    
                        </a>
                    </div>                     
                </div>
            </nav>
        </div>
        <table class="table-bordered">
            <lu>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </lu>
            <lu>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </lu>
            <lu>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </lu>
            <lu>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </lu>
            <lu>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </lu>
        </table>
        <!-- ********************************************************** -->
        <!-- MODAL FORMULARIO REGISTRO -->
        <!-- ********************************************************** -->
        <div class="container">
            <div class="modal fade" id="myModalRegistro"  role="dialog">
                <div class="modal-dialog" style="width: 80%;">
                    <div class="modal-content">
                        <div class="modal-header fondoForm">
                            <button class="close btn-danger" data-dismiss="modal" aria-label="Close"><span>&times;</span></button>
                            <h1 class="modal-title" id="myModalTitle"><b>Registro de Usuario</b></h1>
                        </div>
                        <div class="modal-body" id="myModalMessage">
                            <form role="form" onsubmit="return false;" id="formRegistro">
                                <div class=" form-row text-left form-row col-xs-12 col-sm-12 col-md-12 col-lg-12" id="contenidoForm">
                                    <div class="form-row col-xs-12 col-sm-8 col-md-8 col-lg-8">
                                        <div class="form-row col-xs-12 col-sm-12 col-md-12 col-lg-12"> 
                                            <div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6" id="groupNombreUsuario">
                                                <label for="inputNombreUsuario">Nombre de Usuario*</label>
                                                <input type="text" class="form-control" id="inputNombreUsuario" autofocus="autofocus" placeholder="Nombre de usuario" onpaste="return false"
                                                       onkeyup="validaTamMax('inputNombreUsuario', 20, 'La cantidad máxima de dígitos es 20')" onkeypress="return validaSoloTexto(event)">
                                            </div>                                          
                                            <div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6" id="groupTipo">                                                                                                                               
                                                <label class="col-form-label">Verifique el nombre de usuario*</label>
                                                <button id="btnVerificar" type="button" class="text-center btn btn-info " onclick="verificaNombreUsuario('inputNombreUsuario', 3, 'La cantidad mínima de dígitos es 3')">Verificar</button>                                                                                                                                            
                                            </div>
                                        </div>
                                        <div class="form-row col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                            <div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6" id="groupContrasena1">
                                                <label for="inputContrasena1">Contraseña*</label>
                                                <input type="password" class="form-control" id="inputContrasena1" autofocus="autofocus" placeholder="Ingrese una contraseña" onpaste="return false"
                                                       onkeyup="validaTamMax('inputContrasena1', 30, 'La cantidad máxima de dígitos es 30')">
                                            </div>
                                            <div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6" id="groupContrasena2">
                                                <label for="inputContrasena2">Confirmar Contraseña*</label>
                                                <input type="password" class="form-control" id="inputContrasena2" autofocus="autofocus" placeholder="Repita la contraseña" onpaste="return false"
                                                       onkeyup="validaTamMax('inputContrasena2', 30, 'La cantidad máxima de dígitos es 30')">
                                            </div>
                                        </div>
                                        <div class="form-row col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                            <div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6" id="groupNombre">
                                                <label for="inputNombre">Nombre*</label>
                                                <input type="text" class="form-control" id="inputNombre" placeholder="Nombre" onpaste="return false" 
                                                       onkeyup="validaTamMax('inputNombre', 25, 'La cantidad máxima de dígitos es 25')" onkeypress="return validaSoloTexto(event)">
                                            </div>                                
                                            <div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6" id="groupFechaNacimiento">
                                                <label for="inputFechaNacimiento">Fecha de Nacimiento*</label>
                                                <div id="fechaNacimiento" class="input-group date form_date" data-date="" data-date-format="dd/mm/yyyy" data-link-field="dtp_input2" data-link-format="dd/mm/yyyy">
                                                    <input class="form-control" type="text" value="" readonly placeholder="dd/mm/aaaa" id="inputFechaNacimiento">
                                                    <span class="input-group-addon">
                                                        <span class="glyphicon glyphicon-calendar"></span>
                                                    </span>
                                                </div>                
                                            </div>   
                                        </div>
                                        <div class="form-row col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                            <div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6" id="groupApellido1">
                                                <label for="inputApellido1">Apellido1*</label>
                                                <input type="text" class="form-control" id="inputApellido1" placeholder="Primer apellido" onpaste="return false" 
                                                       onkeyup="validaTamMax('inputApellido1', 25, 'La cantidad máxima de dígitos es 25')" onkeypress="return validaSoloTexto(event)">  
                                            </div>
                                            <div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6" id="groupTelefono">
                                                <label for="inputTelefono">Teléfono*</label>
                                                <input type="text" class="form-control" id="inputTelefono" autofocus="autofocus" placeholder="Teléfono" onpaste="return false" 
                                                       onkeyup="validaNum('inputTelefono'), validaTamMax('inputTelefono', 8, 'La cantidad máxima de dígitos es 8')">
                                            </div>
                                        </div>
                                        <div class="form-row col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                            <div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6" id="groupApellido2">
                                                <label for="inputApellido1">Apellido2*</label>
                                                <input type="text" class="form-control" id="inputApellido2" placeholder="Segundo apellido" onpaste="return false" 
                                                       onkeyup="validaTamMax('inputApellido2', 25, 'La cantidad máxima de dígitos es 25')" onkeypress="return validaSoloTexto(event)">
                                            </div>     
                                            <div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6" id="groupCorreo">
                                                <label for="inputCorreo">Correo*</label>
                                                <input type="email" class="form-control" id="inputCorreo" autofocus="autofocus" placeholder="Ingrese su correo" onkeyup="validaTamMax('inputApellido2', 50, 'La cantidad máxima de dígitos es 50')">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-row col-xs-12 col-sm-4 col-md-4 col-lg-4">
                                        <div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12" id="groupDireccion">
                                            <label for="inputDireccion">Dirección*</label>
                                            <div id="Mapa_de_usuario"></div>
                                            <div class="input-group">                                               
                                                <input type="text" class="form-control" id="inputDireccion" autofocus="autofocus" placeholder="Presione el botón → " size="100%" 
                                                       onkeyup="validaTamMax('inputDireccion', 100, 'La cantidad máxima de dígitos es 100')" onkeypress="return validaSoloTexto(event)">
                                                <span id="Obtener_ubicacion" class=" input-group-addon">
                                                    <span class="active glyphicon glyphicon-screenshot" onclick="Obtener_ubicacion( )"></span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <input type="hidden" id="inputTipo" value="2"> 
                                    <input type="hidden" value="agregarUsuario" id="usuarioAction"/> 
                                    <input type="hidden"  id="usuarioAux"/>
                                    <button type="submit" class="btn btn-success" onclick="registraUsuario()">Guardar</button>                                   
                                    <button type="reset" class="btn btn-danger" id="cancelar" onclick="limpiarForm()" data-dismiss="modal">Cancelar</button>
                                </div>                               
                                <div class="form-group height25" >
                                    <div class="alert alert-success hiddenDiv" id="mensajeAlert">
                                        <strong id="mesajeResultNeg">Info!</strong> 
                                        <span  id="mesajeResultText">Este cuadro de alerta podría indicar un cambio informativo neutro o una acción.</span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ********************************************************** -->
        <!-- MODAL INGRESO LOGIN -->
        <!-- ********************************************************** -->
        <div class="container">
            <!-- Modal -->
            <div class="modal fade" id="myModalIngreso" role="dialog">
                <div class="modal-dialog modal-sm">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <form class="form-horizontal" role="form" id="formLogin">
                            <div class="modal-header fondoForm">
                                <button class="close btn-danger" data-dismiss="modal" aria-label="Close"><span>&times;</span></button>
                                <h2 class="text-center colorBlanco modal-title"><b>Login</b></h2>
                            </div>
                            <div class="form-group">
                                <div>
                                    <img src="../Imágenes/Inicio/user-login-man-person-512.png" alt="" class="userIngreso"/>
                                </div>
                            </div>
                            <div>
                                <div class="row">   
                                    <div class="col-sm-2"></div>
                                    <div class="input-group form-group col-sm-8" id="groupNombreUsuario">
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                                        <input type="text" id="inputNombreUsuario" class="form-control" placeholder="Nombre de Usuario">
                                    </div>
                                    <div class="col-sm-4"></div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-2"></div>
                                    <div class="input-group form-group col-sm-8" id="groupContrasena">
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                                        <input id="inputContrasena" type="password" class="form-control" name="password" placeholder="Contraseña">
                                    </div>
                                    <div class="col-sm-4"></div>
                                </div>
                            </div>
                            <div class="form-group login" >
                                <button type="button" class="btn btn-primary" onclick="enviar()" data-dismiss="modal">Ingresar</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal" onclick="limpiarForm()">Cancelar</button>
                            </div>
                            <div class="form-group" >
                                <div class="alert alert-success " id="mesajeLogin">
                                    <strong class="mesajeResultNeg">Info!</strong> 
                                    <span class="mesajeResultText">Este cuadro de alerta podría indicar un cambio informativo neutro o una acción.</span>
                                </div>
                            </div>
                        </form> 
                    </div>
                </div>
            </div>
        </div>
        <br></br>
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
