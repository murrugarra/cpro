/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 $(document).ready(function() {            
            $('#umedida_NombreBsq').textbox({
                inputEvents: $.extend({}, $.fn.textbox.defaults.inputEvents, {
                    keydown: function(event) {
                        if (event.key === 'Enter') {
                            const nombre = $(this).val();
                            TblUMedidaBsqEnter(nombre);
                        }
                    }
                })
            });
            
            configurarEventosAddUMedida();
            configurarEventosEditUMedida();            
            TblUMedida();
            accessUnidadMedida();
 
            $("#umedidaBtnBusqTbl").on('click',function(event){
                TblUMedidaBsq(); 
            });
 
 
            $("#dlgAddUMedidaBtnCancelar").on('click',function(event){
                var isValid = $('#formRegUMedida').form('validate'); // Validar el formulario
                if (isValid) {
                    $( "#dlgAgregarUMedida" ).dialog( "close" ); // Cerrar el diálogo si el formulario es válido
                } else {
                    // Mostrar un mensaje de error o realizar alguna acción si el formulario no es válido
                    console.log('El formulario no es válido. No se puede cerrar el diálogo.');
                }
                // Evitar que el evento de clic se propague y evite cualquier comportamiento predeterminado del navegador
                event.preventDefault();
                event.stopPropagation();
            });
 
            $("#dlgEditUMedidaBtnCancelar").on('click',function(event){
                var isValid = $('#formEditUMedida').form('validate'); // Validar el formulario
                if (isValid) {
                    $( "#dlgEditarUMedida" ).dialog( "close" ); // Cerrar el diálogo si el formulario es válido
                } else {
                    // Mostrar un mensaje de error o realizar alguna acción si el formulario no es válido
                    console.log('El formulario no es válido. No se puede cerrar el diálogo.');
                }
                // Evitar que el evento de clic se propague y evite cualquier comportamiento predeterminado del navegador
                event.preventDefault();
                event.stopPropagation();
            });           
            //Functionality for add Form (Productor) Edit Form
            $("#formRegUMedida").submit(function(event) {
                event.preventDefault(); // Detiene el evento por defecto del Formulario
                registrarUMedida();

            });
             //Functionality for Edit Form (Productor) Edit Form
            $("#formEditUMedida").submit(function(event) {
                event.preventDefault(); // Detiene el evento por defecto del Formulario
                editarUMedida();

            });
            
            //Solo Números
            //MAYUSCULAS
            soloMayusculas("#addUMedidaTxtNombre");
            soloMayusculas("#editUMedidaTxtNombre");
            soloMayusculas("#addUMedidaTxtAbrev");
            soloMayusculas("#editUMedidaTxtAbrev");
 

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
function TblUMedida()
{ 
     $('#tblUMedida').datagrid({
                            columns: [[        
                            {field:"codUMedida",hidden:true},
                            {field:"nombreUMedida",title:'Nombre',width:370},
                            {field:"abreviatura",title:'Abreviatura',width:170},
                            {field:"Estado",title:'Estado',hidden:true}
                            ]],
                            singleSelect: true,
                            autoRowHeight: false,
                            rownumbers:true,
                            pagination:true,
                            title:"Lista Unidades de Medida",
                            width: 'auto',
                            height: 599,
                            pageSize:20,
                            method:'post',
                            toolbar: '#tbUMedida',
                            url:"ListaUnidadMedidaTbl",
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

function TblUMedidaBsq()
{    
    const nombre = $('#umedida_NombreBsq').textbox('getValue');
    const vEstado = $("#umedida_EstadoBsq").combobox('getValue');
    //Recarga la tabla
   
    $("#tblUMedida").datagrid('load',
    {
        nombre: nombre,
        vEstado : vEstado
    });
}

function TblUMedidaBsqEnter(nombre)
{    
    const vEstado = $("#umedida_EstadoBsq").combobox('getValue');
    //Recarga la tabla
   
    $("#tblUMedida").datagrid('load',
    {
        nombre: nombre,
        vEstado : vEstado
    });
}

function configurarEventosAddUMedida()
{
    const nombre = document.getElementById('addUMedidaTxtNombre');
    const abrev = document.getElementById('addUMedidaTxtAbrev');
    const form = document.getElementById('formRegUMedida');


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
    abrev.addEventListener('input', function() {
        validateInput(abrev, !abrev.value.trim(), 'Abreviatura es obligatorio');
    });
    
    form.addEventListener('submit', function(event) {
        let valid = true;
        if (!valid) {
            event.preventDefault();
        }
    });

}
function configurarEventosEditUMedida()
{
    const nombre = document.getElementById('editUMedidaTxtNombre');
    const abrev = document.getElementById('editUMedidaTxtAbrev');
    const form = document.getElementById('formEditUMedida');


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
    abrev.addEventListener('input', function() {
        validateInput(abrev, !abrev.value.trim(), 'Abreviatura es obligatorio');
    });
    
    form.addEventListener('submit', function(event) {
        let valid = true;
        if (!valid) {
            event.preventDefault();
        }
    });

}

function registrarUMedida() {
    const Nombre = $("#addUMedidaTxtNombre").val(); 
    const Abrev = $('#addUMedidaTxtAbrev').val();
    
    const parametros = {"vNombre": Nombre, "vAbrv": Abrev};    
    
    let winRegUMedida;
    $.ajax({
        data: parametros,
        url: 'AgregarUnidadMedida',
        type: 'post',
        beforeSend: function () {
            winRegUMedida = $.messager.progress({
                title: 'Espere Por Favor',
                msg: 'Los Datos se están Guardando...'
            });
        },
        success: function (data) {
            var res = data.trim();
            var result = res.substr(0, 2);
            switch(result) {
                case "ok":
                    $( "#dlgAgregarUMedida" ).dialog( "close" );
                    showNotification('success', res.substring(2));
                    TblUMedidaBsq();
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
            winRegUMedida.window("close");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status === 500) {
                showNotification('error', 'Error interno del servidor.'); // Mensaje claro para el usuario
            } else {
                showNotification('error', 'Ocurrió un error inesperado.');
            }
            winRegUMedida.window("close");
        }
    });
}

function openCamposEditUMedida()
{
    const row = $('#tblUMedida').datagrid('getSelected');
    if (row)
    {
        $("#editUMedidaTxtNombre").val(row.nombreUMedida);
        $("#editUMedidaTxtAbrev").val(row.abreviatura);
        $( "#dlgEditarUMedida" ).dialog( "open" );   
    }
    else
    {
        showNotification('warning', 'Debe Seleccionar una Fila');
    }
}

function editarUMedida() {
    const row = $('#tblUMedida').datagrid('getSelected');
    if (row)
    {
        const Nombre = $("#editUMedidaTxtNombre").val();
        const Abrev = $("#editUMedidaTxtAbrev").val();

        const parametros = {"cod": row.codUMedida,"Abrev": Abrev, "vNombre": Nombre};    

        let winEditUMedida;
        $.ajax({
            data: parametros,
            url: 'EditarUnidadMedida',
            type: 'post',
            beforeSend: function () {
                winEditUMedida = $.messager.progress({
                    title: 'Espere Por Favor',
                    msg: 'Los Datos se están Guardando...'
                });
            },
            success: function (data) {
                var res = data.trim();
                var result = res.substr(0, 2);
                switch(result) {
                    case "ok":
                        $( "#dlgEditarUMedida" ).dialog( "close" );
                        showNotification('success', res.substring(2));
                        TblUMedidaBsq();
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
                winEditUMedida.window("close");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status === 500) {
                    showNotification('error', 'Error interno del servidor.'); // Mensaje claro para el usuario
                } else {
                    showNotification('error', 'Ocurrió un error inesperado.');
                }
                winEditUMedida.window("close");
            }
        });
    }
    else
    {
        showNotification('warning', 'Debe Seleccionar una Fila');
    }
}

function eliminarUMedida()
{
    const row = $('#tblUMedida').datagrid('getSelected');
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
                            const parametros = {"cod": row.codUMedida};   

                            let winEliminarClase;
                            $.ajax({
                                data: parametros,
                                url: 'EliminarUnidadMedida',
                                type: 'post',
                                beforeSend: function () {
                                    winEliminarClase = $.messager.progress({
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
                                    winEliminarClase.window("close");
                                    TblUMedidaBsq();
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    if (jqXHR.status === 500) {
                                        showNotification('error', 'Error interno del servidor.'); // Mensaje claro para el usuario
                                    } else {
                                        showNotification('error', 'Ocurrió un error inesperado.');
                                    }
                                    winEliminarClase.window("close");
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

function accessUnidadMedida()
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
                    
            toggleButton("addUMedidaBtn", s[0] === '1', function() {
              $("#addUMedidaTxtNombre").val("");
              $("#addUMedidaTxtAbrev").val("");
              $( "#dlgAgregarUMedida" ).dialog( "open" );  
            });

            toggleButton("editUMedidaBtn", s[1] === '1', function() {
                openCamposEditUMedida();
            });

            toggleButton("eliminUMedidaBtn", s[2] === '1', function() {
                eliminarUMedida();
            });
            
        }); 
    }
}

