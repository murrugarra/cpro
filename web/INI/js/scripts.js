$(function(){
    mMenu();
    // Toggle dropdown menu on avatar click
    $('.avatar').click(function() {
        $('#dropdown-menu').toggle();
        $('#dropdown-menu').css({
            'top': $(this).offset().top + $(this).outerHeight() + 'px',
            'right': '20px'
        });
        
    var arrow = document.querySelector('.arrow-down');
    if (arrow.classList.contains('arrow-up')) {
        arrow.classList.remove('arrow-up');
    } else {
        arrow.classList.add('arrow-up');
    }
    
    });

    // Close dropdown menu when clicking outside
    $(document).click(function(event) {
        if (!$(event.target).closest('.avatar-container, #dropdown-menu').length) {
            $('#dropdown-menu').hide();
        }
    });

    // Event for edit profile
    $('#edit-profile').click(function() {
        mostrarDialogo();
        // Aquí puedes agregar la lógica para modificar datos personales
    });

    // Event for logout
    $('#logout').click(function() {
         cerrarSesion(); 
        // Aquí puedes agregar la lógica para cerrar sesión
    });
     
    
    
});

// Función para crear y mostrar el diálogo modal con EasyUI
function mostrarDialogo() {
    // Crear el diálogo utilizando EasyUI
    var dialog = $('<div></div>').appendTo('body');
    
    dialog.dialog({
        title: 'Cambiar Contraseña',
        width: 300,
        height: 'auto',
        modal: true,
        buttons: [{
            text: 'Guardar',
            iconCls:'icon-save-blue',
            handler: function() {
                // Aquí puedes acceder a los valores de los campos de contraseña
                var contraActual = $('#contraActual').passwordbox('getValue');
                var contraNew = $('#contraNew').passwordbox('getValue');
                
                // Ejemplo: imprimir los valores en la consola
                console.log('Contraseña Actual:', contraActual);
                console.log('Nueva Contraseña:', contraNew);
                
                // Ejemplo: enviar datos al servidor, etc.
                
                // Cerrar el diálogo después de guardar los cambios
                dialog.dialog('close');
            }
        },{
            text: 'Cancelar',
            iconCls:'icon-close-red',
            handler: function() {
                // Cerrar el diálogo sin guardar cambios
                dialog.dialog('close');
            }
        }],
        onClose: function() {
            // Destruir el diálogo al cerrarlo para liberar recursos
            dialog.dialog('destroy').remove();
        },
        onOpen: function() {
            // Puedes realizar inicializaciones adicionales aquí si es necesario
        }
    });

    // Agregar los campos de contraseña al contenido del diálogo
    $('<label for="contraActual">Contraseña Actual:</label>').appendTo(dialog);
    $('<input id="contraActual" class="easyui-passwordbox" type="password" style="width:100%; padding: 5px; margin-bottom: 10px;">').appendTo(dialog);
    $('<br>').appendTo(dialog); // Saltos de línea o separadores según sea necesario
    $('<label for="contraNew">Nueva Contraseña:</label>').appendTo(dialog);
    $('<input id="contraNew" class="easyui-passwordbox" type="password" style="width:100%; padding: 5px; margin-bottom: 10px;">').appendTo(dialog);

    // Aplicar estilos CSS adicionales si es necesario
    dialog.find('input').css({
        'border': '1px solid #ccc',
        'border-radius': '3px',
        'box-sizing': 'border-box'
    });
     
}


function cerrarSesion() {
    fetch('CerrarSesion', {
        method: 'GET',
        credentials: 'same-origin'  // Incluye las cookies en la solicitud si corresponde
    })
    .then(response => {
        if (response.ok) {
            // Redirigir a la página de inicio después de cerrar sesión
            window.location.href = 'index.jsp';
        } else {
            console.error('Error al cerrar sesión');
        }
    })
    .catch(error => console.error('Error en la solicitud:', error));
}