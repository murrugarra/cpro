/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


 $(document).ready(function() {            
           
           loadCampaniaFinanc('financ_CampaniaBsq');
            accessFinanc();
            $("#financBtnBusqTbl").on('click',function(event){
                TblFinancBsq(); 
            });
 
 
            $("#addFinancdlgAgregarBtnBsqPrd").on('click',function(event){//por ver su Uso
               var dg = $('#tblListaPredioFinanc');
                if (!dg.data('datagrid')){ TblListaPrediosFinanc();
                }
               $( "#dlgListaPrediosFinanc" ).dialog( "open" );   
            });
 
            $("#addFinancdlgAgregarBtnNewPrd").on('click',function(event){//por ver su Uso
               ActivarBotonNewFinanc();  
            });            

            $("#visualizaFinancBtn").on('click',function(event){
                verContratoPdf();
            });
            
            $("#dlgAddFinancBtnCancelar").on('click',function(event){
                var isValid = $('#formRegFinanc').form('validate'); // Validar el formulario
                if (isValid) {
                    $( "#dlgAgregarFinanc" ).dialog( "close" ); // Cerrar el diálogo si el formulario es válido
                } else {
                    // Mostrar un mensaje de error o realizar alguna acción si el formulario no es válido
                    console.log('El formulario no es válido. No se puede cerrar el diálogo.');
                }
                // Evitar que el evento de clic se propague y evite cualquier comportamiento predeterminado del navegador
                event.preventDefault();
                event.stopPropagation();
            });
            
            $("#dlgEditFinancBtnCancelar").on('click',function(event){
                var isValid = $('#formEditFinanc').form('validate'); // Validar el formulario
                if (isValid) {
                    $( "#dlgEditFinanc" ).dialog( "close" ); // Cerrar el diálogo si el formulario es válido
                } else {
                    // Mostrar un mensaje de error o realizar alguna acción si el formulario no es válido
                    console.log('El formulario no es válido. No se puede cerrar el diálogo.');
                }
                // Evitar que el evento de clic se propague y evite cualquier comportamiento predeterminado del navegador
                event.preventDefault();
                event.stopPropagation();
            });
            
            $("#addFinancDlgListaBtnSeleccionar").on('click',function(event){
                AddFinancTblListaPrediosSeleccionar();  
            }); 
            $("#addFinancDlgListaBtnCancelar").on('click',function(event){
               $( "#dlgListaPrediosFinanc" ).dialog( "close" );  
            }); 
            
         
            
            
            $('#financ_ProductorBsq').keyup(function(event) {
                var key=event.keyCode || event.which;
                 if (key===13)
                 {
                   TblFinancBsq();  
                 } 
             });
             
             
            
            $("#formRegFinanc").submit(function(event) {
                event.preventDefault(); // Detiene el evento por defecto del Formulario
                saveDataFinanc();

            });
            
            $("#formEditFinanc").submit(function(event) {
                event.preventDefault(); // Detiene el evento por defecto del Formulario
                saveDataEditFinanc();

            });
            
            soloNumeros("#addFinancTxtAreaInst");
            soloNumeros("#addFinancTxtInteres");
           // soloMayusculas("#addHDineroTxtNumero");

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
    
function loadCampaniaFinanc(comboId, sValue) {
            $("#" + comboId).combobox({
                valueField: 'id',
                textField: 'text',
                editable: false,
                panelHeight: 'auto',
                method: 'post',
                width: 145,
                url: 'ListaCampaniaCmbx',
                onSelect: function (f) {
                    if(comboId==='financ_CampaniaBsq')
                    {
                        let $dg = $('#myDataGrid');
                        let datagridInstance = $dg.data('datagrid');
                        if ($dg.length > 0  && datagridInstance !== undefined ) {
                            TblFinancBsqOnChangeCamp(f.id);
                        } else {
                            TblFinanc(f.id);
                        }
                    }
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

function TblFinanc(campania) { 
    $('#tblFinanc').datagrid({
        columns: [[        
            {field:"codPredio",hidden:true},
            {field:"codProductores",hidden:true},
            {field:"codCampania",hidden:true},
            {field:"codHabilitacion",hidden:true},
            {field:"nombreProductor",title:'Productor',width:240, styler: cellStyler},
            {field:"nombrePredio",title:'Predio',width:120, styler: cellStyler},
            {field:"uc",title:'Cod.Predio',width:80, styler: cellStyler},
            {field:"areaInst",title:'Area Inst.',width:70, styler: cellStyler},
            {field:"campania",title:'Campaña Agricola',width:150, styler: cellStyler},
            {field:"porInteres",title:'Interes %',width:70,align:'center', styler: cellStyler},
            {field:"estado",hidden:true}
        ]],
        singleSelect: true,
        autoRowHeight: false,
        rownumbers:true,
        pagination:true,
        title:"Lista de Financiacion x Campaña",
        width: 'auto',
        height: 599,
        pageSize:20,
        method:'post',
        toolbar: '#tbFinanc',
        url:"ListarFinanciamientoTbl",
        queryParams:{campania:campania},
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

function TblFinancBsqOnChangeCamp(campania)
{    
    const productor = $("#financ_ProductorBsq").val().trim();  
    const vEstado = $("#financ_EstadoBsq").val();  
    
    $("#tblFinanc").datagrid('load',
    {
        campania: campania,
        productor : productor,
        vEstado : vEstado
    });
}

function TblFinancBsq()
{    
    const productor = $("#financ_ProductorBsq").val().trim();
    const campania = $("#financ_CampaniaBsq").val();  
    const vEstado = $("#financ_EstadoBsq").val();  
    
    $("#tblFinanc").datagrid('load',
    {
        campania: campania,
        productor : productor,
        vEstado : vEstado
    });
}

function TblListaPrediosFinanc()
{ 
    let winTblListaPrediosFinanc;  
     $('#tblListaPredioFinanc').datagrid({
                            columns: [[        
                            {field:"codProductor",hidden:true},
                            {field:"codPredio",hidden:true},
                            {field:"Area",hidden:true},
                            {field:"Productor",title:'Productor',width:270},
                            {field:"Documento",title:'Dni/Ruc',width:70},
                            {field:"Predio",title:'Predio',width:170},
                            {field:"Uc",title:'Cod. Predio',width:70},
                            {field:"AreaInstalada",title:'Estado',hidden:true}
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
                            url:"ListaPrediosConProductoresHPrediosTbl",                            
                            onBeforeLoad: function(param) {
                                winTblListaPrediosFinanc = $.messager.progress({
                                    title: 'Espere Por Favor',
                                    msg: 'Los Datos se están Consultado...',
                                    zIndex: 9999999  // Ajusta este valor según sea necesario
                                });
                            },
                            onLoadSuccess: function (data) {
                             winTblListaPrediosFinanc.window("close");
                            },
                            onDblClickRow: function(index, row) {
                                AddFinancTblListaPrediosSeleccionar();
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

function TblListaPrediosFinancBsq()
{    
    const nombre = $("#addFinancDlgListaPrdTxtProductor").val().trim();
    const documento = $("#addFinancDlgListaPrdTxtDocumento").val().trim();
    //Recarga la tabla
   
    $("#tblListaPredioFinanc").datagrid('load',
    {
        nombre: nombre,
        documento : documento
    });
}

function AddFinancTblListaPrediosSeleccionar()
{    
    const row = $('#tblListaPredioFinanc').datagrid('getSelected');
    if (row)
    {
        $("#addFinancTxtPredio").val(row.Predio); 
        $("#addFinancTxtPredio").attr("data-info", row.codPredio);
        $("#addFinancTxtUc").val(row.Uc); 
        $("#addFinancTxtProductor").val(row.Productor); 
        $("#addFinancTxtProductor").attr("data-info", row.codProductor);
        $("#addFinancTxtAreaInst").val(row.AreaInstalada); 
        $( "#dlgListaPrediosFinanc" ).dialog( "close" );  
        $('#addFinancdlgAgregarBtnNewPrd').linkbutton('enable');
        // Deshabilitar el botón visualmente
        $('#addFinancdlgAgregarBtnBsqPrd').linkbutton('disable');
        // Remover el evento click
        $('#addFinancdlgAgregarBtnBsqPrd').off('click');

    }
    else
    {
        showNotification('warning', 'Debe Seleccionar una Fila');
    }
}

function InicializarDlgAgregarFinanc()
{
    $('#addFinancdlgAgregarBtnNewPrd').linkbutton('disable');
    $('#addFinancdlgAgregarBtnBsqPrd').linkbutton('enable');
    $('#addFinancdlgAgregarBtnBsqPrd').on('click', function(event) {
       $( "#dlgListaPrediosFinanc" ).dialog( "open" );  
       var dg = $('#tblListaPredioFinanc');
        if (!dg.data('datagrid')){ TblListaPrediosFinanc();
        }
    });
    loadCampaniaFinanc('addFinancCmbxCampania');
    $("#addFinancTxtInteres").val("9.00");
    $("#addFinancTxtPredio").val(""); 
    $("#addFinancTxtPredio").attr("data-info", "0");
    $("#addFinancTxtUc").val(""); 
    $("#addFinancTxtProductor").val(""); 
    $("#addFinancTxtProductor").attr("data-info", "0");
    $("#addFinancTxtAreaInst").val(""); 
    $("#addFinancFileContrato").val(""); 
    
}

function ActivarBotonNewFinanc()
{
    $('#addFinancdlgAgregarBtnNewPrd').linkbutton('disable');
    $('#addFinancdlgAgregarBtnBsqPrd').linkbutton('enable');
    // Agregar un evento click que prevenga la acción predeterminada
    $('#addFinancdlgAgregarBtnBsqPrd').on('click', function(event) {
       $( "#dlgListaPrediosFinanc" ).dialog( "open" );  
       var dg = $('#tblListaPredioFinanc');
        if (!dg.data('datagrid')){ TblListaPrediosFinanc();
        }
    });
    $("#addFinancTxtInteres").val("9.00");
    $("#addFinancTxtPredio").val(""); 
    $("#addFinancTxtPredio").attr("data-info", "0");
    $("#addFinancTxtUc").val(""); 
    $("#addFinancTxtProductor").val(""); 
    $("#addFinancTxtProductor").attr("data-info", "0");
    $("#addFinancTxtAreaInst").val(""); 
    $("#addFinancFileContrato").val(""); 
    
}

function saveDataFinanc() {
    const codPredio = $("#addFinancTxtPredio").attr("data-info"); 
    const codCampania = $("#addFinancCmbxCampania").combobox('getValue');
    const interes = $("#addFinancTxtInteres").val().trim();
    const cultivo = 1; 
    const areaInst = $("#addFinancTxtAreaInst").val().trim();
    const preferencial = $("#addFinancCmbxPreciPref").combobox('getValue');
    const fileInput = $('#addFinancFileContrato')[0];
    const file = fileInput.files[0];
   
    
    if(codPredio!=="0" && codCampania.length>0 && interes.length>0 && areaInst.length>0)
    {
        let formData = new FormData();
        formData.append('codPredio', codPredio);
        formData.append('codCampania', codCampania);
        formData.append('cultivo', cultivo);
        formData.append('interes', interes);
        formData.append('areaInst', areaInst);
        formData.append('preferencial', preferencial);

        if (file && file.type === 'application/pdf') {
            formData.append('fileContrato', file);
        } else {
            formData.append('fileContrato', null);
        }
            let winAddFinanc;
            $.ajax({
                type: 'POST',
                url: 'AgregarFinanciamiento', // URL del servlet
                data: formData,
                processData: false,
                contentType: false,
                beforeSend: function () {
                    winAddFinanc = $.messager.progress({
                        title: 'Espere Por Favor',
                        msg: 'Los Datos se están Guardando...'
                    });
                },
                success: function (data) {
                    var res = data.trim();
                    var result = res.substr(0, 2);
                    switch(result) {
                        case "ok":
                            $( "#dlgAgregarFinanc" ).dialog( "close" );
                            TblFinancBsq();
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
                    winAddFinanc.window("close");
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.status === 500) {
                        showNotification('error', 'Error interno del servidor.'); // Mensaje claro para el usuario
                    } else {
                        showNotification('error', 'Ocurrió un error inesperado.');
                    }
                    winAddFinanc.window("close");
                }
            });
        
    } 
    else
    {
        showNotification('warning', "Existen Campos Vacios.");
    }
}

function verContratoPdf()
{
    const row = $('#tblFinanc').datagrid('getSelected');
    if (row)
    {
                //window.open('MostrarPDFContrato?codPredio='+row.codPredio+'&codCampania='+row.codCampania+'', '_blank');  
        let param = { 'codPredio' : row.codPredio,'codCampania' : row.codCampania};
        OpenWindowWiths("MostrarPDFContrato", 
          "width=930,height=345,left=100,top=100,resizable=yes,scrollbars=yes", 
          "NewFile", param);
    }
    else
    {
        showNotification('warning', 'Debe ingresar una cantidad valida.');
    }
}

function OpenEditFinanc()
{    
    const row = $('#tblFinanc').datagrid('getSelected');
    if (row)
    {
        //$("#editFinancTxtPredio").val(row.nombrePredio); 
        //$("#editFinancTxtPredio").attr("data-info", row.codPredio);
       // $("#editFinancTxtUc").val(row.uc); 
        //$("#editFinancTxtProductor").val(row.nombreProductor); 
        //$("#editFinancTxtProductor").attr("data-info", row.codProductores);
       // $("#editFinancTxtAreaInst").val(row.areaInst);
        //$("#editFinancTxtInteres").val(row.porInteres);
       // loadCampaniaFinanc('editFinancCmbxCampania',row.codCampania);
        $("#editFinancFileContrato").val('');
        $( "#dlgEditFinanc" ).dialog( "open" );   
       // $('#editFinancdlgAgregarBtnBsqPrd').linkbutton('enable');
        // Deshabilitar el botón visualmente
        //$('#editFinancdlgAgregarBtnNewPrd').linkbutton('disable');
        // Remover el evento click
       // $('#editFinancdlgAgregarBtnBsqPrd').off('click');

    }
    else
    {
        showNotification('warning', 'Debe Seleccionar una Fila');
    } 
}

function saveDataEditFinanc() {
        
    const row = $('#tblFinanc').datagrid('getSelected');
    if (row)
    {
        const fileInput = $('#editFinancFileContrato')[0];
        const file = fileInput.files[0];
        let formData = new FormData();
        formData.append('codHabilita', row.codHabilitacion);
        formData.append('codPredio', row.codPredio);
        formData.append('codCampania', row.codCampania);
        if (file && file.type === 'application/pdf') {
            formData.append('fileContrato', file);            
            let winEditFinanc;
            $.ajax({
                type: 'POST',
                url: 'EditarFinanciamiento', // URL del servlet
                data: formData,
                processData: false,
                contentType: false,
                beforeSend: function () {
                    winEditFinanc = $.messager.progress({
                        title: 'Espere Por Favor',
                        msg: 'Los Datos se están Guardando...'
                    });
                },
                success: function (data) {
                    var res = data.trim();
                    var result = res.substr(0, 2);
                    switch(result) {
                        case "ok":
                            $( "#dlgEditFinanc" ).dialog( "close" );
                            TblFinancBsq();
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
                    winEditFinanc.window("close");
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.status === 500) {
                        showNotification('error', 'Error interno del servidor.'); // Mensaje claro para el usuario
                    } else {
                        showNotification('error', 'Ocurrió un error inesperado.');
                    }
                    winEditFinanc.window("close");
                }
            });
        } 
        else 
        {
            showNotification('warning', 'Debe Seleccionar una Archivo Pdf');
        }
    }
    else
    {
        showNotification('warning', 'Debe Seleccionar una Fila');
    } 
   
    
}

function saveDataDeleteFinanc() {
        
    const row = $('#tblFinanc').datagrid('getSelected');
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
                          
                        const parametros = {"codHabilita": row.codHabilitacion,"codPredio": row.codPredio,"codCampania": row.codCampania};  
                        let winDeleteFinanc;
                        $.ajax({
                            type: 'POST',
                            url: 'EliminarFinanciamiento', // URL del servlet
                            data:  parametros,
                            beforeSend: function () {
                                winDeleteFinanc = $.messager.progress({
                                    title: 'Espere Por Favor',
                                    msg: 'Los Datos se están Guardando...'
                                });
                            },
                            success: function (data) {
                                var res = data.trim();
                                var result = res.substr(0, 2);
                                switch(result) {
                                    case "ok":
                                        $( "#dlgEditFinanc" ).dialog( "close" );
                                        TblFinancBsq();
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
                                winDeleteFinanc.window("close");
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                if (jqXHR.status === 500) {
                                    showNotification('error', 'Error interno del servidor.'); // Mensaje claro para el usuario
                                } else {
                                    showNotification('error', 'Ocurrió un error inesperado.');
                                }
                                winDeleteFinanc.window("close");
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

function accessFinanc()
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
                    
            toggleButton("addFinancBtn", s[0] === '1', function() {
                InicializarDlgAgregarFinanc();
                $( "#dlgAgregarFinanc" ).dialog( "open" );
            });

            toggleButton("editFinancBtn", s[1] === '1', function() {
                OpenEditFinanc();
            });

            toggleButton("eliminFinancBtn", s[2] === '1', function() {
                saveDataDeleteFinanc();
            });
            
        }); 
    }
}


            


