/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    consultarUsuarios(1);
    paginador(1);
    desactivaForm();
    //$("#inputCedula").click(ayuda("inputCedula", 'Sólo números'));
    $("#inputNombreUsuario").click(ayuda("inputNombreUsuario", 'Sólo texto'));
});

function registraUsuario() {
    mostrarModal("myModal", "Espere por favor..", "Cargando información de Usuario");
    if (validar()) {
        $.ajax({
            url: '../UsuarioServlet',
            data: {
                accion: $("#usuarioAction").val(),
                nombreUsuario: $("#inputNombreUsuario").val(),
                contrasena1: $("#inputContrasena1").val(),
                contrasena2: $("#inputContrasena2").val(),
                nombre: $("#inputNombre").val(),
                apellido1: $("#inputApellido1").val(),
                apellido2: $("#inputApellido2").val(),
                correo: $("#inputCorreo").val(),
                fechaNacimiento: $("#inputFechaNacimiento").val(),
                telefono: $("#inputTelefono").val(),
                direccion: $("#inputDireccion").val(),
                tipo: $("#inputTipo").val(),
                idUsuario: $("#usuarioAux").val()
            },
            error: function () {
                mostrarMensaje("alert alert-danger", "Se generó un error, contacte al administrador (Error del ajax)", "Error!");
            },
            success: function (data) {
                var respuestaTxt = data.substring(2);
                var tipoRespuesta = data.substring(0, 2);
                if (tipoRespuesta === "E~") {
                    mostrarModal("myModal", "Se genero un error", respuestaTxt);
                } else {
                    consultarUsuarios(1);
                    mostrarModal("myModal", "Registro de Usuarios", $("#inputNombre").val() + " agregado con exito");
                    limpiarForm();
                }
            },
            type: "POST",
            dataType: "texT"
        });
    } else {
        mostrarMensaje("mesageRegistro", "alert alert-danger", "Debe digitar los campos del formulario", "Error!");
    }
    $("#usuarioAction").val("#agregarUsuario");
}

