/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Dashboard;

import Conexion.Conexion;
import java.io.IOException;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servlet para obtener datos de habilitaciones en formato JSON para gráficos.
 * 
 * @author Equipo
 */
@WebServlet(name = "ObtenerHabilitacionesChart", urlPatterns = {"/ObtenerHabilitacionesChart"})
public class ObtenerHabilitacionesChart extends HttpServlet {

    /**
     * Maneja el método HTTP <code>POST</code>.
     *
     * @param request  solicitud HTTP
     * @param response respuesta HTTP
     * @throws ServletException si ocurre un error específico del servlet
     * @throws IOException      si ocurre un error de E/S
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Deshabilitar caché en el navegador
        response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
        response.setHeader("Pragma", "no-cache");
        response.setDateHeader("Expires", 0);

        // Verificar si el usuario tiene una sesión activa
        HttpSession sesion = request.getSession();
        if (sesion.getAttribute("usuario") == null) {
            response.sendRedirect("CerrarSesion");
            return;
        }

        // Determinar el tipo de habilitación y llamar al método correspondiente
        String tipoHabilitacion = request.getParameter("tipoHabilitacion");
        if (tipoHabilitacion != null) {
            try {
                switch (tipoHabilitacion) {
                    case "1":
                        getFilteredDataHabiPrediosForChartForMonths(request, response, sesion);
                        break;
                    case "2":
                        getFilteredDataHabiDineroForChartForMonths(request, response);
                        break;
                    default:
                        response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Tipo de habilitación no válido");
                }
            } catch (Exception e) {
                response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error al procesar la solicitud");
                e.printStackTrace();
            }
        } else {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Tipo de habilitación no proporcionado");
        }
    }

    /**
     * Obtiene datos filtrados de habilitaciones de predios para gráficos por meses.
     *
     * @param request  solicitud HTTP
     * @param response respuesta HTTP
     * @throws IOException si ocurre un error de E/S
     */
    private void getFilteredDataHabiPrediosForChartForMonths(HttpServletRequest request, HttpServletResponse response, HttpSession sesion)
            throws IOException {

        // Obtener parámetros de la solicitud
        int classId = parseIntegerParameter(request.getParameter("classId"));
        int subclassId = parseIntegerParameter(request.getParameter("subclassId"));
        String userName = request.getParameter("userName");
        // Conexión a la base de datos
        Conexion newCon = new Conexion();
        try (Connection conexion = newCon.getConnection()) {
            String sql = "{call sp_GetFilteredDataHabiPrediosForChartforMonths(?, ?, ?, ?)}";
            try (CallableStatement stmt = conexion.prepareCall(sql)) {

                // Establecer parámetros de entrada
                if (classId != 0) {
                    stmt.setInt(1, classId);
                } else {
                    stmt.setNull(1, java.sql.Types.INTEGER);
                }

                if (subclassId != 0) {
                    stmt.setInt(2, subclassId);
                } else {
                    stmt.setNull(2, java.sql.Types.INTEGER);
                }
                
                if(!userName.equals("0")){
                    stmt.setString(3, userName);
                }else{
                    stmt.setNull(3, java.sql.Types.VARCHAR);
                    System.out.println("entraaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
                }
                
                // Registrar el parámetro de salida
                stmt.registerOutParameter(4, java.sql.Types.NVARCHAR);

                // Ejecutar el procedimiento almacenado
                stmt.execute();

                // Obtener el resultado JSON
                String jsonResponse = stmt.getString(4);

                // Escribir la respuesta JSON
                response.setContentType("application/json;charset=UTF-8");
                response.getWriter().write(jsonResponse);

            } catch (SQLException e) {
                e.printStackTrace();
                response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error al ejecutar el procedimiento almacenado");
            }
        } catch (SQLException e) {
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error al conectar con la base de datos");
        }
    }
    
    private void getFilteredDataHabiDineroForChartForMonths(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        // Obtener parámetros de la solicitud
        int classId = parseIntegerParameter(request.getParameter("classId"));
        int subclassId = parseIntegerParameter(request.getParameter("subclassId"));
        String userName = request.getParameter("userName");
        // Conexión a la base de datos
        Conexion newCon = new Conexion();
        try (Connection conexion = newCon.getConnection()) {
            String sql = "{call sp_GetFilteredDataHabiDineroForChartforMonths(?, ?, ?, ?)}";
            try (CallableStatement stmt = conexion.prepareCall(sql)) {

                // Establecer parámetros de entrada
                if (classId != 0) {
                    stmt.setInt(1, classId);
                } else {
                    stmt.setNull(1, java.sql.Types.INTEGER);
                }

                if (subclassId != 0) {
                    stmt.setInt(2, subclassId);
                } else {
                    stmt.setNull(2, java.sql.Types.INTEGER);
                }

                if(!userName.equals("0")){
                    stmt.setString(3, userName);
                }else{
                    stmt.setNull(3, java.sql.Types.VARCHAR);
                    System.out.println("entraaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
                }
                
                // Registrar el parámetro de salida
                stmt.registerOutParameter(4, java.sql.Types.NVARCHAR);

                // Ejecutar el procedimiento almacenado
                stmt.execute();

                // Obtener el resultado JSON
                String jsonResponse = stmt.getString(4);

                // Escribir la respuesta JSON
                response.setContentType("application/json;charset=UTF-8");
                response.getWriter().write(jsonResponse);

            } catch (SQLException e) {
                e.printStackTrace();
                response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error al ejecutar el procedimiento almacenado");
            }
        } catch (SQLException e) {
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error al conectar con la base de datos");
        }
    }

    /**
     * Parsea un parámetro a entero, devolviendo 0 si es nulo o no válido.
     *
     * @param param el parámetro a parsear
     * @return el valor entero parseado o 0 si no es válido
     */
    private int parseIntegerParameter(String param) {
        try {
            return param != null ? Integer.parseInt(param) : 0;
        } catch (NumberFormatException e) {
            return 0;
        }
    }

    /**
     * Devuelve una descripción breve del servlet.
     *
     * @return una cadena que contiene la descripción del servlet
     */
    @Override
    public String getServletInfo() {
        return "Servlet para obtener habilitaciones en formato JSON para gráficos";
    }
}
