/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function() {   
    comboUsuariosSystmList();

    $('#UserRolMenuBtnActualizar').on('click', function() {
       actualizarPermisos();
    });
            
});
   
function markCheckedNodes(tree, data) {
    if (data && data.length) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].checked) {
                var node = tree.tree('find', data[i].id);
                if (node && !node.children) {
                    tree.tree('check', node.target);
                }
            }
            if (data[i].children && data[i].children.length) {
                markCheckedNodes(tree, data[i].children);
            }
        }

    }
}

function comboUsuariosSystmList()
{
    $("#usuariosRolMenu").combobox({
            valueField:'id',
            textField:'text',           
            method:'post',
            width: 210,
            url:"ListaUsuariosSystemCmbx",
            onSelect: function(f)
            {       
              ListarTreePermisos(f.id);
            },
            onLoadSuccess: function () {   
            var data = $(this).combobox('getData');
                if (data.length > 0) {
                    $(this).combobox('setValue', data[0].id);
                    ListarTreePermisos(data[0].id);
                }
            }
    });
    

}

function ListarTreePermisos(usuario)
{
        let winListTreePer;
        let dg = $('#treePermisos');
        dg.tree({
        url: 'MenuService?user=' + usuario,
        method: 'get',
        checkbox: true,     
        animate:true,lines:true,
        onBeforeLoad: function(node, param) {
            winListTreePer = $.messager.progress({
                title: 'Espere Por Favor',
                msg: 'Los Datos se están Consultado a la Base de Datos...'
            });
        },
        loadFilter: function(data) {
            return data;
        },
        formatter: function(node) {
            var s = node.text;
            if (!node.children || node.children.length === 0) { // Solo agregar checkboxes si no tiene hijos
                s += '<div class="checkbox-group">';
                s += ' <label><input type="checkbox" class="perm-checkbox" data-id="' + node.id + '" data-perm="create" ' + (node.create ? 'checked' : '') + '> Agregar</label>';
                s += ' <label><input type="checkbox" class="perm-checkbox" data-id="' + node.id + '" data-perm="modify" ' + (node.modify ? 'checked' : '') + '> Editar</label>';
                s += ' <label><input type="checkbox" class="perm-checkbox" data-id="' + node.id + '" data-perm="delete" ' + (node.delete ? 'checked' : '') + '> Eliminar</label>';
                s += '</div>';
            }
            return s;
        },
        onLoadError: function() {
            showNotification('error', 'Error al cargar los datos del servidor.');
        },
        onLoadSuccess: function(node, data) {   
            $.messager.progress('close');
            markCheckedNodes(dg, data); 
        }
    });
}
function actualizarPermisos()
{
     var usuario = $('#usuariosRolMenu').combobox('getValue');
    if(usuario.length >0)
    {
        var allNodes = $('#treePermisos').tree('getRoots');
        var permissions = [];

        var traverse = function(node) {
            // Determinar si el nodo es padre o hijo
            var nodeType = node.children && node.children.length > 0 ? 'padre' : 'hijo';
            let nodoId = parseInt(node.id);
           if (nodeType === 'hijo') {
                // Solo agregar permisos para nodos hijos
                permissions.push({
                    codMenu: nodoId,
                    modify: $('input[data-id="' + nodoId + '"][data-perm="modify"]').is(':checked'),
                    create: $('input[data-id="' + nodoId + '"][data-perm="create"]').is(':checked'),
                    delete: $('input[data-id="' + nodoId + '"][data-perm="delete"]').is(':checked'),
                    checked: node.checked,
                    type: nodeType,
                    dni: usuario
                });
            } else {
                // Agregar datos básicos para nodos padre
                permissions.push({
                    codMenu: nodoId,
                    modify: false, // No aplicar permisos para nodos padre
                    create: false,
                    delete: false,
                    checked: node.checked,
                    type: nodeType,
                    dni: usuario
                });
            }

            if (node.children && node.children.length > 0) {
                node.children.forEach(function(childNode) {
                    traverse(childNode); // Recursivamente llamamos traverse para cada hijo
                });
            }
        };

        allNodes.forEach(function(node) {
            traverse(node);
        });
        // Aquí comienza la parte del AJAX
        $.ajax({
            type: 'POST',
            url: 'UpdateMenuPermisos', // URL del servlet Java
            contentType: 'application/json',
            data: JSON.stringify(permissions), // Convertir el array permissions a JSON
            success: function(data) {                
                var res = data.trim();
                var result = res.substr(0, 2);
                switch(result) {
                    case "ok":
                        showNotification('success', res.substring(2));
                        ListarTreePermisos(usuario);
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
            },
            error: function(xhr, status, error) {
                // Manejar errores de AJAX
                    showNotification('error', error);
                // console.log('Error en la solicitud AJAX:', status, error);
            }
        });
    }
    else
    {
        showNotification('warning', 'Debe Seleccionar una Dni Valido');
    }
        
    
}