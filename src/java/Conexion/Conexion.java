/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Conexion;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 *
 * @author Usuario
 */
public class Conexion {
    
      /*
    public static String usuario = "juntacan_SA_CPRO";//"sa";
    public static String basededatos = "juntacan_CPRO_BD";//"CRPO_BD";
    public static String contra = "L03&2kqm8";//"123456";
    public static String server = "juntacanete.org\\MSSQLSERVER2016";*/
    
    public static String usuario = "sa";
    public static String basededatos = "cpro";
    public static String contra = ".jq1qAcOCUpT2016.";
    //public static String server = "localhost\\MSSQLSERVER2016";
    public static String server = "190.119.116.91\\MSSQLSERVER2016";
    /*
    public static String usuario = "juntacan_SA_CPRO";//"sa";
    public static String basededatos = "juntacan_CPRO_BD";//"CRPO_BD";
    public static String contra = "L03&2kqm8";//"123456";
    public static String server = "juntacanete.org\\MSSQLSERVER2016";//DESKTOP-SIMLV3J\\SQLSERVER2016";*/
   
   /* public static String usuario = "sa";
    public static String basededatos = "CRPO_BD";
    public static String contra = "123456";
    public static String server = "DESKTOP-SIMLV3J\\SQLSERVER2016";*/
    
   Connection con = null;
    public Conexion() {
        try{
           Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");

            // Cadena de conexión con opciones de cifrado
            String connectionUrl = "jdbc:sqlserver://" + server + ":1434;"
                                   + "databaseName=" + basededatos + ";"
                                   + "user=" + usuario + ";"
                                   + "password=" + contra + ";"
                                   + "encrypt=true;"
                                   + "trustServerCertificate=true;";
         con = DriverManager.getConnection(connectionUrl);
         if (this.con != null) {
            System.out.println("Conexión a base de datos " + basededatos + ". listo");
         }
        }catch(ClassNotFoundException ex){
            System.out.println("Driver no encontrado");
        }catch(SQLException ex){
            System.out.println("Fallo al recibir base de datos");
        }catch(Exception ex){
            System.out.println("No hay resultado");
        }
    }
    
     public Connection getConnection() {
      if (this.con != null) {
         System.out.println("Ya esta Conectado a la base de datos " + basededatos + ". listo");
      } else {
         System.out.println("No exite Conexion a la Base de Datos " + basededatos + ". ");
      }

      return this.con;
   }
    
    public void getClose() {
    try{
        con.close();
         System.out.println("Se Cierra la Conexion a la Base de Datos " + basededatos + ". ");
    }catch(SQLException ex){
    }
    }
    
}
