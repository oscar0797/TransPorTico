/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.project.test;

import cr.ac.una.prograiv.project.bl.ChoferBL;
import cr.ac.una.prograiv.project.bl.UsuarioBL;
import cr.ac.una.prograiv.project.domain.Chofer;
import cr.ac.una.prograiv.project.domain.Usuario;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.awt.Point;
import java.awt.Polygon;

/**
 *
 * @author Oscar
 */
public class TestUsuario {
    public static void main(String []args){
       saveUsuario();
        //mergeUsuario(1);
        //deleteUsuario(1);        
    }
    
    public static void saveUsuario(){
        Usuario usu = new Usuario("Usuario1","123","Oscar","Carmona","Mora","Nadie@gmail.com","8888888",1,new Date(),"Nadie");
        UsuarioBL bl = new UsuarioBL();
        bl.save(usu);
        System.out.println("Usuario guardado con exito");
    }
     public static void deleteUsuario(Integer key){ 
        Usuario usu = new Usuario(); 
        usu.setPkIdUsuario(key);
        UsuarioBL bl = new UsuarioBL();
        bl.delete(usu);
    }
    
    public static void findAllUsuario(){
        List<Usuario> usuarios;
        UsuarioBL bl = new UsuarioBL();
        usuarios = bl.findAll();
        usuarios.forEach((aux) -> {System.out.println(aux.toString());});
    }
    
    public static void mergeUsuario(Integer key){
        Usuario usu = new Usuario(key,"OscarCM","123","Oscar","Carmona","Mora","Nadie@gmail.com",new Date(),"8888888",null,1,new Date(),"Nadie");
        UsuarioBL bl = new UsuarioBL();
        bl.merge(usu);
    }
    
}
