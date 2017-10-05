/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.project.test;

import cr.ac.una.prograiv.project.bl.HistorialBL;
import cr.ac.una.prograiv.project.domain.Chofer;
import cr.ac.una.prograiv.project.domain.Historial;
import cr.ac.una.prograiv.project.domain.Usuario;
import cr.ac.una.prograiv.project.domain.Vehiculo;
import java.util.Date;
import java.util.List;

/**
 *
 * @author Oshistorial
 */
public class TestHistorial {

    public static void main(String[] args) {
        //saveHistorial();
        //mergeHistorial();
        //deleteHistorial(2);
        //findAllHistorial();
        // Historial historial = findIdHistorial(1);
        //System.out.println(historial.getNombre());
    }

    public static void saveHistorial() {
        Chofer chofer = new Chofer();
        chofer.setPkIdChofer(1);
        Usuario user = new Usuario();
        user.setPkIdUsuario(1);
        Vehiculo car = new Vehiculo();
        car.setPkIdVehiculo(1);

        Historial historial = new Historial(chofer, user, car, "50", "70", 1350, 15, "muy bueno", new Date(), "greivin");
        HistorialBL bl = new HistorialBL();
        bl.save(historial);
        System.out.println("Historial guardado con exito");
    }

    public static void findAllHistorial() {
        List<Historial> historiales;
        HistorialBL bl = new HistorialBL();
        historiales = bl.findAll();
        historiales.forEach((aux) -> {
            System.out.println(aux.toString());
        });
    }

    public static void mergeHistorial() {
        Chofer chofer = new Chofer();
        chofer.setPkIdChofer(1);
        Usuario user = new Usuario();
        user.setPkIdUsuario(1);
        Vehiculo car = new Vehiculo();
        car.setPkIdVehiculo(1);

        Historial historial = new Historial(chofer, user, car, "50", "70", 1350, 15, "muy malo", new Date(), "ana");
        HistorialBL bl = new HistorialBL();
        bl.merge(historial);
    }

    public static void deleteHistorial(Integer key) {
        Historial historial = new Historial();
        historial.setPkIdHistorial(key);
        HistorialBL bl = new HistorialBL();
        bl.delete(historial);
    }

    public static Historial findIdHistorial(Integer key) {
        HistorialBL bl = new HistorialBL();
        return bl.findByID(key);
    }
}
