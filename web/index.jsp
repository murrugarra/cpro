<%-- 
    Document   : index
    Created on : 10-jul-2024, 10:20:28
    Author     : Usuario
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    response.setHeader("Cache-Control","no-cache");
    response.setHeader("Cache-Control","no-store");
    response.setHeader("Pragma","no-cache");
    response.setDateHeader ("Expires", 0);
    
   HttpSession sesion = request.getSession();
    if(sesion.getAttribute("usuario") != null){
       response.sendRedirect("main.jsp"); 
    }
    else
    {
%>
<!DOCTYPE html>
<html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CPRO</title>
    <link rel="stylesheet" type="text/css" href="INI/Login/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="INI/Login/css/fontawesome-all.min.css">
    <link rel="stylesheet" type="text/css" href="INI/Login/css/style.css">
    <link rel="stylesheet" type="text/css" href="INI/Login/css/theme9.css">
    <link rel="stylesheet" type="text/css" href="INI/Easyui/themes/gray/easyui.css">
    <link rel="stylesheet" type="text/css" href="INI/Easyui/themes/icon.css">
    <script src="INI/Login/js/jquery.min.js"></script>
    <script src="INI/Login/js/popper.min.js"></script>
    <script src="INI/Login/js/bootstrap.min.js"></script>
    <script src="INI/js/funct.js"></script>
    <script type="text/javascript" src="INI/js/index.js"></script>
    <link rel="shortcut icon" href="INI/imagenes/cpro_icon.png" type="image/x-icon">
    
</head>
<body>
    <div class="form-body">
        <div class="row">
            <div class="img-holder">
                <div class="bg"></div>
                <div class="info-holder">
                    <h3 style="text-transform: uppercase;">Cadenas Productivas</h3>
                    <p>Software de Administración y Control de las Cadenas Productivas</p>
                    <img src="INI/imagenes/Samnsa.png" alt="">
                </div>
            </div>
            <div class="form-holder">
                <div class="form-content">
                    <div class="form-items">
                        <div class="website-logo-inside">
                            <a href="index.jsp">
                                <div class="logo">
                                    <img class="logo-size" src="INI/imagenes/logo_cpro.png" alt="">
                                </div>
                            </a>
                        </div>
                        <div class="page-links">
                            <a href="index.jsp" class="active">Inicia Sesión</a>
                        </div>
                        <form id="formLogin" action="" method="POST" autocomplete="OFF">
                            <input class="form-control" type="text" placeholder="Usuario" id="userNameLogin" >
                            <input class="form-control" type="password" placeholder="Contraseña" id="passwordLogin" >
                            <div class="form-button">
                                <button type="submit" id="btnEntrarSistemaLogin" class="ibtn">ENTRAR</button> 
                                <div id="error" style="padding: 1.2em;"></div>
                            </div>
                        </form>
                        <div class="other-links">
                            <span>&copy;Vipo</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<!--<script src="INI/Login/js/main.js"></script>-->
</body>
</html>
<%}%>