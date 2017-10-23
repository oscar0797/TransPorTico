/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Obtener_ubicacion ( )
{
    // alert ( 'Hola mundo!!!' ) ;

    // google.maps.event.addDomListener ( window, "load", function ( )
    // {
        const Ubicacion = new Geolocalizacion ( ( ) =>
        {
            var mapa = document.getElementById ( 'Mi_mapa' ) ;

            // alert ( Ubicacion.latitude + ',' + Ubicacion.longitude ) ;

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

            var Geocodificador = new google.maps.Geocoder ;
            
            // function funcion_geocodificadora ( )
            // {
                var coordenadas_geograficas =
                {
                    lat: Ubicacion.latitude,
                    lng: Ubicacion.longitude
                }
                
                Geocodificador.geocode ( 
                {
                    'location': coordenadas_geograficas
                },
                function ( results, status )
                {
                    if ( status === 'OK' )
                    {
                        if ( results[1] )
                        {
                            document.getElementById ( 'direccion_sign' ).value = results[1].formatted_address ;
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
            // }
            
        } ) ;
    // } ) ;
}