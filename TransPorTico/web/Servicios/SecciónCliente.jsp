<%-- 
    Document   : SecciónCliente
    Created on : 03/10/2017, 10:51:43 PM
    Author     : Oscar
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Solicitar viaje</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBe7lRExeChAWuRiEpRkE-l8aldatSkkAw&libraries=places"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link href="../CSS/Estilos_de_newjsp.css" rel="stylesheet" type="text/css"/>
        <script src="../JS/Geolocalizacion.js" type="text/javascript"></script>
        <script src="../JS/Principal.js" type="text/javascript"></script>
    </head>
    <body id="imagenFondo">
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
                <div class="collapse navbar-collapse navbar-exl-collapse img-responsive">
                    <ul class="nav navbar-nav">
                        <li class="active">
                            <a href="Inicio.jsp" class="btn-lg glyphicon glyphicon">
                                <b>
                                    Inicio
                                </b>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <div class="container">
            <form role="form " onsubmit="return false" id="formRegistro">
                <div id=contenidoForm" class="form-row text-left col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding-left: 0px;">
                    <div class="form-row col-xs-12 col-sm-6 col-md-6 col-lg-6" style="padding-left: 0px;">
                        <div class="form-row col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding-left: 0px;">
                            <div id="Soy_el_mapa">
                            
                            </div>
                        </div>
                        <div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding-left: 0px;">
                            <label for="Autocompletado_de_origen">
                                Origen
                            </label>
                            <input type="text" class="form-control" id="Autocompletado_de_origen"/>
                        </div>
                        <div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding-left: 0px ;">
                            <label for="Autocompletado_de_destino">
                                Destino
                            </label>
                            <input id="Autocompletado_de_destino" type="text" class="form-control"/>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </body>
</html>
