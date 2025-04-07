/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
let myChartHabiPredios;
let myChartHabiDinero;
let userNameSelected = 0;
let claseSelectedChartHabiPredio = 0;
let subClaseSelectedChartHabiPredio = 0;
$(document).ready(function(){
    funcionalidadBotonesFiltrosGraficos();
    loadCmbxClaseFiltros("filterBarChartHabiPrediosCmbxClase","filterBarChartHabiPrediosCmbxSubClase",undefined, 7);
    
    //ComboBox Rango de Timepo Habilitaciones
    $("#cbRangoTiempoChartHabiDinero").combobox({
        editable: false
    });
    
    $("#cbRangoTiempoChartHabiPredio").combobox({
        editable: false
    });
    
    getInfoSesion()
    .then(response => {
        // Aquí puedes procesar la respuesta de los datos obtenidos
        // Si es administrador
        if("Datos de la sesión obtenidos:", response[0].idRol === 1){
            // Crear el elemento <select> y añadirlo al contenedor
            const selectElement = $('<select>', {
                id: 'cbHabilitacionesOperador', // ID del select
            });
            
            // Añadir el <select> al contenedor
            $("#cardTitleChartsHabilitaciones").append(selectElement);

            
            // Inicializar el combobox con configuración básica
            $('#cbHabilitacionesOperador').combobox({
                editable: false,                    // Evitar edición manual
                panelHeight: 'auto',                // Altura del panel ajustable
                valueField: 'id',                // Campo para el valor
                textField: 'text',                  // Campo para el texto
                method: 'post',
                width: 300,
                height: 40,
                url: 'ListaUsuariosSystem2Cmbx', // Asegúrate de apuntar al servlet o endpoint correcto
                onSelect: function(record) {        // Evento al seleccionar
                    console.log('Opción seleccionada:', record);
                    userNameSelected = record.id;
                    initHabilitationsPrediosBarGraph(0,0, userNameSelected);
                    initHabilitationsDineroBarGraph(0,0, userNameSelected);
                },
                onLoadSuccess: function () {
                    let data = $(this).combobox('getData');
                    if (data.length > 0) {
                        $(this).combobox('setValue', data[0].id);
                        userNameSelected = data[0].id;
                    }
                }
            });
        }
        
        initHabilitationsPrediosBarGraph(0,0, userNameSelected);
        initHabilitationsDineroBarGraph(0,0, userNameSelected);
        // Puedes trabajar con los datos, como asignarlos a variables o elementos del DOM
    })
    .catch(error => {
        console.error("Hubo un error al obtener los datos:", error);
        // Manejar el error, como mostrar una alerta al usuario o intentar nuevamente
    });

});

function getInfoSesion(){
    return new Promise((resolve, reject) =>{
        $.ajax({
            url: 'ObtenerDatosSesion',  // Reemplaza con la URL de tu servlet
            type: 'POST',  // Método HTTP
            success: function(response) {
                resolve(response);  // Resolver la promesa con los datos
            },
            error: function(xhr, status, error) {
                console.error("Error al obtener datos:", error);
                reject(error);  // Rechazar la promesa en caso de error
            }
        });
    });
}



function funcionalidadBotonesFiltrosGraficos() {
    // Seleccionar todos los botones con clase 'btnFiltro'
    const botonesFiltro = document.querySelectorAll('.btnFiltro');
    const contenedorHabiPredio = document.querySelector("#filter_chart_habiPredio");
    const contenedorHabiDinero = document.querySelector("#filter_chart_habiDinero");

    // Manejar el clic para el contenedor específico
    $("#btnFilterHabiDinero").click(function () {
        // Usar toggle para simplificar la lógica de alternancia de clases
        contenedorHabiDinero.classList.toggle('mostrar');
    });
    $("#btnFilterHabiPredio").click(function () {
        // Usar toggle para simplificar la lógica de alternancia de clases
        contenedorHabiPredio.classList.toggle('mostrar');
    });

    // Añadir funcionalidad a cada botón con clase 'btnFiltro'
    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', () => {
            // Extraer atributos data del botón
            const { idcmbxclase, idcmbxsubclase, idchartbarhabipredio } = boton.dataset;

            // Seleccionar la imagen dentro del botón
            const imagen = boton.querySelector('img');

            // Alternar clases entre btn-primary y btn-danger
            if (boton.classList.contains('btn-primary')) {
                actualizarClaseYImagen(boton, 'btn-primary', 'btn-danger', imagen, 
                    "INI/Easyui/themes/icons/cerrar_filtro.png");
            } else {
                actualizarClaseYImagen(boton, 'btn-danger', 'btn-primary', imagen, 
                    "INI/Easyui/themes/icons/filtrar.png");

                // Cargar los datos necesarios en función de los botones seleccionados
                if (idcmbxclase && idcmbxsubclase) {
                    loadCmbxClaseFiltros(idcmbxclase, idcmbxsubclase, undefined, 7);
                }

                // Actualizar el gráfico correspondiente según el botón
                if (idchartbarhabipredio === "myBarChartHabilitacionesPredios") {
                    initHabilitationsPrediosBarGraph(0, 0);
                } else {
                    initHabilitationsDineroBarGraph(0,0);
                }
            }
        });
    });
}

