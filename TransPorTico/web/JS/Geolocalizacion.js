// Autor: Justin Vega.
// Fecha: 27 de septiembre de 2017.

class Geolocalizacion
{
    constructor ( callback )
    {
        if ( navigator.geolocation )
        {
            navigator.geolocation.getCurrentPosition ( ( Posicion ) =>
            {
                this.latitude = Posicion.coords.latitude ;
                this.longitude = Posicion.coords.longitude ;
                
                callback ( ) ;
            } ) ;
        }
        else
        {
            alert ( 'Tu navegador no soporta geolocalización :-(' ) ;
        }
    }
}