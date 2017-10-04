<%-- 
    Document   : Inicio
    Created on : 30/09/2017, 03:29:23 PM
    Author     : Oscar
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
   <head>
        <title>Inicio</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <link href="../CSS/Estilos.css" rel="stylesheet" type="text/css"/>
        <link href="../CSS/datetimepicker.min.css" rel="stylesheet" type="text/css"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        
        <script src="../JS/datetimepicker.js" type="text/javascript"></script>
        <script src="../JS/utils.js" type="text/javascript"></script>
        <script src="../JS/Publico.js" type="text/javascript"></script>

    </head>
    <body  id="imagenFondo">

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
                        <li class="active"><a href="Inicio.jsp" class="btn-lg glyphicon glyphicon"><b>Inicio</b></a></li>
                        <li><a class=" btn-lg glyphicon" href="QuienesSomos.jsp">Quiénes Somos</a></li>
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
        <!-- BANNER CAROUSEL -->
        <!-- ********************************************************** -->

        <div id="myCarousel" class="banner carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                <li data-target="#myCarousel" data-slide-to="1"></li>
                <li data-target="#myCarousel" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner" role="listbox"> 
                <div class="item active">

                    <img src="../Imágenes/Banner/imgCarru2.jpg" alt=""/>
                    <div class="carousel-caption">
                        <h3></h3>
                        <p></p>
                    </div>
                </div>
                <div class="item">
                    <img src="../Imágenes/Banner/imgCarru3.png" alt=""/>
                    <div class="carousel-caption">
                        <h3></h3> 
                        <p></p>
                    </div>
                </div>
                <div class="item">
                    <img src="../Imágenes/Banner/imgCarru4.png" alt=""/>
                    <div class="carousel-caption">
                        <h3></h3>
                        <p></p>
                    </div>
                </div>
            </div>

            <!-- Left and right controls -->
            <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                <span class="sr-only">Anterior</span>
            </a>
            <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
                <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                <span class="sr-only">Siguiente</span>
            </a>
        </div>  <!--Slider-->
        <!-- ********************************************************** -->
        <!-- MODAL FORMULARIO REGISTRO -->
        <!-- ********************************************************** -->
        <div class="container">
            <div class="modal fade" id="myModalRegistro"  role="dialog">
                <div class="modal-dialog modal-md">
                    <div class="modal-content">
                        <div class="modal-header fondoForm">
                            <button class="close btn-danger" data-dismiss="modal" aria-label="Close"><span>&times;</span></button>
                            <h1 class="modal-title" id="myModalTitle"><b>Registro de Usuario</b></h1>
                        </div>
                        <div class="modal-body" id="myModalMessage">
                            <form role="form" onsubmit="return false;" id="formRegistro">
                                <div class="form-group col-sm-12" id="groupUsuario">
                                    <label for="usuario">Nombre de Usuario:</label>
                                    <input type="text" class="form-control" id="usuarioSign" autofocus="autofocus" placeholder="Nombre de Usuario">
                                </div>
                                <div class="form-group col-sm-6" id="groupPassword">
                                    <label for="password">Contraseña:</label>
                                    <input type="text" class="form-control" id="passwordSign" autofocus="autofocus" placeholder="Contraseña">
                                </div>                                
                                <div class="form-group col-sm-6" id="groupPasswordConfirm">
                                    <label for="password">Confirmar Contraseña:</label>
                                    <input type="password" class="form-control" id="passwordConfirmSign" autofocus="autofocus" placeholder="Contrasena">
                                </div>                                
                                <div class="form-group col-sm-4" id="groupNombre">
                                    <label for="usuario">Nombre:</label>
                                    <input type="text" class="form-control" id="nombreSign" placeholder="Nombre" >
                                </div>
                                <div class="form-group col-sm-4" id="groupApellido1">
                                    <label for="usuario">Apellido1:</label>
                                    <input type="text" class="form-control" id="apellido1Sign" placeholder="Apellido1">
                                </div>
                                <div class="form-group col-sm-4" id="groupApellido2">
                                    <label for="apellido2">Apellido2:</label>
                                    <input type="text" class="form-control" id="apellido2Sign" placeholder="Apellido2">
                                </div>
                                <div class="form-group col-sm-6" id="groupCorreo">
                                    <label for="password">Email</label>
                                    <input type="email" class="form-control" id="correoSign" autofocus="autofocus" placeholder="Email">
                                </div>
                                <div class="form-group col-sm-6" id="groupTelefono">
                                    <label for="password">Teléfono:</label>
                                    <input type="text" class="form-control" id="telefonoSing" autofocus="autofocus" placeholder="Teléfono">
                                </div>
                                <div class="form-group col-sm-6" id="groupFechaNacimiento">
                                    <label for="nac">Fecha de Nacimiento:</label>
                                    <div id="fechaNacimiento" class="input-group date form_date" data-date="" data-date-format="dd/mm/yyyy" data-link-field="dtp_input2" data-link-format="dd/mm/yyyy">
                                        <input class="form-control" type="text" value="" readonly placeholder="dd/mm/aaaa" id="fechaNacimientoSing">
                                        <span class="input-group-addon">
                                            <span class="glyphicon glyphicon-calendar"></span>
                                        </span>
                                    </div>
                                </div>                                 
                                <div class="form-group col-sm-6" id="groupdireccion">
                                    <label for="password">Direccion</label>
                                    <input type="text" class="form-control" id="direccion_sign" autofocus="autofocus" placeholder="Dirección">
                                </div>
                                <div class="form-group">
                                    <input type="hidden" value="registroAdmin" id="personasAction"/>                       
                                    <button type="submit" class="btn btn-primary" id="enviar" onclick="registro()">Guardar</button>
                                    <button type="reset" class="btn btn-danger" id="cancelar" onclick="limpiarForm()" data-dismiss="modal">Cancelar</button>
                                </div>
                                <div class="form-group" >
                                    <div class="alert alert-success hiddenDiv" id="mesajeResult">
                                        <strong class="mesajeResultNeg">Info!</strong> 
                                        <span class="mesajeResultText">Este cuadro de alerta podría indicar un cambio informativo neutro o una acción.</span>
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
                                    <div class="input-group form-group col-sm-8">
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                                        <input type="text" id="usuario_login" class="form-control" placeholder="Nombre de Usuario">
                                    </div>
                                    <div class="col-sm-4"></div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-2"></div>
                                    <div class="input-group form-group col-sm-8">
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                                        <input id="password_login" type="password" id="password_login" class="form-control" name="password" placeholder="Contraseña">
                                    </div>
                                    <div class="col-sm-4"></div>
                                </div>
                            </div>
                            <div class="form-group login" >
                                <button type="button" class="btn btn-primary" onclick="logueo()" data-dismiss="modal">Ingresar</button>
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
        <!-- ********************************************************** -->
        <!-- Vienvenida -->
        <!-- ********************************************************** -->
        <div>
            <h1 id="bienvenida">BIENVENIDO</h1>
            <br></br>
            <div id="mensajeBienvenida">
                <p>Bienvenid@ a Trans~Por~Tico, la agencia de viajes número uno en transporte público y privado.
                    Nuestra compañía realiza grandes esfuerzos día tras día, para brindar un excelente servicio, 
                    aplicando tarifas sumamente bajas, con el fin de favorecer a nuestros clientes.                
                    Tenga el gusto de contactarnos, no dude en escribirnos o en llamarnos, ya que contamos con servicio de transporte disponible 24/7. 
                    Para nosotros es un placer atenderle.</p>
            </div>
        </div>
        <br></br>
        <!-- ********************************************************** -->
        <!-- INFO COUNTRIES -->
        <!-- ********************************************************** -->
        <div class="custom">
            <div id="contenedorLugares" >
                <h2><u>Las marcas de vehículos más utilizadas</u></h2>
                <ul class="list-group" id="side-menu">
                    <li class="list-group-item dropdown-toggle">
                        <a href="#">
                            <h3>Focus</h3>
                            <img src="../Imágenes/Inicio/Auto1.jpg" alt=""/>
                        </a>          
                    </li>
                    <li class="list-group-item dropdown-toggle">
                        <a href="#"><h3>Swift</h3>
                            <img src="../Imágenes/Inicio/auto2.png" alt=""/>
                        </a>
                    </li>
                    <li class="list-group-item dropdown-toggle">
                        <a href="#">
                            <h3>Sportage</h3>
                            <img src="../Imágenes/Inicio/auto3.jpg" alt=""/>
                        </a>
                    </li>
                    <li class="list-group-item dropdown-toggle">
                        <a href="#">
                            <h3>Spark</h3>
                            <img src="../Imágenes/Inicio/auto4.png" alt=""/>
                        </a>
                    </li>
                    <li class="list-group-item dropdown-toggle">
                        <a>
                            <h3>Toyota</h3>
                            <img src="../Imágenes/Inicio/auto5.jpg" alt=""/>
                        </a>
                    </li>
                </ul>
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
                    <p class="text-center">Copyright <i class="fa">&#xf1f9;</i> 2017 Trans~Por~Tico, aviso legal y politica de privacidad y de aflición</p>
                    <p class="text-center">Estamos a su disposicion, contactenos al 8998-9889 ó ingrese a www.TransPortTico.com</p>
                </div>
            </div>
        </footer>
    </body>
</html>