// Función para alternar clases y cambiar imágenes
function actualizarClaseYImagen(boton, claseRemover, claseAgregar, imagen, rutaImagen) {
    boton.classList.remove(claseRemover);
    boton.classList.add(claseAgregar);
    imagen.src = rutaImagen;
}

function obtenerDatosParaGrafico(tipoHabilitacion, classId, subclassId, userName) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'ObtenerHabilitacionesChart',  // Reemplaza con la URL de tu servlet
            type: 'POST',  // Método HTTP
            data: {
                tipoHabilitacion: tipoHabilitacion,
                classId: classId,  // Parámetro de clase
                subclassId: subclassId,  // Parámetro de subclase
                userName: userName
            },
            success: function(response) {
                resolve(response);  // Resolver la promesa con los datos
            },
            error: function(xhr, status, error) {
                console.error("Error al obtener datos:", error);
                reject(error);  // Rechazar la promesa en caso de error
            }
        });
    });
}

function initHabilitationsPrediosBarGraph(classId, subclassId, userName) {
    if(myChartHabiPredios){
        myChartHabiPredios.destroy();
    }
    obtenerDatosParaGrafico(1, classId, subclassId, userName)
        .then(response => {
            let dataResponse = ((response.data).split(','));
            dataResponse.pop();  // Eliminar el último valor vacío si lo hay
            let dataNumerica = dataResponse.map(item => parseInt(item, 10));  // Convertir a enteros

            let labelsResponse = ((response.months).split(','));
            labelsResponse.pop();  // Eliminar el último valor vacío si lo hay

            let min = response.min;
            let max = response.max;
            let stepSize = response.stepSize;

            // Configuración del gráfico
            const data = {
                labels: labelsResponse,  // Etiquetas del eje X (meses)
                datasets: [{
                    label: 'Habilitaciones de Predios',  // Etiqueta del dataset
                    data: dataNumerica,  // Los datos numéricos para las barras
                    backgroundColor: Utils.CHART_COLORS.blue,  // Color de las barras
                    borderColor: Utils.CHART_COLORS.blue_solid,  // Color del borde de las barras
                    borderWidth: 1  // Grosor del borde
                }]
            };

            // Configuración del gráfico
            const config = {
                type: 'bar',
                data: data,
                options: {
                    responsive: true,
                    indexAxis: 'x',  // Barra horizontal
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                font: {
                                    size: 14
                                }
                            }
                        },
                        title: {
                            display: true,
                            text: 'Habilitaciones por Mes',
                            font: {
                                size: 18
                            }
                        }
                    },
                    scales: {
                        x: {
                            // Ajuste del eje X si es necesario
                        },
                        y: {
                            beginAtZero: true,  // Asegura que el eje Y comience desde 0
                            ticks: {
                                stepSize: stepSize,
                                min: min,  // Mínimo valor para el eje Y
                                max: max   // Máximo valor para el eje Y
                            }
                        }
                    }
                }
            };

            // Renderizar el gráfico usando jQuery
            const ctx = $('#myBarChartHabilitacionesPredios')[0].getContext('2d');  // Seleccionamos el canvas con jQuery
            myChartHabiPredios = new Chart(ctx, config);  // Inicializamos el gráfico
        })
        .catch(error => {
            console.error("Hubo un error al obtener los datos:", error);
            // Puedes manejar el error aquí
        });
}

