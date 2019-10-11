var JSON_PRODUCTOS = [];
var PAGE_SIZE = 6;
var RUTA_ARCHIVO = 'assets/shop-single-data.json';
/**
 * Carga los datos desde un archivo JSON y construye el HTML para visualizarlos
 */
function cargarDatosTienda() {
    $.getJSON(RUTA_ARCHIVO, function(json_productos) {
        JSON_PRODUCTOS = json_productos;
        construirPaginacionDatos();
        cargarPaginaProductos(0);
    });
}

function cargarPaginaProductos(numero_pagina) {
    if (numero_pagina < 0 || numero_pagina > JSON_PRODUCTOS.length/PAGE_SIZE) {
        return;
    }
    $("#pagination-products-controls li").removeClass("active");
    $("#pagination-products-controls #page-"+numero_pagina).addClass("active");
    var htmlBloqueProductos = '';
    console.log('Página: '+numero_pagina);
    for(var index=numero_pagina*PAGE_SIZE; index<numero_pagina*PAGE_SIZE+PAGE_SIZE; index++) {
        if (index >= JSON_PRODUCTOS.length) {
            break;
        }
        var objetoProducto = JSON_PRODUCTOS[index];
        console.log('ID: '+objetoProducto.id);
        // Construcción de la estructura HTML
        var htmlProducto = `
        <div class="col-sm-6 col-lg-4 mb-4" data-aos="fade-up">
            <div class="block-4 text-center border">
            <figure class="block-4-image">
                <a href="shop-single.html#id=${objetoProducto.id}"><img src="${objetoProducto.url_foto}" alt="${objetoProducto.nombre}" class="img-fluid"></a>
            </figure>
            <div class="block-4-text p-4">
                <h3><a href="shop-single.html#id=${objetoProducto.id}">${objetoProducto.nombre}</a></h3>
                <p class="mb-0">${objetoProducto.descrip}</p>
                <p class="text-primary font-weight-bold">$ ${objetoProducto.precio}</p>
            </div>
            </div>
        </div>
        `;
        htmlBloqueProductos+= htmlProducto;
    }
    $('#section-products').html(htmlBloqueProductos);
}

function construirPaginacionDatos() {
    var contPaginas = JSON_PRODUCTOS.length/PAGE_SIZE;
    var htmlSeccionPaginacion = '';
    // htmlSeccionPaginacion+= '<li><a href="#">&lt;</a></li>';
    var activeClass = ` class="active"`;
    for(var index=0; index<contPaginas; index++) {
        var htmlPaginacion = `
        <li${index==0 ? activeClass : ''} id="page-${index}"><a href="#" 
        onClick="cargarPaginaProductos(${index})">${index+1}</a></li>
        `;
        htmlSeccionPaginacion+= htmlPaginacion;
    }
    // htmlSeccionPaginacion+= '<li><a href="#">&gt;</a></li>';
    $('#pagination-products-controls').html(htmlSeccionPaginacion);
}
function cambiarNumeroPagina(cantidad_cambio) {
    // 
}