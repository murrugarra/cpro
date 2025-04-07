/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Login;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Equipo
 */
@WebServlet(name = "ObtenerDatosSesion", urlPatterns = {"/ObtenerDatosSesion"})
public class ObtenerDatosSesion extends HttpServlet {

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
            out.println("<title>Servlet ObtenerDatosSesion</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet ObtenerDatosSesion at " + request.getContextPath() + "</h1>");
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
        // Configuración de los encabezados para evitar caché
        response.setHeader("Cache-Control", "no-store");
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        HttpSession sesion = request.getSession();

        // Validar si hay un usuario en sesión
        if (sesion.getAttribute("usuario") == null) {
            response.sendRedirect("CerrarSesion");
        } else {
            // Construcción del JSON como cadena
            String json = "[\n"; // Iniciar como un array en JSON

            json += "  {\n";
            json += "    \"usuario\": " + sesion.getAttribute("usuario") + ",\n";
            json += "    \"correo\": \"" + sesion.getAttribute("correo") + "\",\n";
            json += "    \"telefono\": \"" + sesion.getAttribute("telefono") + "\",\n";
            json += "    \"idRol\": " + sesion.getAttribute("idRol") + ",\n";
            json += "    \"nombres\": \"" + sesion.getAttribute("nombres") + "\",\n";
            json += "    \"apePaterno\": \"" + sesion.getAttribute("apePaterno") + "\",\n";
            json += "    \"apeMaterno\": \"" + sesion.getAttribute("apeMaterno") + "\",\n";
            json += "    \"fechaNacimiento\": \"" + sesion.getAttribute("fechaNacimiento") + "\",\n";
            json += "    \"sexo\": \"" + sesion.getAttribute("sexo") + "\",\n";
            json += "    \"direccion\": \"" + sesion.getAttribute("direccion") + "\"\n";
            json += "  }\n";

            json += "]\n"; // Cerrar el array JSON

            // Enviar la respuesta al cliente
            response.getWriter().write(json.trim());
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
