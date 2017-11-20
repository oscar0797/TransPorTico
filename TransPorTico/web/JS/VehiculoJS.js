/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var unica="";

$(document).ready(function () {
    consultarVehiculos(1);
    consultarChoferes2();
    // paginador(1);
    $("form").submit(function (event) {
        if (validar() === false) {
            event.preventDefault();
        }
    });
});

/*function consultarCedula() {
 //Se envia la información por ajax
 var id;
 $.ajax({
 url: '../ChoferServlet',
 data: {
 accion: "buscarCedula",
 cedula: $("#inputChofer").val( )
 
 },
 error: function () { //si existe un error en la respuesta del ajax
 //alert("Se presento un error a la hora de cargar la información de los Chofers en la base de datos");
 mostrarModal("myModal", "Error al cargar en la base de datos");
 },
 success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el datos
 id=data[1].nombre;
 alert("id");
 alert(id);
 // se oculta el modal esta funcion se encuentra en el utils.js
 },
 type: 'POST',
 dataType: "json"
 });
 return id;
 }*/


function consultarChoferes2() {
    //Se envia la información por ajax
    $.ajax({
        url: '../ChoferServlet',
        data: {
            accion: "consultarChoferes"
        },
        error: function () { //si existe un error en la respuesta del ajax
            //alert("Se presento un error a la hora de cargar la información de los Chofers en la base de datos");
            mostrarModal("myModal", "Error al cargar en la base de datos");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el datos
            llenarAutoComplete(data);
            // se oculta el modal esta funcion se encuentra en el utils.js
        },
        type: 'POST',
        dataType: "json"
    });
}


function llenarAutoComplete(data) {
    var opcions = {
        data,
        getValue: function (data) {
            return data.pkIdChofer.toString();
        },

        list: {
            match: {
                enabled: true
            }
        },
        template: {
            type: "description",
            fields: {
                description: "nombre"
            }
        },
        theme: "dark-light"

    };

    $("#autoChofer").easyAutocomplete(opcions);
}



function registrarVehiculo() {
    if (validar()) {
        $.ajax({
            url: '../VehiculoServlet',
            data: {
                accion: $("#vehiculoAction").val(),
                ano: $("#inputAno").val( ),
                modelo: $("#inputModelo").val( ),
                placa: $("#inputPlaca").val( ),
                color: $("#inputColor").val( ),
                ubicacionX: $("#UbicacionX").val( ),
                ubicacionY: $("#UbicacionY").val( )
            },
            error: function () {
                mostrarMensaje("alert alert-danger", "Se genero un error, contacte al administrador (Error del ajax)", "Error!");
            },
            success: function (data) {
                var respuestaTxt = data.substring(2);
                var tipoRespuesta = data.substring(0, 2);
                if (tipoRespuesta === "E~") {
                    mostrarModal("myModal", "Se generó un error", respuestaTxt);
                } else {
                    consultarVehiculos(1);
                    mostrarModal("myModal", "Registro de Vehiculos", $("#inputPlaca").val() + " agregado con exito");
                    limpiarForm();
                }
            },
            type: "POST",
            dataType: "text"
        });
    } else {
        mostrarMensaje("alert alert-danger", "Debe digitar los campos del formulario", "Error!");
        $("#collapseOne").addClass('show');
    }
    $("#choferAction").val("#agregarChofer");
}

function limpiarForm() {
    $('#formularioVehiculo').trigger("reset");
}
function consultarVehiculos(numpag) {
//Se envia la información por ajax
    $.ajax({
        url: '../VehiculoServlet',
        data: {
            accion: "consultarVehiculos"
        },
        error: function () { //si existe un error en la respuesta del ajax
            //alert("Se presento un error a la hora de cargar la información de los Chofers en la base de datos");
            mostrarModal("myModal", "Error al cargar en la base de datos");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            // mostrarModal ( "myModal", "Exito al cargar en la base de datos" ) ;
            dibujarTabla(numpag, data);
            paginador(numpag, data.length / 10);
            // se oculta el modal esta funcion se encuentra en el utils.js
        },
        type: 'POST',
        dataType: "json"
    });
}

