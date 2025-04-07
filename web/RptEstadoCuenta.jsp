<%-- 
    Document   : RptEstadoCuenta
    Created on : 27/09/2024, 02:35:49 PM
    Author     : user 1
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
    <title>Reporte Estado de Cuenta | CPRO</title>
    <jsp:include page="FromHead.jsp" />    
    <script type="text/javascript" src="INI/js/funcionesReportes.js?v=1.2"></script>
    <style>
    .container-fluid {
        height: 100vh; /* Usa 100vh para que ocupe toda la altura de la ventana */
        padding: 0; /* Asegúrate de que no haya relleno que afecte la altura */
        margin: 0; /* Elimina márgenes */
        position: relative; /* Posicionamiento relativo para el contenedor */
    }
    
    #frameWrap {
        width: 100%;
        height: 100%; /* Asegúrate de que el wrap ocupe toda la altura */
    }

    #iFrameReporteEC {
        width: 100%;
        height: 100%; /* Asegúrate de que el iframe ocupe toda la altura */
        border: none; /* Remueve el borde del iframe */
    }

    #loader1 {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: none; /* Mantén oculto hasta que sea necesario */
    }
</style>


</head>
<body>
    <div class="dashboard-container easyui-layout" fit="true">
        <div data-options="region:'north',split:true" class="header">
            <jsp:include page="FromHeader.jsp" />  
        </div>
        <div data-options="region:'west',split:true" title="MENÚ" class="menu" id="menu">
            <ul id="ttx" class="easyui-tree"></ul>
        </div>
        <div data-options="region:'center'" class="content"  title="REPORTE - ESTADO DE CUENTA" >
            <div class="panelTrabajo-container" style="padding: 2px;width:100%;height:100%;"> 
                <div class="easyui-layout" style="width:100%; height:100%;">
                    <!-- Panel izquierdo -->
                    <div data-options="region:'west',split:true, " title="Opciones" style="width:230px;">
                            <div style="margin-left: auto; margin-right: auto; margin-top: 15px; margin-left: 5px;">
                                Usuario: <br>
                                <input class="easyui-textbox" onkeyup="BuscarUsuarioTjFincEnter(event)" id="rptEcTxtUsuario">
                                <a href="javascript:void(0)"  onclick="buscarUsuarioTjFincBTN()" class="easyui-linkbutton" data-options="iconCls:'icon-search'"></a>
                                <br>
                                <table id="rptEcTblListaUsuarios"></table>
                                Predios:<br>
                                <input id="rptEcCmbxPredios" class="easyui-combobox">                                
                                Campaña Agricola:<br>
                                <input id="rptEcCmbxCampania" type="text">
                                <br><br>
                                <a href="javascript:void(0)" onclick="GenerarRptEstadoCuenta()" class="easyui-linkbutton" data-options="iconCls:'icon-pdf'">Generar Reporte</a>
                                
                            </div>     

                        </div>

                        <!-- Panel central -->
                        <div data-options="region:'center'" title=" ">
                            <div class="container-fluid">
                                <div id="frameWrap">
                                     <img id="loader1" src="ventana_espera.gif" width="250" height="160" alt="loading gif" style="display: block;"/>
                                     <iframe id="iFrameReporteEC" name="ReporteEC" onload="this.style.display='block';" style="display:none;"></iframe>
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
    <script>
        $(document).ready(function() {    
        document.getElementById('loader1').style.display = 'none';  // Oculta el loader
        
        $('#rptEcTxtUsuario').textbox({
                inputEvents: $.extend({}, $.fn.textbox.defaults.inputEvents, {
                    keydown: function(event) {
                        if (event.key === 'Enter') {
                            const nombre = $(this).val();
                            BuscarProductorRelacionRptEstadoCuentaEnter(nombre);
                        }
                    }
                })
            });  
            loadCampaniaRptEstadoCuenta('rptEcCmbxCampania');
        });
    </script>
</body>
</html>
<% } %>
