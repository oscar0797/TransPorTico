<%-- 
    Document   : GestiónDeVehículos
    Created on : 21/10/2017, 10:18:29 PM
    Author     : Oscar
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Gestión Vehículos</title>
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
        <script src="../JS/VehiculoJS.js" type="text/javascript"></script>
        <script src="../JS/Validaciones.js" type="text/javascript"></script>
        <script src="../JS/Geolocalizacion.js" type="text/javascript"></script>
        <script src="../JS/Mapa_version_4.js" type="text/javascript"></script>
    </head>
    <body class="bg-muted">
        <div class="container-fluid"><br>
            <!-- ********************************************************** -->
            <!-- MODAL PARA MOSTRAR MENSAJES  -->
            <!-- ********************************************************** -->

            <div  class="modal fade" id="myModal" role="dialog">
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
                        <h5 class="mb-0" >
                            <a data-toggle="collapse" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                <b class="estilo2 center-block">Registrar un nuevo vehículo</b>
                            </a>
                        </h5>
                    </div>
                    <div id="collapseOne" class="collapse modal fade" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
                        <div id="imagenFondos" class="card-body">
                            <button style="color: #FF0101;" data-toggle="collapse" href="#collapseOne" class="close btn-danger" data-dismiss="modal" aria-label="Close"><span>&times;</span></button>
                            <heap id="encabezado">
                                <div class="form-row col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <div class="form-group col-xs-12 col-sm-11 col-md-11 col-lg-11">
                                        <label class="estilo3" ><b>Nota: Es obligatorio que primero verifique la placa del vehículo. Campos de caracter obligatorio ( * ).</b></label>
                                    </div>
                                    <div class="form-group col-xs-12 col-sm-1 col-md-1 col-lg-1">
                                        <button data-toggle="collapse" href="#encabezado" class="btn-xs btn-primary" data-dismiss="modal" aria-label="Close">OK</button>
                                    </div>
                                </div>
                            </heap>
                            <form>
                                <div class="form-row col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <diV class="form-row col-xs-12 col-sm-1 col-md-1 col-lg-1"></diV>
                                    <div class="form-row col-xs-4 col-sm-4 col-md-4 col-lg-4">                                       
                                        <div class="form-group col-xs-12 col-sm-9 col-md-9 col-lg-9" id="groupPlaca">
                                            <label for="inputPlaca">Placa*</label>
                                            <input type="text" class="form-control" id="inputPlaca" autofocus="autofocus" placeholder="Ingrese la placa" onpaste="return false"
                                                   onkeyup="validaTamMax('inputPlaca', 8, 'La cantidad máxima de dígitos es 8')">
                                        </div>
                                        <div class="form-group col-xs-12 col-sm-2 col-md-2 col-lg-2">
                                            <label style="height: 30%; align-content: rigth;" ></label>
                                            <button id="btnVerificar" type="button" class="btn btn-info " onclick="verificaPlaca('inputPlaca', 10, 'La cantidad mínima de dígitos es 10')">Verificar</button>
                                        </div>
                                        <div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12" id="groupContrasena2">
                                            <label for="inputModelo">Modelo*</label>
                                            <input type="text" class="form-control" id="inputModelo" autofocus="autofocus" placeholder="Ingrese el modelo" onpaste="return false"
                                                   onkeyup="validaTamMax('inputModelo', 20, 'La cantidad máxima de dígitos es 20')">
                                        </div>                                                                                                                                              
                                        <div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12" id="groupAno">
                                            <label for="inputAno">Año*</label>
                                            <input type="number" class="form-control" id="inputAno" autofocus="autofocus" placeholder="Año del vehículo" onpaste="return false"
                                                   onkeyup="validaNum('inputAno'), validaTamMax('inputContrasena1', 4, 'La cantidad máxima de dígitos es 4')">
                                        </div>
                                        <div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12" id="groupColor">
                                            <label for="inputColor">Color*</label>
                                            <input type="text" class="form-control" id="inputColor" autofocus="autofocus" placeholder="Color del vehículo" onpaste="return false"
                                                   onkeyup="validaTamMax('inputColor', 40, 'La cantidad máxima de dígitos es 40')" onkeypress="return validaSoloTexto(event)">
                                        </div>

                                    </div>
                                    <diV class="form-row col-xs-12 col-sm-1 col-md-1 col-lg-1">
                                        <input type="hidden" id="UbicacionX" value="1">
                                        <input type="hidden" id="UbicacionY" value="1">
                                    </diV>
                                    <diV class="form-row col-xs-12 col-sm-1 col-md-1 col-lg-1"></diV>
                                    
                                    <div class="form-row col-xs-12 col-sm-5 col-md-5 col-lg-5">
                                        <div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12" id="groupUbicacion">
                                            <label for="inputUbicacion">Ubicación*</label>
                                            <div id="Mi_mapa_4"></div>
                                            <div class="input-group">                                               
                                                <input type="text" class="form-control" id="inputUbicacion" autofocus="autofocus" placeholder="Presione el botón → " size="100%" 
                                                       onkeyup="validaTamMax('inputUbicacion', 100, 'La cantidad máxima de dígitos es 100')" onkeypress="return validaSoloTexto(event)">
                                                <span id="Obtener_ubicacion" class="input-group-addon">
                                                    <span class="glyphicon glyphicon-screenshot" onclick="Obtener_ubicacion( )"></span>
                                                </span>
                                            </div>
                                        </div>

                                    </div>                                    
                                </div>
                                <div class="form-group estilo2" >
                                    <input type="hidden" value="agregarVehiculo" id="vehiculoAction"/> 
                                    <input type="hidden"  id="vehiculoAux"/>
                                    <button type="submit" class="btn btn-success" onclick="registrarVehiculo()">Guardar</button>                                    
                                    <button type="submit" class="btn btn-danger" data-toggle="collapse" href="#collapseOne">Cancelar</button>
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
                <div class="card-header">
                    <div class="form-row">
                        <div class="col-md-4">
                            <p><b>Buscar por placa del vehículo:</b></p>
                        </div>
                        <div class="col-md-4">
                            <div class="">
                                <input type="text" class="form-control" id="buscar" placeholder="Por favor, digite la placa del vehículo">
                            </div>
                        </div>
                        <div class=col-md-4">
                            <button type="button" onclick="busquedaChoferes()" class="btn btn-info center-block"  id="btMostarForm">
                                Buscar <span class="glyphicon glyphicon-search"></span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body" id="imagenFondoo">
                    <table class="table table-hover table-condensed table-responsive table-bordered" id="tablaVehiculos"></table>
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
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
                                            <button class="btn btn-danger btn-ok" id="eliminar" value="" data-dismiss="modal">Eliminar</button>
                                        </div>
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
