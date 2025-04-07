/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


 $(document).ready(function() {            
           
            $("#hdinero_FInicioBsq").val(obtenerFechaActual());    
            $("#hdinero_FFinBsq").val(obtenerFechaActual());
            TblHDinero();
            accessHDinero();
            $('#addHDineroDateFecha').on("change",
                function(){
                    ObtenerTipoCambio('addHDineroDateFecha','addHDineroTxtTipoC');
                }
            );
            $("#hdineroBtnBusqTbl").on('click',function(event){
                TblHDineroq(); 
            });
 
 
            $("#addHDinerodlgAgregarBtnBsqPrd").on('click',function(event){//por ver su Uso
               var dg = $('#tblListaPrediosHDinero');
                if (!dg.data('datagrid')){ TblListaPrediosHDinero();
                }
                else
                {
                    TblListaPrediosHDineroBsq();
                }
               $( "#dlgListaPrediosHDinero" ).dialog( "open" );   
            });
 
            $("#addHDinerodlgAgregarBtnNewPrd").on('click',function(event){//por ver su Uso
               ActivarBotonNewHDinero();  
            });            

            $("#reporteHDineroBtn").on('click',function(event){
                GenerarReciboPdf();
            });
            
            $("#dlgAddHDineroBtnCancelar").on('click',function(event){
                var isValid = $('#formRegHDinero').form('validate'); // Validar el formulario
                if (isValid) {
                    $( "#dlgAgregarHDinero" ).dialog( "close" ); // Cerrar el diálogo si el formulario es válido
                } else {
                    // Mostrar un mensaje de error o realizar alguna acción si el formulario no es válido
                    console.log('El formulario no es válido. No se puede cerrar el diálogo.');
                }
                // Evitar que el evento de clic se propague y evite cualquier comportamiento predeterminado del navegador
                event.preventDefault();
                event.stopPropagation();
            });
            
            $("#addHDineroDlgMonedaBtnCancelar").on('click',function(event){
                var isValid = $('#formMonedaHDinero').form('validate'); // Validar el formulario
                if (isValid) {
                    $( "#dlgMonedaHDinero" ).dialog( "close" ); // Cerrar el diálogo si el formulario es válido
                } else {
                    // Mostrar un mensaje de error o realizar alguna acción si el formulario no es válido
                    console.log('El formulario no es válido. No se puede cerrar el diálogo.');
                }
                // Evitar que el evento de clic se propague y evite cualquier comportamiento predeterminado del navegador
                event.preventDefault();
                event.stopPropagation();
            });
            
            $("#addHDineroDlgListaBtnSeleccionar").on('click',function(event){
                AddHDineroTblListaPrediosSeleccionar();  
            }); 
            $("#addHDineroDlgListaBtnCancelar").on('click',function(event){
               $( "#dlgListaPrediosHDinero" ).dialog( "close" );  
            }); 
            
             // Asignar el evento keypress al input generado por EasyUI
            $('#addHDineroTxtCantidad').textbox().textbox('textbox').on('keypress', function(e) {
                if (e.which == 13) { // Detecta si se presiona Enter (código de tecla 13)
                     e.preventDefault(); // Previene el envío del formulario
                    var $textbox = $('#addHDineroTxtCantidad');
                    var v = $textbox.textbox('getValue');

                    if (v) {
                        v = parseFloat(v).toFixed(2);
                        AddHDineroAddTblDetalleImporte(v);
                        $textbox.textbox('setValue','');
                    } else {
                        showNotification('warning', 'Debe ingresar una cantidad valida.');
                    }
                }
            });
            
            
            $('#hdinero_NroComprobtBsq').keyup(function(event) {
                var key=event.keyCode || event.which;
                 if (key===13)
                 {
                   TblHDineroq();  
                 } 
             });
             
             
            
            $("#formRegHDinero").submit(function(event) {
                event.preventDefault(); // Detiene el evento por defecto del Formulario
                saveDataHDinero();

            });
            
            $("#formMonedaHDinero").submit(function(event) {
                event.preventDefault(); // Detiene el evento por defecto del Formulario
                openHabilitacionDinero();

            });
            
            soloNumeros("#addHDineroTxtAreaInst");
            soloMayusculas("#addHDineroTxtNumero");

            function verificarSesion() {
                fetch('VerificarSesion')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log("Datos de la sesión:", data); // Log para depuración
                        if (!data.sessionActive) {
                            clearInterval(sessionInterval); // Detener el intervalo
                          $.messager.defaults.ok = 'Ok';
                          $.messager.alert({
                             title: 'Sesión Expirada',
                             msg: 'Su sesión ha expirado. Será redirigido a la página principal.',
                             icon:'info',
                             onClose: function(){
                                window.location.href = 'index.jsp';
                             },
                             fn: function(){
                                window.location.href = 'index.jsp';
                             }
                          });                  
                        }
                    })
                    .catch(error => {
                        console.error('Error verificando la sesión:', error);
                    });
            }

            // Verificar la sesión cada 5 segundos (5000 milisegundos)
            var sessionInterval = setInterval(verificarSesion, 5000);          
            
        });
    
