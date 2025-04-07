/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Conexion;

import TDA_Clases.Rol;
import java.io.IOException;
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
@WebServlet(name = "Menu", urlPatterns = {"/Menu"})
public class Menu extends HttpServlet {
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setHeader("Cache-Control", "no-cache, no-store");
        response.setHeader("Pragma", "no-cache");
        response.setDateHeader("Expires", 0);
        HttpSession sesion = request.getSession();
        if (sesion.getAttribute("usuario") == null) {
            response.sendRedirect("CerrarSesion");
        } else {
            Rol rolLoginConfigMenu = new Rol(Integer.parseInt(sesion.getAttribute("idRol").toString()));
            rolLoginConfigMenu.ObtenerPermisos();
            rolLoginConfigMenu.ObtenerNombre();

            StringBuilder jsonBuilder = new StringBuilder("{\n    \"menus\": [\n");

            // Si el permiso 9 está validado, agregamos la parte del JSON correspondiente
            // Visualizar Productores, id = 9
            if (rolLoginConfigMenu.ValidarPermiso(9)) {
                jsonBuilder.append("        {\n")
                        .append("            \"icon\": \"fa-solid fa-users\",\n")
                        .append("            \"menuId\": \"A\",\n")
                        .append("            \"menuName\": \"Productores\",\n")
                        .append("            \"menus\": [\n");
                // Si el permiso 10 está validado, agregamos la parte del JSON correspondiente
                // Agregar Productores, id = 10
                if (rolLoginConfigMenu.ValidarPermiso(10)) {
                    jsonBuilder.append("                {\n")
                            .append("                    \"menuId\": \"A1\",\n")
                            .append("                    \"menuName\": \"Registrar Productor\",\n")
                            .append("                    \"parentId\": \"A\",\n")
                            .append("                    \"menuUrl\": \"Productores_Nuevo.jsp\",\n")
                            .append("                    \"serialNo\": null,\n")
                            .append("                    \"icon\": null\n")
                            .append("                },\n");
                }
                jsonBuilder.append("                {\n")
                        .append("                    \"menuId\": \"A2\",\n")
                        .append("                    \"menuName\": \"Listar Productor\",\n")
                        .append("                    \"parentId\": \"A\",\n")
                        .append("                    \"menuUrl\": \"Productores.jsp\",\n")
                        .append("                    \"serialNo\": null,\n")
                        .append("                    \"icon\": null\n")
                        .append("                },\n")
                        .append("                {\n")
                        .append("                    \"menuId\": \"A3\",\n")
                        .append("                    \"menuName\": \"Reporte\",\n")
                        .append("                    \"parentId\": \"A\",\n")
                        .append("                    \"menuUrl\": \"ReporteProductores.jsp\",\n")
                        .append("                    \"serialNo\": null,\n")
                        .append("                    \"icon\": null\n")
                        .append("                }\n")
                        .append("            ]\n")
                        .append("        }\n");
            }
            
            // Si el permiso 13 está validado, agregamos la parte del JSON correspondiente
            // Visualizar Predios, id = 13
            if (rolLoginConfigMenu.ValidarPermiso(13)) {
                jsonBuilder.append("        ,{\n")
                        .append("                       \"icon\": \"fa-solid fa-list-ul\",\n")
                        .append("                       \"menuId\": \"B\",\n")
                        .append("                       \"menuName\": \"Predios\",\n")
                        .append("                       \"menus\": [\n");
                // Si el permiso 14 está validado, agregamos la parte del JSON correspondiente
                // Agregar Predios, id = 14
                if (rolLoginConfigMenu.ValidarPermiso(14)) {
                    jsonBuilder.append("   {\n")
                            .append("                       \"menuId\": \"B1\",\n")
                            .append("                       \"menuName\": \"Registrar Predios\",\n")
                            .append("                       \"parentId\": \"A\",\n")
                            .append("                       \"menuUrl\": \"Predios_Nuevo.jsp\",\n")
                            .append("                       \"serialNo\": null,\n")
                            .append("                       \"icon\": null\n")
                            .append("                   },\n");
                }
                jsonBuilder.append("           {\n")
                        .append("                       \"menuId\": \"B2\",\n")
                        .append("                       \"menuName\": \"Listar Predios\",\n")
                        .append("                       \"parentId\": \"A\",\n")
                        .append("                       \"menuUrl\": \"Predios.jsp\",\n")
                        .append("                       \"serialNo\": null,\n")
                        .append("                       \"icon\": null\n")
                        .append("                   },\n")
                        .append("                   {\n")
                        .append("                       \"menuId\": \"B3\",\n")
                        .append("                       \"menuName\": \"Reporte\",\n")
                        .append("                       \"parentId\": \"A\",\n")
                        .append("                       \"menuUrl\": \"ReportePredios.jsp\",\n")
                        .append("                       \"serialNo\": null,\n")
                        .append("                       \"icon\": null\n")
                        .append("                   }\n")
                        .append("            ]\n")
                        .append("        }\n");
            }
            
            
            
            // Si el permiso 21 está validado, agregamos la parte del JSON correspondiente
            // Visualizar Productores, id = 21
            if (rolLoginConfigMenu.ValidarPermiso(21)) {
                jsonBuilder.append("        ,{\n")
                        .append("            \"icon\": \"fa-solid fa-building\",\n")
                        .append("            \"menuId\": \"A\",\n")
                        .append("            \"menuName\": \"Empresa\",\n")
                        .append("            \"menus\": [\n");
                // Si el permiso 10 está validado, agregamos la parte del JSON correspondiente
                // Agregar Productores, id = 10
                if (rolLoginConfigMenu.ValidarPermiso(10)) {
                    jsonBuilder.append("                {\n")
                            .append("                    \"menuId\": \"A1\",\n")
                            .append("                    \"menuName\": \"Registrar Empresa\",\n")
                            .append("                    \"parentId\": \"A\",\n")
                            .append("                    \"menuUrl\": \"Proveedores_Nuevo.jsp\",\n")
                            .append("                    \"serialNo\": null,\n")
                            .append("                    \"icon\": null\n")
                            .append("                },\n");
                }
                jsonBuilder.append("                {\n")
                        .append("                    \"menuId\": \"A2\",\n")
                        .append("                    \"menuName\": \"Listar Empresa\",\n")
                        .append("                    \"parentId\": \"A\",\n")
                        .append("                    \"menuUrl\": \"Proveedores.jsp\",\n")
                        .append("                    \"serialNo\": null,\n")
                        .append("                    \"icon\": null\n")
                        .append("                }\n")
                        .append("            ]\n")
                        .append("        }\n");
            }
            
            // Si el permiso 26 está validado, agregamos la parte del JSON correspondiente
            // Visualizar Conceptos, id = 26
            if (rolLoginConfigMenu.ValidarPermiso(26)) {
                jsonBuilder.append("        ,{\n")
                        .append("                       \"icon\": \"fa-solid fa-file-signature\",\n")
                        .append("                       \"menuId\": \"B\",\n")
                        .append("                       \"menuName\": \"Conceptos\",\n")
                        .append("                       \"menus\": [\n");
                // Si el permiso 14 está validado, agregamos la parte del JSON correspondiente
                // Agregar Predios, id = 14
                if (rolLoginConfigMenu.ValidarPermiso(26)) {
                    jsonBuilder.append("   {\n")
                            .append("                       \"menuId\": \"B1\",\n")
                            .append("                       \"menuName\": \"Gestion de Conceptos\",\n")
                            .append("                       \"parentId\": \"A\",\n")
                            .append("                       \"menuUrl\": \"Conceptos.jsp\",\n")
                            .append("                       \"serialNo\": null,\n")
                            .append("                       \"icon\": null\n")
                            .append("                   }\n")
                            .append("            ]\n")
                            .append("        }\n");
                }
                /*jsonBuilder.append("           {\n")
                        .append("                       \"menuId\": \"B2\",\n")
                        .append("                       \"menuName\": \"Reporte\",\n")
                        .append("                       \"parentId\": \"A\",\n")
                        .append("                       \"menuUrl\": \"Trabajando.jsp\",\n")
                        .append("                       \"serialNo\": null,\n")
                        .append("                       \"icon\": null\n")
                        .append("                   }\n")
                        .append("            ]\n")
                        .append("        }\n");*/
            }
            
            // Si el permiso 30 está validado, agregamos la parte del JSON correspondiente
            // Visualizar Conceptos, id = 30
            if (rolLoginConfigMenu.ValidarPermiso(30)) {
                jsonBuilder.append("        ,{\n")
                        .append("                       \"icon\": \"fa-solid fa-hand-holding-dollar\",\n")
                        .append("                       \"menuId\": \"B\",\n")
                        .append("                       \"menuName\": \"Tipo de Cambio\",\n")
                        .append("                       \"menus\": [\n");
                // Si el permiso 14 está validado, agregamos la parte del JSON correspondiente
                // Agregar Predios, id = 14
                if (rolLoginConfigMenu.ValidarPermiso(30)) {
                    jsonBuilder.append("   {\n")
                            .append("                       \"menuId\": \"B1\",\n")
                            .append("                       \"menuName\": \"Gestion de Tipo de Cambio\",\n")
                            .append("                       \"parentId\": \"A\",\n")
                            .append("                       \"menuUrl\": \"TipoCambio.jsp\",\n")
                            .append("                       \"serialNo\": null,\n")
                            .append("                       \"icon\": null\n")
                            .append("                   }\n")
                            .append("            ]\n")
                            .append("        }\n");
                }
                /*jsonBuilder.append("           {\n")
                        .append("                       \"menuId\": \"B2\",\n")
                        .append("                       \"menuName\": \"Reporte\",\n")
                        .append("                       \"parentId\": \"A\",\n")
                        .append("                       \"menuUrl\": \"Trabajando.jsp\",\n")
                        .append("                       \"serialNo\": null,\n")
                        .append("                       \"icon\": null\n")
                        .append("                   }\n")
                        .append("            ]\n")
                        .append("        }\n");*/
            }

                        if (rolLoginConfigMenu.ValidarPermiso(17)) {
                    jsonBuilder.append("        ,{\n")
                            .append("                           \"icon\": \"fa-solid fa-file-circle-check\",\n")
                            .append("                           \"menuId\": \"C\",\n")
                            .append("                           \"menuName\": \"Habilitación de Predios\",\n")
                            .append("                           \"menus\": [\n");

                    if (rolLoginConfigMenu.ValidarPermiso(18)) {
                        jsonBuilder.append("   {\n")
                                .append("                       \"menuId\": \"C1\",\n")
                                .append("                       \"menuName\": \"Registrar Habilitación\",\n")
                                .append("                       \"parentId\": \"C\",\n")
                                .append("                       \"menuUrl\": \"Habilitacion_Campana.jsp\",\n")
                                .append("                       \"serialNo\": null,\n")
                                .append("                       \"icon\": null\n")
                                .append("                   },\n");
                    }

                    jsonBuilder.append("           {\n")
                            .append("                    \"menuId\": \"C2\",\n")
                            .append("                    \"menuName\": \"Listar Habilitaciones\",\n")
                            .append("                    \"parentId\": \"C\",\n")
                            .append("                    \"menuUrl\": \"Historial_Habilitaciones.jsp\",\n")
                            .append("                    \"serialNo\": null,\n")
                            .append("                    \"icon\": null\n")
                            .append("                }\n")
                            .append("            ]\n")
                            .append("        }\n");
                }


                        if (rolLoginConfigMenu.ValidarPermiso(1)) {
                    jsonBuilder.append("        ,{\n")
                            .append("                       \"icon\": \"fa-solid fa-list-check\",\n")
                            .append("                       \"menuId\": \"D\",\n")
                            .append("                       \"menuName\": \"Roles de Usuario\",\n")
                            .append("                       \"menus\": [\n");

                    if (rolLoginConfigMenu.ValidarPermiso(2)) {
                        jsonBuilder.append("   {\n")
                                .append("                    \"menuId\": \"D1\",\n")
                                .append("                    \"menuName\": \"Registrar Rol\",\n")
                                .append("                    \"parentId\": \"D\",\n")
                                .append("                    \"menuUrl\": \"Registrar_Rol.jsp\",\n")
                                .append("                    \"serialNo\": null,\n")
                                .append("                    \"icon\": null\n")
                                .append("                }\n")
                                .append("            ]\n")
                                .append("        }\n");
                    }
                }

                if (rolLoginConfigMenu.ValidarPermiso(5)) {
                    jsonBuilder.append("        ,{\n")
                            .append("                       \"icon\": \"fa-solid fa-id-badge\",\n")
                            .append("                       \"menuId\": \"E\",\n")
                            .append("                       \"menuName\": \"Gestionar Personal\",\n")
                            .append("                       \"menus\": [\n");

                    if (rolLoginConfigMenu.ValidarPermiso(8)) {
                        jsonBuilder.append("   {\n")
                                .append("                    \"menuId\": \"E1\",\n")
                                .append("                    \"menuName\": \"Registrar Personal\",\n")
                                .append("                    \"parentId\": \"E\",\n")
                                .append("                    \"menuUrl\": \"Registrar_Personal.jsp\",\n")
                                .append("                    \"serialNo\": null,\n")
                                .append("                    \"icon\": null\n")
                                .append("                }\n")
                                .append("            ]\n")
                                .append("        }\n");
                    }
                }
                
                if (true) {
                    jsonBuilder.append("        ,{\n")
                            .append("                       \"icon\": \"fa-solid fa-file-pdf\",\n")
                            .append("                       \"menuId\": \"E\",\n")
                            .append("                       \"menuName\": \"Reportes\",\n")
                            .append("                       \"menus\": [\n");

                    if (true) {
                        jsonBuilder.append("            {\n")
                                .append("                    \"menuId\": \"E1\",\n")
                                .append("                    \"menuName\": \"Estado de Cuenta\",\n")
                                .append("                    \"parentId\": \"E\",\n")
                                .append("                    \"menuUrl\": \"ReporteEstadoDeCuenta.jsp\",\n")
                                .append("                    \"serialNo\": null,\n")
                                .append("                    \"icon\": null\n")
                                .append("                },\n")
                                .append("               {\n")
                                .append("                    \"menuId\": \"E1\",\n")
                                .append("                    \"menuName\": \"Padrón Productores\",\n")
                                .append("                    \"parentId\": \"E\",\n")
                                .append("                    \"menuUrl\": \"ReportePadronProductores.jsp\",\n")
                                .append("                    \"serialNo\": null,\n")
                                .append("                    \"icon\": null\n")
                                .append("                }\n")
                                .append("            ]\n")
                                .append("        }\n");
                    }
                }

                jsonBuilder.append("]\n")
                        .append("}");

                String json = jsonBuilder.toString();

                //System.out.println("menuuuuu: " + json);
                response.setContentType("application/json");
                response.setHeader("Cache-Control", "no-store");
                response.getWriter().write(json.trim());
        } 
    }
}