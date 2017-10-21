/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.project.test;

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

    public static void main(String[] args) {
        //saveUsuario();
        //mergeUsuario(1);
        //deleteUsuario();
        //findAllUsuario();
        findIdUsuario(17);

    }

    public static void saveUsuario() {
        Usuario usu = new Usuario("Usuario18", "123", "Oscar", "Carmona", "Mora", "Nadie@gmail.com", new Date(), "8888888", 1, new Date(), "Nadie");
        Usuario usu1 = new Usuario("Usuario19", "123", "Oscar", "Carmona", "Mora", "Nadie@gmail.com", new Date(), "8888888", 1, new Date(), "Nadie");
        Usuario usu2 = new Usuario("Usuario20", "123", "Oscar", "Carmona", "Mora", "Nadie@gmail.com", new Date(), "8888888", 1, new Date(), "Nadie");
        Usuario usu3 = new Usuario("Usuario21", "123", "Oscar", "Carmona", "Mora", "Nadie@gmail.com", new Date(), "8888888", 1, new Date(), "Nadie");
        Usuario usu4 = new Usuario("Usuario22", "123", "Oscar", "Carmona", "Mora", "Nadie@gmail.com", new Date(), "8888888", 1, new Date(), "Nadie");
        UsuarioBL bl = new UsuarioBL();
        bl.save(usu);
        UsuarioBL bl1 = new UsuarioBL();
        bl.save(usu1);
        UsuarioBL bl2 = new UsuarioBL();
        bl.save(usu2);
        UsuarioBL bl3 = new UsuarioBL();
        bl.save(usu3);
        UsuarioBL bl4 = new UsuarioBL();
        bl.save(usu4);
        System.out.println("Usuario guardado con exito");
    }

    public static void deleteUsuario() {
        Usuario usu1 = new Usuario();
        usu1.setPkIdUsuario(12);
        UsuarioBL bl1 = new UsuarioBL();
        bl1.delete(usu1);

        Usuario usu2 = new Usuario();
        usu2.setPkIdUsuario(13);
        UsuarioBL bl2 = new UsuarioBL();
        bl2.delete(usu2);

        Usuario usu3 = new Usuario();
        usu3.setPkIdUsuario(14);
        UsuarioBL bl3 = new UsuarioBL();
        bl3.delete(usu3);

        Usuario usu4 = new Usuario();
        usu4.setPkIdUsuario(15);
        UsuarioBL bl4 = new UsuarioBL();
        bl4.delete(usu4);

        Usuario usu5 = new Usuario();
        usu5.setPkIdUsuario(16);
        UsuarioBL bl5 = new UsuarioBL();
        bl5.delete(usu5);
    }

    public static void findAllUsuario() {
        List<Usuario> usuarios;
        UsuarioBL bl = new UsuarioBL();
        usuarios = bl.findAll();
        usuarios.forEach((aux) -> {
            System.out.println(aux.toString());
        });
    }

    public static void mergeUsuario(Integer key) {
        Usuario usu = new Usuario(key, "OscarCM", "123", "Oscar", "Carmona", "Mora", "Nadie@gmail.com", new Date(), "8888888", null, 1, new Date(), "Nadie");
        UsuarioBL bl = new UsuarioBL();
        bl.merge(usu);
    }

    public static void findIdUsuario(Integer key) {
        UsuarioBL bl = new UsuarioBL();
        Usuario u;
        u = bl.findByID(key);
        System.out.println(u.getNombre());

    }
}
