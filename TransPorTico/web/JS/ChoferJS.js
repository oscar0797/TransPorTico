/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    consultarChoferes(1);
    consultarChoferesAutoComplete();
    //paginador(1);

    $("#mensajeAlertaChofer").hide();
    $("#mesajeResultNegChofer").removeClass();

    $("form").submit(function (event) {
        if (validar() === false) {
            event.preventDefault();
        }
    });
    desactivaForm();
    $("#inputCedula").click(ayuda("inputCedula", 'Sólo números'));
    $("#inputNombre").click(ayuda("inputNombre", 'Sólo texto'));
});

function registraChofer() {
    if (validar()) {
        $.ajax({
            url: '../ChoferServlet',
            data: {
                accion: $("#choferAction").val(),
                cedula: $("#inputCedula").val(),
                nombre: $("#inputNombre").val(),
                fechaNacimiento: $("#inputFechaNacimiento").val(),
                tipoLicencia: $("#inputTipoLicencia").val(),
                vencimientoLicencia: $("#inputFechaVencimiento").val(),
                idChofer: $("#choferAux").val()
            },
            error: function () {
                mostrarMensajeChofer("alert alert-danger", "Se generó un error, contacte al administrador (Error del ajax)", "Error!");
            },
            success: function (data) {
                var respuestaTxt = data.substring(2);
                var tipoRespuesta = data.substring(0, 2);
                if (tipoRespuesta === "E~") {
                    mostrarModal("myModal", "Se genero un error", respuestaTxt);
                } else {
                    consultarChoferes(1);
                    if ($("#choferAction").val() === "agregarChofer") {
                        alert($("#inputNombre").val() + " ha sido guardado con éxito.");
                        limpiarForm();
                    } else {
                        alert($("#inputNombre").val() + " ha sido editado con éxito.");
                    }
                }
            },
            type: "POST",
            dataType: "text"
        });
    } else {
        mostrarMensajeChofer("alert alert-danger", "Debe digitar los campos del formulario", "Error!");
        $("#collapseOne").addClass('show');
    }
    $("#choferAction").val("#agregarChofer");
}

function limpiarForm() {
    $('#formularioChofer').trigger("reset");
}
function consultarChoferes(numpag) {
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
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            dibujarTabla(numpag, data);
            paginador(numpag, data.length / 10);
            // se oculta el modal esta funcion se encuentra en el utils.js
        },
        type: 'POST',
        dataType: "json"
    });
}
function consultarChoferesAutoComplete() {
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
            llenarAutoCompleteChofer(data);
            // se oculta el modal esta funcion se encuentra en el utils.js
        },
        type: 'POST',
        dataType: "json"
    });
}

function llenarAutoCompleteChofer(data) {
    var opcions = {
        data,
        getValue: "cedula",

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
//gris oscuro
    };
    $("#buscarCel").easyAutocomplete(opcions);
}

function dibujarTabla(numpag, dataJson) {
    //limpia la información que tiene la tabla
    $("#tablaChoferes").html("");

    //muestra el enzabezado de la tabla
    var head = $("<thead />");
    var row = $("<tr />");
    head.append(row);
    $("#tablaChoferes").append(head);
    row.append($("<th><b>Cedula</b></th>"));
    row.append($("<th><b>Nombre</b></th>"));
    row.append($("<th><b>Fecha Nacimiento</b></th>"));
    row.append($("<th><b>Tipo  de Licencia</b></th>"));
    row.append($("<th><b>Vencimiento de la Licencia</b></th>"));
    row.append($("<th><b>Acción</b></th>"));
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
    $("#tablaChoferes").append(row);
    row.append($("<td>" + rowData.cedula + "</td>"));
    row.append($("<td>" + rowData.nombre + "</td>"));
    row.append($("<td>" + rowData.fechaNacimiento + "</td>"));
    row.append($("<td>" + rowData.tipoLicencia + "</td>"));
    row.append($("<td>" + rowData.vencimientoLicencia + "</td>"));
    row.append($('<td><button type="button" class="btn btn-default btn-xs" aria-label="Left Align" onclick="modificarChofer(' + rowData.pkIdChofer + ')">' +
            '<i class="fa fa-pencil" aria-hidden="true"></i>' +
            '</button>' +
            '<button type="button" class="btn btn-default btn-xs" aria-label="Left Align" onclick="validaEliminacion(' + "'" + rowData.nombre + "'" + ',' + rowData.pkIdChofer + ')" data-target="#confirm-delete" data-toggle="modal">' +
            '<i class="fa fa-times" aria-hidden="true"></i>' +
            '</button></td>'));
}

