/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function mMenu()
{
    var dg = $('#ttx');
    $('#ttx').tree({
				url: 'treeMenuGlobal',
				animate: true,
				loadFilter: function(rows){
					return convert(rows);
				},
                                onContextMenu: function(e, node){
                                        OpenMenuContext(node);
                                },
                                onClick: function(node){
                                  var child_node = dg.tree('getChildren', node.target);
                                  //var i=0;
                                  if( child_node.length>0)
                                  {
                                      dg.tree('expand', node.target); 
                                  }
                                  else
                                  {
                                      OpenMenu(node);
                                  }
                                },
				onLoadSuccess: function(node, data){
					dg.tree('collapseAll');                                        
                                    var tmpURL = window.location.href;
                                    var rx = tmpURL.split('/');
                                    var rxx = rx[4].split('?');
                                    var dato_param = gup( 'L_Ja_Afu_vpvkbb' );
                                    var node = dg.tree('find', dato_param+"-"+rxx[0]);
                                    dg.tree('expandTo', node.target).tree('select', node.target);
				}
                                
			});
}
/*

    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
    
function mMenu() {
    var dg = $('#ttx');
    var menuJson = '<%= escapeHtml((String) session.getAttribute("menuJson")) %>';

    if (menuJson) {
        var rows = JSON.parse(menuJson);
        dg.tree({
            data: convert(rows),
            animate: true,
            onContextMenu: function(e, node){
                OpenMenuContext(node);
            },
            onClick: function(node){
                var child_node = dg.tree('getChildren', node.target);
                if (child_node.length > 0) {
                    dg.tree('expand', node.target);
                } else {
                    OpenMenu(node);
                }
            },
            onLoadSuccess: function(node, data){
                dg.tree('collapseAll');
                var tmpURL = window.location.href;
                var rx = tmpURL.split('/');
                var rxx = rx[4].split('?');
                var dato_param = gup('L_Ja_Afu_vpvkbb');
                var node = dg.tree('find', dato_param + "-" + rxx[0]);
                dg.tree('expandTo', node.target).tree('select', node.target);
            }
        });
    } else {
        console.error('No menu data found in session.');
    }
}

*/
function OpenMenuContext(valor)
{   var dato = valor.id;
    //SelectTree(dato);
    var res = dato.split("-");    
   var url = res[1];
  window.open(url+"?L_Ja_Afu_vpvkbb="+res[0]);

   
}

function OpenMenu(valor)
{   var dato = valor.id;
    //SelectTree(dato);
    var res = dato.split("-");    
   var url = res[1];
  window.location=url+"?L_Ja_Afu_vpvkbb="+res[0];

   
}
function convert(rows){
			function exists(rows, parentId){
				for(var i=0; i<rows.length; i++){
					if (rows[i].id === parentId) return true;
				}
				return false;
			}
			
			var nodes = [];
			// get the top level nodes
			for(var i=0; i<rows.length; i++){
				var row = rows[i];
				if (!exists(rows, row.parentId)){
					nodes.push({
						id:row.id,
						text:row.name,
                                                iconCls:row.iconCls,
                                                checked:row.checked
					});
				}
			}
			
			var toDo = [];
			for(var i=0; i<nodes.length; i++){
				toDo.push(nodes[i]);
			}
			while(toDo.length){
				var node = toDo.shift();	// the parent node
				// get the children nodes
				for(var i=0; i<rows.length; i++){
					var row = rows[i];
					if (row.parentId === node.id){
						var child = {id:row.id,text:row.name,iconCls:row.iconCls};
						if (node.children){
							node.children.push(child);
						} else {
							node.children = [child];
						}
						toDo.push(child);
					}
				}
			}
			return nodes;
		}
                
