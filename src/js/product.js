//get dats product in products.json

let products = null;
fetch('../js/products.json')
.then(response => response.json())
.then(data => {
    products = data;
    showDetail();
})
// find this product
function showDetail () {
    let detail = document.querySelector('.detail');
    productId = new URLSearchParams(window.location.search).get('id');
    let thisProduct = products.filter(value => {
        return value.id == productId
    })[0];
    // if no product id = productId, retun to index
    if(!thisProduct){
        window.location.href = "/";
    }
    // if has, add data this product in html
    detail.querySelector('.image img').src = thisProduct.imagen;
    detail.querySelector('.name').innerText = thisProduct.titulo;
    detail.querySelector('.price').innerText = thisProduct.precio + " €";
    detail.querySelector('.price2').innerText = (thisProduct.precio - 0.67).toFixed(2) + " €";
    detail.querySelector('.price3').innerText = (thisProduct.precio * 0.95).toFixed(2) + " €";
    detail.querySelector('.price4').innerText = (thisProduct.precio * 0.90).toFixed(2) + " €";
    detail.querySelector('.description').innerText = thisProduct.descripcion;
    detail.querySelector('.userImage').src = thisProduct.comentarios.imagen;
    detail.querySelector('.userName').innerText = thisProduct.comentarios.usuario;
    detail.querySelector('.comentText').innerText = thisProduct.comentarios.texto;


    // add data product similar
    let listProduct = document.querySelector('.listProduct');
    (products.filter(value => value.id != productId && value.categoria.id === thisProduct.categoria.id))
    .forEach(product => {
        let newProduct = document.createElement('a');
        newProduct.href = '/product?id=' + product.id;
        newProduct.classList.add('item');
        newProduct.innerHTML = `
            <img class="product_image" src="${product.imagen}" alt="${product.titulo}">
            <div class="product_details">
                <h3 class="product_title">${product.titulo}</h3>
                <button class="product_buy" id="${product.id}">${product.precio}€</button>
            </div>
    `;
        listProduct.appendChild(newProduct);
    }) 
}

// codigo de boton carrito

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