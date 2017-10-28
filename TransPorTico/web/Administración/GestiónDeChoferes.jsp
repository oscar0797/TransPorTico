<%--
    Document   : GestiónDeChoferes
    Created on : 30/09/2017, 10:32:24 PM
    Author     : greivin
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Gestión Chofers</title>
        <!------------------------------------------------------------------------------------------>
        <!------------- LIBRERIAS BOOTSTRAP----------------------------------------->
        <!------------------------------------------------------------------------------------------>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
        <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">


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
        <script src="../JS/ChoferJS.js" type="text/javascript"></script>
        <script src="../JS/Validaciones.js" type="text/javascript"></script>

    </head>
    <body class="bg-muted">
        <div class="container-fluid"><br>
            <header>
                <div id="mesajeResult" class="row alert  alert-info">
                    <strong id="mesajeResultNeg">Ayuda:</strong>
                    <span id="mesajeResultText">Digite los datos de la empresa y presione agregar</span>
                </div>
            </header>
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
                                <b class="estilo2 center-block">Formulario para el registro de choferes</b>
                            </a>
                        </h5>
                    </div>
                    <div id="collapseOne" class="collapse modal fade" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">

                        <div id="imagenFondos" class="card-body">

                            <button style="color: #FF0101;" data-toggle="collapse" href="#collapseOne" class="close btn-danger" data-dismiss="modal" aria-label="Close"><span>&times;</span></button>
                           <heap id="encabezado">
                                <div class="form-row col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <div class="form-group col-xs-12 col-sm-11 col-md-11 col-lg-11">
                                        <label class="estilo3" ><b>Nota: Es obligatorio que primero verifique su cédula. Campos de caracter obligatorio ( * ).</b></label>
                                    </div>
                                    <div class="form-group col-xs-12 col-sm-1 col-md-1 col-lg-1">
                                        <button data-toggle="collapse" href="#encabezado" class="btn-xs btn-primary" data-dismiss="modal" aria-label="Close">OK</button>
                                    </div>
                                </div>
                            </heap>
                            <form>
                                <div class="form-row col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <div class="form-group col-xs-12 col-sm-4 col-md-4 col-lg-4" id="groupCedula">
                                        <label for="inputCedula">Cédula*</label>
                                        <input type="text" class="form-control" id="inputCedula" autofocus="autofocus" placeholder="Cedula" onpaste="return false" onkeyup="validaNum('inputCedula'), validaTamMax('inputCedula', 10, 'La cantidad máxima de dígitos es 10')" >
                                    </div>
                                    <div class="form-group col-xs-12 col-sm-4 col-md-4 col-lg-4" id="groupNombre">
                                        <label for="inputNombre">Nombre*</label>
                                        <input type="text" class="form-control" id="inputNombre" autofocus="autofocus" placeholder="Nombre" onpaste="return false" onkeyup="validaTamMax('inputNombre', 40, 'La cantidad máxima de dígitos es 40')" onkeypress="return validaSoloTexto(event)">
                                    </div>
                                    <div class="form-group col-xs-12 col-sm-4 col-md-4 col-lg-4" id="groupFechaNacimiento">
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
                                    <div class="form-group col-xs-12 col-sm-4 col-md-4 col-lg-4">
                                        <label for="" >Verifique que la cédula no exista:</label>
                                        <button id="btnVerificar" type="button" class="btn btn-info " onclick="verificaCedulaRegistro('inputCedula', 9, 'La cantidad mínima de dígitos es 9')">Verificar</button>
                                    </div>
                                    <div class="form-group col-xs-12 col-sm-4 col-md-4 col-lg-4" id="groupTipoLicencia">
                                        <label for="inputTipoLicencia">Tipo Lincencia*</label>
                                        <select id="inputTipoLicencia" class="form-control" style="height: 50%;">
                                            <option value="A-1">A-1</option>
                                            <option value="A-2">A-2</option>
                                            <option value="A-3">A-3</option>
                                            <option value="B-1">B-1</option>
                                            <option value="B-2">B-2</option>
                                            <option value="B-3">B-3</option>
                                            <option value="B-4">B-4</option>
                                            <option value="C-1">C-1</option>
                                            <option value="C-2">C-2</option>
                                            <option value="D-1">D-1</option>
                                            <option value="D-2">D-2</option>
                                            <option value="D-3">D-3</option>
                                            <option value="E-1">E-1</option>
                                            <option value="E-2">E-2</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-xs-12 col-sm-4 col-md-4 col-lg-4" id="groupFechaVencimiento">
                                        <label for="inputFechaVencimiento">Vencimiento de la licencia*</label>
                                        <div id="fechaVencimiento" class="input-group date form_date" data-date="" data-date-format="dd/mm/yyyy" data-link-field="dtp_input2" data-link-format="dd/mm/yyyy">
                                            <input class="form-control" type="text" value="" readonly placeholder="dd/mm/aaaa" id="inputFechaVencimiento">
                                            <span class="input-group-addon">
                                                <span class="glyphicon glyphicon-calendar"></span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group estilo2" >
                                    <input type="hidden" value="agregarChofer" id="choferAction"/>
                                    <input type="hidden"  id="choferAux"/>
                                    <button type="submit" class="btn btn-success" onclick="registraChofer()">Guardar</button>
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
                            <p><b>Buscar por nombre de la persona:</b></p>
                        </div>
                        <div class="col-md-4">
                            <div class="">
                                <input type="text" class="form-control" id="buscar" placeholder="Digite el nombre de la persona">
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
                    <table class="table table-hover table-condensed table-responsive table-bordered" id="tablaChoferes"></table>
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
                                                Si confirma la acción, la información no
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
