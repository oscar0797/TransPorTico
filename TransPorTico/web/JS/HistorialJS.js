/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$ ( document ).ready ( function ( )
{
    consultarHistorial ( 1 ) ;
} ) ;

function consultarHistorial ( numpag )
{
    $.ajax
    ( {
        url: '../HistorialServlet',
        data:
        {
            accion: "consultarHistorial"
        },
        error: function ( )
        {
            dibujarTabla ( numpag ) ;
        },
        success: function ( data )
        {
            alert ( "Hola mundo" ) ;
        },
        type: 'POST',
        dataType: "json"
    } ) ;
}

function dibujarTabla ( numpag, data )
{
    $( "#tablaHistorial" ).html ( "" ) ;
    var head = $( "<thead />" ) ;
    var row = $( "<tr />" ) ;
    
    head.append ( row ) ;
    
    $( "#tablaHistorial" ).append ( head ) ;
    row.append ( $( "<th><b>ID del vehículo</b></th>" ) ) ;
    row.append ( $( "<th><b>Orige</b></th>" ) ) ;
    row.append ( $( "<th><b>Destino</b></th>" ) ) ;
    row.append ( $( "<th><b>Monto</b></th>" ) ) ;
    row.append ( $( "<th><b>Tiempo de llegada</b></th>" ) ) ;
    row.append ( $( "<th><b>Cometarios</b></th>" ) ) ;
}