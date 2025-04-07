package TDA_Clases;

import Conexion.Conexion;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;

public class API {
    private static final Logger LOGGER = Logger.getLogger(API.class.getName());
    private final String TOKEN = "apis-token-8560.b0yhT-m8YRbVkGIgIF6SiuIwzC0SYp7r";
    private URL url;
    private String fecha;
    private boolean bCurrentDate;

    public API() throws MalformedURLException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date dCurrentDate = new Date();
        this.fecha = dateFormat.format(dCurrentDate);
        this.url = new URL("https://www.sunat.gob.pe/a/txt/tipoCambio.txt");
        this.bCurrentDate = true;
    }

    public API(String fecha) throws MalformedURLException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date dCurrentDate = new Date();
        String vCurrentDate = dateFormat.format(dCurrentDate);
        this.fecha = fecha;
        if (vCurrentDate.equals(fecha)) {
            this.url = new URL("https://www.sunat.gob.pe/a/txt/tipoCambio.txt");
            this.bCurrentDate = true;
        } else {
            this.url = new URL("https://api.apis.net.pe/v2/sunat/tipo-cambio?date=" + this.fecha);
            bCurrentDate = false;
        }
    }

    public String ObtenerTipoCambioDeHoy() throws IOException {
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");

        BufferedReader reader = null;
        try {
            reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String line = reader.readLine();
            if (line != null) {
                String[] datos = line.split("\\|");
                String fecha = datos[0];
                String tipoCambioCompraStr = datos[1].replace(",", ".");
                String tipoCambioVentaStr = datos[2].replace(",", ".");
                double tipoCambioCompra = Double.parseDouble(tipoCambioCompraStr);
                double tipoCambioVenta = Double.parseDouble(tipoCambioVentaStr);
                return "{\"precioCompra\": " + tipoCambioCompra + ", \"precioVenta\": " + tipoCambioVenta + "}";
            } else {
                return "Error al leer los datos de la URL.";
            }
        } catch (IOException e) {
            LOGGER.log(Level.SEVERE, "Error al conectar a la URL: " + e.getMessage(), e);
            return "Error al conectar a la URL: " + e.getMessage();
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e) {
                    LOGGER.log(Level.SEVERE, "Error closing reader: " + e.getMessage(), e);
                }
            }
        }
    }

    public String ObtenerTipoDeCambioFechaEspecifica() throws IOException {
        BufferedReader in = null;
        HttpURLConnection connection = null;
        try {
            connection = (HttpURLConnection) this.url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Referer", "https://apis.net.pe/tipo-de-cambio-sunat-api");
            connection.setRequestProperty("Authorization", "Bearer " + this.TOKEN);

            int responseCode = connection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                StringBuilder response = new StringBuilder();
                String inputLine;
                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
                return response.toString();
            } else {
                LOGGER.log(Level.SEVERE, "GET request failed with response code: " + responseCode);
                return obtenerTipoDeCambioDesdeBD(fecha);
            }
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error al obtener tipo de cambio para fecha específica: " + e.getMessage(), e);
            return obtenerTipoDeCambioDesdeBD(fecha);
        } finally {
            if (in != null) {
                try {
                    in.close();
                } catch (IOException e) {
                    LOGGER.log(Level.SEVERE, "Error closing reader: " + e.getMessage(), e);
                }
            }
            if (connection != null) {
                connection.disconnect();
            }
        }
    }

    private String obtenerTipoDeCambioDesdeBD(String fecha) {
        Conexion conexion = new Conexion();
        Connection con = null;
        CallableStatement stmt = null;
        try {
            con = conexion.getConnection();
            stmt = con.prepareCall("{call ObtenerTipoDeCambioPorFecha(?, ?, ?)}");
            stmt.setString(1, fecha);
            stmt.registerOutParameter(2, Types.DECIMAL);
            stmt.registerOutParameter(3, Types.DECIMAL);

            stmt.execute();

            double tipoCompra = stmt.getDouble(2);
            double tipoVenta = stmt.getDouble(3);

            return String.format("{\"precioCompra\": %.4f, \"precioVenta\": %.4f}", tipoCompra, tipoVenta);
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error al obtener tipo de cambio desde la base de datos: " + e.getMessage(), e);
            return "{\"precioCompra\": 0, \"precioVenta\": 0}";
        } finally {
            if (stmt != null) {
                try {
                    stmt.close();
                } catch (SQLException e) {
                    LOGGER.log(Level.SEVERE, "Error closing statement: " + e.getMessage(), e);
                }
            }
            conexion.getClose();
        }
    }

    public boolean IsbCurrentDate() {
        return bCurrentDate;
    }
}
