/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    consultarAsignacions(1);
   // paginador(1);
});

function muestraRegistraAsignacion(vehiculo){
   // mostrarModal("nuevaAsignacion", "Espere por favor..", "Cargando información de la base de datos");
    mostrarModalAsignacion("nuevaAsignacion");
    $("#inputVehiculo").val(vehiculo);
    
}

/*function guardarAsignacion(){
   var id = consultarCedula();
   alert(id);
    registrarAsignacion(id);
}*/

function registrarAsignacion() {
    alert($("#autoChofer").val());
    mostrarModal("myModal", "Espere por favor..", "Cargando información de la base de datos");
    if (validarAsignacion()) {
        $.ajax({
            url: '../AsignacionServlet',
            data: {
                accion: $("#asignacionAction").val(),
                chofer: $("#autoChofer").val(),
                vehiculo :$("#inputVehiculo").val()
                
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
                   // consultarAsignacions(1);
                    mostrarModal("myModal", "Registro de Asignacion", $("#inputVehiculo").val() + "->" + $("#autoChofer").val() + " agregado con exito");
                    limpiarForm();
                }
            },
            type: "POST",
            dataType: "text"
        });
    } else {
        mostrarMensaje("mesageRegistro", "alert alert-danger", "Debe digitar los campos del formulario", "Error!");
        $("#collapseOne").addClass('show');
    }
    $("#choferAction").val("#agregarAsignacion");
    //$("#collapseOne").addClass('show');
}

/*function consultarAsignacions(numpag) {
//Se envia la información por ajax
    $.ajax({
        url: '../AsignacionServlet',
        data: {
            accion: "consultarAsignaciones"
        },
        error: function () { //si existe un error en la respuesta del ajax
            //alert("Se presento un error a la hora de cargar la información de los Asignacions en la base de datos");
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

function dibujarTablaAsignacion(numpag, dataJson) {
    //limpia la información que tiene la tabla
    $("#tablaAsignaciones").html("");

    //muestra el enzabezado de la tabla
    var head = $("<thead />");
    var row = $("<tr />");
    head.append(row);
    $("#tablaAsignacions").append(head);
    row.append($("<th><b>Chofer</b></th>"));
    row.append($("<th><b>Vehiculo</b></th>"));
    //carga la tabla con el json devuelto
    var cont = 0;
    var i = 10 * (numpag - 1);
    for (; i < dataJson.length && (cont < 10); i++, cont++) {
        dibujarFila(dataJson[i]);
    }
}

function dibujarFilaAsignacion(rowData) {
//Cuando dibuja la tabla en cada boton se le agrega la funcionalidad de cargar o eliminar la informacion
//de una persona    
    var row = $('<tr />');
    $("#tablaAsignaciones").append(row);
    row.append($("<td>" + rowData.Chofer + "</td>"));
    row.append($("<td>" + rowData.Vehiculo + "</td>"));
    row.append($('<td><button type="button" class="btn btn-default btn-xs" aria-label="Left Align" onclick="modificarAsignacion(' + rowData.pkIdAsignacion + ')">' +
            '<i class="fa fa-pencil" aria-hidden="true"></i>' +
            '</button>' +
            '<button type="button" class="btn btn-default btn-xs" aria-label="Left Align" onclick="validaEliminacion(' + "'" + rowData.modelo + "'" + ',' + rowData.pkIdAsignacion + ')" data-target="#confirm-delete" data-toggle="modal">' +
            '<i class="fa fa-times" aria-hidden="true"></i>' +
            '</button></td>'));
}*/

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

/*function paginador(pagAct, tam) {
    var ini = 1;
    $("#paginacionOpc").html("");
    if (pagAct > 5) {
        ini = pagAct - 5;
        $("#paginacionOpc").append('<li onclick="consultarAsignacions(' + ini + '),paginador(' + (pagAct - 1) + ',' + tam + ')"><a>&laquo;</a></li>');
    } else {
        $("#paginacionOpc").append('<li onclick="consultarAsignacions(' + ini + '), paginador(' + (pagAct - 1) + ',' + tam + ')" ><a>&laquo;</a></li>');
    }
    for (var i = 0; i < tam; i++, ini++) {
        if (ini === pagAct) {
            $("#paginacionOpc").append('<li class="active" onclick="consultarAsignacions(' + ini + '),paginador(' + ini + ',' + tam + ') "><a>' + ini + '</a></li> ');
        } else {
            $("#paginacionOpc").append('<li onclick="consultarAsignacions(' + ini + '),paginador(' + ini + ',' + tam + ') "><a>' + ini + '</a></li>');
        }
    }
    $("#paginacionOpc").append('<li onclick="consultarAsignacions(' + (ini - 1) + '), paginador(' + (ini -1) + ',' + tam +')"><a>&raquo;</a></li>');
}*/

function validarAsignacion() {
    var validacion = true;
    //Elimina estilo de error en los css
    //notese que es sobre el grupo que contienen el input
    $("#autoChofer").removeClass("error");
    $("#inputVehiculo").removeClass("error");
    //valida cada uno de los campos del formulario
    //Nota: Solo si fueron digitadoslse;
    if ($("#autoChofer").val() === "") {
        $("#autoChofer").addClass("error");
        validacion = false;
    }
    if ($("#inputVehiculo").val() === "") {
        $("#inputVehiculo").addClass("error");
        validacion = false;
    }
    return validacion;
}

function validaEliminacion(mod, idAsignacion) {
    $('#asignacionEliminar').text(mod);
    $('#eliminar').click(function () {
        // alert ( idAsignacion ) ;
        eliminarAsignacion(idAsignacion);
    });
}

function eliminarAsignacion(idAsignacion) {
//mostrarModal("myModal", "Espere por favor..", "Se esta eliminando al chofer seleccionado");
//Se envia la información por ajax
    $.ajax({
        url: '../AsignacionServlet',
        data: {
            accion: "eliminarAsignacion",
            idAsignacion: idAsignacion
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
                setTimeout(consultarAsignacions(1), 1000);// hace una pausa y consulta la información de la base de datos
            }
        },
        type: 'POST',
        dataType: "text"
    });
    $("#myModal").hide();
}

function modificarAsignacion(pkIdAsignacion) {
    $("#asignacionAction").val("buscarAsignacion");
    //mostrarModal("myModal", "Espere por favor..", "Buscando en la base de datos");
    //Se envia la información por ajax
    $.ajax({
        url: '../AsignacionServlet',
        data: {
            accion: $("#choferAction").val(),
            idAsignacion: pkIdAsignacion
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se presento un error a la hora de buscar el chofer en la base de datos");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            cargaAsignacion(data);
            $("#asignacionAction").val("modificarAsignacion");
            $("#collapseOne").addClass('show');
        },
        type: 'POST',
        dataType: "json"
    });
}

function cargaAsignacion(asignacion) {
    $("#asignacionAux").val(asignacion.pkIdAsignacion);
    $("#inputChofer").val(asignacion.chofer);
    $("#inputVehiculo").val(asignacion.vehiculo);
    $("#choferAction").val("modificarAsignacion");
}



