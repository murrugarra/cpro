/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Login;

import Conexion.Conexion;
import TDA_Clases.HashPassword;
import java.io.IOException;
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
 * @author lmurr
 */
@WebServlet(name = "validarLogin", urlPatterns = {"/validarLogin"})
public class ValidarLogin extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //me llega la url "proyecto/login/out"
        String action=(request.getPathInfo()!=null?request.getPathInfo():"");
        HttpSession sesion = request.getSession();
        if(action.equals("/out")){
            sesion.invalidate();
            response.sendRedirect("/index.jsp");
        }else{
 
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String jsonResponse = "erNo hemos podido Ingresar al Sistema.";
        try {
            Integer userName;
            String password;
            userName = Integer.parseInt(request.getParameter("user"));
            password = request.getParameter("password");
            HttpSession session = null;
            Conexion newCon = new Conexion();
            try (Connection conexion = newCon.getConnection()) {
                String sql = "select iDni, vCorreo, vTelefono, iIdRol, vPassword, vNombres, vApePaterno, vApeMaterno,dFechaNacimiento, cSexo, vDireccion from UsuariosSys where iDni = ? and iEstado = ?;";
                try(PreparedStatement pstmtSlctUser = conexion.prepareStatement(sql)){
                    pstmtSlctUser.setInt(1, userName);
                    pstmtSlctUser.setInt(2, 1);
                    try(ResultSet rs1 = pstmtSlctUser.executeQuery()){
                        if(rs1.next()){
                            String passwordHash = rs1.getString("vPassword");
                            //Compara la contraseña ingresada por el usuario y la registrada en la BD
                            if(HashPassword.verifyPassword(password, passwordHash)){
                                session = request.getSession(true);
                                session.setAttribute("usuario", rs1.getInt("iDni"));
                                session.setAttribute("correo", rs1.getString("vCorreo"));
                                session.setAttribute("telefono", rs1.getString("vTelefono"));
                                session.setAttribute("idRol", rs1.getInt("iIdRol"));
                                session.setAttribute("nombres", rs1.getString("vNombres"));
                                session.setAttribute("apePaterno", rs1.getString("vApePaterno"));
                                session.setAttribute("apeMaterno", rs1.getString("vApeMaterno"));
                                session.setAttribute("fechaNacimiento", rs1.getDate("dFechaNacimiento"));
                                session.setAttribute("sexo", rs1.getString("cSexo"));
                                session.setAttribute("direccion", rs1.getString("vDireccion"));
                                jsonResponse = "ok";

                            }else{
                                //Contraseña incorrecta
                            jsonResponse = "avContraseña Incorrecta.";
                            }
                            
                        }else{
                            //Usuario Inválido
                            jsonResponse = "avUsuario Incorrecto.";
                        }
                        rs1.close();
                    }
                    pstmtSlctUser.close();
                }
                conexion.close();
            }
            newCon.getClose();
        } catch (SQLException e) { 
            // Manejar la excepción SQL
            jsonResponse = "erOcurrió un error SQL";
            e.printStackTrace();
        }
        
        

        // Enviar la respuesta JSON al cliente
        
        response.setContentType("text/html;charset=UTF-8");
           response.getWriter().write(jsonResponse);
    }
    
    
    private boolean validarUsuario(String usuario, String contrasena, Connection conexion) {
       
              
        return true; // Cambia esto según tu lógica
    }

}
