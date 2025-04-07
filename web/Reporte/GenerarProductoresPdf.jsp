<%-- 
    Document   : GenerarProductoresPdf
    Created on : 13/06/2024, 03:38:02 PM
    Author     : user 1
--%>

<%@page import="Conexion.Conexion"%>
<%@page import="java.sql.Connection"%>
<%@page import="java.io.*"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.Map"%>
<%@page import="net.sf.jasperreports.engine.*"%>
<% 
    try{    
    Conexion newCon = new Conexion();
    Connection conexion = newCon.getConnection();
    int estado =  Integer.parseInt(request.getParameter("estado"));
    String texto = request.getParameter("texto");
     String logotipo = "/../../INI/Logo_Samnsa_min.jpg";
     String logosistema = "/../../INI/logo_cpro_min.jpg";
    String vusuario = session.getAttribute("apePaterno").toString()+" "+session.getAttribute("apeMaterno").toString()+","+session.getAttribute("nombres").toString();
    
String webRoot = request.getRealPath("/");
   System.out.println(webRoot);
    File reportfile=null;
    /* ruta de reportes para las sociedades CT,CG,SJ*/
    reportfile = new File(application.getRealPath("/Reporte/reporte/ReporteListaProductores.jasper"));    
    /*Enviamos parámetros al reporte */
    Map parameter= new HashMap();
    // Parametros
    parameter.put("condicion", estado);
    parameter.put("condicionText", texto);
    parameter.put("USUARIOSYSTEM", vusuario);
    parameter.put("Logo", this.getClass().getResourceAsStream(logotipo));
    parameter.put("LogoSistema", this.getClass().getResourceAsStream(logosistema));
    
    /*Enviamos la ruta del reporte, los parámetros y la conexión*/
    byte[] bytes = JasperRunManager.runReportToPdf(reportfile.getPath(), parameter,conexion);
    /*Indicamos que la respuesta va a ser en formato PDF*/
    response.setContentType("application/pdf");
    response.setContentLength(bytes.length);
    ServletOutputStream outputStream= response.getOutputStream();
    outputStream.write(bytes,0,bytes.length);
    /*Limpiamos y cerramos flujos de salida*/
    outputStream.flush();
    outputStream.close();

          
}catch(Exception ex){
    ex.printStackTrace();
    System.out.println("Error en /GenerarProductoresPdf.jsp"+ex);
    out.println("Error en /GenerarProductoresPdf.jsp"+ex);
}%>
</html>
