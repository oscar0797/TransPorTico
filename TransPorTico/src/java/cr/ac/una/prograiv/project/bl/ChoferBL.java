/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.project.bl;

import cr.ac.una.prograiv.project.domain.Chofer;
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

    @Override
    public Chofer findByID(Integer key) {
        return (Chofer) this.getDAO(Chofer.class.getName()).findByID(key);
    }

    @Override
    public void delete(Integer key) {
        this.getDAO(Chofer.class.getName()).delete(key);
    }

    @Override
    public List<Chofer> findAll() {
        return this.getDAO(Chofer.class.getName()).findAll();
    }

    @Override
    public List<Chofer> findByQuery(String query) {
        return this.getDAO(Chofer.class.getName()).findByQuery(query);
    }
}
