let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#empty_cart");
const contenedorCarritoProductos = document.querySelector("#cart_products");
const contenedorCarritoAcciones = document.querySelector("#cart_actions");
const contenedorCarritoComprado = document.querySelector("#cart_bought");
let botonesEliminar = document.querySelectorAll(".cart_product_delete");
const botonVaciar = document.querySelector("#cart_deplete");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#cart_actions_buy");


function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("cart_product");
            div.innerHTML = `
                <img class="cart_product_image" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="cart_product_tittle">
                    <small>Nombre:</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="cart_product_amount">
                    <small>Unidades:</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="cart_product_prize">
                    <small>Precio:</small>
                    <p>${producto.precio} €</p>
                </div>
                <div class="cart_product_subtotal">
                    <small>Subtotal:</small>
                    <p>${producto.precio * producto.cantidad} €</p>
                </div>
                <button class="cart_product_delete" id="${producto.id}">
                    <svg fill="#000000" width="64px" height="64px" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M 27.9999 51.9062 C 41.0546 51.9062 51.9063 41.0547 51.9063 28.0000 C 51.9063 14.9219 41.0312 4.0938 27.9765 4.0938 C 14.8983 4.0938 4.0937 14.9219 4.0937 28.0000 C 4.0937 41.0547 14.9218 51.9062 27.9999 51.9062 Z M 22.2109 41.9219 C 20.5468 41.9219 19.5858 41.0078 19.5155 39.3438 L 18.6483 20.2187 L 17.2421 20.2187 C 16.6093 20.2187 16.0702 19.6797 16.0702 19.0469 C 16.0702 18.3906 16.6093 17.875 17.2421 17.875 L 22.5624 17.875 L 22.5624 15.9766 C 22.5624 14.1484 23.7577 13.0000 25.4921 13.0000 L 30.3905 13.0000 C 32.1249 13.0000 33.3202 14.1484 33.3202 15.9766 L 33.3202 17.875 L 38.6405 17.875 C 39.2733 17.875 39.7890 18.3906 39.7890 19.0469 C 39.7890 19.6797 39.2733 20.2187 38.6405 20.2187 L 37.2812 20.2187 L 36.4140 39.3438 C 36.3202 41.0078 35.3593 41.9219 33.6952 41.9219 Z M 24.9296 17.875 L 30.9530 17.875 L 30.9530 16.4219 C 30.9530 15.7891 30.5077 15.3672 29.8514 15.3672 L 26.0077 15.3672 C 25.3749 15.3672 24.9296 15.7891 24.9296 16.4219 Z M 23.6405 39.3438 C 24.2265 39.3438 24.5780 38.9453 24.5546 38.3828 L 23.9921 22.6797 C 23.9452 22.1172 23.5936 21.7422 23.0546 21.7422 C 22.4687 21.7422 22.0936 22.1406 22.1171 22.6797 L 22.7499 38.4062 C 22.7733 38.9687 23.1249 39.3438 23.6405 39.3438 Z M 27.9530 39.3203 C 28.5390 39.3203 28.9140 38.9453 28.9140 38.3828 L 28.9140 22.6797 C 28.9140 22.1406 28.5390 21.7422 27.9530 21.7422 C 27.3671 21.7422 26.9921 22.1406 26.9921 22.6797 L 26.9921 38.3828 C 26.9921 38.9453 27.3905 39.3203 27.9530 39.3203 Z M 32.2890 39.3438 C 32.8046 39.3438 33.1562 38.9687 33.1796 38.4062 L 33.8124 22.6797 C 33.8358 22.1406 33.4374 21.7422 32.8514 21.7422 C 32.3358 21.7422 31.9609 22.1172 31.9374 22.6797 L 31.3749 38.3828 C 31.3514 38.9453 31.7030 39.3438 32.2890 39.3438 Z"></path></g></svg>
                </button>
            `;
    
            contenedorCarritoProductos.append(div);
        })
    
    actualizarBotonesEliminar();
    actualizarTotal();
	
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".cart_product_delete");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    /*Toastify({
        text: "Producto eliminado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #4b33a8, #785ce9)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();*/

    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {

    Swal.fire({
        title: '¿Estás seguro?',
        icon: 'question',
        html: `Se van a borrar ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
        }
      })
}


function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `${totalCalculado} €`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");

}
