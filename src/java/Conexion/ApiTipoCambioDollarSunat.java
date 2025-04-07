package Conexion;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import TDA_Clases.API;
import java.io.IOException;
import java.net.MalformedURLException;

@WebServlet(name = "ApiTipoCambioDollarSunat", urlPatterns = {"/ApiTipoCambioDollarSunat"})
public class ApiTipoCambioDollarSunat extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, MalformedURLException, IOException{
        String fechaTipoCambio = request.getParameter("fechaSolicitud");
        String jsonResponse;
        if(!fechaTipoCambio.equals("")){
            API apiTipoCambio = new API(fechaTipoCambio);
            if(apiTipoCambio.IsbCurrentDate()){
                jsonResponse = apiTipoCambio.ObtenerTipoCambioDeHoy();
            }else{
                jsonResponse = apiTipoCambio.ObtenerTipoDeCambioFechaEspecifica();
            }
            response.setContentType("application/json");
            response.setHeader("Cache-Control", "no-store");
            response.getWriter().write(jsonResponse.trim());
        }
    }
}
