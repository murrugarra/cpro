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
@WebServlet(name = "treeMenuGlobal", urlPatterns = {"/treeMenuGlobal"})
public class treeMenuGlobal extends HttpServlet {

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
            out.println("<title>Servlet treeMenuGlobal</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet treeMenuGlobal at " + request.getContextPath() + "</h1>");
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
    HttpSession session = request.getSession(true);
    String usuario = session.getAttribute("usuario")+"";
    String json = (String) session.getAttribute("menuJson");

    if (json == null) {
        Conexion newCon = new Conexion();
        try {
            Connection conexion = newCon.getConnection();
            String consulta = "select distinct '[' + STUFF((select ',{\"id\":\"' + CAST(m.idMenu AS VARCHAR(30))+'-'+ ISNULL(url,'#')+ '\"'+ ',\"name\":\"' + vNombre + '\"' + dbo.fn_Hijos_MenuGlobal(ISNULL(m.idMenuPadre,m.idMenu+'10902')) +'}' from dbo.MenuSys m inner join dbo.PermisoSys p on m.idMenu=p.idMenu where m.estado = 1 and p.iDni=" + usuario + " order by m.idMenu asc for xml path(''), type).value('.', 'varchar(max)'), 1, 1, '') + ']'";
            PreparedStatement stmt = conexion.prepareStatement(consulta);

            ResultSet rs;
            for (rs = stmt.executeQuery(); rs.next(); json = rs.getString(1)) {}

            stmt.close();
            rs.close();
            conexion.close();
            newCon.getClose();
            // Almacenar el JSON del menú en la sesión
            session.setAttribute("menuJson", json);
        } catch (SQLException var11) {
            Logger.getLogger(treeMenuGlobal.class.getName()).log(Level.SEVERE, (String)null, var11);
        }
    }

    response.setContentType("application/json");
    response.setHeader("Cache-Control", "no-store");
    response.getWriter().write(json);
}

   /* protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
       // String id = request.getParameter("id");
      HttpSession session = request.getSession(true);
      String usuario = session.getAttribute("usuario")+"";
      String json = "";

            Conexion newCon = new Conexion();
      try {
          Connection conexion = newCon.getConnection();
          System.out.println("ola2");
        String consulta = "select  distinct '[' + STUFF((\n" +
"        select \n" +
"            ',{\"id\":\"' + CAST(  m.idMenu AS VARCHAR(30))+'-'+ ISNULL(url,'#')+ '\"'\n" +
"            + ',\"name\":\"' + vNombre + '\"'\n" +
"			+ dbo.fn_Hijos_MenuGlobal(ISNULL(m.idMenuPadre,m.idMenu+'10902'))  \n" +
"            +'}'\n" +
"\n" +
"         from dbo.MenuSys m inner join dbo.PermisoSys p on m.idMenu=p.idMenu where m.estado = 1 and p.iDni="+ usuario +" order by m.idMenu asc\n" +
"        for xml path(''), type\n" +
"    ).value('.', 'varchar(max)'), 1, 1, '') + ']'";
         System.out.println(consulta);
         PreparedStatement stmt = conexion.prepareStatement(consulta);

         ResultSet rs;
         for(rs = stmt.executeQuery(); rs.next(); json = rs.getString(1)) {
         }

         stmt.close();
         rs.close();
         conexion.close();
         response.setContentType("application/json");
         response.setHeader("Cache-Control", "no-store");
         response.getWriter().write(json);
         System.out.println("Menu Ok");
      } catch (SQLException var11) {
         Logger.getLogger(treeMenuGlobal.class.getName()).log(Level.SEVERE, (String)null, var11);
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
