/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.project.test;

import cr.ac.una.prograiv.project.bl.ChoferBL;
import cr.ac.una.prograiv.project.bl.HistorialBL;
import cr.ac.una.prograiv.project.domain.Chofer;
import cr.ac.una.prograiv.project.domain.Historial;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 *
 * @author Oscar
 */
public class TestHistorial {

    public static void main(String[] args) {
        //saveHistorial();
        //mergeHistorial(1);
        //deleteHistorial(1);
        //findAllHistorial
        //findIdHostorial(1);
        consultarHistorialUsuario ( ) ;
    }

    public static void saveHistorial() {
        Historial his = new Historial(1, 1, 1, 11, 22, 33, 44, 5250, 30, "Excelente Viaje", new Date(), "Nadie");
        HistorialBL bl = new HistorialBL();
        bl.save(his);
        System.out.println("Historial guardado con exito");
    }

    public static void deleteHistorial(Integer key) {
        Historial his = new Historial();
        his.setPkIdHistorial(key);
        HistorialBL bl = new HistorialBL();
        bl.delete(his);
    }

    public static void findAllHistorial() {
        List<Historial> vearios;
        HistorialBL bl = new HistorialBL();
        vearios = bl.findAll();
        vearios.forEach((aux) -> {
            System.out.println(aux.toString());
        });
    }

    public static void mergeHistorial(Integer key) {
        Historial his = new Historial(key, 1, 1, 1, 22, 33, 44, 55, 4500, 30, "Pura Vida", new Date(), "Nadie");
        HistorialBL bl = new HistorialBL();
        bl.merge(his);
    }

    public static Historial findIdHostorial(Integer key) {
        HistorialBL bl = new HistorialBL();
        return bl.findByID(key);
    }
    
    public static void consultarHistorialUsuario ( )
    {
        List <Historial> vearios ;
        HistorialBL HBL1 = new HistorialBL ( ) ;
        vearios = HBL1.findByQuery ( "FROM Historial WHERE FK_idUsuario=1" ) ;
        vearios.forEach ( ( aux ) -> { System.out.println ( aux.toString ( ) ) ; } ) ; 
        
    }
}
