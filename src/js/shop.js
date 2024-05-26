// -----------------JS barra sticky-----------------

const classbar = document.querySelector('#class_filtrer');
let classbarTop = classbar.offsetTop;
function stickyclassbar() {
    if (window.scrollY >= classbarTop) {
        classbar.classList.add('sticky');
    } else {
        classbar.classList.remove('sticky');
    }
}
window.addEventListener('scroll', stickyclassbar);


// ------------------JS productos-----------------
let productos = [];

fetch("../js/products.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })


const contenedorProductos = document.querySelector("#shop_grid");
const botonesCategorias = document.querySelectorAll(".filtrer_option");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesComprar = document.querySelectorAll(".product_buy");


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = " ";

    productosElegidos.forEach(producto => {

        let div = document.createElement("a");
        div.classList.add("products");
        div.href = '/product?id=' + producto.id;
        div.innerHTML = `
            <img class="product_image" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="product_details">
                <h3 class="product_title">${producto.titulo}</h3>
                <button class="product_buy" id="${producto.id}">${producto.precio}€</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "novedades") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".product_buy");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}