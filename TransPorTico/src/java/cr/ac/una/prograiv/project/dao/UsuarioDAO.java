/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.project.dao;

import cr.ac.una.prograiv.project.domain.Usuario;
import cr.ac.una.prograiv.project.utils.HibernateUtil;
import java.util.LinkedHashMap;
import java.util.List;
import org.hibernate.HibernateException;

/**
 *
 * @author Oscar
 */
public class UsuarioDAO extends HibernateUtil implements IBaseDAO <Usuario,Integer>{

    @Override
    public void save(Usuario obj) {
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
    public void merge(Usuario obj) {
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
    public Usuario findByID(Integer key) {
        try{
            Usuario usu;
            iniciarOperacion();
            usu = (Usuario) getSesion().get(Usuario.class, key);
            //usu = (Usuario) getSesion().createQuery("SELECT * FROM Usuario WHERE pk_idUsuario = " + key);
            return usu;
        }catch(HibernateException he){
            manejarException(he);
            throw he;
        }
    }

    @Override
    public void delete(Usuario obj) {
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
    public List<Usuario> findAll() {
        try{
            List<Usuario> usuarios;
            iniciarOperacion();
            usuarios = (List<Usuario>) getSesion().createQuery("FROM Usuario").list();
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
            List<Usuario> usuarios;
            iniciarOperacion();
            usuarios = (List<Usuario>) getSesion().createQuery(query).list();
            return usuarios;
        }catch(HibernateException he){
            manejarException(he);
            throw he;
        }finally{
            getSesion().close();
        }
    }
    
}