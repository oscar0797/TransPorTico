/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function validaNum(id) {
    var value = $('#input' + id).val();
    var size = value.length;
    var kpress = value[size - 1];
    var sada = parseInt(kpress);
    if (isNaN(sada) && size > 0) {
        $('#input' + id).val(value.slice(0, size - 1));
        $("#input" + id).addClass("error");
        //mostrarMensaje("alert alert-warning", "No se permiten letras", "Error!");
    }
}