function loadCComercialHDinero(comboId, sValue) {
    let winComboCComercialHD;
    $("#" + comboId).combobox({
        valueField: 'id',
        textField: 'text',
        editable: false,
        panelHeight: 'auto',
        method: 'post',
        width: 550,
        url: 'ListaCatalogoComercialCmbxHDinero', // Asegúrate de apuntar al servlet o endpoint correcto
        onSelect: function (record) {
            $("#addHDineroTxtUMedida").val(record.abrev); 
            $("#addHDineroTxtPrecio").val(record.precio); 
            $("#addHDineroTxtUMedida").attr("data-info", record.codMedida);
        },
        onBeforeLoad: function(node, param) {
            winComboCComercialHD = $.messager.progress({
                title: 'Espere Por Favor',
                msg: 'Los Datos se están Consultado...',
                zIndex: 9999999  // Ajusta este valor según sea necesario
            });
        },
        onLoadSuccess: function () {
            var data = $(this).combobox('getData');
            if (sValue !== undefined) {
                $("#" + comboId).combobox('setValue', sValue);
            } else {
                if (data.length > 0) {
                    $(this).combobox('setValue', data[0].id);
                }
            }
            winComboCComercialHD.window("close");
        }
    });
}

function loadCampaniaHDinero(comboId, sValue) {
            $("#" + comboId).combobox({
                valueField: 'id',
                textField: 'text',
                editable: false,
                panelHeight: 'auto',
                method: 'post',
                width: 145,
                url: 'ListaCampaniaCmbx',
                onSelect: function (f) {
                },
                onLoadSuccess: function () {
                    var data = $(this).combobox('getData');
                    if (sValue !== undefined) {
                        $("#" + comboId).combobox('setValue', sValue);
                    }
                    else 
                    {
                        if (data.length > 0) {
                            $(this).combobox('setValue', data[0].id);
                        }                        
                    }
                    
                }
            });          
 }

function loadTipoDocHDinero(comboId, sValue,Id) {
    $("#" + comboId).combobox({
        valueField: 'id',
        textField: 'text',
        editable: false,
        panelHeight: 'auto',
        method: 'post',
        width: 120,
        url: 'ListaTipoDocumentoHDineroCmbx', 
        queryParams:{codDoc:Id},// Asegúrate de apuntar al servlet o endpoint correcto
        onSelect: function (record) {
            $("#addHDineroTxtImpuesto").val(record.impuesto); 
        },
        onLoadSuccess: function () {
            var data = $(this).combobox('getData');
            if (sValue !== undefined) {
                $("#" + comboId).combobox('setValue', sValue);
            } else {
                if (data.length > 0) {
                    $(this).combobox('setValue', data[0].id);
                }
            }
        }
    });
}

function TblHDinero() { 
    $('#tblHDinero').datagrid({
        columns: [[        
            {field:"codPredio",hidden:true},
            {field:"codHabilitacion",hidden:true},
            {field:"codDetalle",hidden:true},
            {field:"codCampania",hidden:true},
            {field:"codCultivo",hidden:true},
            {field:"codTipoDoc",hidden:true},
            {field:"estado",hidden:true},
            {field:"nombreProductor",title:'Productor',width:190, styler: cellStyler},
            {field:"nombrePredio",title:'Predio',width:120, styler: cellStyler},
            {field:"uc",title:'Cod.Predio',width:80, styler: cellStyler},
            {field:"tipoDoc",title:'T.Doc',width:70, styler: cellStyler},
            {field:"nroComprobante",title:'Nro Comprobante',width:150, styler: cellStyler},
            {field:"moneda",title:'Moneda',width:70,align:'center', styler: cellStyler},
            {field:"fecha",title:'F. Emisión',width:80,align:'center', styler: cellStyler},
            {field:"valorVentaD",hidden:true,title:'V. Venta $',width:90,align:'right', styler: cellStyler},
            {field:"impuestoD",hidden:true,title:'Impuesto $',width:90,align:'right', styler: cellStyler},
            {field:"ImporteD",title:'Importe $',width:90,align:'right', styler: cellStyler},
            {field:"valorVentaS",hidden:true,title:'V. Venta S/',width:90,align:'right', styler: cellStyler},
            {field:"impuestoS",hidden:true,title:'Impuesto S/',width:90,align:'right', styler: cellStyler},
            {field:"ImporteS",title:'Importe S/',width:90,align:'right', styler: cellStyler}
        ]],
        singleSelect: true,
        autoRowHeight: false,
        rownumbers:true,
        pagination:true,
        title:"Lista de Habilitaciones de Dinero",
        width: 'auto',
        height: 599,
        pageSize:20,
        method:'post',
        toolbar: '#tbHDinero',
        url:"ListaHabilitacionDineroTbl",
        queryParams:{fInicio:obtenerFechaActual(),fFin:obtenerFechaActual()},
        onSelect: function(rowIndex, rowData) {},
        onUnselect: function(rowIndex, rowData) {},
        onSelectAll: function(rows) {},
        onUnselectAll: function(rows) {}
    });
}

