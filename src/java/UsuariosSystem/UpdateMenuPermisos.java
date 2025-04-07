/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package UsuariosSystem;

import Conexion.Conexion;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
/**
 *
 * @author user 1
 */
@WebServlet(name = "UpdateMenuPermisos", urlPatterns = {"/UpdateMenuPermisos"})
public class UpdateMenuPermisos extends HttpServlet {

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
            out.println("<title>Servlet UpdateMenuPermisos</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet UpdateMenuPermisos at " + request.getContextPath() + "</h1>");
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
            int band = 0;
            String iPersonaRegistra = sesion.getAttribute("usuario").toString();
            // Obtener y procesar el JSON como lo haces actualmente
            List<Map<String, Object>> permissions = processJsonFromRequest(request);
            String msj = "avNo Fue Posible Registrar los Permisos para el Dni, Enviado.";
            // Establecer la conexión JDBC usando la conexión existente
            Connection conn = null;
            try {
                Conexion newCon = new Conexion();
                conn = newCon.getConnection();// Obtener la conexión de la clase Conexion

                // Llamar al procedimiento almacenado
                CallableStatement stmt = conn.prepareCall("{call sp_UpdateMenuPermisos(?, ?, ?, ?, ?, ?, ?, ?,?)}");

                for (Map<String, Object> permission : permissions) {
                   msj = "okPermisos actualizados exitosamente.";
                    boolean modify = (boolean) permission.get("modify");
                    boolean create = (boolean) permission.get("create");
                    boolean delete = (boolean) permission.get("delete");
                    boolean checked = (boolean) permission.get("checked");
                    String type = (String) permission.get("type");
                 //   int dni = (int) permission.get("dni");                
                    double codMenuDouble = Double.parseDouble(permission.get("codMenu").toString());
                    int codMenu = (int) codMenuDouble;

                    double dniDouble = Double.parseDouble(permission.get("dni").toString());
                    int dni = (int) dniDouble;
                    int modificar = modify ? 1 : 0;
                    int crear = create ? 1 : 0; 
                    int eliminar = delete ? 1 : 0;

                    // Configurar los parámetros del procedimiento almacenado
                    stmt.setInt(1, codMenu);
                    stmt.setInt(2, modificar);
                    stmt.setInt(3, crear);
                    stmt.setInt(4, eliminar);
                    stmt.setBoolean(5, checked);
                    stmt.setInt(6, dni);
                    stmt.setString(7, iPersonaRegistra);
                    stmt.setString(8, type);
                    stmt.registerOutParameter(9, java.sql.Types.INTEGER); 

                    // Ejecutar el procedimiento almacenado
                    stmt.execute();
                    band = stmt.getInt(9);
                    if(band==1)
                    {
                        msj = "avNo Fue Posible Registrar los Permisos para el Dni, Enviado.";
                        break;
                    }
                }

                // Responder al cliente
                response.setCharacterEncoding("UTF-8");
                response.setStatus(HttpServletResponse.SC_OK); // Siempre 200 OK
                response.getWriter().write(msj);
            } catch (SQLException e) {
                // Manejar excepciones SQL
                e.printStackTrace();
                response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            }
            finally {
                // Cerrar la conexión
                if (conn != null) {
                    try {
                        conn.close();
                    } catch (SQLException e) {
                        e.printStackTrace();
                    }
                }
            }
        }    
    }

    // Método para procesar el JSON recibido en la solicitud y convertirlo a una lista de permisos
    private List<Map<String, Object>> processJsonFromRequest(HttpServletRequest request) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(request.getInputStream()));
        StringBuilder jsonBuilder = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            jsonBuilder.append(line);
        }
        String json = jsonBuilder.toString();
        System.out.println(json);
        // Convertir JSON a una lista de permisos usando Gson
        Gson gson = new Gson();
        Type listType = new TypeToken<List<Map<String, Object>>>() {}.getType();
        List<Map<String, Object>> permissions = gson.fromJson(json, listType);

        return permissions;
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
