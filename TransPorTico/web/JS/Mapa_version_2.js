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

            alert ( Ubicacion.latitude + ',' + Ubicacion.longitude ) ;

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
        } ) ;
    // } ) ;
}