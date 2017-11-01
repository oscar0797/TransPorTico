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

    public static void main(String[] args) {
      //  saveChofer();
        //mergeChofer(16);
        //deleteChofer();
        //findAllChofer();
        //findIdChofer(1);

    }

    public static void saveChofer() {
        for(int i =1; i<30; i++){
        Chofer cho1 = new Chofer(Integer.toString(i), "Chofer1", new Date(), "B1", new Date(), new Date(), "anybody");
        ChoferBL bl1 = new ChoferBL();
        bl1.save(cho1);
    }
        /*
        Chofer cho2 = new Chofer("3", "Chofer22", new Date(), "B1", new Date(), new Date(), "anybody");
        ChoferBL bl2 = new ChoferBL();
        bl2.save(cho2);
        Chofer cho3 = new Chofer("4", "Chofer23", new Date(), "B1", new Date(), new Date(), "anybody");
        ChoferBL bl3 = new ChoferBL();
        bl3.save(cho3);
        Chofer cho4 = new Chofer("5", "Chofer24", new Date(), "B1", new Date(), new Date(), "anybody");
        ChoferBL bl4 = new ChoferBL();
        bl4.save(cho4)*/
        System.out.println("Chofer guardado con exito");
    }

    public static void findAllChofer() {
        List<Chofer> choferes;
        ChoferBL bl = new ChoferBL();
        choferes = bl.findAll();
        choferes.forEach((aux) -> {
            System.out.println(aux.toString());
        });
    }

    public static void mergeChofer(Integer Key) {
        Chofer cho = new Chofer(Key, "99", "hola", new Date(), "B1", new Date(), new Date(), "Nadie");
        ChoferBL bl = new ChoferBL();
        bl.merge(cho);
    }

    public static void deleteChofer() {
        Chofer cho1 = new Chofer();
        cho1.setPkIdChofer(11);
        ChoferBL bl1 = new ChoferBL();
        bl1.delete(cho1);

        Chofer cho2 = new Chofer();
        cho2.setPkIdChofer(12);
        ChoferBL bl2 = new ChoferBL();
        bl2.delete(cho2);

        Chofer cho3 = new Chofer();
        cho3.setPkIdChofer(13);
        ChoferBL bl3 = new ChoferBL();
        bl3.delete(cho3);

        Chofer cho4 = new Chofer();
        cho4.setPkIdChofer(14);
        ChoferBL bl4 = new ChoferBL();
        bl4.delete(cho4);

        Chofer cho5 = new Chofer();
        cho5.setPkIdChofer(15);
        ChoferBL bl5 = new ChoferBL();
        bl5.delete(cho5);

    }

    public static void findIdChofer(Integer key) {
        ChoferBL bl = new ChoferBL();
        Chofer c;
        c = bl.findByID(key);
        System.out.println(c.getNombre());
    }
}
