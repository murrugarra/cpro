<%-- 
    Document   : SubClase
    Created on : 15-jul-2024, 15:22:29
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
    <title>Sub Clase | CPRO</title>
    <jsp:include page="FromHead.jsp" />    
    <script type="text/javascript" src="INI/js/funcionesSubClase.js?v=1.2"></script>
</head>
<body>
    <div class="dashboard-container easyui-layout" fit="true">
        <div data-options="region:'north',split:true" class="header">
            <jsp:include page="FromHeader.jsp" />  
        </div>
        <div data-options="region:'west',split:true" title="MENÚ" class="menu" id="menu">
            <ul id="ttx" class="easyui-tree"></ul>
        </div>
        <div data-options="region:'center'" class="content"  title="SUB CLASE" >
            <div class="panelTrabajo-container" style="padding: 2px;width:100%;height:100%;"> 
                <div class="easyui-panel" style="padding:5px;">
                    <a href="javascript:void(0)" onclick="" id="addSubClaseBtn" class="easyui-linkbutton"  data-options="iconCls:'icon-add'">Agrerar</a>
                    <a href="javascript:void(0)" onclick="" id="editSubClaseBtn" class="easyui-linkbutton" data-options="iconCls:'icon-edit'">Editar</a>
                    <a href="javascript:void(0)" onclick="" id="eliminSubClaseBtn" class="easyui-linkbutton" data-options="iconCls:'icon-delete'">Eliminar</a> 
                </div>
                <table id="tblSubClase">
                </table>
                <div id="tbSubClase" style="padding:2px 5px;">                    
                    Nombre: <input class="easyui-textbox"  id="subclase_NombreBsq" style="width:210px">
                    Estado: 
                    <select class="easyui-combobox" data-options="editable:false, panelHeight:'auto'" style="width:100px"  id="subclase_EstadoBsq">
                        <option value="1">Activo</option>
                        <option value="0">Inactivo</option>
                    </select>
                    <a href="#" class="easyui-linkbutton" id="subclaseBtnBusqTbl" iconCls="icon-search">Buscar</a>
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
    
    <div id="dlgAgregarSubClase" class="easyui-dialog" title="Agrerar Sub Clase" data-options="modal:true,closed:true,closable: false,
				iconCls: 'icon-add'
			"  style="width:495px;padding:5px;top:150px;left:250px;">
        <form  id="formRegSubClase" autocomplete="off">
            <fieldset>
                <legend>Datos Sub Clase</legend>
                <div class="form-section">
                    <div class="form-group">
                        <%--<div>
                            <label for="addSubClaseCmbxGrupo">Grupo (*)</label>
                            <input id="addSubClaseCmbxGrupo" type="text" required>
                            
                        </div>--%>
                        <div>
                            <label for="addSubClaseCmbxClase">Clase (*)</label>
                            <input id="addSubClaseCmbxClase" type="text" required>
                            
                        </div>
                        <div>
                            <label for="addSubClaseTxtNombre">Nombre (*)</label>
                            <input id="addSubClaseTxtNombre" type="text" required>
                        </div>
                    </div>
                </div>
            </fieldset>

            <div class="buttons">
                <button class="save" id="dlgAddSubClaseBtnGuardar" type="submit"><img src="INI/imagenes/grabar.png" alt="Guardar" class="icon"> <span class="button-text">Guardar</span></button>
                    <button class="cancel" id="dlgAddSubClaseBtnCancelar"><img src="INI/imagenes/cerrar.png" alt="Cancelar" class="icon"> <span class="button-text">Cancelar</span></button>
            </div>
        </form>    
    </div> 
        
    
    <div id="dlgEditarSubClase" class="easyui-dialog" title="Editar Sub Clase" data-options="modal:true,closed:true,closable: false,
				iconCls: 'icon-edit'
			"  style="width:495px;padding:5px;top:150px;left:250px;">
        <form  id="formEditSubClase" autocomplete="off">
            <fieldset>
                <legend>Datos Sub Clase</legend>
                <div class="form-section">
                    <div class="form-group">
                        <%--<div>
                            <label for="editSubClaseCmbxGrupo">Grupo (*)</label>
                            <input id="editSubClaseCmbxGrupo" type="text" required>
                            
                        </div>--%>
                        <div>
                            <label for="editSubClaseCmbxClase">Clase (*)</label>
                            <input id="editSubClaseCmbxClase" type="text" required>
                            
                        </div>
                        <div>
                            <label for="editSubClaseTxtNombre">Nombre (*)</label>
                            <input id="editSubClaseTxtNombre" type="text" required>
                        </div>
                    </div>
                </div>
            </fieldset>

            <div class="buttons">
                <button class="save" id="dlgEditSubClaseBtnGuardar" type="submit"><img src="INI/imagenes/grabar.png" alt="Guardar" class="icon"> <span class="button-text">Guardar</span></button>
                    <button class="cancel" id="dlgEditSubClaseBtnCancelar"><img src="INI/imagenes/cerrar.png" alt="Cancelar" class="icon"> <span class="button-text">Cancelar</span></button>
            </div>
        </form>    
    </div> 
              
           
</body>
</html>
<% } %>

