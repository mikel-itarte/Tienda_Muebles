/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

class Carrito{
    constructor(productos){
        this.productos = productos;
        this.cantidad = {};
}

     actualizarCantidad(idProducto, cantidad) {

         if (!Number.isInteger(cantidad) || cantidad < 0)
        return;

    let existeProducto = false;

    for (let i = 0; i < this.productos.length; i++) {
        if (this.productos[i].idProducto === idProducto) {
            existeProducto = true;
            break;
        }
    }

    if (!existeProducto)
        return;

        if (cantidad>0)
            this.cantidad [idProducto] = cantidad;
        else if (cantidad===0)
            delete this.cantidad[idProducto];
    }

    infoProducto(idProducto) {

         for (let i = 0; i < this.productos.length; i++) {

             if (this.productos[i].idProducto === idProducto){
                
                 let producto = this.productos[i];
                 let unidades = this.cantidad[idProducto] || 0;

            return {
                idProducto: producto.idProducto,
                nombre: producto.nombre,
                precio: producto.precio,
                descripcion: producto.descripcion,
                imagen: producto.imagen,
                cantidad: unidades
            };
            }
            }
             console.log("No existe el producto");
                return null;
    
    }

    obtenerCarrito() {
         let productosCarrito = [];
         let precioTotal = 0;

        for (let i = 0; i < this.productos.length; i++) {

            let producto = this.productos[i];
            let unidades = this.cantidad[producto.idProducto] || 0;

        if (unidades > 0) {
            productosCarrito.push(this.infoProducto(producto.idProducto));
            precioTotal += producto.precio * unidades;
        }
        }

    return {
        productos: productosCarrito,
        total: precioTotal
    };

    }
}

    let carritoMuebles;

    fetch("./productos.json")
    .then(function(respuesta) {
        return respuesta.json();
    })

  .then(function(datos) {

     carritoMuebles = new Carrito(datos.productos);

     mostrarProductos(datos.productos);

     let productosGuardados = JSON.parse(localStorage.getItem("carrito")) || [];

    for (let i = 0; i < productosGuardados.length; i++) {

    carritoMuebles.actualizarCantidad(
        productosGuardados[i].idProducto,
        productosGuardados[i].cantidad
    );
    }   
        console.log("Productos de la API:", carritoMuebles.productos.length);
        console.log("Estado del carrito:", carritoMuebles.obtenerCarrito());

        if (typeof mostrarCarrito === "function") {
             mostrarCarrito();
                                }
   })
    .catch(function(error) {
        console.log("Error al obtener los productos:", error);
    });

    function buscarIdProducto(nombre) {

    for (let i = 0; i < carritoMuebles.productos.length; i++) {

        if (carritoMuebles.productos[i].nombre === nombre)
            return carritoMuebles.productos[i].idProducto;

    }

    return null;
}

function mostrarProductos(productos) {

    const contenedor = document.getElementById("lista-productos");

    if (!contenedor) {
        return;
    }

    contenedor.innerHTML = "";

    for (let i = 0; i < productos.length; i++) {

    let producto = productos[i];

    let etiqueta = "";

if (producto.idProducto === 2) {
    etiqueta = '<div class="badge bg-danger text-white position-absolute" style="top: 1rem; right: 1rem; z-index: 10;">-15%</div>';
} else if (producto.idProducto === 3 || producto.idProducto === 7) {
    etiqueta = '<div class="badge bg-success text-white position-absolute" style="top: 1rem; right: 1rem; z-index: 10;">Nuevo</div>';
} else if (producto.idProducto === 5) {
    etiqueta = '<div class="badge bg-warning text-dark position-absolute" style="top: 1rem; right: 1rem; z-index: 10;">Oferta</div>';
}


    contenedor.innerHTML += `
        <div class="col mb-5">
            <div class="card h-100 product-card">

            ${etiqueta}

                <img class="card-img-top"
                     src="${producto.imagen}"
                     alt="${producto.nombre}">

                <div class="card-body p-4">
                    <div class="text-center">
                        <h5 class="fw-bolder">${producto.nombre}</h5>
                        <p class="text-muted small">${producto.descripcion}</p>
                        <span class="fw-bold fs-5">${producto.precio.toFixed(2)} €</span>
                    </div>
                </div>

                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center">
                        <button class="btn btn-outline-dark mt-auto w-100"
                                onclick="addToCart('${producto.nombre}')">
                            <i class="bi bi-cart-plus me-2"></i>Añadir
                        </button>
                    </div>
                </div>

            </div>
        </div>
    `;
}

}