function cellStyler(value, row, index) {
    if (row.estado === '0') {
        return 'color:red;';
    }
}

function TblHDineroq()
{    
    const comprobante = $("#hdinero_NroComprobtBsq").val().trim();
    const fInicio = $("#hdinero_FInicioBsq").val();
    const fFin = $("#hdinero_FFinBsq").val();    
    
    $("#tblHDinero").datagrid('load',
    {
        comprobante: comprobante,
        fInicio : fInicio,
        fFin : fFin
    });
}

function TblDetallesComprobanteHabiDinero()
{ 
    $('#tblDetalleHDinero').datagrid({
                            columns: [[                                    
                            {field:"codElemento",hidden:true},
                            {field:"vConcepto",title:'Descripción',width:250},
                            {field:"dcPrecio",title:'Precio',width:80,align:'right'},
                            {field:"dcCantidad",title:'Cantidad',width:80,align:'right'},
                            {field:"PrecioVentaT",title:'V.Venta',width:80,align:'right'},         
                            {field:"ImpuestoT",title:'Igv',width:65,align:'right'},         
                            {field:"ImporteT",title:'Importe',width:80,align:'right'},
                            {field:"dcPrecioVentaD",hidden:true},         
                            {field:"dcImpuestoD",hidden:true},         
                            {field:"dcImporteD",hidden:true},  
                            {field:"dcPrecioVenta",hidden:true},
                            {field:"dcImpuesto",hidden:true},
                            {field:"dcImporte",hidden:true},  
                            {field:"htmlOpcion",title:'Opcion',width:80,align:'center'},   
                            {field:"fechaPrecio",hidden:true},   
                            {field:"codMedida",hidden:true},         
                            {field:"abreviatura",hidden:true},         
                            {field:"Moneda",hidden:true},         
                            {field:"tVenta",hidden:true},         
                            {field:"tCompra",hidden:true},         
                            {field:"valorImpuesto",hidden:true}
                            ]],
                            singleSelect: true,
                            autoRowHeight: false,
                            rownumbers:false,
                            collapsible:true,
                            pagination:false,
                            showFooter:true,
                            width: 750,
                            height: 150,
                            queryParams:{comision:1},
                            onLoadSuccess:function(){
                            }
                        });  
    
                       
                          
}

