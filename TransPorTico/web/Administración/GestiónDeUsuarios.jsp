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
        <script src="../JS/UsuarioJS.js" type="text/javascript"></script>
        
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
                                <b>Insertar un nuevo usuario</b>
                            </a>
                        </h5>
                    </div>
                    <div id="collapseOne" class="collapse show" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
                        <div class="card-body">
                            <form>
                                <div class="form-row col-sm-12"> 
                                    <div class="form-group col-sm-4" id="groupUsuario">
                                        <label for="inputNombreUsuario">Nombre de Usuario:</label>
                                        <input type="text" class="form-control" id="inputNombreUsuario" autofocus="autofocus" placeholder="Nombre de Usuario">
                                    </div>
                                    <div class="form-group col-sm-4" id="groupPassword">
                                        <label for="inputContrasena">Contraseña:</label>
                                        <input type="password" class="form-control" id="inputContrasena" autofocus="autofocus" placeholder="Contraseña">
                                    </div>                                
                                    <div class="form-group col-sm-4" id="groupPasswordConfirm">
                                        <label for="inputContrasena">Confirmar Contraseña:</label>
                                        <input type="password" class="form-control" id="inputContrasenaConfirm" autofocus="autofocus" placeholder="Contraseña">
                                    </div>   
                                </div>
                                <div class="form-row col-sm-12">
                                    <div class="form-group col-sm-4" id="groupNombre">
                                        <label for="inputNombre">Nombre:</label>
                                        <input type="text" class="form-control" id="inputNombre" placeholder="Nombre" >
                                    </div>
                                    <div class="form-group col-sm-4" id="groupApellido1">
                                        <label for="inputApellido1">Apellido1:</label>
                                        <input type="text" class="form-control" id="inputApellido1" placeholder="Apellido1">
                                    </div>
                                    <div class="form-group col-sm-4" id="groupApellido2">
                                        <label for="inputApellido1">Apellido2:</label>
                                        <input type="text" class="form-control" id="inputApellido2" placeholder="Apellido2">
                                    </div>
                                </div>
                                <div class="form-row col-sm-12">
                                    <div class="form-group col-sm-4" id="groupCorreo">
                                        <label for="inputCorreo">Correo</label>
                                        <input type="email" class="form-control" id="inputCorreo" autofocus="autofocus" placeholder="Correo">
                                    </div>
                                    <div class="form-group col-sm-2" id="groupTelefono">
                                        <label for="inputTelefono">Teléfono:</label>
                                        <input type="text" class="form-control" id="inputTelefono" autofocus="autofocus" placeholder="Teléfono">
                                    </div>
                                    <div class="form-group col-sm-3" id="groupFechaNacimiento">
                                    <label for="inputFechaNacimiento">Fecha de Nacimiento:</label>
                                    <div id="fechaNacimiento" class="input-group date form_date" data-date="" data-date-format="dd/mm/yyyy" data-link-field="dtp_input2" data-link-format="dd/mm/yyyy">
                                        <input class="form-control" type="text" value="" readonly placeholder="dd/mm/aaaa" id="inputFechaNacimiento">
                                        <span class="input-group-addon">
                                            <span class="glyphicon glyphicon-calendar"></span>
                                        </span>
                                    </div>
                                </div>     
                                    <div class="form-group col-md-3">
                                        <label for="inputTipo" class="col-form-label">Tipo de Usuario</label>
                                        <select id="inputTipo" class="form-control">
                                            <option value="1">Administrador</option>
                                            <option value="2">Chofer</option>
                                            <option value="3">Cliente</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group col-md-12" id="groupdireccion">
                                    <label for="imputDireccion">Direccion</label>
                                    <input type="text" class="form-control" id="imputDireccion" autofocus="autofocus" placeholder="Dirección">
                                </div>
                                <div form-group  >                                                   
                                    <button type="submit" class="btn btn-primary" onclick="registraUsuario()">Guardar</button>
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
                    <table class="table table-hover table-condensed" id="tablaUsuarios">

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