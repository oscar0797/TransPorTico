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
        //mergeChofer(1);
        //deleteChofer(1);
        findAllChofer();
        //findIdChofer(1);
         
    }
    
    public static void saveChofer(){
        Chofer cho1 = new Chofer("2","Cho10",new Date(),"B1",new Date(),new Date(),"anybody");
        ChoferBL bl1 = new ChoferBL();
        bl1.save(cho1);
        Chofer cho2 = new Chofer("3","Cho11",new Date(),"B1",new Date(),new Date(),"anybody");
        ChoferBL bl2 = new ChoferBL();
        bl2.save(cho2);
        Chofer cho3 = new Chofer("4","Cho12",new Date(),"B1",new Date(),new Date(),"anybody");
        ChoferBL bl3 = new ChoferBL();
        bl3.save(cho3);
        Chofer cho4 = new Chofer("5","Cho13",new Date(),"B1",new Date(),new Date(),"anybody");
        ChoferBL bl4 = new ChoferBL();
        bl4.save(cho4);
        System.out.println("Chofer guardado con exito");
    }
    
    public static void findAllChofer(){
        List<Chofer> choferes;
        ChoferBL bl = new ChoferBL();
        choferes = bl.findAll();
        choferes.forEach((aux) -> {System.out.println(aux.toString());});
    }
    
    public static void mergeChofer(Integer Key){
        Chofer cho = new Chofer(Key,"999999","eeeeeee",new Date(),"B1",new Date(),new Date(),"Nadie");
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
