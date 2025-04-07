<%-- 
    Document   : TipoCambio
    Created on : 15-jul-2024, 14:28:43
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
    <title>Tipo de Cambio | CPRO</title>
    <jsp:include page="FromHead.jsp" />    
    <script type="text/javascript" src="INI/js/funcionesTCambio.js"></script>
</head>
<body>
    <div class="dashboard-container easyui-layout" fit="true">
        <div data-options="region:'north',split:true" class="header">
            <jsp:include page="FromHeader.jsp" />  
        </div>
        <div data-options="region:'west',split:true" title="MENÚ" class="menu" id="menu">
            <ul id="ttx" class="easyui-tree"></ul>
        </div>
        <div data-options="region:'center'" class="content"  title="TIPO DE CAMBIO" >
            <div class="panelTrabajo-container" style="padding: 2px;width:100%;height:100%;"> 
                <div class="easyui-panel" style="padding:5px;">
                    <a href="javascript:void(0)" style="display: none;" id="addTCambioBtn" class="easyui-linkbutton"  data-options="iconCls:'icon-add'">Agrerar</a>
                    <a href="javascript:void(0)" style="display: none;" id="editTCambioBtn" class="easyui-linkbutton" data-options="iconCls:'icon-edit'">Editar</a>
                    <a href="javascript:void(0)" style="display: none;" id="eliminTCambioBtn" class="easyui-linkbutton" data-options="iconCls:'icon-delete'">Eliminar</a> 
                </div>
                <table id="tblTCambio">
                </table>
                <div id="tbTCambio" style="padding:2px 5px;">                    
                    F. Ini: <input type="date" id="tcambio_FechaBsq" style="width:130px">
                    F. Fin: <input type="date" id="tcambio_FechaFinBsq" style="width:130px">
                    Estado: 
                    <select class="easyui-combobox" data-options="editable:false, panelHeight:'auto'" style="width:100px"  id="tcambio_EstadoBsq">
                        <option value="1">Activo</option>
                        <option value="0">Inactivo</option>
                    </select>
                    <a href="#" class="easyui-linkbutton" id="tcambioBtnBusqTbl" iconCls="icon-search">Buscar</a>
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
    
    <div id="dlgAgregarTCambio" class="easyui-dialog" title="Agrerar Tipo de Cambio" data-options="modal:true,closed:true,closable: false,
				iconCls: 'icon-add'
			"  style="width:295px;padding:5px;top:150px;left:250px;">
        <form  id="formRegTCambio" autocomplete="off">
            <fieldset>
                <legend>Datos de Cambio</legend>
                <div class="form-section">
                    <div class="form-group">
                        <div>
                            <label for="addTCambioDateTCFecha">Fecha (*)</label>
                            <input id="addTCambioDateTCFecha" type="date" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <div>
                            <label for="addTCambioTxtTCventa">T. Cambio Venta (*)</label>
                            <input id="addTCambioTxtTCventa" type="text" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <div>
                            <label for="addTCambioTxtTCcompra">T. Cambio Compra (*)</label>
                            <input id="addTCambioTxtTCcompra" type="text" required>
                        </div>
                    </div>
                </div>
            </fieldset>

            <div class="buttons">
                <button class="save" id="dlgAddTCambioBtnGuardar" type="submit"><img src="INI/imagenes/grabar.png" alt="Guardar" class="icon"> <span class="button-text">Guardar</span></button>
                    <button class="cancel" id="dlgAddTCambioBtnCancelar"><img src="INI/imagenes/cerrar.png" alt="Cancelar" class="icon"> <span class="button-text">Cancelar</span></button>
            </div>
        </form>    
    </div> 
        
    
    <div id="dlgEditarTCambio" class="easyui-dialog" title="Editar Tipo de Cambio" data-options="modal:true,closed:true,closable: false,
				iconCls: 'icon-edit'
			"  style="width:395px;padding:5px;top:150px;left:250px;">
        <form  id="formEditTCambio" autocomplete="off">
            <fieldset>
                <legend>Datos de Cambio</legend>
                <div class="form-section">
                    <div class="form-group">
                        <div>
                            <label for="editTCambioDateTCFecha">Fecha (*)</label>
                            <input id="editTCambioDateTCFecha" type="date" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <div>
                            <label for="editTCambioTxtTCventa">T. Cambio Venta (*)</label>
                            <input id="editTCambioTxtTCventa" type="text" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <div>
                            <label for="editTCambioTxtTCcompra">T. Cambio Compra (*)</label>
                            <input id="editTCambioTxtTCcompra" type="text" required>
                        </div>
                    </div>
                </div>
            </fieldset>

            <div class="buttons">
                <button class="save" id="dlgEditTCambioBtnGuardar" type="submit"><img src="INI/imagenes/grabar.png" alt="Guardar" class="icon"> <span class="button-text">Guardar</span></button>
                    <button class="cancel" id="dlgEditTCambioBtnCancelar"><img src="INI/imagenes/cerrar.png" alt="Cancelar" class="icon"> <span class="button-text">Cancelar</span></button>
            </div>
        </form>    
    </div> 
              
           
</body>
</html>
<% } %>
