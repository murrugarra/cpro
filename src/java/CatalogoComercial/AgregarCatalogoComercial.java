/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package CatalogoComercial;

import Conexion.Conexion;
import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
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
@WebServlet(name = "AgregarCatalogoComercial", urlPatterns = {"/AgregarCatalogoComercial"})
public class AgregarCatalogoComercial extends HttpServlet {

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
            out.println("<title>Servlet AgregarCatalogoComercial</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet AgregarCatalogoComercial at " + request.getContextPath() + "</h1>");
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
            String respta = "erNo hemos podido realizar el Registro.";

            try {
                // Obtener conexión (esto depende de cómo manejes las conexiones en tu aplicación)
                Conexion newCon = new Conexion(); // Asumiendo que tienes una clase Conexion para manejar conexiones
                conexion = newCon.getConnection(); // Método para obtener una conexión
                if (conexion == null) {
                    throw new SQLException("erNo se pudo obtener la conexión.");
                }

                int grupo = Integer.parseInt(request.getParameter("Grupo").trim());
                int Clase = Integer.parseInt(request.getParameter("Clase").trim());
                int SubClase = Integer.parseInt(request.getParameter("SubClase").trim());
                String vNombre = request.getParameter("vNombre").trim();
                int UMedida = Integer.parseInt(request.getParameter("UMedida").trim());
                Date dFechaIngreso = (!request.getParameter("dFechaIngreso").equals(""))? Date.valueOf(request.getParameter("dFechaIngreso")): null;
                 // Recibir el parámetro del precio desde la solicitud (request)
                String vprecio = request.getParameter("monto").trim(); // Obtener y limpiar el valor recibido
                String vprecioPref = request.getParameter("montoPref").trim(); // Obtener y limpiar el valor recibido
                String conPrecio = request.getParameter("conPrecio").trim();

                // Validar que el parámetro no esté vacío
                if (vprecio.isEmpty()) {
                    // Manejo de caso vacío (opcional)
                    // Puedes lanzar una excepción, mostrar un mensaje de error, etc.
                    System.out.println("El precio no puede estar vacío");
                    response.setCharacterEncoding("UTF-8");
                    response.setStatus(HttpServletResponse.SC_OK); // Siempre 200 OK
                    response.getWriter().write("erEl precio no puede estar vacío");
                    return; // O cualquier manejo de error que desees implementar
                }
                if (vprecioPref.isEmpty()) {
                    // Manejo de caso vacío (opcional)
                    // Puedes lanzar una excepción, mostrar un mensaje de error, etc.
                    System.out.println("El precio preferencial no puede estar vacío");
                    response.setCharacterEncoding("UTF-8");
                    response.setStatus(HttpServletResponse.SC_OK); // Siempre 200 OK
                    response.getWriter().write("erEl precio no puede estar vacío");
                    return; // O cualquier manejo de error que desees implementar
                }

                // Convertir el valor recibido a BigDecimal
                BigDecimal montoPago;
                try {
                    montoPago = new BigDecimal(vprecio);
                } catch (NumberFormatException e) {
                    // Manejo de error si el valor no es un número válido
                    System.out.println("El precio ingresado no es válido");
                    response.setCharacterEncoding("UTF-8");
                    response.setStatus(HttpServletResponse.SC_OK); // Siempre 200 OK
                    response.getWriter().write("erEl precio ingresado no es válido");
                    e.printStackTrace(); // Otra forma de manejo de error, como lanzar una excepción
                    return;
                }
                // Convertir el valor recibido a BigDecimal
                BigDecimal montoPagoPrefer;
                try {
                    montoPagoPrefer = new BigDecimal(vprecioPref);
                } catch (NumberFormatException e) {
                    // Manejo de error si el valor no es un número válido
                    System.out.println("El precio preferencial ingresado no es válido");
                    response.setCharacterEncoding("UTF-8");
                    response.setStatus(HttpServletResponse.SC_OK); // Siempre 200 OK
                    response.getWriter().write("erEl precio preferencial ingresado no es válido");
                    e.printStackTrace(); // Otra forma de manejo de error, como lanzar una excepción
                    return;
                }
                
                String iPersonaRegistra = sesion.getAttribute("usuario").toString();

                cs = conexion.prepareCall("{CALL sp_CatalogoComercial_Insert(?,?,?,?,?,?,?,?,?,?,?)}");
                cs.setInt(1, grupo);
                cs.setInt(2, Clase);
                cs.setInt(3, SubClase);
                cs.setString(4, vNombre);
                cs.setInt(5, UMedida);
                cs.setString(6, iPersonaRegistra);
                cs.setDate(7, dFechaIngreso);
                cs.setBigDecimal(8, montoPago);
                cs.setBigDecimal(9, montoPagoPrefer);
                cs.setString(10, conPrecio);
                cs.registerOutParameter(11, java.sql.Types.VARCHAR); 

                cs.execute();
                respta = cs.getString(11);

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
