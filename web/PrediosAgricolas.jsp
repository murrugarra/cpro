<%-- 
    Document   : PrediosAgricolas
    Created on : 30/07/2024, 10:20:11 AM
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
    <title>Predios Agricolas | CPRO</title>
    <jsp:include page="FromHead.jsp" />    
    <script type="text/javascript" src="INI/js/funcionesPredios.js"></script>
</head>
<body>
    <div class="dashboard-container easyui-layout" fit="true">
        <div data-options="region:'north',split:true" class="header">
            <jsp:include page="FromHeader.jsp" />  
        </div>
        <div data-options="region:'west',split:true" title="MENÚ" class="menu" id="menu">
            <ul id="ttx" class="easyui-tree"></ul>
        </div>
        <div data-options="region:'center'" class="content"  title="PREDIOS AGRICOLAS" >
            <div class="panelTrabajo-container" style="padding: 2px;width:100%;height:100%;"> 
                <div class="easyui-panel" style="padding:5px;">
                    <a href="javascript:void(0)" onclick="" id="addPrediosBtn" class="easyui-linkbutton"  data-options="iconCls:'icon-add'">Agrerar</a>
                    <a href="javascript:void(0)" onclick="" id="editPrediosBtn" class="easyui-linkbutton" data-options="iconCls:'icon-edit'">Editar</a>
                    <a href="javascript:void(0)" onclick="" id="eliminPrediosBtn" class="easyui-linkbutton" data-options="iconCls:'icon-delete'">Eliminar</a> 
                </div>
                <table id="tblPredios">
                </table>
                <div id="tbPredios" style="padding:2px 5px;">                    
                    Productor: <input class="easyui-textbox"  id="predios_NombreBsq" style="width:210px">
                    Estado: 
                    <select class="easyui-combobox" data-options="editable:false, panelHeight:'auto'" style="width:100px"  id="predios_EstadoBsq">
                        <option value="1">Activo</option>
                        <option value="0">Inactivo</option>
                    </select>
                    <a href="#" class="easyui-linkbutton" id="prediosBtnBusqTbl" iconCls="icon-search">Buscar</a>
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
    
    <div id="dlgAgregarPredios" class="easyui-dialog" title="Agrerar Predios" data-options="modal:true,closed:true,closable: false,
				iconCls: 'icon-add'
			"  style="width:500px;padding:5px;top:150px;left:250px;">
        <form  id="formRegPredios" autocomplete="off">
            <fieldset>
                <legend>Datos del Predio</legend>
                <div class="form-section">
                    <div class="form-group">
                        <div>
                            <label for="addPredioCmbxProductor">Productor (*)</label>
                            <input id="addPredioCmbxProductor" type="text" required>                            
                        </div>                    
                    </div>                       
                    <div class="form-group">
                        <div>
                            <label for="addPredioCmbxSector">Sector (*)</label>
                            <input id="addPredioCmbxSector" type="text" required>                            
                        </div>
                        <div>
                            <label for="addPrediosTxtNombre">Nombre (*)</label>
                            <input id="addPrediosTxtNombre" style="width:230px;" type="text" required>                            
                        </div>
                    </div>
                    <div class="form-group">
                        <div>                            
                            <label for="addPrediosTxtCodPredio">Cod. Predio/UC.</label><input id="addPrediosTxtCodPredio" class="easyui-textbox" style="width:150px;" data-options="
                            prompt: '0.00',
                            value: '',
                            icons:[{
                                iconCls:'icon-reload',
                                handler: function(e){
                                    var $textbox = $(e.data.target);
                                     $.post('ObtenerUltimoCodigoGeneradoPredio', function(data) {
                                        let respuesta = data.split('-');
                                        let nuevoCodigo = respuesta[0] + '-' + (parseInt(respuesta[1])+1);
                                        $textbox.textbox('setValue',nuevoCodigo);
                                    });                                       
                                }
                            }]
                            ">
                        </div>
                        <div>
                            <label for="addPrediosTxtAtotal">Area Total (*)</label>
                            <input id="addPrediosTxtAtotal" style="width:140px;" type="text" required>                            
                        </div>
                        <div>
                            <label for="addPrediosTxtAinst">Area Instalada (*)</label>
                            <input id="addPrediosTxtAinst" style="width:140px;" type="text" required>                            
                        </div>
                    </div>
                    <div class="form-group">
                        <div>
                            <label for="addPrediosCmbxTipo">Tipo (*)</label>
                            <select id="addPrediosCmbxTipo">
                                <option value="1">Licencia</option>
                                <option value="2">Permiso</option>
                                <option value="0">Pozo</option>
                            </select>
                        </div>
                        <div>
                            <label for="addPrediosTxtCE">C.E (*)</label>
                            <input id="addPrediosTxtCE" type="text" required>
                        </div>
                        <div>
                            <label for="addPrediosTxtPH">P.H (*)</label>
                            <input id="addPrediosTxtPH" type="text" required>
                        </div>
                    </div>
                </div>
            </fieldset>

            <div class="buttons">
                <button class="save" id="dlgAddPrediosBtnGuardar" type="submit"><img src="INI/imagenes/grabar.png" alt="Guardar" class="icon"> <span class="button-text">Guardar</span></button>
                    <button class="cancel" id="dlgAddPrediosBtnCancelar"><img src="INI/imagenes/cerrar.png" alt="Cancelar" class="icon"> <span class="button-text">Cancelar</span></button>
            </div>
        </form>    
    </div> 
        
    
    <div id="dlgEditarPredio" class="easyui-dialog" title="Editar Predio" data-options="modal:true,closed:true,closable: false,
				iconCls: 'icon-edit'
			"  style="width:500px;padding:5px;top:150px;left:250px;">
        <form  id="formEditPredio" autocomplete="off">
            <fieldset>
                <legend>Datos del Predio</legend>
                <div class="form-section">
                    <div class="form-group">
                        <div>
                            <label for="editPredioCmbxProductor">Productor (*)</label>
                            <input id="editPredioCmbxProductor" type="text" required>                            
                        </div>                    
                    </div>                       
                    <div class="form-group">
                        <div>
                            <label for="editPredioCmbxSector">Sector (*)</label>
                            <input id="editPredioCmbxSector" type="text" required>                            
                        </div>
                        <div>
                            <label for="editPrediosTxtNombre">Nombre (*)</label>
                            <input id="editPrediosTxtNombre" style="width:230px;" type="text" required>                            
                        </div>
                    </div>
                    <div class="form-group">
                        <div>                            
                            <label for="editPrediosTxtCodPredio">Cod. Predio/UC.</label><input id="editPrediosTxtCodPredio" class="easyui-textbox" style="width:150px;" data-options="
                            prompt: '0.00',
                            value: '',
                            icons:[{
                                iconCls:'icon-reload',
                                handler: function(e){
                                    var $textbox = $(e.data.target);
                                     $.post('ObtenerUltimoCodigoGeneradoPredio', function(data) {
                                        let respuesta = data.split('-');
                                        let nuevoCodigo = respuesta[0] + '-' + (parseInt(respuesta[1])+1);
                                        $textbox.textbox('setValue',nuevoCodigo);
                                    });                                       
                                }
                            }]
                            ">
                        </div>
                        <div>
                            <label for="editPrediosTxtAtotal">Area Total (*)</label>
                            <input id="editPrediosTxtAtotal" style="width:140px;" type="text" required>                            
                        </div>
                        <div>
                            <label for="editPrediosTxtAinst">Area Instalada (*)</label>
                            <input id="editPrediosTxtAinst" style="width:140px;" type="text" required>                            
                        </div>
                    </div>
                    <div class="form-group">
                        <div>
                            <label for="editPrediosCmbxTipo">Tipo (*)</label>
                            <select id="editPrediosCmbxTipo">
                                <option value="1">Licencia</option>
                                <option value="2">Permiso</option>
                                <option value="0">Pozo</option>
                            </select>
                        </div>
                        <div>
                            <label for="editPrediosTxtCE">C.E (*)</label>
                            <input id="editPrediosTxtCE" type="text" required>
                        </div>
                        <div>
                            <label for="editPrediosTxtPH">P.H (*)</label>
                            <input id="editPrediosTxtPH" type="text" required>
                        </div>
                    </div>
                </div>
            </fieldset>

            <div class="buttons">
                <button class="save" id="dlgEditPredioBtnGuardar" type="submit"><img src="INI/imagenes/grabar.png" alt="Guardar" class="icon"> <span class="button-text">Guardar</span></button>
                    <button class="cancel" id="dlgEditPredioBtnCancelar"><img src="INI/imagenes/cerrar.png" alt="Cancelar" class="icon"> <span class="button-text">Cancelar</span></button>
            </div>
        </form>    
    </div> 
              
           
</body>
</html>
<% } %>

