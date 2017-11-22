/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.project.bl;

import cr.ac.una.prograiv.project.domain.Historial;
import java.util.List;

/**
 *
 * @author Oscar
 */
public class HistorialBL extends BaseBL implements IBaseBL<Historial,Integer>{
    public HistorialBL(){
        super();
    }
    @Override
    public void save(Historial obj) {
        this.getDAO(obj.getClass().getName()).save(obj);
    }
    public boolean AgregarEditar(Historial o){//true si agrega false si edita
        
        Historial aux = findByID(o.getPkIdHistorial());
        if( aux != null ){
            o.setPkIdHistorial(aux.getPkIdHistorial());
            merge(o);
            return false;
        }else{
            save(o);
            return true;
        }
    }
    @Override
    public void merge(Historial obj) {
        this.getDAO(obj.getClass().getName()).merge(obj);
    }

    @Override
    public Historial findByID(Integer key) {
        return (Historial) this.getDAO("cr.ac.una.prograiv.project.domain.Historial").findByID(key);  
    }

    @Override
    public void delete(Historial obj) {
        this.getDAO("cr.ac.una.prograiv.project.domain.Historial").delete(obj);  
    }

    @Override
    public List<Historial> findAll() {
        return this.getDAO("cr.ac.una.prograiv.project.domain.Historial").findAll();
    }

    @Override
    public List<Historial> findByQuery(String query) {
        return this.getDAO("cr.ac.una.prograiv.project.domain.Historial").findByQuery(query);
    }
    
    @Override
    public List findHQLQuery(String query) {
        return this.getDAO("cr.ac.una.prograiv.project.domain.Historial").findHQLQuery(query);
    }
}

