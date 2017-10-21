package cr.ac.una.prograiv.project.domain;
// Generated 05/10/2017 12:43:10 AM by Hibernate Tools 4.3.1


import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * Usuario generated by hbm2java
 */
@Entity
@Table(name="usuario"
    ,catalog="transporte"
)
public class Usuario  implements java.io.Serializable {

     private Integer pkIdUsuario;
     private String nombreUsuario;
     private String contrasena;
     private String nombre;
     private String apellido1;
     private String apellido2;
     private String correo;
     private Date fechaNacimiento;
     private String telefono;
     private Serializable direccion;
     private int tipo;
     private Date ultimaFecha;
     private String ultimoUsuario;

    public Usuario() {
    }

	
    public Usuario(String nombreUsuario, String contrasena, String nombre, String apellido1, String apellido2, String correo,Date fechaNacimiento, String telefono, int tipo, Date ultimaFecha, String ultimoUsuario) {
        this.nombreUsuario = nombreUsuario;
        this.contrasena = contrasena;
        this.nombre = nombre;
        this.apellido1 = apellido1;
        this.apellido2 = apellido2;
        this.correo = correo;
        this.fechaNacimiento = fechaNacimiento;
        this.telefono = telefono;
        this.tipo = tipo;
        this.ultimaFecha = ultimaFecha;
        this.ultimoUsuario = ultimoUsuario;
    }
    public Usuario(Integer pkIdUsuario,String nombreUsuario, String contrasena, String nombre, String apellido1, String apellido2, String correo, Date fechaNacimiento, String telefono, Serializable direccion, int tipo, Date ultimaFecha, String ultimoUsuario) {
       this.pkIdUsuario=pkIdUsuario;
       this.nombreUsuario = nombreUsuario;
       this.contrasena = contrasena;
       this.nombre = nombre;
       this.apellido1 = apellido1;
       this.apellido2 = apellido2;
       this.correo = correo;
       this.fechaNacimiento = fechaNacimiento;
       this.telefono = telefono;
       this.direccion = direccion;
       this.tipo = tipo;
       this.ultimaFecha = ultimaFecha;
       this.ultimoUsuario = ultimoUsuario;
    }
   
     @Id @GeneratedValue(strategy=IDENTITY)

    
    @Column(name="PK_idUsuario", unique=true, nullable=false)
    public Integer getPkIdUsuario() {
        return this.pkIdUsuario;
    }
    
    public void setPkIdUsuario(Integer pkIdUsuario) {
        this.pkIdUsuario = pkIdUsuario;
    }

    
    @Column(name="nombreUsuario", nullable=false, length=45)
    public String getNombreUsuario() {
        return this.nombreUsuario;
    }
    
    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    
    @Column(name="contrasena", nullable=false, length=45)
    public String getContrasena() {
        return this.contrasena;
    }
    
    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    
    @Column(name="nombre", nullable=false, length=45)
    public String getNombre() {
        return this.nombre;
    }
    
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    
    @Column(name="apellido1", nullable=false, length=45)
    public String getApellido1() {
        return this.apellido1;
    }
    
    public void setApellido1(String apellido1) {
        this.apellido1 = apellido1;
    }

    
    @Column(name="apellido2", nullable=false, length=45)
    public String getApellido2() {
        return this.apellido2;
    }
    
    public void setApellido2(String apellido2) {
        this.apellido2 = apellido2;
    }

    
    @Column(name="correo", nullable=false, length=45)
    public String getCorreo() {
        return this.correo;
    }
    
    public void setCorreo(String correo) {
        this.correo = correo;
    }

    @Temporal(TemporalType.DATE)
    @Column(name="fechaNacimiento", length=10)
    public Date getFechaNacimiento() {
        return this.fechaNacimiento;
    }
    
    public void setFechaNacimiento(Date fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    
    @Column(name="telefono", nullable=false, length=45)
    public String getTelefono() {
        return this.telefono;
    }
    
    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    
    @Column(name="direccion")
    public Serializable getDireccion() {
        return this.direccion;
    }
    
    public void setDireccion(Serializable direccion) {
        this.direccion = direccion;
    }

    
    @Column(name="tipo", nullable=false)
    public int getTipo() {
        return this.tipo;
    }
    
    public void setTipo(int tipo) {
        this.tipo = tipo;
    }

    @Temporal(TemporalType.DATE)
    @Column(name="ultimaFecha", nullable=false, length=10)
    public Date getUltimaFecha() {
        return this.ultimaFecha;
    }
    
    public void setUltimaFecha(Date ultimaFecha) {
        this.ultimaFecha = ultimaFecha;
    }

    
    @Column(name="ultimoUsuario", nullable=false, length=45)
    public String getUltimoUsuario() {
        return this.ultimoUsuario;
    }
    
    public void setUltimoUsuario(String ultimoUsuario) {
        this.ultimoUsuario = ultimoUsuario;
    }

}