function AddHDineroAddTblDetalleImporte(Importe) {
    
    if(!isNaN(parseFloat(Importe)) && parseFloat(Importe)>0)
    {
        let codigo = $('#addHDineroCmbxCComercial').combobox('getValue');
        let data = $('#addHDineroCmbxCComercial').combobox('getData');
        let selectedRecord = data.find(item => item.id == codigo);
        if (selectedRecord) 
        {            
            var rows = $('#tblDetalleHDinero').datagrid('getRows');

            var exists = rows.some(function(row) {
                return parseInt(row.codElemento) === parseInt(codigo);
            });
            if (exists) {
                showNotification('warning', 'El código del elemento ya existe en la tabla.');
                return;
            } 
            else 
            {
                let dcTipoCambio = $("#addHDineroTxtTipoC").val().trim();
                if (dcTipoCambio !== "0") {
                    let detalle = $('#addHDineroCmbxCComercial').combobox('getText');
                    const moneda = document.getElementById('addHDineroCmbxMoneda').value;
                    let dcimpuesto = new Decimal($("#addHDineroTxtImpuesto").val().trim());
                    let dcimpuestoCalculo = parseFloat($("#addHDineroTxtImpuesto").val().trim())+1;
                    let dcTipoCambioDecimal = new Decimal(dcTipoCambio);
                    let valorVentaDolares,ImporteDolares,impuestoDolares;
                    let valorVentaSoles,ImporteSoles,impuestoSoles;
                    let valorVentaT,ImporteT,impuestoT;
                    if(moneda === "S")
                    {   
                        valorVentaSoles = redondea2Decimales((Importe));                    
                        ImporteSoles = redondea2Decimales((valorVentaSoles*dcimpuestoCalculo));
                        impuestoSoles = (ImporteSoles-valorVentaSoles);

                        valorVentaDolares = redondea2Decimales((Importe/dcTipoCambioDecimal));                    
                        ImporteDolares = redondea2Decimales((valorVentaDolares*dcimpuestoCalculo));
                        impuestoDolares = (ImporteDolares-valorVentaDolares);
                        valorVentaT = valorVentaSoles;
                        ImporteT = ImporteSoles;
                        impuestoT = impuestoSoles;

                    }
                    else
                    {                    
                        valorVentaDolares = redondea2Decimales(Importe);
                        ImporteDolares = redondea2Decimales((valorVentaDolares*dcimpuestoCalculo));
                        impuestoDolares = (ImporteDolares-valorVentaDolares);

                        valorVentaSoles = redondea2Decimales((Importe*dcTipoCambioDecimal));
                        ImporteSoles = redondea2Decimales((valorVentaSoles*dcimpuestoCalculo));
                        impuestoSoles = (ImporteSoles-valorVentaSoles);

                        valorVentaT = valorVentaDolares;
                        ImporteT = ImporteDolares;
                        impuestoT = impuestoDolares;

                    }


                    $('#tblDetalleHDinero').datagrid('appendRow', {
                        codElemento: parseInt(codigo),
                        vConcepto: detalle,
                        dcPrecio: 0.00,
                        dcCantidad: 0.00,
                        PrecioVentaT: valorVentaT,
                        ImpuestoT: redondea2Decimales(impuestoT),
                        ImporteT: ImporteT,
                        dcPrecioVentaD: valorVentaDolares,
                        dcImpuestoD: redondea2Decimales(impuestoDolares),
                        dcImporteD: ImporteDolares,
                        dcPrecioVenta: valorVentaSoles,
                        dcImpuesto: redondea2Decimales(impuestoSoles),
                        dcImporte: ImporteSoles,
                        htmlOpcion: `<a href="javascript:void(0);" onclick="AddHDineroDeleteTblDetalle(${codigo})"><img src="INI/imagenes/icons8-menos-16.png"></button></a>`,
                        fechaPrecio: $("#addHDineroDateFecha").val().trim(),
                        codMedida: selectedRecord.codMedida,
                        abreviatura: selectedRecord.abrev,
                        Moneda: $("#addHDineroCmbxMoneda").val().trim(),
                        tVenta: $("#addHDineroTxtTipoC").val().trim(),
                        tCompra: $("#addHDineroTxtTipoC").attr("data-info"),
                        valorImpuesto: dcimpuesto
                    });
                    AddHDineroCalcularTotales($('#tblDetalleHDinero').datagrid('getData'));
                } else {
                    showNotification('error', 'Debe Debera Ingresar un Tipo de Cambio, valido desde el menu Tipo de Cambio.');
                }
            }
        } 
        else 
        {
            showNotification('error', 'No hay un registro seleccionado.');
        }
    }
    else
    {
        showNotification('warning', 'Debe ingresar una cantidad valida.');
    }

}

