<%-- 
    Document   : QuienesSomos
    Created on : 30/09/2017, 03:32:19 PM
    Author     : Oscar
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Quienes somos</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBe7lRExeChAWuRiEpRkE-l8aldatSkkAw&libraries=places"></script>
        <link href="../CSS/CSSPúblico.css" rel="stylesheet" type="text/css"/>
        <link href="../CSS/datetimepicker.min.css" rel="stylesheet" type="text/css"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

        <script src="../JS/datetimepicker.js" type="text/javascript"></script>
        <script src="../JS/Geolocalizacion.js" type="text/javascript"></script>
        <script src="../JS/Mapa_de_usuario.js" type="text/javascript"></script>
        <script src="../JS/utils.js" type="text/javascript"></script>
        <script src="../JS/Publico.js" type="text/javascript"></script>
        <script src="../JS/UsuarioJS.js" type="text/javascript"></script>
        <script src="../JS/Validaciones.js" type="text/javascript"></script>
    </head>
    <body id="imagenFondo">
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

        <div id="encabezado">
            <h1>Trans~Por~Tico</h1>           
            <img class="img-circle" src="../Imágenes/Inicio/mundo.gif" alt=""/>            
        </div>

        <!-- ********************************************************** -->
        <!-- MENU -->
        <!-- ********************************************************** -->

        <div id="navBar">
            <nav class="navbar navbar-inverse" role="navigation">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse"
                            data-target=".navbar-ex1-collapse">
                        <span class="sr-only">Desplegar navegación</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                </div>
                <div class="collapse navbar-collapse navbar-ex1-collapse img-responsive">
                    <ul class="nav navbar-nav"> 
                        <li><a href="Inicio.jsp" class="btn-lg glyphicon glyphicon-home">Inicio</a></li>
                        <li class="active"><a class=" btn-lg glyphicon" href="QuienesSomos.jsp"><b>Quiénes Somos</b></a></li>
                        <li><a class="btn-lg glyphicon" href="Contacto.jsp">Contacto</a></li>
                    </ul>
                    <div class="nav navbar-nav navbar-right" id="menuLogSign">
                        <button type="button" class="btn-lg btn-primary glyphicon glyphicon-user" data-toggle="modal" data-target="#myModalRegistro"> Registrarse</button>
                        <button type="button" class="btn-lg btn-primary glyphicon glyphicon-log-in" data-toggle="modal" data-target="#myModalIngreso"> Entrar</button>
                    </div>
                </div>
            </nav> <!--Navbar-->
        </div>
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
        <!-- informacion -->
        <!-- ********************************************************** -->
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <p id="divSubtitulos">Visión</p>                          
                <p class="textoo">
                    Ser lideres a nivel mundial en el servicio de transporte
                    ,además, ofrecer las mejores tarifas.
                </p>
            </div>
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                <p id="divSubtitulos">Misión</p>
                <p class="textoo">
                    Transportar a las personas y contribuir a la integracion y al desarrollo
                    económico y social de los países.
                </p>
                <br></br>
            </div>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4" >
                <img class=" img-rounded img-responsive center-block" src="../Imágenes/Inicio/SJ.jpg" alt=""/>
            </div>          
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                <p id="divSubtitulos">Quiénes Somos</p>
                <p class="textoo">
                    Trans~por~tico, nace con la clara vocación de dar el
                    mejor servicio a nuestros clientes. La gestación del proyecto
                    es fruto de meses de trabajo, pensando en las nesecidades
                    de nuestros clientes. Y así ofrecerles una página fresca y sencill,
                    que cumpla con las nesecidades de nuestros clientes.
                </p>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                <img class="img-rounded img-responsive center-block" src="../Imágenes/Inicio/CostaRicaEstadio.jpg" alt=""/>
                <br></br>
            </div>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                <p id="divSubtitulos">De dónde venimos</p>            
                <p class="textoo">
                    Nuestra experencia en el sector nos ha llevado a arrancar
                    este nuevo proyecto, en el cual, participamos profecionales
                    con una gran experencia en atención al cliente. 
                </p>
            </div>
            <div  class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                <p id="divSubtitulos">A dónde vamos</p>
                <p class="textoo">
                    Nuestra meta es, conseguir que nuestros clientes 
                    adocten y se familiaricen con las nuevas tecnologías 
                    de información y que vean la nesecidad de usar estas nuevas 
                    tecnologías, para solicitar servicios de trasporte de 
                    la forma mas fácil y sencilla.
                </p>
            </div>
            <div  class="col-xs-12 col-sm-12 col-md-4 col-lg-4 ">
                <p id="divSubtitulos">Cómo lo hacemos</p>
                <p class="textoo">
                    Contamos con un sistema que le permite al usuario pedir un 
                    auto, para que lo lleve a su destino de una forma segura y económica.
                </p>
            </div>
        </div>
        <div class="container-fluid bg-muted"></div>
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
