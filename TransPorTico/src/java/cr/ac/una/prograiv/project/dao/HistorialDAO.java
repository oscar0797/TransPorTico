/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.project.dao;

import cr.ac.una.prograiv.project.domain.Historial;
import cr.ac.una.prograiv.project.utils.HibernateUtil;
import java.util.List;
import org.hibernate.HibernateException;

/**
 *
 * @author Oscar
 */
public class HistorialDAO extends HibernateUtil implements IBaseDAO<Historial,Integer>{
   @Override
    public void save(Historial obj) {
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
    public void merge(Historial obj) {
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
    public Historial findByID(Integer key) {
        try{
            Historial v;
            iniciarOperacion();
            v =  (Historial) getSesion().createQuery("from Vehiculo where pkIdHistorial = " + key).uniqueResult();
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
    public void delete(Historial obj) {
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
    public List<Historial> findAll() {
        List<Historial> historiales;
        try{
            iniciarOperacion();
            historiales = getSesion().createQuery("FROM Historial").list();
        }finally{
            getSesion().close();
        }
        return historiales;
    }

    @Override
    public List<Historial> findByQuery(String query) {
        List<Historial> historiales;
        try{
            iniciarOperacion();
            historiales = (List<Historial>) getSesion().createQuery(query);
        }catch(HibernateException he){
            manejarException(he);
            throw he;
        }finally{
            getSesion().close();
        }
        return historiales;
    } 
}

