/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package CatalogoComercial;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import Conexion.Conexion;
import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigDecimal;
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
@WebServlet(name = "ListaCatalogoComercialCmbxVenta", urlPatterns = {"/ListaCatalogoComercialCmbxVenta"})
public class ListaCatalogoComercialCmbxVenta extends HttpServlet {

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
            out.println("<title>Servlet ListaCatalogoComercialCmbxVenta</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet ListaCatalogoComercialCmbxVenta at " + request.getContextPath() + "</h1>");
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

        String consulta = "SELECT iIdItem, vNombre, iIdUnidadMedida, vAbreviaturaUM, Precio, cPrecio, PrecioPref FROM dbo.viewListaElementosCatalogo WHERE iIdItem != 1 AND iEstado = ? ORDER BY vNombre";
        Connection conexion = null;
        Conexion newCon = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        JsonArray jsonArray = new JsonArray();

        try {
            newCon = new Conexion();
            conexion = newCon.getConnection();
            stmt = conexion.prepareStatement(consulta);
            stmt.setInt(1, 1);
            rs = stmt.executeQuery();

            while (rs.next()) {
                JsonObject jsonObject = new JsonObject();
                jsonObject.addProperty("id", rs.getInt("iIdItem"));
                jsonObject.addProperty("text", rs.getString("vNombre"));
                jsonObject.addProperty("precio", rs.getBigDecimal("Precio").toString());
                jsonObject.addProperty("precioPref", rs.getBigDecimal("PrecioPref").toString());
                jsonObject.addProperty("codMedida", rs.getString("iIdUnidadMedida"));
                jsonObject.addProperty("abrev", rs.getString("vAbreviaturaUM"));
                jsonObject.addProperty("cPrecio", rs.getString("cPrecio"));
                jsonArray.add(jsonObject);
            }

            Gson gson = new Gson();
            String jsonResponse = gson.toJson(jsonArray);

            response.setContentType("application/json");
            response.setHeader("Cache-Control", "no-store");
            response.getWriter().write(jsonResponse);

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
    /*
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
            String consulta = "SELECT iIdItem, vNombre,iIdUnidadMedida,vAbreviaturaUM, Precio,cPrecio,PrecioPref FROM dbo.viewListaElementosCatalogo WHERE iIdItem!=1 and iEstado = ? order by vNombre";
            System.out.println(consulta);
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
                BigDecimal precio,precioPref;
                while (rs.next()) {
                    if (rc) {
                        json += ",\n";
                    }
                    json += "\n{ ";
                    json += "\"id\":" + rs.getString("iIdItem") + ",";
                    json += "\"text\":\"" + new String(rs.getString("vNombre").getBytes("UTF-8"), "ISO-8859-1") + "\",";
                    precio = new BigDecimal(rs.getString("Precio"));
                    precioPref = new BigDecimal(rs.getString("PrecioPref"));
                    json += "\"precio\":\"" + precio + "\",";
                    json += "\"precioPref\":\"" + precioPref + "\",";
                    json += "\"codMedida\":\"" + rs.getString("iIdUnidadMedida") + "\",";
                    json += "\"abrev\":\"" + rs.getString("vAbreviaturaUM") + "\",";
                    json += "\"cPrecio\":\"" + rs.getString("cPrecio") + "\"";
                    json += "}";
                    rc = true;
                }
                json += "\n]\n";
                System.out.println(json.trim());
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
    }*/

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
