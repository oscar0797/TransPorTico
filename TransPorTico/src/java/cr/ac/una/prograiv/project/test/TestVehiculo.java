/*
 * To change this license header, carose License Headers in Project Properties.
 * To change this template file, carose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.project.test;

import cr.ac.una.prograiv.project.bl.VehiculoBL;
import cr.ac.una.prograiv.project.domain.Vehiculo;
import java.util.Date;
import java.util.List;

/**
 *
 * @author Oscar
 */
public class TestVehiculo {
    public static void main(String []args){
        saveVehiculo();
        //mergeVehiculo();
        //deleteVehiculo(2);
        //findAllVehiculo();
        // Vehiculo car = findIdVehiculo(1);
       //System.out.println(car.getNombre());
    }
    
    public static void saveVehiculo(){
        Vehiculo car = new Vehiculo(1,1991,"sedan","AHT87","rojo","40",true,false,new Date(),"greivin");
        VehiculoBL bl = new VehiculoBL();
        bl.save(car);
        System.out.println("Vehiculo guardado con exito");
    }
    
    public static void findAllVehiculo(){
        List<Vehiculo> carros;
        VehiculoBL bl = new VehiculoBL();
        carros = bl.findAll();
        carros.forEach((aux) -> {System.out.println(aux.toString());});
    }
    
    public static void mergeVehiculo(){
        Vehiculo car = new Vehiculo(1,1991,"sedan","AHT87","azul","40",true,false,new Date(),"luis");
        VehiculoBL bl = new VehiculoBL();
        bl.merge(car);
    }
    
     public static void deleteVehiculo(Integer key){ 
        Vehiculo car = new Vehiculo(); 
        car.setPkIdVehiculo(key);
        VehiculoBL bl = new VehiculoBL();
        bl.delete(car);
    }
     
     public static Vehiculo findIdVehiculo(Integer key){ 
        VehiculoBL bl = new VehiculoBL();
       return bl.findByID(key);
    }
}
