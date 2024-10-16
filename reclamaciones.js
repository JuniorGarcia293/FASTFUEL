document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('Form-reclamacion');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const reclamacionID = 'R' + new Date().getTime();


        const reclamacionData = {
            id: reclamacionID,
            menorEdad: form.menorEdad.value,
            nombre: form.nombre.value,
            apellido: form.apellido.value,
            tipoDoc: form.tipoDoc.value,
            numeroDoc: form.numeroDoc.value,
            telefono: form.telefono.value,
            email: form.email.value,
            departamento: form.departamento.value,
            distrito: form.distrito.value,
            direccion: form.direccion.value,
            tipoBien: form.tipoBien.value,
            monto: form.monto.value,
            descripcion: form.descripcion.value,
            reclamacion: form.reclamacion.value,
            canal: form.canal.value,
            motivo: form.motivo.value,
            detalle: form.detalle.value,
            pedidoCliente: form.pedidoCliente.value
        };

    
        let reclamos = JSON.parse(localStorage.getItem('reclamos')) || []; 
        reclamos.push(reclamacionData); 
        localStorage.setItem('reclamos', JSON.stringify(reclamos)); 

        alert(`Reclamo enviado exitosamente, se le dara respuesta en un plano no mayor a quince dias calentarios (15)`);
        
        form.reset();
    });
});
