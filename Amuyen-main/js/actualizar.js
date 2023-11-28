const URL = "http://127.0.0.1:5000/"
const app = Vue.createApp({
    data() {
        return {
            codigo: '',
            nombre: '',
            stock: '',
            precio: '',            
            imagen_url: '',
            imagenSeleccionada:'',      
        };
    },
    methods: {
        obtenerProducto() {
            fetch(URL + 'productoss/' + this.codigo)
                .then(response => response.json())
                .then(data => {
                    this.nombre = data.nombre;
                    this.stock = data.stock;
                    this.precio = data.precio;                    
                    this.imagen_url =  data.imagen_url;                    
                })
                .catch(error => console.error('Error:', error));
        },
        seleccionarImagen(event) {
            const file = event.target.files[0];
            this.imagenSeleccionada = file;
           // this.imagenUrlTemp = URL.createObjectURL(file); // Crea una URL temporal para la vista previa
        },
        actualizar() {
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