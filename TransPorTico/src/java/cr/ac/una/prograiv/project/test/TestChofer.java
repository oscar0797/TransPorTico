/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.project.test;

import cr.ac.una.prograiv.project.bl.ChoferBL;
import cr.ac.una.prograiv.project.domain.Chofer;
import java.util.Date;
import java.util.List;

/**
 *
 * @author Oscar
 */
public class TestChofer {
    
     public static void main(String []args){
        //saveChofer();
        //mergeChofer();
        //deleteChofer(2);
        //findAllChofer();
         Chofer cho = findIdChofer(1);
       System.out.println(cho.getNombre());
    }
    
    public static void saveChofer(){
        Chofer cho = new Chofer("116810872","Oscar",new Date(),"B1",new Date(),new Date(),"Nadie");
        ChoferBL bl = new ChoferBL();
        bl.save(cho);
        System.out.println("Chofer guardado con exito");
    }
    
    public static void findAllChofer(){
        List<Chofer> choferes;
        ChoferBL bl = new ChoferBL();
        choferes = bl.findAll();
        choferes.forEach((aux) -> {System.out.println(aux.toString());});
    }
    
    public static void mergeChofer(){
        Chofer cho = new Chofer(1,"999999","eeeeeee",new Date(),"B1",new Date(),new Date(),"Nadie");
        ChoferBL bl = new ChoferBL();
        bl.merge(cho);
    }
    
     public static void deleteChofer(Integer key){ 
        Chofer cho = new Chofer(); 
        cho.setPkIdChofer(key);
        ChoferBL bl = new ChoferBL();
        bl.delete(cho);
    }
     
     public static Chofer findIdChofer(Integer key){ 
        ChoferBL bl = new ChoferBL();
       return bl.findByID(key);
    }
}
