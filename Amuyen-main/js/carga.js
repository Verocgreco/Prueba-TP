const URL = "http://127.0.0.1:5000/"

const app = Vue.createApp({
    data() {
        return {
            codigo: '',
            nombre: '',
            stock: '',
            precio: '',
            imagenSeleccionada: null,
        };
    },
    methods: {
        cargarProducto() {
            if (this.stock <= 0 || this.precio <= 0 || this.codigo <=0) {//validación de enteros positivos
                alert('Por favor, ingrese números mayores a 0.');
                return;
            }
            const formData = new FormData();
            formData.append('codigo', this.codigo);
            formData.append('nombre', this.nombre);
            formData.append('stock', this.stock);
            formData.append('precio', this.precio);

            if (this.imagenSeleccionada) {
                formData.append('imagen', this.imagenSeleccionada, this.imagenSeleccionada.name);
            }

            fetch(URL + './productoss', {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    alert('Producto agregado correctamente.');
                    this.limpiarFormulario();
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('El código ya existe, no se puede cargar el producto');
                });   
    
        },
seleccionarImagen(event) {
    this.imagenSeleccionada = event.target.files[0];
},
limpiarFormulario() {
    this.codigo = '';
    this.nombre = '';
    this.stock = '';
    this.precio = '';
    this.imagenSeleccionada = null;
},
    },

});
app.mount('#app');