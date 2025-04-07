<%-- 
    Document   : RptPPA
    Created on : 11-ago-2024, 13:22:24
    Author     : Usuario
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    response.setHeader("Cache-Control","no-cache");
    response.setHeader("Cache-Control","no-store");
    response.setHeader("Pragma","no-cache");
    response.setDateHeader ("Expires", 0);
    HttpSession sesion = request.getSession();
    if(sesion.getAttribute("usuario") == null){
      response.sendRedirect("CerrarSesion");
    }
    else
    {   
%>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Reporte P.P.A | CPRO</title>
    <jsp:include page="FromHead.jsp" />    
    <script type="text/javascript" src="INI/js/funcionesReportes.js"></script>
</head>
<body>
    <div class="dashboard-container easyui-layout" fit="true">
        <div data-options="region:'north',split:true" class="header">
            <jsp:include page="FromHeader.jsp" />  
        </div>
        <div data-options="region:'west',split:true" title="MENÚ" class="menu" id="menu">
            <ul id="ttx" class="easyui-tree"></ul>
        </div>
        <div data-options="region:'center'" class="content"  title="REPORTE - PADRÓN DE PRODUCTORES AGRARIOS" >
            <div class="panelTrabajo-container" style="padding: 2px;width:100%;height:100%;"> 
                <div class="easyui-layout" style="width:100%; height:100%;">
                    <!-- Panel izquierdo -->
                    <div data-options="region:'west',split:true, " title="Opciones" style="width:200px;">
                            <div style="margin-left: auto; margin-right: auto; margin-top: 15px; margin-left: 5px;">
                                <div class="bg-primary-subtle text-primary-emphasis fw-bold rounded-top">
                                    <label for="iEstadoPPAReporte" class="form-label margin-l my-0">Estado</label>
                                </div >
                                <select class="form-select rounded-bottom fs-6 inputOptionsSearchProduct" id="iEstadoPPAReporte" aria-label="Estado">
                                    <option value="1">Activo</option>
                                    <option value="0">Inactivo</option>
                                </select>
                                 
                            </div>

                            <div style="margin-left: auto; margin-right: auto; margin-top: 15px; margin-left: 5px;">
                                <a href="javascript:void(0)" onclick="GenerarRptPPA()" id="reporteHPredioBtn" class="easyui-linkbutton" data-options="iconCls:'icon-pdf'">Generar Pdf</a>
                            </div>

                        </div>

                        <!-- Panel central -->
                        <div data-options="region:'center'" title=" ">
                            <div class="container-fluid">
                                <div id="frameWrap">
                                    <img id="loader1" style="display: none" src="ventana_espera.gif" width="250" height="160" alt="loading gif"/>
                                    <iframe id="iFrameReportePPA" style="border: 2px solid #b3b3b3;" name="ReportePPA" width="100%" height="620"></iframe>
                                </div> 
                            </div>
                        </div>
                    </div>
            </div>
        </div>
        <div data-options="region:'south',split:true" class="footer">
            <jsp:include page="FromFooter.jsp" /> 
        </div>
    </div>
    <div class="dropdown-menu" id="dropdown-menu">
        <a href="#" id="edit-profile">Modificar Datos Personales</a>
        <a href="#" id="logout">Cerrar Sesión</a>
    </div>

</body>
</html>
<% } %>
