/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Mapa_de_Google = null ;

const Marcado_del_mapa_de_Google = null ;

var Geocodificador = new google.maps.Geocoder ;

function Dibujar_un_mapa ( )
{
    // alert ( "Hola mapa" ) ;
    
    setTimeout
    (
        function ( )
        {    
            var mapa = document.getElementById ( 'Mapa_de_vehiculo' ) ;

            const Objeto_de_configuracion_del_mapa =
            {
                center:
                {
                    lat: 9.999541,
                    lng:  -84.111347
                },
                zoom: 14
            }

            Mapa_de_Google = new google.maps.Map ( mapa, Objeto_de_configuracion_del_mapa ) ;
        },
        1000
    ) ;
}

function Obtener_ubicacion ( )
{
    const Ubicacion = new Geolocalizacion ( ( ) =>
    {
        var mapa = document.getElementById ( 'Mapa_de_vehiculo' ) ;

        const Objeto_de_configuracion_del_mapa =
        {
            center:
            {
                lat: Ubicacion.latitude,
                lng: Ubicacion.longitude
            },
            zoom: 15
        }
            
        Mapa_de_Google = new google.maps.Map ( mapa, Objeto_de_configuracion_del_mapa ) ;
        
        Marcador_del_mapa_de_Google = new google.maps.Marker (
        {
            position:
            {
                lat: Ubicacion.latitude,
                lng: Ubicacion.longitude
            },
            map: Mapa_de_Google,
            title: 'Ubicación actual'
        } ) ;

//        var Geocodificador = new google.maps.Geocoder ;
        
        var coordenadas_geograficas =
        {
            lat: Ubicacion.latitude,
            lng: Ubicacion.longitude
        }
                
        Geocodificador.geocode
        ( 
            {
                'location': coordenadas_geograficas
            },
            function ( results, status )
            {
                if ( status === 'OK' )
                {
                    if ( results[1] )
                    {
                        document.getElementById ( 'inputUbicacion' ).value = results[1].formatted_address ;
                    }
                    else
                    {
                        alert ( 'No results found' ) ;
                    }
                }
                else
                {
                    alert ( 'Geocoder failed due to: ' + status ) ;
                }
            }
        ) ;

        // Colocar marcadores.
        
        Mapa_de_Google.addListener ( 'click', function ( event )
        {
            Marcador_del_mapa_de_Google.setPosition ( event.latLng ) ;
            
            Mapa_de_Google.setCenter ( event.latLng ) ;
            
            Geocodificador.geocode
            (
                {
                    'location': event.latLng
                },
                function ( results, status )
                {
                    if ( status === 'OK' )
                    {
                        if ( results[1] )
                        {
                            document.getElementById ( 'inputUbicacion' ).value = results[1].formatted_address ;
                        }
                        else
                        {
                            alert ( 'No results found' ) ;
                        }
                    }
                    else
                    {
                        alert ( 'Geocoder failed due to: ' + status ) ;
                    }
                }
            ) ;
    
            // alert ( Marcador_del_mapa_de_Google.getPosition ( ) ) ;
        } ) ;
    } ) ;
}

function edicion_de_ubicacion ( latitud, longitud )
{
    Marcador_del_mapa_de_Google.setPosition ( { lat: latitud, lng: longitud } ) ;
    
    Mapa_de_Google.setCenter ( { lat: latitud, lng: longitud } ) ;
    
    Geocodificador.geocode
    (
        {
            'location': { lat: latitud, lng: longitud }
        },
        function ( results, status )
        {
            if ( status === 'OK' )
            {
                if ( results [ 1 ] )
                {
                    document.getElementById ( 'inputUbicacion' ).value = results [ 1 ].formatted_address ;
                }
                else
                {
                    aler ( 'No results found' ) ;
                }
            }
            else
            {
                alert ( 'Geocoder failed due to: ' + status ) ;
            }
        }
    ) ;
}
