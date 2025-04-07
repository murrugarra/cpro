/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 $(document).ready(function() {            
            configurarEventosAddTCambio();
            configurarEventosEditTCambio();   
            $("#tcambio_FechaBsq").val(getFechaIni());
            $("#tcambio_FechaFinBsq").val(getFechaFin());          
            TblTCambio();   
            accessTCambio();
            $("#tcambioBtnBusqTbl").on('click',function(event){
                TblTCambioBsq(); 
            });
 
 
            $("#dlgAddTCambioBtnCancelar").on('click',function(event){
                var isValid = $('#formRegTCambio').form('validate'); // Validar el formulario
                if (isValid) {
                    $( "#dlgAgregarTCambio" ).dialog( "close" ); // Cerrar el diálogo si el formulario es válido
                } else {
                    // Mostrar un mensaje de error o realizar alguna acción si el formulario no es válido
                    console.log('El formulario no es válido. No se puede cerrar el diálogo.');
                }
                // Evitar que el evento de clic se propague y evite cualquier comportamiento predeterminado del navegador
                event.preventDefault();
                event.stopPropagation();
            });
 
            $("#dlgEditTCambioBtnCancelar").on('click',function(event){
                var isValid = $('#formEditTCambio').form('validate'); // Validar el formulario
                if (isValid) {
                    $( "#dlgEditarTCambio" ).dialog( "close" ); // Cerrar el diálogo si el formulario es válido
                } else {
                    // Mostrar un mensaje de error o realizar alguna acción si el formulario no es válido
                    console.log('El formulario no es válido. No se puede cerrar el diálogo.');
                }
                // Evitar que el evento de clic se propague y evite cualquier comportamiento predeterminado del navegador
                event.preventDefault();
                event.stopPropagation();
            });           
            //Functionality for add Form (Productor) Edit Form
            $("#formRegTCambio").submit(function(event) {
                event.preventDefault(); // Detiene el evento por defecto del Formulario
                registrarTCambio();

            });
             //Functionality for Edit Form (Productor) Edit Form
            $("#formEditTCambio").submit(function(event) {
                event.preventDefault(); // Detiene el evento por defecto del Formulario
                editarTCambio();

            });
            
            soloNumeros4Dec("#addTCambioTxtTCventa");
            soloNumeros4Dec("#addTCambioTxtTCcompra");
            soloNumeros4Dec("#editTCambioTxtTCventa");
            soloNumeros4Dec("#editTCambioTxtTCcompra");
            
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
function TblTCambio()
{ 
    const fecha = $("#tcambio_FechaBsq").val();
    const fechaFin = $("#tcambio_FechaFinBsq").val();
    //var comision =  document.getElementById("comboComision").value;
     $('#tblTCambio').datagrid({
        columns: [[        
        {field:"codTCambio",hidden:true},
        {field:"Fecha",title:'Fecha',width:370},
        {field:"Venta",title:'Tc. Venta',width:370},
        {field:"Compra",title:'Tc. Compra',width:370},
        {field:"Estado",title:'Estado',hidden:true}
        ]],
        singleSelect: true,
        autoRowHeight: false,
        rownumbers:true,
        pagination:true,
        title:"Lista Tipos de Cambio",
        width: 'auto',
        height: 599,
        pageSize:20,
        method:'post',
        toolbar: '#tbTCambio',
        url:"ListaTCambioTbl",
        queryParams:{dfecha: fecha, dfechaFin: fechaFin},
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
function TblTCambioBsq()
{    
    const fecha = $("#tcambio_FechaBsq").val();
    const fechaFin = $("#tcambio_FechaFinBsq").val();
    const vEstado = $("#tcambio_EstadoBsq").combobox('getValue');
    //Recarga la tabla
   
    $("#tblTCambio").datagrid('load',
    {
        dfecha: fecha, dfechaFin: fechaFin,
        vEstado : vEstado
    });
}
function configurarEventosAddTCambio()
{
    const tcVenta = document.getElementById('addTCambioTxtTCventa');
    const tcCompra = document.getElementById('addTCambioTxtTCcompra');
    const fecha = document.getElementById('addTCambioDateTCFecha');
    const form = document.getElementById('formRegTCambio');


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
        validateInput(fecha, !fecha.value.trim(), 'La Fecha es obligatorio');
    });

    tcVenta.addEventListener('input', function() {
        validateInput(tcVenta, !tcVenta.value.trim(), 'T. de Cambio Venta es obligatorio');
    });

    tcCompra.addEventListener('input', function() {
        validateInput(tcCompra, !tcCompra.value.trim(), 'T. de Cambio Compra es obligatorio');
    });
    
    form.addEventListener('submit', function(event) {
        let valid = true;
        if (!valid) {
            event.preventDefault();
        }
    });

}

function registrarTCambio() {
    const dFecha = $("#addTCambioDateTCFecha").val();
    const Tventa = $("#addTCambioTxtTCventa").val(); 
    const TCompra = $("#addTCambioTxtTCcompra").val(); 
    if (isValidFecha(dFecha)) {
        if(parseFloat(Tventa)>0 && parseFloat(TCompra)>0 )
        {
            const parametros = {"fecha": dFecha, "tVenta": Tventa, "tCompra": TCompra};   
            let winRegTCambio;
            $.ajax({
                data: parametros,
                url: 'AgregarTipoCambio',
                type: 'post',
                beforeSend: function () {
                    winRegTCambio = $.messager.progress({
                        title: 'Espere Por Favor',
                        msg: 'Los Datos se están Guardando...'
                    });
                },
                success: function (data) {
                    var res = data.trim();
                    var result = res.substr(0, 2);
                    switch(result) {
                        case "ok":
                            $( "#dlgAgregarTCambio" ).dialog( "close" );
                            showNotification('success', res.substring(2));
                            TblTCambioBsq();
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
                    $.messager.progress('close');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.status === 500) {
                        showNotification('error', 'Error interno del servidor.'); // Mensaje claro para el usuario
                    } else {
                        showNotification('error', 'Ocurrió un error inesperado.');
                    }
                    winRegTCambio.window("close");
                }
            });
        }
        else
        {
            showNotification('warning', 'El Tipo de Cambio debe ser Mayor a (0) Cero.');
        }
    }
    else
    {
        showNotification('warning', 'La Fecha Seleccionada es incorrecta.');
    }
}

function configurarEventosEditTCambio()
{
    const tcVenta = document.getElementById('editTCambioTxtTCventa');
    const tcCompra = document.getElementById('editTCambioTxtTCcompra');
    const fecha = document.getElementById('editTCambioDateTCFecha');
    const form = document.getElementById('formEditTCambio');


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
        validateInput(fecha, !fecha.value.trim(), 'La Fecha es obligatorio');
    });

    tcVenta.addEventListener('input', function() {
        validateInput(tcVenta, !tcVenta.value.trim(), 'T. de Cambio Venta es obligatorio');
    });

    tcCompra.addEventListener('input', function() {
        validateInput(tcCompra, !tcCompra.value.trim(), 'T. de Cambio Compra es obligatorio');
    });
    
    form.addEventListener('submit', function(event) {
        let valid = true;
        if (!valid) {
            event.preventDefault();
        }
    });

}

function openCamposEditTCambio()
{
    const row = $('#tblTCambio').datagrid('getSelected');
    if (row)
    {
        $("#editTCambioDateTCFecha").val(row.Fecha);
        $("#editTCambioTxtTCventa").val(row.Venta); 
        $("#editTCambioTxtTCcompra").val(row.Compra);  
        $( "#dlgEditarTCambio" ).dialog( "open" );  
    }
    else
    {
        showNotification('warning', 'Debe Seleccionar una Fila');
    }
}

function editarTCambio() {
    const row = $('#tblTCambio').datagrid('getSelected');
    if (row)
    {
        const dFecha = $("#editTCambioDateTCFecha").val();
        const Tventa = $("#editTCambioTxtTCventa").val(); 
        const TCompra = $("#editTCambioTxtTCcompra").val();

        if(parseFloat(Tventa)>0 && parseFloat(TCompra)>0 )
        {
            const parametros = {"tcCod":row.codTCambio,"fecha": dFecha, "tVenta": Tventa, "tCompra": TCompra};    

            let winEditTcambio;
            $.ajax({
                data: parametros,
                url: 'EditarTipoCambio',
                type: 'post',
                beforeSend: function () {
                    winEditTcambio = $.messager.progress({
                        title: 'Espere Por Favor',
                        msg: 'Los Datos se están Guardando...'
                    });
                },
                success: function (data) {
                    var res = data.trim();
                    var result = res.substr(0, 2);
                    switch(result) {
                        case "ok":
                            $( "#dlgEditarTCambio" ).dialog( "close" );
                            showNotification('success', res.substring(2));
                            TblTCambioBsq();
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
                    winEditTcambio.window("close");
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.status === 500) {
                        showNotification('error', 'Error interno del servidor.'); // Mensaje claro para el usuario
                    } else {
                        showNotification('error', 'Ocurrió un error inesperado.');
                    }
                    winEditTcambio.window("close");
                }
            });
        }
        else
        {
            showNotification('warning', 'El Tipo de Cambio debe ser Mayor a (0) Cero.');
        }
    }
    else
    {
        showNotification('warning', 'Debe Seleccionar una Fila');
    }
}

function eliminarTCambio() {
    const row = $('#tblTCambio').datagrid('getSelected');
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
            const parametros = {"tcCod":row.codTCambio};    
            let winEliminarTcambio;
            $.ajax({
                data: parametros,
                url: 'EliminarTipoCambio',
                type: 'post',
                beforeSend: function () {
                    winEliminarTcambio = $.messager.progress({
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
                            TblTCambioBsq();
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
                    winEliminarTcambio.window("close");
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.status === 500) {
                        showNotification('error', 'Error interno del servidor.'); // Mensaje claro para el usuario
                    } else {
                        showNotification('error', 'Ocurrió un error inesperado.');
                    }
                    winEliminarTcambio.window("close");
                }
            });            
            }
        }});  
    }
    else
    {
        showNotification('warning', 'Debe Seleccionar una Fila');
    }

}


function accessTCambio()
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
                    
            toggleButton("addTCambioBtn", s[0] === '1', function() {                
              $("#addTCambioTxtTCcompra").val("");
              $("#addTCambioTxtTCventa").val("");
              $("#addTCambioDateTCFecha").val(getFechaHoy());
              $( "#dlgAgregarTCambio" ).dialog( "open" ); 
            });

            toggleButton("editTCambioBtn", s[1] === '1', function() {
                openCamposEditTCambio();
            });

            toggleButton("eliminTCambioBtn", s[2] === '1', function() {
                eliminarTCambio();
            });
            
        }); 
    }
}