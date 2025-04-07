/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Habilitaciones;

import Conexion.Conexion;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.math.BigDecimal;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Usuario
 */
@WebServlet(name = "AgregarHabilitacionPredio", urlPatterns = {"/AgregarHabilitacionPredio"})
public class AgregarHabilitacionPredio extends HttpServlet {
private static final long serialVersionUID = 1L;
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
            out.println("<title>Servlet AgregarHabilitacionPredio</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet AgregarHabilitacionPredio at " + request.getContextPath() + "</h1>");
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
            String respta = "erNo hemos podido realizar el Registro.";

            BufferedReader reader = request.getReader();
            Gson gson = new Gson();
            JsonObject jsonData = gson.fromJson(reader, JsonObject.class);

            // Obtener los datos del JSON
            String dataGridJson = jsonData.getAsJsonArray("dataGrid").toString();
            BigDecimal dcPrecioVentaD = jsonData.getAsJsonObject("footer").get("dcPrecioVentaD").getAsBigDecimal();
            BigDecimal dcImpuestoD = jsonData.getAsJsonObject("footer").get("dcImpuestoD").getAsBigDecimal();
            BigDecimal dcImporteD = jsonData.getAsJsonObject("footer").get("dcImporteD").getAsBigDecimal();
            BigDecimal dcPrecioVentaS = jsonData.getAsJsonObject("footer").get("dcPrecioVenta").getAsBigDecimal();
            BigDecimal dcImpuestoS = jsonData.getAsJsonObject("footer").get("dcImpuesto").getAsBigDecimal();
            BigDecimal dcImporteS = jsonData.getAsJsonObject("footer").get("dcImporte").getAsBigDecimal();
            int codPredio = Integer.parseInt(jsonData.get("codPredio").getAsString());
            int codCampania = Integer.parseInt(jsonData.get("codCampania").getAsString());
            int cultivo = Integer.parseInt(jsonData.get("cultivo").getAsString());
            int codTipoDoc = Integer.parseInt(jsonData.get("codTipoDoc").getAsString());
            String moneda = jsonData.get("moneda").getAsString();
            String fechaEmision = jsonData.get("fechaEmision").getAsString();
            BigDecimal tcVenta = new BigDecimal(jsonData.get("tcVenta").getAsString());
            BigDecimal tcCompra = new BigDecimal(jsonData.get("tcCompra").getAsString());
            BigDecimal interes = new BigDecimal(jsonData.get("interes").getAsString());
            int codEmpresa = Integer.parseInt(jsonData.get("codEmpresa").getAsString());
            String Glosa = jsonData.get("Glosa").getAsString();
            String NroComprobante = jsonData.get("NroComprobante").getAsString();
            String Ruc = jsonData.get("Ruc").getAsString();
            float areaInst = Float.parseFloat(jsonData.get("areaInst").getAsString());
            String UserReg = sesion.getAttribute("usuario").toString();
            
            System.out.println("codPredio: "+codPredio);
            System.out.println("codCampania: "+codCampania);
            System.out.println("cultivo: "+cultivo);
            System.out.println("codTipoDoc: "+codTipoDoc);
            System.out.println("moneda: "+moneda);
            System.out.println("fechaEmision: "+fechaEmision);
            System.out.println("tcVenta: "+tcVenta);
            System.out.println("tcCompra: "+tcCompra);
            System.out.println("interes: "+interes);
            System.out.println("codEmpresa: "+codEmpresa);
            System.out.println("Glosa: "+Glosa);
            System.out.println("NroComprobante: "+NroComprobante);
            System.out.println("Ruc: "+Ruc);
            System.out.println("dcPrecioVentaD: "+dcPrecioVentaD);
            System.out.println("dcImpuestoD: "+dcImpuestoD);
            System.out.println("dcImporteD: "+dcImporteD);
            System.out.println(dataGridJson);

            Connection conexion = null;
            CallableStatement cs = null;
            try {// Obtener conexión (esto depende de cómo manejes las conexiones en tu aplicación)
            Conexion newCon = new Conexion(); // Asumiendo que tienes una clase Conexion para manejar conexiones
            conexion = newCon.getConnection(); // Método para obtener una conexión
             if (conexion == null) {
                throw new SQLException("erNo se pudo obtener la conexión.");
            }
                String sql = "{call sp_HabilitacionPredio_Insert(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}"; 
                cs = conexion.prepareCall(sql);
                cs.setString(1, dataGridJson);
                cs.setBigDecimal(2, dcPrecioVentaD);
                cs.setBigDecimal(3, dcImpuestoD);
                cs.setBigDecimal(4, dcImporteD);
                cs.setBigDecimal(5, dcPrecioVentaS);
                cs.setBigDecimal(6, dcImpuestoS);
                cs.setBigDecimal(7, dcImporteS);
                cs.setInt(8, codPredio);
                cs.setInt(9, codCampania);
                cs.setInt(10, cultivo);
                cs.setInt(11, codTipoDoc);
                cs.setString(12, moneda);
                cs.setString(13, fechaEmision);
                cs.setBigDecimal(14, tcVenta);
                cs.setBigDecimal(15, tcCompra);
                cs.setBigDecimal(16, interes);
                cs.setInt(17, codEmpresa);
                cs.setString(18, Glosa);
                cs.setString(19, NroComprobante);
                cs.setString(20, Ruc);
                cs.setFloat(21, areaInst);
                cs.setString(22, UserReg);
                cs.registerOutParameter(23, java.sql.Types.VARCHAR); 
                cs.execute();

                respta = cs.getString(23);
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
