/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package TipoCambio;

import Conexion.Conexion;
import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.sql.Types;
import java.util.Locale;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonArray;

/**
 *
 * @author Usuario
 */
@WebServlet(name = "ObtenerTipoCambioBd", urlPatterns = {"/ObtenerTipoCambioBd"})
public class ObtenerTipoCambioBd extends HttpServlet {

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
            out.println("<title>Servlet ObtenerTipoCambioBd</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet ObtenerTipoCambioBd at " + request.getContextPath() + "</h1>");
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
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            PrintWriter out = response.getWriter();
            String jsonResponse = "{}";
            JsonObject json = new JsonObject();
            try {
                // Obtener conexión (esto depende de cómo manejes las conexiones en tu aplicación)
                Conexion newCon = new Conexion(); // Asumiendo que tienes una clase Conexion para manejar conexiones
                conexion = newCon.getConnection(); // Método para obtener una conexión
                if (conexion == null) {
                    throw new SQLException("erNo se pudo obtener la conexión.");
                }
                
                Date dFechaIngreso = (!request.getParameter("dFecha").equals(""))? Date.valueOf(request.getParameter("dFecha")): null;
                System.out.println("dFechaIngreso: "+dFechaIngreso);
                cs = conexion.prepareCall("{CALL sp_ObtenerTipoDeCambioPorFecha(?,?,?)}");
                cs.setDate(1, dFechaIngreso);
                cs.registerOutParameter(2, Types.DECIMAL);
                cs.registerOutParameter(3, Types.DECIMAL);
                cs.execute();
                BigDecimal  tipoCompra = cs.getBigDecimal(2);
                BigDecimal  tipoVenta = cs.getBigDecimal(3);
                json.addProperty("TCompra", tipoCompra);
                json.addProperty("TVenta", tipoVenta);


            } catch (SQLException e) {
                e.printStackTrace();
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                out.print("{\"precioCompra\": 0.0000, \"precioVenta\": 0.0000}");
                System.out.println("entro erro1");
                out.flush();
            } finally {
                try {
                    if (cs != null) cs.close();
                    if (conexion != null) conexion.close(); 
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            System.out.println("entro final");
                System.out.println("json: "+json);
                out.print(json.toString());
                out.flush();
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
