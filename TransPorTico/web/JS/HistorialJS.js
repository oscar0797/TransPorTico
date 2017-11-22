/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$ ( document ).ready ( function ( )
{
    consultarHistorialUsuario ( 1 ) ;
} ) ;

function consultarHistorialUsuario ( numpag )
{
//    alert ( $( "#userServiceInput" ).val ( ) ) ;
    
    $.ajax
    ( {
        url: '../HistorialServlet',
        data:
        {
            accion: "consultarHistorialUsuario",
            FKidUsuario: $( "#userServiceInput" ).val ( )
        },
        error: function ( )
        {
            alert ( "Adios mundo" ) ;
        },
        success: function ( data )
        {
            dibujarTablaHistorial ( numpag, data ) ;
        },
        type: 'POST',
        dataType: "json"
    } ) ;
}

function dibujarTablaHistorial ( numpag, data )
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
    
    var cont = 0 ;
    var a = 10 * ( numpag - 1 ) ;
    
    for ( var a = 0 ; a < data.length && ( cont < 10 ) ; a ++, cont ++ )
    {
        dibujarFilaHistorial ( data [ a ] ) ;
    }
}

function dibujarFilaHistorial ( data )
{
    var row = $( '<tr />' ) ;
    $ ( "#tablaHistorial" ).append ( row ) ;
    row.append ( $ ( "<th>" + data.vehiculo + "</th>" ) ) ;
    Geocodificador_inverso ( row, data, "origen" ) ;
    Geocodificador_inverso ( row, data, "destino" ) ;
    Geocodificador_inverso ( row, data, "otro" ) ;
}