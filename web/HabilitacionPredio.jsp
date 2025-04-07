<%-- 
    Document   : HabilitacionPredio
    Created on : 18-jul-2024, 7:56:08
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
    <title>H. de Predio | CPRO</title>
    <jsp:include page="FromHead.jsp" />    
    <script type="text/javascript" src="INI/js/funcionesHPredios.js?v=1.3"></script>
</head>
<body>
    <div class="dashboard-container easyui-layout" fit="true">
        <div data-options="region:'north',split:true" class="header">
            <jsp:include page="FromHeader.jsp" />  
        </div>
        <div data-options="region:'west',split:true" title="MENÚ" class="menu" id="menu">
            <ul id="ttx" class="easyui-tree"></ul>
        </div>
        <div data-options="region:'center'" class="content"  title="HABILITACIÓN DE PREDIO" >
            <div class="panelTrabajo-container" style="padding: 2px;width:100%;height:100%;"> 
                <div class="easyui-panel" style="padding:5px;">
                    <a href="javascript:void(0)" onclick="" id="addHPredioBtn" class="easyui-linkbutton"  data-options="iconCls:'icon-add'">Agrerar</a>
                    <a href="javascript:void(0)" onclick="" id="anularHPredioBtn" class="easyui-linkbutton" data-options="iconCls:'icon-anular'">Anular</a> 
                    <a href="javascript:void(0)" onclick="" id="reporteHPredioBtn" class="easyui-linkbutton" data-options="iconCls:'icon-pdf'">Reporte</a>
                </div>
                <table id="tblHPredio">
                </table>
                <div id="tbHPredio" style="padding:2px 5px;">     
                    
                <div class="form-section">
                    <div class="form-group">
                        <div class="medium-field">
                            <label for="hpredio_NroComprobtBsq">Nro Comprobante:</label>
                            <input id="hpredio_NroComprobtBsq" type="text">
                        </div>
                        <div class="small-field">
                            <label for="hpredio_FInicioBsq">F. Inicio:</label>
                            <input id="hpredio_FInicioBsq" type="date">
                        </div>
                        <div class="small-field">
                            <label for="hpredio_FFinBsq">F. Fin:</label>
                            <input id="hpredio_FFinBsq" type="date">
                        </div>
                        <div class="small-field">
                            <br>
                            <a href="#" class="easyui-linkbutton" id="hpredioBtnBusqTbl" iconCls="icon-search">Buscar</a>
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
    
    <div id="dlgAgregarHPredio" class="easyui-dialog" title="Agrerar Habilitacion de Predio" data-options="modal:true,closed:true,closable: false,
				iconCls: 'icon-add'
			"  style="width:795px;height: 598px;padding:5px;top:100px;left:250px;">
        <form  id="formRegHPredio" autocomplete="off">
             <fieldset>
                <legend>Información Principal</legend>
                <div class="form-section">
                    <div class="form-group">
                        <div>
                            <br><a href="javascript:void(0)" onclick="" id="addHPrediodlgAgregarBtnNewPrd" class="easyui-linkbutton"  data-options="iconCls:'icon-nuevo'">Nuevo</a>
                            <a href="javascript:void(0)" onclick="" id="addHPrediodlgAgregarBtnBsqPrd" class="easyui-linkbutton"  data-options="iconCls:'icon-search'">Buscar</a>
                        </div>
                        <div class="large-field">
                            <label for="addHPredioTxtPredio">Predio</label>
                            <input id="addHPredioTxtPredio" type="text" disabled="true">
                        </div>
                        <div class="small-field">
                            <label for="addHPredioTxtUc">Cod. Predio/UC</label>
                            <input id="addHPredioTxtUc" type="text" disabled="true">
                        </div>
                        <div class="medium-field">
                            <label for="addHPredioCmbxCampania">Campaña</label>
                            <input id="addHPredioCmbxCampania" type="text">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="auto-width">
                            <label for="addHPredioTxtProductor">Productor</label>
                            <input id="addHPredioTxtProductor" type="text" disabled="true">
                        </div>
                        <div class="small-field">
                            <label for="addHPredioTxtAreaInst">Area Instalada</label>
                            <input id="addHPredioTxtAreaInst" type="text" disabled="true">
                        </div>
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <legend>Información del Comprobante</legend>
                <div class="form-section">
                    <div class="form-group">
                        <div>
                            <label for="addHPredioCmbxTipoDoc">Tipo</label>
                            <input id="addHPredioCmbxTipoDoc" type="text">
                        </div>
                        <div class="auto-width">
                            <label for="addHPredioTxtNumero">Número</label>
                            <input id="addHPredioTxtNumero"  style="width:270px;" type="text">
                        </div>
                        <div>
                            <label for="addHPredioTxtImpuesto">Igv</label>
                            <input id="addHPredioTxtImpuesto" style="width:55px;"  type="text" disabled="true">
                        </div>
                        <div>
                            <label for="addHPredioDateFecha">Fecha</label>
                            <input id="addHPredioDateFecha" type="date">
                        </div>
                        <div>
                            <label for="addHPredioTxtTipoC">T. Cambio</label>
                            <input id="addHPredioTxtTipoC" style="width:80px;" type="text">
                        </div>
                        <div>
                            <label for="addHPredioCmbxMoneda">Moneda</label>
                            <select id="addHPredioCmbxMoneda">
                                <option value="D" selected="true">$</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="auto-width">
                            <label for="addHPredioCmbxCComercial">Catalogo Comercial</label>
                            <input id="addHPredioCmbxCComercial"   type="text">
                        </div>
                        <div class="small-field">
                            <label for="addHPredioTxtUMedida">U. Medida</label>
                            <input id="addHPredioTxtUMedida" style="width:60px;"  type="text" disabled="true">
                        </div>
                        <div class="small-field">
                            <label for="addHPredioTxtPrecio">Precio</label>
                            <input id="addHPredioTxtPrecio" style="width:100px;" type="text" disabled="true">
                        </div>
                        <div id="inputContainer"  class="small-field">
                            <label for="addHPredioTxtCantidad">Cantidad</label><input id="addHPredioTxtCantidad" class="easyui-textbox" style="width:100px;">
                        </div>
                        <div style="display: none">
                            <label for="addHPredioTxtInteres">Interés (0-100)%</label>
                            <input id="addHPredioTxtInteres" style="width:100px;" type="text">
                        </div>
                    </div>
                    
                    <div class="table-container">
                        <table id="tblDetalleHPredio">
                        </table>
                         
                    </div>
                    <div class="form-group">
                        <div class="auto-width">
                            <label for="addHPredioTxtGlosa">Glosa:</label>
                            <input id="addHPredioTxtGlosa" type="text" >
                        </div>
                    </div>
                </div>
            </fieldset>

            <div class="buttons">
                <button class="save" id="dlgAddHPredioBtnGuardar" type="submit"><img src="INI/imagenes/grabar.png" alt="Guardar" class="icon"> <span class="button-text">Guardar</span></button>
                <button class="cancel" id="dlgAddHPredioBtnCancelar"><img src="INI/imagenes/cerrar.png" alt="Cancelar" class="icon"> <span class="button-text">Cancelar</span></button>
            </div>
        </form>    
    </div> 
        
              
    <div id="dlgListaPrediosHPredio" class="easyui-dialog" title="Predios Con Financiamiento" data-options="modal:true,closed:true,closable: false"  
         style="width:695px;padding:5px;top:150px;left:250px;">
        <div class="form-section">
            <div class="form-group">
                <div>
                    <label for="addHPredioDlgListaPrdTxtProductor">Productor</label>
                    <input id="addHPredioDlgListaPrdTxtProductor" style="width:360px;"  type="text">
                </div>
                <div>
                    <label for="addHPredioDlgListaPrdTxtDocumento">Documento</label>
                    <input id="addHPredioDlgListaPrdTxtDocumento" style="width:160px;"  type="text">
                </div>
                <div>
                    <br><a href="javascript:void(0)" onclick="" id="addHPredioDlgListaPrdBtnBsq" class="easyui-linkbutton"  data-options="iconCls:'icon-search'">Buscar</a>
                </div> 
            </div>  
            <div class="table-container">
                <table id="tblListaPrediosHPredio">
                </table>
            </div>           
        </div>
            <div class="buttons">
                <button class="seleccion" id="addHPredioDlgListaBtnSeleccionar" type="submit"><img src="INI/imagenes/grabar.png" alt="Guardar" class="icon"> <span class="button-text">Seleccionar</span></button>
                <button class="cancel" id="addHPredioDlgListaBtnCancelar"><img src="INI/imagenes/cerrar.png" alt="Cancelar" class="icon"> <span class="button-text">Cancelar</span></button>
            </div>
                                
    </div> 
              
    <div id="dlgMonedaHPredio" class="easyui-dialog" title="Selecciona" data-options="modal:true,closed:true,closable: false"  
         style="width:280px;padding:5px;top:150px;left:250px;">
        
        <form  id="formMonedaHPredio" autocomplete="off">
            <fieldset>
                <legend>La Moneda y El Tipo Comprobante: </legend>
                <div style="display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px; " id="addHPredioDlgMonedaRbtn" class="easyui-radiogroup" data-options="name:'addHPredioDlgMonedaRbtn',data:groupData" ></div>
                    <div style="display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px; ">
                    <label for="addHPredioDlgMonedaCmbxTipoDoc">TIPO: </label>
                        <input id="addHPredioDlgMonedaCmbxTipoDoc" type="text" >
                    </div>
            </fieldset>
            <div class="buttons">
                <button class="seleccion" id="addHPredioDlgMonedaBtnSeleccionar" type="submit"><img src="INI/imagenes/grabar.png" alt="Guardar" class="icon"> <span class="button-text">Listo</span></button>
                <button class="cancel" id="addHPredioDlgMonedaBtnCancelar"><img src="INI/imagenes/cerrar.png" alt="Cancelar" class="icon"> <span class="button-text">Cancelar</span></button>
            </div>
        </form>                        
    </div>     
<script>
$.extend($.fn.validatebox.defaults.rules, {
    decimal: {
        validator: function(value, param){
            var regex = new RegExp("^\\d+(\\.\\d{1," + param[0] + "})?$");
            return regex.test(value);
        },
        message: 'Introduzca un numero valido con hasta {0} decimales.'
    }
});

        var groupData = [{
            value:'S',
            label:'SOLES'
        },{
            value:'D',
            label:'DOLARES'
        }];
      
</script>
</body>
</html>
<% } %>

