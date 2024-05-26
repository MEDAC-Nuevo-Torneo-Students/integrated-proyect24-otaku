// Get products from productos.json
/*
let products = null;
fetch('../js/products.json')
.then(response => response.json())
.then(data => {
    products = data;
    console.log(products);
    addDataToHTML();
})
// add data to HTML
let listProduct = document.querySelector('.listProduct');
function addDataToHTML(){
    products.forEach(product => {
        // create new element item
        let newProduct = document.createElement('a');
        newProduct.href = 'product.html?id=' + product.id;
        newProduct.classList.add('item');
        newProduct.innerHTML = `
            <img src="${product.imagen}">
            <h2>"${product.titulo}"</h2>
            <div class="prize">${product.precio}</div>
        `;

        // add this element to list
        listProduct.appendChild(newProduct);
    })
}*/

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
    detail.querySelector('.price').innerText = thisProduct.precio;
    detail.querySelector('.description').inerText = thisProduct.descripcion;

    // add data product similar
    let listProduct = document.querySelector('.listProduct');
    (products.filter(value => value.id != productId))
    .forEach(product => {
        let newProduct = document.createElement('a');
        newProduct.href = '/product?id=' + product.id;
        newProduct.classList.add('item');
        newProduct.innerHTML = `
            <img src="${product.imagen}">
            <h2>"${product.titulo}"</h2>
            <div class="prize">${product.precio}</div>
        `;
        listProduct.appendChild(newProduct);
    }) 
}