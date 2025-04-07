/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Predios;

import Conexion.Conexion;
import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigDecimal;
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
@WebServlet(name = "AgregarPredio", urlPatterns = {"/AgregarPredio"})
public class AgregarPredio extends HttpServlet {

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
            out.println("<title>Servlet AgregarPredio</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet AgregarPredio at " + request.getContextPath() + "</h1>");
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
            CallableStatement cs = null;
            String respta = "erNo hemos podido realizar el Registro.";

            try {
                // Obtener conexión (esto depende de cómo manejes las conexiones en tu aplicación)
                Conexion newCon = new Conexion(); // Asumiendo que tienes una clase Conexion para manejar conexiones
                conexion = newCon.getConnection(); // Método para obtener una conexión
                if (conexion == null) {
                    throw new SQLException("erNo se pudo obtener la conexión.");
                }

                int productor = Integer.parseInt(request.getParameter("productor").trim());
                String vNombre = request.getParameter("Nombre").trim();
                int sector = Integer.parseInt(request.getParameter("sector").trim());
                String Uc = request.getParameter("Uc").trim();
                String AreaTotal = request.getParameter("AreaTotal").trim();
                String AreaInst = request.getParameter("AreaInst").trim();
                int tipo = Integer.parseInt(request.getParameter("tipo").trim());
                String ce = request.getParameter("ce").trim();
                String ph = request.getParameter("ph").trim();
                
                BigDecimal BAreaTotal = new BigDecimal(AreaTotal);
                BigDecimal BAreaInst = new BigDecimal(AreaInst);
                
                String iPersonaRegistra = sesion.getAttribute("usuario").toString();
                cs = conexion.prepareCall("{CALL sp_Predio_Insert(?,?,?,?,?,?,?,?,?,?,?)}");
                cs.setString(1, vNombre);
                cs.setString(2, Uc);
                cs.setBigDecimal(3, BAreaTotal);
                cs.setBigDecimal(4, BAreaInst);
                cs.setInt(5, sector);
                cs.setInt(6, tipo);
                cs.setString(7, ph);
                cs.setString(8, ce);
                cs.setString(9, iPersonaRegistra);                
                cs.setInt(10, productor);
                cs.registerOutParameter(11, java.sql.Types.VARCHAR); 
                cs.execute();
                respta = cs.getString(11);

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
