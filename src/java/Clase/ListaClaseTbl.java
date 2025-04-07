/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Clase;

import Conexion.Conexion;
import PadronProductores.ListaProductoresTbl;
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
@WebServlet(name = "ListaClaseTbl", urlPatterns = {"/ListaClaseTbl"})
public class ListaClaseTbl extends HttpServlet {

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
            out.println("<title>Servlet ListaClaseTbl</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet ListaClaseTbl at " + request.getContextPath() + "</h1>");
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
                String nombre = request.getParameter("nombre");
                String vEstado = request.getParameter("vEstado");
                
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
               
               
                if (nombre != null && !nombre.equals("")) {
                    filtrar = filtrar + " and vNombreClase like '%" + nombre + "%'";
                }


                

                int offset = (Integer.parseInt(pagina) - 1) * Integer.parseInt(rows);
                int totalRecords = 0;
                String sql1 = "select count(*) as tam from Clase " + filtrar + "";

                ps1 = conexion.prepareStatement(sql1);
                rs1 = ps1.executeQuery();

                if (rs1.next()) {
                    totalRecords = rs1.getInt("tam");
                }

                String sql2 = "WITH proyectos AS ( SELECT ROW_NUMBER() OVER( ORDER BY vNombreGrupo,vNombreClase asc ) as Row,"
                        + " * from view_Clase " + filtrar + " )"
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
                    json = json + "\"codGrupo\":\"" + rs2.getString("iIdGrupo") + "\",";
                    json = json + "\"codClase\":\"" + rs2.getString("iIdClase") + "\",";
                    json = json + "\"nombreGrupo\":\"" + new String(rs2.getString("vNombreGrupo").getBytes("UTF-8"), "ISO-8859-1") + "\",";
                    json = json + "\"nombre\":\"" + new String(rs2.getString("vNombreClase").getBytes("UTF-8"), "ISO-8859-1") + "\",";
                    json = json + "\"Estado\":\"" + rs2.getString("iEstado") + "\"";
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
                Logger.getLogger(ListaClaseTbl.class.getName()).log(Level.SEVERE, (String) null, var23);
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
