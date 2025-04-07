<%-- 
    Document   : UsuariosSystem
    Created on : 25/07/2024, 09:11:19 AM
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
    <title>Usuario del Sistema | CPRO</title>
    <jsp:include page="FromHead.jsp" />    
    <script type="text/javascript" src="INI/js/funcionesUsuarioSystem.js"></script>
</head>
<body>
    <div class="dashboard-container easyui-layout" fit="true">
        <div data-options="region:'north',split:true" class="header">
            <jsp:include page="FromHeader.jsp" />  
        </div>
        <div data-options="region:'west',split:true" title="MENÚ" class="menu" id="menu">
            <ul id="ttx" class="easyui-tree"></ul>
        </div>
        <div data-options="region:'center'" class="content"  title="USUARIOS DEL SISTEMA" >
            <div class="panelTrabajo-container" style="padding: 2px;width:100%;height:100%;"> 
                <div class="easyui-panel" style="padding:5px;">
                    <a href="javascript:void(0)" onclick="" id="addUSystemBtn" class="easyui-linkbutton"  data-options="iconCls:'icon-add'">Agrerar</a>
                    <a href="javascript:void(0)" onclick="" id="editUSystemBtn" class="easyui-linkbutton" data-options="iconCls:'icon-edit'">Editar</a>
                    <a href="javascript:void(0)" onclick="" id="eliminUSystemBtn" class="easyui-linkbutton" data-options="iconCls:'icon-delete'">Eliminar</a> 
                </div>
                <table id="tblUSystem">
                </table>
                <div id="tbUSystem" style="padding:2px 5px;">                    
                    Nombre: <input class="easyui-textbox"  id="usystem_NombreBsq" style="width:210px">
                    Estado: 
                    <select class="easyui-combobox" data-options="editable:false, panelHeight:'auto'" style="width:100px"  id="usystem_EstadoBsq">
                        <option value="1">Activo</option>
                        <option value="0">Inactivo</option>
                    </select>
                    <a href="#" class="easyui-linkbutton" id="usystemBtnBusqTbl" iconCls="icon-search">Buscar</a>
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
    
    <div id="dlgAgregarUSystem" class="easyui-dialog" title="Agrerar Usuario del Sistema" data-options="modal:true,closed:true,closable: false,
				iconCls: 'icon-add'
			"  style="width:595px;padding:5px;top:150px;left:250px;">
        <form  id="formRegUSystem" autocomplete="off">
            <fieldset>
                <legend>Datos</legend>
                <div class="form-section">
                    <div class="form-group">
                        <div>
                            <label for="addUSystemTxtApePaterno">A. Paterno (*)</label>
                            <input id="addUSystemTxtApePaterno" type="text" required>
                            
                        </div>
                        <div>
                            <label for="addUSystemTxtApeMaterno">A. Materno (*)</label>
                            <input id="addUSystemTxtApeMaterno" type="text" required>
                            
                        </div>
                        <div>
                            <label for="addUSystemTxtNombre">Nombres (*)</label>
                            <input id="addUSystemTxtNombre" type="text" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <div>
                            <label for="addUSystemTxtDni">Dni (*)</label>
                            <input id="addUSystemTxtDni" type="text" required>
                            
                        </div>
                        <div>
                            <label for="addUSystemTxtCelular">Celular</label>
                            <input id="addUSystemTxtCelular" type="text" >
                            
                        </div>
                        <div>
                            <label for="addUSystemTxtCorreo">Correo</label>
                            <input id="addUSystemTxtCorreo" type="text" >
                        </div>
                    </div>
                    <div class="form-group">
                        <div>
                            <label for="addUSystemCmbxSexo">Sexo (*)</label>
                            <select id="addUSystemCmbxSexo">
                                <option value="M">M</option>
                                <option value="F">F</option>
                            </select>                            
                        </div>
                        <div class="small-field">
                            <label for="addUSystemTxtFNac">F. Nac. (*)</label>
                            <input id="addUSystemTxtFNac" type="date" required>
                            
                        </div>
                        <div class="auto-width">
                            <label for="addUSystemTxtDir">Direccion</label>
                            <input id="addUSystemTxtDir" type="text" >
                        </div>
                    </div>
                </div>
            </fieldset>

            <div class="buttons">
                <button class="save" id="dlgAddUSystemBtnGuardar" type="submit"><img src="INI/imagenes/grabar.png" alt="Guardar" class="icon"> <span class="button-text">Guardar</span></button>
                    <button class="cancel" id="dlgAddUSystemBtnCancelar"><img src="INI/imagenes/cerrar.png" alt="Cancelar" class="icon"> <span class="button-text">Cancelar</span></button>
            </div>
        </form>    
    </div> 
        
    
    <div id="dlgEditarUSystem" class="easyui-dialog" title="Editar Usuario del Sistem" data-options="modal:true,closed:true,closable: false,
				iconCls: 'icon-edit'
			"  style="width:595px;padding:5px;top:150px;left:250px;">
        <form  id="formEditUSystem" autocomplete="off">
            
            <fieldset>
                <legend>Datos</legend>
                <div class="form-section">
                    <div class="form-group">
                        <div>
                            <label for="editUSystemTxtApePaterno">A. Paterno (*)</label>
                            <input id="editUSystemTxtApePaterno" type="text" required>
                            
                        </div>
                        <div>
                            <label for="editUSystemTxtApeMaterno">A. Materno (*)</label>
                            <input id="editUSystemTxtApeMaterno" type="text" required>
                            
                        </div>
                        <div>
                            <label for="editUSystemTxtNombre">Nombres (*)</label>
                            <input id="editUSystemTxtNombre" type="text" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <div>
                            <label for="editUSystemTxtDni">Dni (*)</label>
                            <input id="editUSystemTxtDni" type="text" required>
                            
                        </div>
                        <div>
                            <label for="editUSystemTxtCelular">Celular</label>
                            <input id="editUSystemTxtCelular" type="text" >
                            
                        </div>
                        <div>
                            <label for="editUSystemTxtCorreo">Correo</label>
                            <input id="editUSystemTxtCorreo" type="text" >
                        </div>
                    </div>
                    <div class="form-group">
                        <div>
                            <label for="editUSystemCmbxSexo">Sexo (*)</label>
                            <select id="editUSystemCmbxSexo">
                                <option value="M">M</option>
                                <option value="F">F</option>
                            </select>                            
                        </div>
                        <div class="small-field">
                            <label for="editUSystemTxtFNac">F. Nac. (*)</label>
                            <input id="editUSystemTxtFNac" type="date" required>
                            
                        </div>
                        <div class="auto-width">
                            <label for="editUSystemTxtDir">Direccion</label>
                            <input id="editUSystemTxtDir" type="text" >
                        </div>
                    </div>
                </div>
            </fieldset>

            <div class="buttons">
                <button class="save" id="dlgEditUSystemBtnGuardar" type="submit"><img src="INI/imagenes/grabar.png" alt="Guardar" class="icon"> <span class="button-text">Guardar</span></button>
                    <button class="cancel" id="dlgEditUSystemBtnCancelar"><img src="INI/imagenes/cerrar.png" alt="Cancelar" class="icon"> <span class="button-text">Cancelar</span></button>
            </div>
        </form>    
    </div> 
              
           
</body>
</html>
<% } %>

