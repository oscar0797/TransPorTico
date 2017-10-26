/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.project.Validaciones;

import cr.ac.una.prograiv.project.bl.ChoferBL;
import cr.ac.una.prograiv.project.domain.Chofer;
import java.util.List;

/**
 *
 * @author Oscar
 */
public class Validaciones {

    ChoferBL choBL;

    public Validaciones() {
        choBL = new ChoferBL();
    }

    public boolean existeCedula(String cedula) {
        List<Chofer> chofer = choBL.findAll();
        for (Chofer cho : chofer ) {
            if (cho.getCedula().equals(cedula)) {
                return true;
            }
        }
        return false;
    }
}
