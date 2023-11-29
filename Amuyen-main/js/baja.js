const URL = "http://127.0.0.1:5000/"
const app = Vue.createApp({
    data() {
        return {
            codigo: '',
            nombre: '',
            stock: '',
            precio: '',
            imagen_url: '',
        };
    },

    methods: {
        obtenerProducto() {
            if (this.codigo <= 0) {
                alert('Ingrese un código válido (mayor a 0)')
                return;
            }

            fetch(URL + 'productoss/' + this.codigo)
            .then(response => {
                if (!response.ok) {
                    if (response.status === 404) {
                        // Si el producto no se encuentra, limpia los campos y muestra alerta
                        this.limpiarFormulario();
                        alert('Producto inexistente');
                    } else {
                        throw new Error('Error en la solicitud');
                    }
                }
                return response.json();
            })
                .then(data => {
                    if (!data) {
                        this.limpiarFormulario();
                        alert('Producto inexistente');
                        return;
                    }
                    this.nombre = data.nombre;
                    this.stock = data.stock;
                    this.precio = data.precio;
                    this.imagen_url = data.imagen_url;
                    if (!data.nombre) {
                        this.limpiarFormulario();
                    }
                })
                .catch(error => console.error('Error:', error));
        },

        darDeBaja() {
            const confirmacion = confirm('¿Estás seguro de que deseas dar de baja este producto?');
            if (confirmacion) {
                fetch(URL + 'productoss/' + this.codigo + '/baja', {
                    method: 'POST',
                })
                    .then(response => response.json())
                    .then(data => {
                        alert('Producto dado de baja correctamente');
                        this.limpiarFormulario();
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        alert('Error al dar de baja el producto');
                    });
            }
        },

        limpiarFormulario() {
            this.codigo = '';
            this.nombre = '';
            this.stock = '';
            this.precio = '';
            this.imagen_url = '';
        }
    }
});

app.mount('#app');
