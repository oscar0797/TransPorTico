/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.project.test;

import cr.ac.una.prograiv.project.bl.HistorialBL;
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
        saveHistorial();
        //mergeHistorial(1);
        //deleteHistorial(1);
    }

    public static void saveHistorial() {
        Historial his = new Historial(1,1,1,null,null,3000,30,"Excelente Viaje", new Date(), "Nadie");
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
        Historial his = new Historial(key,1,1,3,null,null,3000,30,"Pura Vida", new Date(), "Nadie");
        HistorialBL bl = new HistorialBL();
        bl.merge(his);
    }
}
