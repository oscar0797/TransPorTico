/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.project.bl;

import cr.ac.una.prograiv.project.domain.Usuario;
import java.util.List;

/**
 *
 * @author Oscar
 */
public class UsuarioBL extends BaseBL implements IBaseBL<Usuario, Integer> {

    @Override
    public void save(Usuario obj) {
        if (findByNombreUsuario(obj.getNombreUsuario()) == null) {
            this.getDAO(obj.getClass().getName()).save(obj);
        } else {
            System.out.println("Ya existe");
        }
    }

    public Usuario findByNombreUsuario(String name) {
        List<Usuario> usuarios = findAll();
        for (Usuario aux : usuarios) {
            if (aux.getNombreUsuario().equals(name)) {
                return aux;
            }
        }
        return null;
    }
    
     public Usuario findByName(String name) {
        return (Usuario) this.getDAO(Usuario.class.getName()).findByID(name);
    }

    @Override
    public void merge(Usuario obj) {
        this.getDAO(obj.getClass().getName()).merge(obj);
    }

    @Override
    public Usuario findByID(Integer key) {
        return (Usuario) this.getDAO(Usuario.class.getName()).findByID(key);
    }

    @Override
    public void delete(Usuario obj) {
        this.getDAO(Usuario.class.getName()).delete(obj);
    }

    @Override
    public List<Usuario> findAll() {
        return this.getDAO(Usuario.class.getName()).findAll();
    }

    @Override
    public List<Usuario> findByQuery(String query) {
        return this.getDAO(Usuario.class.getName()).findByQuery(query);
    }
}
