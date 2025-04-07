/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Conexion;

/**
 *
 * @author Usuario
 */
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ConexionPool {
    private static String usuario = "sa";
    private static String contra = "123456";
    private static String basededatos = "CRPO_HABILITACION";
    private static String server = "localhost";
    private static SimpleConnectionPool pool;

    // Inicializar el pool de conexiones en un bloque estático
    static {
        try {
            pool = new SimpleConnectionPool(
                    "jdbc:sqlserver://" + server + ":1433;databaseName=" + basededatos,
                    usuario,
                    contra,
                    10 // Número inicial de conexiones
            );
        } catch (SQLException e) {
            System.out.println("Fallo al inicializar el pool de conexiones: " + e.getMessage());
        }
    }

    // Obtener una conexión del pool
    public static Connection getConnection() throws SQLException {
        return pool.getConnection();
    }

    // Liberar una conexión de vuelta al pool
    public static void releaseConnection(Connection connection) {
        pool.releaseConnection(connection);
    }

    // Clase interna para el pool de conexiones
    public static class SimpleConnectionPool {
        private List<Connection> availableConnections = new ArrayList<>();

        public SimpleConnectionPool(String url, String user, String password, int initialConnections) throws SQLException {
            for (int i = 0; i < initialConnections; i++) {
                availableConnections.add(createConnection(url, user, password));
            }
        }

        private Connection createConnection(String url, String user, String password) throws SQLException {
            return DriverManager.getConnection(url, user, password);
        }

        public synchronized Connection getConnection() throws SQLException {
            if (availableConnections.isEmpty()) {
                return createConnection("jdbc:sqlserver://" + server + ":1433;databaseName=" + basededatos, usuario, contra);
            } else {
                return availableConnections.remove(availableConnections.size() - 1);
            }
        }

        public synchronized void releaseConnection(Connection connection) {
            availableConnections.add(connection);
        }
    }
}
