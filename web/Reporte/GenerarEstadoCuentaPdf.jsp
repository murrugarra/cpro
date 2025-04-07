<%-- 
    Document   : GenerarEstadoCuentaPdf
    Created on : 30/09/2024, 02:25:41 PM
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
    int predio =  Integer.parseInt(request.getParameter("codPredio"));
    int campania =  Integer.parseInt(request.getParameter("codCampania"));
    String campaniaText =  "CAMPAÑA AGRICOLA "+request.getParameter("campaniaTex");
    /*
    String logotipoUrl = "https://drive.google.com/uc?id=1D2ZAYR1v8Ce0LyTinsSF-jw6OjGzUCeo";
    String logosistemaUrl = "https://drive.google.com/uc?id=1kgd-2d9DNB4reM1P1ALY7o7lOUnauE95";
    */
    String logotipo = "/../../INI/Logo_Samnsa_min.jpg";
     String logosistema = "/../../INI/logo_cpro_min.jpg";
    String vusuario = session.getAttribute("apePaterno").toString()+" "+session.getAttribute("apeMaterno").toString()+","+session.getAttribute("nombres").toString();
    
    String webRoot = request.getRealPath("/");
    System.out.println(webRoot);
    File reportfile=null;
    /* ruta de reportes para las sociedades CT,CG,SJ*/
    reportfile = new File(application.getRealPath("/Reporte/reporte/EstadoCuentaPredio.jasper"));    
    /*Enviamos parámetros al reporte */
    System.out.println("Ruta de la imagen1: " + this.getClass().getResource(logotipo));
    System.out.println("Ruta de la imagen2: " + this.getClass().getResource(logosistema));
    Map parameter= new HashMap();
    // Parametros
    parameter.put("IDPREDIO", predio);
    parameter.put("IDCAMPANIA", campania);
    parameter.put("CampaniaText", campaniaText);
    parameter.put("USUARIOSYSTEM", vusuario);
    parameter.put("Logo", this.getClass().getResource(logotipo));
    parameter.put("LogoSistema", this.getClass().getResource(logosistema));
    
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
    System.out.println("Error en /GenerarEstadoCuentaPdf.jsp"+ex);
    out.println("Error en /GenerarEstadoCuentaPdf.jsp"+ex);
}%>
</html>
