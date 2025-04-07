<%-- 
    Document   : FromHeader
    Created on : 14-jul-2024, 9:48:11
    Author     : Usuario
--%>
<%
    response.setHeader("Cache-Control","no-cache");
    response.setHeader("Cache-Control","no-store");
    response.setHeader("Pragma","no-cache");
    response.setDateHeader ("Expires", 0);
    HttpSession sesion = request.getSession();
    String personalLogin = sesion.getAttribute("nombres").toString()+" "+sesion.getAttribute("apePaterno").toString() +" "+sesion.getAttribute("apeMaterno").toString() ;
    String sexoLogin = sesion.getAttribute("sexo").toString();
   
%>

            <div class="logo">
                <img src="INI/imagenes/logo_cpro_azul.png" alt="Logo">
            </div>
           <!-- <div class="title">
                <span>20298463165 - IMPORTACIONES RUBI S.A. - DICIEMBRE 2022</span>
            </div>-->
            <div class="user-info">
                <!--<img src="bell-icon.png" alt="Notificaciones" class="icon">-->
                <div class="avatar-container">
                    <img src="INI/imagenes/hombre.png" alt="Avatar" class="avatar">
                    <div class="arrow-down"></div>
                </div>
                <div class="user-details">
                    <div class="user-name"><%= personalLogin %></div>
                    <div class="user-email"><%= sesion.getAttribute("correo").toString() %></div>
                </div>
            </div>