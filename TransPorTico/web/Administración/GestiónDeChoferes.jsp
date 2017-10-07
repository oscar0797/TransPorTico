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
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
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

    </head>
    <body class="bg-success">
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
                <div class="card">
                    <div class="card-header" role="tab" id="headingOne">
                        <h5 class="mb-0">
                            <a onclick="desactivaForm();" data-toggle="collapse" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                <b>Insertar un nuevo chofer</b>
                            </a>
                        </h5>
                    </div>
                    <div id="collapseOne" class="collapse show" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
                        <div class="card-body">
                            <form>
                                <div class="form-row col-sm-12"> 
                                    <div class="form-group col-sm-6" id="groupCedula">
                                        <label for="inputCedula">Cedula:</label>
                                        <input type="text" class="form-control" id="inputCedula" autofocus="autofocus" placeholder="Cedula">
                                    </div>
                                    <div class="form-group col-sm-6" id="groupNombre">
                                        <label for="inputNombre">Nombre:</label>
                                        <input type="text" class="form-control" id="inputNombre" autofocus="autofocus" placeholder="Nombre">
                                    </div>            
                                </div>
                                <div class="form-row col-sm-12">
                                    <div class="form-group col-sm-6" id="groupTipoLicencia">
                                        <label for="inputTipoLicencia">Tipo Lincencia:</label>
                                        <select id="inputTipoLicencia" class="form-control">
                                            <option value="1">B-1</option>
                                            <option value="2">B-2</option>
                                            <option value="3">B-3</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-sm-6" id="groupUltimoUsuario">
                                        <label for="inputUltimoUsuario">Ultimo Usuario:</label>
                                        <input type="text" class="form-control" id="inputUltimoUsuario" autofocus="autofocus" placeholder="Ultimo Usuario">
                                    </div>
                                </div>
                                <div>
                                    <div class="form-group col-sm-4" id="groupFechaNacimiento">
                                        <label for="inputFechaNacimiento">Fecha de Nacimiento:</label>
                                        <div id="fechaNacimiento" class="input-group date form_date" data-date="" data-date-format="dd/mm/yyyy" data-link-field="dtp_input2" data-link-format="dd/mm/yyyy">
                                            <input class="form-control" type="text" value="" readonly placeholder="dd/mm/aaaa" id="inputFechaNacimiento">
                                            <span class="input-group-addon">
                                                <span class="glyphicon glyphicon-calendar"></span>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="form-group col-sm-4" id="groupFechaVencimiento">
                                        <label for="inputFechaVencimiento">Vencimiento Licencia :</label>
                                        <div id="fechaVencimiento" class="input-group date form_date" data-date="" data-date-format="dd/mm/yyyy" data-link-field="dtp_input2" data-link-format="dd/mm/yyyy">
                                            <input class="form-control" type="text" value="" readonly placeholder="dd/mm/aaaa" id="inputFechaNacimiento">
                                            <span class="input-group-addon">
                                                <span class="glyphicon glyphicon-calendar"></span>
                                            </span>
                                        </div>
                                    </div>
                                    </div>
                                <div form-group  >                                                   
                                    <button type="submit" class="btn btn-primary" onclick="registraChofer()">Guardar</button>
                                    <button type="submit" class="btn btn-success">Limpiar</button>
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

            <div class="bg-success" class="card bg-light mb-3" style="max-width: 100%;">
                <div class="card-header">
                    <div class="form-row">
                        <div class="col-md-3">
                            <p>Buscar por nombre de la Persona:</p>
                        </div>
                        <div class="col-md-4">
                            <div class="">
                                <input type="text" class="form-control" id="buscar" placeholder="Digite el nombre de la persona">
                            </div>
                        </div>
                        <button type="button" onclick="busquedaPersonas()" class="btn btn-info centered"  id="btMostarForm">
                            Buscar <span class="glyphicon glyphicon-search"></span>
                        </button>
                    </div>
                </div>
                <div class="card-body" style="background: white;">
                    <table class="table table-hover table-condensed" id="tablaChofers">

                    </table>
                </div>
                <div class="card-footer">
                    <ul class="justify-content-center" id="paginacionOpc"></ul>
                </div>
            </div>       
        </div>
        <div class="container-fluid bg-muted"></div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1" crossorigin="anonymous"></script>
    </body>
</html>
