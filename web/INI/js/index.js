/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function soloMayusculas(idElemento){
    $(idElemento).on('input', function() {
        // Convertir el valor ingresado a mayúsculas
        let valor = $(this).val().toUpperCase();
        // Establecer el valor del input como el valor convertido
        $(this).val(valor);
    });
}

function varlidarPorcentaje(idElemento){
    // Agregar un evento de escucha al input con el ID especificado
    $(idElemento).on('keyup', function() {
        // Obtener el valor actual del input
        let valor = $(this).val();

        // Expresión regular para validar un número con hasta 3 dígitos antes del punto y 2 después
        let regex = /^-?\d{0,3}(\.\d{0,2})?$/;

        // Verificar si el valor coincide con la expresión regular
        if (!regex.test(valor)) {
            // Si el valor no es válido, eliminar el último carácter ingresado
            $(this).val(valor.slice(0, -1));
        }

        // Convertir el valor a número flotante
        let num = parseFloat(valor);

        // Verificar si el número es mayor o igual a 1000
        if (num > 100) {
            // Si el número es mayor o igual a 1000, mostrar una advertencia y vaciar el campo
            Swal.fire({
                title: "¡Advertencia!",
                text: "El porcentaje debe estar entre 0 y 100.",
                icon: "warning"
            });
            $(this).val('0');
        }
    });
}

function duplicarInputs(origen, destino){
    $(origen).on("input", function(){
        $(destino).val($(origen).val());
    });
    
    $(origen).on("change", function(){
        $(destino).val($(origen).val());
    });
}

// Definir la función obtenerFechaActual que retorna la fecha actual
function obtenerFechaActual() {
  // Crear un objeto Date que represente la fecha y hora actuales
  const fechaActual = new Date();
  
  // Devolver la fecha actual en formato YYYY-MM-DD
  return fechaActual.toISOString().split('T')[0];
}

function convertirFecha(stringFecha) {
    // Dividir el string en año, mes y día
    var partesFecha = stringFecha.split("-");
    var año = partesFecha[0];
    var mes = partesFecha[1];
    var dia = partesFecha[2];

    // Formatear la fecha en el formato deseado
    var fechaFormateada = dia + "/" + mes + "/" + año;

    return fechaFormateada;
}

function findIndexByText(array, searchText) {
    return array.findIndex(item => item.text === searchText);
}


function existeConceptoEnDetalles(idDataGrid,conceptoBuscado) {
            // Obtener todos los datos del DataGrid
            var rows = $('#'+idDataGrid).datagrid('getRows');

            // Recorrer las filas para buscar el concepto
            for (var i = 0; i < rows.length; i++) {
                if (rows[i].iIdConcepto === conceptoBuscado) {
                    return true; // Si se encuentra, retornar true
                }
            }
            return false; // Si no se encuentra, retornar false
        }