function AddHDineroCalcularTotales(data) {
    let listValorVentTotalD = new Decimal(0);
    let unitImpuestTotalD = new Decimal(0);
    let unitImportTotalD = new Decimal(0);
    let listValorVentTotalS = new Decimal(0);
    let unitImpuestTotalS = new Decimal(0);
    let unitImportTotalS = new Decimal(0);
    let listValorVentTT = new Decimal(0);
    let unitImpuestTT = new Decimal(0);
    let unitImportTT = new Decimal(0);

    for (var i = 0; i < data.rows.length; i++) {
        listValorVentTT = listValorVentTT.add(new Decimal(data.rows[i].PrecioVentaT || 0));
        unitImpuestTT = unitImpuestTT.add(new Decimal(data.rows[i].ImpuestoT || 0));
        unitImportTT = unitImportTT.add(new Decimal(data.rows[i].ImporteT || 0));
        listValorVentTotalD = listValorVentTotalD.add(new Decimal(data.rows[i].dcPrecioVentaD || 0));
        unitImpuestTotalD = unitImpuestTotalD.add(new Decimal(data.rows[i].dcImpuestoD || 0));
        unitImportTotalD = unitImportTotalD.add(new Decimal(data.rows[i].dcImporteD || 0));
        listValorVentTotalS = listValorVentTotalS.add(new Decimal(data.rows[i].dcPrecioVenta || 0));
        unitImpuestTotalS = unitImpuestTotalS.add(new Decimal(data.rows[i].dcImpuesto || 0));
        unitImportTotalS = unitImportTotalS.add(new Decimal(data.rows[i].dcImporte || 0));
    }

    var footerData = [{
        dcCantidad: 'Total:',
        PrecioVentaT: redondea2Decimales(listValorVentTT),
        ImpuestoT: redondea2Decimales(unitImpuestTT),
        ImporteT: redondea2Decimales(unitImportTT),
        dcPrecioVentaD: redondea2Decimales(listValorVentTotalD),
        dcImpuestoD: redondea2Decimales(unitImpuestTotalD),
        dcImporteD: redondea2Decimales(unitImportTotalD),
        dcPrecioVenta: redondea2Decimales(listValorVentTotalS),
        dcImpuesto: redondea2Decimales(unitImpuestTotalS),
        dcImporte: redondea2Decimales(unitImportTotalS)
    }];

    $('#tblDetalleHDinero').datagrid('reloadFooter', footerData);
}

function AddHDineroDeleteTblDetalle(codElemento) {
    var rows = $('#tblDetalleHDinero').datagrid('getRows');

    for (var i = 0; i < rows.length; i++) {
        if (rows[i].codElemento === codElemento) {
            var index = $('#tblDetalleHDinero').datagrid('getRowIndex', rows[i]);

            if (index >= 0) {
                $('#tblDetalleHDinero').datagrid('deleteRow', index);
                AddHDineroCalcularTotales($('#tblDetalleHDinero').datagrid('getData')); // Calcular totales después de eliminar una fila
            }
            break;
        }
    }
}


function ObtenerTipoCambio(dateId,textId,valorFecha)
{
            let fecha = $("#" + dateId).val();
            if (valorFecha !== undefined) {
                fecha = valorFecha;
            } 
            let partsOfDateEmision = (fecha).split("-");
            if(parseInt(partsOfDateEmision[0]) > 1900){ 
                try{
                    $.post("ObtenerTipoCambioBd",{
                        dFecha: fecha
                    }, function(data) {
                           $("#" + textId).val(data.TVenta);
                           $("#" + textId).attr("data-info", data.TCompra);
                    }).fail(function(xhr, status, error) {
                        // Manejar errores en la solicitud POST
                        $("#" + textId).val("-1");
                        $("#" + textId).attr("data-info", "-1");
                    });
                }catch (e){
                    // Manejar errores en la solicitud POST
                    $("#" + textId).val("0");
                    $("#" + textId).attr("data-info", "0");
                }
            }
    
}

function TblListaPrediosHDinero()
{ 
    var codCampania = $("#addHDineroCmbxCampania").combobox('getValue');
    let winTblListaPrediosHP;  
     $('#tblListaPrediosHDinero').datagrid({
                            columns: [[        
                            {field:"codProductor",hidden:true},
                            {field:"codPredio",hidden:true},
                            {field:"codHabilitacion",hidden:true},
                            {field:"Productor",title:'Productor',width:270},
                            {field:"Documento",title:'Dni/Ruc',width:70},
                            {field:"Predio",title:'Predio',width:170},
                            {field:"Uc",title:'Cod. Predio',width:70},
                            {field:"Porcentaje",hidden:true},
                            {field:"AreaInstalada",hidden:true}
                            ]],
                            singleSelect: true,
                            autoRowHeight: false,
                            rownumbers:true,
                            pagination:true,
                           // title:"Padron de Productores",
                            width: 'auto',
                            height: 299,
                            pageSize:20,
                            method:'post',
                            url:"ListaPrediosConFinanciamientoTbl",       
                            queryParams:{campania:codCampania},                         
                            onBeforeLoad: function(param) {
                                winTblListaPrediosHP = $.messager.progress({
                                    title: 'Espere Por Favor',
                                    msg: 'Los Datos se están Consultado...',
                                    zIndex: 9999999  // Ajusta este valor según sea necesario
                                });
                            },
                            onLoadSuccess: function (data) {
                                $.messager.progress('close');
                            },
                            onDblClickRow: function(index, row) {
                                AddHDineroTblListaPrediosSeleccionar();
                            },
                            onSelect: function(rowIndex, rowData)
                            {
                            },
                            onUnselect: function(rowIndex, rowData){
                            },
                            onSelectAll: function(rows){
                            },
                            onUnselectAll: function(rows){
                            }
                        });               
                        
}

