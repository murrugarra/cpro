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
public class ObtenerPermisos {

    public ObtenerPermisos() {
    }
    
    public List<Permiso> doGet(){
        // Crear una lista para almacenar los roles
        List<Permiso> permisos = new ArrayList<>();
        try {
            // Obtener la conexión a la base de datos desde la clase Conexion
            Conexion newCon = new Conexion();
            try (Connection conexion = newCon.getConnection()) {
                // Crear una declaración para ejecutar la consulta SQL
                Statement declaración = conexion.createStatement();

                // Ejecutar la consulta SQL
                ResultSet resultado = declaración.executeQuery("SELECT iIdPermiso, vNombre FROM Permisos WHERE iEstado = 1");

                // Iterar sobre los resultados y agregar los roles a la lista
                while (resultado.next()) {
                    Permiso permiso = new Permiso(Integer.parseInt(resultado.getString("iIdPermiso")),resultado.getString("vNombre"));
                    permisos.add(permiso);
                }
                // Cerrar la conexión
                conexion.close();
                declaración.close();
                resultado.close();
            }
            newCon.getClose();
        } catch (SQLException e) {
            // Manejar la excepción SQL
            System.out.println("Error :"+e.getMessage());
            e.printStackTrace();
        }
        
        return permisos;
    }
}
