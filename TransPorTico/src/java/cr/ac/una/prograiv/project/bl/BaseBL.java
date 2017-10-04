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
    }
    /**
     *
     * @param className
     * @return
     */
    public IBaseDAO getDao(String className){
        return daos.get(className);
    }
}