function TblListaPrediosHDineroBsq()
{    
    const nombre = $("#addHDineroDlgListaPrdTxtProductor").val().trim();
    const documento = $("#addHDineroDlgListaPrdTxtDocumento").val().trim();
    var codCampania = $("#addHDineroCmbxCampania").combobox('getValue');
    //Recarga la tabla
   
    $("#tblListaPrediosHDinero").datagrid('load',
    {
        nombre: nombre,
        documento : documento,
        campania : codCampania
    });
}

function AddHDineroTblListaPrediosSeleccionar()
{    
    const row = $('#tblListaPrediosHDinero').datagrid('getSelected');
    if (row)
    {
        $("#addHDineroTxtPredio").val(row.Predio); 
        $("#addHDineroTxtPredio").attr("data-info", row.codPredio);
        $("#addHDineroTxtUc").val(row.Uc); 
        $("#addHDineroTxtProductor").val(row.Productor); 
        $("#addHDineroTxtProductor").attr("data-info", row.codProductor);
        $("#addHDineroTxtAreaInst").val(row.AreaInstalada); 
        $("#addHDineroTxtInteres").val(row.Porcentaje); 
        $('#addHDineroCmbxCampania').combobox('disable');
        $( "#dlgListaPrediosHDinero" ).dialog( "close" );  
        $('#addHDinerodlgAgregarBtnNewPrd').linkbutton('enable');
        // Deshabilitar el botón visualmente
        $('#addHDinerodlgAgregarBtnBsqPrd').linkbutton('disable');
        // Remover el evento click
        $('#addHDinerodlgAgregarBtnBsqPrd').off('click');

    }
    else
    {
        showNotification('warning', 'Debe Seleccionar una Fila');
    }
}

function InicializarDlgAgregarHDinero()
{
    $('#addHDinerodlgAgregarBtnNewPrd').linkbutton('disable');
    $('#addHDinerodlgAgregarBtnBsqPrd').linkbutton('enable');
    $('#addHDinerodlgAgregarBtnBsqPrd').on('click', function(event) {
       $( "#dlgListaPrediosHDinero" ).dialog( "open" );  
       var dg = $('#tblListaPrediosHDinero');
        if (!dg.data('datagrid')){ TblListaPrediosHDinero();
        }
        else
        {
          TblListaPrediosHDineroBsq();  
        }
    });
    loadCComercialHDinero('addHDineroCmbxCComercial');
    loadCampaniaHDinero('addHDineroCmbxCampania');
    $("#addHDineroTxtTipoC").attr("disabled", "disabled");
    $("#addHDineroDateFecha").val(obtenerFechaActual());
    ObtenerTipoCambio('addHDineroDateFecha','addHDineroTxtTipoC',obtenerFechaActual());
    $("#addHDineroTxtPredio").val(""); 
    $("#addHDineroTxtPredio").attr("data-info", "0");
    $("#addHDineroTxtUc").val(""); 
    $("#addHDineroTxtProductor").val(""); 
    $("#addHDineroTxtProductor").attr("data-info", "0");
    $("#addHDineroTxtAreaInst").val(""); 
    $("#addHDineroTxtNumero").val(""); 
    
}

function ActivarBotonNewHDinero()
{
    $('#addHDineroCmbxCampania').combobox('enable');
    $('#addHDinerodlgAgregarBtnNewPrd').linkbutton('disable');
    $('#addHDinerodlgAgregarBtnBsqPrd').linkbutton('enable');
    // Agregar un evento click que prevenga la acción predeterminada
    $('#addHDinerodlgAgregarBtnBsqPrd').on('click', function(event) {
       $( "#dlgListaPrediosHDinero" ).dialog( "open" );  
       var dg = $('#tblListaPrediosHDinero');
        if (!dg.data('datagrid')){ TblListaPrediosHDinero();
        }
        else
        {
          TblListaPrediosHDineroBsq();  
        }
    });
    $("#addHDineroTxtPredio").val(""); 
    $("#addHDineroTxtPredio").attr("data-info", "0");
    $("#addHDineroTxtUc").val(""); 
    $("#addHDineroTxtProductor").val(""); 
    $("#addHDineroTxtProductor").attr("data-info", "0");
    $("#addHDineroTxtAreaInst").val(""); 
}

