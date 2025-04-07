/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package UsuariosSystem;

import Conexion.Conexion;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Usuario
 */
@WebServlet(name = "ListaUsuariosSystemCmbx", urlPatterns = {"/ListaUsuariosSystemCmbx"})
public class ListaUsuariosSystemCmbx extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet ListaUsuariosSystemCmbx</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet ListaUsuariosSystemCmbx at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
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
            
            String consulta = "select iDni from [dbo].[UsuariosSys] where iEstado=?";
            Connection conexion = null;
            Conexion newCon = null;
            PreparedStatement stmt = null;
            ResultSet rs = null;
            try {
                newCon = new Conexion();
                conexion = newCon.getConnection();
                stmt = conexion.prepareStatement(consulta);
                stmt.setInt(1, 1);;
                rs = stmt.executeQuery();
                String json = "[";
                boolean rc = false;

                while (rs.next()) {
                    if (rc) {
                        json += ",\n";
                    }
                    json += "\n{ ";
                    json += "\"id\":\"" + rs.getString("iDni") + "\",";
                    json += "\"text\":\"" + rs.getString("iDni") + "\"";
                    json += "}";
                    rc = true;
                }
                json += "\n]\n";
                response.setContentType("application/json");
                response.setHeader("Cache-Control", "no-store");
                response.getWriter().write(json.trim());

            } catch (SQLException e) {
                e.printStackTrace();
                response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error en la base de datos");
            } finally {
                try {
                    if (rs != null) rs.close();
                    if (stmt != null) stmt.close();
                    if (conexion != null) newCon.getClose();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
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
