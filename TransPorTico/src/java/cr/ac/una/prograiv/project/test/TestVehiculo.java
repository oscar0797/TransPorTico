/*
 * To change this license header, veose License Headers in Project Properties.
 * To change this template file, veose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.project.test;


import cr.ac.una.prograiv.project.bl.VehiculoBL;
import cr.ac.una.prograiv.project.domain.Vehiculo;
import cr.ac.una.prograiv.project.domain.Vehiculo;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 *
 * @author Oscar
 */
public class TestVehiculo {
   public static void main(String []args){
       //saveVehiculo();
       //mergeVehiculo(1);
       deleteVehiculo(1);
       //findAllVehiculo();
       //findIdVehiculo(1);
   }
    public static void saveVehiculo(){
        Vehiculo ve = new Vehiculo(1,3000,"modeloooooo","placa","negro",true,true,new Date(),"Nadie");
        VehiculoBL bl = new VehiculoBL();
        bl.save(ve);
        System.out.println("Vehiculo guardado con exito");
    }
     public static void deleteVehiculo(Integer key){ 
        Vehiculo ve = new Vehiculo(); 
        ve.setPkIdVehiculo(key);
        VehiculoBL bl = new VehiculoBL();
        bl.delete(ve);
    }
    
    public static void findAllVehiculo(){
        List<Vehiculo> vearios;
        VehiculoBL bl = new VehiculoBL();
        vearios = bl.findAll();
        vearios.forEach((aux) -> {System.out.println(aux.toString());});
    }
    
    public static void mergeVehiculo(Integer key){
        Vehiculo ve = new Vehiculo(key,2,2000,"modelo","placa","negro",null,true,true,new Date(),"Nadie");
        VehiculoBL bl = new VehiculoBL();
        bl.merge(ve);
    }
         
     public static Vehiculo findIdVehiculo(Integer key){ 
        VehiculoBL bl = new VehiculoBL();
       return bl.findByID(key);
    }
    }
    
   

