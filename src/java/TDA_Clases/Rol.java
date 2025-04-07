/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package TDA_Clases;

import Conexion.Conexion;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author lmurr
 */
public class Rol {
    private int iIdRol;
    private String vNombre;
    private List<Permiso> permisos;
    public Rol() {
        this.permisos = new ArrayList<>(); 
    }
    
    public Rol(int iIdRol, String vNombre) {
        this.iIdRol = iIdRol;
        this.vNombre = vNombre;
        this.permisos = new ArrayList<>(); 
    }
    
    public Rol(int iIdRol) {
        this.iIdRol = iIdRol;
        this.permisos = new ArrayList<>(); 
    }
    
    public void ObtenerPermisos(){
        try{
            // Obtener la conexión a la base de datos desde la clase Conexion
            Conexion newCon = new Conexion();
            try (Connection conexion = newCon.getConnection()) {
                // Crear una declaración para ejecutar la consulta SQL
                Statement declaración = conexion.createStatement();

                // Ejecutar la consulta SQL
                ResultSet resultado = declaración.executeQuery("select rp.iIdPermiso, p.vNombre as vNombrePermiso from RolesPermisos as rp inner join Permisos as p on rp.iIdPermiso = p.iIdPermiso where rp.iIdRol = "+this.iIdRol+";");
                
                // Iterar sobre los resultados y agregar los roles a la lista
                while (resultado.next()) {
                    
                    Permiso permiso = new Permiso(Integer.parseInt(resultado.getString("iIdPermiso")),resultado.getString("vNombrePermiso"));
                    
                    (this.permisos).add(permiso);
                }
                // Cerrar la conexión
                conexion.close();
            }
        }catch (SQLException e) {
            // Manejar la excepción SQL
            System.out.println("Error :"+e.getMessage());
            e.printStackTrace();
        }
    }
    
    public void ObtenerNombre(){
        try{
            // Obtener la conexión a la base de datos desde la clase Conexion
            Conexion newCon = new Conexion();
            try (Connection conexion = newCon.getConnection()) {
                // Crear una declaración para ejecutar la consulta SQL
                Statement declaración = conexion.createStatement();

                // Ejecutar la consulta SQL
                ResultSet resultado = declaración.executeQuery("select vNombre from Roles where iIdRol = "+this.iIdRol+";");

                // Iterar sobre los resultados y agregar los roles a la lista
                while (resultado.next()) {
                    this.vNombre = resultado.getString("vNombre");
                }
                // Cerrar la conexión
                conexion.close();
            }
        }catch (SQLException e) {
            // Manejar la excepción SQL
            System.out.println("Error :"+e.getMessage());
            e.printStackTrace();
        }
        
    }
    
    public boolean ValidarPermiso(int idPermisoValidar){
        for(Permiso permiso : this.permisos){
            if(permiso.getiIdPermiso() == idPermisoValidar){
                return true;
            }
        }
        
        return false;
    }

    public int getiIdRol() {
        return iIdRol;
    }

    public void setiIdRol(int iIdRol) {
        this.iIdRol = iIdRol;
    }

    public String getvNombre() {
        return vNombre;
    }

    public void setvNombre(String vNombre) {
        this.vNombre = vNombre;
    }

    public List<Permiso> getPermisos() {
        return permisos;
    }
    
    
    
}