function dibujarTabla(numpag, dataJson) {
    //limpia la información que tiene la tabla
    $("#tablaVehiculos").html("");

    //muestra el enzabezado de la tabla
    var head = $("<thead />");
    var row = $("<tr />");
    head.append(row);
    $("#tablaVehiculos").append(head);
    row.append($("<th><b>Número de placa</b></th>"));
    row.append($("<th><b>Modelo</b></th>"));
    row.append($("<th><b>Año</b></th>"));
    row.append($("<th><b>Color</b></th>"));
    row.append($("<th><b>Consultar ó Asignar Choferes</b></th>"));
    row.append($("<th><b>Acción</b></th>"));
    //carga la tabla con el json devuelto
    var cont = 0;
    var i = 10 * (numpag - 1);
    for (; i < dataJson.length && (cont < 10); i++, cont++) {
        dibujarFila(dataJson[i]);
    }
}

/*function dibujarTablaChofer(numpag, dataJson) {
 //limpia la información que tiene la tabla
 $("#tabla").html("");
 
 //muestra el enzabezado de la tabla
 var head = $("<thead />");
 var row = $("<tr />");
 head.append(row);
 $("#tabla").append(head);
 row.append($("<th><b>Cedula</b></th>"));
 row.append($("<th><b>Nombre</b></th>"));
 row.append($("<th><b>Tipo  de Licencia</b></th>"));
 //carga la tabla con el json devuelto
 var cont = 0;
 var i = 10 * (numpag - 1);
 for (; i < dataJson.length && (cont < 10); i++, cont++) {
 dibujarFilaChofer(dataJson[i]);
 }
 }*/

function dibujarFila(rowData) {
//Cuando dibuja la tabla en cada boton se le agrega la funcionalidad de cargar o eliminar la informacion
//de una persona    
    var row = $('<tr />');
    $("#tablaVehiculos").append(row);
    row.append($("<td>" + rowData.placa + "</td>"));
    row.append($("<td>" + rowData.modelo + "</td>"));
    row.append($("<td>" + rowData.ano + "</td>"));
    row.append($("<td>" + rowData.color + "</td>"));
    row.append($('<td><button type="button" class="btn btn-default btn-xs" aria-label="Left Align" onclick="modificarChofer(' + rowData.pkIdChofer + ')">' +
            '<i class="glyphicon glyphicon-list-alt" aria-hidden="true"></i>' +
            '</button>' +
            '<button type="button" class="btn btn-default btn-xs" aria-label="Left Align" onclick="muestraRegistraAsignacion(' + rowData.pkIdVehiculo + ')">' +
            '<i class="glyphicon glyphicon-plus" aria-hidden="true"></i>' +
            '</button></td>'));

    row.append($('<td><button type="button" class="btn btn-default btn-xs" aria-label="Left Align" onclick="modificarChofer(' + rowData.pkIdChofer + ')">' +
            '<i class="fa fa-pencil" aria-hidden="true"></i>' +
            '</button>' +
            '<button type="button" class="btn btn-default btn-xs" aria-label="Left Align" onclick="validaEliminacion(' + "'" + rowData.modelo + "'" + ',' + rowData.pkIdVehiculo + ')" data-target="#confirm-delete" data-toggle="modal">' +
            '<i class="fa fa-times" aria-hidden="true"></i>' +
            '</button></td>'));
}

/*function dibujarFilaChofer(rowData) {
 //Cuando dibuja la tabla en cada boton se le agrega la funcionalidad de cargar o eliminar la informacion
 //de una persona    
 var row = $('<tr />');
 $("#tabla").append(row);
 row.append($("<td>" + rowData.cedula + "</td>"));
 row.append($("<td>" + rowData.nombre + "</td>"));
 row.append($("<td>" + rowData.tipoLicencia + "</td>"));
 }*/

