/*
 * To change this license header, asigose License Headers in Project Properties.
 * To change this template file, asigose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.project.test;

import cr.ac.una.prograiv.project.bl.AsignacionBL;
import cr.ac.una.prograiv.project.domain.Asignacion;
import java.util.Date;
import java.util.List;

/**
 *
 * @author Oscar
 */
public class TestAsignacion {
    
     public static void main(String []args){
        //saveAsignacion();
        //mergeAsignacion(1);
        //deleteAsignacion(1);
        //findAllAsignacion();
        //findIdAsignacion(1);
         
    }
    
    public static void saveAsignacion(){
        Asignacion asig = new Asignacion(1,1);
        AsignacionBL bl = new AsignacionBL();
        bl.save(asig);
        System.out.println("Asignacion guardado con exito");
    }
    
    public static void findAllAsignacion(){
        List<Asignacion> asigferes;
        AsignacionBL bl = new AsignacionBL();
        asigferes = bl.findAll();
        asigferes.forEach((aux) -> {System.out.println(aux.toString());});
    }
    
    public static void mergeAsignacion(Integer Key){
        Asignacion asig = new Asignacion(1,1,1);
        AsignacionBL bl = new AsignacionBL();
        bl.merge(asig);
    }
    
     public static void deleteAsignacion(Integer key){ 
        Asignacion asig = new Asignacion(); 
        asig.setPkIdAsignacion(key);
        AsignacionBL bl = new AsignacionBL();
        bl.delete(asig);
    }
     
     public static Asignacion findIdAsignacion(Integer key){ 
        AsignacionBL bl = new AsignacionBL();
       return bl.findByID(key);
    }
}

