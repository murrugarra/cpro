<%-- 
    Document   : GenerarReciboPdf
    Created on : 08-jun-2024, 17:37:15
    Author     : Usuario
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
    int codDetalle =  Integer.parseInt(request.getParameter("codDetalle"));
    int tipoDoc = Integer.parseInt(request.getParameter("tipoDoc"));
    int estado = Integer.parseInt(request.getParameter("estado"));
    System.out.println(tipoDoc);
     String logotipo = "/../../INI/Logo_Samnsa_min.jpg";
     String logosistema = "/../../INI/logo_cpro_min.jpg";
    System.out.println("codDetalle: "+codDetalle);
    String vusuario = session.getAttribute("apePaterno").toString()+" "+session.getAttribute("apeMaterno").toString()+","+session.getAttribute("nombres").toString();
    
String webRoot = request.getRealPath("/");
   System.out.println(webRoot);
    File reportfile=null;
    /* ruta de reportes para las sociedades CT,CG,SJ*/
    reportfile = new File(application.getRealPath("/Reporte/reporte/ReporteFormatoHabilitacionPredio.jasper")); 
    
    if(estado==0)
    {
       reportfile = new File(application.getRealPath("/Reporte/reporte/ReporteFormatoHabilitacionPredioAnulado.jasper"));   
    }
    
    if(tipoDoc==2)
    {
       reportfile = new File(application.getRealPath("/Reporte/reporte/ReporteFormatoHabilitacion.jasper"));   
       if(estado==0)
        {
            reportfile = new File(application.getRealPath("/Reporte/reporte/ReporteFormatoHabilitacionAnulado.jasper"));   
        }
    }
    /*Enviamos parámetros al reporte */
    Map parameter= new HashMap();
    // Parametros
    parameter.put("CODDETALLE", codDetalle);
    parameter.put("USUARIOSYSTEM", vusuario);
    parameter.put("SUBREPORT_DIR",application.getRealPath("/Reporte/reporte/"));
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
    System.out.println("Error en /GenerarReciboPdf.jsp"+ex);
    out.println("Error en /GenerarReciboPdf.jsp"+ex);
}%>
</html>