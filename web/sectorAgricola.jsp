<%-- 
    Document   : sectorAgricola
    Created on : 30/07/2024, 07:36:36 AM
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
    <title>Sector Agrícola | CPRO</title>
    <jsp:include page="FromHead.jsp" />    
    <script type="text/javascript" src="INI/js/funcionesSectorAgr.js"></script>
</head>
<body>
    <div class="dashboard-container easyui-layout" fit="true">
        <div data-options="region:'north',split:true" class="header">
            <jsp:include page="FromHeader.jsp" />  
        </div>
        <div data-options="region:'west',split:true" title="MENÚ" class="menu" id="menu">
            <ul id="ttx" class="easyui-tree"></ul>
        </div>
        <div data-options="region:'center'" class="content"  title="SECTOR AGRÍCOLA" >
            <div class="panelTrabajo-container" style="padding: 2px;width:100%;height:100%;"> 
                <div class="easyui-panel" style="padding:5px;">
                    <a href="javascript:void(0)" onclick="" id="addSectorAgrBtn" class="easyui-linkbutton"  data-options="iconCls:'icon-add'">Agrerar</a>
                    <a href="javascript:void(0)" onclick="" id="editSectorAgrBtn" class="easyui-linkbutton" data-options="iconCls:'icon-edit'">Editar</a>
                    <a href="javascript:void(0)" onclick="" id="eliminSectorAgrBtn" class="easyui-linkbutton" data-options="iconCls:'icon-delete'">Eliminar</a> 
                </div>
                <table id="tblSectorAgr">
                </table>
                <div id="tbSectorAgr" style="padding:2px 5px;">                    
                    Nombre: <input class="easyui-textbox"  id="sectoragr_NombreBsq" style="width:210px">
                    Estado: 
                    <select class="easyui-combobox" data-options="editable:false, panelHeight:'auto'" style="width:100px"  id="sectoragr_EstadoBsq">
                        <option value="1">Activo</option>
                        <option value="0">Inactivo</option>
                    </select>
                    <a href="#" class="easyui-linkbutton" id="sectoragrBtnBusqTbl" iconCls="icon-search">Buscar</a>
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
    
    <div id="dlgAgregarSectorAgr" class="easyui-dialog" title="Agrerar Sector Agrícola" data-options="modal:true,closed:true,closable: false,
				iconCls: 'icon-add'
			"  style="width:395px;padding:5px;top:150px;left:250px;">
        <form  id="formRegSectorAgr" autocomplete="off">
            <fieldset>
                <legend>Datos del Sector</legend>
                <div class="form-section">
                    <div class="form-group">
                        <div>
                            <label for="addSectorAgrTxtNombre">Nombre (*)</label>
                            <input id="addSectorAgrTxtNombre" type="text" required>
                        </div>
                    </div>
                </div>
            </fieldset>

            <div class="buttons">
                <button class="save" id="dlgAddSectorAgrBtnGuardar" type="submit"><img src="INI/imagenes/grabar.png" alt="Guardar" class="icon"> <span class="button-text">Guardar</span></button>
                    <button class="cancel" id="dlgAddSectorAgrBtnCancelar"><img src="INI/imagenes/cerrar.png" alt="Cancelar" class="icon"> <span class="button-text">Cancelar</span></button>
            </div>
        </form>    
    </div> 
        
    
    <div id="dlgEditarSectorAgr" class="easyui-dialog" title="Editar Sector Agrícola" data-options="modal:true,closed:true,closable: false,
				iconCls: 'icon-add'
			"  style="width:395px;padding:5px;top:150px;left:250px;">
        <form  id="formEditSectorAgr" autocomplete="off">
            <fieldset>
                <legend>Datos del Sector</legend>
                <div class="form-section">
                    <div class="form-group">
                        <div>
                            <label for="editSectorAgrTxtNombre">Nombre (*)</label>
                            <input id="editSectorAgrTxtNombre" type="text" required>
                        </div>
                    </div>
                </div>
            </fieldset>

            <div class="buttons">
                <button class="save" id="dlgEditSectorAgrBtnGuardar" type="submit"><img src="INI/imagenes/grabar.png" alt="Guardar" class="icon"> <span class="button-text">Guardar</span></button>
                    <button class="cancel" id="dlgEditSectorAgrBtnCancelar"><img src="INI/imagenes/cerrar.png" alt="Cancelar" class="icon"> <span class="button-text">Cancelar</span></button>
            </div>
        </form>    
    </div> 
              
           
</body>
</html>
<% } %>
