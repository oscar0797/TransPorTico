/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.project.dao;

import cr.ac.una.prograiv.project.domain.Asignacion;
import cr.ac.una.prograiv.project.utils.HibernateUtil;
import java.util.List;
import org.hibernate.HibernateException;

/**
 *
 * @author Oscar
 */
public class AsignacionDAO extends HibernateUtil implements IBaseDAO<Asignacion,Integer>{
     @Override
    public void save(Asignacion obj) {
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
    public void merge(Asignacion obj) {
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
    public Asignacion findByID(Integer key) {
        Asignacion asignacion = null;

        try {
            iniciarOperacion();
            asignacion = (Asignacion) getSesion().get(Asignacion.class, key);
        } finally {
            getSesion().close();
        }
        return asignacion;
    }

    @Override
    public void delete(Asignacion obj) {
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
    public List<Asignacion> findAll() {
        List<Asignacion> asignaciones;
        try{
            iniciarOperacion();
            asignaciones = getSesion().createQuery("FROM Asignacion").list();
        }finally{
            getSesion().close();
        }
        return asignaciones;
    }

    @Override
    public List<Asignacion> findByQuery(String query) {
        List<Asignacion> asignaciones;
        try{
            iniciarOperacion();
            asignaciones = (List<Asignacion>) getSesion().createQuery(query);
        }catch(HibernateException he){
            manejarException(he);
            throw he;
        }finally{
            getSesion().close();
        }
        return asignaciones;
    }
}

