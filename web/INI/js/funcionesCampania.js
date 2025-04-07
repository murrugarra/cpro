/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 $(document).ready(function() {            
            $('#campagr_NombreBsq').textbox({
                inputEvents: $.extend({}, $.fn.textbox.defaults.inputEvents, {
                    keydown: function(event) {
                        if (event.key === 'Enter') {
                            const nombre = $(this).val();
                            TblCampAgrBsqEnter(nombre);
                        }
                    }
                })
            });
            
            configurarEventosAddCampAgr();
            configurarEventosEditCampAgr();            
            TblCampAgr();  
            accessCampAgr();
 
            $("#campagrBtnBusqTbl").on('click',function(event){
                TblCampAgrBsq(); 
            });
 
 
            $("#dlgAddCampAgrBtnCancelar").on('click',function(event){
                var isValid = $('#formRegCampAgr').form('validate'); // Validar el formulario
                if (isValid) {
                    $( "#dlgAgregarCampAgr" ).dialog( "close" ); // Cerrar el diálogo si el formulario es válido
                } else {
                    // Mostrar un mensaje de error o realizar alguna acción si el formulario no es válido
                    console.log('El formulario no es válido. No se puede cerrar el diálogo.');
                }
                // Evitar que el evento de clic se propague y evite cualquier comportamiento predeterminado del navegador
                event.preventDefault();
                event.stopPropagation();
            });
 
            $("#dlgEditCampAgrBtnCancelar").on('click',function(event){
                var isValid = $('#formEditCampAgr').form('validate'); // Validar el formulario
                if (isValid) {
                    $( "#dlgEditarCampAgr" ).dialog( "close" ); // Cerrar el diálogo si el formulario es válido
                } else {
                    // Mostrar un mensaje de error o realizar alguna acción si el formulario no es válido
                    console.log('El formulario no es válido. No se puede cerrar el diálogo.');
                }
                // Evitar que el evento de clic se propague y evite cualquier comportamiento predeterminado del navegador
                event.preventDefault();
                event.stopPropagation();
            });           
            //Functionality for add Form (Productor) Edit Form
            $("#formRegCampAgr").submit(function(event) {
                event.preventDefault(); // Detiene el evento por defecto del Formulario
                registrarCampAgr();

            });
             //Functionality for Edit Form (Productor) Edit Form
            $("#formEditCampAgr").submit(function(event) {
                event.preventDefault(); // Detiene el evento por defecto del Formulario
                editarCampAgr();

            });
            
            //Solo Números
            //MAYUSCULAS
            soloMayusculas("#addCampAgrTxtNombre");
            soloMayusculas("#editCampAgrTxtNombre");
 

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
function TblCampAgr()
{ 
     $('#tblCampAgr').datagrid({
                            columns: [[        
                            {field:"codCampAgr",hidden:true},
                            {field:"nombreCampAgr",title:'Nombre',width:370},
                            {field:"Estado",title:'Estado',hidden:true}
                            ]],
                            singleSelect: true,
                            autoRowHeight: false,
                            rownumbers:true,
                            pagination:true,
                            title:"Lista de Campañas Agrícolas",
                            width: 'auto',
                            height: 599,
                            pageSize:20,
                            method:'post',
                            toolbar: '#tbCampAgr',
                            url:"ListaCampaniaAgricolaTbl",
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

function TblCampAgrBsq()
{    
    const nombre = $('#campagr_NombreBsq').textbox('getValue');
    const vEstado = $("#campagr_EstadoBsq").combobox('getValue');
    
    $("#tblCampAgr").datagrid('load',
    {
        nombre: nombre,
        vEstado : vEstado
    });
}

function TblCampAgrBsqEnter(nombre)
{    
    const vEstado = $("#campagr_EstadoBsq").combobox('getValue');
   
    $("#tblCampAgr").datagrid('load',
    {
        nombre: nombre,
        vEstado : vEstado
    });
}

function configurarEventosAddCampAgr()
{
    const nombre = document.getElementById('addCampAgrTxtNombre');
    const form = document.getElementById('formRegCampAgr');


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
function configurarEventosEditCampAgr()
{
    const nombre = document.getElementById('editCampAgrTxtNombre');
    const form = document.getElementById('formEditCampAgr');


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

function registrarCampAgr() {
    const Nombre = $("#addCampAgrTxtNombre").val(); 
    
    const parametros = {"vNombre": Nombre};    
    
    let winRegCampAgr;
    $.ajax({
        data: parametros,
        url: 'AgregarCampaniaAgricola',
        type: 'post',
        beforeSend: function () {
            winRegCampAgr = $.messager.progress({
                title: 'Espere Por Favor',
                msg: 'Los Datos se están Guardando...'
            });
        },
        success: function (data) {
            var res = data.trim();
            var result = res.substr(0, 2);
            switch(result) {
                case "ok":
                    $( "#dlgAgregarCampAgr" ).dialog( "close" );
                    showNotification('success', res.substring(2));
                    TblCampAgrBsq();
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
            winRegCampAgr.window("close");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status === 500) {
                showNotification('error', 'Error interno del servidor.'); // Mensaje claro para el usuario
            } else {
                showNotification('error', 'Ocurrió un error inesperado.');
            }
            winRegCampAgr.window("close");
        }
    });
}

function openCamposEditCampAgr()
{
    const row = $('#tblCampAgr').datagrid('getSelected');
    if (row)
    {
        $("#editCampAgrTxtNombre").val(row.nombreCampAgr);
        $( "#dlgEditarCampAgr" ).dialog( "open" );   
    }
    else
    {
        showNotification('warning', 'Debe Seleccionar una Fila');
    }
}

function editarCampAgr() {
    const row = $('#tblCampAgr').datagrid('getSelected');
    if (row)
    {
        const Nombre = $("#editCampAgrTxtNombre").val();

        const parametros = {"cod": row.codCampAgr, "vNombre": Nombre};    

        let winEditCampAgr;
        $.ajax({
            data: parametros,
            url: 'EditarCampaniaAgricola',
            type: 'post',
            beforeSend: function () {
                winEditCampAgr = $.messager.progress({
                    title: 'Espere Por Favor',
                    msg: 'Los Datos se están Guardando...'
                });
            },
            success: function (data) {
                var res = data.trim();
                var result = res.substr(0, 2);
                switch(result) {
                    case "ok":
                        $( "#dlgEditarCampAgr" ).dialog( "close" );
                        showNotification('success', res.substring(2));
                        TblCampAgrBsq();
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
                winEditCampAgr.window("close");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status === 500) {
                    showNotification('error', 'Error interno del servidor.'); // Mensaje claro para el usuario
                } else {
                    showNotification('error', 'Ocurrió un error inesperado.');
                }
                winEditCampAgr.window("close");
            }
        });
    }
    else
    {
        showNotification('warning', 'Debe Seleccionar una Fila');
    }
}

function eliminarCampAgr()
{
    const row = $('#tblCampAgr').datagrid('getSelected');
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
                            const parametros = {"cod": row.codCampAgr};   

                            let winEliminarCampAgr;
                            $.ajax({
                                data: parametros,
                                url: 'EliminarCampaniaAgricola',
                                type: 'post',
                                beforeSend: function () {
                                    winEliminarCampAgr = $.messager.progress({
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
                                    winEliminarCampAgr.window("close");
                                    TblCampAgrBsq();
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    if (jqXHR.status === 500) {
                                        showNotification('error', 'Error interno del servidor.'); // Mensaje claro para el usuario
                                    } else {
                                        showNotification('error', 'Ocurrió un error inesperado.');
                                    }
                                    winEliminarCampAgr.window("close");
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

function accessCampAgr()
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
                    
            toggleButton("addCampAgrBtn", s[0] === '1', function() {                
              $("#addCampAgrTxtNombre").val("");
              $( "#dlgAgregarCampAgr" ).dialog( "open" ); 
            });

            toggleButton("editCampAgrBtn", s[1] === '1', function() {
                openCamposEditCampAgr();
            });

            toggleButton("eliminCampAgrBtn", s[2] === '1', function() {
                eliminarCampAgr();
            });
            
        }); 
    }
}

