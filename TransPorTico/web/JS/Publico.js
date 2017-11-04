/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Genera el datapicker     
$(function () {
    //Genera el datapicker
    $('#fechaVencimiento').datetimepicker({
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });
    $('#fechaNacimiento').datetimepicker({
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });
});


//******************************************************************************
//******************************************************************************
//El metodo enviar envia la información del login
//******************************************************************************
//******************************************************************************

function enviar() {
    if (validar()) {
        mostrarModal("myModal", "Espere por favor..", "Cargando información de Usuario");
        $.ajax({
            url: '../PublicoServlet',
            data: {
                accion: "loginUsuario",
                nombreUsuario: $("#inputNombreUsuario").val(),
                contrasena: $("#inputContrasena").val()
            },
            error: function () { //si existe un error en la respuesta del ajax   
                mostrarMensaje("mesajeResult", "alert alert-danger", "Se genero un error, contacte al administrador (Error del ajax)", "Error!");
            },
            success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
                // se cambia el mensaje del modal por la respuesta del ajax
                var respuestaTxt = data.substring(2);
                var tipoRespuesta = data.substring(0, 2);
                if (tipoRespuesta === "E~") {
                    mostrarMensaje("mesajeLogin", "alert alert-danger", respuestaTxt, "Error!");
                    $('#myModalIngreso').modal('show');
                } else {
                    window.location.pathname = respuestaTxt;
                }
            },
            type: 'POST',
            dataType: "text"
        });
    } else {
        alert("Debe digitar los campos del formulario");
    }
}

function validar() {
    var validacion = true;

    //Elimina estilo de error en los css
    //notese que es sobre el grupo que contienen el input
    $("#groupNombreUsuario").removeClass("error");
    $("#groupContrasena1").removeClass("error");

    //valida cada uno de los campos del formulario
    //Nota: Solo si fueron digitados
    if ($("#inputNombreUsuario").val() === "") {
        $("#groupNombreUsuario").addClass("error");
        validacion = false;
    }
    if ($("#inputContrasena1").val() === "") {
        $("#groupContrasena1").addClass("error");
        validacion = false;
    }
    return validacion;
}


//******************************************************************************
//******************************************************************************

function mostrarMensaje(classCss, msg, neg) {
    //se le eliminan los estilos al mensaje
    $("#mesajeResult").removeClass();

    //se setean los estilos
    $("#mesajeResult").addClass(classCss);

    //se muestra la capa del mensaje con los parametros del metodo
    $("#mesajeResult").fadeIn("slow");
    $("#mesajeResultNeg").html(neg);
    $("#mesajeResultText").html(msg);
    $("#mesajeResultText").html(msg);
}

//******************************************************************************
//******************************************************************************

function limpiarForm() {
    //setea el focus del formulario
    $('#usuario').focus();

    //Resetear el formulario
    $('#formLogin').trigger("reset");
}


