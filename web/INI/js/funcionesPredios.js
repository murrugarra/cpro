/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 $(document).ready(function() {            
            $('#predios_NombreBsq').textbox({
                inputEvents: $.extend({}, $.fn.textbox.defaults.inputEvents, {
                    keydown: function(event) {
                        if (event.key === 'Enter') {
                            const nombre = $(this).val();
                            TblPrediosBsqEnter(nombre);
                        }
                    }
                })
            });
                  
            TblPredios();                
            configurarEventosAddPredios();
            configurarEventosEditPredios();
            accessPredios();
 
            $("#prediosBtnBusqTbl").on('click',function(event){
                TblPrediosBsq(); 
            });
 
 
            $("#dlgAddPrediosBtnCancelar").on('click',function(event){
                var isValid = $('#formRegPredios').form('validate'); // Validar el formulario
                if (isValid) {
                    $( "#dlgAgregarPredios" ).dialog( "close" ); // Cerrar el diálogo si el formulario es válido
                } else {
                    // Mostrar un mensaje de error o realizar alguna acción si el formulario no es válido
                    console.log('El formulario no es válido. No se puede cerrar el diálogo.');
                }
                // Evitar que el evento de clic se propague y evite cualquier comportamiento predeterminado del navegador
                event.preventDefault();
                event.stopPropagation();
            });
 
            $("#dlgEditPredioBtnCancelar").on('click',function(event){
                var isValid = $('#formEditPredio').form('validate'); // Validar el formulario
                if (isValid) {
                    $( "#dlgEditarPredio" ).dialog( "close" ); // Cerrar el diálogo si el formulario es válido
                } else {
                    // Mostrar un mensaje de error o realizar alguna acción si el formulario no es válido
                    console.log('El formulario no es válido. No se puede cerrar el diálogo.');
                }
                // Evitar que el evento de clic se propague y evite cualquier comportamiento predeterminado del navegador
                event.preventDefault();
                event.stopPropagation();
            });           
            //Functionality for add Form (Productor) Edit Form
            $("#formRegPredios").submit(function(event) {
                event.preventDefault(); // Detiene el evento por defecto del Formulario
                registrarPredio();

            });
             //Functionality for Edit Form (Productor) Edit Form
            $("#formEditPredio").submit(function(event) {
                event.preventDefault(); // Detiene el evento por defecto del Formulario
                editarPredio();

            });
            
            //Solo Números
            //MAYUSCULAS
            soloMayusculas("#addPrediosTxtNombre");
            soloMayusculas("#addPrediosTxtCodPredio");
            soloNumeros("#addPrediosTxtAtotal");
            soloNumeros("#addPrediosTxtAinst");
            soloNumeros("#addPrediosTxtCE");
            soloNumeros("#addPrediosTxtPH");
            
            soloMayusculas("#editPrediosTxtNombre");
            soloMayusculas("#editPrediosTxtCodPredio");
            soloNumeros("#editPrediosTxtAtotal");
            soloNumeros("#editPrediosTxtAinst");
            soloNumeros("#editPrediosTxtCE");
            soloNumeros("#editPrediosTxtPH");
            

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
        

function iniComboSectorPredios(comboId, selectedValue) {
    let winComboSectorPer;   
            $("#" + comboId).combobox({
                valueField: 'id',
                textField: 'text',
                editable: false,
                panelHeight: 'auto',
                method: 'post',
                width: 210,
                url: 'ListaSectorAgricolaCmbx',
                onSelect: function (f) {
                },
                onBeforeLoad: function(node, param) {
                    winComboSectorPer = $.messager.progress({
                        title: 'Espere Por Favor',
                        msg: 'Los Datos se están Consultado...',
                        zIndex: 9999999  // Ajusta este valor según sea necesario
                    });
                },
                onLoadSuccess: function () {
                    if (selectedValue !== undefined) {
                        $("#" + comboId).combobox('setValue', selectedValue);
                    }
                    else
                    {
                        var data = $(this).combobox('getData');
                        if (data.length > 0) {
                        $(this).combobox('setValue', data[0].id);
                        }
                    }
                winComboSectorPer.window("close");
                }
            });
          
 }

function iniComboProductorPredios(comboId, selectedValue) {
    let winComboProductesPer;        
    $("#" + comboId).combobox({
                valueField: 'id',
                textField: 'text',
                editable: true,
                panelHeight: 'auto',
                method: 'post',
                width: '100%',
                url: 'ListaProductoresCmbx',
                onSelect: function (f) {
                },
                onBeforeLoad: function(node, param) {
                    winComboProductesPer = $.messager.progress({
                        title: 'Espere Por Favor',
                        msg: 'Los Datos se están Consultado...',
                        zIndex: 9999999  // Ajusta este valor según sea necesario
                    });
                },
                onLoadSuccess: function () {
                    if (selectedValue !== undefined) {
                        $("#" + comboId).combobox('setValue', selectedValue);
                    }
                winComboProductesPer.window("close");
                
                }
            });
          
 }


//Inicialización de la Tabla Grupo
function TblPredios()
{ 
     $('#tblPredios').datagrid({
        columns: [[        
        {field:"codProductor",hidden:true},
        {field:"codPredio",hidden:true},
        {field:"codSector",hidden:true},
        {field:"codTipo",hidden:true},
        {field:"Productor",title:'Productor',width:210},
        {field:"nombre",title:'Nombre',width:170},
        {field:"Uc",title:'Cod. Predio',width:100},
        {field:"Area",title:'A. Total',width:70},
        {field:"AreaInst",title:'A. Inst.',width:70},
        {field:"Sector",title:'Sector',width:200},
        {field:"ph",title:'P.H.',width:70},
        {field:"ce",title:'C.E',width:70},
        {field:"nomTipo",title:'Tipo',width:100},
        {field:"Estado",title:'Estado',hidden:true}
        ]],
        singleSelect: true,
        autoRowHeight: false,
        rownumbers:true,
        pagination:true,
        title:"Lista de Predios",
        width: 'auto',
        height: 599,
        pageSize:20,
        method:'post',
        toolbar: '#tbPredios',
        url:"ListaPrediosTbl",
        queryParams:{comision:1},
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

function TblPrediosBsq()
{    
    const nombre = $('#predios_NombreBsq').textbox('getValue');
    const vEstado = $("#predios_EstadoBsq").combobox('getValue');
    //Recarga la tabla
   
    $("#tblPredios").datagrid('load',
    {
        nombre: nombre,
        vEstado : vEstado
    });
}

function TblPrediosBsqEnter(nombre)
{    
    const vEstado = $("#predios_EstadoBsq").combobox('getValue');
    //Recarga la tabla
   
    $("#tblPredios").datagrid('load',
    {
        nombre: nombre,
        vEstado : vEstado
    });
}

function configurarEventosAddPredios()
{
   
    const nombre = document.getElementById('addPrediosTxtNombre');
    const CodPredio = document.getElementById('addPrediosTxtCodPredio');
    const areaTotal = document.getElementById('addPrediosTxtAtotal');
    const areaInst = document.getElementById('addPrediosTxtAinst');
    const areaCE = document.getElementById('addPrediosTxtCE');
    const areaPH = document.getElementById('addPrediosTxtPH');    
    const form = document.getElementById('formRegPredios');


    function validateInput(input, condition, errorMessage) {
        if (condition) {
            input.classList.add('error');
            input.setCustomValidity(errorMessage);
        } else {
            input.classList.remove('error');
            input.setCustomValidity('');
        }
        input.reportValidity();
    }

    
    nombre.addEventListener('input', function() {
        validateInput(nombre, !nombre.value.trim(), 'Nombre es obligatorio');
    });
    
    CodPredio.addEventListener('input', function() {
        validateInput(CodPredio, !CodPredio.value.trim(), 'Codigo Predio es obligatorio');
    });
    
    areaTotal.addEventListener('input', function() {
        validateInput(areaTotal, !areaTotal.value.trim(), 'A. Total es obligatorio');
    });
    
    areaInst.addEventListener('input', function() {
        validateInput(areaInst, !areaInst.value.trim(), 'A. Inst. es obligatorio');
    });
    
    
    areaCE.addEventListener('input', function() {
        validateInput(areaCE, !areaCE.value.trim(), 'CE es obligatorio');
    });
    
    areaPH.addEventListener('input', function() {
        validateInput(areaPH, !areaPH.value.trim(), 'PH es obligatorio');
    });
    
    
    form.addEventListener('submit', function(event) {
        let valid = true;
        if (!valid) {
            event.preventDefault();
        }
    });

}
function configurarEventosEditPredios()
{
   
    const nombre = document.getElementById('editPrediosTxtNombre');
    const CodPredio = document.getElementById('editPrediosTxtCodPredio');
    const areaTotal = document.getElementById('editPrediosTxtAtotal');
    const areaInst = document.getElementById('editPrediosTxtAinst');
    const areaCE = document.getElementById('editPrediosTxtCE');
    const areaPH = document.getElementById('editPrediosTxtPH');    
    const form = document.getElementById('formEditPredio');


    function validateInput(input, condition, errorMessage) {
        if (condition) {
            input.classList.add('error');
            input.setCustomValidity(errorMessage);
        } else {
            input.classList.remove('error');
            input.setCustomValidity('');
        }
        input.reportValidity();
    }

    
    nombre.addEventListener('input', function() {
        validateInput(nombre, !nombre.value.trim(), 'Nombre es obligatorio');
    });
    
    CodPredio.addEventListener('input', function() {
        validateInput(CodPredio, !CodPredio.value.trim(), 'Codigo Predio es obligatorio');
    });
    
    areaTotal.addEventListener('input', function() {
        validateInput(areaTotal, !areaTotal.value.trim(), 'A. Total es obligatorio');
    });
    
    areaInst.addEventListener('input', function() {
        validateInput(areaInst, !areaInst.value.trim(), 'A. Inst. es obligatorio');
    });
    
    
    areaCE.addEventListener('input', function() {
        validateInput(areaCE, !areaCE.value.trim(), 'CE es obligatorio');
    });
    
    areaPH.addEventListener('input', function() {
        validateInput(areaPH, !areaPH.value.trim(), 'PH es obligatorio');
    });
    
    
    form.addEventListener('submit', function(event) {
        let valid = true;
        if (!valid) {
            event.preventDefault();
        }
    });

}

function registrarPredio() {
    
    var productor = $('#addPredioCmbxProductor').combobox('getValue');
    var comboData = $('#addPredioCmbxProductor').combobox('getData');

    var optionExists = comboData.some(function(option) {
        return option.id.toLowerCase() === productor.toLowerCase();
    });

    if (!optionExists) {
        showNotification('error', 'El valor ingresado no Existe en los Productores');
        return;  
    }
    else
    {   
        const Nombre = $("#addPrediosTxtNombre").val(); 
        const sector= $('#addPredioCmbxSector').combobox('getValue');
        const Uc = $("#addPrediosTxtCodPredio").textbox('getValue'); 
        const AreaTotal = $("#addPrediosTxtAtotal").val(); 
        const AreaInst = $("#addPrediosTxtAinst").val(); 
        const tipo = document.getElementById("addPrediosCmbxTipo").value; 
        const ce = $("#addPrediosTxtCE").val(); 
        const ph = $("#addPrediosTxtPH").val(); 

        const parametros = {"productor": productor, "Nombre": Nombre, "sector": sector, "Uc": Uc, "AreaTotal": AreaTotal, "AreaInst": AreaInst, "tipo": tipo, "ce": ce, "ph": ph};    

        let winRegPredio;
        $.ajax({
            data: parametros,
            url: 'AgregarPredio',
            type: 'post',
            beforeSend: function () {
                winRegPredio = $.messager.progress({
                    title: 'Espere Por Favor',
                    msg: 'Los Datos se están Guardando...'
                });
            },
            success: function (data) {
                var res = data.trim();
                var result = res.substr(0, 2);
                switch(result) {
                    case "ok":
                        $( "#dlgAgregarPredios" ).dialog( "close" );
                        showNotification('success', res.substring(2));
                        TblPrediosBsq();
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
                winRegPredio.window("close");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status === 500) {
                    showNotification('error', 'Error interno del servidor.'); // Mensaje claro para el usuario
                } else {
                    showNotification('error', 'Ocurrió un error inesperado.');
                }
                winRegPredio.window("close");
            }
        });
    }
}

function openCamposEditPredio()
{
    const row = $('#tblPredios').datagrid('getSelected');
    if (row)
    {
        $("#editPrediosTxtNombre").val(row.nombre); 
        $("#editPrediosTxtCodPredio").textbox('setValue',row.Uc);
        $("#editPrediosTxtAtotal").val(row.Area);
        $("#editPrediosTxtAinst").val(row.AreaInst);
        document.getElementById("editPrediosCmbxTipo").value=row.codTipo; 
        $("#editPrediosTxtCE").val(row.ce);
        $("#editPrediosTxtPH").val(row.ph);        
        $( "#dlgEditarPredio" ).dialog( "open" );  
        iniComboSectorPredios('editPredioCmbxSector',row.codSector);
        iniComboProductorPredios('editPredioCmbxProductor',row.codProductor);
    }
    else
    {
        showNotification('warning', 'Debe Seleccionar una Fila');
    }
}

function editarPredio() {
    const row = $('#tblPredios').datagrid('getSelected');
    if (row)
    {        
        var productor = $('#editPredioCmbxProductor').combobox('getValue');
        var comboData = $('#editPredioCmbxProductor').combobox('getData');

        var optionExists = comboData.some(function(option) {
            return option.id.toLowerCase() === productor.toLowerCase();
        });

        if (!optionExists) {
            showNotification('error', 'El valor ingresado no Existe en los Productores');
            return;  
        }
        else
        {   
            const Nombre = $("#editPrediosTxtNombre").val(); 
            const sector= $('#editPredioCmbxSector').combobox('getValue');
            const Uc = $("#editPrediosTxtCodPredio").textbox('getValue');
            const AreaTotal = $("#editPrediosTxtAtotal").val(); 
            const AreaInst = $("#editPrediosTxtAinst").val(); 
            const tipo = document.getElementById("editPrediosCmbxTipo").value; 
            const ce = $("#editPrediosTxtCE").val(); 
            const ph = $("#editPrediosTxtPH").val(); 

            const parametros = {"productor": productor, "Nombre": Nombre, "sector": sector, "Uc": Uc, "AreaTotal": AreaTotal, "AreaInst": AreaInst, "tipo": tipo, "ce": ce, "ph": ph,"predio": row.codPredio};    
         
            let winEditPredio;
            $.ajax({
                data: parametros,
                url: 'EditarPredio',
                type: 'post',
                beforeSend: function () {
                    winEditPredio = $.messager.progress({
                        title: 'Espere Por Favor',
                        msg: 'Los Datos se están Guardando...'
                    });
                },
                success: function (data) {
                    var res = data.trim();
                    var result = res.substr(0, 2);
                    switch(result) {
                        case "ok":
                            $( "#dlgEditarPredio" ).dialog( "close" );
                            showNotification('success', res.substring(2));
                            TblPrediosBsq();
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
                    winEditPredio.window("close");
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.status === 500) {
                        showNotification('error', 'Error interno del servidor.'); // Mensaje claro para el usuario
                    } else {
                        showNotification('error', 'Ocurrió un error inesperado.');
                    }
                    winEditPredio.window("close");
                }
            });
        }
    }
    else
    {
        showNotification('warning', 'Debe Seleccionar una Fila');
    }
}

function eliminarPredio()
{
    const row = $('#tblPredios').datagrid('getSelected');
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
                            const parametros = {"productor": row.codProductor,"predio": row.codPredio};   

                            let winEliminarPredio;
                            $.ajax({
                                data: parametros,
                                url: 'EliminarPredio',
                                type: 'post',
                                beforeSend: function () {
                                    winEliminarPredio = $.messager.progress({
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
                                    winEliminarPredio.window("close");
                                    TblPrediosBsq();
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    if (jqXHR.status === 500) {
                                        showNotification('error', 'Error interno del servidor.'); // Mensaje claro para el usuario
                                    } else {
                                        showNotification('error', 'Ocurrió un error inesperado.');
                                    }
                                    winEliminarPredio.window("close");
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

function generarCodigoPredioReg(){  
    $.post('ObtenerUltimoCodigoGeneradoPredio', function(data) {
        let respuesta = data.split("-");
        let nuevoCodigo = respuesta[0] + "-" + (parseInt(respuesta[1])+1);
        $("#addPrediosTxtCodPredio").textbox('setValue',nuevoCodigo);
    });
}

function accessPredios()
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
                    
            toggleButton("addPrediosBtn", s[0] === '1', function() {
              $("#addPrediosTxtNombre").val("");
              $("#addPrediosTxtAtotal").val("");
              $("#addPrediosTxtAinst").val("");
              $("#addPrediosTxtCE").val("");
              $("#addPrediosTxtPH").val("");
              generarCodigoPredioReg();
              $( "#dlgAgregarPredios" ).dialog( "open" ); 
              iniComboSectorPredios('addPredioCmbxSector');
              iniComboProductorPredios('addPredioCmbxProductor');
            });

            toggleButton("editPrediosBtn", s[1] === '1', function() {
                openCamposEditPredio();
            });

            toggleButton("eliminPrediosBtn", s[2] === '1', function() {
                eliminarPredio();
            });
            
        }); 
    }
}


