/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package CatalogoComercial;

import Conexion.Conexion;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.sql.Connection;
import java.util.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
@WebServlet(name = "ListaCatalogoComercialTbl", urlPatterns = {"/ListaCatalogoComercialTbl"})
public class ListaCatalogoComercialTbl extends HttpServlet {

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
            out.println("<title>Servlet ListaCatalogoComercialTbl</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet ListaCatalogoComercialTbl at " + request.getContextPath() + "</h1>");
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
    response.setHeader("Cache-Control", "no-cache");
    response.setHeader("Cache-Control", "no-store");
    response.setHeader("Pragma", "no-cache");
    response.setDateHeader("Expires", 0);
    
    HttpSession sesion = request.getSession();
    if (sesion.getAttribute("usuario") == null) {
        response.sendRedirect("CerrarSesion");
    } else {
        PreparedStatement ps1 = null, ps2 = null;
        ResultSet rs1 = null, rs2 = null;
        Conexion newCon = null;
        Connection conexion = null;
        try {
            newCon = new Conexion();
            conexion = newCon.getConnection();
            String pagina = request.getParameter("page");
            String rows = request.getParameter("rows");
            String nombre = request.getParameter("nombre");
            String vEstado = request.getParameter("vEstado");
            
            String filtrar = (vEstado == null) ? " where iEstado=1 " : " where iEstado=" + vEstado;

                if (nombre != null && !nombre.equals("")) {
                    filtrar = filtrar + " and vNombre like '%" + nombre + "%' ";
                }
                
            int offset = (Integer.parseInt(pagina) - 1) * Integer.parseInt(rows);
            int totalRecords = 0;

            String sql1 = "select count(*) as tam from viewListaElementosCatalogo " + filtrar;
            ps1 = conexion.prepareStatement(sql1);
            rs1 = ps1.executeQuery();

            if (rs1.next()) {
                totalRecords = rs1.getInt("tam");
            }

            String sql2 = "WITH proyectos AS ( SELECT ROW_NUMBER() OVER( ORDER BY GrupoNombre,ClaseNombre,SubClaseNombre,vNombre asc ) as Row,"
                    + " * from viewListaElementosCatalogo " + filtrar + " )"
                    + "SELECT TOP " + rows + " * FROM proyectos WHERE Row > " + offset;
            System.out.println(sql2);
            ps2 = conexion.prepareStatement(sql2);
            rs2 = ps2.executeQuery();

            List<Elemento> elementos = new ArrayList<>();
            while (rs2.next()) {
                Elemento elemento = new Elemento();
                elemento.setCodElemento(rs2.getString("iIdItem"));
                elemento.setCodGrupo(rs2.getString("iIdGrupo"));
                elemento.setCodClase(rs2.getString("iIdClase"));
                elemento.setCodSubClase(rs2.getString("iIdSubClase"));
                elemento.setCodUM(rs2.getString("iIdUnidadMedida"));
                elemento.setNombreGrupo(rs2.getString("GrupoNombre"));
                elemento.setNombreClase(rs2.getString("ClaseNombre"));
                elemento.setNombreSubClase(rs2.getString("SubClaseNombre"));
                elemento.setNombre(rs2.getString("vNombre"));
                elemento.setNombreUM(rs2.getString("vAbreviaturaUM"));
                elemento.setPrecio(rs2.getBigDecimal("Precio"));
                elemento.setPrecioPref(rs2.getBigDecimal("PrecioPref"));
                elemento.setFechaPrecio(rs2.getDate("dPrecioFecha"));
                elemento.setEstado(rs2.getString("iEstado"));
                elemento.setConPrecio(rs2.getString("cPrecio"));
                elementos.add(elemento);
            }

            // Crear el objeto final para serializar
            Map<String, Object> responseMap = new HashMap<>();
            responseMap.put("total", totalRecords);
            responseMap.put("rows", elementos);

            // Convertir el objeto a JSON usando Gson
            Gson gson = new Gson();
            String json = gson.toJson(responseMap);

            // Enviar la respuesta JSON
            response.setContentType("application/json");
            response.getWriter().write(json.trim());

        } catch (SQLException var23) {
            System.out.println(var23.getMessage());
            Logger.getLogger(ListaCatalogoComercialTbl.class.getName()).log(Level.SEVERE, null, var23);
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

    /*
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
                    filtrar = filtrar + " and vNombre like '%" + nombre + "%'";
                }

            
                int offset = (Integer.parseInt(pagina) - 1) * Integer.parseInt(rows);
                int totalRecords = 0;
                String sql1 = "select count(*) as tam from viewListaElementosCatalogo " + filtrar + "";

                ps1 = conexion.prepareStatement(sql1);
                rs1 = ps1.executeQuery();

                if (rs1.next()) {
                    totalRecords = rs1.getInt("tam");
                }

                String sql2 = "WITH proyectos AS ( SELECT ROW_NUMBER() OVER( ORDER BY GrupoNombre,ClaseNombre,SubClaseNombre,vNombre asc ) as Row,"
                        + " * from viewListaElementosCatalogo " + filtrar + " )"
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
                    json = json + "\"codElemento\":\"" + rs2.getString("iIdItem") + "\",";
                    json = json + "\"codGrupo\":\"" + rs2.getString("iIdGrupo") + "\",";
                    json = json + "\"codClase\":\"" + rs2.getString("iIdClase") + "\",";
                    json = json + "\"codSubClase\":\"" + rs2.getString("iIdSubClase") + "\",";
                    json = json + "\"codUM\":\"" + rs2.getString("iIdUnidadMedida") + "\",";
                    json = json + "\"nombreGrupo\":\"" + new String(rs2.getString("GrupoNombre").getBytes("UTF-8"), "ISO-8859-1") + "\",";
                    json = json + "\"nombreClase\":\"" + new String(rs2.getString("ClaseNombre").getBytes("UTF-8"), "ISO-8859-1") + "\",";
                    json = json + "\"nombreSubClase\":\"" + new String(rs2.getString("SubClaseNombre").getBytes("UTF-8"), "ISO-8859-1") + "\",";
                    json = json + "\"nombre\":\"" + new String(rs2.getString("vNombre").getBytes("UTF-8"), "ISO-8859-1") + "\",";
                    json = json + "\"nombreUM\":\"" + new String(rs2.getString("vAbreviaturaUM").getBytes("UTF-8"), "ISO-8859-1") + "\",";
                    json = json + "\"precio\":\"" + rs2.getBigDecimal("Precio") + "\",";
                    json = json + "\"precioPref\":\"" + rs2.getBigDecimal("PrecioPref") + "\",";
                    json = json + "\"fechaPrecio\":\"" + rs2.getDate("dPrecioFecha") + "\",";
                    json = json + "\"Estado\":\"" + rs2.getString("iEstado") + "\",";
                    json = json + "\"conPrecio\":\"" + rs2.getString("cPrecio") + "\"";
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
*/
    // Método para obtener el total de registros de la consulta
    private int getTotalRecords(ResultSet rs) throws SQLException {
        rs.last();
        int total = rs.getRow();
        rs.beforeFirst();
        return total;
    }
public class Elemento {
    private String codElemento;
    private String codGrupo;
    private String codClase;
    private String codSubClase;
    private String codUM;
    private String nombreGrupo;
    private String nombreClase;
    private String nombreSubClase;
    private String nombre;
    private String nombreUM;
    private BigDecimal precio;
    private BigDecimal precioPref;
    private Date fechaPrecio;
    private String estado;
    private String conPrecio;

    // Getters y Setters

        public String getCodElemento() {
            return codElemento;
        }

        public void setCodElemento(String codElemento) {
            this.codElemento = codElemento;
        }

        public String getCodGrupo() {
            return codGrupo;
        }

        public void setCodGrupo(String codGrupo) {
            this.codGrupo = codGrupo;
        }

        public String getCodClase() {
            return codClase;
        }

        public void setCodClase(String codClase) {
            this.codClase = codClase;
        }

        public String getCodSubClase() {
            return codSubClase;
        }

        public void setCodSubClase(String codSubClase) {
            this.codSubClase = codSubClase;
        }

        public String getCodUM() {
            return codUM;
        }

        public void setCodUM(String codUM) {
            this.codUM = codUM;
        }

        public String getNombreGrupo() {
            return nombreGrupo;
        }

        public void setNombreGrupo(String nombreGrupo) {
            this.nombreGrupo = nombreGrupo;
        }

        public String getNombreClase() {
            return nombreClase;
        }

        public void setNombreClase(String nombreClase) {
            this.nombreClase = nombreClase;
        }

        public String getNombreSubClase() {
            return nombreSubClase;
        }

        public void setNombreSubClase(String nombreSubClase) {
            this.nombreSubClase = nombreSubClase;
        }

        public String getNombre() {
            return nombre;
        }

        public void setNombre(String nombre) {
            this.nombre = nombre;
        }

        public String getNombreUM() {
            return nombreUM;
        }

        public void setNombreUM(String nombreUM) {
            this.nombreUM = nombreUM;
        }

        public BigDecimal getPrecio() {
            return precio;
        }

        public void setPrecio(BigDecimal precio) {
            this.precio = precio;
        }

        public BigDecimal getPrecioPref() {
            return precioPref;
        }

        public void setPrecioPref(BigDecimal precioPref) {
            this.precioPref = precioPref;
        }

        public Date getFechaPrecio() {
            return fechaPrecio;
        }

        public void setFechaPrecio(Date fechaPrecio) {
            this.fechaPrecio = fechaPrecio;
        }

        public String getEstado() {
            return estado;
        }

        public void setEstado(String estado) {
            this.estado = estado;
        }

        public String getConPrecio() {
            return conPrecio;
        }

        public void setConPrecio(String conPrecio) {
            this.conPrecio = conPrecio;
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
