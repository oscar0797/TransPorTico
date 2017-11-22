/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.project.bl;

import cr.ac.una.prograiv.project.domain.Asignacion;
import cr.ac.una.prograiv.project.domain.Chofer;
import java.util.LinkedList;
import java.util.List;

/**
 *
 * @author Oscar
 */
public class ChoferBL extends BaseBL implements IBaseBL <Chofer,Integer>{

    @Override
    public void save(Chofer obj) {
        this.getDAO( obj.getClass().getName()).save(obj);
    }

    @Override
    public void merge(Chofer obj) {
        this.getDAO(obj.getClass().getName()).merge(obj);
    }

    
    public List<Chofer> findByCedula(String cedula) {
        List<Chofer> drivers = findAll();
        List<Chofer> choferes = new LinkedList<>();
        for (Chofer aux : drivers) {
            if (aux.getCedula().equals(cedula)) {
                choferes.add(aux);
            }
            return choferes;
        }
        return null;
    }
    
    @Override
    public Chofer findByID(Integer key) {
        return (Chofer) this.getDAO("cr.ac.una.prograiv.project.domain.Chofer").findByID(key);
    }

    @Override
    public void delete(Chofer obj) {
      this.getDAO(obj.getClass().getName()).delete(obj);         
    }

    @Override
    public List<Chofer> findAll() {
        return this.getDAO("cr.ac.una.prograiv.project.domain.Chofer").findAll();
    }

    @Override
    public List<Chofer> findByQuery(String query) {
        return this.getDAO("cr.ac.una.prograiv.project.domain.Chofer").findByQuery(query);
    }
    
    @Override
    public List findHQLQuery(String query) {
        return this.getDAO("cr.ac.una.prograiv.project.domain.Chofer").findHQLQuery(query);
    }
}
