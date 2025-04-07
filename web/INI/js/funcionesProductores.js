/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 $(document).ready(function() {
            $('#productores_UsuarioBsq').textbox({
                inputEvents: $.extend({}, $.fn.textbox.defaults.inputEvents, {
                    keydown: function(event) {
                        if (event.key === 'Enter') {
                            TblPadronUsuariosBsq();
                        }
                    }
                })
            });
            
            $('#productores_DocBsq').textbox({
                inputEvents: $.extend({}, $.fn.textbox.defaults.inputEvents, {
                    keydown: function(event) {
                        if (event.key === 'Enter') {
                            TblPadronUsuariosBsq();
                        }
                    }
                })
            });
                        
            accessProductores();
            configurarEventosAddProductor();
            configurarEventosEditProductor();
                
            $("#addProductorCmbxTipoProductor").on("change", function() {
                let tipoUsuarioSeleccionado = $(this).val();
                habilitarCamposAddProductor(tipoUsuarioSeleccionado);
            });
            
            $("#editProductorCmbxTipoProductor").on("change", function() {
                let tipoUsuarioSeleccionado = $(this).val();
                habilitarCamposEditProductor(tipoUsuarioSeleccionado);
            });
 
            $("#addProductorBtnBusqTbl").on('click',function(event){
                TblPadronUsuariosBsq(); 
            });
 
 
            $("#dlgAddProductorBtnCancelar").on('click',function(event){
                var isValid = $('#formRegProductor').form('validate'); // Validar el formulario
                if (isValid) {
                    $( "#dlgAgregarProductores" ).dialog( "close" ); // Cerrar el diálogo si el formulario es válido
                } else {
                    // Mostrar un mensaje de error o realizar alguna acción si el formulario no es válido
                    console.log('El formulario no es válido. No se puede cerrar el diálogo.');
                }
                // Evitar que el evento de clic se propague y evite cualquier comportamiento predeterminado del navegador
                event.preventDefault();
                event.stopPropagation();
            });
 
            $("#dlgEditProductorBtnCancelar").on('click',function(event){
                var isValid = $('#formEditProductor').form('validate'); // Validar el formulario
                if (isValid) {
                    $( "#dlgEditarProductores" ).dialog( "close" ); // Cerrar el diálogo si el formulario es válido
                } else {
                    // Mostrar un mensaje de error o realizar alguna acción si el formulario no es válido
                    console.log('El formulario no es válido. No se puede cerrar el diálogo.');
                }
                // Evitar que el evento de clic se propague y evite cualquier comportamiento predeterminado del navegador
                event.preventDefault();
                event.stopPropagation();
            });           
            //Functionality for add Form (Productor) Edit Form
            $("#formRegProductor").submit(function(event) {
                event.preventDefault(); // Detiene el evento por defecto del Formulario
                registrarProductor();

            });
             //Functionality for Edit Form (Productor) Edit Form
            $("#formEditProductor").submit(function(event) {
                event.preventDefault(); // Detiene el evento por defecto del Formulario
                registrarEditarProductor();

            });
            
            //Solo Números
            soloNumeros("#addProductorTxtDni");
            soloNumeros("#addProductorTxtRuc");
            soloNumeros("#addProductorTxtTelefono");

            //MAYUSCULAS
            soloMayusculas("#addProductorTxtApePaterno");
            soloMayusculas("#addProductorTxtApeMaterno");
            soloMayusculas("#addProductorTxtNombres");
            soloMayusculas("#addProductorTxtRazonSocial");
            soloMayusculas("#addProductorTxtDireccion");
            
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
        
        
//Inicialización de la Tabla Padrón Usuarios
function TblPadronUsuarios()
{ 
    //var comision =  document.getElementById("comboComision").value;
     $('#tblProductores').datagrid({
                            columns: [[        
                            {field:"codProductores",hidden:true,title:'iIdUsuario'},
                            {field:"TipoProductor",title:'Tipo',width:70,hidden:true},
                            {field:"ApePaterno",title:'Apellido Paterno',hidden:true},
                            {field:"ApeMaterno",title:'Apellido Materno',hidden:true},
                            {field:"Nombres",title:'Nombres',hidden:true},
                            {field:"Dni",title:'D.N.I',width:70},
                            {field:"Ruc",title:'R.U.C',width:130},                            
                            {field:"nomProductor",title:'Productor',width:300},
                            {field:"Celular",title:'Teléfono',width:80},
                            {field:"FechaIngreso",title:'F. Ingreso',width:80},
                            {field:"RazonSocial",title:'Razón Social',hidden:true},
                            {field:"Direccion",title:'Dirección',width:380},
                            {field:"Correo",title:'Correo',width:150},
                            {field:"Estado",title:'Estado',hidden:true}
                            ]],
                            singleSelect: true,
                            autoRowHeight: false,
                            rownumbers:true,
                            pagination:true,
                            title:"Lista de Productores",
                            width: 'auto',
                            height: 599,
                            pageSize:20,
                            method:'post',
                            toolbar: '#tbProductores',
                            url:"ListaProductoresTbl",
                            queryParams:{comision:1},
                            //url: "PlanCultivoRiego/listarUsuariosDeclaradoDis.jsp?idComision="+idComision+"&idCampania="+idCampania+"&idNroCampania="+idNroCampania,
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

function TblPadronUsuariosBsq()
{
    
    let productor = $('#productores_UsuarioBsq').textbox('getValue');
    let docuemnto = $('#productores_DocBsq').textbox('getValue');
    let vEstado = $("#productores_EstadoBsq").combobox('getValue');
    let vTipo = $("#productores_TipoUsuarioBsq").combobox('getValue');
    
    //Inhabilita al botón "Editar" para que pueda abrir el Modal/Formulario Editar Usuario
    /*$("#btnEditarProductor").removeAttr("data-bs-toggle");
    $("#btnEditarProductor").removeAttr("data-bs-target");*/
    
    //Recarga la tabla
    $("#tblProductores").datagrid('load',
    {
        productor: productor,
        docuemnto: docuemnto,
        vEstado : vEstado,
        vTipo : vTipo
    });
}


function registrarProductor(){
    let iTipoUsuario = $("#addProductorCmbxTipoProductor").val();
    let iDni = $("#addProductorTxtDni").val(); 
    let iRuc = $("#addProductorTxtRuc").val();
    let vNombres = $("#addProductorTxtNombres").val();
    let vApePaterno = $("#addProductorTxtApePaterno").val();
    let vApeMaterno = $("#addProductorTxtApeMaterno").val();
    let iCelular = $("#addProductorTxtTelefono").val();
    let vDireccion = $("#addProductorTxtDireccion").val();
    let vRazonSocial = $("#addProductorTxtRazonSocial").val();
    let dFechaIngreso = $("#addProductorTxtFechaIngreso").val();
    let vCorreo = $("#addProductorTxtCorreo").val();
    
    var parametros = {"vNombresReg": vNombres,
        "vApePaternoReg": vApePaterno,
        "vApeMaternoReg": vApeMaterno,
        "iCelularReg": iCelular,
        "iDniReg": iDni,
        "iRucReg": iRuc,
        "vDireccionReg": vDireccion,
        "vRazonSocialReg": vRazonSocial,
        "dfechaIngresoReg": dFechaIngreso,
        "vCorreoReg": vCorreo,
        "iTipoProductorReg": iTipoUsuario};
    
    
    var winRegProductor;
    $.ajax({
                data:  parametros,
                url:   'AgregarProductores',
                type:  'post',
                beforeSend: function () 
                {
                    winRegProductor = $.messager.progress({
                        title: 'Espere PorFavor',
                        msg: 'Los Datos se estan Guardando...'
                    });
                },
                success:  function (data) 
                {
                    var res = data.trim();
                    var result  = res.substr(0,2);
                    if(result==="ok")
                    {
                        $( "#dlgAgregarProductores" ).dialog( "close" );
                        showNotification('success', res.substring(2));
                        winRegProductor.window("close");
                        TblPadronUsuariosBsq();

                    }
                    else if(result==="av")
                    {
                        showNotification('warning', res.substring(2));
                        winRegProductor.window("close");
                    }
                    else if(result==="er")
                    {
                        showNotification('error', res.substring(2));
                        winRegProductor.window("close");
                    }
                    else
                    {
                        showNotification('info', res.substring(2));
                        winRegProductor.window("close");
                    }


                    
                }
             });
    
}

function configurarEventosAddProductor()
{
    
            const tipoProductor = document.getElementById('addProductorCmbxTipoProductor');
            const dni = document.getElementById('addProductorTxtDni');
            const ruc = document.getElementById('addProductorTxtRuc');
            const apePaterno = document.getElementById('addProductorTxtApePaterno');
            const apeMaterno = document.getElementById('addProductorTxtApeMaterno');
            const nombres = document.getElementById('addProductorTxtNombres');
            const razonSocial = document.getElementById('addProductorTxtRazonSocial');
            const form = document.getElementById('formRegProductor');
/*
            tipoProductor.addEventListener('change', function() {
                if (tipoProductor.value === '0') { // Persona Natural
                    dni.disabled = false;
                    apePaterno.disabled = false;
                    apeMaterno.disabled = false;
                    nombres.disabled = false;
                    ruc.focus=false;
                    dni.focus=true;

                    ruc.disabled = true;
                    razonSocial.disabled = true;
                } else { // Persona Jurídica
                    dni.disabled = true;
                    apePaterno.disabled = true;
                    apeMaterno.disabled = true;
                    nombres.disabled = true;
                    ruc.focus=true;
                    dni.focus=false;

                    ruc.disabled = false;
                    razonSocial.disabled = false;
                }
                dni.setCustomValidity('');
                ruc.setCustomValidity('');
                apePaterno.setCustomValidity('');
                apeMaterno.setCustomValidity('');
                nombres.setCustomValidity('');
                razonSocial.setCustomValidity('');
            });*/

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

            dni.addEventListener('input', function() {
                validateInput(dni, dni.value.trim().length !== 8, 'DNI debe tener 8 dígitos');
            });

            ruc.addEventListener('input', function() {
                validateInput(ruc, !(ruc.value.trim().length === 11 || ruc.value.trim().length === 13), 'RUC debe tener 11 o 13 dígitos');
            });

            apePaterno.addEventListener('input', function() {
                validateInput(apePaterno, !apePaterno.value.trim(), 'Apellido Paterno es obligatorio');
            });

            apeMaterno.addEventListener('input', function() {
                validateInput(apeMaterno, !apeMaterno.value.trim(), 'Apellido Materno es obligatorio');
            });

            nombres.addEventListener('input', function() {
                validateInput(nombres, !nombres.value.trim(), 'Nombres es obligatorio');
            });

            razonSocial.addEventListener('input', function() {
                validateInput(razonSocial, !razonSocial.value.trim(), 'Razón Social es obligatoria');
            });

            form.addEventListener('submit', function(event) {
                let valid = true;
                if (tipoProductor.value === '0') { // Persona Natural
                    validateInput(dni, dni.value.trim().length !== 8, 'DNI debe tener 8 dígitos');
                    validateInput(apePaterno, !apePaterno.value.trim(), 'Apellido Paterno es obligatorio');
                    validateInput(apeMaterno, !apeMaterno.value.trim(), 'Apellido Materno es obligatorio');
                    validateInput(nombres, !nombres.value.trim(), 'Nombres es obligatorio');

                    valid = dni.checkValidity() && apePaterno.checkValidity() && apeMaterno.checkValidity() && nombres.checkValidity();
                } else { // Persona Jurídica
                    validateInput(ruc, !(ruc.value.trim().length === 11 || ruc.value.trim().length === 13), 'RUC debe tener 11 o 13 dígitos');
                    validateInput(razonSocial, !razonSocial.value.trim(), 'Razón Social es obligatoria');

                    valid = ruc.checkValidity() && razonSocial.checkValidity();
                }

                if (!valid) {
                    event.preventDefault();
                }
            });

            // Trigger the change event to set the initial state
            tipoProductor.dispatchEvent(new Event('change'));
}

function habilitarCamposAddProductor(tipoUsuario){
    if(tipoUsuario === "0" ){
        //Habilita el campos DNI del formulario agregar productor
        $("#addProductorTxtDni").removeAttr("disabled");
        $("#addProductorTxtApePaterno").removeAttr("disabled");
        $("#addProductorTxtApeMaterno").removeAttr("disabled");
        $("#addProductorTxtNombres").removeAttr("disabled");
        
        //Deshabilita los campos RUC y Razón Social
        $("#addProductorTxtRuc").prop("disabled",true);
        $("#addProductorTxtRuc").val("");
        $("#addProductorTxtRazonSocial").prop("disabled",true);
        $("#addProductorTxtRazonSocial").val("");
        
        $("#addProductorTxtDni").focus();
    }else{
        //Habilita el campos DNI del formulario agregar productor
        $("#addProductorTxtRuc").removeAttr("disabled");
        $("#addProductorTxtRazonSocial").removeAttr("disabled");
        
        //Deshabilita los campos RUC y Razón Social
        $("#addProductorTxtDni").prop("disabled",true);
        $("#addProductorTxtDni").val("");
        $("#addProductorTxtApePaterno").prop("disabled",true);
        $("#addProductorTxtApePaterno").val("");
        $("#addProductorTxtApeMaterno").prop("disabled",true);
        $("#addProductorTxtApeMaterno").val("");
        $("#addProductorTxtNombres").prop("disabled",true);
        $("#addProductorTxtNombres").val("");
        
        $("#addProductorTxtRuc").focus();
    }
}

function limpiarCamposAddProductor()
{
    // Resetea el valor del select a "0"
    document.getElementById("addProductorCmbxTipoProductor").value = "0";
    // Dispara el evento change para aplicar cualquier lógica asociada
    $("#addProductorCmbxTipoProductor").trigger('change');
    
    $("#addProductorTxtDni").val("");
    $("#addProductorTxtRuc").val("");
    $("#addProductorTxtApePaterno").val("");
    $("#addProductorTxtApeMaterno").val("");
    $("#addProductorTxtNombres").val("");
    $("#addProductorTxtRazonSocial").val("");
    $("#addProductorTxtDireccion").val("");
    $("#addProductorTxtTelefono").val("");
    $("#addProductorTxtCorreo").val("");
    $("#addProductorTxtFechaIngreso").val(obtenerFechaActual());
}

/*Editar*/
function openCamposEditProductor()
{
    const row = $('#tblProductores').datagrid('getSelected');
    if (row)
    {
        const tipo =  row.TipoProductor;
        document.getElementById("editProductorCmbxTipoProductor").value = tipo;
        $("#addProductorCmbxTipoProductor").trigger('change');
        if(tipo==='0')
        {
            $("#editProductorTxtDni").val(row.Dni);
            $("#editProductorTxtRuc").val("");
            $("#editProductorTxtApePaterno").val(row.ApePaterno);
            $("#editProductorTxtApeMaterno").val(row.ApeMaterno);
            $("#editProductorTxtNombres").val(row.Nombres);
            $("#editProductorTxtRazonSocial").val(""); 
        }
        else
        {
            $("#editProductorTxtDni").val("");
            $("#editProductorTxtRuc").val(row.Ruc);
            $("#editProductorTxtApePaterno").val("");
            $("#editProductorTxtApeMaterno").val("");
            $("#editProductorTxtNombres").val("");
            $("#editProductorTxtRazonSocial").val(row.RazonSocial); 
        }
        
            $("#editProductorTxtDireccion").val(row.Direccion);
            $("#editProductorTxtTelefono").val(row.Celular);
            $("#editProductorTxtCorreo").val(row.Correo);
            $("#editProductorTxtFechaIngreso").val(row.FechaIngreso);
            $( "#dlgEditarProductores" ).dialog( "open" );   
        
    }
    else
    {
        showNotification('warning', 'Debe Seleccionar una Fila');
    }
}

function registrarEditarProductor(){
    const row = $('#tblProductores').datagrid('getSelected');
    if (row)
    {
    let iTipoUsuario = $("#editProductorCmbxTipoProductor").val();
    let iDni = $("#editProductorTxtDni").val(); 
    let iRuc = $("#editProductorTxtRuc").val();
    let vNombres = $("#editProductorTxtNombres").val();
    let vApePaterno = $("#editProductorTxtApePaterno").val();
    let vApeMaterno = $("#editProductorTxtApeMaterno").val();
    let iCelular = $("#editProductorTxtTelefono").val();
    let vDireccion = $("#editProductorTxtDireccion").val();
    let vRazonSocial = $("#editProductorTxtRazonSocial").val();
    let dFechaIngreso = $("#editProductorTxtFechaIngreso").val();
    let vCorreo = $("#editProductorTxtCorreo").val();
    
    var parametros = {"iCodRegReg": row.codProductores,
        "vNombresReg": vNombres,
        "vApePaternoReg": vApePaterno,
        "vApeMaternoReg": vApeMaterno,
        "iCelularReg": iCelular,
        "iDniReg": iDni,
        "iRucReg": iRuc,
        "vDireccionReg": vDireccion,
        "vRazonSocialReg": vRazonSocial,
        "dfechaIngresoReg": dFechaIngreso,
        "vCorreoReg": vCorreo,
        "iTipoProductorReg": iTipoUsuario};
    
    
    let winEditProductor;
    $.ajax({
                data:  parametros,
                url:   'EditarProductores',
                type:  'post',
                beforeSend: function () 
                {
                    winEditProductor = $.messager.progress({
                        title: 'Espere PorFavor',
                        msg: 'Los Datos se estan Guardando...'
                    });
                },
                success:  function (data) 
                {
                    var res = data.trim();
                    var result  = res.substr(0,2);
                    if(result==="ok")
                    {
                        $( "#dlgEditarProductores" ).dialog( "close" );
                        showNotification('success', res.substring(2));
                        winEditProductor.window("close");
                        TblPadronUsuariosBsq();

                    }
                    else if(result==="av")
                    {
                        showNotification('warning', res.substring(2));
                        winEditProductor.window("close");
                    }
                    else if(result==="er")
                    {
                        showNotification('error', res.substring(2));
                        winEditProductor.window("close");
                    }
                    else
                    {
                        showNotification('info', res.substring(2));
                        winEditProductor.window("close");
                    }


                    
                }
             });
    }
    else
    {
        showNotification('warning', 'Debe Seleccionar una Fila');
    }
}

function configurarEventosEditProductor()
{
    
            const tipoProductor = document.getElementById('editProductorCmbxTipoProductor');
            const dni = document.getElementById('editProductorTxtDni');
            const ruc = document.getElementById('editProductorTxtRuc');
            const apePaterno = document.getElementById('editProductorTxtApePaterno');
            const apeMaterno = document.getElementById('editProductorTxtApeMaterno');
            const nombres = document.getElementById('editProductorTxtNombres');
            const razonSocial = document.getElementById('editProductorTxtRazonSocial');
            const form = document.getElementById('formEditProductor');
/*
            tipoProductor.addEventListener('change', function() {
                if (tipoProductor.value === '0') { // Persona Natural
                    dni.disabled = false;
                    apePaterno.disabled = false;
                    apeMaterno.disabled = false;
                    nombres.disabled = false;
                    ruc.focus=false;
                    dni.focus=true;

                    ruc.disabled = true;
                    razonSocial.disabled = true;
                } else { // Persona Jurídica
                    dni.disabled = true;
                    apePaterno.disabled = true;
                    apeMaterno.disabled = true;
                    nombres.disabled = true;
                    ruc.focus=true;
                    dni.focus=false;

                    ruc.disabled = false;
                    razonSocial.disabled = false;
                }
                dni.setCustomValidity('');
                ruc.setCustomValidity('');
                apePaterno.setCustomValidity('');
                apeMaterno.setCustomValidity('');
                nombres.setCustomValidity('');
                razonSocial.setCustomValidity('');
            });*/

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

            dni.addEventListener('input', function() {
                validateInput(dni, dni.value.trim().length !== 8, 'DNI debe tener 8 dígitos');
            });

            ruc.addEventListener('input', function() {
                validateInput(ruc, !(ruc.value.trim().length === 11 || ruc.value.trim().length === 13), 'RUC debe tener 11 o 13 dígitos');
            });

            apePaterno.addEventListener('input', function() {
                validateInput(apePaterno, !apePaterno.value.trim(), 'Apellido Paterno es obligatorio');
            });

            apeMaterno.addEventListener('input', function() {
                validateInput(apeMaterno, !apeMaterno.value.trim(), 'Apellido Materno es obligatorio');
            });

            nombres.addEventListener('input', function() {
                validateInput(nombres, !nombres.value.trim(), 'Nombres es obligatorio');
            });

            razonSocial.addEventListener('input', function() {
                validateInput(razonSocial, !razonSocial.value.trim(), 'Razón Social es obligatoria');
            });

            form.addEventListener('submit', function(event) {
                let valid = true;
                if (tipoProductor.value === '0') { // Persona Natural
                    validateInput(dni, dni.value.trim().length !== 8, 'DNI debe tener 8 dígitos');
                    validateInput(apePaterno, !apePaterno.value.trim(), 'Apellido Paterno es obligatorio');
                    validateInput(apeMaterno, !apeMaterno.value.trim(), 'Apellido Materno es obligatorio');
                    validateInput(nombres, !nombres.value.trim(), 'Nombres es obligatorio');

                    valid = dni.checkValidity() && apePaterno.checkValidity() && apeMaterno.checkValidity() && nombres.checkValidity();
                } else { // Persona Jurídica
                    validateInput(ruc, !(ruc.value.trim().length === 11 || ruc.value.trim().length === 13), 'RUC debe tener 11 o 13 dígitos');
                    validateInput(razonSocial, !razonSocial.value.trim(), 'Razón Social es obligatoria');

                    valid = ruc.checkValidity() && razonSocial.checkValidity();
                }

                if (!valid) {
                    event.preventDefault();
                }
            });

            // Trigger the change event to set the initial state
            tipoProductor.dispatchEvent(new Event('change'));
}

function habilitarCamposEditProductor(tipoUsuario){
    if(tipoUsuario === "0" ){
        //Habilita el campos DNI del formulario agregar productor
        $("#editProductorTxtDni").removeAttr("disabled");
        $("#editProductorTxtApePaterno").removeAttr("disabled");
        $("#editProductorTxtApeMaterno").removeAttr("disabled");
        $("#editProductorTxtNombres").removeAttr("disabled");
        
        //Deshabilita los campos RUC y Razón Social
        $("#editProductorTxtRuc").prop("disabled",true);
        $("#editProductorTxtRuc").val("");
        $("#editProductorTxtRazonSocial").prop("disabled",true);
        $("#editProductorTxtRazonSocial").val("");
        
        $("#editProductorTxtDni").focus();
    }else{
        //Habilita el campos DNI del formulario agregar productor
        $("#editProductorTxtRuc").removeAttr("disabled");
        $("#editProductorTxtRazonSocial").removeAttr("disabled");
        
        //Deshabilita los campos RUC y Razón Social
        $("#editProductorTxtDni").prop("disabled",true);
        $("#editProductorTxtDni").val("");
        $("#editProductorTxtApePaterno").prop("disabled",true);
        $("#editProductorTxtApePaterno").val("");
        $("#editProductorTxtApeMaterno").prop("disabled",true);
        $("#editProductorTxtApeMaterno").val("");
        $("#editProductorTxtNombres").prop("disabled",true);
        $("#editProductorTxtNombres").val("");
        
        $("#editProductorTxtRuc").focus();
    }
}

function eliminarProductor()
{
    const row = $('#tblProductores').datagrid('getSelected');
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
                            var parametros = {"iCodRegReg": row.codProductores};
                            let winEliminProductor;
                            $.ajax({
                            data:  parametros,
                            url:   'EliminarProductores',
                            type:  'post',
                            beforeSend: function () 
                            {
                                winEliminProductor = $.messager.progress({
                                    title: 'Espere PorFavor',
                                    msg: 'Los Datos se estan Guardando...'
                                });
                            },
                            success:  function (data) 
                            {
                                var res = data.trim();
                                var result  = res.substr(0,2);
                                if(result==="ok")
                                {
                                    showNotification('success', res.substring(2));
                                    winEliminProductor.window("close");
                                    TblPadronUsuariosBsq();

                                }
                                else if(result==="av")
                                {
                                    showNotification('warning', res.substring(2));
                                    winEliminProductor.window("close");
                                }
                                else if(result==="er")
                                {
                                    showNotification('error', res.substring(2));
                                    winEliminProductor.window("close");
                                }
                                else
                                {
                                    showNotification('info', res.substring(2));
                                    winEliminProductor.window("close");
                                }



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

function accessProductores()
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
                    
            toggleButton("addProductorBtn", s[0] === '1', function() {
                limpiarCamposAddProductor();
                $("#dlgAgregarProductores").dialog("open");
            });

            toggleButton("editProductorBtn", s[1] === '1', function() {
                openCamposEditProductor();
            });

            toggleButton("eliminProductorBtn", s[2] === '1', function() {
                eliminarProductor();
            });
            
        }); 
    }
}




 
            
            
            