function mostrarMensaje(classCss, msg, neg) {
    //se le eliminan los estilos al mensaje
    $("#mensajeAlert").removeClass();

    //se setean los estilos
    $("#mensajeAlert").addClass(classCss);

    //se muestra la capa del mensaje con los parametros del metodo
    $("#mensajeAlert").fadeIn("slow");
    $("#mesajeResultNeg").html(neg);
    $("#mesajeResultText").html(msg);
    $("#mesajeResultText").html(msg);
}

/*
 function mostrarMensaje(name, classCss, msg, neg) {
 //se le eliminan los estilos al mensaje
 $("#" + name).removeClass();
 //se setean los estilos
 $("#" + name).addClass(classCss);
 //se muestra la capa del mensaje con los parametros del metodo
 $("#" + name).fadeIn("slow");
 $(".mesajeResultNeg").html(neg);
 $(".mesajeResultText").html(msg);
 $(".mesajeResultText").html(msg);
 }*/

function paginador(pagAct, tam) {
    var ini = 1;
    $("#paginacionOpc").html("");
    if (pagAct > 5) {
        ini = pagAct - 5;
        $("#paginacionOpc").append('<li onclick="consultarVehiculos(' + ini + '),paginador(' + (pagAct - 1) + ',' + tam + ')"><a>&laquo;</a></li>');
    } else {
        $("#paginacionOpc").append('<li onclick="consultarVehiculos(' + ini + '), paginador(' + (pagAct - 1) + ',' + tam + ')" ><a>&laquo;</a></li>');
    }
    for (var i = 0; i < tam; i++, ini++) {
        if (ini === pagAct) {
            $("#paginacionOpc").append('<li class="active" onclick="consultarVehiculos(' + ini + '),paginador(' + ini + ',' + tam + ') "><a>' + ini + '</a></li> ');
        } else {
            $("#paginacionOpc").append('<li onclick="consultarVehiculos(' + ini + '),paginador(' + ini + ',' + tam + ') "><a>' + ini + '</a></li>');
        }
    }
    $("#paginacionOpc").append('<li onclick="consultarVehiculos(' + (ini - 1) + '), paginador(' + (ini - 1) + ',' + tam + ')"><a>&raquo;</a></li>');
}

function validar() {
    var validacion = true;
    //Elimina estilo de error en los css
    //notese que es sobre el grupo que contienen el input
    $("#inputPlaca").removeClass("error");
    $("#inputModelo").removeClass("error");
    $("#inputAno").removeClass("error");
    $("#inputColor").removeClass("error");
    $("#inputUbicacion").removeClass("error");
    //valida cada uno de los campos del formulario
    //Nota: Solo si fueron digitadoslse;
    if ($("#inputPlaca").val() === "") {
        $("#inputPlaca").addClass("error");
        validacion = false;
    }
    if ($("#inputModelo").val() === "") {
        $("#inputModelo").addClass("error");
        validacion = false;
    }
    if ($("#inputAno").val() === "") {
        $("#inputAno").addClass("error");
        validacion = false;
    }
    if ($("#inputColor").val() === "") {
        $("#inputColor").addClass("error");
        validacion = false;
    }
    if ($("#inputUbicacion").val() === "") {
        $("#inputUbicacion").addClass("error");
        validacion = false;
    }
    return validacion;
}

function validaEliminacion(mod, idVehiculo) {
    $('#vehiculoEliminar').text(mod);
    $('#eliminar').click(function () {
        // alert ( idVehiculo ) ;
        eliminarVehiculo(idVehiculo);
    });
}

function eliminarVehiculo(idVehiculo) {
//mostrarModal("myModal", "Espere por favor..", "Se esta eliminando al chofer seleccionado");
//Se envia la información por ajax
    $.ajax({
        url: '../VehiculoServlet',
        data: {
            accion: "eliminarVehiculo",
            idVehiculo: idVehiculo
        },
        error: function () { //si existe un error en la respuesta del ajax
            cambiarMensajeModal("myModal", "Resultado acción", "Se presento un error, contactar al administador");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            // se cambia el mensaje del modal por la respuesta del ajax
            var respuestaTxt = data.substring(2);
            var tipoRespuesta = data.substring(0, 2);
            if (tipoRespuesta === "E~") {
                cambiarMensajeModal("myModal", "Resultado acción", respuestaTxt);
            } else {
                $("#myModal").hide();
                setTimeout(consultarVehiculos(1), 1000);// hace una pausa y consulta la información de la base de datos
            }
        },
        type: 'POST',
        dataType: "text"
    });
    $("#myModal").hide();
}

