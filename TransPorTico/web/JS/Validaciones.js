/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function validaNum(id) {
    var value = $('#' + id).val();
    var size = value.length;
    var kpress = value[size - 1];
    var sada = parseInt(kpress);
    if (isNaN(sada) && size > 0) {
        $('#' + id).val(value.slice(0, size - 1));
        $("#" + id).addClass("error");
        alert("Debe digitar sólo números")
    }
}

function validaTamMax(id, tam, mensaje) {
    var nombre = $('#' + id).val();
    if (nombre.length() > tam) {
        $('#' + id).val(nombre.slice(0, tam));
        $('#' + id).addClass("error");
        alert(mensaje);
    }
}
function validaTamMin(id, tam, mensaje) {
    var nombre = $('#' + id).val();
    if (nombre.length < tam) {
        $('#' + id).val(nombre.slice(0, tam));
        $('#' + id).addClass("error");
        alert(mensaje);
        return false;
    } else {
        return true;
    }
}


function ayuda(input, mensaje) {
    $("#" + input).blur(function () {
        var inputVal = $(this).val(),
                titleText = mensaje;
        if (inputVal != '') {
            $(this).tooltip({
                title: titleText,
                trigger: 'focus',
                container: 'form'
            });
        }
    });
}

function verificaCedulaRegistro(id, tam, mensaje) {
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
            if (tipoRespuesta !== "E~") {
                if (validaTamMin(id, tam, mensaje)) {
                    $("#inputCedula").val(cedulaa);
                    $("#inputCedula").addClass("correcto");
                    $("#collapseOne").addClass('show');
                    alert("Cédula verificada correctamente, proceda a llenar los demás campos");
                    activaForm();
                }
            } else {
                $("#inputCedula").addClass("error");
                alert("La cédula ya existe, por favor digite una nueva");
            }
        },
        type: "POST",
        dataType: "text"
    });
}


function validaSoloTexto(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
    especiales = "8-9-37-38-39-46-164";

    tecla_especial = false;
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }
    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        alert("Debe digitar sólo texto")
        return false;

    }
}

function busquedaPalabraClave(idTabla, idInput) {
    var tableReg = document.getElementById(idTabla);
    var searchText = document.getElementById(idInput).value.toLowerCase();
    var cellsOfRow = "";
    var found = false;
    var compareWith = "";

    // Recorremos todas las filas con contenido de la tabla
    for (var i = 1; i < tableReg.rows.length; i++) {
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

function verificaPlacaRegistro(id, tam, mensaje) {
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
                    activaFormVehiculo();
                }
            } else {
                $("#inputPlaca").addClass("error");
                alert("La placa ya existe, por favor digite una nueva");
            }
        },
        type: "POST",
        dataType: "text"
    });
}