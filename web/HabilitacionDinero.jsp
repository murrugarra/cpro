<%-- 
    Document   : HabilitacionDinero
    Created on : 08/08/2024, 07:39:18 AM
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
    <title>H. de Dinero | CPRO</title>
    <jsp:include page="FromHead.jsp" />    
    <script type="text/javascript" src="INI/js/funcionesHDinero.js"></script>
</head>
<body>
    <div class="dashboard-container easyui-layout" fit="true">
        <div data-options="region:'north',split:true" class="header">
            <jsp:include page="FromHeader.jsp" />  
        </div>
        <div data-options="region:'west',split:true" title="MENÚ" class="menu" id="menu">
            <ul id="ttx" class="easyui-tree"></ul>
        </div>
        <div data-options="region:'center'" class="content"  title="HABILITACIÓN DE DINERO" >
            <div class="panelTrabajo-container" style="padding: 2px;width:100%;height:100%;"> 
                <div class="easyui-panel" style="padding:5px;">
                    <a href="javascript:void(0)" onclick="" id="addHDineroBtn" class="easyui-linkbutton"  data-options="iconCls:'icon-add'">Agrerar</a>
                    <a href="javascript:void(0)" onclick="" id="anularHDineroBtn" class="easyui-linkbutton" data-options="iconCls:'icon-anular'">Anular</a> 
                    <a href="javascript:void(0)" onclick="" id="reporteHDineroBtn" class="easyui-linkbutton" data-options="iconCls:'icon-pdf'">Reporte</a>
                </div>
                <table id="tblHDinero">
                </table>
                <div id="tbHDinero" style="padding:2px 5px;">     
                    
                <div class="form-section">
                    <div class="form-group">
                        <div class="medium-field">
                            <label for="hdinero_NroComprobtBsq">Nro Comprobante:</label>
                            <input id="hdinero_NroComprobtBsq" type="text">
                        </div>
                        <div class="small-field">
                            <label for="hdinero_FInicioBsq">F. Inicio:</label>
                            <input id="hdinero_FInicioBsq" type="date">
                        </div>
                        <div class="small-field">
                            <label for="hdinero_FFinBsq">F. Fin:</label>
                            <input id="hdinero_FFinBsq" type="date">
                        </div>
                        <div class="small-field">
                            <br>
                            <a href="#" class="easyui-linkbutton" id="hdineroBtnBusqTbl" iconCls="icon-search">Buscar</a>
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
    
    <div id="dlgAgregarHDinero" class="easyui-dialog" title="Agrerar Habilitacion de Dinero" data-options="modal:true,closed:true,closable: false,
				iconCls: 'icon-add'
			"  style="width:795px;height: 598px;padding:5px;top:100px;left:250px;">
        <form  id="formRegHDinero" autocomplete="off">
             <fieldset>
                <legend>Información Principal</legend>
                <div class="form-section">
                    <div class="form-group">
                        <div>
                            <br><a href="javascript:void(0)" onclick="" id="addHDinerodlgAgregarBtnNewPrd" class="easyui-linkbutton"  data-options="iconCls:'icon-nuevo'">Nuevo</a>
                            <a href="javascript:void(0)" onclick="" id="addHDinerodlgAgregarBtnBsqPrd" class="easyui-linkbutton"  data-options="iconCls:'icon-search'">Buscar</a>
                        </div>
                        <div class="large-field">
                            <label for="addHDineroTxtPredio">Predio</label>
                            <input id="addHDineroTxtPredio" type="text" disabled="true">
                        </div>
                        <div class="small-field">
                            <label for="addHDineroTxtUc">Cod. Predio/UC</label>
                            <input id="addHDineroTxtUc" type="text" disabled="true">
                        </div>
                        <div class="medium-field">
                            <label for="addHDineroCmbxCampania">Campaña</label>
                            <input id="addHDineroCmbxCampania" type="text">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="auto-width">
                            <label for="addHDineroTxtProductor">Productor</label>
                            <input id="addHDineroTxtProductor" type="text" disabled="true">
                        </div>
                        <div class="small-field">
                            <label for="addHDineroTxtAreaInst">Area Instalada</label>
                            <input id="addHDineroTxtAreaInst" type="text" disabled="true">
                        </div>
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <legend>Información del Comprobante</legend>
                <div class="form-section">
                    <div class="form-group">
                        <div>
                            <label for="addHDineroCmbxTipoDoc">Tipo</label>
                            <input id="addHDineroCmbxTipoDoc" type="text">
                        </div>
                        <div class="auto-width">
                            <label for="addHDineroTxtNumero">Número</label>
                            <input id="addHDineroTxtNumero"  style="width:270px;" type="text">
                        </div>
                        <div style="display: none;">
                            <label for="addHDineroTxtImpuesto">Igv</label>
                            <input id="addHDineroTxtImpuesto" style="width:55px;"  type="text" disabled="true">
                        </div>
                        <div>
                            <label for="addHDineroDateFecha">Fecha</label>
                            <input id="addHDineroDateFecha" type="date">
                        </div>
                        <div>
                            <label for="addHDineroTxtTipoC">T. Cambio</label>
                            <input id="addHDineroTxtTipoC" style="width:80px;" type="text">
                        </div>
                        <div>
                            <label for="addHDineroCmbxMoneda">Moneda</label>
                            <select id="addHDineroCmbxMoneda">
                                <option value="D" selected="true">$</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="auto-width">
                            <label for="addHDineroCmbxCComercial">Catalogo Comercial</label>
                            <input id="addHDineroCmbxCComercial"   type="text">
                        </div>
                        <div style="display: none;">
                            <label for="addHDineroTxtUMedida">U. Medida</label>
                            <input id="addHDineroTxtUMedida" style="width:60px;"  type="text" disabled="true">
                        </div>
                        <div style="display: none;">
                            <label for="addHDineroTxtPrecio">Precio</label>
                            <input id="addHDineroTxtPrecio" style="width:100px;" type="text" disabled="true">
                        </div>
                        <div class="small-field">
                            <label for="addHDineroTxtCantidad">Importe</label><input id="addHDineroTxtCantidad" class="easyui-textbox" style="width:150px;" data-options="
                            prompt: '0.00',
                            value: '',
                            validType: 'decimal[2]',
                            icons:[{
                                iconCls:'icon-add',
                                handler: function(e){
                                    var $textbox = $(e.data.target);
                                    var v = $textbox.textbox('getValue');

                                    if (v) {
                                        v = parseFloat(v).toFixed(2);
                                        AddHDineroAddTblDetalleImporte(v);
                                        $textbox.textbox('setValue','');
                                    }
                                    else
                                    {
                                        showNotification('warning', 'Debe ingresar una cantidad valida.');
                                    }
                                    
                                }
                            }]
                            ">
                        </div>
                        <div style="display: none">
                            <label for="addHDineroTxtInteres">Interés (0-100)%</label>
                            <input id="addHDineroTxtInteres"  type="text">
                        </div>
                    </div>
                    
                    <div class="table-container">
                        <table id="tblDetalleHDinero">
                        </table>
                         
                    </div>
                    <div class="form-group">
                        <div class="auto-width">
                            <label for="addHDineroTxtGlosa">Glosa:</label>
                            <input id="addHDineroTxtGlosa" type="text" >
                        </div>
                    </div>
                </div>
            </fieldset>

            <div class="buttons">
                <button class="save" id="dlgAddHDineroBtnGuardar" type="submit"><img src="INI/imagenes/grabar.png" alt="Guardar" class="icon"> <span class="button-text">Guardar</span></button>
                <button class="cancel" id="dlgAddHDineroBtnCancelar"><img src="INI/imagenes/cerrar.png" alt="Cancelar" class="icon"> <span class="button-text">Cancelar</span></button>
            </div>
        </form>    
    </div> 
        
              
    <div id="dlgListaPrediosHDinero" class="easyui-dialog" title="Padron de Productores" data-options="modal:true,closed:true,closable: false"  
         style="width:695px;padding:5px;top:150px;left:250px;">
        <div class="form-section">
            <div class="form-group">
                <div>
                    <label for="addHDineroDlgListaPrdTxtProductor">Productor</label>
                    <input id="addHDineroDlgListaPrdTxtProductor" style="width:360px;"  type="text">
                </div>
                <div>
                    <label for="addHDineroDlgListaPrdTxtDocumento">Documento</label>
                    <input id="addHDineroDlgListaPrdTxtDocumento" style="width:160px;"  type="text">
                </div>
                <div>
                    <br><a href="javascript:void(0)" onclick="" id="addHDineroDlgListaPrdBtnBsq" class="easyui-linkbutton"  data-options="iconCls:'icon-search'">Buscar</a>
                </div> 
            </div>  
            <div class="table-container">
                <table id="tblListaPrediosHDinero">
                </table>
            </div>           
        </div>
            <div class="buttons">
                <button class="seleccion" id="addHDineroDlgListaBtnSeleccionar" type="submit"><img src="INI/imagenes/grabar.png" alt="Guardar" class="icon"> <span class="button-text">Seleccionar</span></button>
                <button class="cancel" id="addHDineroDlgListaBtnCancelar"><img src="INI/imagenes/cerrar.png" alt="Cancelar" class="icon"> <span class="button-text">Cancelar</span></button>
            </div>
                                
    </div> 
              
    <div id="dlgMonedaHDinero" class="easyui-dialog" title="Selecciona" data-options="modal:true,closed:true,closable: false"  
         style="width:280px;padding:5px;top:150px;left:250px;">
        
        <form  id="formMonedaHDinero" autocomplete="off">
            <fieldset>
                <legend>La Moneda: </legend>
                <div style="display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px; " id="addHDineroDlgMonedaRbtn" class="easyui-radiogroup" data-options="name:'addHDineroDlgMonedaRbtn',data:groupData" ></div>
            </fieldset>
            <div class="buttons">
                <button class="seleccion" id="addHDineroDlgMonedaBtnSeleccionar" type="submit"><img src="INI/imagenes/grabar.png" alt="Guardar" class="icon"> <span class="button-text">Listo</span></button>
                <button class="cancel" id="addHDineroDlgMonedaBtnCancelar"><img src="INI/imagenes/cerrar.png" alt="Cancelar" class="icon"> <span class="button-text">Cancelar</span></button>
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

