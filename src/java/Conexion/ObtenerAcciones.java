/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Conexion;

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
import javax.servlet.http.HttpSession;

/**
 *
 * @author Usuario
 */
@WebServlet(name = "ObtenerAcciones", urlPatterns = {"/ObtenerAcciones"})
public class ObtenerAcciones extends HttpServlet {

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
            out.println("<title>Servlet ObtenerAcciones</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet ObtenerAcciones at " + request.getContextPath() + "</h1>");
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
        HttpSession sesion = request.getSession();

        if (sesion.getAttribute("usuario") == null) {
            response.setCharacterEncoding("UTF-8");
            response.setStatus(HttpServletResponse.SC_OK); // Siempre 200 OK
            response.getWriter().write("ex");
        }
        else
        {
            
            Connection conexion = null;
            PreparedStatement ps = null;
            ResultSet rs  = null;
            String rspt = "0_0_0";
            try {
                
                Conexion newCon = new Conexion();
                conexion = newCon.getConnection();
               String menu = request.getParameter("menu");
               String usuario = sesion.getAttribute("usuario").toString();
              // String usuario = request.getParameter("usuario");
               String consulta = "select estadoCrear,estadoModificar,estadoEliminar "
                       + "from [dbo].[PermisoSys] p INNER JOIN [dbo].[MenuSys] m  on p.[idMenu] = m.[idMenu] "
                       + "where m.[url]=? and p.[iDni]=?";
                System.out.println("menu: "+menu);
                System.out.println("usuario: "+usuario);
               ps = conexion.prepareStatement(consulta);
               ps.setString(1, menu);
               ps.setString(2, usuario);
               rs = ps.executeQuery();
               if(rs.next())
               {
                   rspt = rs.getString("estadoCrear") + "_" + rs.getString("estadoModificar") + "_" + rs.getString("estadoEliminar");
               }
               response.getWriter().write(rspt);
            }  catch (SQLException e) {
                e.printStackTrace();
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR); // 500 Internal Server Error
            } finally {
                try {
                    if (ps != null) ps.close();
                    if (rs != null) rs.close();
                    if (conexion != null) conexion.close(); 
                } catch (SQLException e) {
                    e.printStackTrace();
                }
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
