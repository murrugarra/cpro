/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 $(document).ready(function() {            
            $('#usystem_NombreBsq').textbox({
                inputEvents: $.extend({}, $.fn.textbox.defaults.inputEvents, {
                    keydown: function(event) {
                        if (event.key === 'Enter') {
                            const nombre = $(this).val();
                            TblUSystemBsqEnter(nombre);
                        }
                    }
                })
            });
            
            configurarEventosAddUSystem();
            configurarEventosEditUSystem();            
            TblUSystem();    
 
            $("#usystemBtnBusqTbl").on('click',function(event){
                TblUSystemBsq(); 
            });
 
            $("#addUSystemBtn").on('click',function(event){
              $("#addUSystemTxtApePaterno").val("");
              $("#addUSystemTxtApeMaterno").val("");
              $("#addUSystemTxtNombre").val("");
              $("#addUSystemTxtDni").val("");
              $("#addUSystemTxtCelular").val("");
              $("#addUSystemTxtCorreo").val("");
              $("#addUSystemTxtFNac").val("");
              $("#addUSystemTxtDir").val("");
              $( "#dlgAgregarUSystem" ).dialog( "open" );   
            });
 
            $("#editUSystemBtn").on('click',function(event){
                openCamposEditUSystem();
            });
            
            $("#eliminUSystemBtn").on('click',function(event){
                eliminarUSystem();
            }); 
 
            $("#dlgAddUSystemBtnCancelar").on('click',function(event){
                var isValid = $('#formRegUSystem').form('validate'); // Validar el formulario
                if (isValid) {
                    $( "#dlgAgregarUSystem" ).dialog( "close" ); // Cerrar el diálogo si el formulario es válido
                } else {
                    // Mostrar un mensaje de error o realizar alguna acción si el formulario no es válido
                    console.log('El formulario no es válido. No se puede cerrar el diálogo.');
                }
                // Evitar que el evento de clic se propague y evite cualquier comportamiento predeterminado del navegador
                event.preventDefault();
                event.stopPropagation();
            });
 
            $("#dlgEditUSystemBtnCancelar").on('click',function(event){
                var isValid = $('#formEditUSystem').form('validate'); // Validar el formulario
                if (isValid) {
                    $( "#dlgEditarUSystem" ).dialog( "close" ); // Cerrar el diálogo si el formulario es válido
                } else {
                    // Mostrar un mensaje de error o realizar alguna acción si el formulario no es válido
                    console.log('El formulario no es válido. No se puede cerrar el diálogo.');
                }
                // Evitar que el evento de clic se propague y evite cualquier comportamiento predeterminado del navegador
                event.preventDefault();
                event.stopPropagation();
            });           
            //Functionality for add Form (Productor) Edit Form
            $("#formRegUSystem").submit(function(event) {
                event.preventDefault(); // Detiene el evento por defecto del Formulario
                registrarUSystem();

            });
             //Functionality for Edit Form (Productor) Edit Form
            $("#formEditUSystem").submit(function(event) {
                event.preventDefault(); // Detiene el evento por defecto del Formulario
                editarUSystem();

            });
            
            //Solo Números
            //MAYUSCULAS
            soloMayusculas("#addUSystemTxtApePaterno");
            soloMayusculas("#addUSystemTxtApeMaterno");
            soloMayusculas("#addUSystemTxtNombre");
            soloNumerosEnteros("#addUSystemTxtDni");
            soloNumerosEnteros("#addUSystemTxtCelular");
            soloMayusculas("#addUSystemTxtDir");
 

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
function TblUSystem()
{ 
    //var comision =  document.getElementById("comboComision").value;
     $('#tblUSystem').datagrid({
                            columns: [[        
                            {field:"Dni",title:'DNI',width:70},
                            {field:"apePaterno",title:'Paterno',width:170},
                            {field:"apeMaterno",title:'Materno',width:170},
                            {field:"nombres",title:'Nombre',width:170},
                            {field:"Sexo",title:'Sexo',width:40},
                            {field:"fechaNac",title:'F. Nac.',width:80},
                            {field:"celular",title:'Celular',width:90},
                            {field:"correo",title:'Correo',width:90},
                            {field:"direccion",title:'Direccion',width:170},
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
                            toolbar: '#tbUSystem',
                            url:"ListaUsuarioSystemTbl",
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

function TblUSystemBsq()
{    
    const nombre = $('#usystem_NombreBsq').textbox('getValue');
    const vEstado = $("#usystem_EstadoBsq").combobox('getValue');
    //Recarga la tabla
   
    $("#tblUSystem").datagrid('load',
    {
        nombre: nombre,
        vEstado : vEstado
    });
}

function TblUSystemBsqEnter(nombre)
{    
    const vEstado = $("#usystem_EstadoBsq").combobox('getValue');
    //Recarga la tabla
   
    $("#tblUSystem").datagrid('load',
    {
        nombre: nombre,
        vEstado : vEstado
    });
}

function configurarEventosAddUSystem()
{
    const apater = document.getElementById('addUSystemTxtApePaterno');
    const amater = document.getElementById('addUSystemTxtApeMaterno');
    const nombre = document.getElementById('addUSystemTxtNombre');
    const dni = document.getElementById('addUSystemTxtDni');
    const sexo = document.getElementById('addUSystemCmbxSexo');
    const fnac = document.getElementById('addUSystemTxtFNac');
    
    const form = document.getElementById('formRegUSystem');


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

    apater.addEventListener('input', function() {
        validateInput(apater, !apater.value.trim(), 'A. Paterno es obligatorio');
    });
    amater.addEventListener('input', function() {
        validateInput(amater, !amater.value.trim(), 'A. Materno es obligatorio');
    });
    nombre.addEventListener('input', function() {
        validateInput(nombre, !nombre.value.trim(), 'Nombre es obligatorio');
    });
    dni.addEventListener('input', function() {
        validateInput(dni, !dni.value.trim(), 'Dni es obligatorio');
    });
    sexo.addEventListener('input', function() {
        validateInput(sexo, !sexo.value.trim(), 'Sexo es obligatorio');
    });
    fnac.addEventListener('input', function() {
        validateInput(fnac, !fnac.value.trim(), 'Fecha es obligatorio');
    });    
    form.addEventListener('submit', function(event) {
        let valid = true;
        if (!valid) {
            event.preventDefault();
        }
    });

}
function configurarEventosEditUSystem()
{
    const apater = document.getElementById('editUSystemTxtApePaterno');
    const amater = document.getElementById('editUSystemTxtApeMaterno');
    const nombre = document.getElementById('editUSystemTxtNombre');
    const dni = document.getElementById('editUSystemTxtDni');
    const sexo = document.getElementById('editUSystemCmbxSexo');
    const fnac = document.getElementById('editUSystemTxtFNac');
    
    const form = document.getElementById('formEditUSystem');


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

    apater.addEventListener('input', function() {
        validateInput(apater, !apater.value.trim(), 'A. Paterno es obligatorio');
    });
    amater.addEventListener('input', function() {
        validateInput(amater, !amater.value.trim(), 'A. Materno es obligatorio');
    });
    nombre.addEventListener('input', function() {
        validateInput(nombre, !nombre.value.trim(), 'Nombre es obligatorio');
    });
    dni.addEventListener('input', function() {
        validateInput(dni, !dni.value.trim(), 'Dni es obligatorio');
    });
    sexo.addEventListener('input', function() {
        validateInput(sexo, !sexo.value.trim(), 'Sexo es obligatorio');
    });
    fnac.addEventListener('input', function() {
        validateInput(fnac, !fnac.value.trim(), 'Fecha es obligatorio');
    });    
    form.addEventListener('submit', function(event) {
        let valid = true;
        if (!valid) {
            event.preventDefault();
        }
    });

}

function registrarUSystem() {
    const Paterno = $("#addUSystemTxtApePaterno").val(); 
    const Materno = $("#addUSystemTxtApeMaterno").val(); 
    const Nombres = $("#addUSystemTxtNombre").val(); 
    const Dni = $("#addUSystemTxtDni").val(); 
    const Celular = $("#addUSystemTxtCelular").val(); 
    const Correo = $("#addUSystemTxtCorreo").val(); 
    const Sexo = document.getElementById("addUSystemCmbxSexo").value; 
    const FechaNac = $("#addUSystemTxtFNac").val(); 
    const Direccion = $("#addUSystemTxtDir").val(); 
    
    
    const parametros = {"Paterno": Paterno, "Materno": Materno, "Nombres": Nombres, "Dni": Dni, "Celular": Celular, "Correo": Correo, "Sexo": Sexo, "FechaNac": FechaNac, "Direccion": Direccion};    
    
    let winRegUystem;
    $.ajax({
        data: parametros,
        url: 'AgregarUserSystem',
        type: 'post',
        beforeSend: function () {
            winRegUystem = $.messager.progress({
                title: 'Espere Por Favor',
                msg: 'Los Datos se están Guardando...'
            });
        },
        success: function (data) {
            var res = data.trim();
            var result = res.substr(0, 2);
            switch(result) {
                case "ok":
                    $( "#dlgAgregarUSystem" ).dialog( "close" );
                    showNotification('success', res.substring(2));
                    TblUSystemBsq();
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
            winRegUystem.window("close");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status === 500) {
                showNotification('error', 'Error interno del servidor.'); // Mensaje claro para el usuario
            } else {
                showNotification('error', 'Ocurrió un error inesperado.');
            }
            winRegUystem.window("close");
        }
    });
}

function openCamposEditUSystem()
{
    const row = $('#tblUSystem').datagrid('getSelected');
    if (row)
    {
        $("#editUSystemTxtApePaterno").val(row.apePaterno);
        $("#editUSystemTxtApeMaterno").val(row.apeMaterno);
        $("#editUSystemTxtNombre").val(row.nombres);
        $("#editUSystemTxtDni").val(row.Dni);
        $("#editUSystemTxtCelular").val(row.celular);
        $("#editUSystemTxtCorreo").val(row.correo);
        $("#editUSystemTxtFNac").val(row.fechaNac);
        $("#editUSystemTxtDir").val(row.direccion);
        document.getElementById("editUSystemCmbxSexo").value=row.Sexo; 
        $( "#dlgEditarUSystem" ).dialog( "open" );   
    }
    else
    {
        showNotification('warning', 'Debe Seleccionar una Fila');
    }
}


function editarUSystem() {
    const row = $('#tblUSystem').datagrid('getSelected');
    if (row)
    {
        const Paterno = $("#editUSystemTxtApePaterno").val();
        const Materno = $("#editUSystemTxtApeMaterno").val(); 
        const Nombres = $("#editUSystemTxtNombre").val(); 
        const Dni = $("#editUSystemTxtDni").val(); 
        const Celular = $("#editUSystemTxtCelular").val(); 
        const Correo = $("#editUSystemTxtCorreo").val(); 
        const Sexo = document.getElementById("editUSystemCmbxSexo").value; 
        const FechaNac = $("#editUSystemTxtFNac").val(); 
        const Direccion = $("#editUSystemTxtDir").val(); 
        
        const parametros = {"Paterno": Paterno, "Materno": Materno, "Nombres": Nombres, "Dni": Dni, "Celular": Celular, "Correo": Correo, "Sexo": Sexo, "FechaNac": FechaNac, "Direccion": Direccion, "CodUser":row.Dni};    
    
        let winEditUSystem;
        $.ajax({
            data: parametros,
            url: 'EditarUserSystem',
            type: 'post',
            beforeSend: function () {
                winEditUSystem = $.messager.progress({
                    title: 'Espere Por Favor',
                    msg: 'Los Datos se están Guardando...'
                });
            },
            success: function (data) {
                var res = data.trim();
                var result = res.substr(0, 2);
                switch(result) {
                    case "ok":
                        $( "#dlgEditarUSystem" ).dialog( "close" );
                        showNotification('success', res.substring(2));
                        TblUSystemBsq();
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
                winEditUSystem.window("close");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status === 500) {
                    showNotification('error', 'Error interno del servidor.'); // Mensaje claro para el usuario
                } else {
                    showNotification('error', 'Ocurrió un error inesperado.');
                }
                winEditUSystem.window("close");
            }
        });
    }
    else
    {
        showNotification('warning', 'Debe Seleccionar una Fila');
    }
}

function eliminarUSystem()
{
    const row = $('#tblUSystem').datagrid('getSelected');
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
                            const parametros = {"CodUser":row.Dni};   

                            let winEliminarUSystem;
                            $.ajax({
                                data: parametros,
                                url: 'EliminarUserSystem',
                                type: 'post',
                                beforeSend: function () {
                                    winEliminarUSystem = $.messager.progress({
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
                                    winEliminarUSystem.window("close");
                                    TblUSystemBsq();
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    if (jqXHR.status === 500) {
                                        showNotification('error', 'Error interno del servidor.'); // Mensaje claro para el usuario
                                    } else {
                                        showNotification('error', 'Ocurrió un error inesperado.');
                                    }
                                    winEliminarUSystem.window("close");
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
