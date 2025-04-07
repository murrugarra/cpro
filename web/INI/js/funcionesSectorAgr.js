/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 $(document).ready(function() {            
            $('#sectoragr_NombreBsq').textbox({
                inputEvents: $.extend({}, $.fn.textbox.defaults.inputEvents, {
                    keydown: function(event) {
                        if (event.key === 'Enter') {
                            const nombre = $(this).val();
                            TblSectorAgrBsqEnter(nombre);
                        }
                    }
                })
            });
            
            configurarEventosAddSectorAgr();
            configurarEventosEditSectorAgr();            
            TblSectorAgr();  
            accessSectorAgr();
 
            $("#sectoragrBtnBusqTbl").on('click',function(event){
                TblSectorAgrBsq(); 
            });
 
 
            $("#dlgAddSectorAgrBtnCancelar").on('click',function(event){
                var isValid = $('#formRegSectorAgr').form('validate'); // Validar el formulario
                if (isValid) {
                    $( "#dlgAgregarSectorAgr" ).dialog( "close" ); // Cerrar el diálogo si el formulario es válido
                } else {
                    // Mostrar un mensaje de error o realizar alguna acción si el formulario no es válido
                    console.log('El formulario no es válido. No se puede cerrar el diálogo.');
                }
                // Evitar que el evento de clic se propague y evite cualquier comportamiento predeterminado del navegador
                event.preventDefault();
                event.stopPropagation();
            });
 
            $("#dlgEditSectorAgrBtnCancelar").on('click',function(event){
                var isValid = $('#formEditSectorAgr').form('validate'); // Validar el formulario
                if (isValid) {
                    $( "#dlgEditarSectorAgr" ).dialog( "close" ); // Cerrar el diálogo si el formulario es válido
                } else {
                    // Mostrar un mensaje de error o realizar alguna acción si el formulario no es válido
                    console.log('El formulario no es válido. No se puede cerrar el diálogo.');
                }
                // Evitar que el evento de clic se propague y evite cualquier comportamiento predeterminado del navegador
                event.preventDefault();
                event.stopPropagation();
            });           
            //Functionality for add Form (Productor) Edit Form
            $("#formRegSectorAgr").submit(function(event) {
                event.preventDefault(); // Detiene el evento por defecto del Formulario
                registrarSectorAgr();

            });
             //Functionality for Edit Form (Productor) Edit Form
            $("#formEditSectorAgr").submit(function(event) {
                event.preventDefault(); // Detiene el evento por defecto del Formulario
                editarSectorAgr();

            });
            
            //Solo Números
            //MAYUSCULAS
            soloMayusculas("#addSectorAgrTxtNombre");
            soloMayusculas("#editSectorAgrTxtNombre");
 

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
 
//Inicialización de la Tabla Grupo
function TblSectorAgr()
{ 
     $('#tblSectorAgr').datagrid({
                            columns: [[        
                            {field:"codSectorAgr",hidden:true},
                            {field:"nombreSectorAgr",title:'Nombre',width:370},
                            {field:"Estado",title:'Estado',hidden:true}
                            ]],
                            singleSelect: true,
                            autoRowHeight: false,
                            rownumbers:true,
                            pagination:true,
                            title:"Lista de Sectores Agrícolas",
                            width: 'auto',
                            height: 599,
                            pageSize:20,
                            method:'post',
                            toolbar: '#tbSectorAgr',
                            url:"ListaSectorAgricolaTbl",
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

function TblSectorAgrBsq()
{    
    const nombre = $('#sectoragr_NombreBsq').textbox('getValue');
    const vEstado = $("#sectoragr_EstadoBsq").combobox('getValue');
    
    $("#tblSectorAgr").datagrid('load',
    {
        nombre: nombre,
        vEstado : vEstado
    });
}

function TblSectorAgrBsqEnter(nombre)
{    
    const vEstado = $("#sectoragr_EstadoBsq").combobox('getValue');
   
    $("#tblSectorAgr").datagrid('load',
    {
        nombre: nombre,
        vEstado : vEstado
    });
}

function configurarEventosAddSectorAgr()
{
    const nombre = document.getElementById('addSectorAgrTxtNombre');
    const form = document.getElementById('formRegSectorAgr');


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
function configurarEventosEditSectorAgr()
{
    const nombre = document.getElementById('editSectorAgrTxtNombre');
    const form = document.getElementById('formEditSectorAgr');


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

function registrarSectorAgr() {
    const Nombre = $("#addSectorAgrTxtNombre").val(); 
    
    const parametros = {"vNombre": Nombre};    
    
    let winRegSectorAgr;
    $.ajax({
        data: parametros,
        url: 'AgregarSectorAgricola',
        type: 'post',
        beforeSend: function () {
            winRegSectorAgr = $.messager.progress({
                title: 'Espere Por Favor',
                msg: 'Los Datos se están Guardando...'
            });
        },
        success: function (data) {
            var res = data.trim();
            var result = res.substr(0, 2);
            switch(result) {
                case "ok":
                    $( "#dlgAgregarSectorAgr" ).dialog( "close" );
                    showNotification('success', res.substring(2));
                    TblSectorAgrBsq();
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
            winRegSectorAgr.window("close");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status === 500) {
                showNotification('error', 'Error interno del servidor.'); // Mensaje claro para el usuario
            } else {
                showNotification('error', 'Ocurrió un error inesperado.');
            }
            winRegSectorAgr.window("close");
        }
    });
}

function openCamposEditSectorAgr()
{
    const row = $('#tblSectorAgr').datagrid('getSelected');
    if (row)
    {
        $("#editSectorAgrTxtNombre").val(row.nombreSectorAgr);
        $( "#dlgEditarSectorAgr" ).dialog( "open" );   
    }
    else
    {
        showNotification('warning', 'Debe Seleccionar una Fila');
    }
}

function editarSectorAgr() {
    const row = $('#tblSectorAgr').datagrid('getSelected');
    if (row)
    {
        const Nombre = $("#editSectorAgrTxtNombre").val();

        const parametros = {"cod": row.codSectorAgr, "vNombre": Nombre};    

        let winEditSectorAgr;
        $.ajax({
            data: parametros,
            url: 'EditarSectorAgricola',
            type: 'post',
            beforeSend: function () {
                winEditSectorAgr = $.messager.progress({
                    title: 'Espere Por Favor',
                    msg: 'Los Datos se están Guardando...'
                });
            },
            success: function (data) {
                var res = data.trim();
                var result = res.substr(0, 2);
                switch(result) {
                    case "ok":
                        $( "#dlgEditarSectorAgr" ).dialog( "close" );
                        showNotification('success', res.substring(2));
                        TblSectorAgrBsq();
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
                winEditSectorAgr.window("close");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status === 500) {
                    showNotification('error', 'Error interno del servidor.'); // Mensaje claro para el usuario
                } else {
                    showNotification('error', 'Ocurrió un error inesperado.');
                }
                winEditSectorAgr.window("close");
            }
        });
    }
    else
    {
        showNotification('warning', 'Debe Seleccionar una Fila');
    }
}

function eliminarSectorAgr()
{
    const row = $('#tblSectorAgr').datagrid('getSelected');
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
                            const parametros = {"cod": row.codSectorAgr};   

                            let winEliminarSectorAgr;
                            $.ajax({
                                data: parametros,
                                url: 'EliminarSectorAgricola',
                                type: 'post',
                                beforeSend: function () {
                                    winEliminarSectorAgr = $.messager.progress({
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
                                    winEliminarSectorAgr.window("close");
                                    TblSectorAgrBsq();
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    if (jqXHR.status === 500) {
                                        showNotification('error', 'Error interno del servidor.'); // Mensaje claro para el usuario
                                    } else {
                                        showNotification('error', 'Ocurrió un error inesperado.');
                                    }
                                    winEliminarSectorAgr.window("close");
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

function accessSectorAgr()
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
                    
            toggleButton("addSectorAgrBtn", s[0] === '1', function() {                
              $("#addSectorAgrTxtNombre").val("");
              $( "#dlgAgregarSectorAgr" ).dialog( "open" ); 
            });

            toggleButton("editSectorAgrBtn", s[1] === '1', function() {
                openCamposEditSectorAgr();
            });

            toggleButton("eliminSectorAgrBtn", s[2] === '1', function() {
                eliminarSectorAgr();
            });
            
        }); 
    }
}