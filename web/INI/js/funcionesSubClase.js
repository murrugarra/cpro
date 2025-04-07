/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


 $(document).ready(function() {            
            $('#subclase_NombreBsq').textbox({
                inputEvents: $.extend({}, $.fn.textbox.defaults.inputEvents, {
                    keydown: function(event) {
                        if (event.key === 'Enter') {
                            const nombre = $(this).val();
                            TblSubClaseBsqEnter(nombre);
                        }
                    }
                })
            });
            
            configurarEventosAddSubClase();
            configurarEventosEditSubClase();            
            TblSubClase();    
            accessSubClase();
 
            $("#subclaseBtnBusqTbl").on('click',function(event){
                TblSubClaseBsq(); 
            });
 
 
            $("#dlgAddSubClaseBtnCancelar").on('click',function(event){
                var isValid = $('#formRegSubClase').form('validate'); // Validar el formulario
                if (isValid) {
                    $( "#dlgAgregarSubClase" ).dialog( "close" ); // Cerrar el diálogo si el formulario es válido
                } else {
                    // Mostrar un mensaje de error o realizar alguna acción si el formulario no es válido
                    console.log('El formulario no es válido. No se puede cerrar el diálogo.');
                }
                // Evitar que el evento de clic se propague y evite cualquier comportamiento predeterminado del navegador
                event.preventDefault();
                event.stopPropagation();
            });
 
            $("#dlgEditSubClaseBtnCancelar").on('click',function(event){
                var isValid = $('#formEditSubClase').form('validate'); // Validar el formulario
                if (isValid) {
                    $( "#dlgEditarSubClase" ).dialog( "close" ); // Cerrar el diálogo si el formulario es válido
                } else {
                    // Mostrar un mensaje de error o realizar alguna acción si el formulario no es válido
                    console.log('El formulario no es válido. No se puede cerrar el diálogo.');
                }
                // Evitar que el evento de clic se propague y evite cualquier comportamiento predeterminado del navegador
                event.preventDefault();
                event.stopPropagation();
            });           
            //Functionality for add Form (Productor) Edit Form
            $("#formRegSubClase").submit(function(event) {
                event.preventDefault(); // Detiene el evento por defecto del Formulario
                registrarSubClase();

            });
             //Functionality for Edit Form (Productor) Edit Form
            $("#formEditSubClase").submit(function(event) {
                event.preventDefault(); // Detiene el evento por defecto del Formulario
                editarSubClase();

            });
            
            //Solo Números
            //MAYUSCULAS
            soloMayusculas("#addSubClaseTxtNombre");
            soloMayusculas("#editSubClaseTxtNombre");
 

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
        

function initComboGrupoSubClase(comboId,comboClassId, selectedValue,sValueSubClass) {
    $("#" + comboId).combobox({
        valueField: 'id',
        textField: 'text',
        editable:false, 
        panelHeight:'auto',
        method: 'post',
        width: 210,
        url: "ListaGrupoCmbx",
        onSelect: function(f) {
            loadClasesSubClase(comboClassId,f.id);
        },
        onLoadSuccess: function () {
            if (selectedValue !== undefined ||  selectedValue !== '-1' ) {
                $("#" + comboId).combobox('setValue', selectedValue);
                loadClasesSubClase(comboClassId, selectedValue, sValueSubClass);
            }
            else
            {
                loadClasesSubClase(comboClassId, -1);
            }
        }
    });
}

function loadClasesSubClase(comboId, idGrupo, selectedValue) {
            $("#" + comboId).combobox({
                valueField: 'id',
                textField: 'text',
                editable: false,
                panelHeight: 'auto',
                method: 'post',
                width: 210,
                queryParams:{idGrupo:idGrupo},
                url: 'ListaClaseCmbx',
                onSelect: function (f) {
                },
                onLoadSuccess: function () {
                    if (selectedValue !== undefined) {
                        $("#" + comboId).combobox('setValue', selectedValue);
                    }
                }
            });
          
 }


//Inicialización de la Tabla Grupo
function TblSubClase()
{ 
    //var comision =  document.getElementById("comboComision").value;
     $('#tblSubClase').datagrid({
                            columns: [[        
                            {field:"codGrupo",hidden:true},
                            {field:"codClase",hidden:true},
                            {field:"codSubClase",hidden:true},
                            {field:"nombreGrupo",hidden:true},
                            {field:"nombreClase",title:'Clase',width:370},
                            {field:"nombre",title:'Nombre',width:370},
                            {field:"Estado",title:'Estado',hidden:true}
                            ]],
                            singleSelect: true,
                            autoRowHeight: false,
                            rownumbers:true,
                            pagination:true,
                            title:"Lista de Sub Clases",
                            width: 'auto',
                            height: 599,
                            pageSize:20,
                            method:'post',
                            toolbar: '#tbSubClase',
                            url:"ListaSubClaseTbl",
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

function TblSubClaseBsq()
{    
    const nombre = $('#subclase_NombreBsq').textbox('getValue');
    const vEstado = $("#subclase_EstadoBsq").combobox('getValue');
    //Recarga la tabla
   
    $("#tblSubClase").datagrid('load',
    {
        nombre: nombre,
        vEstado : vEstado
    });
}

function TblSubClaseBsqEnter(nombre)
{    
    const vEstado = $("#subclase_EstadoBsq").combobox('getValue');
    //Recarga la tabla
   
    $("#tblSubClase").datagrid('load',
    {
        nombre: nombre,
        vEstado : vEstado
    });
}

function configurarEventosAddSubClase()
{
    const nombre = document.getElementById('addSubClaseTxtNombre');
    const form = document.getElementById('formRegSubClase');


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
function configurarEventosEditSubClase()
{
    const nombre = document.getElementById('editSubClaseTxtNombre');
    const form = document.getElementById('formEditSubClase');


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

function registrarSubClase() {
    const Nombre = $("#addSubClaseTxtNombre").val(); 
    const Grupo = 1;//$('#addSubClaseCmbxGrupo').combobox('getValue');
    const Clase = $('#addSubClaseCmbxClase').combobox('getValue');
    
    const parametros = {"Grupo": Grupo, "Clase": Clase, "vNombre": Nombre};    
    
    let winRegSubClase;
    $.ajax({
        data: parametros,
        url: 'AgregarSubClase',
        type: 'post',
        beforeSend: function () {
            winRegSubClase = $.messager.progress({
                title: 'Espere Por Favor',
                msg: 'Los Datos se están Guardando...'
            });
        },
        success: function (data) {
            var res = data.trim();
            var result = res.substr(0, 2);
            switch(result) {
                case "ok":
                    $( "#dlgAgregarSubClase" ).dialog( "close" );
                    showNotification('success', res.substring(2));
                    TblSubClaseBsq();
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
            winRegSubClase.window("close");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status === 500) {
                showNotification('error', 'Error interno del servidor.'); // Mensaje claro para el usuario
            } else {
                showNotification('error', 'Ocurrió un error inesperado.');
            }
            winRegSubClase.window("close");
        }
    });
}

function openCamposEditSubClase()
{
    const row = $('#tblSubClase').datagrid('getSelected');
    if (row)
    {
        $("#editSubClaseTxtNombre").val(row.nombre); 
        //initComboGrupoSubClase('editSubClaseCmbxGrupo','editSubClaseCmbxClase', row.codGrupo, row.codClase);
        loadClasesSubClase('editSubClaseCmbxClase', 1, row.codClase);
        $( "#dlgEditarSubClase" ).dialog( "open" );  
    }
    else
    {
        showNotification('warning', 'Debe Seleccionar una Fila');
    }
}

function editarSubClase() {
    const row = $('#tblSubClase').datagrid('getSelected');
    if (row)
    {
        const Nombre = $("#editSubClaseTxtNombre").val(); 
        const GrupoNew = 1;//$('#editSubClaseCmbxGrupo').combobox('getValue');
        const ClaseNew = $('#editSubClaseCmbxClase').combobox('getValue');

        const parametros = {"GrupoAnt": row.codGrupo,"ClaseAnt": row.codClase,"SubClase": row.codSubClase,"GrupoNew": GrupoNew,"ClaseNew": ClaseNew, "vNombre": Nombre};    

        let winEditSubClase;
        $.ajax({
            data: parametros,
            url: 'EditarSubClase',
            type: 'post',
            beforeSend: function () {
                winEditSubClase = $.messager.progress({
                    title: 'Espere Por Favor',
                    msg: 'Los Datos se están Guardando...'
                });
            },
            success: function (data) {
                var res = data.trim();
                var result = res.substr(0, 2);
                switch(result) {
                    case "ok":
                        $( "#dlgEditarSubClase" ).dialog( "close" );
                        showNotification('success', res.substring(2));
                        TblSubClaseBsq();
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
                winEditSubClase.window("close");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status === 500) {
                    showNotification('error', 'Error interno del servidor.'); // Mensaje claro para el usuario
                } else {
                    showNotification('error', 'Ocurrió un error inesperado.');
                }
                winEditSubClase.window("close");
            }
        });
    }
    else
    {
        showNotification('warning', 'Debe Seleccionar una Fila');
    }
}

function eliminarSubClase()
{
    const row = $('#tblSubClase').datagrid('getSelected');
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
                            const parametros = {"Grupo": row.codGrupo,"Clase": row.codClase,"SubClase": row.codSubClase};   

                            let winEliminarSubClase;
                            $.ajax({
                                data: parametros,
                                url: 'EliminarSubClase',
                                type: 'post',
                                beforeSend: function () {
                                    winEliminarSubClase = $.messager.progress({
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
                                    winEliminarSubClase.window("close");
                                    TblSubClaseBsq();
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    if (jqXHR.status === 500) {
                                        showNotification('error', 'Error interno del servidor.'); // Mensaje claro para el usuario
                                    } else {
                                        showNotification('error', 'Ocurrió un error inesperado.');
                                    }
                                    winEliminarSubClase.window("close");
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


function accessSubClase()
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
                    
            toggleButton("addSubClaseBtn", s[0] === '1', function() {
              $("#addSubClaseTxtNombre").val("");
             // initComboGrupoSubClase('addSubClaseCmbxGrupo','addSubClaseCmbxClase');
                loadClasesSubClase('addSubClaseCmbxClase', 1);
              $( "#dlgAgregarSubClase" ).dialog( "open" ); 
            });

            toggleButton("editSubClaseBtn", s[1] === '1', function() {
                openCamposEditSubClase();
            });

            toggleButton("eliminSubClaseBtn", s[2] === '1', function() {
                eliminarSubClase();
            });
            
        }); 
    }
}