function saveDataHDinero() {
    var codPredio = $("#addHDineroTxtPredio").attr("data-info"); // Supongamos que tienes otros parámetros en tu formulario
    var codCampania = $("#addHDineroCmbxCampania").combobox('getValue');
    var cultivo = 1;
    var codTipoDoc = $("#addHDineroCmbxTipoDoc").combobox('getValue');
    var moneda = $("#addHDineroCmbxMoneda").val().trim();
    var fechaEmision = $("#addHDineroDateFecha").val().trim();
    var tcVenta = $("#addHDineroTxtTipoC").val().trim();
    var tcCompra = $("#addHDineroTxtTipoC").attr("data-info");
    var interes = $("#addHDineroTxtInteres").val().trim();
    var codEmpresa = 1; //Proveedor
    var Glosa = $("#addHDineroTxtGlosa").val().trim();
    var NroComprobante = $("#addHDineroTxtNumero").val().trim();
    var Ruc='20510360428'; //Proveedor
    var areaInst = $("#addHDineroTxtAreaInst").val().trim();
    var data = $('#tblDetalleHDinero').datagrid('getRows');
    var footerData = $('#tblDetalleHDinero').datagrid('getFooterRows')[0];
      // Eliminar el campo 'htmlOpcion' de cada fila
    data.forEach(function(row) {
        delete row.htmlOpcion;
        delete row.vConcepto;
        
        if (row.dcPrecio) {
            row.dcPrecio = parseFloat(row.dcPrecio);
        }
        if (row.dcCantidad) {
            row.dcCantidad = parseFloat(row.dcCantidad);
        }
        if (row.tVenta) {
            row.tVenta = parseFloat(row.tVenta);
        }
        if (row.valorImpuesto) {
            row.valorImpuesto = parseFloat(row.valorImpuesto);
        }
        
    });
    
    if(codPredio!=="0" && codCampania.length>0 && interes.length>0 && areaInst.length>0 && NroComprobante.length>0 && tcVenta!=="0")
    {
        if( data.length>0)
        {
            let winAddHDinero;
            $.ajax({
                type: 'POST',
                url: 'AgregarHabilitacionPredio', // URL del servlet
                data: JSON.stringify({
                    dataGrid: data,
                    footer: footerData,
                    codPredio: codPredio,codCampania: codCampania,cultivo: cultivo,codTipoDoc: codTipoDoc,moneda: moneda,fechaEmision: fechaEmision,
                    tcVenta: tcVenta,tcCompra: tcCompra,interes: interes,codEmpresa: codEmpresa,Glosa: Glosa,NroComprobante: NroComprobante,
                    Ruc: Ruc, areaInst:areaInst
                }),
                contentType: 'application/json',
                beforeSend: function () {
                    winAddHDinero = $.messager.progress({
                        title: 'Espere Por Favor',
                        msg: 'Los Datos se están Guardando...'
                    });
                },
                success: function (data) {
                    var res = data.trim();
                    var result = res.substr(0, 2);
                    switch(result) {
                        case "ok":
                            $( "#dlgAgregarHDinero" ).dialog( "close" );
                            TblHDineroq();
                            showNotification('success', res.substring(2));
                            break;
                        case "av":
                            showNotification('warning', res.substring(2));
                            break;
                        case "er":
                            showNotification('error', res.substring(2));
                            break;
                        case "ex":
                                $.messager.defaults.ok = 'Ok';
                                  $.messager.alert({
                                     title: 'Sesión Expirada',
                                     msg: 'Su sesión ha expirado. Será redirigido a la página principal.',
                                     icon:'info',
                                     onClose: function(){
                                        window.location.href = 'index.jsp';
                                     },
                                     fn: function(){
                                        window.location.href = 'index.jsp';
                                     }
                                });
                            break;
                        default:
                            showNotification('info', res.substring(2));
                            break;
                    }
                    winAddHDinero.window("close");
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.status === 500) {
                        showNotification('error', 'Error interno del servidor.'); // Mensaje claro para el usuario
                    } else {
                        showNotification('error', 'Ocurrió un error inesperado.');
                    }
                    winAddHDinero.window("close");
                }
            });
        } 
        else
        {
            showNotification('warning', "El Contenido del Comprobante, esta Vacio.");
        }
        
    } 
    else
    {
        showNotification('warning', "Existen Campos Vacios.");
    }
}

