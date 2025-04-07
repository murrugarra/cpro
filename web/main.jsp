<%-- 
    Document   : main
    Created on : 10-jul-2024, 10:20:51
    Author     : Usuario
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    response.setHeader("Cache-Control","no-cache");
    response.setHeader("Cache-Control","no-store");
    response.setHeader("Pragma","no-cache");
    response.setDateHeader ("Expires", 0);
    HttpSession sesion = request.getSession();
    if(sesion.getAttribute("usuario") == null){
      response.sendRedirect("CerrarSesion");
    }
    else
    {
  //  String personalLogin = sesion.getAttribute("nombres").toString()+" "+sesion.getAttribute("apePaterno").toString() +" "+sesion.getAttribute("apeMaterno").toString() ;
    //String sexoLogin = sesion.getAttribute("sexo").toString();
   
%>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>CPRO</title>
    <jsp:include page="FromHead.jsp" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js" integrity="sha512-CQBWl4fJHWbryGE+Pc7UAxWMUMNMWzWxF4SQo9CgkJIN1kx6djDQZjh3Y8SZ1d+6I+1zze6Z7kHXO7q3UyZAWw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
</head>
<body>
    <div class="dashboard-container easyui-layout" fit="true">
        <div data-options="region:'north',split:true" class="header">
            <jsp:include page="FromHeader.jsp" />  
        </div>
        <div data-options="region:'west',split:true" title="Menú" class="menu" id="menu">
            <ul id="ttx" class="easyui-tree"></ul>
        </div>
        <div data-options="region:'center'" class="content"  title="Panel Control" >
            <div class="panelInicio-container" style="width:100%;height:100%;">
                <div class="row" >
                    <div class="col-12" >
                        <div class="card">
                            <div class="card-body" style="width: 100%; height: auto; padding: 20px 70px 0px 70px!important;">
                                <div class="row" style="display: flex; justify-content: space-between; align-items: center;" id="cardTitleChartsHabilitaciones">
                                    <h5 class="card-title card-title-charts" >Reporte de Habilitaciones</h5>
                                </div>
                            </div>
                            <div class="row" style="padding: 20px!important;">
                                <!-- HABILITACIÓN DE PREDIOS -->
                                <div class="col-6">
                                    <div class="card">
                                        <div class="card-body" style="width: 100%; height: 400px; margin: auto;">
                                            <div class="row" style="display: flex; justify-content: space-around; align-items: center;">
                                                <h5 class="card-title card-title-charts">Habilitaciones de Predios</h5>
                                                <select id="cbRangoTiempoChartHabiPredio" class="easyui-combobox" name="dept" style="width:150px; height: 40px;">
                                                    <option value="1">Últimos 12 meses</option>
                                                    <option value="2">Últimos 7 días</option>
                                                    <option value="3">Últimos 5 años</option>
                                                </select>
                                            </div>
                                            <div class="row">
                                                <button id="btnFilterHabiPredio" class="btn btn-primary btnFiltro" 
                                                    data-idchartbarhabipredio="myBarChartHabilitacionesPredios" 
                                                    data-idcmbxclase="filterBarChartHabiPrediosCmbxClase" 
                                                    data-idcmbxsubclase="filterBarChartHabiPrediosCmbxSubClase">
                                                    <img src="INI/Easyui/themes/icons/filtrar.png">
                                                </button>
                                            </div>
                                            <div id="filter_chart_habiPredio" class="row filter_chart_habi">
                                                <fieldset style="width: 100%;">
                                                    <div class="form-group filter-group">
                                                        <div>
                                                            <label for="filterBarChartHabiPrediosCmbxClase">Clase</label>
                                                            <input id="filterBarChartHabiPrediosCmbxClase" type="text">
                                                        </div>
                                                        <div>
                                                            <label for="filterBarChartHabiPrediosCmbxSubClase">Sub Clase</label>
                                                            <input id="filterBarChartHabiPrediosCmbxSubClase" type="text">
                                                        </div>
                                                        <div>
                                                            <button class="btn btn-secondary">
                                                                <img src="INI/Easyui/themes/icons/lupa2.png">
                                                            </button>
                                                        </div>
                                                    </div>
                                                </fieldset>
                                            </div>
                                            <div style="width: 100%; margin: auto;">
                                                <canvas id="myBarChartHabilitacionesPredios"></canvas>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- HABILITACIÓN DE DINERO -->
                                <div class="col-6">
                                    <div class="card">
                                        <div class="card-body" style="width: 100%; height: 400px; margin: auto;">
                                            <div class="row" style="margin-bottom: 45px; display: flex; justify-content: space-around; align-items: center;">
                                                <h5 class="card-title card-title-charts">Habilitaciones de Dinero</h5>
                                                <select id="cbRangoTiempoChartHabiDinero" class="easyui-combobox" name="dept" style="width:150px; height: 40px;">
                                                    <option value="1">Últimos 12 meses</option>
                                                    <option value="2">Últimos 7 días</option>
                                                    <option value="3">Últimos 5 años</option>
                                                </select>
                                            </div>
                                            <div style="width: 100%; margin: auto;">
                                                <canvas id="myBarChartHabilitacionesDinero"></canvas>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div data-options="region:'south',split:true" class="footer">
            <jsp:include page="FromFooter.jsp" /> 
        </div>
    </div>
    <div class="dropdown-menu" id="dropdown-menu">
        <a href="#" id="edit-profile">Modificar Datos Personales</a>
        <a href="#" id="logout">Cerrar Sesión</a>
    </div>
        <script type="text/javascript" src="INI/js/funcionesDashboard.js?v=1"></script> 
</body>
</html>
<% } %>