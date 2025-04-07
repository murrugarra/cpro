/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function IniciarSesion(){
    var username= $("#userNameLogin").val().trim();
			var password= $("#passwordLogin").val().trim();
                        var parametros = {
                                    "user" : username,
                                    "password" : password
                                };
                if((username).length>0 && (password).length>0){
                $.ajax({
                        type: "POST",
                        url: "validarLogin",
                        data:  parametros,
                        cache: false,
                        beforeSend: function(){ 
                           // document.getElementById('error').style.padding = null;
                            $("#error").html("<div class='ui-state-highlight ui-corner-all' style='padding: 0.5em;border: 1px solid #abc778;font-weight: bold;background: #b5dc6e 50% top repeat-x;color: #5a4e02;'> Conectando...!</div>");},
                        success: function(data){
                            var res = data.trim();
                        var result  = res.substr(0,2);
                        if(result==="ok")
                        {
                            window.location.href = "main.jsp";
                        }
                        else
                        {
                          $("#error").html("<span style='color:#ff3434'>Error: </span> <span style='color:#ff5d5d'>"+res.substring(2)+"</span>");
                        }
                        }
                        });
    }else{
         $("#error").html("<span style='color:#efc000'>Aviso:</span> <span style='color:#eda200'>Existen Campos Vacios.</span> ");
                        
            
    }
}



$(function(){
    $("#formLogin").submit(function(e){
        e.preventDefault();
        IniciarSesion();
    });
    
    soloNumeros("#userNameLogin");
});

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
