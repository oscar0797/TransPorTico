/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$( document ).ready
(
    function ( )
    {
        $ ( "#seleccionar_vehiculo" ).attr ( "disabled", "true" ) ;
    }
) ;

 function solicitar_viaje ( )
{
    if ( validar_origen_y_destino ( ) )
    {
        $( "#Autocompletado_de_origen" ).attr ( "disabled", "true" ) ;
        $( "#Autocompletado_de_destino" ).attr ( "disabled", "true" ) ;
        $( "#seleccionar_vehiculo" ).removeAttr ( "disabled", ) ;
        
        consultar_vehiculos_activos ( ) ;
    }
    else
    {
        alert ( "Error :-(" ) ;
    }
}

function validar_origen_y_destino ( )
{
    var validacion = true ;

    $( "#Autocompletado_de_origen" ).removeClass ( "error" ) ;
    $( "#Autocompletado_de_destino" ).removeClass ( "error" ) ;

    if ( $( "#Autocompletado_de_origen" ).val ( ) === "" )
    {
        $( "#Autocompletado_de_origen" ).addClass ( "error" ) ;
        validacion = false ;
    }
    if ( $( "#Autocompletado_de_destino" ).val ( ) === "" )
    {
        $( "#Autocompletado_de_destino" ).addClass ( "error" ) ;
        validacion = false ;
    }

    return validacion ;
}

function consultar_vehiculos_activos ( )
{
    $.ajax
    ( {
        url: '../VehiculoServlet',
        data:
        {
            accion: "consultarVehiculosActivos"
        },
        error: function ( )
        {
            alert ( "Error al cargar en la base de datos" ) ;
        },
        success: function ( data )
        {
            // alert ( "Se estan consultando los vehiculos activos" ) ;
            dibujar_una_cosa ( data ) ;
        },
        type: 'POST',
        dataType: "json"
    } ) ;
}

function dibujar_una_cosa ( data )
{
    $ ( "#seleccionar_vehiculo" ).html ( "" ) ;
    var opcion_por_defecto = $ ( "<option value=0 selected> -- </option>" ) ;
    $ ( "#seleccionar_vehiculo" ).append ( opcion_por_defecto ) ;
    
    for ( var a = 0 ; a < data.length ; a ++ )
    {
        $ ( "#seleccionar_vehiculo" ).append ( $ ( "<option value=" + data[ a ].pkIdVehiculo + ">" + data [ a ].placa + "</option>" ) ) ;
    }
}