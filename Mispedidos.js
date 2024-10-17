document.addEventListener('DOMContentLoaded', function() {
    const buscarButton = document.querySelector('.btn-buscar');
    
    if (buscarButton) {
        buscarButton.addEventListener('click', function() {
            
            window.location.href = '2doP-Mispedidos.html'; 
        });
    }
});