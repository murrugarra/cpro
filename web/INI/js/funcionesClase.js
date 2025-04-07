/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 $(document).ready(function() {            
            $('#clase_NombreBsq').textbox({
                inputEvents: $.extend({}, $.fn.textbox.defaults.inputEvents, {
                    keydown: function(event) {
                        if (event.key === 'Enter') {
                            const nombre = $(this).val();
                            TblClaseBsqEnter(nombre);
                        }
                    }
                })
            });
            
            configurarEventosAddClase();
            configurarEventosEditClase();            
            TblClase();    
            accessClase();
 
            $("#claseBtnBusqTbl").on('click',function(event){
                TblClaseBsq(); 
            });
 
            $("#dlgAddClaseBtnCancelar").on('click',function(event){
                var isValid = $('#formRegClase').form('validate'); // Validar el formulario
                if (isValid) {
                    $( "#dlgAgregarClase" ).dialog( "close" ); // Cerrar el diálogo si el formulario es válido
                } else {
                    // Mostrar un mensaje de error o realizar alguna acción si el formulario no es válido
                    console.log('El formulario no es válido. No se puede cerrar el diálogo.');
                }
                // Evitar que el evento de clic se propague y evite cualquier comportamiento predeterminado del navegador
                event.preventDefault();
                event.stopPropagation();
            });
 
            $("#dlgEditClaseBtnCancelar").on('click',function(event){
                var isValid = $('#formEditClase').form('validate'); // Validar el formulario
                if (isValid) {
                    $( "#dlgEditarClase" ).dialog( "close" ); // Cerrar el diálogo si el formulario es válido
                } else {
                    // Mostrar un mensaje de error o realizar alguna acción si el formulario no es válido
                    console.log('El formulario no es válido. No se puede cerrar el diálogo.');
                }
                // Evitar que el evento de clic se propague y evite cualquier comportamiento predeterminado del navegador
                event.preventDefault();
                event.stopPropagation();
            });           
            //Functionality for add Form (Productor) Edit Form
            $("#formRegClase").submit(function(event) {
                event.preventDefault(); // Detiene el evento por defecto del Formulario
                registrarClase();

            });
             //Functionality for Edit Form (Productor) Edit Form
            $("#formEditClase").submit(function(event) {
                event.preventDefault(); // Detiene el evento por defecto del Formulario
                editarClase();

            });
            
            //Solo Números
            //MAYUSCULAS
            soloMayusculas("#addClaseTxtNombre");
            soloMayusculas("#editClaseTxtNombre");
 

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
function comboGrupoList()
{
    $("#addClaseCmbxGrupo").combobox({
            valueField:'id',
            textField:'text',      
            editable:false, panelHeight:'auto',
            queryParams:{},
            method:'post',
            width: 210,
            url:"ListaGrupoCmbx",
            onSelect: function(f)
            {                 
            }
    });   

}   */
function initComboGrupo(comboId, selectedValue) {
    $("#" + comboId).combobox({
        valueField: 'id',
        textField: 'text',
        editable:false, 
        panelHeight:'auto',
        method: 'post',
        width: 210,
        url: "ListaGrupoCmbx",
        onSelect: function(f) {
        }
    });

    // Si se pasa un valor seleccionado, establecerlo después de que se cargue el combobox
    if (selectedValue !== undefined) {
       console.log(selectedValue);
        $("#" + comboId).combobox('setValue', selectedValue);
    }
}

//Inicialización de la Tabla Grupo
function TblClase()
{ 
    //var comision =  document.getElementById("comboComision").value;
     $('#tblClase').datagrid({
                            columns: [[        
                            {field:"codGrupo",hidden:true},
                            {field:"codClase",hidden:true},
                            {field:"nombreGrupo",title:'Grupo',hidden:true},
                            {field:"nombre",title:'Nombre',width:370},
                            {field:"Estado",title:'Estado',hidden:true}
                            ]],
                            singleSelect: true,
                            autoRowHeight: false,
                            rownumbers:true,
                            pagination:true,
                            title:"Lista de Clases",
                            width: 'auto',
                            height: 599,
                            pageSize:20,
                            method:'post',
                            toolbar: '#tbClase',
                            url:"ListaClaseTbl",
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

function TblClaseBsq()
{    
    const nombre = $('#clase_NombreBsq').textbox('getValue');
    const vEstado = $("#clase_EstadoBsq").combobox('getValue');
    //Recarga la tabla
   
    $("#tblClase").datagrid('load',
    {
        nombre: nombre,
        vEstado : vEstado
    });
}

function TblClaseBsqEnter(nombre)
{    
    const vEstado = $("#clase_EstadoBsq").combobox('getValue');
    //Recarga la tabla
   
    $("#tblClase").datagrid('load',
    {
        nombre: nombre,
        vEstado : vEstado
    });
}

function configurarEventosAddClase()
{
    const nombre = document.getElementById('addClaseTxtNombre');
    const form = document.getElementById('formRegClase');


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
function configurarEventosEditClase()
{
    const nombre = document.getElementById('editClaseTxtNombre');
    const form = document.getElementById('formEditClase');


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

function registrarClase() {
    const Nombre = $("#addClaseTxtNombre").val(); 
    const Grupo = 1;//$('#addClaseCmbxGrupo').combobox('getValue');
    
    const parametros = {"Grupo": Grupo, "vNombre": Nombre};    
    
    let winRegClase;
    $.ajax({
        data: parametros,
        url: 'AgregarClase',
        type: 'post',
        beforeSend: function () {
            winRegClase = $.messager.progress({
                title: 'Espere Por Favor',
                msg: 'Los Datos se están Guardando...'
            });
        },
        success: function (data) {
            var res = data.trim();
            var result = res.substr(0, 2);
            switch(result) {
                case "ok":
                    $( "#dlgAgregarClase" ).dialog( "close" );
                    showNotification('success', res.substring(2));
                    TblClaseBsq();
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
            winRegClase.window("close");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status === 500) {
                showNotification('error', 'Error interno del servidor.'); // Mensaje claro para el usuario
            } else {
                showNotification('error', 'Ocurrió un error inesperado.');
            }
            winRegClase.window("close");
        }
    });
}

function openCamposEditClase()
{
    const row = $('#tblClase').datagrid('getSelected');
    if (row)
    {
        $("#editClaseTxtNombre").val(row.nombre);
        $( "#dlgEditarClase" ).dialog( "open" );   
      //  initComboGrupo('editClaseCmbxGrupo', row.codGrupo);
    }
    else
    {
        showNotification('warning', 'Debe Seleccionar una Fila');
    }
}


function editarClase() {
    const row = $('#tblClase').datagrid('getSelected');
    if (row)
    {
        const Nombre = $("#editClaseTxtNombre").val(); 
        const GrupoNew = 1;//$('#editClaseCmbxGrupo').combobox('getValue');

        const parametros = {"GrupoAnt": row.codGrupo,"Clase": row.codClase,"GrupoNew": GrupoNew, "vNombre": Nombre};    

        let winEditClase;
        $.ajax({
            data: parametros,
            url: 'EditarClase',
            type: 'post',
            beforeSend: function () {
                winEditClase = $.messager.progress({
                    title: 'Espere Por Favor',
                    msg: 'Los Datos se están Guardando...'
                });
            },
            success: function (data) {
                var res = data.trim();
                var result = res.substr(0, 2);
                switch(result) {
                    case "ok":
                        $( "#dlgEditarClase" ).dialog( "close" );
                        showNotification('success', res.substring(2));
                        TblClaseBsq();
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
                winEditClase.window("close");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status === 500) {
                    showNotification('error', 'Error interno del servidor.'); // Mensaje claro para el usuario
                } else {
                    showNotification('error', 'Ocurrió un error inesperado.');
                }
                winEditClase.window("close");
            }
        });
    }
    else
    {
        showNotification('warning', 'Debe Seleccionar una Fila');
    }
}

function eliminarClase()
{
    const row = $('#tblClase').datagrid('getSelected');
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
                            const parametros = {"Grupo": row.codGrupo,"Clase": row.codClase};   

                            let winEliminarClase;
                            $.ajax({
                                data: parametros,
                                url: 'EliminarClase',
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
                                    TblClaseBsq();
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


function accessClase()
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
                    
            toggleButton("addClaseBtn", s[0] === '1', function() {
              $("#addClaseTxtNombre").val("");
               // initComboGrupo('addClaseCmbxGrupo');
              $( "#dlgAgregarClase" ).dialog( "open" );  
            });

            toggleButton("editClaseBtn", s[1] === '1', function() {
                openCamposEditClase();
            });

            toggleButton("eliminClaseBtn", s[2] === '1', function() {
                eliminarClase();
            });
            
        }); 
    }
}