function mostrarMensajeChofer(classCss, msg, neg) {
    //se le eliminan los estilos al mensaje
    $("#mensajeAlertaChofer").removeClass();

    //se setean los estilos
    $("#mensajeAlertaChofer").addClass(classCss);

    //se muestra la capa del mensaje con los parametros del metodo
    $("#mensajeAlertaChofer").fadeIn("slow");
    $("#mesajeResultNegChofer").html(neg);
    $("#mesajeResultTextChofer").html(msg);
    $("#mesajeResultTextChofer").html(msg);
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
        $("#paginacionOpc").append('<li onclick="consultarChoferes(' + ini + '),paginador(' + (pagAct - 1) + ',' + tam + ')"><a>&laquo;</a></li>');
    } else {
        $("#paginacionOpc").append('<li onclick="consultarChoferes(' + ini + '), paginador(' + (pagAct - 1) + ',' + tam + ')" ><a>&laquo;</a></li>');
    }
    for (var i = 0; i < tam; i++, ini++) {
        if (ini === pagAct) {
            $("#paginacionOpc").append('<li class="active" onclick="consultarChoferes(' + ini + '),paginador(' + ini + ',' + tam + ') "><a>' + ini + '</a></li> ');
        } else {
            $("#paginacionOpc").append('<li onclick="consultarChoferes(' + ini + '),paginador(' + ini + ',' + tam + ') "><a>' + ini + '</a></li>');
        }
    }
    $("#paginacionOpc").append('<li onclick="consultarChoferes(' + (ini - 1) + '), paginador(' + (ini - 1) + ',' + tam + ')"><a>&raquo;</a></li>');
}

function validar() {
    var validacion = true;

    //Elimina estilo de error en los css
    //notese que es sobre el grupo que contienen el input
    $("#inputCedula").removeClass("error");
    $("#inputNombre").removeClass("error");
    $("#inputTipoLicencia").removeClass("error");
    $("#inputFechaNacimiento").removeClass("error");
    $("#inputFechaVencimiento").removeClass("error");
    //valida cada uno de los campos del formulario
    //Nota: Solo si fueron digitadoslse;
    if ($("#inputCedula").val() === "") {
        $("#inputCedula").addClass("error");
        validacion = false;
    }
    if ($("#inputNombre").val() === "") {
        $("#inputNombre").addClass("error");
        validacion = false;
    }
    if ($("#inputTipoLicencia").val() === "") {
        $("##inputTipoLicencia").addClass("error");
        validacion = false;
    }
    if ($("#inputFechaNacimiento").val() === "") {
        $("#inputFechaNacimiento").addClass("error");
        validacion = false;
    }
    if ($("#inputFechaVencimiento").val() === "") {
        $("#inputFechaVencimiento").addClass("error");
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
            verificaCedulaEdicion(data);
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
    $("#fechaNacimiento").data({date: chofer.fechaNacimiento});
    $("#inputFechaNacimiento").val(fechatxt);
    $("#inputTipoLicencia").val(chofer.tipoLicencia);
    fecha1 = new Date(chofer.vencimientoLicencia);
    fechatxt = fecha1.getDate() + "/" + fecha1.getMonth() + 1 + "/" + fecha1.getFullYear();
    $("#fechaVencimiento").data({date: chofer.vencimientoLicencia});
    $("#inputFechaVencimiento").val(fechatxt);
    //$("#myModalFormulario").modal();
    $("#choferAction").val("modificarChofer");
}


function verificaCedulaEdicion(chofer) {
    var cedulaa = $("#inputCedula").val();
    $.ajax({
        url: '../ChoferServlet',
        data: {
            accion: "verificarCedula",
            cedula: cedulaa
        },
        error: function () {
            mostrarMensaje("alert alert-danger", "Se genero un error, contacte al administrador (Error del ajax)", "Error!");
        },
        success: function (data) {
            var respuestaTxt = data.substring(2);
            var tipoRespuesta = data.substring(0, 2);
            if (tipoRespuesta !== "E~" || cedulaa === chofer.cedula) {
                $("#inputCedula").val(cedulaa);
                $("#inputCedula").addClass("correcto");
                $("#collapseOne").addClass('show');
                alert("La cédula no se modifica, si la cédula es incorrecta, elimine el registro e ingrese uno nuevo");
                activaForm();
            } else {
                $("#inputCedula").addClass("error");
                activaForm();
            }
        },
        type: "POST",
        dataType: "text"
    });
}

function activaForm() {
    $("#inputCedula").attr("disabled", "true");
    $("#inputNombre").removeAttr("disabled");
    $("#inputFechaNacimiento").removeAttr("disabled");
    $("#inputTipoLicencia").removeAttr("disabled");
    $("#inputFechaVencimiento").removeAttr("disabled");
}
function desactivaForm() {
    $("#inputCedula").removeAttr("disabled");
    $("#inputNombre").attr("disabled", "true");
    $("#inputFechaNacimiento").attr("disabled", "true");
    $("#inputTipoLicencia").attr("disabled", "true");
    $("#inputFechaVencimiento").attr("disabled", "true");
}

function buscarPorCedula() {
    //alert($("#buscarCel").val());
    var id = $("#buscarCel").val();
    $.ajax({
        url: '../ChoferServlet',
        data: {
            accion: "buscarCedula",
            cedula: id
        },
        error: function () {
            mostrarMensaje("alert alert-danger", "Se genero un error, contacte al administrador (Error del ajax)", "Error!");
            $("#buscarCel").addClass("error");
            alert("No se encontró al chofer, digite una nueva busqueda");
        },
        success: function (data) {
            //      alert( data[0].cedula);
            //  var respuestaTxt = data.substring(2);
            //  var tipoRespuesta = data.substring(0, 2);
            if (id === data[0].cedula) {
                //  alert("entro al if");

                dibujarTabla(1, data);
            } else {
                alert("No se encontró al usuario, digite una nueva busqueda");
            }
        },
        type: "POST",
        dataType: "json"
    });
}