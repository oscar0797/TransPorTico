/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.project.Validaciones;

import cr.ac.una.prograiv.project.bl.ChoferBL;
import cr.ac.una.prograiv.project.bl.UsuarioBL;
import cr.ac.una.prograiv.project.bl.VehiculoBL;
import cr.ac.una.prograiv.project.domain.Chofer;
import cr.ac.una.prograiv.project.domain.Usuario;
import cr.ac.una.prograiv.project.domain.Vehiculo;
import java.util.List;

/**
 *
 * @author Oscar
 */
public class Validaciones {

    ChoferBL choBL;
    VehiculoBL veBL;
    UsuarioBL usuBL;

    public Validaciones() {
        choBL = new ChoferBL();
        usuBL = new UsuarioBL();
        veBL = new VehiculoBL();
    }

    public boolean existeCedula(String cedula) {
        List<Chofer> chofer = choBL.findAll();
        for (Chofer cho : chofer) {
            if (cho.getCedula().equals(cedula)) {
                return true;
            }
        }
        return false;
    }

        public boolean existePlaca(String placa) {
        List<Vehiculo> vehiculo = veBL.findAll();
        for (Vehiculo ve : vehiculo) {
            if (ve.getPlaca().equals(placa)) {
                return true;
            }
        }
        return false;
    }
    
    public boolean existeNombreUsuario(String nombreUsuario) {
        List<Usuario> usuario = usuBL.findAll();
        for (Usuario usu : usuario) {
            if (usu.getNombreUsuario().equals(nombreUsuario)) {
                return true;
            }
        }
        return false;
    }

    public boolean findByName(String nombreUsuario) {
        List<Usuario> usuario = usuBL.findAll();
        for (Usuario usu : usuario) {
            if (usu.getNombreUsuario().equals(nombreUsuario)) {
                return true;
            }
        }
        return false;
    }
}
