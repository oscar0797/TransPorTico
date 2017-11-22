// Autor: Justin Vega.
// Fecha: 27 de septiembre de 2017.

var Destino_seleccionado = false ;

var objeto_de_configuracion_del_DistanceMatrixService =
{
    origins: null,
    destinations: null,
    travelMode: 'DRIVING',
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false
}

const Servicio_de_Google = new google.maps.DistanceMatrixService ;

var distancia ;

google.maps.event.addDomListener ( window, "load", function ( )
{
    const Ubicacion = new Geolocalizacion ( ( ) =>
    {
        var mapa = document.getElementById ( 'Soy_el_mapa' ) ;
        
        const Objeto_de_configuracion_del_mapa =
        {
            center:
            {
                lat: Ubicacion.latitude,
                lng: Ubicacion.longitude
            },
            zoom: 15
        }
        
        const Mapa_de_Google = new google.maps.Map ( mapa, Objeto_de_configuracion_del_mapa ) ;
        
        // Marcador de la ubicación del usuario
        
        const Marcador_del_mapa_de_Google = new google.maps.Marker (
        {
            position:
            {
                lat: Ubicacion.latitude,
                lng: Ubicacion.longitude
            },
            map: Mapa_de_Google,
            title: 'Ubicación actual'
        } ) ;
        
        const Marcador_del_mapa_de_Google_2 = new google.maps.Marker (
        {
            position:
            {
                lat: Ubicacion.latitude,
                lng: Ubicacion.longitude
            },
            map: Mapa_de_Google,
            title: 'Ubicacion de destino'
        } ) ;
        
        Marcador_del_mapa_de_Google_2.setVisible ( false ) ;
        
        // Geocodificador
        
        var Geocodificador_de_Google = new google.maps.Geocoder ;
        
        var coordenadas_geograficas =
        {
            lat: Ubicacion.latitude,
            lng: Ubicacion.longitude
        }
        
        Geocodificador_de_Google.geocode
        (
            {
                'location': coordenadas_geograficas
            },
            function ( results, status )
            {
                if ( results, status )
                {
                    if ( results [1] )
                    {
                        document.getElementById ( 'Autocompletado_de_origen' ).value = results [1].formatted_address ;
                    }
                    else
                    {
                        alert ( 'No results found' ) ;
                    }
                }
                else
                {
                    alert( 'Geocoder failed due to: ' + status ) ;
                }
            }
        ) ;
        
        // Autocompletado

        var objeto_de_configuracion_del_DirectionsService =
        {
            map: Mapa_de_Google,
            suppressMarkers: true
        }

        var DS = new google.maps.DirectionsService ;
        var DR = new google.maps.DirectionsRenderer ( objeto_de_configuracion_del_DirectionsService ) ;

//        var objeto_de_configuracion_del_DistanceMatrixService =
//        {
//            origins: [ Marcador_del_mapa_de_Google.getPosition ( ) ],
//            destinations: [ Marcador_del_mapa_de_Google_2.getPosition ( ) ],
//            travelMode: 'DRIVING',
//            unitSystem: google.maps.UnitSystem.METRIC,
//            avoidHighways: false,
//            avoidTolls: false
//        }
//
//        const Servicio_de_Google = new google.maps.DistanceMatrixService ;
        
        var Autocompletado_de_origen = document.getElementById ( 'Autocompletado_de_origen' ) ;
        
        const Autocompletado_de_Google = new google.maps.places.Autocomplete ( Autocompletado_de_origen ) ;
        
        Autocompletado_de_Google.bindTo ( "bounds", Mapa_de_Google ) ;
        Autocompletado_de_Google.addListener ( 'place_changed', function ( )
        {
            var Lugar_nuevo = Autocompletado_de_Google.getPlace ( ) ;
            
            if ( !Lugar_nuevo.geometry.viewport )
            {
                alert ( 'Error :-(' ) ;
                return ;
            }
            if ( Lugar_nuevo.geometry.viewport )
            {
                Mapa_de_Google.fitBounds ( Lugar_nuevo.geometry.viewport ) ;
            }
            else
            {
                Mapa_de_Google.setCenter ( Lugar_nuevo.geometry.location ) ;
            }
            Marcador_del_mapa_de_Google.setPosition ( Lugar_nuevo.geometry.location ) ; // alert ( Destino_seleccionado ) ;
            
            if ( Destino_seleccionado === true )
            {
                document.getElementById ( 'x_de_origen' ).value = Marcador_del_mapa_de_Google.getPosition ( ).lat ( ) ;
                document.getElementById ( 'y_de_origen' ).value = Marcador_del_mapa_de_Google.getPosition ( ).lng ( ) ;
                document.getElementById ( 'x_de_destino' ).value = Marcador_del_mapa_de_Google_2.getPosition ( ).lat ( ) ;
                document.getElementById ( 'y_de_destino' ).value = Marcador_del_mapa_de_Google_2.getPosition ( ).lng ( ) ;
            
                Dibujar_ruta ( DS, DR ) ;

                objeto_de_configuracion_del_DistanceMatrixService.origins = [ Marcador_del_mapa_de_Google.getPosition ( ) ] ;
                objeto_de_configuracion_del_DistanceMatrixService.destinations = [ Marcador_del_mapa_de_Google_2.getPosition ( ) ] ;

                Servicio_de_Google.getDistanceMatrix ( objeto_de_configuracion_del_DistanceMatrixService, Calcular_distancia ) ;
            }
        } ) ;
        
        var Autocompletado = document.getElementById ( 'Autocompletado_de_destino' ) ;
        
        const Autocompletado_de_Google_2 = new google.maps.places.Autocomplete ( Autocompletado ) ;
        
        Autocompletado_de_Google_2.bindTo ( "bounds", Mapa_de_Google ) ;
        Autocompletado_de_Google_2.addListener ( 'place_changed', function ( )
        {
            var Lugar_nuevo = Autocompletado_de_Google_2.getPlace ( ) ; // alert ( 'Linea 44' ) ;
            
            if ( !Lugar_nuevo.geometry.viewport )
            {
                window.alert ( 'Error :-(' ) ;
                return ;
            }
            if ( Lugar_nuevo.geometry.viewport )
            {
                Mapa_de_Google.fitBounds ( Lugar_nuevo.geometry.viewport ) ;
            }
            else
            {
                Mapa_de_Google.setCenter ( Lugar_nuevo.geometry.location ) ;
            }
            
            Marcador_del_mapa_de_Google_2.setPosition ( Lugar_nuevo.geometry.location ) ;
            Marcador_del_mapa_de_Google_2.setVisible ( true ) ;
            Destino_seleccionado = true ;

            document.getElementById ( 'x_de_origen' ).value = Marcador_del_mapa_de_Google.getPosition ( ).lat ( ) ;
            document.getElementById ( 'y_de_origen' ).value = Marcador_del_mapa_de_Google.getPosition ( ).lng ( ) ;
            document.getElementById ( 'x_de_destino' ).value = Marcador_del_mapa_de_Google_2.getPosition ( ).lat ( ) ;
            document.getElementById ( 'y_de_destino' ).value = Marcador_del_mapa_de_Google_2.getPosition ( ).lng ( ) ;
			
            Dibujar_ruta ( DS, DR ) ;

            objeto_de_configuracion_del_DistanceMatrixService.origins = [ Marcador_del_mapa_de_Google.getPosition ( ) ] ;
            objeto_de_configuracion_del_DistanceMatrixService.destinations = [ Marcador_del_mapa_de_Google_2.getPosition ( ) ] ;

            Servicio_de_Google.getDistanceMatrix ( objeto_de_configuracion_del_DistanceMatrixService, Calcular_distancia ) ;
        } ) ;
		
	function Dibujar_ruta ( DS, DR )
	{
            // alert ( 'Ejecutando Dibujar_ruta' ) ;
            // alert ( Marcador_del_mapa_de_Google.getPosition ( ) ) ;
            // alert ( Marcador_del_mapa_de_Google_2.getPosition ( ) ) ;
			
            DS.route (
            {
		origin: Marcador_del_mapa_de_Google.getPosition ( ),
		destination: Marcador_del_mapa_de_Google_2.getPosition ( ),
		travelMode: 'DRIVING'
            },
            function ( Respuesta, Status )
            {
		if ( Status === 'OK' )
		{
                    DR.setDirections ( Respuesta ) ;
		}
		else
		{
                    alert ( 'Error' + Status ) ;
		}
            } ) ;
    }
    
    function Calcular_distancia ( Respuesta, Status )
    {
        // alert ( "Ejecutando Calcular_distancia" ) ;

        if ( Status === 'OK' )
        {
            var origen = Respuesta.originAddresses ;
            var destino = Respuesta.destinationAddresses ;

            for ( var a = 0 ; a < origen.length ; a ++ )
            {
                var resultados = Respuesta.rows [ a ].elements ;

                for ( var b = 0 ; b < resultados.length ; b ++ )
                {
                    var element = resultados [ b ] ;
                    
                    document.getElementById ( 'input_de_distancia' ).value = element.distance.text ;
                    document.getElementById ( 'input_de_costo' ).value = ( ( element.distance.value / 1000 ) * 420 ) ;
                    document.getElementById ( 'input_de_costo_en_dolares' ).value = ( ( ( element.distance.value / 1000 ) * 420 ) / 599 ) ;
                    document.getElementById ( 'input_de_tiempo_estimado' ).value = element.duration.text ;
                    // alert ( element.duration.value / 60 ) ;
                    document.getElementById ( 'input_de_distancia_2' ).value = element.duration.value ;
                }
            }
        }
        else
        {
            alert ( 'Error was: ' + Status ) ;
        }
    }
    } ) ;
} ) ;

