/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 $(document).ready(function() {            
           
          
            $("#hpredio_FInicioBsq").val(obtenerFechaActual());    
            $("#hpredio_FFinBsq").val(obtenerFechaActual());
            TblHPredio();
            accessHPredio();
            $('#addHPredioDateFecha').on("change",
                function(){
                    ObtenerTipoCambio('addHPredioDateFecha','addHPredioTxtTipoC');
                }
            );
            $("#hpredioBtnBusqTbl").on('click',function(event){
                TblHPrediosq(); 
            });
 
 
            $("#addHPrediodlgAgregarBtnBsqPrd").on('click',function(event){
               var dg = $('#tblListaPrediosHPredio');
                if (!dg.data('datagrid')){ TblListaPrediosHPredio();
                }
                else
                {
                    TblListaPrediosHPredioBsq();
                }
               $( "#dlgListaPrediosHPredio" ).dialog( "open" );   
            });
 
            $("#addHPrediodlgAgregarBtnNewPrd").on('click',function(event){
               ActivarBotonNewHPredio();  
            });            

            $("#reporteHPredioBtn").on('click',function(event){
                GenerarReciboPdf();
            });
            
            $("#dlgAddHPredioBtnCancelar").on('click',function(event){
                var isValid = $('#formRegHPredio').form('validate'); // Validar el formulario
                if (isValid) {
                    $( "#dlgAgregarHPredio" ).dialog( "close" ); // Cerrar el diálogo si el formulario es válido
                } else {
                    // Mostrar un mensaje de error o realizar alguna acción si el formulario no es válido
                    console.log('El formulario no es válido. No se puede cerrar el diálogo.');
                }
                // Evitar que el evento de clic se propague y evite cualquier comportamiento predeterminado del navegador
                event.preventDefault();
                event.stopPropagation();
            });
            
            $("#addHPredioDlgMonedaBtnCancelar").on('click',function(event){
                var isValid = $('#formMonedaHPredio').form('validate'); // Validar el formulario
                if (isValid) {
                    $( "#dlgMonedaHPredio" ).dialog( "close" ); // Cerrar el diálogo si el formulario es válido
                } else {
                    // Mostrar un mensaje de error o realizar alguna acción si el formulario no es válido
                    console.log('El formulario no es válido. No se puede cerrar el diálogo.');
                }
                // Evitar que el evento de clic se propague y evite cualquier comportamiento predeterminado del navegador
                event.preventDefault();
                event.stopPropagation();
            });
            
            $("#addHPredioDlgListaBtnSeleccionar").on('click',function(event){
                AddHPredioTblListaPrediosSeleccionar();  
            }); 
            $("#addHPredioDlgListaBtnCancelar").on('click',function(event){
               $( "#dlgListaPrediosHPredio" ).dialog( "close" );  
            }); 
            
            
            
            $('#hpredio_NroComprobtBsq').keyup(function(event) {
                var key=event.keyCode || event.which;
                 if (key===13)
                 {
                   TblHPrediosq();  
                 } 
             });
             
                         
            $("#formRegHPredio").submit(function(event) {
                event.preventDefault(); // Detiene el evento por defecto del Formulario
                saveData();

            });
            
            $("#formMonedaHPredio").submit(function(event) {
                event.preventDefault(); // Detiene el evento por defecto del Formulario
                openHabilitacionPredio();

            });
            
            //Solo Números
            //MAYUSCULAS
            soloNumeros("#addHPredioTxtAreaInst");
            soloMayusculas("#addHPredioTxtNumero");

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
/*    
function loadCComercialHPredio(comboId, sValue) {
    let winComboCComercialHP;
    $("#" + comboId).combobox({
        valueField: 'id',
        textField: 'text',
        editable: true,
        panelHeight: 'auto',
        method: 'post',
        width: 420,
        url: 'ListaCatalogoComercialCmbxVenta', // Asegúrate de apuntar al servlet o endpoint correcto
        onSelect: function (record) {
            $("#addHPredioTxtUMedida").val(record.abrev); 
            $("#addHPredioTxtPrecio").val(record.precio); 
            $("#addHPredioTxtUMedida").attr("data-info", record.codMedida);
            
                    var inputContainer = $("#inputContainer");
                    inputContainer.empty();

                    if (record.cPrecio === 'S') {
                        inputContainer.append(`
                            
                                <label for="addHPredioTxtCantidad">Cantidad1</label>
                                <input id="addHPredioTxtCantidad" class="easyui-textbox" style="width:100px;" data-options="
                                    prompt: '0.00',
                                    value: '',
                                    validType: 'decimal[2]',
                                    icons:[{
                                        iconCls:'icon-add',
                                        handler: function(e){
                                            var $textbox = $(e.data.target);
                                            var v = $textbox.textbox('getValue');
                                            alert('ola');
                                            if (v) {
                                                v = parseFloat(v).toFixed(2);
                                                AddHPredioAddTblDetalle(v);
                                                $textbox.textbox('setValue','');
                                            }
                                            else {
                                                showNotification('warning', 'Debe ingresar una cantidad valida.');
                                            }
                                        }
                                    }]
                                ">
                           
                        `);
               
                    } else if (record.cPrecio === 'N') {
                        inputContainer.append(`
                            
                                <label for="addHPredioTxtCantidad">V. Venta2</label>
                                <input id="addHPredioTxtCantidad" class="easyui-textbox" style="width:100px;" data-options="
                                    prompt: '0.00',
                                    value: '',
                                    validType: 'decimal[2]',
                                    onKeyDown: function(e){
                                        console.log('Key pressed:', e.which); // Añade un console.log para depuración
                                        if (e.which == 13) {
                                            e.preventDefault(); // Previene el envío del formulario
                                            var v = $(this).textbox('getValue');
                                            if (v) {
                                                v = parseFloat(v).toFixed(2);
                                                AddHPredioAddTblDetalleImporte(v);
                                                $(this).textbox('setValue', '');
                                            } else {
                                                showNotification('warning', 'Debe ingresar una cantidad válida.');
                                            }
                                        }
                                    },    
                                    icons:[{
                                        iconCls:'icon-add',
                                        handler: function(e){
                                            var $textbox = $(e.data.target);
                                            var v = $textbox.textbox('getValue');

                                            if (v) {
                                                v = parseFloat(v).toFixed(2);
                                                AddHPredioAddTblDetalleImporte(v);
                                                $textbox.textbox('setValue','');
                                            }
                                            else {
                                                showNotification('warning', 'Debe ingresar una cantidad valida.');
                                            }
                                        }
                                    }]
                                ">
                           
                        `);
                    }

                    $.parser.parse(inputContainer);
        },
        onBeforeLoad: function(node, param) {
            winComboCComercialHP = $.messager.progress({
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
            winComboCComercialHP.window("close");
        }
    });
}
*/
function loadCComercialHPredio(comboId, sValue) {
    let winComboCComercialHP;
    $("#" + comboId).combobox({
        valueField: 'id',
        textField: 'text',
        editable: true,
        panelHeight: 'auto',
        method: 'post',
        width: 420,
        url: 'ListaCatalogoComercialCmbxVenta',
        onSelect: function (record) {
            let prefer = $("#addHPredioTxtUc").attr("data-info");

            if (prefer.length === 0) {
                // Cancelar la selección restableciendo el valor del combobox al anterior o dejarlo vacío
                setTimeout(() => {
                    $("#" + comboId).combobox('clear'); 
                }, 0);

                showNotification('warning', 'Primero debe Seleccionar un Predio, en el Boton Buscar.');
                return; // Terminar la ejecución del evento onSelect
            }

                $("#addHPredioTxtUMedida").val(record.abrev); 
                $("#addHPredioTxtUMedida").attr("data-info", record.codMedida);

               if(prefer==="S")
               {
                $("#addHPredioTxtPrecio").val(record.precioPref);  
               }
               else
               {
                $("#addHPredioTxtPrecio").val(record.precio);   
               }

                var inputContainer = $("#inputContainer");
                inputContainer.empty();

                // Variable para almacenar la función correspondiente según cPrecio
                let addFunction;

                if (record.cPrecio === 'S') {
                    inputContainer.append(`
                        <label for="addHPredioTxtCantidad">Cantidad</label>
                        <input id="addHPredioTxtCantidad" class="easyui-textbox" style="width:100px;" data-options="
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
                                        AddHPredioAddTblDetalle(v);
                                        $textbox.textbox('setValue','');
                                    }
                                    else {
                                        showNotification('warning', 'Debe ingresar una cantidad valida.');
                                    }
                                }
                            }]
                        ">
                    `);
                    // Asigna la función AddHPredioAddTblDetalle
                    addFunction = AddHPredioAddTblDetalle;
                } else if (record.cPrecio === 'N') {
                    inputContainer.append(`
                        <label for="addHPredioTxtCantidad">V. Venta</label>
                        <input id="addHPredioTxtCantidad" class="easyui-textbox" style="width:100px;" data-options="
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
                                        AddHPredioAddTblDetalleImporte(v);
                                        $textbox.textbox('setValue','');
                                    }
                                    else {
                                        showNotification('warning', 'Debe ingresar una cantidad valida.');
                                    }
                                }
                            }]
                        ">
                    `);
                    // Asigna la función AddHPredioAddTblDetalleImporte
                    addFunction = AddHPredioAddTblDetalleImporte;
                }

                // Procesa el nuevo contenido de EasyUI
                $.parser.parse(inputContainer);

                // Asigna el evento keydown después de que EasyUI haya procesado el contenido
                $('#addHPredioTxtCantidad').textbox().textbox('textbox').on('keydown', function(e) {
                    if (e.which == 13) {
                        e.preventDefault(); // Previene el envío del formulario
                        var v = $(this).val(); // Usamos .val() porque estamos dentro del input de texto real
                        if (v) {
                            v = parseFloat(v).toFixed(2);
                            addFunction(v); // Llama a la función correspondiente
                            $(this).val(''); // Usamos .val() para limpiar el valor
                        } else {
                            showNotification('warning', 'Debe ingresar una cantidad válida.');
                        }
                    }
                });
            
        },
        onBeforeLoad: function(node, param) {
            winComboCComercialHP = $.messager.progress({
                title: 'Espere Por Favor',
                msg: 'Los Datos se están Consultando...',
                zIndex: 9999999  // Ajusta este valor según sea necesario
            });
        },
        onLoadSuccess: function () {
            var data = $(this).combobox('getData');
            if (sValue !== undefined) {
                $("#" + comboId).combobox('setValue', sValue);
            } 
            winComboCComercialHP.window("close");
        }
    });
}

function loadCampaniaHPredio(comboId, sValue) {
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

function loadTipoDocHPredio(comboId, sValue,Id) {
    $("#" + comboId).combobox({
        valueField: 'id',
        textField: 'text',
        editable: false,
        panelHeight: 'auto',
        method: 'post',
        width: 120,
        url: 'ListaTipoDocumentoCmbx', 
        queryParams:{codDoc:Id},// Asegúrate de apuntar al servlet o endpoint correcto
        onSelect: function (record) {
            $("#addHPredioTxtImpuesto").val(record.impuesto); 
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


//Inicialización de la Tabla HPredio

function TblHPredio() { 
    $('#tblHPredio').datagrid({
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
            {field:"valorVentaD",title:'V. Venta $',width:90,align:'right', styler: cellStyler},
            {field:"impuestoD",title:'Impuesto $',width:90,align:'right', styler: cellStyler},
            {field:"ImporteD",title:'Importe $',width:90,align:'right', styler: cellStyler},
            {field:"valorVentaS",title:'V. Venta S/',width:90,align:'right', styler: cellStyler},
            {field:"impuestoS",title:'Impuesto S/',width:90,align:'right', styler: cellStyler},
            {field:"ImporteS",title:'Importe S/',width:90,align:'right', styler: cellStyler}
        ]],
        singleSelect: true,
        autoRowHeight: false,
        rownumbers:true,
        pagination:true,
        title:"Lista de Habilitaciones Por Predio",
        width: 'auto',
        height: 599,
        pageSize:20,
        method:'post',
        toolbar: '#tbHPredio',
        url:"ListaHabilitacionPredioTbl",
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

function TblHPrediosq()
{    
    const comprobante = $("#hpredio_NroComprobtBsq").val().trim();
    const fInicio = $("#hpredio_FInicioBsq").val();
    const fFin = $("#hpredio_FFinBsq").val();    
    
    $("#tblHPredio").datagrid('load',
    {
        comprobante: comprobante,
        fInicio : fInicio,
        fFin : fFin
    });
}

function TblDetallesComprobanteHabi()
{ 
    $('#tblDetalleHPredio').datagrid({
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
                            onLoadSuccess:function(){
                            }
                        });  
    
                       
                          
}

function AddHPredioAddTblDetalle(cantidad) {
    
    if(!isNaN(parseInt(cantidad)))
    {
        let codigo = $('#addHPredioCmbxCComercial').combobox('getValue');
        let data = $('#addHPredioCmbxCComercial').combobox('getData');
        let selectedRecord = data.find(item => item.id == codigo);
        if (selectedRecord) 
        {
            var rows = $('#tblDetalleHPredio').datagrid('getRows');

            var exists = rows.some(function(row) {
                return parseInt(row.codElemento) === parseInt(codigo);
            });

            if (exists) {
                showNotification('warning', 'El código del elemento ya existe en la tabla.');
                return;
            } 
            else
            {
                let dcTipoCambio = $("#addHPredioTxtTipoC").val().trim();
                if (dcTipoCambio !== "0") {
                    let detalle = $('#addHPredioCmbxCComercial').combobox('getText');
                    const moneda = document.getElementById('addHPredioCmbxMoneda').value;
                    let dcimpuesto = new Decimal($("#addHPredioTxtImpuesto").val().trim());
                    let dcPrecio = new Decimal(selectedRecord.precio);   //$("#addHPredioTxtPrecio").val().trim());
                    let prefer = $("#addHPredioTxtUc").attr("data-info");
                    if(prefer==="S")
                    {
                       dcPrecio = new Decimal(selectedRecord.precioPref);   //$("#addHPredioTxtPrecio").val().trim()); 
                    }
                            
                    let dcimpuestoCalculo = parseFloat($("#addHPredioTxtImpuesto").val().trim())+1;
                    let dcTipoCambioDecimal = new Decimal(dcTipoCambio);
                    let valorVentaDolares,ImporteDolares,impuestoDolares,dcPrecioMoneda;
                    let valorVentaSoles,ImporteSoles,impuestoSoles;
                    let valorVentaT,ImporteT,impuestoT;
                    if(moneda === "S")
                    {   
                        valorVentaSoles = redondea2Decimales((dcPrecio*cantidad));                    
                        ImporteSoles = redondea2Decimales((valorVentaSoles*dcimpuestoCalculo));
                        impuestoSoles = (ImporteSoles-valorVentaSoles);

                        dcPrecioMoneda = (dcPrecio/dcTipoCambioDecimal);

                        valorVentaDolares = redondea2Decimales((dcPrecioMoneda*cantidad));                    
                        ImporteDolares = redondea2Decimales((valorVentaDolares*dcimpuestoCalculo));
                        impuestoDolares = (ImporteDolares-valorVentaDolares);
                        valorVentaT = valorVentaSoles;
                        ImporteT = ImporteSoles;
                        impuestoT = impuestoSoles;

                    }
                    else
                    {                    
                        valorVentaDolares = redondea2Decimales((dcPrecio*cantidad));
                        ImporteDolares = redondea2Decimales((valorVentaDolares*dcimpuestoCalculo));
                        impuestoDolares = (ImporteDolares-valorVentaDolares);

                        dcPrecioMoneda = (dcPrecio*dcTipoCambioDecimal);//PrecioEnSoles

                        valorVentaSoles = redondea2Decimales((dcPrecioMoneda*cantidad));
                        ImporteSoles = redondea2Decimales((valorVentaSoles*dcimpuestoCalculo));
                        impuestoSoles = (ImporteSoles-valorVentaSoles);

                        valorVentaT = valorVentaDolares;
                        ImporteT = ImporteDolares;
                        impuestoT = impuestoDolares;

                    }


                    $('#tblDetalleHPredio').datagrid('appendRow', {
                        codElemento: parseInt(codigo),
                        vConcepto: detalle,
                        dcPrecio: dcPrecio.toNumber(),
                        dcCantidad: cantidad,
                        PrecioVentaT: valorVentaT,
                        ImpuestoT: redondea2Decimales(impuestoT),
                        ImporteT: ImporteT,
                        dcPrecioVentaD: valorVentaDolares,
                        dcImpuestoD: redondea2Decimales(impuestoDolares),
                        dcImporteD: ImporteDolares,
                        dcPrecioVenta: valorVentaSoles,
                        dcImpuesto: redondea2Decimales(impuestoSoles),
                        dcImporte: ImporteSoles,
                        htmlOpcion: `<a href="javascript:void(0);" onclick="AddHPredioDeleteTblDetalle(${codigo})"><img src="INI/imagenes/icons8-menos-16.png"></button></a>`,
                        fechaPrecio: $("#addHPredioDateFecha").val().trim(),
                        codMedida: selectedRecord.codMedida,
                        abreviatura: selectedRecord.abrev,
                        Moneda: $("#addHPredioCmbxMoneda").val().trim(),
                        tVenta: $("#addHPredioTxtTipoC").val().trim(),
                        tCompra: $("#addHPredioTxtTipoC").attr("data-info"),
                        valorImpuesto: dcimpuesto
                    });
                    AddHPredioCalcularTotales($('#tblDetalleHPredio').datagrid('getData'));
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


function AddHPredioAddTblDetalleImporte(Importe) {
    
    if(!isNaN(parseFloat(Importe)) && parseFloat(Importe)>0)
    {
        let codigo = $('#addHPredioCmbxCComercial').combobox('getValue');
        let data = $('#addHPredioCmbxCComercial').combobox('getData');
        console.log("Codigo:", codigo); 
        console.log("Data:", data); 
        let selectedRecord = data.find(item => item.id == codigo);
        if (selectedRecord) 
        {            
            var rows = $('#tblDetalleHPredio').datagrid('getRows');

            var exists = rows.some(function(row) {
                return parseInt(row.codElemento) === parseInt(codigo);
            });
            if (exists) {
                showNotification('warning', 'El código del elemento ya existe en la tabla.');
                return;
            } 
            else 
            {
                let dcTipoCambio = $("#addHPredioTxtTipoC").val().trim();
                if (dcTipoCambio !== "0") {
                    let detalle = $('#addHPredioCmbxCComercial').combobox('getText');
                    const moneda = document.getElementById('addHPredioCmbxMoneda').value;
                    let dcimpuesto = new Decimal($("#addHPredioTxtImpuesto").val().trim());
                    let dcimpuestoCalculo = parseFloat($("#addHPredioTxtImpuesto").val().trim())+1;
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


                    $('#tblDetalleHPredio').datagrid('appendRow', {
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
                        htmlOpcion: `<a href="javascript:void(0);" onclick="AddHPredioDeleteTblDetalle(${codigo})"><img src="INI/imagenes/icons8-menos-16.png"></button></a>`,
                        fechaPrecio: $("#addHPredioDateFecha").val().trim(),
                        codMedida: selectedRecord.codMedida,
                        abreviatura: selectedRecord.abrev,
                        Moneda: $("#addHPredioCmbxMoneda").val().trim(),
                        tVenta: $("#addHPredioTxtTipoC").val().trim(),
                        tCompra: $("#addHPredioTxtTipoC").attr("data-info"),
                        valorImpuesto: dcimpuesto
                    });
                    AddHPredioCalcularTotales($('#tblDetalleHPredio').datagrid('getData'));
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

function AddHPredioCalcularTotales(data) {
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

    $('#tblDetalleHPredio').datagrid('reloadFooter', footerData);
}

function AddHPredioDeleteTblDetalle(codElemento) {
    var rows = $('#tblDetalleHPredio').datagrid('getRows');

    for (var i = 0; i < rows.length; i++) {
        if (rows[i].codElemento === codElemento) {
            var index = $('#tblDetalleHPredio').datagrid('getRowIndex', rows[i]);

            if (index >= 0) {
                $('#tblDetalleHPredio').datagrid('deleteRow', index);
                AddHPredioCalcularTotales($('#tblDetalleHPredio').datagrid('getData')); // Calcular totales después de eliminar una fila
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

function TblListaPrediosHPredio()
{     
    var codCampania = $("#addHPredioCmbxCampania").combobox('getValue');
    let winTblListaPrediosHP;  
     $('#tblListaPrediosHPredio').datagrid({
                            columns: [[        
                            {field:"codProductor",hidden:true},
                            {field:"codPredio",hidden:true},
                            {field:"codHabilitacion",hidden:true},
                            {field:"Productor",title:'Productor',width:270},
                            {field:"Documento",title:'Dni/Ruc',width:70},
                            {field:"Predio",title:'Predio',width:170},
                            {field:"Uc",title:'Cod. Predio',width:70},
                            {field:"Porcentaje",hidden:true},
                            {field:"AreaInstalada",hidden:true},
                            {field:"preferencial",hidden:true}
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
                            onBeforeLoad: function(data) {
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
                                AddHPredioTblListaPrediosSeleccionar();
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

function TblListaPrediosHPredioBsq()
{    
    const nombre = $("#addHPredioDlgListaPrdTxtProductor").val().trim();
    const documento = $("#addHPredioDlgListaPrdTxtDocumento").val().trim();
    var codCampania = $("#addHPredioCmbxCampania").combobox('getValue');
    //Recarga la tabla
   
    $("#tblListaPrediosHPredio").datagrid('load',
    {
        nombre: nombre,
        documento : documento,
        campania : codCampania
    });
}

function AddHPredioTblListaPrediosSeleccionar()
{    
    const row = $('#tblListaPrediosHPredio').datagrid('getSelected');
    if (row)
    {
        $("#addHPredioTxtPredio").val(row.Predio); 
        $("#addHPredioTxtPredio").attr("data-info", row.codPredio);
        $("#addHPredioTxtUc").val(row.Uc); 
        $("#addHPredioTxtUc").attr("data-info", row.preferencial);
        $("#addHPredioTxtProductor").val(row.Productor); 
        $("#addHPredioTxtProductor").attr("data-info", row.codProductor);
        $("#addHPredioTxtAreaInst").val(row.AreaInstalada); 
        $("#addHPredioTxtInteres").val(row.Porcentaje); 
        $('#addHPredioCmbxCampania').combobox('disable');
        $( "#dlgListaPrediosHPredio" ).dialog( "close" );  
        $('#addHPrediodlgAgregarBtnNewPrd').linkbutton('enable');
        // Deshabilitar el botón visualmente
        $('#addHPrediodlgAgregarBtnBsqPrd').linkbutton('disable');
        // Remover el evento click
        $('#addHPrediodlgAgregarBtnBsqPrd').off('click'); 
        let codigo = $('#addHPredioCmbxCComercial').combobox('getValue');
        let data = $('#addHPredioCmbxCComercial').combobox('getData');    
        if (data.length > 0) {
            $('#addHPredioCmbxCComercial').combobox('setValue', data[0].id);
        }  
        let selectedRecord = data.find(item => item.id == codigo);
        if (selectedRecord) 
        {            
            if(row.preferencial==="S")
            {
                $("#addHPredioTxtPrecio").val(selectedRecord.precioPref); 
            }
            else
            {
                $("#addHPredioTxtPrecio").val(selectedRecord.precio); 
            }            
        } 

    }
    else
    {
        showNotification('warning', 'Debe Seleccionar una Fila');
    }
}

function InicializarDlgAgregarHPredio()
{
    $('#addHPrediodlgAgregarBtnNewPrd').linkbutton('disable');
    $('#addHPrediodlgAgregarBtnBsqPrd').linkbutton('enable');
    $('#addHPrediodlgAgregarBtnBsqPrd').on('click', function(event) {
       $( "#dlgListaPrediosHPredio" ).dialog( "open" );  
       var dg = $('#tblListaPrediosHPredio');
        if (!dg.data('datagrid')){ TblListaPrediosHPredio();
        }
        else
        {
          TblListaPrediosHPredioBsq();  
        }
    });
    loadCComercialHPredio('addHPredioCmbxCComercial');
    loadCampaniaHPredio('addHPredioCmbxCampania');
    $("#addHPredioTxtTipoC").attr("disabled", "disabled");
    $("#addHPredioDateFecha").val(obtenerFechaActual());
    ObtenerTipoCambio('addHPredioDateFecha','addHPredioTxtTipoC',obtenerFechaActual());
    $("#addHPredioTxtPredio").val(""); 
    $("#addHPredioTxtPredio").attr("data-info", "0");
    $("#addHPredioTxtUc").val(""); 
    $("#addHPredioTxtUc").attr("data-info", "");
    $("#addHPredioTxtProductor").val(""); 
    $("#addHPredioTxtProductor").attr("data-info", "0");
    $("#addHPredioTxtAreaInst").val(""); 
    $("#addHPredioTxtNumero").val(""); 
    
}

function ActivarBotonNewHPredio()
{
    $('#addHPredioCmbxCampania').combobox('enable');
    $('#addHPrediodlgAgregarBtnNewPrd').linkbutton('disable');
    $('#addHPrediodlgAgregarBtnBsqPrd').linkbutton('enable');
    // Agregar un evento click que prevenga la acción predeterminada
    $('#addHPrediodlgAgregarBtnBsqPrd').on('click', function(event) {
       $( "#dlgListaPrediosHPredio" ).dialog( "open" );  
       var dg = $('#tblListaPrediosHPredio');
        if (!dg.data('datagrid')){ TblListaPrediosHPredio();
        }
        else
        {
            TblListaPrediosHPredioBsq();
        }
    });
    $("#addHPredioTxtPredio").val(""); 
    $("#addHPredioTxtPredio").attr("data-info", "0");
    $("#addHPredioTxtUc").val(""); 
    $("#addHPredioTxtUc").attr("data-info", "");
    $("#addHPredioTxtProductor").val(""); 
    $("#addHPredioTxtProductor").attr("data-info", "0");
    $("#addHPredioTxtAreaInst").val(""); 
    $("#addHPredioCmbxCComercial").combobox('clear'); 
    $("#addHPredioTxtUMedida").val(""); 
    $("#addHPredioTxtPrecio").val(""); 
}

function saveData() {
    var codPredio = $("#addHPredioTxtPredio").attr("data-info"); // Supongamos que tienes otros parámetros en tu formulario
    var codCampania = $("#addHPredioCmbxCampania").combobox('getValue');
    var cultivo = 1;
    var codTipoDoc = $("#addHPredioCmbxTipoDoc").combobox('getValue');
    var moneda = $("#addHPredioCmbxMoneda").val().trim();
    var fechaEmision = $("#addHPredioDateFecha").val().trim();
    var tcVenta = $("#addHPredioTxtTipoC").val().trim();
    var tcCompra = $("#addHPredioTxtTipoC").attr("data-info");
    var interes = $("#addHPredioTxtInteres").val().trim();
    var codEmpresa = 1; //Proveedor
    var Glosa = $("#addHPredioTxtGlosa").val().trim();
    var NroComprobante = $("#addHPredioTxtNumero").val().trim();
    var Ruc='20510360428'; //Proveedor
    var areaInst = $("#addHPredioTxtAreaInst").val().trim();
    var data = $('#tblDetalleHPredio').datagrid('getRows');
    var footerData = $('#tblDetalleHPredio').datagrid('getFooterRows')[0];
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
            let winAddHPredio;
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
                    winAddHPredio = $.messager.progress({
                        title: 'Espere Por Favor',
                        msg: 'Los Datos se están Guardando...'
                    });
                },
                success: function (data) {
                    var res = data.trim();
                    var result = res.substr(0, 2);
                    switch(result) {
                        case "ok":
                            $( "#dlgAgregarHPredio" ).dialog( "close" );
                            TblHPrediosq();
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
                    winAddHPredio.window("close");
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.status === 500) {
                        showNotification('error', 'Error interno del servidor.'); // Mensaje claro para el usuario
                    } else {
                        showNotification('error', 'Ocurrió un error inesperado.');
                    }
                    winAddHPredio.window("close");
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
    const row = $('#tblHPredio').datagrid('getSelected');
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

function anularHPredio()
{
    const row = $('#tblHPredio').datagrid('getSelected');
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
                                    TblHPrediosq();
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

function openHabilitacionPredio ()
{
    var selectMoneda = $('#addHPredioCmbxMoneda');
    selectMoneda.empty();
    var options = {
                'S': 'S/',
                'D': '$'
            };
    let rbtMonedaValue = $('#addHPredioDlgMonedaRbtn').radiogroup('getValue');
    let sector = $("#addHPredioDlgMonedaCmbxTipoDoc").combobox('getValue');
    if (sector && rbtMonedaValue && options[rbtMonedaValue]) {
        selectMoneda.append('<option value="' + rbtMonedaValue + '" selected="true">' + options[rbtMonedaValue] + '</option>');
        $( "#dlgMonedaHPredio" ).dialog( "close" ); 
        TblDetallesComprobanteHabi();                
        $('#tblDetalleHPredio').datagrid('loadData', { total: 0, rows: [] }); 
        AddHPredioCalcularTotales($('#tblDetalleHPredio').datagrid('getData'));
        loadTipoDocHPredio('addHPredioCmbxTipoDoc',sector,sector);
        $( "#dlgAgregarHPredio" ).dialog( "open" );
        InicializarDlgAgregarHPredio(); 
    }
}


function accessHPredio()
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
                    
            toggleButton("addHPredioBtn", s[0] === '1', function() {
                /* */
                $('#addHPredioDlgMonedaRbtn').radiogroup('setValue', 'D');
                loadTipoDocHPredio('addHPredioDlgMonedaCmbxTipoDoc');
                $( "#dlgMonedaHPredio" ).dialog( "open" );
            });
/*
            toggleButton("editPrediosBtn", s[1] === '1', function() {
                openCamposEditPredio();
            });*/

            toggleButton("anularHPredioBtn", s[2] === '1', function() {
                anularHPredio();
            });
            
        }); 
    }
}


            

