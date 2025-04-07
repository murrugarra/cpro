/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



 $(document).ready(function() {            
            $('#ccomercial_NombreBsq').textbox({
                inputEvents: $.extend({}, $.fn.textbox.defaults.inputEvents, {
                    keydown: function(event) {
                        if (event.key === 'Enter') {
                            const nombre = $(this).val();
                            TblCComercialBsqEnter(nombre);
                        }
                    }
                })
            });
            
            configurarEventosAddCComercial();
            configurarEventosEditCComercial();   
            configurarEventosEditCComercialPrecio();
            TblCComercial();
            accessCComercial();
 
            $("#ccomercialBtnBusqTbl").on('click',function(event){
                TblCComercialBsq(); 
            });
 
            $("#dlgAddCComercialBtnCancelar").on('click',function(event){
                var isValid = $('#formRegCComercial').form('validate'); // Validar el formulario
                if (isValid) {
                    $( "#dlgAgregarCComercial" ).dialog( "close" ); // Cerrar el diálogo si el formulario es válido
                } else {
                    // Mostrar un mensaje de error o realizar alguna acción si el formulario no es válido
                    console.log('El formulario no es válido. No se puede cerrar el diálogo.');
                }
                // Evitar que el evento de clic se propague y evite cualquier comportamiento predeterminado del navegador
                event.preventDefault();
                event.stopPropagation();
            });
 
            $("#dlgEditCComercialBtnCancelar").on('click',function(event){
                var isValid = $('#formEditCComercial').form('validate'); // Validar el formulario
                if (isValid) {
                    $( "#dlgEditarCComercial" ).dialog( "close" ); // Cerrar el diálogo si el formulario es válido
                } else {
                    // Mostrar un mensaje de error o realizar alguna acción si el formulario no es válido
                    console.log('El formulario no es válido. No se puede cerrar el diálogo.');
                }
                // Evitar que el evento de clic se propague y evite cualquier comportamiento predeterminado del navegador
                event.preventDefault();
                event.stopPropagation();
            });   
 
            $("#dlgEditCComercialPrecioBtnCancelar").on('click',function(event){
                var isValid = $('#formEditCComercial').form('validate'); // Validar el formulario
                if (isValid) {
                    $( "#dlgEditarCComercialPrecio" ).dialog( "close" ); // Cerrar el diálogo si el formulario es válido
                } else {
                    // Mostrar un mensaje de error o realizar alguna acción si el formulario no es válido
                    console.log('El formulario no es válido. No se puede cerrar el diálogo.');
                }
                // Evitar que el evento de clic se propague y evite cualquier comportamiento predeterminado del navegador
                event.preventDefault();
                event.stopPropagation();
            });   
            
            $("#formRegCComercial").submit(function(event) {
                event.preventDefault(); // Detiene el evento por defecto del Formulario
                registrarCComercial();

            }); 
            $("#formEditCComercial").submit(function(event) {
                event.preventDefault(); // Detiene el evento por defecto del Formulario
                editarCComercial();

            });
            $("#formEditCComercialPrecio").submit(function(event) {
                event.preventDefault(); // Detiene el evento por defecto del Formulario
                editarCComercialPrecio();

            });
            
            var comboBox = document.getElementById('addCComercialCmbxConPrecio');
            comboBox.onchange = function() {
                var seleccion =  comboBox.value;
                if (seleccion === 'S') {
                    document.getElementById('addCComercialDateFecha').disabled=false;
                    document.getElementById('addCComercialTxtMonto').disabled=false;
                    document.getElementById('addCComercialTxtMontoPrefr').disabled=false;
                    document.getElementById('addCComercialTxtMonto').value="";
                } else if (seleccion === 'N') {
                    document.getElementById('addCComercialDateFecha').disabled=true;
                    document.getElementById('addCComercialTxtMonto').disabled=true;
                    document.getElementById('addCComercialTxtMontoPrefr').disabled=true;
                    document.getElementById('addCComercialTxtMonto').value="0.00";
                    document.getElementById('addCComercialTxtMontoPrefr').value="0";
                }
            };
            
            
            //Solo Números
            //MAYUSCULAS
            soloMayusculas("#addCComercialTxtNombre");
            soloMayusculas("#editCComercialTxtNombre");
            soloNumeros6Dec("#addCComercialTxtMonto");
            soloNumeros6Dec("#addCComercialTxtMontoPrefr");
            soloNumeros6Dec("#editCComercialPrecioTxtMonto");
            soloNumeros6Dec("#editCComercialPrecioTxtMontoPrefr");
 

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
        

function initComboGrupoCComercial(comboId, comboClassId,comboSubClassId, sValueGrupo, sValueClass,sValueSubClass) {
    $("#" + comboId).combobox({
        valueField: 'id',
        textField: 'text',
        editable:false, 
        panelHeight:'auto',
        method: 'post',
        width: 210,
        url: "ListaGrupoCmbx",
        onSelect: function(f) {
            loadClasesCComercial(comboClassId,comboSubClassId,f.id);
        },
        onLoadSuccess: function () {
            var data = $(this).combobox('getData');
            if (sValueGrupo  &&  sValueGrupo !== '-1' ) {
                $("#" + comboId).combobox('setValue', sValueGrupo);
                loadClasesCComercial(comboClassId,comboSubClassId, sValueGrupo, sValueClass, sValueSubClass);
            }
            else
            {
                if (data.length > 0) {
                    $(this).combobox('setValue', data[0].id);
                    loadClasesCComercial(comboClassId, comboSubClassId, data[0].id,'-1');
                } 
                else 
                {
                    loadClasesCComercial(comboClassId,comboSubClassId, '-1','-1');
                }
            }            
        }
        
    });
}

function loadClasesCComercial(comboId,comboSubClassId, idGrupo, sValueClass,sValueSubClass) {
        let winComboClasesCC;  
            $("#" + comboId).combobox({
                valueField: 'id',
                textField: 'text',
                editable: false,
                panelHeight: 'auto',
                method: 'post',
                width: 410,
                queryParams:{idGrupo:idGrupo},
                url: 'ListaClaseCmbx',
                onSelect: function (f) {
                    loadSubClasesCComercial(comboSubClassId, idGrupo,f.id);
                },
                onBeforeLoad: function(node, param) {
                    winComboClasesCC = $.messager.progress({
                        title: 'Espere Por Favor',
                        msg: 'Los Datos se están Consultado...',
                        zIndex: 9999999  // Ajusta este valor según sea necesario
                    });
                },
                onLoadSuccess: function () { 
                    var data = $(this).combobox('getData');                
                    if (sValueClass  && sValueClass !== '-1' ){
                        $(this).combobox('setValue', sValueClass);//si viene de editar le da el valor asiginado
                        loadSubClasesCComercial(comboSubClassId, idGrupo, sValueClass, sValueSubClass);
                    } 
                    else 
                    {
                        if (data.length > 0) {
                            $(this).combobox('setValue', data[0].id);
                            loadSubClasesCComercial(comboSubClassId, idGrupo, data[0].id);
                        } 
                        else 
                        {
                           loadSubClasesCComercial(comboSubClassId, idGrupo, -1);
                        }
                    }
                  $.messager.progress('close');
                }
            });
          
 }
  
function loadSubClasesCComercial(comboId, idGrupo,idClase, sValueSubClas) {
        let winComboSubClasesCC; 
            $("#" + comboId).combobox({
                valueField: 'id',
                textField: 'text',
                editable: false,
                panelHeight: 'auto',
                method: 'post',
                width: 225,
                queryParams:{idGrupo:idGrupo,idClase:idClase},
                url: 'ListaSubClaseCmbx',
                onSelect: function (f) {
                },
                onBeforeLoad: function(node, param) {
                    winComboSubClasesCC = $.messager.progress({
                        title: 'Espere Por Favor',
                        msg: 'Los Datos se están Consultado...',
                        zIndex: 9999999  // Ajusta este valor según sea necesario
                    });
                },
                onLoadSuccess: function () {
                    var data = $(this).combobox('getData');
                    if (sValueSubClas !== undefined) {
                        $("#" + comboId).combobox('setValue', sValueSubClas);
                    }
                    else 
                    {
                        if (data.length > 0) {
                            $(this).combobox('setValue', data[0].id);
                        }                        
                    }
                 $.messager.progress('close');                   
                }
            });          
 }

function loadUMedidaCComercial(comboId, sValue) {
            $("#" + comboId).combobox({
                valueField: 'id',
                textField: 'text',
                editable: false,
                panelHeight: 'auto',
                method: 'post',
                width: 145,
                url: 'ListaUnidadMedidaCmbx',
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
//Inicialización de la Tabla 
function TblCComercial()
{ 
     $('#tblCComercial').datagrid({
                            columns: [[
                                { title: 'DATOS DEL ELEMENTO', colspan: 11 },
                                { title: 'PRECIO', colspan: 3, align: 'center' }
                            ], [
                                { field: "codElemento", hidden: true },
                                { field: "codGrupo", hidden: true },
                                { field: "codClase", hidden: true },
                                { field: "codSubClase", hidden: true },
                                { field: "conPrecio", hidden: true },
                                { field: "codUM", hidden: true },
                                { field: "nombreGrupo", hidden: true},
                                { field: "nombreClase", title: 'Clase', width: 220 },
                                { field: "nombreSubClase", title: 'SubClase', width: 220 },
                                { field: "nombre", title: 'Nombre', width: 240 },
                                { field: "nombreUM", title: 'Abrev.', width: 50, align: 'center' },
                                { field: "fechaPrecio", title: 'Fecha', width: 90, align: 'center' , formatter: formatDate },
                                { field: "precio", title: 'Monto', width: 70, align: 'right' , formatter: formatPrice },
                                { field: "precioPref", title: 'Monto Pref.', width: 90, align: 'right' , formatter: formatPrice }
                            ]],
                            singleSelect: true,
                            autoRowHeight: false,
                            rownumbers:true,
                            pagination:true,
                            title:"Lista de Elementos",
                            width: 'auto',
                            height: 599,
                            pageSize:20,
                            method:'post',
                            toolbar: '#tbCComercial',
                            url:"ListaCatalogoComercialTbl",
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
// Función para formatear la fecha
function formatDate(value, row, index) {
    if (value) {
        // Intenta convertir el valor a una fecha
        const date = new Date(value);
        
        // Verificar si la fecha es válida
        if (!isNaN(date.getTime())) {
            return date.toISOString().split('T')[0]; // YYYY-MM-DD
        } else {
            // Intenta extraer la fecha de diferentes formatos
            const match = value.match(/([a-zA-Z]+) (\d{1,2}), (\d{4})/);
            if (match) {
                const monthNames = {
                    'jan': '01', 'feb': '02', 'mar': '03', 'apr': '04',
                    'may': '05', 'jun': '06', 'jul': '07', 'aug': '08',
                    'sep': '09', 'oct': '10', 'nov': '11', 'dec': '12',
                    'ene': '01', 'feb': '02', 'mar': '03', 'abr': '04',
                    'may': '05', 'jun': '06', 'jul': '07', 'ago': '08',
                    'sep': '09', 'oct': '10', 'nov': '11', 'dic': '12'
                };

                const month = monthNames[match[1].toLowerCase().substring(0, 3)];
                if (month) {
                    const day = match[2];
                    const year = match[3];
                    return `${year}-${month}-${day.padStart(2, '0')}`; // YYYY-MM-DD
                }
            }
        }
    }
    return value.toString(); // Retornar el valor original si es nulo o no se pudo formatear
}


// Función para formatear precios a 6 decimales
function formatPrice(value, row, index) {
    return (value != null ? parseFloat(value).toFixed(6) : '').toString();
}

function TblCComercialBsq()
{    
    const nombre = $('#ccomercial_NombreBsq').textbox('getValue');
    const vEstado = $("#ccomercial_EstadoBsq").combobox('getValue');
    //Recarga la tabla
   
    $("#tblCComercial").datagrid('load',
    {
        nombre: nombre,
        vEstado : vEstado
    });
}

function TblCComercialBsqEnter(nombre)
{    
    const vEstado = $("#ccomercial_EstadoBsq").combobox('getValue');
    $("#tblCComercial").datagrid('load',
    {
        nombre: nombre,
        vEstado : vEstado
    });
}


function configurarEventosAddCComercial()
{
    const nombre = document.getElementById('addCComercialTxtNombre');
    const fecha = document.getElementById('addCComercialDateFecha');
    const monto = document.getElementById('addCComercialTxtMonto');
    const form = document.getElementById('formRegCComercial');


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

    fecha.addEventListener('input', function() {
        validateInput(fecha, !fecha.value.trim(), 'Fecha es obligatorio');
    });

    monto.addEventListener('input', function() {
        validateInput(monto, !monto.value.trim(), 'Monto es obligatorio');
    });    
    form.addEventListener('submit', function(event) {
        let valid = true;
        if (!valid) {
            event.preventDefault();
        }
    });

}
function configurarEventosEditCComercial()
{
    const nombre = document.getElementById('editCComercialTxtNombre');
    const form = document.getElementById('formEditCComercial');


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
    form.addEventListener('submit', function(event) {
        let valid = true;
        if (!valid) {
            event.preventDefault();
        }
    });

}
function configurarEventosEditCComercialPrecio()
{
    const fecha = document.getElementById('editCComercialPrecioDateFecha');
    const monto = document.getElementById('editCComercialPrecioTxtMonto');
    const form = document.getElementById('formEditCComercialPrecio');


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

    fecha.addEventListener('input', function() {
        validateInput(fecha, !fecha.value.trim(), 'Fecha es obligatorio');
    });

    monto.addEventListener('input', function() {
        validateInput(monto, !monto.value.trim(), 'Monto es obligatorio');
    }); 
    
    form.addEventListener('submit', function(event) {
        let valid = true;
        if (!valid) {
            event.preventDefault();
        }
    });

}

function registrarCComercial() {
    const Grupo = 1;//$('#addCComercialCmbxGrupo').combobox('getValue');
    const Clase = $('#addCComercialCmbxClase').combobox('getValue');
    const SubClase = $('#addCComercialCmbxSubClase').combobox('getValue');
    const Nombre = $("#addCComercialTxtNombre").val(); 
    const UMedida = $('#addCComercialTxtUmd').combobox('getValue');    
    const conPrecio = $("#addCComercialCmbxConPrecio").val();
    const dFechaIngreso = $("#addCComercialDateFecha").val();
    const monto = $("#addCComercialTxtMonto").val(); 
    const montoPref = $("#addCComercialTxtMontoPrefr").val(); 
    
    const parametros = {"Grupo": Grupo, "Clase": Clase, "SubClase": SubClase, "vNombre": Nombre, "UMedida": UMedida, "dFechaIngreso": dFechaIngreso, "monto": monto, "montoPref": montoPref,"conPrecio":conPrecio};    
    
    let winRegCComercial;
    $.ajax({
        data: parametros,
        url: 'AgregarCatalogoComercial',
        type: 'post',
        beforeSend: function () {
            winRegCComercial = $.messager.progress({
                title: 'Espere Por Favor',
                msg: 'Los Datos se están Guardando...'
            });
        },
        success: function (data) {
            var res = data.trim();
            var result = res.substr(0, 2);
            switch(result) {
                case "ok":
                    $( "#dlgAgregarCComercial" ).dialog( "close" );
                    showNotification('success', res.substring(2));
                    TblCComercialBsq();
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
            winRegCComercial.window("close");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status === 500) {
                showNotification('error', 'Error interno del servidor.'); // Mensaje claro para el usuario
            } else {
                showNotification('error', 'Ocurrió un error inesperado.');
            }
            winRegCComercial.window("close");
        }
    });
}

function openCamposEditCComercial()
{
    const row = $('#tblCComercial').datagrid('getSelected');
    if (row)
    {
        $("#editCComercialTxtNombre").val(row.nombre); 
        document.getElementById('editCComercialCmbxConPrecio').value=row.conPrecio; 
        //initComboGrupoCComercial('editCComercialCmbxGrupo','editCComercialCmbxClase','editCComercialCmbxSubClase', row.codGrupo, row.codClase,row.codSubClase);
        loadClasesCComercial('editCComercialCmbxClase','editCComercialCmbxSubClase', 1, row.codClase,row.codSubClase);
        loadUMedidaCComercial('editCComercialTxtUmd', row.codUM);
        $( "#dlgEditarCComercial" ).dialog( "open" );  
    }
    else
    {
        showNotification('warning', 'Debe Seleccionar una Fila');
    }
}

function openCamposEditCComercialPrecio()
{
    const row = $('#tblCComercial').datagrid('getSelected');
    if (row)
    {
        if(row.conPrecio==='S')
        {   
            $("#editCComercialPrecioDateFecha").val(convertToDateYYYMMDD(row.fechaPrecio));
            $("#editCComercialPrecioTxtMonto").val(convert6Decimales(row.precio)); 
            $("#editCComercialPrecioTxtMontoPrefr").val(convert6Decimales(row.precioPref)); 
            $( "#dlgEditarCComercialPrecio" ).dialog( "open" );  
        }
        else
        {
            showNotification('warning', 'No es posible Actualizar el Precio,porque el registro está guardado sin precio.');
        }
    }
    else
    {
        showNotification('warning', 'Debe Seleccionar una Fila');
    }
}

function editarCComercial() {
    const row = $('#tblCComercial').datagrid('getSelected');
    if (row)
    {
        const Nombre = $("#editCComercialTxtNombre").val(); 
        const Grupo = 1;//$('#editCComercialCmbxGrupo').combobox('getValue');
        const Clase = $('#editCComercialCmbxClase').combobox('getValue');
        const SubClase = $('#editCComercialCmbxSubClase').combobox('getValue');
        const UMedida = $('#editCComercialTxtUmd').combobox('getValue'); 
        const conPrecio = $("#editCComercialCmbxConPrecio").val();

        const parametros = {"elemento": row.codElemento,"Grupo": Grupo,"Clase": Clase,"SubClase": SubClase,"Nombre": Nombre,"UMedida": UMedida,"conPrecio":conPrecio};    

        let winEditCComercial;
        $.ajax({
            data: parametros,
            url: 'EditarCatalogoComercial',
            type: 'post',
            beforeSend: function () {
                winEditCComercial = $.messager.progress({
                    title: 'Espere Por Favor',
                    msg: 'Los Datos se están Guardando...'
                });
            },
            success: function (data) {
                var res = data.trim();
                var result = res.substr(0, 2);
                switch(result) {
                    case "ok":
                        $( "#dlgEditarCComercial" ).dialog( "close" );
                        showNotification('success', res.substring(2));
                        TblCComercialBsq();
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
                winEditCComercial.window("close");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status === 500) {
                    showNotification('error', 'Error interno del servidor.'); // Mensaje claro para el usuario
                } else {
                    showNotification('error', 'Ocurrió un error inesperado.');
                }
                winEditCComercial.window("close");
            }
        });
    }
    else
    {
        showNotification('warning', 'Debe Seleccionar una Fila');
    }
}
function editarCComercialPrecio() {
    const row = $('#tblCComercial').datagrid('getSelected');
    if (row)
    {
        
        const dFechaIngreso = $("#editCComercialPrecioDateFecha").val();
        const monto = $("#editCComercialPrecioTxtMonto").val(); 
        const montoPref = $("#editCComercialPrecioTxtMontoPrefr").val(); 

        const parametros = {"elemento": row.codElemento,"Fecha": dFechaIngreso,"monto": monto,"Nombre": row.nombre,"montoPref":montoPref};    

        let winEditCComercialPrecio;
        $.ajax({
            data: parametros,
            url: 'EditarCatalogoComercialPrecio',
            type: 'post',
            beforeSend: function () {
                winEditCComercialPrecio = $.messager.progress({
                    title: 'Espere Por Favor',
                    msg: 'Los Datos se están Guardando...'
                });
            },
            success: function (data) {
                var res = data.trim();
                var result = res.substr(0, 2);
                switch(result) {
                    case "ok":
                        $( "#dlgEditarCComercialPrecio" ).dialog( "close" );
                        showNotification('success', res.substring(2));
                        TblCComercialBsq();
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
                winEditCComercialPrecio.window("close");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status === 500) {
                    showNotification('error', 'Error interno del servidor.'); // Mensaje claro para el usuario
                } else {
                    showNotification('error', 'Ocurrió un error inesperado.');
                }
                winEditCComercialPrecio.window("close");
            }
        });
    }
    else
    {
        showNotification('warning', 'Debe Seleccionar una Fila');
    }
}

function eliminarCComercial()
{
    const row = $('#tblCComercial').datagrid('getSelected');
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
                            const parametros = {"elemento": row.codElemento};   

                            let winEliminarCComercial;
                            $.ajax({
                                data: parametros,
                                url: 'EliminarCatalogoComercial',
                                type: 'post',
                                beforeSend: function () {
                                    winEliminarCComercial = $.messager.progress({
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
                                    winEliminarCComercial.window("close");
                                    TblCComercialBsq();
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    if (jqXHR.status === 500) {
                                        showNotification('error', 'Error interno del servidor.'); // Mensaje claro para el usuario
                                    } else {
                                        showNotification('error', 'Ocurrió un error inesperado.');
                                    }
                                    winEliminarCComercial.window("close");
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

function accessCComercial()
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
                    
            toggleButton("addCComercialBtn", s[0] === '1', function() {   
                $("#addCComercialTxtNombre").val("");
                $("#addCComercialTxtMonto").val("");
                $("#addCComercialTxtMontoPrefr").val("");
                //initComboGrupoCComercial('addCComercialCmbxGrupo','addCComercialCmbxClase','addCComercialCmbxSubClase');
                loadClasesCComercial('addCComercialCmbxClase','addCComercialCmbxSubClase', 1);
                loadUMedidaCComercial('addCComercialTxtUmd');
                $("#addCComercialDateFecha").val(obtenerFechaActual());
                $( "#dlgAgregarCComercial" ).dialog( "open" );  
            });

            toggleButton("editCComercialBtn", s[1] === '1', function() {
                openCamposEditCComercial();
            });

            toggleButton("editCComercialPrecioBtn", s[1] === '1', function() {
                openCamposEditCComercialPrecio();
            });
            
            toggleButton("eliminCComercialBtn", s[2] === '1', function() {
                eliminarCComercial();
            });
            
        }); 
    }
}

 