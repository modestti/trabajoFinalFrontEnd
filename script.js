let productos = [
{
    id : "01",
    nombre: "Pijama de Garfield", 
    precio: "$30.000",
    imagen: "./imagenes/pijama1.jpg"
},
{
    id : "02",
    nombre: "Pijama de dibujito frutilla", 
    precio: "$30.000",
    imagen: "./imagenes/pijama2.jpg"
},
{
    id : "03",
    nombre: "Pijama de Mickey azul",
    precio: "$30.000",
    imagen: "./imagenes/pijama3.jpg"
}
];

let carrito = [];

function sumarCantidadProducto(id) {
    let productoEnCarrito = null;
    for(let i = 0; i < carrito.length; i++) {
        if(carrito[i].id === id) {
            productoEnCarrito = carrito[i];
            break;
        }
    }
    if(productoEnCarrito) {
        productoEnCarrito.cantidad++;
        actualizarCarrito();
    }
}

function eliminarProductoDelCarrito(id) {
    const nuevoCarrito = [];
    for(let i = 0; i < carrito.length; i++) {
        if(carrito[i].id !== id) {
            nuevoCarrito.push(carrito[i]);
        }
    }
    carrito = nuevoCarrito;
    actualizarCarrito();
}

function restarCantidadProducto(id) {
    let productoEnCarrito = null;
    for(let i = 0; i < carrito.length; i++) {
        if(carrito[i].id === id) {
            productoEnCarrito = carrito[i];
            break;
        }
    }
    if(productoEnCarrito) {
        productoEnCarrito.cantidad--;
        if(productoEnCarrito.cantidad <= 0) {
            eliminarProductoDelCarrito(id);
        } else {
            actualizarCarrito();
        }
    }
}

function manejarClickActualizar(evento) {
    const boton = evento.target.closest("button");
    if (!boton) return;
    const id = boton.dataset.id;
    const action = boton.dataset.action;

    if (boton.classList.contains("btn-cantidad")) {
        if (action === "sumar") {
            sumarCantidadProducto(id);
        } else if (action === "restar") {
            restarCantidadProducto(id);
        }
    }
    if (boton.classList.contains("btn-eliminar")) {
        eliminarProductoDelCarrito(id);
    }
}
    
function actualizarCarrito() {
    let contenedorCarrito = document.getElementById("carrito-contenedor");
    contenedorCarrito.innerHTML = "";
    if(carrito.length === 0) {
        contenedorCarrito.innerHTML = "<p>El carrito está vacío</p>";
        return;
    }
    let total = 0;
    for (let i = 0; i < carrito.length; i++) {
        let producto = carrito[i];
        total += parseFloat(producto.precio.replace("$", "").replace(".", "")) * producto.cantidad;
        contenedorCarrito.innerHTML += `
            <div class="producto-carrito">
                <span class="nombre">${producto.nombre}</span>
                <span class="precio">Precio: ${producto.precio}</span>
                <span class="cantidad"> 
                    <button class= "btn-cantidad" data-id="${producto.id}" data-action="restar"><i class="fa-solid fa-minus"></i></button>
                    <span class="textocant">${producto.cantidad}</span>
                    <button class= "btn-cantidad" data-id="${producto.id}" data-action="sumar"><i class="fa-solid fa-plus"></i></button>
                    <button class= "btn-eliminar" data-id="${producto.id}" data-action="eliminar"><i class="fa-solid fa-trash"></i></button>
                    </span>
            </div>
        `;
    }
    contenedorCarrito.innerHTML += `<div class="total">Total: $${total.toLocaleString()}</div>`;

    const productosCarrito = document.querySelectorAll(".producto-carrito");

    productosCarrito.forEach(producto => {
        producto.addEventListener("click", manejarClickActualizar);
    });
    
}

function agregarProductoAlCarrito(id) {
    let productoEnCarrito = null;
    for(let i = 0; i < carrito.length; i++) {
        if(carrito[i].id === id) {
            productoEnCarrito = carrito[i];
            break;
        }
    }
    if(productoEnCarrito) {
        productoEnCarrito.cantidad++;
    }else {
        let productoOriginal= null;
        for(let i = 0; i < productos.length; i++) {
            if(productos[i].id === id) {
                productoOriginal = productos[i];
                break;
            }
        }
        if(productoOriginal) {
            carrito.push({...productoOriginal, cantidad: 1});
        }
    } 
    actualizarCarrito();
}

function manejarClickCarrito(evento) {
    if(evento.target.classList.contains("btn-carrito")) {
        const idProducto = evento.target.dataset.id;
        agregarProductoAlCarrito(idProducto);
    }
}

function mostrarProductos() {
    let cardsProductos = document.getElementById("contenedor-productos");
    for(let i = 0; i < productos.length; i++) {
        let producto = productos[i];
        cardsProductos.innerHTML += `
            <div class="producto">
                <img src="${producto.imagen}" alt="${producto.nombre}" width="600" height="400" >
                <h3>${producto.nombre}</h3>
                <p>${producto.precio}</p>
                <button class="btn-carrito" type="button" data-id="${producto.id}">Agregar al carrito</button>
            </div>
        `;
    }
    cardsProductos.addEventListener("click", manejarClickCarrito);
}

mostrarProductos();
actualizarCarrito();
