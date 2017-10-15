/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    consultarChoferes(1);
    paginador(1);
});

function registraChofer() {
    mostrarModal("myModal", "Espere por favor..", "Cargando información de Chofer");
    if (validar()) {
        $.ajax({
            url: '../ChoferServlet',
            data: {
                accion: "agregarChofer",
                cedula: $("#inputCedula").val(),
                nombre: $("#inputNombre").val(),
                fechaNacimiento: $("#imputFechaNacimiento").val(),
                tipoLicencia: $("#inputTipoLicencia").val(),
                vencimientoLicencia: $("#inputFechaVencimiento").val()
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
                    consultarChoferes(1);
                    mostrarModal("myModal", "Registro de Chofers", $("#inputNombre").val() + " agregado con exito");
                    limpiarForm();
                }
            },
            type: "POST",
            dataType: "text"
        });
    } else {
        mostrarMensaje("mesageRegistro", "alert alert-danger", "Debe digitar los campos del formulario", "Error!");
    }
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
                alert("Se presento un error a la hora de cargar la información de los Chofers en la base de datos");
                mostrarModal("myModal", "Error al cargar en la base de datos");
            },
            success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
                dibujarTabla(numpag, data);
                // se oculta el modal esta funcion se encuentra en el utils.js
            },
            type: 'POST',
            dataType: "json"
        });
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

function validaEliminacion(nom,idChofer){
    $('#nombreEliminar').text(nom);
    $('#eliminar').click(function () {
        eliminarChofer(idChofer);
    });
}

function eliminarChofer(idChofer) {
    mostrarModal("myModal", "Espere por favor..", "Se esta eliminando a la persona seleccionada");
    //Se envia la información por ajax
    $.ajax({
        url: '../ChofersServlet',
        data: {
            accion: "eliminarChofer",
            idChofer: idChofer
        },
        error: function () { //si existe un error en la respuesta del ajax
            cambiarMensajeModal("myModal","Resultado acción","Se presento un error, contactar al administador");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            // se cambia el mensaje del modal por la respuesta del ajax
            var respuestaTxt = data.substring(2);
            var tipoRespuesta = data.substring(0, 2);
            if (tipoRespuesta === "E~") {
                cambiarMensajeModal("myModal","Resultado acción",respuestaTxt);
            }else{
                setTimeout(consultarChofers(1), 3000);// hace una pausa y consulta la información de la base de datos
            }
        },
        type: 'POST',
        dataType: "text"
    });
}

function modificarChofer(idChofer) {
    $("#personasAction").val("modificarChofer");
    mostrarModal("myModal", "Espere por favor..", "Buscando nombre en la base de datos");
    //Se envia la información por ajax
    $.ajax({
        url: '../ChofersServlet',
        data: {
            accion: "buscarChofer",
            idChofer: idChofer
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se presento un error a la hora de buscar las personas en la base de datos");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            cargaChofer(data);
            // se oculta el modal esta funcion se encuentra en el utils.js
            ocultarModal("myModal");

        },
        type: 'GET',
        dataType: "json"
    });
}
/*
function cargaChofer(chofer){
           $("#choferid_sign").val(chofer.idUsuario);
           $("#chofer_sign").val(chofer.nombreUsuario);
           $("#password_sign").val(chofer.contrasena);
           $("#email_sign").val(chofer.email);
           $("#primer_ap_sign").val(chofer.apellido1);
           $("#segundo_ap_sign").val(chofer.apellido2);
           $("#nombre_sign").val(chofer.nombre);
           $("#fechaNac").val(chofer.fechaNacimiento);
           $("#telefono").val(chofer.numTel);
           $("#correo_sign").val(chofer.email);
           $("#direccion_sign").val(chofer.direccion);
           $("#myModalFormulario").modal();
}
*/