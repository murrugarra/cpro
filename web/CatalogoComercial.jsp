<%-- 
    Document   : CatalogoComercial
    Created on : 15-jul-2024, 20:24:58
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
    <title>Catalogo Comercial | CPRO</title>
    <jsp:include page="FromHead.jsp" />    
    <script type="text/javascript" src="INI/js/funcionesCComercial.js?v=1.3"></script>
    <style>
    .small-field {
    flex: 0 0 40px; /* No crece, no encoge, ancho fijo de 40px */
}

.medium-field {
    flex: 0 0 50px; /* Ancho fijo de 50px */
}

.large-field {
    flex: 0 0 150px; /* Ancho fijo de 150px */
}

.auto-width {
    flex: 1; /* Ocupa el espacio restante */
}
    </style>
</head>
<body>
    <div class="dashboard-container easyui-layout" fit="true">
        <div data-options="region:'north',split:true" class="header">
            <jsp:include page="FromHeader.jsp" />  
        </div>
        <div data-options="region:'west',split:true" title="MENÚ" class="menu" id="menu">
            <ul id="ttx" class="easyui-tree"></ul>
        </div>
        <div data-options="region:'center'" class="content"  title="CATALOGO COMERCIAL" >
            <div class="panelTrabajo-container" style="padding: 2px;width:100%;height:100%;"> 
                <div class="easyui-panel" style="padding:5px;">
                    <a href="javascript:void(0)" onclick="" id="addCComercialBtn" class="easyui-linkbutton"  data-options="iconCls:'icon-add'">Agrerar</a>
                    <a href="javascript:void(0)" onclick="" id="editCComercialBtn" class="easyui-linkbutton" data-options="iconCls:'icon-edit'">Editar Datos</a>
                    <a href="javascript:void(0)" onclick="" id="editCComercialPrecioBtn" class="easyui-linkbutton" data-options="iconCls:'icon-monedaSoles'">Actualizar Precio</a>
                    <a href="javascript:void(0)" onclick="" id="eliminCComercialBtn" class="easyui-linkbutton" data-options="iconCls:'icon-delete'">Eliminar</a> 
                </div>
                <table id="tblCComercial">
                </table>
                <div id="tbCComercial" style="padding:2px 5px;">                    
                    Nombre: <input class="easyui-textbox"  id="ccomercial_NombreBsq" style="width:210px">
                    Estado: 
                    <select class="easyui-combobox" data-options="editable:false, panelHeight:'auto'" style="width:100px"  id="ccomercial_EstadoBsq">
                        <option value="1">Activo</option>
                        <option value="0">Inactivo</option>
                    </select>
                    <a href="#" class="easyui-linkbutton" id="ccomercialBtnBusqTbl" iconCls="icon-search">Buscar</a>
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
    
    <div id="dlgAgregarCComercial" class="easyui-dialog" title="Agrerar Elemento Comercial" data-options="modal:true,closed:true,closable: false,
				iconCls: 'icon-add'
			"  style="width:695px;padding:5px;top:150px;left:250px;">
        <form  id="formRegCComercial" autocomplete="off">
            <fieldset>
                <legend>Datos del Catálogo</legend>
                <div class="form-section">
                    <div class="form-group">
                       <%-- <div class="medium-field">
                            <label for="addCComercialCmbxGrupo">Grupo (*)</label>
                            <input id="addCComercialCmbxGrupo" type="text" required>
                            
                        </div>--%>
                        <div>
                            <label for="addCComercialCmbxClase">Clase (*)</label>
                            <input id="addCComercialCmbxClase" type="text" required>
                            
                        </div>
                        <div >
                            <label for="addCComercialCmbxSubClase">Sub Clase (*)</label>
                            <input id="addCComercialCmbxSubClase" type="text" required>
                            
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="auto-width">
                            <label for="addCComercialTxtNombre">Nombre (*)</label>
                            <input id="addCComercialTxtNombre" type="text" required>
                        </div>
                         <div class="small-field">
                            <label for="addCComercialTxtUmd">Unidad Medida (*)</label>
                            <input id="addCComercialTxtUmd" type="text" required>
                        </div>                        
                         <div class="small-field">
                            <label for="addCComercialCmbxConPrecio">Con Precio</label>
                            <select id="addCComercialCmbxConPrecio" >
                                <option value="S" selected="true">SI</option>
                                <option value="N">NO</option>
                            </select>                            
                        </div>
                    </div>
                </div>
            </fieldset>
            <fieldset>            
                <legend>Precio</legend>
                <div class="form-section">
                    <div class="form-group">
                        <div>
                            <label for="addCComercialDateFecha">Fecha (*)</label>
                            <input id="addCComercialDateFecha" type="date" required>
                        </div>
                        <div>
                            <label for="addCComercialTxtMonto">Monto (*)</label>
                            <input id="addCComercialTxtMonto" type="text" required>
                        </div>
                        <div>
                            <label for="addCComercialTxtMontoPrefr">Monto Preferencial (*)</label>
                            <input id="addCComercialTxtMontoPrefr" type="text" value="0" required>
                        </div>
                    </div>
                </div>
            </fieldset>   

            <div class="buttons">
                <button class="save" id="dlgAddCComercialBtnGuardar" type="submit"><img src="INI/imagenes/grabar.png" alt="Guardar" class="icon"> <span class="button-text">Guardar</span></button>
                    <button class="cancel" id="dlgAddCComercialBtnCancelar"><img src="INI/imagenes/cerrar.png" alt="Cancelar" class="icon"> <span class="button-text">Cancelar</span></button>
            </div>
        </form>    
    </div>         
    
    <div id="dlgEditarCComercial" class="easyui-dialog" title="Editar Elemento Comercial" data-options="modal:true,closed:true,closable: false,
				iconCls: 'icon-edit'
			"  style="width:695px;padding:5px;top:150px;left:250px;">
        <form  id="formEditCComercial" autocomplete="off">
            <fieldset>
                <legend>Datos del Catálogo</legend>
                <div class="form-section">
                    <div class="form-group">
                       <%-- <div class="medium-field">
                            <label for="editCComercialCmbxGrupo">Grupo (*)</label>
                            <input id="editCComercialCmbxGrupo" type="text" required>
                            
                        </div>--%>
                        <div>
                            <label for="editCComercialCmbxClase">Clase (*)</label>
                            <input id="editCComercialCmbxClase" type="text" required>
                            
                        </div>
                        <div>
                            <label for="editCComercialCmbxSubClase">Sub Clase (*)</label>
                            <input id="editCComercialCmbxSubClase" type="text" required>
                            
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="auto-width">
                            <label for="editCComercialTxtNombre">Nombre (*)</label>
                            <input id="editCComercialTxtNombre" type="text" required>
                        </div>
                         <div class="small-field">
                            <label for="editCComercialTxtUmd">Unidad Medida (*)</label>
                            <input id="editCComercialTxtUmd" type="text" required>
                        </div>                        
                         <div class="small-field">
                            <label for="editCComercialCmbxConPrecio">Con Precio</label>
                            <select id="editCComercialCmbxConPrecio" >
                                <option value="S" selected="true">SI</option>
                                <option value="N">NO</option>
                            </select>                            
                        </div>
                    </div>
                </div>
            </fieldset>  

            <div class="buttons">
                <button class="save" id="dlgEditCComercialBtnGuardar" type="submit"><img src="INI/imagenes/grabar.png" alt="Guardar" class="icon"> <span class="button-text">Guardar</span></button>
                    <button class="cancel" id="dlgEditCComercialBtnCancelar"><img src="INI/imagenes/cerrar.png" alt="Cancelar" class="icon"> <span class="button-text">Cancelar</span></button>
            </div>
        </form>    
    </div> 
    <div id="dlgEditarCComercialPrecio" class="easyui-dialog" title="Actualizar Precio" data-options="modal:true,closed:true,closable: false,
				iconCls: 'icon-monedaSoles'
			"  style="width:295px;padding:5px;top:150px;left:250px;">
        <form  id="formEditCComercialPrecio" autocomplete="off">
            <fieldset>            
                <legend>Precio</legend>
                <div class="form-section">
                    <div class="form-group">
                        <div>
                            <label for="editCComercialPrecioDateFecha">Fecha (*)</label>
                            <input id="editCComercialPrecioDateFecha" type="date" required>
                        </div>
                        <div>
                            <label for="editCComercialPrecioTxtMonto">Monto (*)</label>
                            <input id="editCComercialPrecioTxtMonto" type="text" required>
                        </div>
                        <div>
                            <label for="editCComercialPrecioTxtMontoPrefr">Monto Preferencial (*)</label>
                            <input id="editCComercialPrecioTxtMontoPrefr" type="text" required>
                        </div>
                    </div>
                </div>
            </fieldset>   

            <div class="buttons">
                <button class="save" id="dlgEditCComercialPrecioBtnGuardar" type="submit"><img src="INI/imagenes/grabar.png" alt="Guardar" class="icon"> <span class="button-text">Guardar</span></button>
                    <button class="cancel" id="dlgEditCComercialPrecioBtnCancelar"><img src="INI/imagenes/cerrar.png" alt="Cancelar" class="icon"> <span class="button-text">Cancelar</span></button>
            </div>
        </form>    
    </div> 
 
              
           
</body>
</html>
<% } %>


