<%-- 
    Document   : GestiónDeUsuario
    Created on : 30/09/2017, 10:33:32 PM
    Author     : Oscar
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Gestión Usuarios</title>
        <!------------------------------------------------------------------------------------------>
        <!------------- LIBRERIAS BOOTSTRAP----------------------------------------->
        <!------------------------------------------------------------------------------------------>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
        <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"> 
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBe7lRExeChAWuRiEpRkE-l8aldatSkkAw&libraries=places"></script>


        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>       

        <!------------------------------------------------------------------------------------------>
        <!------------- ARCHIVOS CSS----------------------------------------->
        <!------------------------------------------------------------------------------------------>
        <link href="../CSS/CSSAdministración.css" rel="stylesheet" type="text/css"/>
        <link href="../CSS/datetimepicker.min.css" rel="stylesheet" type="text/css"/>       
        <!------------------------------------------------------------------------------------------>
        <!------------- ARCHIVOS JS----------------------------------------->
        <!------------------------------------------------------------------------------------------>

        <script src="../JS/datetimepicker.js" type="text/javascript"></script>
        <script src="../JS/utils.js" type="text/javascript"></script>
        <script src="../JS/Publico.js" type="text/javascript"></script>
        <script src="../JS/UsuarioJS.js" type="text/javascript"></script>
        <script src="../JS/Validaciones.js" type="text/javascript"></script>
        <script src="../JS/Geolocalizacion.js" type="text/javascript"></script>
        <script src="../JS/Mapa_de_usuario.js" type="text/javascript"></script>

    </head>
    <body class="bg-muted">
        <div class="container-fluid"><br>
            <!-- ********************************************************** -->
            <!-- MODAL PARA MOSTRAR MENSAJES  -->
            <!-- ********************************************************** -->

            <div class="modal fade" id="myModal" role="dialog">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title" id="myModalTitle">Modal Header</h4>
                        </div>
                        <div class="modal-body" id="myModalMessage">
                            <p>This is a small modal.</p>
                        </div>
                    </div>
                </div>
            </div>

            <!------------------------------------------------------------------------------------------>
            <!------------- ACORDION FORMULARIO  USUARIO----------------------------------------->
            <!------------------------------------------------------------------------------------------>
            <div id="accordion" role="tablist">
                <div id="imagenFondo" class="card ">
                    <div class="card-header" role="tab" id="headingOne">
                        <div class="form-row align-top col-sm-12 col-md-12 col-lg-12">
                            <div  class="col-sm-4 col-md-4 col-lg-4"> 
                                <span class="glyphicon glyphicon-plus"></span>
                                <a data-toggle="collapse" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne" onClick="Dibujar_un_mapa( )">
                                    <b class="estilo2 btn-success btn-sm ">Registrar un nuevo usuario</b>                                    
                                </a>       
                            </div>
                            <div  class=" text-right col-sm-4 col-md-4 col-lg-4">
                                <p>Buscar por nombre de usuario:</p>
                            </div>
                            <div class="col-sm-3 col-md-3 col-lg-3">                               
                                <input style="width: 100%" type="text" class="form-control" id="buscar" placeholder="Nombre de usuario" >
                            </div>
                            <div class="col-md-1">
                                <button type="button"  class="btn btn-info center-block"  id="btMostarForm" onclick="buscarUsuario()">
                                    <b>Buscar</b> <span class="glyphicon glyphicon-search"></span></button>
                            </div>
                        </div>
                    </div>
                    <div id="collapseOne" class="collapse modal fade" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
                        <div id="imagenFondos" class="card-body">
                            <button style="color: #FF0101;" data-toggle="collapse" href="#collapseOne" class="close btn-danger" data-dismiss="modal" aria-label="Close"><span>&times;</span></button>
                           <!-- <heap id="encabezado">
                                <div class="form-row col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <div class="form-group col-xs-12 col-sm-11 col-md-11 col-lg-11">
                                        <label class="estilo3" ><b>Nota: Es obligatorio que primero verifique su nombre de usuario. Campos de caracter obligatorio ( * ).</b></label>
                                    </div>
                                    <div class="form-group col-xs-12 col-sm-1 col-md-1 col-lg-1">
                                        <button data-toggle="collapse" href="#encabezado" class="btn-xs btn-primary" data-dismiss="modal" aria-label="Close">OK</button>
                                    </div>
                                </div>
                            </heap>-->
                            <form>                                
                                <div class="form-row col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <div class="form-row col-xs-12 col-sm-8 col-md-8 col-lg-8">
                                        <div class="form-row col-xs-12 col-sm-12 col-md-12 col-lg-12"> 
                                            <div class="form-group col-xs-12 col-sm-4 col-md-4 col-lg-4" id="groupNombreUsuario">
                                                <label for="inputNombreUsuario">Nombre de Usuario*</label>
                                                <input type="text" class="form-control" id="inputNombreUsuario" autofocus="autofocus" placeholder="Ingrese un nombre de usuario" onpaste="return false" onkeyup="validaTamMax('inputNombreUsuario', 20, 'La cantidad máxima de dígitos es 20')" onkeypress="return validaSoloTexto(event)">
                                            </div>
                                            <div class="form-group col-xs-12 col-sm-2 col-md-2 col-lg-2">
                                                <label style="height: 70%;"></label>
                                                <button id="btnVerificar" type="button" class="btnVerificar btn btn-info " onclick="verificaNombreUsuario('inputNombreUsuario', 3, 'La cantidad mínima de dígitos es 3')">Verificar</button>
                                            </div>

                                            <div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6" id="groupTipo">
                                                <label for="inputTipo" class="col-form-label" >Seleccione el Tipo de Usuario*</label>
                                                <select id="inputTipo" class="form-control" style="height: 50%;">
                                                    <option value="1">Administrador</option>
                                                    <option value="2">Cliente</option>
                                                </select>
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
                                                <span id="Obtener_ubicacion" class="input-group-addon">
                                                    <span class="glyphicon glyphicon-screenshot" onclick="Obtener_ubicacion( )"></span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group estilo2">      
                                    <input type="hidden" value="agregarUsuario" id="usuarioAction"/> 
                                    <input type="hidden"  id="usuarioAux"/>
                                    <button type="submit" class="btn btn-success" onclick="registraUsuario()">Guardar</button>                                    
                                    <button type="submit" class="btn btn-danger" data-toggle="collapse" href="#collapseOne">Cancelar</button>
                                </div>
                                <div class="form-group estiloAlertaPieForm" >
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

            <!------------------------------------------------------------------------------------------>
            <!------------- TABLA DATOS  USUARIO----------------------------------------->
            <!------------------------------------------------------------------------------------------>

            <div class="card bg-light mb-3" style="max-width: 100%;">
               <div><br></div>
                <div class="card-body" id="imagenFondoo">
                    <table class="table table-hover table-condensed table-responsive table-bordered" id="tablaUsuarios"></table>
                </div>
                <div class="card-footer">
                    <li class="pagination pagination-sm"  align-content="center" id="paginacionOpc"></ul>
                </div>
            </div>
            <!-- ********************************************************** -->
            <!-- MODAL CONFIRMACIÓN ELIMINAR UN USUARIO -->
            <!-- ********************************************************** -->
            <div id="topModal">
                <div class="modal fade" id="confirm-delete" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">

                                <h4><b>Confirmación de borrado</b><h4>
                                        </div>
                                        <div class="modal-body">
                                            <p>
                                                Si confirma la acción la información no
                                                <br>
                                                podrá ser recuperada.
                                                <br><br>
                                                Desea confirmar la eliminación de 
                                                <span id="nombreEliminar">

                                                </span>
                                                ?
                                            </p>
                                        </div>
                                        <div class="modal-footer form-group estilo2">
                                            <button type="button" class="btn btn-success" data-dismiss="modal">Cancelar</button>
                                            <button class="btn btn-danger btn-ok" id="eliminar" value="" data-dismiss="modal">Confirmar</button>
                                        </div>
                                        </div>
                                        </div>
                                        </div>
                                        </div>
                                        </div>

                                        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
                                        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1" crossorigin="anonymous"></script>
                                        </body>
                                        </html>
