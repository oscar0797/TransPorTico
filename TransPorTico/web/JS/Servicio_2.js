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
    var coordenadas_de_los_autos = [] ;
    
    $ ( "#seleccionar_vehiculo" ).html ( "" ) ;
    var opcion_por_defecto = $ ( "<option value=0 selected> -- </option>" ) ;
    $ ( "#seleccionar_vehiculo" ).append ( opcion_por_defecto ) ;
    
    for ( var a = 0 ; a < data.length ; a ++ )
    {
        coordenadas_de_los_autos.push ( { lat: data [ a ].ubicacionX, lng: data [ a ].ubicacionY } ) ;
    }
    
    Calcular_la_distancia_del_vehiculo ( coordenadas_de_los_autos, data ) ;
    
    // alert ( coordenadas_de_los_autos [ 0 ] ) ;
}

paypal.Button.render
( {
    env: 'sandbox',
    
    commit: true,
    
    style:
    {
        color: 'gold',
        size: 'small'
    },
    
    payment: function ( data, actions )
    {
        alert ( "Ejecutando el payment" ) ;
        registrarHistorial ( ) ;
    },
    
    onAuthorize: function ( data, actions )
    {
        alert ( "Ejecutando el onAuthorize" ) ;
    },
    
    onCancel: function ( data, actions )
    {
        alert ( "Ejecutando el onCancel" ) ;
    },
    
    onError: function ( err )
    {
        alert ( "Ejecutando el onError" ) ;
    }
},
'#paypal-button'
) ;

function registrarHistorial ( )
{
    if ( true )
    {
        $.ajax
        ( {
            url: '../HistorialServlet',
            data:
            {
                accion: "agregarHistorial",
                FKidVehiculo: $( "#seleccionar_vehiculo" ).val ( ),
                FKidChofer: "1",
                FKidUsuario: "1",
                origenX: $( "#x_de_origen" ).val ( ) ,
                origenY: $( "#y_de_origen" ).val ( ),
                destinoX: $( "#x_de_destino" ).val ( ),
                destinoY: $( "#y_de_destino" ).val ( ),
                monto: $( "#input_de_costo" ).val ( ),
                tiempo: $( "#input_de_distancia_2" ).val ( )
            },
            error: function ( )
            {
                alert ( "Se generó un error, contacte al administrador" ) ;
            },
            success: function ( data )
            {
                var respuestaTxt = data.substring ( 2 ) ;
                var tipoRespuesta = data.substring ( 0, 2 ) ;
                
                if ( tipoRespuesta === "E~" )
                {
                    alert ( "Se generó un error: :-( ", respuestaTxt ) ;
                }
                else
                {
                    alert ( "El viaje se ha solicitado exitosamente" ) ;
                }
            },
            type: "POST",
            dataType: "text"
        } ) ;
    }
    else
    {
        alert ( "Hay que validar" ) ;
    }
}