function consultarUsuarios(numpag) {
    //Se envia la información por ajax
    $.ajax({
        url: '../UsuarioServlet',
        data: {
            accion: "consultarUsuarios"
        },
        error: function () { //si existe un error en la respuesta del ajax
            //alert("Se presento un error a la hora de cargar la información de los Usuarios en la base de datos");
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
    $("#tablaUsuarios").html("");
    //muestra el enzabezado de la tabla
    var head = $("<thead />");
    var row = $("<tr />");
    head.append(row);
    $("#tablaUsuarios").append(head);
    row.append($("<th><b>NombreUsuario</b></th>"));
    row.append($("<th><b>Nombre</b></th>"));
    row.append($("<th><b>Apellido1</b></th>"));
    row.append($("<th><b>Correo</b></th>"));
    row.append($("<th><b>FechaNacimiento</b></th>"));
    row.append($("<th><b>Teléfono</b></th>"));
    row.append($("<th><b>Dirección</b></th>"));
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
    $("#tablaUsuarios").append(row);
    row.append($("<td>" + rowData.nombreUsuario + "</td>"));
    row.append($("<td>" + rowData.nombre + "</td>"));
    row.append($("<td>" + rowData.apellido1 + "</td>"));
    row.append($("<td>" + rowData.correo + "</td>"));
    row.append($("<td>" + rowData.fechaNacimiento + "</td>"));
    row.append($("<td>" + rowData.telefono + "</td>"));
    row.append($("<td>" + rowData.direccion + "</td>"));
    row.append($('<td><button type="button" class="btn btn-default btn-xs" aria-label="center Align" onclick="modificarUsuario(' + rowData.pkIdUsuario + ')">' +
            '<i class="fa fa-pencil" aria-hidden="true"></i>' +
            '</button>' +
            '<button type="button" class="btn btn-default btn-xs" aria-label="center Align" onclick="validaEliminacion(' + "'" + rowData.nombre + "'" + ',' + rowData.pkIdUsuario + ')" data-target="#confirm-delete" data-toggle="modal">' +
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
            $("#paginacionOpc").append('<li class="active" onclick="consultarUsuarios(' + ini + '),paginador(' + ini + ')"><a>' + ini + '</a></li> ');
        } else {
            $("#paginacionOpc").append('<li onclick="consultarUsuarios(' + ini + '),paginador(' + ini + ')"><a>' + ini + '</a></li>');
        }
    }
    $("#paginacionOpc").append('<li onclick="paginador(' + (ini + 1) + ')"><a>&raquo;</a></li>');

}

function limpiarForm() {
    $('#formularioUsuario').trigger("reset");
}

function validar() {
    var validacion = true;

    //Elimina estilo de error en los css
    //notese que es sobre el grupo que contienen el input
    $("#groupUsuario").removeClass("has-error");
    $("#groupContrasena1").removeClass("has-error");
    $("#groupContrasena2").removeClass("has-error");
    $("#groupPasswordConfirm").removeClass("has-error");
    $("#groupNombre").removeClass("has-error");
    $("#groupApellido1").removeClass("has-error");
    $("#groupApellido2").removeClass("has-error");
    $("#groupCorreo").removeClass("has-error");
    $("#groupTelefono").removeClass("has-error");
    $("#groupDireccion").removeClass("has-error");
    $("#groupFechaNacimiento").removeClass("has-error");
    $("#groupTipo").removeClass("has-error");
    // $("#groupDireccion").removeClass("has-error");
    //valida cada uno de los campos del formulario
    //Nota: Solo si fueron digitadoslse;
    if ($("#inputNombreUsuario").val() === "") {
        $("#groupUsuario").addClass("has-error");
        validacion = false;
    }
    if ($("#inputContrasena1").val() === "") {
        $("#groupContrasena1").addClass("has-error");
        validacion = false;
    }
    if ($("#inputContrasena2").val() === "") {
        $("#groupContrasena2").addClass("has-error");
        validacion = false;
    }
    if ($("#inputNombre").val() === "") {
        $("#groupNombre").addClass("has-error");
        validacion = false;
    }
    if ($("#inputApellido1").val() === "") {
        $("#groupApellido1").addClass("has-error");
        validacion = false;
    }
    if ($("#inputApellido2").val() === "") {
        $("#groupApellido2").addClass("has-error");
        validacion = false;
    }
    if ($("#inputCorreo").val() === "") {
        $("#groupCorreo").addClass("has-error");
        validacion = false;
    }
    if ($("#inputTelefono").val() === "") {
        $("#groupTelefono").addClass("has-error");
        validacion = false;
    }
    if ($("#inputDireccion").val() === "") {
        $("#groupDireccion").addClass("has-error");
        validacion = false;
    }
    if ($("#inputFechaNacimiento").val() === "") {
        $("#groupFechaNacimiento").addClass("has-error");
        validacion = false;
    }
    if ($("#inputTipo").val() === "") {
        $("#groupTipo").addClass("has-error");
        validacion = false;
    }
    /* if ($("#inputDireccion").val() === "") {
     $("#groupDireccion").addClass("has-error");
     validacion = false;
     }*/
    return validacion;
}

function validaEliminacion(nom, idUsuario) {
    $('#nombreEliminar').text(nom);
    $('#eliminar').click(function () {
        eliminarUsuario(idUsuario);
    });
}

function eliminarUsuario(idUsuario) {
    //mostrarModal("myModal", "Espere por favor..", "Se esta eliminando al usuario seleccionado");
    //Se envia la información por ajax
    $.ajax({
        url: '../UsuarioServlet',
        data: {
            accion: "eliminarUsuario",
            idUsuario: idUsuario
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
                setTimeout(consultarUsuarios(1), 1000);// hace una pausa y consulta la información de la base de datos
            }
        },
        type: 'POST',
        dataType: "text"
    });
    $("#myModal").hide();
}

function modificarUsuario(pkIdUsuario) { 
    $("#usuarioAction").val("buscarUsuario");

    //mostrarModal("myModal", "Espere por favor..", "Buscando en la base de datos");
    //Se envia la información por ajax
    $.ajax({
        url: '../UsuarioServlet',
        data: {
            accion: $("#usuarioAction").val(),
            idUsuario: pkIdUsuario
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se presento un error a la hora de buscar el usuario en la base de datos");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            cargaUsuario(data);
            $("#usuarioAction").val("modificarUsuario");            
            $("#collapseOne").addClass('show');
            $("#encabezado").addClass('show');
            verificaNombreUsuarioEdicion(data);
            aux(data);
        },
        type: 'POST',
        dataType: "json"
    });
}

function cargaUsuario(usuario) {
    $("#usuarioAux").val(usuario.pkIdUsuario);
    $("#inputNombreUsuario").val(usuario.nombreUsuario);
    $("#inputContrasena1").val(usuario.contrasena1);
    $("#inputContrasena2").val(usuario.contrasena2);
    $("#inputNombre").val(usuario.nombre);
    $("#inputApellido1").val(usuario.apellido1);
    $("#inputApellido2").val(usuario.apellido2);
    $("#inputCorreo").val(usuario.correo);
    var fecha1 = new Date(usuario.fechaNacimiento);
    var fechatxt = fecha1.getDate() + "/" + fecha1.getMonth() + 1 + "/" + fecha1.getFullYear();
    $("#fechaNacimiento").data({date: fechatxt});
    $("#inputFechaNacimiento").val(fechatxt);
    $("#inputTelefono").val(usuario.telefono);
    $("#inputDireccion").val(usuario.direccion);
    $("#inputTipo").val(usuario.tipo);
    //$("#myModalFormulario").modal();
    $("#usuarioAction").val("modificarUsuario");
}

function activaForm() {
    $("#inputNombreUsuario").attr("disabled", "true");
    $("#inputContrasena1").removeAttr("disabled");
    $("#inputContrasena2").removeAttr("disabled");
    $("#inputNombre").removeAttr("disabled");
    $("#inputApellido1").removeAttr("disabled");
    $("#inputApellido2").removeAttr("disabled");
    $("#inputCorreo").removeAttr("disabled");
    $("#inputFechaNacimiento").removeAttr("disabled");
    $("#inputTelefono").removeAttr("disabled");
    $("#inputDireccion").removeAttr("disabled");
    $("#inputTipo").removeAttr("disabled");
}
function desactivaForm() {
    $("#inputNombreUsuario").removeAttr("disabled");
    $("#inputContrasena1").attr("disabled", "true");
    $("#inputContrasena2").attr("disabled", "true");
    $("#inputNombre").attr("disabled", "true");
    $("#inputApellido1").attr("disabled", "true");
    $("#inputApellido2").attr("disabled", "true");
    $("#inputCorreo").attr("disabled", "true");
    $("#inputFechaNacimiento").attr("disabled", "true");
    $("#inputTelefono").attr("disabled", "true");
    $("#inputDireccion").attr("disabled", "true");
    $("#inputTipo").attr("disabled", "true");
}

function verificaNombreUsuarioEdicion(usuario) {
    var nombree = $("#inputNombreUsuario").val();
    $.ajax({
        url: '../UsuarioServlet',
        data: {
            accion: "verificarNombreUsuario",
            nombreUsuario: nombree
        },
        error: function () {
            mostrarMensaje("alert alert-danger", "Se genero un error, contacte al administrador (Error del ajax)", "Error!");
        },
        success: function (data) {
            var respuestaTxt = data.substring(2);
            var tipoRespuesta = data.substring(0, 2);
            if (tipoRespuesta !== "E~" || nombree === usuario.nombreUsuario) {
                $("#inputNombreUsuario").val(nombree);
                $("#inputNombreUsuario").addClass("correcto");
                $("#collapseOne").addClass('show');
                desactivaForm();
                //activaForm();
            } else {
                $("#inputNombreUsuario").addClass("error");
                desactivaForm();

            }
        },
        type: "POST",
        dataType: "text"
    });
}

function aux(usuario){
    var unica = usuario.nombreUsuario;     
}
var unica = "";

function verificaNombreUsuario(id, tam, mensaje) {
    var nombree = $("#inputNombreUsuario").val();
    $.ajax({
        url: '../UsuarioServlet',
        data: {
            accion: "verificarNombreUsuario",
            nombreUsuario: nombree
        },
        error: function () {
            mostrarMensaje("alert alert-danger", "Se genero un error, contacte al administrador (Error del ajax)", "Error!");
        },
        success: function (data) {
            var respuestaTxt = data.substring(2);
            var tipoRespuesta = data.substring(0, 2);
            if (tipoRespuesta !== "E~") {
                if (validaTamMin(id, tam, mensaje)) {
                    $("#inputNombreUsuario").val(nombree);
                    $("#inputNombreUsuario").addClass("correcto");
                    $("#collapseOne").addClass('show');
                    alert("Nombre de usuario verificado correctamente, proceda a llenar los demás campos");
                    activaForm();
                }
            } else {
                $("#inputNombreUsuario").addClass("error");
                if ( $("#usuarioAction").val() === "modificarUsuario" && $("#inputNombreUsuario").val() === "...." ) { //????
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
