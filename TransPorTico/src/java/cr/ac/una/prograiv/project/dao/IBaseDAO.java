/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.project.dao;

import java.util.LinkedHashMap;
import java.util.List;

/**
 *
 * @author Estudiante
 * @param <T>
 * @param <K>
 */
public interface IBaseDAO <T,K>{
    public abstract void save(T obj);
    public abstract void merge(T obj);
    public abstract T findByID(K key);
    public abstract void delete(T obj);
    public abstract List<T> findAll();
    public abstract List<T> findByQuery(String query);
    public abstract List findHQLQuery(String query);
}