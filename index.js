let cart = [];
let total = 0;

document.addEventListener('DOMContentLoaded', () => {
    const visualizarCarrito = document.getElementById("VisualizarCarrito");
    if (visualizarCarrito) {
        visualizarCarrito.addEventListener('click', (event) => {
            const carrito = document.getElementById("carroCompras");
            carrito.style.visibility = "visible";
        });
    }

    const botomguardarpersonalizacion = document.getElementById("boton-guardar");
    if (botomguardarpersonalizacion) {
        botomguardarpersonalizacion.addEventListener('click', (event) => {
            alert("Se guardaron los cambios");
        });
    }

    const cerrarCarritoCompras = document.getElementById("CerrarCarritoCompras");
    if (cerrarCarritoCompras) {
        cerrarCarritoCompras.addEventListener('click', (event) => {
            const carrito = document.getElementById("carroCompras");
            carrito.style.visibility = "hidden";
        });
    }

    loadCartFromLocalStorage();

    var addToCartButtons = document.querySelectorAll('.AgregarPedido');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            var productCard = button.closest('.producto-v2');
            var productName = productCard.querySelector('h2').textContent;
            var productPrice = parseFloat(productCard.querySelector('h3').textContent.replace('S/', ''));
            var productImagen = productCard.querySelector('img').src;

            // Generar un ID único para el producto
            var productId = 'P' + new Date().getTime() + Math.floor(Math.random() * 1000);

            addToCart(productId, productName, productPrice, productImagen);

            alert("Se agregó el pedido correctamente");
        });
    });
});

function addToCart(id, name, price, imagen) {
    // Verificar si el producto ya existe en el carrito por su ID
    var existingProduct = cart.find(item => item.name === name);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id, name, price, imagen, quantity: 1 });
    }

    total += price;
    saveCartToLocalStorage();
    updateCartView();
}

function updateCartView() {
    const cartItemsContainer = document.getElementById('elementos');
    const totalPriceElement = document.getElementById('total-price');
    cartItemsContainer.innerHTML = '';

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.style.display = "flex";
        cartItem.style.alignItems = "center";
        cartItem.style.height = "10%";
        cartItem.style.width = "80%";
        cartItem.style.padding = "10px";
        cartItem.style.marginBottom = "10px";

        const image = document.createElement('img');
        image.src = item.imagen;
        image.style.width = "30%";
        image.style.height = "90%";
        image.style.objectFit = "contain";

        const DescripcionProducto = document.createElement('div');
        DescripcionProducto.innerHTML = `${item.name} (x${item.quantity})<br>S/ ${(item.price * item.quantity).toFixed(2)}`;
        DescripcionProducto.style.width = "50%";
        DescripcionProducto.style.height = "90%";
        DescripcionProducto.style.marginTop = "10px";
        DescripcionProducto.style.objectFit = "contain";

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        removeButton.style.backgroundColor = '#c82a54';
        removeButton.style.border = 'none';
        removeButton.style.color = 'white';
        removeButton.style.padding = '8px 16px';
        removeButton.style.marginLeft = '10px';
        removeButton.style.cursor = 'pointer';
        removeButton.style.borderRadius = '5px';
        removeButton.addEventListener('click', () => removeFromCart(index));

        cartItem.appendChild(image);
        cartItem.appendChild(DescripcionProducto);
        cartItem.appendChild(removeButton);
        cartItemsContainer.appendChild(cartItem);
    });

    totalPriceElement.textContent = `S/ ${total.toFixed(2)}`;
}

function removeFromCart(index) {
    const removedItem = cart.splice(index, 1)[0];
    total -= removedItem.price * removedItem.quantity;
    saveCartToLocalStorage();
    updateCartView();
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('total', total.toFixed(2));
}

function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    const savedTotal = localStorage.getItem('total');

    if (savedCart) {
        cart = JSON.parse(savedCart);
    }

    if (savedTotal) {
        total = parseFloat(savedTotal);
    }

    updateCartView();
}











        
        