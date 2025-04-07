<%-- 
    Document   : RolMenuUsuario
    Created on : 25/07/2024, 02:35:10 PM
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
    <title>Rol Menu Usuario | CPRO</title>
    <jsp:include page="FromHead.jsp" />    
    <script type="text/javascript" src="INI/js/funcionesRolMenu.js"></script>
</head>
<body>
    <div class="dashboard-container easyui-layout" fit="true">
        <div data-options="region:'north',split:true" class="header">
            <jsp:include page="FromHeader.jsp" />  
        </div>
        <div data-options="region:'west',split:true" title="MENÚ" class="menu" id="menu">
            <ul id="ttx" class="easyui-tree"></ul>
        </div>
        <div data-options="region:'center'" class="content"  title="ROLES DEL MENU" >
            <div class="panelTrabajo-container" style="padding: 2px;width:100%;height:100%;"> 
                <div class="easyui-panel" style="padding:5px;">
                    
                    Dni: <input class="easyui-textbox"  id="usuariosRolMenu" style="width:210px">
                    <a href="#" class="easyui-linkbutton" id="UserRolMenuBtnActualizar" iconCls="icon-reload">Actualizar</a>
                </div>
                <ul id="treePermisos"></ul>
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

