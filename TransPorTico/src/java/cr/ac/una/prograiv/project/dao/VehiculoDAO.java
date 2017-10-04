/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.project.dao;

import cr.ac.una.prograiv.project.domain.Vehiculo;
import cr.ac.una.prograiv.project.utils.HibernateUtil;
import java.util.LinkedHashMap;
import java.util.List;
import org.hibernate.HibernateException;

/**
 *
 * @author Oscar
 */
public class VehiculoDAO extends HibernateUtil implements IBaseDAO<Vehiculo,Integer>{

    @Override
    public void save(Vehiculo obj) {
        try{
            iniciarOperacion();
            getSesion().save(obj);
            getTransac().commit();
        }catch(HibernateException he){
            manejarException(he);
            throw he;
        }finally{
            getSesion().close();
        }
    }

    @Override
    public void merge(Vehiculo obj) {
        try{
            iniciarOperacion();
            getSesion().merge(obj);
            getTransac().commit();
        }catch(HibernateException he){
            manejarException(he);
            throw he;
        }finally{
            getSesion().close();
        }
    }

    @Override
    public Vehiculo findByID(Integer key) {
        try{
            Vehiculo v;
            iniciarOperacion();
            v =  (Vehiculo) getSesion().createQuery("from Vehiculo where pkIdVehiculo = " + key).uniqueResult();
            getTransac().commit();
            return v;
        }catch(HibernateException he){
            manejarException(he);
            throw he;
        }finally{
            getSesion().close();
        }
    }

    @Override
    public void delete(Vehiculo obj) {
        try{
            iniciarOperacion();
            getSesion().delete(obj);
            getTransac().commit();
        }catch(HibernateException he){
            manejarException(he);
            throw he;
        }finally{
            getSesion().close();
        }
    }

    @Override
    public List<Vehiculo> findAll() {
        List<Vehiculo> vehiculos;
        try{
            iniciarOperacion();
            vehiculos = getSesion().createQuery("FROM Vehiculo").list();
        }finally{
            getSesion().close();
        }
        return vehiculos;
    }

    @Override
    public List<Vehiculo> findByQuery(String query) {
        List<Vehiculo> vehiculos;
        try{
            iniciarOperacion();
            vehiculos = (List<Vehiculo>) getSesion().createQuery(query);
        }catch(HibernateException he){
            manejarException(he);
            throw he;
        }finally{
            getSesion().close();
        }
        return vehiculos;
    }
    
}
