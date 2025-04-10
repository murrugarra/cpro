/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Grupo;

import Conexion.Conexion;
import PadronProductores.AgregarProductores;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Usuario
 */
@WebServlet(name = "EliminarGrupo", urlPatterns = {"/EliminarGrupo"})
public class EliminarGrupo extends HttpServlet {

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
            out.println("<title>Servlet EliminarGrupo</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet EliminarGrupo at " + request.getContextPath() + "</h1>");
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
       response.sendRedirect("CerrarSesion");
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
        response.setHeader("Cache-Control","no-cache");
        response.setHeader("Cache-Control","no-store");
        response.setHeader("Pragma","no-cache");
        response.setDateHeader ("Expires", 0);
        HttpSession sesion = request.getSession();
        if(sesion.getAttribute("usuario") == null){
          response.sendRedirect("CerrarSesion");
        }else{
            // Respuesta JSON predeterminada (error)
            String respta = "erNo hemos podido eliminar el Registro.";

            // Datos de la solicitud
            int cod = Integer.parseInt(request.getParameter("codigo").trim());
            String iPersonaRegistra = sesion.getAttribute("usuario").toString();
            CallableStatement cs = null;
            Conexion newCon = new Conexion(); // Manejar la excepción SQL
            try (Connection conexion = newCon.getConnection()) {
                
                cs = conexion.prepareCall("{CALL sp_Grupo_Eliminar(?,?,?)}");
                cs.setInt(1, cod);
                cs.setString(2, iPersonaRegistra);
                cs.registerOutParameter(3, 12);	
                cs.execute();
                respta = cs.getString(3);
                cs.close();
                
            } catch (SQLException ex) {
                Logger.getLogger(EliminarGrupo.class.getName()).log(Level.SEVERE, null, ex);
            }
         newCon.getClose();
         response.setCharacterEncoding("UTF-8");
         response.getWriter().write(respta);
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
