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
@WebServlet(name = "EditarProductores", urlPatterns = {"/EditarProductores"})
public class EditarProductores extends HttpServlet {

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
            out.println("<title>Servlet EditarProductores</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet EditarProductores at " + request.getContextPath() + "</h1>");
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
            String respta = "erNo hemos podido actualizar el Productor.";

            // Datos de la solicitud
            Integer CodReg = parseIntegerParameter(request.getParameter("iCodRegReg"));
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
            System.out.println("vApeMaternoReg: "+vApeMaternoReg);
            CallableStatement cs = null;
            Conexion newCon = new Conexion(); // Manejar la excepción SQL
            try (Connection conexion = newCon.getConnection()) {                
                cs = conexion.prepareCall("{CALL sp_Productor_Update(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}");
                cs.setInt(1, CodReg);
                cs.setInt(2, iDniReg);
                cs.setString(3, iRucReg);
                cs.setString(4, vApePaternoReg);
                cs.setString(5, vApeMaternoReg);
                cs.setString(6, vNombresReg);
                cs.setString(7, vRazonSocialReg);
                cs.setInt(8, iCelularReg);
                cs.setString(9, vDireccionReg);
                cs.setString(10, iPersonaRegistra);
                cs.setInt(11, iTipoProductorReg);
                cs.setDate(12, dfechaIngresoReg);
                cs.setString(13, vCorreoReg);
                cs.registerOutParameter(14, 12);	
                cs.execute();
                respta = cs.getString(14);
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
