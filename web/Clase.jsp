<%-- 
    Document   : Clase
    Created on : 14-jul-2024, 18:04:17
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
    <title>Clase | CPRO</title>
    <jsp:include page="FromHead.jsp" />    
    <script type="text/javascript" src="INI/js/funcionesClase.js?v=1.2"></script>
</head>
<body>
    <div class="dashboard-container easyui-layout" fit="true">
        <div data-options="region:'north',split:true" class="header">
            <jsp:include page="FromHeader.jsp" />  
        </div>
        <div data-options="region:'west',split:true" title="MENÚ" class="menu" id="menu">
            <ul id="ttx" class="easyui-tree"></ul>
        </div>
        <div data-options="region:'center'" class="content"  title="CLASE" >
            <div class="panelTrabajo-container" style="padding: 2px;width:100%;height:100%;"> 
                <div class="easyui-panel" style="padding:5px;">
                    <a href="javascript:void(0)" onclick="" id="addClaseBtn" class="easyui-linkbutton"  data-options="iconCls:'icon-add'">Agrerar Clase</a>
                    <a href="javascript:void(0)" onclick="" id="editClaseBtn" class="easyui-linkbutton" data-options="iconCls:'icon-edit'">Editar Clase</a>
                    <a href="javascript:void(0)" onclick="" id="eliminClaseBtn" class="easyui-linkbutton" data-options="iconCls:'icon-delete'">Eliminar Clase</a> 
                </div>
                <table id="tblClase">
                </table>
                <div id="tbClase" style="padding:2px 5px;">                    
                    Nombre: <input class="easyui-textbox"  id="clase_NombreBsq" style="width:210px">
                    Estado: 
                    <select class="easyui-combobox" data-options="editable:false, panelHeight:'auto'" style="width:100px"  id="clase_EstadoBsq">
                        <option value="1">Activo</option>
                        <option value="0">Inactivo</option>
                    </select>
                    <a href="#" class="easyui-linkbutton" id="claseBtnBusqTbl" iconCls="icon-search">Buscar</a>
                </div>
            </div>
        </div>
        <div data-options="region:'south',split:true" class="footer">
            <jsp:include page="FromFooter.jsp" /> 
        </div>
    </div>
    <div class="dropdown-menu" id="dropdown-menu">
        <a href="#" id="edit-profile" >Modificar Datos Personales</a>
        <a href="#" id="logout">Cerrar Sesión</a>
    </div>
    
    <div id="dlgAgregarClase" class="easyui-dialog" title="Agrerar Clase" data-options="modal:true,closed:true,closable: false,
				iconCls: 'icon-add'
			"  style="width:495px;padding:5px;top:150px;left:250px;">
        <form  id="formRegClase" autocomplete="off">
            <fieldset>
                <legend>Datos Clase</legend>
                <div class="form-section">
                    <div class="form-group">
                        <%--<div>
                            <label for="addClaseCmbxGrupo">Grupo (*)</label>
                            <input id="addClaseCmbxGrupo" type="text" required>
                            
                        </div>--%>
                        <div>
                            <label for="addClaseTxtNombre">Nombre (*)</label>
                            <input id="addClaseTxtNombre" type="text" required>
                        </div>
                    </div>
                </div>
            </fieldset>

            <div class="buttons">
                <button class="save" id="dlgAddClaseBtnGuardar" type="submit"><img src="INI/imagenes/grabar.png" alt="Guardar" class="icon"> <span class="button-text">Guardar</span></button>
                    <button class="cancel" id="dlgAddClaseBtnCancelar"><img src="INI/imagenes/cerrar.png" alt="Cancelar" class="icon"> <span class="button-text">Cancelar</span></button>
            </div>
        </form>    
    </div> 
        
    
    <div id="dlgEditarClase" class="easyui-dialog" title="Editar Clase" data-options="modal:true,closed:true,closable: false,
				iconCls: 'icon-edit'
			"  style="width:495px;padding:5px;top:150px;left:250px;">
        <form  id="formEditClase" autocomplete="off">
            <fieldset>
                <legend>Datos Grupo</legend>
                <div class="form-section">
                    <div class="form-group">
                        <div>
                        <%--    <label for="editClaseCmbxGrupo">Grupo (*)</label>
                            <input id="editClaseCmbxGrupo" type="text" required>
                            
                        </div>--%>
                        <div>
                            <label for="editClaseTxtNombre">Nombre (*)</label>
                            <input id="editClaseTxtNombre" type="text" required>
                        </div>
                    </div>
                </div>
            </fieldset>

            <div class="buttons">
                <button class="save" id="dlgEditClaseBtnGuardar" type="submit"><img src="INI/imagenes/grabar.png" alt="Guardar" class="icon"> <span class="button-text">Guardar</span></button>
                    <button class="cancel" id="dlgEditClaseBtnCancelar"><img src="INI/imagenes/cerrar.png" alt="Cancelar" class="icon"> <span class="button-text">Cancelar</span></button>
            </div>
        </form>    
    </div> 
              
           
</body>
</html>
<% } %>

