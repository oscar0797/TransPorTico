/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {
    consultarVehiculos(1);
    paginador(1);
});

function registrarVehiculo() {
    mostrarModal("myModal", "Espere por favor..", "Cargando información de la base de datos");
    if (validar()) {
        alert ( $( "#inputPlaca" ).val ( ) ) ;
        $.ajax({
            url: '../VehiculoServlet',
            data: {
                accion: $("#vehiculoAction").val(),
                ano: $( "#inputAno" ),
                modelo: $( "#inputModelo" ),
                placa: $( "#inputPlaca" ),
                color: $( "#inputColor" ),
                ubicacionX: $( "#UbicacionX" ),
                ubicacionY: $( "#UbicacionY" )
            },
            error: function () {
                mostrarMensaje("alert alert-danger", "Se genero un error, contacte al administrador (Error del ajax)", "Error!");
            },
            success: function (data) {
                var respuestaTxt = data.substring(2);
                var tipoRespuesta = data.substring(0, 2);
                if (tipoRespuesta === "E~") {
                    mostrarModal("myModal", "Se genero un error", respuestaTxt);
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
        mostrarMensaje("mesageRegistro", "alert alert-danger", "Debe digitar los campos del formulario", "Error!");
    }
    $("#vehiculoAction").val("#agregarVehiculo");
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
    //carga la tabla con el json devuelto
    var cont = 0;
    var i = 10 * (numpag - 1);
    for (; i < dataJson.length && (cont < 10); i++, cont++) {
        dibujarFila(dataJson[i]);
    }

}

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
            '<i class="fa fa-pencil" aria-hidden="true"></i>' +
            '</button>' +
            '<button type="button" class="btn btn-default btn-xs" aria-label="Left Align" onclick="validaEliminacion(' + "'" + rowData.nombre + "'" + ',' + rowData.pkIdChofer + ')" data-target="#confirm-delete" data-toggle="modal">' +
            '<i class="fa fa-times" aria-hidden="true"></i>' +
            '</button></td>'));
}

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
}

function paginador(pagAct) {
    var ini = 1;
    $("#paginacionOpc").html("");
    if (pagAct > 5) {
        ini = pagAct - 5;
        $("#paginacionOpc").append('<li onclick="paginador(' + (ini - 1) + ')"><a>&laquo;</a></li>');
    } else {
        $("#paginacionOpc").append('<li onclick="paginador(' + ini + ')" ><a>&laquo;</a></li>');
    }
    for (var i = 0; i <= 10; i++, ini++) {
        if (ini === pagAct) {
            $("#paginacionOpc").append('<li class="active" onclick="consultarChoferes(' + ini + '),paginador(' + ini + ')"><a>' + ini + '</a></li> ');
        } else {
            $("#paginacionOpc").append('<li onclick="consultarChoferes(' + ini + '),paginador(' + ini + ')"><a>' + ini + '</a></li>');
        }
    }
    $("#paginacionOpc").append('<li onclick="paginador(' + (ini + 1) + ')"><a>&raquo;</a></li>');
}

function validar() {
    var validacion = true;

    //Elimina estilo de error en los css
    //notese que es sobre el grupo que contienen el input
    $("#groupCedula").removeClass("has-error");
    $("#groupNombre").removeClass("has-error");
    $("#groupTipoLicencia").removeClass("has-error");
    $("#groupFechaNacimiento").removeClass("has-error");
    $("#groupFechaVencimiento").removeClass("has-error");
    //valida cada uno de los campos del formulario
    //Nota: Solo si fueron digitadoslse;
    if ($("#inputCedula").val() === "") {
        $("#groupCedula").addClass("has-error");
        validacion = false;
    }
    if ($("#inputNombre").val() === "") {
        $("#groupNombre").addClass("has-error");
        validacion = false;
    }
    if ($("#inputTipoLicencia").val() === "") {
        $("#groupTipoLicencia").addClass("has-error");
        validacion = false;
    }
    if ($("#inputFechaNacimiento").val() === "") {
        $("#groupFechaNacimiento").addClass("has-error");
        validacion = false;
    }
    if ($("#inputFechaVencimiento").val() === "") {
        $("#groupFechaVencimiento").addClass("has-error");
        validacion = false;
    }
    return validacion;
}

function validaEliminacion(nom, idChofer) {
    $('#nombreEliminar').text(nom);
    $('#eliminar').click(function () {
        eliminarChofer(idChofer);
    });
}

function eliminarChofer(idChofer) {
    //mostrarModal("myModal", "Espere por favor..", "Se esta eliminando al chofer seleccionado");
    //Se envia la información por ajax
    $.ajax({
        url: '../ChoferServlet',
        data: {
            accion: "eliminarChofer",
            idChofer: idChofer
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
                setTimeout(consultarChoferes(1), 1000);// hace una pausa y consulta la información de la base de datos
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
