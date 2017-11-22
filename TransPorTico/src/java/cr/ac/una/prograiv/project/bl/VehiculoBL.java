/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.project.bl;

import cr.ac.una.prograiv.project.domain.Vehiculo;
import java.util.List;
/**
 *
 * @author Oscar
 */
public class VehiculoBL extends BaseBL implements IBaseBL<Vehiculo,Integer>{

    public VehiculoBL(){
        super();
    }
    @Override
    public void save(Vehiculo obj) {
        this.getDAO(obj.getClass().getName()).save(obj);
    }
    public boolean AgregarEditar(Vehiculo o){//true si agrega false si edita
        
        Vehiculo aux = findByID(o.getPkIdVehiculo());
        if( aux != null ){
            o.setPkIdVehiculo(aux.getPkIdVehiculo());
            merge(o);
            return false;
        }else{
            save(o);
            return true;
        }
    }
    @Override
    public void merge(Vehiculo obj) {
        this.getDAO(obj.getClass().getName()).merge(obj);
    }

    @Override
    public Vehiculo findByID(Integer key) {
        return (Vehiculo) this.getDAO("cr.ac.una.prograiv.project.domain.Vehiculo").findByID(key);  
    }

    @Override
    public void delete(Vehiculo obj) {
        this.getDAO("cr.ac.una.prograiv.project.domain.Vehiculo").delete(obj);  
    }

    @Override
    public List<Vehiculo> findAll() {
        return this.getDAO("cr.ac.una.prograiv.project.domain.Vehiculo").findAll();
    }

    @Override
    public List<Vehiculo> findByQuery(String query) {
        return this.getDAO("cr.ac.una.prograiv.project.domain.Vehiculo").findByQuery(query);
    }
    
    @Override
    public List findHQLQuery(String query) {
        return this.getDAO("cr.ac.una.prograiv.project.domain.Asignacion").findHQLQuery(query);
    }
}