function Calcular_la_distancia_del_vehiculo ( coordenadas_de_los_vehiculos, data )
{
    var coordenadas_del_usuario = [ ] ;
    
    var latitud_del_usuario = objeto_de_configuracion_del_DistanceMatrixService.origins [ 0 ].lat ( ) ;
    var longitud_del_usuario = objeto_de_configuracion_del_DistanceMatrixService.origins [ 0 ].lng ( ) ;
    
    objeto_de_configuracion_del_DistanceMatrixService.destinations = coordenadas_de_los_vehiculos ;
    
    for ( var a = 0 ; a < coordenadas_de_los_vehiculos.length ; a ++ )
    {
        coordenadas_del_usuario.push ( { lat: latitud_del_usuario, lng: longitud_del_usuario } ) ;
    }
    
    objeto_de_configuracion_del_DistanceMatrixService.origins = coordenadas_del_usuario ;
    
    Servicio_de_Google.getDistanceMatrix ( objeto_de_configuracion_del_DistanceMatrixService, function ( Respuesta, Status )
    {
        if ( Status === 'OK' )
        {
            var origen = Respuesta.originAddresses ;
            var destino = Respuesta.destinationAddresses ;
            
            for ( var a = 0 ; a < origen.length ; a ++ )
            {
                var resultados = Respuesta.rows [ a ].elements ;
                
                for ( var b = 0 ; b < resultados.length ; b ++ )
                {
                    var element = resultados [ b ] ;
                    
                    if ( element.distance.value < 5000 )
                    {                    
                        $ ( "#seleccionar_vehiculo" ).append ( $ ( "<option value=" + data[ b ].pkIdVehiculo + ">" + data [ b ].placa + "</option>" ) ) ;
                        
//                        alert ( data [ b ].pkIdVehiculo ) ;
                    }
                }
            }
        }
        else
        {
            alert ( 'Error was: ' + Status ) ;
        }
    } ) ;
}

function Geocodificador_inverso ( row, data, aux )
{
    alert ( "Ejecutando Geocodificador_inverso" ) ;
    
    if ( aux === "origen" )
    {
        coordenadas = { lat: data.origenX, lng: data.origenY }
    }
    else
    {
        coordenadas = { lat: data.destinoX, lng: data.destinoY }
    }
    
    var Geocodificador = new google.maps.Geocoder ;
    
    Geocodificador.geocode
    (
        {
            'location': coordenadas
        },
        function ( results, status )
        {
            if ( status === 'OK' )
            {
                if ( results [ 1 ] )
                {
                    if ( aux === "otro" )
                    {
                        for ( var a = 0 ; a < 1000 ; a ++ )
                        {
                            
                        }
                        row.append ( $ ( "<th>" + data.monto + "</th>" ) ) ;
                    }
                    else
                    {
                        row.append ( $ ( "<th>" +  results [ 1 ].formatted_address + "</th>" ) ) ;
                    }
                }
                else
                {
                    aler ( 'No results found' ) ;
                }
            }
            else
            {
                alert ( "Geocoder failed due to: " + status ) ;
            }
        }
    ) ;
}