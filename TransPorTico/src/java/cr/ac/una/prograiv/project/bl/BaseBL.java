/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.project.bl;

import cr.ac.una.prograiv.project.dao.IBaseDAO;
import cr.ac.una.prograiv.project.dao.*;
import java.util.LinkedHashMap;

/**
 *
 * @author admin
 */
public class BaseBL {

    private final LinkedHashMap<String, IBaseDAO> daos;

    public BaseBL() {
        daos = new LinkedHashMap();
        daos.put("cr.ac.una.prograiv.project.domain.Usuario", new UsuarioDAO());
        daos.put("cr.ac.una.prograiv.project.domain.Vehiculo", new VehiculoDAO());
        daos.put("cr.ac.una.prograiv.project.domain.Historial", new HistorialDAO());
        daos.put("cr.ac.una.prograiv.project.domain.Asignacion", new AsignacionDAO());
        daos.put("cr.ac.una.prograiv.project.domain.Chofer", new ChoferDAO());
    }

    /**
     *
     * @param className
     * @return
     */
    public IBaseDAO getDAO(String className) {
        return daos.get(className);
    }
}
