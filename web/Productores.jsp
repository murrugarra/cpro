<%-- 
    Document   : main
    Created on : 10-jul-2024, 10:20:51
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
    <title>Productores | CPRO</title>
    <jsp:include page="FromHead.jsp" />    
    <script type="text/javascript" src="INI/js/funcionesProductores.js"></script>
</head>
<body>
    <div class="dashboard-container easyui-layout" fit="true">
        <div data-options="region:'north',split:true" class="header">
            <jsp:include page="FromHeader.jsp" />  
        </div>
        <div data-options="region:'west',split:true" title="MENÚ" class="menu" id="menu">
            <ul id="ttx" class="easyui-tree"></ul>
        </div>
        <div data-options="region:'center'" class="content"  title="PRODUCTORES" >
            <div class="panelTrabajo-container" style="padding: 2px;width:100%;height:100%;"> 
                <div class="easyui-panel" style="padding:5px;">
                    <a href="javascript:void(0)" style="display:none;" id="addProductorBtn" class="easyui-linkbutton"  data-options="iconCls:'icon-add'">Agrerar</a>
                    <a href="javascript:void(0)" style="display:none;" id="editProductorBtn" class="easyui-linkbutton" data-options="iconCls:'icon-edit'">Editar</a>
                    <a href="javascript:void(0)" style="display:none;" id="eliminProductorBtn" class="easyui-linkbutton" data-options="iconCls:'icon-delete'">Eliminar</a> 
                </div>
                <table id="tblProductores">
                </table>
                <div id="tbProductores" style="padding:2px 5px;">
                    
                    Dni/Ruc: <input class="easyui-textbox"  id="productores_DocBsq" style="width:115px">
                    Productor: <input class="easyui-textbox"  id="productores_UsuarioBsq" style="width:210px">
                    Tipo: 
                        <select class="easyui-combobox" data-options="editable:false, panelHeight:'auto'" id="productores_TipoUsuarioBsq">
                            <option value="-1">Todos</option>
                            <option value="0">Persona Natural</option>
                            <option value="1">Persona Jurídica</option>
                        </select>
                    Estado: 
                    <select class="easyui-combobox" data-options="editable:false, panelHeight:'auto'" style="width:100px"  id="productores_EstadoBsq">
                        <option value="1">Activo</option>
                        <option value="0">Inactivo</option>
                    </select>
                    <a href="#" class="easyui-linkbutton" id="addProductorBtnBusqTbl" iconCls="icon-search">Buscar</a>
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
    
    <div id="dlgAgregarProductores" class="easyui-dialog" title="Agrerar Productor" data-options="modal:true,closed:true,closable: false,
				iconCls: 'icon-add'
			"  style="width:595px;padding:5px;top:150px;left:250px;">
        <form  id="formRegProductor" autocomplete="off">
            <fieldset>
                <legend>Datos Personales</legend>
                <div class="form-section">
                    <div class="form-group">
                        <div>
                            <label for="addProductorCmbxTipoProductor">Tipo de Productor (*)</label>
                            <select id="addProductorCmbxTipoProductor">
                                <option value="0">Persona Natural</option>
                                <option value="1">Persona Jurídica</option>
                            </select>
                        </div>
                        <div>
                            <label for="addProductorTxtDni">DNI (*)</label>
                            <input id="addProductorTxtDni" type="text" maxlength="8" required>
                        </div>
                        <div>
                            <label for="addProductorTxtRuc">RUC (*)</label>
                            <input id="addProductorTxtRuc" type="text" maxlength="13" disabled required>
                        </div>
                        <div>
                            <label for="addProductorTxtApePaterno">Apellido Paterno (*)</label>
                            <input id="addProductorTxtApePaterno" type="text" required>
                        </div>
                        <div>
                            <label for="addProductorTxtApeMaterno">Apellido Materno (*)</label>
                            <input id="addProductorTxtApeMaterno" type="text" required>
                        </div>
                        <div>
                            <label for="addProductorTxtNombres">Nombres (*)</label>
                            <input id="addProductorTxtNombres" type="text" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <div>
                            <label for="addProductorTxtRazonSocial">Razón Social (*)</label>
                            <input id="addProductorTxtRazonSocial" type="text" disabled required>
                        </div>
                        <div>
                            <label for="addProductorTxtFechaIngreso">Fecha Ingreso (*)</label>
                            <input id="addProductorTxtFechaIngreso" type="date" required>
                        </div>
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <legend>Datos Adicionales</legend>
                <div class="form-section">
                    <div class="form-group">
                        <div>
                            <label for="addProductorTxtDireccion">Dirección</label>
                            <input id="addProductorTxtDireccion" type="text">
                        </div>
                        <div>
                            <label for="addProductorTxtTelefono">Celular</label>
                            <input id="addProductorTxtTelefono" maxlength="9" type="text">
                        </div>
                        <div>
                            <label for="addProductorTxtCorreo">Correo</label>
                            <input id="addProductorTxtCorreo" type="text">
                        </div>                
                    </div>
                </div>
            </fieldset>

            <div class="buttons">
                <button class="save" id="dlgAddProductorBtnGuardar" type="submit"><img src="INI/imagenes/grabar.png" alt="Guardar" class="icon"> <span class="button-text">Guardar</span></button>
                    <button class="cancel" id="dlgAddProductorBtnCancelar"><img src="INI/imagenes/cerrar.png" alt="Cancelar" class="icon"> <span class="button-text">Cancelar</span></button>
            </div>
        </form>    
    </div> 
    
    <div id="dlgEditarProductores" class="easyui-dialog" title="Editar Productor" data-options="modal:true,closed:true,closable: false,
				iconCls: 'icon-edit'
			"  style="width:595px;padding:5px;top:150px;left:250px;">
        <form  id="formEditProductor" autocomplete="off">
            <fieldset>
                <legend>Datos Personales</legend>
                <div class="form-section">
                    <div class="form-group">
                        <div>
                            <label for="editProductorCmbxTipoProductor">Tipo de Productor (*)</label>
                            <select id="editProductorCmbxTipoProductor">
                                <option value="0">Persona Natural</option>
                                <option value="1">Persona Jurídica</option>
                            </select>
                        </div>
                        <div>
                            <label for="editProductorTxtDni">DNI (*)</label>
                            <input id="editProductorTxtDni" type="text" maxlength="8" required>
                        </div>
                        <div>
                            <label for="editProductorTxtRuc">RUC (*)</label>
                            <input id="editProductorTxtRuc" type="text" maxlength="13" disabled required>
                        </div>
                        <div>
                            <label for="editProductorTxtApePaterno">Apellido Paterno (*)</label>
                            <input id="editProductorTxtApePaterno" type="text" required>
                        </div>
                        <div>
                            <label for="editProductorTxtApeMaterno">Apellido Materno (*)</label>
                            <input id="editProductorTxtApeMaterno" type="text" required>
                        </div>
                        <div>
                            <label for="editProductorTxtNombres">Nombres (*)</label>
                            <input id="editProductorTxtNombres" type="text" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <div>
                            <label for="editProductorTxtRazonSocial">Razón Social (*)</label>
                            <input id="editProductorTxtRazonSocial" type="text" disabled required>
                        </div>
                        <div>
                            <label for="editProductorTxtFechaIngreso">Fecha Ingreso (*)</label>
                            <input id="editProductorTxtFechaIngreso" type="date" required>
                        </div>
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <legend>Datos Adicionales</legend>
                <div class="form-section">
                    <div class="form-group">
                        <div>
                            <label for="editProductorTxtDireccion">Dirección</label>
                            <input id="editProductorTxtDireccion" type="text">
                        </div>
                        <div>
                            <label for="editProductorTxtTelefono">Celular</label>
                            <input id="editProductorTxtTelefono" maxlength="9" type="text">
                        </div>
                        <div>
                            <label for="editProductorTxtCorreo">Correo</label>
                            <input id="editProductorTxtCorreo" type="text">
                        </div>                
                    </div>
                </div>
            </fieldset>

            <div class="buttons">
                <button class="save" id="dlgEditProductorBtnGuardar" type="submit"><img src="INI/imagenes/grabar.png" alt="Guardar" class="icon"> <span class="button-text">Guardar</span></button>
                    <button class="cancel" id="dlgEditProductorBtnCancelar"><img src="INI/imagenes/cerrar.png" alt="Cancelar" class="icon"> <span class="button-text">Cancelar</span></button>
            </div>
        </form>    
    </div>                
                    
                    
                    
<script>
    $(function(){     
    TblPadronUsuarios();
});

</script>

</body>
</html>
<% } %>