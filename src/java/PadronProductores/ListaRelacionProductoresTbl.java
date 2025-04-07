/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package PadronProductores;

import Conexion.Conexion;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

/**
 *
 * @author user 1
 */
@WebServlet(name = "ListaRelacionProductoresTbl", urlPatterns = {"/ListaRelacionProductoresTbl"})
public class ListaRelacionProductoresTbl extends HttpServlet {

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
            out.println("<title>Servlet ListaRelacionProductoresTbl</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet ListaRelacionProductoresTbl at " + request.getContextPath() + "</h1>");
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
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Cache-Control", "no-store");
        response.setHeader("Pragma", "no-cache");
        response.setDateHeader("Expires", 0);
        response.setContentType("application/json; charset=UTF-8");
        HttpSession sesion = request.getSession();
        if (sesion.getAttribute("usuario") == null) {
            response.sendRedirect("CerrarSesion");
        } else {
            PreparedStatement ps = null;
            ResultSet rs = null;
            try {
                Conexion newCon = new Conexion();
                Connection conexion = newCon.getConnection();
                String productor = request.getParameter("productor");

                String consulta = "SELECT iIdProductores, vProductor FROM [dbo].[viewListaProductores] WHERE vProductor LIKE ?";
                ps = conexion.prepareStatement(consulta);
                ps.setString(1, "%" + productor + "%");
                rs = ps.executeQuery();

                JsonArray jsonArray = new JsonArray(); // Crear un JsonArray
                while (rs.next()) {
                    JsonObject jsonObject = new JsonObject(); // Crear un JsonObject
                    jsonObject.addProperty("codProductor", rs.getString("iIdProductores"));
                    jsonObject.addProperty("Nombre", rs.getString("vProductor"));
                    jsonArray.add(jsonObject); // Añadir objeto al array
                }

                Gson gson = new Gson(); // Crear instancia de Gson
                String json = gson.toJson(jsonArray); // Convertir el JsonArray a String

                System.out.println(json);
                ps.close();
                rs.close();
                newCon.getClose();
                response.getWriter().write(json.trim()); // Escribir el JSON en la respuesta
            } catch (SQLException var23) {
                System.out.println(var23.getMessage());
                Logger.getLogger(ListaProductoresTbl.class.getName()).log(Level.SEVERE, null, var23);
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
