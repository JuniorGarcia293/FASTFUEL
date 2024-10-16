let cart = [];
let total = 0;

document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const productCard = button.closest('.producto-v2');
            const productName = productCard.querySelector('h2').textContent;
            const productPrice = parseFloat(productCard.querySelector('h3').textContent.replace('S/', ''));
            addToCart(productName, productPrice);
        });
    });
});

function addToCart(name, price) {
    
    cart.push({ name, price });
    total += price;
    
    
    updateCartView();
}

function updateCartView() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    
   
    cartItemsContainer.innerHTML = '';
    
    
    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.textContent = `${item.name} - S/ ${item.price.toFixed(2)}`;
        cartItemsContainer.appendChild(cartItem);
    });
    
    
    totalPriceElement.textContent = `S/ ${total.toFixed(2)}`;
}



document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname; 

    
    if (currentPage.includes('carro compras.html') || currentPage === '/') {
        const productForm = document.getElementById('product-form');

        if (productForm) {

            
            const editProductId = localStorage.getItem('editProductId');

            if (editProductId) {
                const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
                const productToEdit = storedProducts.find(p => p.id == editProductId);
                if (productToEdit) {
                    document.getElementById('description').value = productToEdit.description;
                    document.getElementById('price').value = productToEdit.price;
                    document.getElementById('quantity').value = productToEdit.quantity;
                }
            }
            

            
            productForm.addEventListener('submit', (e) => {
                e.preventDefault();

                
                const description = document.getElementById('description').value;
                const price = document.getElementById('price').value;
                const quantity = document.getElementById('quantity').value;


               
                const storedProducts = JSON.parse(localStorage.getItem('products')) || [];

                if (editProductId) {
                    const updatedProducts = storedProducts.map(product => {
                        if (product.id == editProductId) {
                            return {
                                ...product,
                                description,
                                price,
                                quantity
                            };
                        }
                        return product;
                    });

                    localStorage.setItem('products', JSON.stringify(updatedProducts));
                    localStorage.removeItem('editProductId');
                    alert('Producto editado con éxito!');
                }

                else{
                
                const product = {
                    id: Date.now(),
                    description,
                    price,
                    quantity
                };

                
                storedProducts.push(product);
                localStorage.setItem('products', JSON.stringify(storedProducts));

               
                productForm.reset();
                alert('Producto creado con éxito!');
                }


                window.location.href = 'products.html'; 
            });
        }
    }

    
    if (currentPage.includes('products.html')) {
        const productList = document.getElementById('product-list');
        const noProductsMessage = document.getElementById('no-products');

        
        if (!productList || !noProductsMessage) {
            console.error('No se encontraron los elementos necesarios en el DOM en products.html.');
            return;
        }

        
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        if (storedProducts.length > 0) {
            noProductsMessage.style.display = 'none';
            storedProducts.forEach(product => renderProduct(product));
        }

        
        function renderProduct(product) {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product-item');
            productDiv.setAttribute('data-id', product.id); 
            productDiv.innerHTML = `
                <h2>${product.description}</h2>
                <p>Precio: $${product.price}</p>
                <p>Cantidad: ${product.quantity}</p>
                <button class="edit-button">Editar</button>
                <button class="delete-button">Eliminar</button>
            `;
            productList.appendChild(productDiv);

            
            const deleteButton = productDiv.querySelector('.delete-button');
            deleteButton.addEventListener('click', () => deleteProduct(product.id));

            const editButton = productDiv.querySelector('.edit-button');
            editButton.addEventListener('click', () => editProduct(product.id));

        }

        
        function deleteProduct(id) {
            const updatedProducts = storedProducts.filter(product => product.id !== id);
            localStorage.setItem('products', JSON.stringify(updatedProducts));
            location.reload(); 
        }
        
        function editProduct(id) {
            localStorage.setItem('editProductId', id);
            window.location.href = 'index.html';
            }

    }
});
