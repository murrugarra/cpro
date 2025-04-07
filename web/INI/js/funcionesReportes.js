/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 $(document).ready(function() {    
     
                
         $('#iFrameReporteProductores').on('load', function () {
            $('#loader1').hide();
        });
        
         $('#iFrameReportePredios').on('load', function () {
            $('#loader1').hide();
        });
        
         $('#iFrameReportePPA').on('load', function () {
            $('#loader1').hide();
        });

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

function GenerarRptProductores(){
    let estado = $("#iEstadoProductorReporte").val();
    let texto = $("#iEstadoProductorReporte").find('option:selected').text(); 
    document.getElementById("loader1").style.display = '';
        window.open("Reporte/GenerarProductoresPdf.jsp?estado="+estado+"&texto="+texto
        , "ReporteProductores","width=930,height=345,left=100,top=100,resizable=yes,scrollbars=yes"); 
}

function GenerarRptPredios(){
    let estado = $("#iEstadoPrediosReporte").val();
    let texto = $("#iEstadoPrediosReporte").find('option:selected').text(); 
    document.getElementById("loader1").style.display = '';
        window.open("Reporte/GenerarPrediosPdf.jsp?estado="+estado+"&texto="+texto
        , "ReportePredios","width=930,height=345,left=100,top=100,resizable=yes,scrollbars=yes"); 
}

function GenerarRptPPA(){
    let estado = $("#iEstadoPPAReporte").val();
    let texto = $("#iEstadoPPAReporte").find('option:selected').text(); 
    document.getElementById("loader1").style.display = '';
        window.open("Reporte/GenerarPrediosPdf.jsp?estado="+estado+"&texto="+texto
        , "ReportePPA","width=930,height=345,left=100,top=100,resizable=yes,scrollbars=yes"); 
}


function GenerarRptEstadoCuenta(){
    var dg = $('#rptEcTblListaUsuarios');;
    if (dg.data('datagrid')) {
        const row = $('#rptEcTblListaUsuarios').datagrid('getSelected');
        if (row)
        {
            const codPredio =  $('#rptEcCmbxPredios').combobox('getValue');
            if(codPredio.length>0)
            {
                const campaniaTex =  $('#rptEcCmbxCampania').combobox('getText');
                const codcampania =  $('#rptEcCmbxCampania').combobox('getValue');
                document.getElementById('loader1').style.display = 'block'; 
                document.getElementById('iFrameReporteEC').style.display = 'none'; // Esconde el iframe

                var iframe = document.getElementById('iFrameReporteEC');
                window.open("Reporte/GenerarEstadoCuentaPdf.jsp?codPredio="+codPredio+"&codCampania="+codcampania+"&campaniaTex="+campaniaTex, "ReporteEC", "resizable=yes,scrollbars=yes");
                   /*window.open("Reporte/GenerarEstadoCuentaPdf.jsp?codPredio="+codPredio+"&codCampania="+codcampania+"&campaniaTex="+campaniaTex
                    , "ReporteEC","width=930,height=345,left=100,top=100,resizable=yes,scrollbars=yes"); */
                // Asegúrate de que el iframe esté visible al cargar
                iframe.onload = function() {
                    document.getElementById('loader1').style.display = 'none'; // Oculta el loader
                    document.getElementById('iFrameReporteEC').style.display = 'block'; // Muestra el iframe
                   };
            }
            else
            {
                showNotification('warning', 'No Existe Predios Activos para Usuario Seleccionado');
            }
        }
        else
        {
            showNotification('warning', 'Debe Seleccionar una Fila');
        }
    } else {
        showNotification('warning', 'Debe Buscar un Productor');
    }
}

function BuscarProductorRelacionRptEstadoCuentaEnter(productor) {
	if (productor.length>0)
        {
            $("#rptEcTblListaUsuarios").datagrid({
                columns: [[                                    
                    {field:"codProductor",hidden:true},
                    {field:"Nombre",title:'',width:203}
                    ]],
                    singleSelect: true,
                    width: 212,
                    height: 250,
                    queryParams:{productor:productor},
                    method:'post',
                    url:"ListaRelacionProductoresTbl",
                    onSelect: function(rowIndex, rowData)
                    {
                        var productor1 = rowData.codProductor;
                        comboPredioRelacionRptEstadoCuenta(productor1);   
                    }
                    
            });
        } 
}

function comboPredioRelacionRptEstadoCuenta(codProductor)
{
    $("#rptEcCmbxPredios").combobox({
            valueField:'id',
            textField:'text',           
            queryParams:{codProductor:codProductor},
            method:'post',
            width: 210,
            editable:false, 
            url:"ListaPrediosCmbx",
            onBeforeLoad: function(param){
              //$(this).combobox('select','1');  
            },
            onLoadSuccess: function () {
                var data = $(this).combobox('getData');
                if (data.length > 0) {
                    $(this).combobox('setValue', data[0].id);
                }         
            }
    });
}

function loadCampaniaRptEstadoCuenta(comboId, sValue) {
            $("#" + comboId).combobox({
                valueField: 'id',
                textField: 'text',
                editable: false,
                panelHeight: 'auto',
                method: 'post',
                width: 145,
                url: 'ListaCampaniaCmbx',
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
