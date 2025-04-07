/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Habilitaciones;

import CatalogoComercial.ListaCatalogoComercialTbl;
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

/**
 *
 * @author Usuario
 */
@WebServlet(name = "ListaHabilitacionPredioTbl", urlPatterns = {"/ListaHabilitacionPredioTbl"})
public class ListaHabilitacionPredioTbl extends HttpServlet {

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
            out.println("<title>Servlet ListaHabilitacionPredioTbl</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet ListaHabilitacionPredioTbl at " + request.getContextPath() + "</h1>");
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
        HttpSession sesion = request.getSession();
        if (sesion.getAttribute("usuario") == null) {
            response.sendRedirect("CerrarSesion");
        } else {
            PreparedStatement ps1 = null,ps2 = null;
            ResultSet rs1 = null,rs2 = null;
            Conexion newCon = null;
            Connection conexion = null;
            try {
                newCon = new Conexion();
                conexion = newCon.getConnection();
                String pagina = request.getParameter("page");
                String rows = request.getParameter("rows");
                String comprobante = request.getParameter("comprobante");
                String fInicio = request.getParameter("fInicio");
                String fFin = request.getParameter("fFin");
                
                String filtrar = "";

                if (null == fInicio) {
                    filtrar = filtrar + " where iIdTipoDocumento!=2 ";
                } else {
                    filtrar = filtrar + " where iIdTipoDocumento!=2 and CONVERT(DATE,dFechaReg,120) BETWEEN CONVERT(DATE,'"+fInicio+"',120) AND CONVERT(DATE,'"+fFin+"',120)";
                }

                if (pagina == null && pagina.equals("")) {
                    pagina = "1";
                }

                if (rows == null && rows.equals("")) {
                    rows = "20";
                }
               
               
                if (comprobante != null && !comprobante.equals("")) {
                    filtrar = filtrar + " and vNro_Documento like '%" + comprobante + "%'";
                }
        
                int offset = (Integer.parseInt(pagina) - 1) * Integer.parseInt(rows);
                int totalRecords = 0;
                String sql1 = "select count(*) as tam from view_DetalleHabilitacion " + filtrar + "";

                ps1 = conexion.prepareStatement(sql1);
                rs1 = ps1.executeQuery();

                if (rs1.next()) {
                    totalRecords = rs1.getInt("tam");
                }

                String sql2 = "WITH proyectos AS ( SELECT ROW_NUMBER() OVER( ORDER BY dFecha_Emision asc ) as Row,"
                        + " * from view_DetalleHabilitacion " + filtrar + " )"
                        + "SELECT TOP " + rows + " * FROM proyectos WHERE Row > " + offset + " ";
                System.out.println("sql2: "+sql2);
                boolean rc = false;
                ps2 = conexion.prepareStatement(sql2);
                rs2 = ps2.executeQuery();

                String json = "";
                json = json + "{\n";
                json = json + " \"total\":\"" + totalRecords + "\",\n";
                json = json + "\"rows\": [";


                while (rs2.next()) {
                    if (rc) {
                        json = json + ",";
                    }
                    json = json + "\n{ ";
                    json = json + "\"codPredio\":\"" + rs2.getString("iIdPredios") + "\",";
                    json = json + "\"codHabilitacion\":\"" + rs2.getString("iIdHabilitacion") + "\",";
                    json = json + "\"codDetalle\":\"" + rs2.getString("iIdDetalle") + "\",";
                    json = json + "\"codCampania\":\"" + rs2.getString("iIdCampana") + "\",";
                    json = json + "\"codCultivo\":\"" + rs2.getString("iIdCultivo") + "\",";
                    json = json + "\"codTipoDoc\":\"" + rs2.getString("iIdTipoDocumento") + "\",";
                    json = json + "\"nombreProductor\":\"" + new String(rs2.getString("nomb_productor").getBytes("UTF-8"), "ISO-8859-1") + "\",";
                    json = json + "\"nombrePredio\":\"" + new String(rs2.getString("predio").getBytes("UTF-8"), "ISO-8859-1") + "\",";
                    json = json + "\"uc\":\"" + rs2.getString("vCodPredio") + "\",";
                    json = json + "\"tipoDoc\":\"" + rs2.getString("TipoDoc") + "\",";
                    json = json + "\"nroComprobante\":\"" + rs2.getString("vNro_Documento") + "\",";
                    json = json + "\"moneda\":\"" + rs2.getString("cMoneda") + "\",";
                    json = json + "\"valorVentaD\":\"" + rs2.getString("dcSubTotalDolar") + "\",";
                    json = json + "\"impuestoD\":\"" + rs2.getString("dcIgvDolar") + "\",";
                    json = json + "\"ImporteD\":\"" + rs2.getString("dcMontoTotalDolar") + "\",";
                    json = json + "\"valorVentaS\":\"" + rs2.getString("dcSubTotal") + "\",";
                    json = json + "\"impuestoS\":\"" + rs2.getString("dcIgv") + "\",";
                    json = json + "\"ImporteS\":\"" + rs2.getString("dcMontoTotal") + "\",";
                    json = json + "\"fecha\":\"" + rs2.getDate("dFecha_Emision") + "\",";
                    json = json + "\"estado\":\"" + rs2.getString("iEstado") + "\"";
                    json = json + "}";
                    rc = true;
                }
                json = json + "\n]\n";
                json = json + "}";
                System.out.println(json);
                response.getWriter().write(json.trim());
                
            } catch (SQLException var23) {
                System.out.println(var23.getMessage());
                Logger.getLogger(ListaCatalogoComercialTbl.class.getName()).log(Level.SEVERE, (String) null, var23);
            } finally {
                try { if (rs1 != null) rs1.close(); } catch (SQLException e) { e.printStackTrace(); }
                try { if (ps1 != null) ps1.close(); } catch (SQLException e) { e.printStackTrace(); }
                try { if (rs2 != null) rs2.close(); } catch (SQLException e) { e.printStackTrace(); }
                try { if (ps2 != null) ps2.close(); } catch (SQLException e) { e.printStackTrace(); }
                try { if (conexion != null) conexion.close(); } catch (SQLException e) { e.printStackTrace(); }
                if (newCon != null) newCon.getClose();
                
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
