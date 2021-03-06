package cr.ac.una.prograiv.project.domain;
// Generated 21/10/2017 03:51:32 PM by Hibernate Tools 4.3.1

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
 * Vehiculo generated by hbm2java
 */
@Entity
@Table(name = "vehiculo",
         catalog = "transporte"
)
public class Vehiculo implements java.io.Serializable {

    private Integer pkIdVehiculo;
    private int ano;
    private String modelo;
    private String placa;
    private String color;
    private double ubicacionX;
    private double ubicacionY;
    private boolean activo;
    private boolean espera;
    private Date ultimaFecha;
    private String ultimoUsuario;

    public Vehiculo() {
    }

    public Vehiculo(int ano, String modelo, String placa, String color, double ubicacionX, double ubicacionY, boolean activo, boolean espera, Date ultimaFecha, String ultimoUsuario) {
        this.ano = ano;
        this.modelo = modelo;
        this.placa = placa;
        this.color = color;
        this.ubicacionX = ubicacionX;
        this.ubicacionY = ubicacionY;
        this.activo = activo;
        this.espera = espera;
        this.ultimaFecha = ultimaFecha;
        this.ultimoUsuario = ultimoUsuario;
    }

    public Vehiculo(Integer pkIdVehiculo, int ano, String modelo, String placa, String color, double ubicacionX, double ubicacionY, boolean activo, boolean espera, Date ultimaFecha, String ultimoUsuario) {
        this.pkIdVehiculo = pkIdVehiculo;
        this.ano = ano;
        this.modelo = modelo;
        this.placa = placa;
        this.color = color;
        this.ubicacionX = ubicacionX;
        this.ubicacionY = ubicacionY;
        this.activo = activo;
        this.espera = espera;
        this.ultimaFecha = ultimaFecha;
        this.ultimoUsuario = ultimoUsuario;
    }

    @Id
    @GeneratedValue(strategy = IDENTITY)

    @Column(name = "PK_idVehiculo", unique = true, nullable = false)
    public Integer getPkIdVehiculo() {
        return this.pkIdVehiculo;
    }

    public void setPkIdVehiculo(Integer pkIdVehiculo) {
        this.pkIdVehiculo = pkIdVehiculo;
    }

    @Column(name = "ano", nullable = false)
    public int getAno() {
        return this.ano;
    }

    public void setAno(int ano) {
        this.ano = ano;
    }

    @Column(name = "modelo", nullable = false, length = 45)
    public String getModelo() {
        return this.modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    @Column(name = "placa", nullable = false, length = 45)
    public String getPlaca() {
        return this.placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    @Column(name = "color", nullable = false, length = 45)
    public String getColor() {
        return this.color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    @Column(name = "ubicacionX", nullable = false, precision = 22, scale = 0)
    public double getUbicacionX() {
        return this.ubicacionX;
    }

    public void setUbicacionX(double ubicacionX) {
        this.ubicacionX = ubicacionX;
    }

    @Column(name = "ubicacionY", nullable = false, precision = 22, scale = 0)
    public double getUbicacionY() {
        return this.ubicacionY;
    }

    public void setUbicacionY(double ubicacionY) {
        this.ubicacionY = ubicacionY;
    }

    @Column(name = "activo", nullable = false)
    public boolean isActivo() {
        return this.activo;
    }

    public void setActivo(boolean activo) {
        this.activo = activo;
    }

    @Column(name = "espera", nullable = false)
    public boolean isEspera() {
        return this.espera;
    }

    public void setEspera(boolean espera) {
        this.espera = espera;
    }

    @Temporal(TemporalType.DATE)
    @Column(name = "ultimaFecha", nullable = false, length = 10)
    public Date getUltimaFecha() {
        return this.ultimaFecha;
    }

    public void setUltimaFecha(Date ultimaFecha) {
        this.ultimaFecha = ultimaFecha;
    }

    @Column(name = "ultimoUsuario", nullable = false, length = 45)
    public String getUltimoUsuario() {
        return this.ultimoUsuario;
    }

    public void setUltimoUsuario(String ultimoUsuario) {
        this.ultimoUsuario = ultimoUsuario;
    }
}