function initHabilitationsDineroBarGraph(classId, subclassId, userName) {
    if(myChartHabiDinero){
        myChartHabiDinero.destroy();
    }
    obtenerDatosParaGrafico(2, classId, subclassId, userName)
        .then(response => {
            let dataResponse = ((response.data).split(','));
            dataResponse.pop();  // Eliminar el último valor vacío si lo hay
            let dataNumerica = dataResponse.map(item => parseInt(item, 10));  // Convertir a enteros

            let labelsResponse = ((response.months).split(','));
            labelsResponse.pop();  // Eliminar el último valor vacío si lo hay

            let min = response.min;
            let max = response.max;
            let stepSize = response.stepSize;

            // Configuración del gráfico
            const data = {
                labels: labelsResponse,  // Etiquetas del eje X (meses)
                datasets: [{
                    label: 'Habilitaciones de Dinero',  // Etiqueta del dataset
                    data: dataNumerica,  // Los datos numéricos para las barras
                    backgroundColor: Utils.CHART_COLORS.green,  // Color de las barras
                    borderColor: Utils.CHART_COLORS.green_solid,  // Color del borde de las barras
                    borderWidth: 1  // Grosor del borde
                }]
            };

            // Configuración del gráfico
            const config = {
                type: 'bar',
                data: data,
                options: {
                    responsive: true,
                    indexAxis: 'x',  // Barra horizontal
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                font: {
                                    size: 14
                                }
                            }
                        },
                        title: {
                            display: true,
                            text: 'Habilitaciones por Mes',
                            font: {
                                size: 18
                            }
                        }
                    },
                    scales: {
                        x: {
                            // Ajuste del eje X si es necesario
                        },
                        y: {
                            beginAtZero: true,  // Asegura que el eje Y comience desde 0
                            ticks: {
                                stepSize: stepSize,
                                min: min,  // Mínimo valor para el eje Y
                                max: max   // Máximo valor para el eje Y
                            }
                        }
                    }
                }
            };

            // Renderizar el gráfico usando jQuery
            const ctx = $('#myBarChartHabilitacionesDinero')[0].getContext('2d');  // Seleccionamos el canvas con jQuery
            myChartHabiDinero = new Chart(ctx, config);  // Inicializamos el gráfico
        })
        .catch(error => {
            console.error("Hubo un error al obtener los datos:", error);
            // Puedes manejar el error aquí
        });
}

function loadCmbxClaseFiltros(comboId, comboSubClaseId,sValue, idClaseIgnorar = 0) {
    $("#" + comboId).combobox({
        valueField: 'id',
        textField: 'text',
        editable: false,
        panelHeight: 'auto',
        method: 'post',
        width: 200,
        url: 'ListaClaseCmbx', // Asegúrate de apuntar al servlet o endpoint correcto
        queryParams: { idGrupo: 1, idClaseIgnorar: idClaseIgnorar},
        onSelect: function(record){
            loadCmbxSubClaseFiltros(comboId,comboSubClaseId,record.id);
            if(comboId==="filterBarChartHabiPrediosCmbxClase"){
                claseSelectedChartHabiPredio = record.id;
            }
        },
        onLoadSuccess: function () {
            let data = $(this).combobox('getData');
            if (sValue !== undefined) {
                $("#" + comboId).combobox('setValue', sValue);
            } else {
                if (data.length > 0) {
                    $(this).combobox('setValue', data[0].id);
                }
            }
            loadCmbxSubClaseFiltros(comboSubClaseId,$(this).combobox("getValue"));
        }
    });
}

function loadCmbxSubClaseFiltros(comboClaseId,comboSubClaseId,iIdClase, sValue){
    
    $("#"+comboSubClaseId).combobox({
        valueField: 'id',
        textField: 'text',
        editable: false,
        panelHeight: 'auto',
        method: 'post',
        width: 200,
        url: 'ListaSubClaseCmbx',
        queryParams: { idGrupo: 1, idClase: iIdClase },
        onSelect: function(record){
          if(comboSubClaseId==="filterBarChartHabiPrediosCmbxSubClase"){
                initHabilitationsPrediosBarGraph($("#"+comboClaseId).combobox("getValue"),record.id, userNameSelected);
                subClaseSelectedChartHabiPredio = record.id;
          }else{
                initHabilitationsDineroBarGraph($("#"+comboClaseId).combobox("getValue"),record.id), userNameSelected;
          }
        },
        onLoadSuccess: function () {
            let data = $(this).combobox('getData');
            if (sValue !== undefined) {
                $("#" + comboId).combobox('setValue', sValue);
            } else {
                if (data.length > 0) {
                    $(this).combobox('setValue', data[0].id);
                }
            }

        }
    });
}


function toggleFiltersCharBarVisibility() {
      $("#filter_chart_habiPredio").classList.toggle('mostrar');
      
}
