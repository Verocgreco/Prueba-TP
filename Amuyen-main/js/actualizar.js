const URL = "http://127.0.0.1:5000/"
const app = Vue.createApp({
    data() {
        return {
            codigo: '',
            nombre: '',
            stock: '',
            precio: '',
            imagen_url: '',
            imagenSeleccionada: '',
        };
    },

    methods: {
        obtenerProducto() {
            if(this.codigo<=0){//obliga a ingresar un código entero positivo
                alert('Ingrese un código válido (mayor a 0)')
            }
            fetch(URL + 'productoss/' + this.codigo)            
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    if (!data) {
                        // Si no encuentra el producto, limpia los campos y muestra alerta
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
        seleccionarImagen(event) {
            const file = event.target.files[0];
            this.imagenSeleccionada = file;

        },
        actualizar() {
            if (this.stock <= 0 || this.precio <= 0) {//validación de los números ingresados 
                alert('Por favor, ingrese números positivos para Stock y Precio.');
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

            fetch(URL + 'productoss/' + this.codigo, {
                method: 'PUT',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    alert('Producto actualizado correctamente');
                    this.limpiarFormulario();
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error al actualizar el producto');
                });
        },
        limpiarFormulario() {
            this.codigo = '';
            this.nombre = '';
            this.stock = '';
            this.precio = '';
            this.imagen_url = '';
            this.imagenSeleccionada = null;
            this.imagenUrlTemp = null;
        }
    }
});

app.mount('#app');

