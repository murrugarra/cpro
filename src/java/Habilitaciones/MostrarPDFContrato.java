/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Habilitaciones;

import Conexion.Conexion;
import java.io.IOException;
import java.io.OutputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Usuario
 */
@WebServlet(name = "MostrarPDFContrato", urlPatterns = {"/MostrarPDFContrato"})
public class MostrarPDFContrato extends HttpServlet {
private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
            int codPredio = Integer.parseInt(request.getParameter("codPredio"));
            int codCampania = Integer.parseInt(request.getParameter("codCampania"));
        Conexion newCon = new Conexion();
        // Configurar el tipo de contenido
        response.setContentType("application/pdf");

        try (Connection conn = newCon.getConnection();
             PreparedStatement stmt = conn.prepareStatement("SELECT binDocumento FROM Habilitacion_Campana WHERE iIdCampana = ? and iIdPredios = ?")) {
            stmt.setInt(1, codCampania);
            stmt.setInt(2, codPredio);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    byte[] pdfBytes = rs.getBytes("binDocumento");

                    try (OutputStream out = response.getOutputStream()) {
                        out.write(pdfBytes);
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
     @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int codPredio = Integer.parseInt(request.getParameter("codPredio"));
            int codCampania = Integer.parseInt(request.getParameter("codCampania"));
        Conexion newCon = new Conexion();
        // Configurar el tipo de contenido
        response.setContentType("application/pdf");

        try (Connection conn = newCon.getConnection();
             PreparedStatement stmt = conn.prepareStatement("SELECT binDocumento FROM Habilitacion_Campana WHERE iIdCampana = ? and iIdPredios = ?")) {
            stmt.setInt(1, codCampania);
            stmt.setInt(2, codPredio);

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    byte[] pdfBytes = rs.getBytes("binDocumento");
                    try (OutputStream out = response.getOutputStream()) {
                        out.write(pdfBytes);
                    }
                } else {
                    response.sendError(HttpServletResponse.SC_NOT_FOUND, "No se encontró el PDF");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error al recuperar el PDF");
        }
    }


}