function modificarChofer(pkIdChofer) {
    $("#choferAction").val("buscarChofer");
    //mostrarModal("myModal", "Espere por favor..", "Buscando en la base de datos");
    //Se envia la información por ajax
    $.ajax({
        url: '../ChoferServlet',
        data: {
            accion: $("#choferAction").val(),
            idChofer: pkIdChofer
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se presento un error a la hora de buscar el chofer en la base de datos");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            cargaChofer(data);
            $("#choferAction").val("modificarChofer");
            $("#collapseOne").addClass('show');
        },
        type: 'POST',
        dataType: "json"
    });
}

function cargaChofer(chofer) {
    $("#choferAux").val(chofer.pkIdChofer);
    $("#inputCedula").val(chofer.cedula);
    $("#inputNombre").val(chofer.nombre);
    var fecha1 = new Date(chofer.fechaNacimiento);
    var fechatxt = fecha1.getDate() + "/" + fecha1.getMonth() + 1 + "/" + fecha1.getFullYear();
    $("#fechaNacimiento").data({date: fechatxt});
    $("#inputFechaNacimiento").val(fechatxt);
    $("#inputTipoLicencia").val(chofer.tipoLicencia);
    fecha1 = new Date(chofer.vencimientoLicencia);
    fechatxt = fecha1.getDate() + "/" + fecha1.getMonth() + 1 + "/" + fecha1.getFullYear();
    $("#fechaVencimiento").data({date: fechatxt});
    $("#inputFechaVencimiento").val(fechatxt);
    //$("#myModalFormulario").modal();
    $("#choferAction").val("modificarChofer");
}


function verificaPlaca(id, tam, mensaje) {
    var placaa = $("#inputPlaca").val();
    $.ajax({
        url: '../VehiculoServlet',
        data: {
            accion: "verificarPlaca",
            placa: placaa
        },
        error: function () {
            mostrarMensaje("alert alert-danger", "Se genero un error, contacte al administrador (Error del ajax)", "Error!");
        },
        success: function (data) {
            var respuestaTxt = data.substring(2);
            var tipoRespuesta = data.substring(0, 2);
            if (tipoRespuesta !== "E~") {
                if (validaTamMin(id, tam, mensaje)) {
                    $("#inputPlaca").val(placaa);
                    $("#inputPlaca").addClass("correcto");
                    $("#collapseOne").addClass('show');
                    alert("Placa verificada correctamente, proceda a llenar los demás campos");
                    activaForm();
                }
            } else {
                $("#inputPlaca").addClass("error");
                var ff = unica;
                if ($("#usuarioAction").val() === "modificarUsuario" && $("#inputNombreUsuario").val() === ff) { //????
                    alert("Nombre de usuario verificado correctamente, proceda a llenar los demás campos");
                    activaForm();
                } else {
                    alert("El nombre de usuario que digitó ya existe, por favor digite uno nuevo");
                }
            }
        },
        type: "POST",
        dataType: "text"
    });
}

function aux(usuario) {
    var unica = usuario.nombreUsuario;
}

function modificarVehiculo(pkIdUsuario) {
    $("#vehiculoAction").val("buscarVehiculo");

    //mostrarModal("myModal", "Espere por favor..", "Buscando en la base de datos");
    //Se envia la información por ajax
    $.ajax({
        url: '../VehiculoServlet',
        data: {
            accion: $("#vehiculoAction").val(),
            idUsuario: pkIdUsuario
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se presento un error a la hora de buscar el usuario en la base de datos");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            cargaUsuario(data);
            $("#vehiculoAction").val("modificarVehiculo");
            $("#collapseOne").addClass('show');
            $("#encabezado").addClass('show');
            verificaNombreUsuarioEdicion(data);
            aux(data);
        },
        type: 'POST',
        dataType: "json"
    });
}