function gup( name ){
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp ( regexS );
	var tmpURL = window.location.href;
	var results = regex.exec( tmpURL );
	if( results === null )
		return"";
	else
		return results[1];
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

function soloNumeros(idElemento){
    $(idElemento).on('input', function() {
        // Obtener el valor actual del input
        let valor = $(this).val();
        
        let isValidNumber = /^-?\d*\.?\d*$/.test(valor);
        if (!isValidNumber) {
            $(this).val(valor.slice(0, -1));
        }
    });
}

function soloMayusculas(idElemento){
    $(idElemento).on('input', function() {
        // Convertir el valor ingresado a mayúsculas
        let valor = $(this).val().toUpperCase();
        // Establecer el valor del input como el valor convertido
        $(this).val(valor);
    });
}

// Definir la función obtenerFechaActual que retorna la fecha actual
function obtenerFechaActual() {
  // Crear un objeto Date que represente la fecha y hora actuales
  const fechaActual = new Date();
  
  // Devolver la fecha actual en formato YYYY-MM-DD
  return fechaActual.toISOString().split('T')[0];
}

let notificationCount = 0;

function showNotification(type, msj) {
    var boxClass;
    
    // Incrementar el contador de notificaciones
    notificationCount++;
    var offset = notificationCount * 70; // Espaciado entre notificaciones

    // Determinar la clase CSS basado en el tipo de notificación
    switch(type) {
        case 'success':
            boxClass = 'notification notification-success';
            break;
        case 'info':
            boxClass = 'notification notification-info';
            break;
        case 'warning':
            boxClass = 'notification notification-warning';
            break;
        case 'error':
            boxClass = 'notification notification-error';
            break;
        default:
            boxClass = 'notification';
    }

    // Crear el contenido de la notificación
    var notificationContent = document.createElement('div');
    notificationContent.className = boxClass + ' show';
    notificationContent.style.top = offset + 'px'; // Ajustar la posición top
    notificationContent.innerHTML = '<div class="message-content">' +
                                    '<div style="font-weight: bold;font-size: 13px;">' + msj + '</div>' +
                                    '</div>' +
                                    '<span class="close-btn" onclick="this.parentElement.remove(); notificationCount--;">X</span>' +
                                    '<div class="progress-bar"><div></div></div>';

    // Añadir la notificación al body del documento
    document.body.appendChild(notificationContent);

    // Iniciar la barra de progreso
    setTimeout(function() {
        notificationContent.querySelector('.progress-bar div').style.width = '100%';
    }, 100);

    // Eliminar la notificación después de unos segundos
    setTimeout(function() {
        notificationContent.style.opacity = '0';
        setTimeout(function() {
            notificationContent.remove();
            notificationCount--;
        }, 500);
    }, 5000); // Tiempo en milisegundos antes de cerrar automáticamente (5 segundos)
}

// Función para redondear a dos decimales
function redondea2Decimales(valor) {
    return Decimal(valor).toDecimalPlaces(2).toNumber();
}
/*function redondea2Decimales(num) {
    return Math.round(num * 100) / 100;
}
*/
function alertInfo(msj)
{
    //$.messager.alert('Correcto',msj,'info');
    $.messager.show({
                title:'Correcto',
                msg:'<div class="messager-icon messager-info"></div>'+
                        '<div style="color:#3fb7ea; font-weight: bold; padding: 10px;">'+msj+'</div>',
               showType:'fade',
                style:{
        right: '',
        bottom: '',
        border: '1px solid #3fb7ea',
        backgroundColor: '#edf5fc !important',
        padding: '',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                }
                    });   
}
function OpenWindowWiths(url, windowoption, name, params){
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", url);
    form.setAttribute("target", name);

    for (var i in params) {
        if (params.hasOwnProperty(i)) {
            var input = document.createElement('input');
            input.type = 'hidden';
            input.name = i;
            input.value = params[i];
            form.appendChild(input);
        }
    }

    document.body.appendChild(form);

    //note I am using a post.htm page since I did not want to make double request to the page 
   //it might have some Page_Load call which might screw things up.
    window.open("post.htm", name, windowoption);

    form.submit();

    document.body.removeChild(form);
}                    
            
function completCerozIzq(string, largo)
{
    var ceros = "";
    var cantidad = largo - string.length;
    if (cantidad >= 1)
    {
    	for(var i=0;i<cantidad;i++)
    	{
            ceros += "0";
    	}
        return (ceros+string);
    }
    else
    {
    	return string; 
    }
}

function getFechaHoy()
{
     var f = new Date();
    return  f.getFullYear() + "-" + completCerozIzq((f.getMonth() +1)+"",2) + "-" + completCerozIzq(f.getDate()+"",2); 
}


function getFechaIni()
{
    var f = new Date();
    var primerDia = new Date(f.getFullYear(), f.getMonth(), 1);
    return  f.getFullYear() + "-" + completCerozIzq((f.getMonth() +1)+"",2) + "-" + completCerozIzq(primerDia.getDate()+"",2); 
}


function getFechaFin()
{
    var f = new Date();
    var ultimoDia = new Date(f.getFullYear(), f.getMonth() + 1, 0);
    return  f.getFullYear() + "-" + completCerozIzq((f.getMonth() +1)+"",2) + "-" + completCerozIzq(ultimoDia.getDate()+"",2); 
}


function soloNumeros(idElemento){
    $(idElemento).on('input', function() {
        // Obtener el valor actual del input
        let valor = $(this).val();
        
        let isValidNumber = /^-?\d*\.?\d*$/.test(valor);
        if (!isValidNumber) {
            $(this).val(valor.slice(0, -1));
        }
    });
}

function soloNumerosEnteros(idElemento) {
    $(idElemento).on('input', function() {
        // Obtener el valor actual del input
        let valor = $(this).val();
        
        // Validar solo números enteros
        let isValidInteger = /^-?\d*$/.test(valor);
        if (!isValidInteger) {
            $(this).val(valor.slice(0, -1));
        }
    });
}

function soloNumeros4Dec(idElemento) {
    $(idElemento).on('input', function() {
        let valor = $(this).val();
        
        // Expresión regular para validar números con hasta 4 decimales
        let regex = /^-?\d*\.?\d{0,4}$/;

        if (!regex.test(valor)) {
            $(this).val(valor.slice(0, -1));
        }
    });
}

function soloNumeros6Dec(idElemento) {
    $(idElemento).on('input', function() {
        let valor = $(this).val();
        
        // Expresión regular para validar números con hasta 4 decimales
        let regex = /^-?\d*\.?\d{0,6}$/;

        if (!regex.test(valor)) {
            $(this).val(valor.slice(0, -1));
        }
    });
}

/*Para las Opciones en el Menu de Acceso*/
function toggleButton(buttonId, shouldShow, onClick) {
    var button = document.getElementById(buttonId);
    if (shouldShow) {
        button.style.display = '';
        button.disabled = false;
        $("#" + buttonId).off('click').on('click', onClick);
    } else {
        button.style.display = 'none';
        button.disabled = true;
        $("#" + buttonId).off('click');
    }
}

function convertToDateYYYMMDD(value) {
    // Crear un objeto de meses para el mapeo
    const monthNames = {
        'jan': '01', 'feb': '02', 'mar': '03', 'apr': '04',
        'may': '05', 'jun': '06', 'jul': '07', 'aug': '08',
        'sep': '09', 'oct': '10', 'nov': '11', 'dec': '12',
        'ene': '01', 'feb': '02', 'mar': '03', 'abr': '04',
        'may': '05', 'jun': '06', 'jul': '07', 'ago': '08',
        'sep': '09', 'oct': '10', 'nov': '11', 'dic': '12'
    };

    // Intentar hacer match con el formato "mes día, año"
    const match = value.match(/([a-zA-Z]+) (\d{1,2}), (\d{4})/);
    
    if (match) {
        const month = monthNames[match[1].toLowerCase().substring(0, 3)];
        const day = match[2].padStart(2, '0'); // Asegurar que el día tenga dos dígitos
        const year = match[3];
        return `${year}-${month}-${day}`; // Devuelve en formato YYYY-MM-DD
    }

    return null; // Retorna null si no se puede convertir
}

function convert6Decimales(value) {
    return value != null ? parseFloat(value).toFixed(6) : '';
}

function isValidFecha(dateString) {
    const date = new Date(dateString);
    
    // Verificar si la fecha es válida
    if (isNaN(date.getTime())) {
        return false; // Fecha inválida
    }
    
    // Obtener el año
    const year = date.getFullYear();
    
    // Comprobar que el año es mayor o igual a 1000
    return year >= 1000;
}


//Agregado por Murrv
// Definir Utils si no existe
const Utils = {
  rand: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min; // Genera un número aleatorio entre min y max
  },
  CHART_COLORS: {
    red: 'rgba(255, 99, 132, 0.8)',
    blue: 'rgba(54, 162, 235, 0.8)',
    blue_solid: 'rgba(54, 162, 235, 1)',
    green: 'rgba(75, 192, 192, 0.8)',
    green_solid: 'rgba(75, 192, 192, 1)',
    yellow: 'rgba(255, 159, 64, 0.8)'
    // Otros colores para el gráfico
  },
  months: [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ]
};
