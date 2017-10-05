/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.project.test;

import cr.ac.una.prograiv.project.bl.AsignacionBL;
import cr.ac.una.prograiv.project.domain.Asignacion;
import cr.ac.una.prograiv.project.domain.Chofer;
import cr.ac.una.prograiv.project.domain.Vehiculo;
import java.util.List;

/**
 *
 * @author Oscar
 */
public class TestAsignacion {

    public static void main(String[] args) {
        //saveAsignacion();
        //mergeAsignacion();
        //deleteAsignacion(2);
        //findAllAsignacion();
        // Asignacion asignacion = findIdAsignacion(1);
        //System.out.println(asignacion.getNombre());
    }

    public static void saveAsignacion() {
        Chofer chofer = new Chofer();
        chofer.setPkIdChofer(1);
        Vehiculo car = new Vehiculo();
        car.setPkIdVehiculo(1);

        Asignacion asignacion = new Asignacion(chofer,car);
        AsignacionBL bl = new AsignacionBL();
        bl.save(asignacion);
        System.out.println("Asignacion guardado con exito");
    }

    public static void findAllAsignacion() {
        List<Asignacion> asignaciones;
        AsignacionBL bl = new AsignacionBL();
        asignaciones = bl.findAll();
        asignaciones.forEach((aux) -> {
            System.out.println(aux.toString());
        });
    }

    public static void mergeAsignacion() {
        Chofer chofer = new Chofer();
        chofer.setPkIdChofer(1);
        Vehiculo car = new Vehiculo();
        car.setPkIdVehiculo(1);

        Asignacion asignacion = new Asignacion(chofer, car);
        AsignacionBL bl = new AsignacionBL();
        bl.merge(asignacion);
    }

    public static void deleteAsignacion(Integer key) {
        Asignacion asignacion = new Asignacion();
        asignacion.setPkIdAsignacion(key);
        AsignacionBL bl = new AsignacionBL();
        bl.delete(asignacion);
    }

    public static Asignacion findIdAsignacion(Integer key) {
        AsignacionBL bl = new AsignacionBL();
        return bl.findByID(key);
    }
}
