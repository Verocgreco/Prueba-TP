document.addEventListener("DOMContentLoaded", function () {
    const url = "http://127.0.0.1:5000/"    
    const numeroWhatsApp = "+5492926456331"; // Número de WhatsApp
    const urlParams = new URLSearchParams(window.location.search);
    const codigoProducto = urlParams.get('codigo');


    fetch(url + 'productoss/'+codigoProducto)
    .then(function (response) {
        if (response.ok) {return response.json(); }
    })
    .then(function (prod) {
        let productInfo = document.getElementById('product-info');

    if (productInfo) {
        const productInfo = document.getElementById("product-info");  
        console.log(prod)    
        const productHTML='<section class="product-grid"> <div class="product-image">'
        +'<img src=/static/imagenes/'+ prod.imagen_url + ' alt="Imagen del producto" ></div>'
        +'<div class="product-details">'
        +'<h2>'+ prod.nombre+'</h2>'        
        +'<br><br>'
        +'<p>Precio: $'+prod.precio+'</p>'
        +'<br><br>'
        +'<a href="https://wa.me/'+numeroWhatsApp+'?text=¡Hola+Amuyén!+Quisiera+hacer+un+pedido." class="btn-whatsapp">Contactar por WhatsApp</a>'
        +'</div></section>';
        productInfo.innerHTML = productHTML;
    } else {
        // Si el producto no se encuentra, muestra un mensaje de error
        const productInfo = document.getElementById("product-info");
        productInfo.innerHTML = "<p>Producto no encontrado</p>";
    }
});
});
