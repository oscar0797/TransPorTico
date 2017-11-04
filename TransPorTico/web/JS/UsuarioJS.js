/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var unica = "";

$(document).ready(function () {
    consultarUsuarios(1);
    // paginador(1);

    $("form").submit(function (event) {
        if (validar() === false) {
            event.preventDefault();
        }
    });
    
    desactivaForm();
    $("#inputNombreUsuario").click(ayuda("inputNombreUsuario", 'Sólo texto'));
    $("#inputNombre").click(ayuda("inputNombre", 'Sólo texto'));
    $("#inputApellido1").click(ayuda("inputApellido1", 'Sólo texto'));
    $("#inputApellido2").click(ayuda("inputApellido2", 'Sólo texto'));
    $("#inputDireccion").click(ayuda("inputDireccion", 'Sólo texto'));
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
        $("#collapseOne").addClass('show');
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
            paginador(numpag, data.length / 10);
            doSearch(data);
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
function paginador(pagAct, tam) {
    var ini = 1;
    $("#paginacionOpc").html("");
    if (pagAct > 5) {
        ini = pagAct - 5;
        $("#paginacionOpc").append('<li onclick="consultarUsuarios(' + ini + '),paginador(' + (pagAct - 1) + ',' + tam + ')"><a>&laquo;</a></li>');
    } else {
        $("#paginacionOpc").append('<li onclick="consultarUsuarios(' + ini + '), paginador(' + (pagAct - 1) + ',' + tam + ')" ><a>&laquo;</a></li>');
    }
    for (var i = 0; i < tam; i++, ini++) {
        if (ini === pagAct) {
            $("#paginacionOpc").append('<li class="active" onclick="consultarUsuarios(' + ini + '),paginador(' + ini + ',' + tam + ') "><a>' + ini + '</a></li> ');
        } else {
            $("#paginacionOpc").append('<li onclick="consultarUsuarios(' + ini + '),paginador(' + ini + ',' + tam + ') "><a>' + ini + '</a></li>');
        }
    }
    $("#paginacionOpc").append('<li onclick="consultarUsuarios(' + (ini - 1) + '), paginador(' + (ini - 1) + ',' + tam + ')"><a>&raquo;</a></li>');
}

function limpiarForm() {
    $('#formularioUsuario').trigger("reset");
}

function validar() {
    var validacion = true;

    //Elimina estilo de error en los css
    //notese que es sobre el grupo que contienen el input
    $("#inputNombreUsuario").removeClass("error");
    $("#inputContrasena1").removeClass("error");
    $("#inputContrasena2").removeClass("error");
    $("#inputPasswordConfirm").removeClass("error");
    $("#inputNombre").removeClass("error");
    $("#inputApellido1").removeClass("error");
    $("#inputApellido2").removeClass("error");
    $("#inputCorreo").removeClass("error");
    $("#inputTelefono").removeClass("error");
    $("#inputDireccion").removeClass("error");
    $("#inputFechaNacimiento").removeClass("error");
    $("#inputTipo").removeClass("error");
    // $("#inputDireccion").removeClass("error");
    //valida cada uno de los campos del formulario
    //Nota: Solo si fueron digitadoslse;
    if ($("#inputNombreUsuario").val() === "") {
        $("#inputNombreUsuario").addClass("error");
        validacion = false;
    }
    if ($("#inputContrasena1").val() === "") {
        $("#inputContrasena1").addClass("error");
        validacion = false;
    }
    if ($("#inputContrasena2").val() === "") {
        $("#inputContrasena2").addClass("error");
        validacion = false;
    }
    if ($("#inputNombre").val() === "") {
        $("#inputNombre").addClass("error");
        validacion = false;
    }
    if ($("#inputApellido1").val() === "") {
        $("#inputApellido1").addClass("error");
        validacion = false;
    }
    if ($("#inputApellido2").val() === "") {
        $("#inputApellido2").addClass("error");
        validacion = false;
    }
    if ($("#inputCorreo").val() === "") {
        $("#inputCorreo").addClass("error");
        validacion = false;
    }
    if ($("#inputTelefono").val() === "") {
        $("#inputTelefono").addClass("error");
        validacion = false;
    }
    if ($("#inputDireccion").val() === "") {
        $("#inputDireccion").addClass("error");
        validacion = false;
    }
    if ($("#inputFechaNacimiento").val() === "") {
        $("#inputFechaNacimiento").addClass("error");
        validacion = false;
    }
    if ($("#inputTipo").val() === "") {
        $("#inputTipo").addClass("error");
        validacion = false;
    }
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

function aux(usuario) {
    var unica = usuario.nombreUsuario;
}

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

function as() {
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
            var tableReg = document.getElementById('tablaUsuarios');
            var searchText = document.getElementById('buscar').value.toLowerCase();
            var cellsOfRow = "";
            var found = false;
            var compareWith = "";
            var tt = $("#buscar").val();
            //var cc = document.getElementById("#buscar").val();

            // Recorremos todas las filas con contenido de la tabla
            for (var i = 1; i < data.length; i++) {
                if (tt === data.nombreUsuario) {
                    tableReg.rows[i].style.display = '';
                }
                /*
                 cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
                 found = false;
                 // Recorremos todas las celdas
                 for (var j = 0; j < cellsOfRow.length && !found; j++) {
                 compareWith = cellsOfRow[j].innerHTML.toLowerCase();
                 // Buscamos el texto en el contenido de la celda
                 if (searchText.length == 0 || (compareWith.indexOf(searchText) > -1))
                 {
                 found = true;
                 }
                 }
                 if (found) {
                 tableReg.rows[i].style.display = '';
                 } else {
                 // si no ha encontrado ninguna coincidencia, esconde la
                 // fila de la tabla
                 tableReg.rows[i].style.display = 'none';
                 }
                 */
            }

        },
        type: 'POST',
        dataType: "json"
    });
}

function doSearch(data) {
    var tableReg = document.getElementById('tablaUsuarios');
    var searchText = document.getElementById('buscar').value.toLowerCase();
    var cellsOfRow = "";
    var found = false;
    var compareWith = "";

    // Recorremos todas las filas con contenido de la tabla
    for (var i = 1; i < data.length; i++) {
        cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
        found = false;
        // Recorremos todas las celdas
        for (var j = 0; j < cellsOfRow.length && !found; j++) {
            compareWith = cellsOfRow[j].innerHTML.toLowerCase();
            // Buscamos el texto en el contenido de la celda
            if (searchText.length == 0 || (compareWith.indexOf(searchText) > -1))
            {
                found = true;
            }
        }
        if (found) {
            tableReg.rows[i].style.display = '';
        } else {
            // si no ha encontrado ninguna coincidencia, esconde la
            // fila de la tabla
            tableReg.rows[i].style.display = 'none';
        }
    }
}

function buscarUsuario() {
    var nombree = $("#buscar").val();
    $.ajax({
        url: '../UsuarioServlet',
        data: {
            accion: "buscarNombreUsuario",
            nombreUsuario: nombree
        },
        error: function () {
            mostrarMensaje("alert alert-danger", "Se genero un error, contacte al administrador (Error del ajax)", "Error!");
            $("#buscar").addClass("error");
            alert("No se encontró al usuario, digite una nueva busqueda");
        },
        success: function (data) {
            
            var respuestaTxt = data.substring(2);
            var tipoRespuesta = data.substring(0, 2);
            dibujarTabla(1, data);
        },
        type: "POST",
        dataType: "text"
    });
}
