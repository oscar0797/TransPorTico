// Autor: Justin Vega.
// Fecha: 27 de septiembre de 2017.

var Destino_seleccionado = false ;

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
        
        // Autocompletado
        
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
            Marcador_del_mapa_de_Google.setPosition ( Lugar_nuevo.geometry.location ) ; alert ( Destino_seleccionado ) ;
            
            if ( Destino_seleccionado === true )
            {
                var DS = new google.maps.DirectionsService ;
                var DR = new google.maps.DirectionsRenderer ;
            
                DR.setMap ( Mapa_de_Google ) ;
            
                Dibujar_ruta ( DS, DR ) ;
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
			
            // Marcar ruta en el mapa
            
            var DS = new google.maps.DirectionsService ;
            var DR = new google.maps.DirectionsRenderer ;
			
            DR.setMap ( Mapa_de_Google ) ;
			
            Dibujar_ruta ( DS, DR ) ;
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
    } ) ;
} ) ;