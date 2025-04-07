/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 $(document).ready(function() {            
            $('#grupo_NombreBsq').textbox({
                inputEvents: $.extend({}, $.fn.textbox.defaults.inputEvents, {
                    keydown: function(event) {
                        if (event.key === 'Enter') {
                            const nombre = $(this).val();
                            TblGrupoBsqEnter(nombre);
                        }
                    }
                })
            });
            
            configurarEventosAddGrupo();
            configurarEventosEditGrupo();            
            TblGrupo();
            accessGrupo();
            
 
            $("#grupoBtnBusqTbl").on('click',function(event){
                TblGrupoBsq(); 
            });
 
 
            $("#dlgAddGrupoBtnCancelar").on('click',function(event){
                var isValid = $('#formRegGrupo').form('validate'); // Validar el formulario
                if (isValid) {
                    $( "#dlgAgregarGrupo" ).dialog( "close" ); // Cerrar el diálogo si el formulario es válido
                } else {
                    // Mostrar un mensaje de error o realizar alguna acción si el formulario no es válido
                    console.log('El formulario no es válido. No se puede cerrar el diálogo.');
                }
                // Evitar que el evento de clic se propague y evite cualquier comportamiento predeterminado del navegador
                event.preventDefault();
                event.stopPropagation();
            });
 
            $("#dlgEditGrupoBtnCancelar").on('click',function(event){
                var isValid = $('#formEditGrupo').form('validate'); // Validar el formulario
                if (isValid) {
                    $( "#dlgEditarGrupo" ).dialog( "close" ); // Cerrar el diálogo si el formulario es válido
                } else {
                    // Mostrar un mensaje de error o realizar alguna acción si el formulario no es válido
                    console.log('El formulario no es válido. No se puede cerrar el diálogo.');
                }
                // Evitar que el evento de clic se propague y evite cualquier comportamiento predeterminado del navegador
                event.preventDefault();
                event.stopPropagation();
            });           
            //Functionality for add Form (Productor) Edit Form
            $("#formRegGrupo").submit(function(event) {
                event.preventDefault(); // Detiene el evento por defecto del Formulario
                registrarGrupo();

            });
             //Functionality for Edit Form (Productor) Edit Form
            $("#formEditGrupo").submit(function(event) {
                event.preventDefault(); // Detiene el evento por defecto del Formulario
                editarGrupo();

            });
            
            //Solo Números
            //MAYUSCULAS
            soloMayusculas("#addGrupoTxtNombre");
            soloMayusculas("#editGrupoTxtNombre");
 

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
function TblGrupo()
{ 
    //var comision =  document.getElementById("comboComision").value;
     $('#tblGrupo').datagrid({
                            columns: [[        
                            {field:"codGrupo",hidden:true},
                            {field:"nombre",title:'Nombre',width:370},
                            {field:"Estado",title:'Estado',hidden:true}
                            ]],
                            singleSelect: true,
                            autoRowHeight: false,
                            rownumbers:true,
                            pagination:true,
                            title:"Lista de Grupos",
                            width: 'auto',
                            height: 599,
                            pageSize:20,
                            method:'post',
                            toolbar: '#tbGrupo',
                            url:"ListaGrupoTbl",
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

function TblGrupoBsq()
{    
    const nombre = $('#grupo_NombreBsq').textbox('getValue');
    const vEstado = $("#grupo_EstadoBsq").combobox('getValue');
    //Recarga la tabla
   
    $("#tblGrupo").datagrid('load',
    {
        nombre: nombre,
        vEstado : vEstado
    });
}

function TblGrupoBsqEnter(nombre)
{    
    const vEstado = $("#grupo_EstadoBsq").combobox('getValue');
    //Recarga la tabla
   
    $("#tblGrupo").datagrid('load',
    {
        nombre: nombre,
        vEstado : vEstado
    });
}

function configurarEventosAddGrupo()
{
    const nombre = document.getElementById('addGrupoTxtNombre');
    const form = document.getElementById('formRegGrupo');


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
function configurarEventosEditGrupo()
{
    const nombre = document.getElementById('editGrupoTxtNombre');
    const form = document.getElementById('formEditGrupo');


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


function registrarGrupo(){
    const Nombre = $("#addGrupoTxtNombre").val();    
    const parametros = {"vNombre": Nombre};    
    
    let winRegGrupo;
    $.ajax({
                data:  parametros,
                url:   'AgregarGrupo',
                type:  'post',
                beforeSend: function () 
                {
                    winRegGrupo = $.messager.progress({
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
                        $( "#dlgAgregarGrupo" ).dialog( "close" );
                        showNotification('success', res.substring(2));
                        winRegGrupo.window("close");
                        TblGrupoBsq();

                    }
                    else if(result==="av")
                    {
                        showNotification('warning', res.substring(2));
                        winRegGrupo.window("close");
                    }
                    else if(result==="er")
                    {
                        showNotification('error', res.substring(2));
                        winRegGrupo.window("close");
                    }
                    else
                    {
                        showNotification('info', res.substring(2));
                        winRegGrupo.window("close");
                    }


                    
                }
             });
    
}


function openCamposEditGrupo()
{
    const row = $('#tblGrupo').datagrid('getSelected');
    if (row)
    {
        $("#editGrupoTxtNombre").val(row.nombre);
        $( "#dlgEditarGrupo" ).dialog( "open" );   
    }
    else
    {
        showNotification('warning', 'Debe Seleccionar una Fila');
    }
}


function editarGrupo(){
    
    const row = $('#tblGrupo').datagrid('getSelected');
    if (row)
    {
        const Nombre =  $("#editGrupoTxtNombre").val();    
        const parametros = {"codigo": row.codGrupo,"vNombre": Nombre};    
    
        let winEditGrupo;
            $.ajax({
                data:  parametros,
                url:   'EditarGrupo',
                type:  'post',
                beforeSend: function () 
                {
                    winEditGrupo = $.messager.progress({
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
                        $( "#dlgEditarGrupo" ).dialog( "close" );
                        showNotification('success', res.substring(2));
                        winEditGrupo.window("close");
                        TblGrupoBsq();

                    }
                    else if(result==="av")
                    {
                        showNotification('warning', res.substring(2));
                        winEditGrupo.window("close");
                    }
                    else if(result==="er")
                    {
                        showNotification('error', res.substring(2));
                        winEditGrupo.window("close");
                    }
                    else
                    {
                        showNotification('info', res.substring(2));
                        winEditGrupo.window("close");
                    }


                    
                }
             });  
    }
    else
    {
        showNotification('warning', 'Debe Seleccionar una Fila');
    }
    
}


function eliminarProductor()
{
    const row = $('#tblGrupo').datagrid('getSelected');
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
                            var parametros = {"codigo": row.codGrupo};
                            let winEliminGrupo;
                            $.ajax({
                            data:  parametros,
                            url:   'EliminarGrupo',
                            type:  'post',
                            beforeSend: function () 
                            {
                                winEliminGrupo = $.messager.progress({
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
                                    winEliminGrupo.window("close");
                                    TblGrupoBsq();

                                }
                                else if(result==="av")
                                {
                                    showNotification('warning', res.substring(2));
                                    winEliminGrupo.window("close");
                                }
                                else if(result==="er")
                                {
                                    showNotification('error', res.substring(2));
                                    winEliminGrupo.window("close");
                                }
                                else
                                {
                                    showNotification('info', res.substring(2));
                                    winEliminGrupo.window("close");
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

function accessGrupo()
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
                    
            toggleButton("addGrupoBtn", s[0] === '1', function() {  
              $("#addGrupoTxtNombre").val("");
              $( "#dlgAgregarGrupo" ).dialog( "open" ); 
            });

            toggleButton("editGrupoBtn", s[1] === '1', function() {
                openCamposEditGrupo();
            });

            toggleButton("eliminGrupoBtn", s[2] === '1', function() {                
                eliminarProductor();
            });
            
        }); 
    }
}