function GenerarReciboPdf()
{
    const row = $('#tblHDinero').datagrid('getSelected');
    if (row)
    {
        let param = { 'codDetalle' : row.codDetalle,'tipoDoc' : row.codTipoDoc,'estado':row.estado};
                 
        OpenWindowWiths("Reporte/GenerarReciboPdf.jsp", 
          "width=930,height=345,left=100,top=100,resizable=yes,scrollbars=yes", 
          "NewFile", param);
    }
    else
    {
        showNotification('warning', 'Debe ingresar una cantidad valida.');
    }
}

function anularHDinero()
{
    const row = $('#tblHDinero').datagrid('getSelected');
    if (row)
    {
        $.messager.confirm({
                title: 'Confirmar',
                msg: 'Esta Seguro de Eliminar el Registro, Seleccionado?',
                ok: 'Si',
                cancel: 'No',
                fn: function(r){
                        if (r)
                        {                            
                            const parametros = {"codDetalle": row.codDetalle,"codHabilitacion": row.codHabilitacion};   

                            let winAnularClase;
                            $.ajax({
                                data: parametros,
                                url: 'AnularHabilitacionPredio',
                                type: 'post',
                                beforeSend: function () {
                                    winAnularClase = $.messager.progress({
                                        title: 'Espere Por Favor',
                                        msg: 'Los Datos se están Guardando...'
                                    });
                                },
                                success: function (data) {
                                    var res = data.trim();
                                    var result = res.substr(0, 2);
                                    switch(result) {
                                        case "ok":
                                            showNotification('success', res.substring(2));
                                            break;
                                        case "av":
                                            showNotification('warning', res.substring(2));
                                            break;
                                        case "er":
                                            showNotification('error', res.substring(2));
                                            break;
                                        case "ex":
                                                $.messager.defaults.ok = 'Ok';
                                                  $.messager.alert({
                                                     title: 'Sesión Expirada',
                                                     msg: 'Su sesión ha expirado. Será redirigido a la página principal.',
                                                     icon:'info',
                                                     onClose: function(){
                                                        window.location.href = 'index.jsp';
                                                     },
                                                     fn: function(){
                                                        window.location.href = 'index.jsp';
                                                     }
                                                });
                                            break;
                                        default:
                                            showNotification('info', res.substring(2));
                                            break;
                                    }
                                    winAnularClase.window("close");
                                    TblHDineroq();
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    if (jqXHR.status === 500) {
                                        showNotification('error', 'Error interno del servidor.'); // Mensaje claro para el usuario
                                    } else {
                                        showNotification('error', 'Ocurrió un error inesperado.');
                                    }
                                    winAnularClase.window("close");
                                }
                            });
                        }
                }
        });
    }
    else
    {
        showNotification('warning', 'Debe Seleccionar una Fila');
    }
}

function openHabilitacionDinero ()
{
    var selectMoneda = $('#addHDineroCmbxMoneda');
    selectMoneda.empty();
    var options = {
                'S': 'S/',
                'D': '$'
            };
    let rbtMonedaValue = $('#addHDineroDlgMonedaRbtn').radiogroup('getValue');
    if (rbtMonedaValue && options[rbtMonedaValue]) {
        selectMoneda.append('<option value="' + rbtMonedaValue + '" selected="true">' + options[rbtMonedaValue] + '</option>');
        $( "#dlgMonedaHDinero" ).dialog( "close" ); 
        TblDetallesComprobanteHabiDinero();                
        $('#tblDetalleHDinero').datagrid('loadData', { total: 0, rows: [] }); 
        AddHDineroCalcularTotales($('#tblDetalleHDinero').datagrid('getData'));
        loadTipoDocHDinero('addHDineroCmbxTipoDoc',2,2);
        $( "#dlgAgregarHDinero" ).dialog( "open" );
        InicializarDlgAgregarHDinero(); 
    }
}


function accessHDinero()
{
    var tmpURL = window.location.href;
    var rx = tmpURL.split('/');
    var rxx = rx[4].split('?');
     var dato_param = rxx[0];
    var menu = 0;
    if(dato_param)
    {
        menu = dato_param;  
        $.post('ObtenerAcciones', {"menu":menu}, function( dataDx ) {
                    var resDx = dataDx.trim();
                    var s = resDx.split('_');
                    
            toggleButton("addHDineroBtn", s[0] === '1', function() {
                /* */
                $('#addHDineroDlgMonedaRbtn').radiogroup('setValue', 'S');
                $( "#dlgMonedaHDinero" ).dialog( "open" );
            });
/*
            toggleButton("editPrediosBtn", s[1] === '1', function() {
                openCamposEditPredio();
            });*/

            toggleButton("anularHDineroBtn", s[2] === '1', function() {
                anularHDinero();
            });
            
        }); 
    }
}


            

