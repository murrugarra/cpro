<%-- 
    Document   : UnidadMedida
    Created on : 15-jul-2024, 20:22:51
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
    <title>Unidad de Medida | CPRO</title>
    <jsp:include page="FromHead.jsp" />    
    <script type="text/javascript" src="INI/js/funcionesUnidadMedida.js"></script>
</head>
<body>
    <div class="dashboard-container easyui-layout" fit="true">
        <div data-options="region:'north',split:true" class="header">
            <jsp:include page="FromHeader.jsp" />  
        </div>
        <div data-options="region:'west',split:true" title="MENÚ" class="menu" id="menu">
            <ul id="ttx" class="easyui-tree"></ul>
        </div>
        <div data-options="region:'center'" class="content"  title="UNIDAD DE MEDIDA" >
            <div class="panelTrabajo-container" style="padding: 2px;width:100%;height:100%;"> 
                <div class="easyui-panel" style="padding:5px;">
                    <a href="javascript:void(0)" onclick="" id="addUMedidaBtn" class="easyui-linkbutton"  data-options="iconCls:'icon-add'">Agrerar</a>
                    <a href="javascript:void(0)" onclick="" id="editUMedidaBtn" class="easyui-linkbutton" data-options="iconCls:'icon-edit'">Editar</a>
                    <a href="javascript:void(0)" onclick="" id="eliminUMedidaBtn" class="easyui-linkbutton" data-options="iconCls:'icon-delete'">Eliminar</a> 
                </div>
                <table id="tblUMedida">
                </table>
                <div id="tbUMedida" style="padding:2px 5px;">                    
                    Nombre: <input class="easyui-textbox"  id="umedida_NombreBsq" style="width:210px">
                    Estado: 
                    <select class="easyui-combobox" data-options="editable:false, panelHeight:'auto'" style="width:100px"  id="umedida_EstadoBsq">
                        <option value="1">Activo</option>
                        <option value="0">Inactivo</option>
                    </select>
                    <a href="#" class="easyui-linkbutton" id="umedidaBtnBusqTbl" iconCls="icon-search">Buscar</a>
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
    
    <div id="dlgAgregarUMedida" class="easyui-dialog" title="Agrerar Unidad de Medida" data-options="modal:true,closed:true,closable: false,
				iconCls: 'icon-add'
			"  style="width:395px;padding:5px;top:150px;left:250px;">
        <form  id="formRegUMedida" autocomplete="off">
            <fieldset>
                <legend>Datos Medida</legend>
                <div class="form-section">
                    <div class="form-group">
                        <div>
                            <label for="addUMedidaTxtNombre">Nombre (*)</label>
                            <input id="addUMedidaTxtNombre" type="text" required>
                        </div>
                        <div>
                            <label for="addUMedidaTxtAbrev">Abreviatura (*)</label>
                            <input id="addUMedidaTxtAbrev" type="text" required>
                        </div>
                    </div>
                </div>
            </fieldset>

            <div class="buttons">
                <button class="save" id="dlgAddUMedidaBtnGuardar" type="submit"><img src="INI/imagenes/grabar.png" alt="Guardar" class="icon"> <span class="button-text">Guardar</span></button>
                    <button class="cancel" id="dlgAddUMedidaBtnCancelar"><img src="INI/imagenes/cerrar.png" alt="Cancelar" class="icon"> <span class="button-text">Cancelar</span></button>
            </div>
        </form>    
    </div> 
        
    
    <div id="dlgEditarUMedida" class="easyui-dialog" title="Editar Unidad de Medida" data-options="modal:true,closed:true,closable: false,
				iconCls: 'icon-edit'
			"  style="width:395px;padding:5px;top:150px;left:250px;">
        <form  id="formEditUMedida" autocomplete="off">
            <fieldset>
                <legend>Datos Medida</legend>
                <div class="form-section">
                    <div class="form-group">
                        <div>
                            <label for="editUMedidaTxtNombre">Nombre (*)</label>
                            <input id="editUMedidaTxtNombre" type="text" required>
                        </div>
                        <div>
                            <label for="editUMedidaTxtAbrev">Abreviatura (*)</label>
                            <input id="editUMedidaTxtAbrev" type="text" required>
                        </div>
                    </div>
                </div>
            </fieldset>

            <div class="buttons">
                <button class="save" id="dlgEditUMedidaBtnGuardar" type="submit"><img src="INI/imagenes/grabar.png" alt="Guardar" class="icon"> <span class="button-text">Guardar</span></button>
                    <button class="cancel" id="dlgEditUMedidaBtnCancelar"><img src="INI/imagenes/cerrar.png" alt="Cancelar" class="icon"> <span class="button-text">Cancelar</span></button>
            </div>
        </form>    
    </div> 
              
           
</body>
</html>
<% } %>
