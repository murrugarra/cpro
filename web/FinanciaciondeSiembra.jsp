<%-- 
    Document   : FinanciaciondeSiembra
    Created on : 15/08/2024, 03:49:28 PM
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
    <title>Financiacion | CPRO</title>
    <jsp:include page="FromHead.jsp" />    
    <script type="text/javascript" src="INI/js/funcionesFinanciacion.js"></script>
</head>
<body>
    <div class="dashboard-container easyui-layout" fit="true">
        <div data-options="region:'north',split:true" class="header">
            <jsp:include page="FromHeader.jsp" />  
        </div>
        <div data-options="region:'west',split:true" title="MENÚ" class="menu" id="menu">
            <ul id="ttx" class="easyui-tree"></ul>
        </div>
        <div data-options="region:'center'" class="content"  title="FINANCIACIÓN DE SIEMBRA" >
            <div class="panelTrabajo-container" style="padding: 2px;width:100%;height:100%;"> 
                <div class="easyui-panel" style="padding:5px;">
                    <a href="javascript:void(0)" onclick="" id="addFinancBtn" class="easyui-linkbutton"  data-options="iconCls:'icon-add'">Agrerar</a>
                    <a href="javascript:void(0)" onclick="" id="editFinancBtn" class="easyui-linkbutton" data-options="iconCls:'icon-edit'">Editar</a>
                    <a href="javascript:void(0)" onclick="" id="eliminFinancBtn" class="easyui-linkbutton" data-options="iconCls:'icon-delete'">Eliminar</a> 
                    <a href="javascript:void(0)" onclick="" id="visualizaFinancBtn" class="easyui-linkbutton" data-options="iconCls:'icon-pdf'">Ver Contrato</a>
                </div>
                <table id="tblFinanc">
                </table>
                <div id="tbFinanc" style="padding:2px 5px;">     
                    
                <div class="form-section">
                    <div class="form-group">
                        <div class="medium-field">
                            <label for="financ_ProductorBsq">Productor:</label>
                            <input id="financ_ProductorBsq" type="text">
                        </div>
                        <div class="small-field">
                            <label for="financ_CampaniaBsq">Campaña</label>
                            <input id="financ_CampaniaBsq" type="text">
                        </div>
                        <div class="small-field">
                        Estado: 
                        <select class="easyui-combobox" data-options="editable:false, panelHeight:'auto'" style="width:100px"  id="financ_EstadoBsq">
                            <option value="1">Activo</option>
                            <option value="0">Inactivo</option>
                        </select>
                        </div>
                        <div class="small-field">
                            <br>
                            <a href="#" class="easyui-linkbutton" id="financBtnBusqTbl" iconCls="icon-search">Buscar</a>
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
    
    <div id="dlgAgregarFinanc" class="easyui-dialog" title="Agrerar Financiación de Siembra" data-options="modal:true,closed:true,closable: false,
				iconCls: 'icon-add'
			"  style="width:630px;padding:5px;top:100px;left:250px;">
        <form  id="formRegFinanc" enctype="multipart/form-data" autocomplete="off">
             <fieldset>
                <legend>Información Principal</legend>
                <div class="form-section">
                    <div class="form-group">
                        <div>
                            <br><a href="javascript:void(0)" onclick="" id="addFinancdlgAgregarBtnNewPrd" class="easyui-linkbutton"  data-options="iconCls:'icon-nuevo'">Nuevo</a>
                            <a href="javascript:void(0)" onclick="" id="addFinancdlgAgregarBtnBsqPrd" class="easyui-linkbutton"  data-options="iconCls:'icon-search'">Buscar</a>
                        </div>
                        <div class="large-field">
                            <label for="addFinancTxtPredio">Predio</label>
                            <input id="addFinancTxtPredio" type="text" disabled="true">
                        </div>
                        <div class="small-field">
                            <label for="addFinancTxtUc">Cod. Predio/UC</label>
                            <input id="addFinancTxtUc" type="text" disabled="true">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="auto-width">
                            <label for="addFinancTxtProductor">Productor</label>
                            <input id="addFinancTxtProductor" type="text" disabled="true">
                        </div>
                        <div class="small-field">
                            <label for="addFinancCmbxCampania">Campaña</label>
                            <input id="addFinancCmbxCampania" type="text">
                        </div>
                        <div class="small-field">
                            <label for="addFinancTxtAreaInst">Area Instalada</label>
                            <input id="addFinancTxtAreaInst" type="text">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="small-field">
                            <label for="addFinancTxtInteres">% Interes</label>
                            <input id="addFinancTxtInteres"  style="width:100px"  type="text">
                        </div>
                        <div class="small-field">
                            <label for="addFinancCmbxPreciPref">Precio Pref.: </label>
                        
                        <select class="easyui-combobox" data-options="editable:false, panelHeight:'auto'" style="width:70px"  id="addFinancCmbxPreciPref">
                            <option value="N">NO</option>
                            <option value="S">SI</option>
                        </select>
                        </div>
                        <div >
                            <label for="addFinancFileContrato">Contrato</label>
                            <input id="addFinancFileContrato" type="file" style="width:385px" accept="application/pdf">
                        </div>
                    </div>
                </div>
            </fieldset>

            <div class="buttons">
                <button class="save" id="dlgAddFinancBtnGuardar" type="submit"><img src="INI/imagenes/grabar.png" alt="Guardar" class="icon"> <span class="button-text">Guardar</span></button>
                <button class="cancel" id="dlgAddFinancBtnCancelar"><img src="INI/imagenes/cerrar.png" alt="Cancelar" class="icon"> <span class="button-text">Cancelar</span></button>
            </div>
        </form>    
    </div> 
    
    
    <div id="dlgEditFinanc" class="easyui-dialog" title="Editar Financiación de Siembra" data-options="modal:true,closed:true,closable: false,
				iconCls: 'icon-edit'
			"  style="width:430px;padding:5px;top:100px;left:250px;">
        <form  id="formEditFinanc" enctype="multipart/form-data" autocomplete="off">
             <fieldset>
                <legend>Selecciona un Docuemento</legend>
                <div class="form-section">
                    <%--
                    <div class="form-group">
                        <div>
                            <br><a href="javascript:void(0)" onclick="" id="editFinancdlgAgregarBtnNewPrd" class="easyui-linkbutton"  data-options="iconCls:'icon-nuevo'">Nuevo</a>
                            <a href="javascript:void(0)" onclick="" id="editFinancdlgAgregarBtnBsqPrd" class="easyui-linkbutton"  data-options="iconCls:'icon-search'">Buscar</a>
                        </div>
                        <div class="large-field">
                            <label for="editFinancTxtPredio">Predio</label>
                            <input id="editFinancTxtPredio" type="text" disabled="true">
                        </div>
                        <div class="small-field">
                            <label for="editFinancTxtUc">Cod. Predio/UC</label>
                            <input id="editFinancTxtUc" type="text" disabled="true">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="auto-width">
                            <label for="editFinancTxtProductor">Productor</label>
                            <input id="editFinancTxtProductor" type="text" disabled="true">
                        </div>
                        <div class="small-field">
                            <label for="editFinancCmbxCampania">Campaña</label>
                            <input id="editFinancCmbxCampania" type="text">
                        </div>
                        <div class="small-field">
                            <label for="editFinancTxtAreaInst">Area Instalada</label>
                            <input id="editFinancTxtAreaInst" type="text">
                        </div>
                    </div>--%>
                    <div class="form-group">
                        <%--<div class="small-field">
                            <label for="editFinancTxtInteres">% Interes</label>
                            <input id="editFinancTxtInteres" type="text">
                        </div>--%>
                        <div class="auto-width">
                            <label for="editFinancFileContrato">Contrato</label>
                            <input id="editFinancFileContrato" type="file" accept="application/pdf">
                        </div>
                    </div>
                </div>
            </fieldset>

            <div class="buttons">
                <button class="save" id="dlgEditFinancBtnGuardar" type="submit"><img src="INI/imagenes/grabar.png" alt="Guardar" class="icon"> <span class="button-text">Guardar</span></button>
                <button class="cancel" id="dlgEditFinancBtnCancelar"><img src="INI/imagenes/cerrar.png" alt="Cancelar" class="icon"> <span class="button-text">Cancelar</span></button>
            </div>
        </form>    
    </div>     
              
    <div id="dlgListaPrediosFinanc" class="easyui-dialog" title="Padron de Productores" data-options="modal:true,closed:true,closable: false"  
         style="width:695px;padding:5px;top:150px;left:250px;">
        <div class="form-section">
            <div class="form-group">
                <div>
                    <label for="addFinancDlgListaPrdTxtProductor">Productor</label>
                    <input id="addFinancDlgListaPrdTxtProductor" style="width:360px;"  type="text">
                </div>
                <div>
                    <label for="addFinancDlgListaPrdTxtDocumento">Documento</label>
                    <input id="addFinancDlgListaPrdTxtDocumento" style="width:160px;"  type="text">
                </div>
                <div>
                    <br><a href="javascript:void(0)" onclick="TblListaPrediosFinancBsq()" id="addFinancDlgListaPrdBtnBsq" class="easyui-linkbutton"  data-options="iconCls:'icon-search'">Buscar</a>
                </div> 
            </div>  
            <div class="table-container">
                <table id="tblListaPredioFinanc">
                </table>
            </div>           
        </div>
            <div class="buttons">
                <button class="seleccion" id="addFinancDlgListaBtnSeleccionar" type="submit"><img src="INI/imagenes/grabar.png" alt="Guardar" class="icon"> <span class="button-text">Seleccionar</span></button>
                <button class="cancel" id="addFinancDlgListaBtnCancelar"><img src="INI/imagenes/cerrar.png" alt="Cancelar" class="icon"> <span class="button-text">Cancelar</span></button>
            </div>
                                
    </div> 
               

</body>
</html>
<% } %>

