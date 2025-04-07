/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package PadronProductores;

import Conexion.Conexion;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
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
@WebServlet(name = "AgregarProductores", urlPatterns = {"/AgregarProductores"})
public class AgregarProductores extends HttpServlet {

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
            out.println("<title>Servlet AgregarProductores</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet AgregarProductores at " + request.getContextPath() + "</h1>");
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
            String respta = "erNo hemos podido registrar el Productor.";

            // Datos de la solicitud
            String vNombresReg = request.getParameter("vNombresReg").trim();
            String vApePaternoReg = request.getParameter("vApePaternoReg").trim();
            String vApeMaternoReg = request.getParameter("vApeMaternoReg").trim();
            Integer iCelularReg = parseIntegerParameter(request.getParameter("iCelularReg"));
            Integer iDniReg = parseIntegerParameter(request.getParameter("iDniReg"));
            String iRucReg = request.getParameter("iRucReg");
            String vDireccionReg = request.getParameter("vDireccionReg").trim();
            String vRazonSocialReg = request.getParameter("vRazonSocialReg").trim();
            Date dfechaIngresoReg = (!request.getParameter("dfechaIngresoReg").equals(""))? Date.valueOf(request.getParameter("dfechaIngresoReg")): null;
            String vCorreoReg = request.getParameter("vCorreoReg");
            String iPersonaRegistra = sesion.getAttribute("usuario").toString();
            Integer iTipoProductorReg = parseIntegerParameter(request.getParameter("iTipoProductorReg"));
            CallableStatement cs = null;
            Conexion newCon = new Conexion(); // Manejar la excepción SQL
            try (Connection conexion = newCon.getConnection()) {
                
                cs = conexion.prepareCall("{CALL sp_Productor_Insert(?,?,?,?,?,?,?,?,?,?,?,?,?)}");
                cs.setInt(1, iDniReg);
                cs.setString(2, iRucReg);
                cs.setString(3, vApePaternoReg);
                cs.setString(4, vApeMaternoReg);
                cs.setString(5, vNombresReg);
                cs.setString(6, vRazonSocialReg);
                cs.setInt(7, iCelularReg);
                cs.setString(8, vDireccionReg);
                cs.setString(9, iPersonaRegistra);
                cs.setInt(10, iTipoProductorReg);
                cs.setDate(11, dfechaIngresoReg);
                cs.setString(12, vCorreoReg);
                cs.registerOutParameter(13, 12);	
                cs.execute();
                respta = cs.getString(13);
                cs.close();
                
            } catch (SQLException ex) {
                Logger.getLogger(AgregarProductores.class.getName()).log(Level.SEVERE, null, ex);
            }
         newCon.getClose();
         response.setCharacterEncoding("UTF-8");
         response.getWriter().write(respta);
        }
    }

    private Integer parseIntegerParameter(String parameter) {
        if (parameter == null || parameter.trim().isEmpty()) {
            return 0;
        }
        return Integer.parseInt(parameter.trim());
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
