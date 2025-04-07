/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Habilitaciones;

import Conexion.Conexion;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author user 1
 */
@WebServlet(name = "EliminarFinanciamiento", urlPatterns = {"/EliminarFinanciamiento"})
public class EliminarFinanciamiento extends HttpServlet {

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
            out.println("<title>Servlet EliminarFinanciamiento</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet EliminarFinanciamiento at " + request.getContextPath() + "</h1>");
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
            String respta = "erNo hemos podido realizar el Registro.";
            int codHabilita = Integer.parseInt(request.getParameter("codHabilita"));
            int codPredio = Integer.parseInt(request.getParameter("codPredio"));
            int codCampania = Integer.parseInt(request.getParameter("codCampania"));
            String UserReg = sesion.getAttribute("usuario").toString();


            Connection conexion = null;
            CallableStatement cs = null;
            try {// Obtener conexión (esto depende de cómo manejes las conexiones en tu aplicación)
            Conexion newCon = new Conexion(); // Asumiendo que tienes una clase Conexion para manejar conexiones
            conexion = newCon.getConnection(); // Método para obtener una conexión
             if (conexion == null) {
                throw new SQLException("erNo se pudo obtener la conexión.");
            }
                String sql = "{call sp_FinanciamientoPredio_Eliminar(?,?,?,?,?)}"; 
                cs = conexion.prepareCall(sql);
                cs.setInt(1, codPredio);
                cs.setInt(2, codCampania);
                cs.setInt(3, codHabilita);
                cs.setString(4, UserReg);
                cs.registerOutParameter(5, java.sql.Types.VARCHAR); 
                cs.execute();

                respta = cs.getString(5);
                response.setCharacterEncoding("UTF-8");
                response.setStatus(HttpServletResponse.SC_OK); // Siempre 200 OK
                response.getWriter().write(respta);

                } catch (SQLException e) {
                e.printStackTrace();
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR); // 500 Internal Server Error
            } finally {
                try {
                    if (cs != null) cs.close();
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
