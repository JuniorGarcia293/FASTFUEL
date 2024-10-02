let cart = [];
let total = 0; 

document.addEventListener('DOMContentLoaded', () => {
 
    loadCartFromLocalStorage();
    
    var addToCartButtons = document.querySelectorAll('.AgregarPedido');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            alert("Se agregó el pedido correctamente");
            var productCard = button.closest('.producto');
            var productName = productCard.querySelector('h2').textContent;
            var productPrice = parseFloat(productCard.querySelector('h3').textContent.replace('S/', ''));
            var productImagen = productCard.querySelector('img').src;

            var productId = 'P' + new Date().getTime() + Math.floor(Math.random() * 1000);

            addToCart(productId, productName, productPrice, productImagen);

        });
    });
    
});

function addToCart(id, name, price, imagen) {
   
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
 
}







        
        