/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package UsuariosSystem;

import Conexion.Conexion;
import com.google.gson.Gson;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

// Modelos para el menú y permisos
class MenuItem {
    int id;
    String text;
    int state;
    int modify;
    int create;
    int delete;
    boolean checked;
    int parentId;
    List<MenuItem> children = new ArrayList<>();
}

class PermisoS {
    int modify;
    int create;
    int delete;
}
/**
 *
 * @author user 1
 */
@WebServlet(name = "MenuService", urlPatterns = {"/MenuService"})
public class MenuService extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private Gson gson = new Gson();

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
                    response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

         String usuario = request.getParameter("user");
        List<MenuItem> menuItems = new ArrayList<>();
            Conexion newCon = new Conexion();
            Connection conexion = newCon.getConnection();
            
            String query = "SELECT * FROM MenuSys WHERE idMenuPadre IS NULL AND estado = 1";
            try (PreparedStatement statement = conexion.prepareStatement(query);
                 ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    MenuItem menuItem = createMenuItem(resultSet, usuario, conexion);
                    menuItems.add(menuItem);
                }
            }
            
          Gson gson = new Gson();
        String json = gson.toJson(menuItems);
        response.getWriter().write(json);
            System.out.println(json);
        
        } catch (SQLException ex) {
            ex.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("Error al cargar los datos del servidor.");
        }
     
    }

    private MenuItem createMenuItem(ResultSet rs, String usuario, Connection connection) throws SQLException {
        MenuItem menuItem = new MenuItem();
        menuItem.id = rs.getInt("idMenu");
        menuItem.text = rs.getString("vNombre");
        menuItem.state = rs.getInt("estado");
        setPermisos(menuItem, usuario, rs.getInt("idMenu"), connection);

        // Obtener elementos hijos
        String query = "SELECT * FROM MenuSys WHERE idMenuPadre = ? AND estado = 1";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setInt(1, menuItem.id);
            try (ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    MenuItem child = createMenuItem(resultSet, usuario, connection);
                    menuItem.children.add(child);
                }
            }
        }
        return menuItem;
    }
    
    private void setPermisos(MenuItem menuItem, String usuario, int menuId, Connection connection) throws SQLException {
        String query = "SELECT * FROM PermisoSys WHERE idMenu = ? AND iDni = ?";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setInt(1, menuId);
            statement.setString(2, usuario);
            try (ResultSet rs = statement.executeQuery()) {
                if (rs.next()) {
                    menuItem.modify = rs.getInt("estadoModificar");
                    menuItem.create = rs.getInt("estadoCrear");
                    menuItem.delete = rs.getInt("estadoEliminar");
                    menuItem.checked = rs.getBoolean("iEstado"); // Marcar como checked si hay permisos
                } else {
                    menuItem.checked = false; // No checked si no hay permisos
                }
            }
        }
    }
    
    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

