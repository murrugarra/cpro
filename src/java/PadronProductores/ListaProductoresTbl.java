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

/**
 *
 * @author Usuario
 */
@WebServlet(name = "ListaProductoresTbl", urlPatterns = {"/ListaProductoresTbl"})
public class ListaProductoresTbl extends HttpServlet {

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
            out.println("<title>Servlet ListaProductoresTbl</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet ListaProductoresTbl at " + request.getContextPath() + "</h1>");
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
        response.setHeader("Cache-Control","no-cache");
        response.setHeader("Cache-Control","no-store");
        response.setHeader("Pragma","no-cache");
        response.setDateHeader ("Expires", 0);
        HttpSession sesion = request.getSession();
        if(sesion.getAttribute("usuario") == null){
          response.sendRedirect("CerrarSesion");
        }else{
            PreparedStatement ps1 = null;
            PreparedStatement ps2 = null;
            ResultSet rs1 = null;
            ResultSet rs2 = null;
            try {
                String pagina = request.getParameter("page");
                String rows = request.getParameter("rows");
                Conexion newCon = new Conexion();
                Connection conexion = newCon.getConnection();
                String productor = request.getParameter("productor");;
                String docuemnto = request.getParameter("docuemnto");
                String vEstado = request.getParameter("vEstado");
                String vTipo = request.getParameter("vTipo");
                //String iReportePadronProductores = request.getParameter("iReportePadronProductores");
                String filtrar = "";

                if (null == vEstado) {
                    filtrar = filtrar + " where iEstado=1 ";
                } else switch (vEstado) {
                    case "0":
                        filtrar = filtrar + " where iEstado=0 ";
                        break;
                    default:
                        filtrar = filtrar + " where iEstado=1 ";
                        break;
                }

                if (pagina == null && pagina.equals("")) {
                    pagina = "1";
                }

                if (rows == null && rows.equals("")) {
                    rows = "20";
                }
               /* if(iReportePadronProductores != null){
                    if (nombre != null && !nombre.equals("")) {
                        filtrar = filtrar + " and vNombres LIKE '%" + nombre + "%'";
                    }

                    if (apeP != null && !apeP.equals("")) {
                        filtrar = filtrar + " or vApePaterno LIKE '%" + apeP + "%'";
                    }

                    if (apeM != null && !apeM.equals("")) {
                        filtrar = filtrar + " or vApeMaterno LIKE '%" + apeM + "%'";
                    }
                }else{
                    
                    if (nombre != null && !nombre.equals("")) {
                        filtrar = filtrar + " and vNombres LIKE '%" + nombre + "%'";
                    }

                    if (apeP != null && !apeP.equals("")) {
                        filtrar = filtrar + " and vApePaterno LIKE '%" + apeP + "%'";
                    }

                    if (apeM != null && !apeM.equals("")) {
                        filtrar = filtrar + " and vApeMaterno LIKE '%" + apeM + "%'";
                    }
                }*/
               
               
                if (productor != null && !productor.equals("")) {
                    filtrar = filtrar + " and nomb_productor like '%" + docuemnto + "%'";
                }

                if (docuemnto != null && !docuemnto.equals("")) {
                    filtrar = filtrar + " and (iDni like '%" + docuemnto + "%' or iRuc like '%" + docuemnto + "%') ";
                }

                if (vTipo != null && vTipo.equals("-1")) {
                    filtrar = filtrar + " and iTipoProductor >= 0 ";
                } else if (vTipo != null) {
                    filtrar = filtrar + " and iTipoProductor = '" + vTipo + "'";
                }

                

                int offset = (Integer.parseInt(pagina) - 1) * Integer.parseInt(rows);
                int totalRecords = 0;
                String sql1 = "select count(*) as tam from Productores " + filtrar + "";

                ps1 = conexion.prepareStatement(sql1);
                rs1 = ps1.executeQuery();

                if (rs1.next()) {
                    totalRecords = rs1.getInt("tam");
                }

                String sql2 = "WITH proyectos AS ( SELECT ROW_NUMBER() OVER( ORDER BY nomb_productor asc ) as Row,"
                        + " * from view_Productores " + filtrar + " )"
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
                    json = json + "\"codProductores\":\"" + rs2.getString("iIdProductores") + "\",";
                    json = json + "\"ApePaterno\":\"" + (rs2.getString("vApePaterno") == null ? " " : new String(rs2.getString("vApePaterno").getBytes("UTF-8"), "ISO-8859-1")) + "\",";
                    json = json + "\"ApeMaterno\":\"" + (rs2.getString("vApeMaterno") == null ? " " : new String(rs2.getString("vApeMaterno").getBytes("UTF-8"), "ISO-8859-1")) + "\",";
                    json = json + "\"Nombres\":\"" + (rs2.getString("vNombres") == null? " " : new String(rs2.getString("vNombres").getBytes("UTF-8"), "ISO-8859-1")) + "\",";
                    json = json + "\"Dni\":\"" + ((rs2.getString("iDni") == null) ? "" : rs2.getString("iDni")) + "\",";
                    json = json + "\"RazonSocial\":\"" + ((rs2.getString("vRazonSocial") == null || rs2.getString("vRazonSocial").isEmpty()) ? "" : new String(rs2.getString("vRazonSocial").getBytes("UTF-8"), "ISO-8859-1")) + "\",";
                    json = json + "\"Ruc\":\"" + ((rs2.getString("iRuc") == null) ? "" : rs2.getString("iRuc")) + "\",";
                    json = json + "\"Celular\":\"" + ((rs2.getString("iCelular") == null) ? "" : rs2.getString("iCelular")) + "\",";
                    json = json + "\"Direccion\":\"" + ((rs2.getString("vDireccion") == null || rs2.getString("vDireccion").isEmpty()) ? "" : new String(rs2.getString("vDireccion").getBytes("UTF-8"), "ISO-8859-1")) + "\",";
                    json = json + "\"Correo\":\"" + rs2.getString("vCorreo") + "\",";
                    json = json + "\"FechaIngreso\":\"" + rs2.getString("dFechaIngreso") + "\",";
                    json = json + "\"Estado\":\"" + rs2.getString("iEstado") + "\",";
                    json = json + "\"nomProductor\":\"" + new String(rs2.getString("nomb_productor").getBytes("UTF-8"), "ISO-8859-1") + "\",";
                    json = json + "\"TipoProductor\":\"" + rs2.getString("iTipoProductor") + "\"";
                   /* if(iReportePadronProductores!=null){
                        json = json + ",\"NombresCompletos\":\"" + new String(rs2.getString("vNombres").getBytes("UTF-8"), "ISO-8859-1") +" "+new String(rs2.getString("vApePaterno").getBytes("UTF-8"), "ISO-8859-1")+ " "+new String(rs2.getString("vApeMaterno").getBytes("UTF-8"), "ISO-8859-1")+ "\"";
                    }*/
                    json = json + "}";
                    rc = true;
                }
                json = json + "\n]\n";
                json = json + "}";
                System.out.println(json);
                ps1.close();
                ps2.close();
                rs1.close();
                rs2.close();
                newCon.getClose();
                response.getWriter().write(json.trim());
            } catch (SQLException var23) {
                System.out.println(var23.getMessage());
                Logger.getLogger(ListaProductoresTbl.class.getName()).log(Level.SEVERE, (String) null, var23);
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
