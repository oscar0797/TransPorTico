/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.project.bl;

import cr.ac.una.prograiv.project.domain.Asignacion;
import java.util.List;

/**
 *
 * @author Oscar
 */
public class AsignacionBL extends BaseBL implements IBaseBL<Asignacion,Integer>{
     public AsignacionBL(){
        super();
    }
    @Override
    public void save(Asignacion obj) {
        this.getDAO(obj.getClass().getName()).save(obj);
    }
    public boolean AgregarEditar(Asignacion o){//true si agrega false si edita
        
        Asignacion aux = findByID(o.getId());
        if( aux != null ){
            o.setId(aux.getId());
            merge(o);
            return false;
        }else{
            save(o);
            return true;
        }
    }
    @Override
    public void merge(Asignacion obj) {
        this.getDAO(obj.getClass().getName()).merge(obj);
    }

    @Override
    public Asignacion findByID(Integer key) {
        return (Asignacion) this.getDAO("cr.ac.una.prograiv.project.domain.Asignacion").findByID(key);  
    }

    @Override
    public void delete(Integer key) {
        this.getDAO("cr.ac.una.prograiv.project.domain.Asignacion").delete(key);  
    }

    @Override
    public List<Asignacion> findAll() {
        return this.getDAO("cr.ac.una.prograiv.project.domain.Asignacion").findAll();
    }

    @Override
    public List<Asignacion> findByQuery(String query) {
        return this.getDAO("cr.ac.una.prograiv.project.domain.Asignacion").findByQuery(query);
    }
}

