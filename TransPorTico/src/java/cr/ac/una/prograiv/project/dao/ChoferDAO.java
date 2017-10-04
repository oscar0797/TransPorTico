/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.project.dao;

import cr.ac.una.prograiv.project.domain.Chofer;
import cr.ac.una.prograiv.project.utils.HibernateUtil;
import java.util.LinkedHashMap;
import java.util.List;
import org.hibernate.HibernateException;

/**
 *
 * @author Oscar
 */
public class ChoferDAO extends HibernateUtil implements IBaseDAO <Chofer,Integer>{

    @Override
    public void save(Chofer obj) {
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
    public void merge(Chofer obj) {
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
    public Chofer findByID(Integer key) {
        try{
            Chofer usu;
            iniciarOperacion();
            usu = (Chofer) getSesion().createQuery("SELECT * FROM Chofer WHERE pk_idChofer = " + key);
            return usu;
        }catch(HibernateException he){
            manejarException(he);
            throw he;
        }
    }

    @Override
    public void delete(Integer key) {
        try{
            iniciarOperacion();
            getSesion().delete(key);
            getTransac().commit();
        }catch(HibernateException he){
            manejarException(he);
            throw he;
        }finally{
            getSesion().close();
        }
    }

    @Override
    public List<Chofer> findAll() {
        try{
            List<Chofer> usuarios;
            iniciarOperacion();
            usuarios = (List<Chofer>) getSesion().createQuery("FROM Chofer").list();
            return usuarios;
        }catch(HibernateException he){
            manejarException(he);
            throw he;
        }finally{
            getSesion().close();
        }
    }

    @Override
    public List findByQuery(String query) {
        try{
            List<Chofer> usuarios;
            iniciarOperacion();
            usuarios = (List<Chofer>) getSesion().createQuery(query).list();
            return usuarios;
        }catch(HibernateException he){
            manejarException(he);
            throw he;
        }finally{
            getSesion().close();
        }
    }
    
}
