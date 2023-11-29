from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from werkzeug.utils import secure_filename
import os
import time

app = Flask(__name__)
CORS(app, resources={r"/productos/*": {"origins": "http://127.0.0.1:5500"}})

class Producto:
    def __init__(self, host, user, password, database):
        self.conn = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database=database
        )
        self.cursor = self.conn.cursor()

        try:
            self.cursor.execute(f"USE {database}")
        except mysql.connector.Error as error:
            if error.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR:
                self.cursor.execute(f"CREATE DATABASE {database}")
                self.conn.database = database
            else:
                raise error

        self.cursor.execute('''CREATE TABLE IF NOT EXISTS productos (
            codigo INT PRIMARY KEY, 
            nombre VARCHAR(30) NOT NULL, 
            precio DECIMAL(10, 2) NOT NULL, 
            stock INT(11) NOT NULL, 
            imagen_url VARCHAR(250) DEFAULT NULL
        )''')
        self.conn.commit()
        self.cursor.close()
        self.cursor = self.conn.cursor(dictionary=True)

    def cargar_producto(self, codigo, nombre, precio, stock, imagen):
        self.cursor.execute(f"SELECT * FROM productos WHERE codigo = {codigo}")
        prod_existente = self.cursor.fetchone()
        if prod_existente:
            return False

        sql = "INSERT INTO productos(codigo, nombre, precio, stock, imagen_url) VALUES (%s, %s, %s, %s, %s)"
        valores = (codigo, nombre, precio, stock, imagen) if imagen else (codigo, nombre, precio, stock, None)

        self.cursor.execute(sql, valores)
        self.conn.commit()
        return True

    def buscar_producto_por_codigo(self, codigo): 
        self.cursor.execute(f"SELECT * FROM productos WHERE codigo = {codigo}")
        return self.cursor.fetchone()

    def listar_productos(self):
        self.cursor.execute("SELECT * FROM productos ")
        productos = self.cursor.fetchall()
        return productos
    
    def eliminar_producto(self, codigo):
        self.cursor.execute(f"DELETE FROM productos WHERE codigo = {codigo}")
        self.conn.commit()
        return self.cursor.rowcount > 0

    def modificar_producto(self, codigo, nombre, precio, stock, imagen ):
        sql = "UPDATE productos SET nombre = %s, precio=%s, stock=%s, imagen_url=%s WHERE codigo=%s"
        valores = (nombre, precio, stock, imagen, codigo)
        self.cursor.execute(sql, valores)
        self.conn.commit()
        return self.cursor.rowcount > 0

# Ajusta los parámetros según tu configuración
producto = Producto(host='localhost', user='root', password='', database='productos')

ruta_img = './static/imagenes/'

@app.route("/productoss", methods=["GET"])
def listar_productos():
    productos = producto.listar_productos()
    return jsonify(productos) 

@app.route("/productoss/<int:codigo>", methods=["GET"])
def mostrar_producto(codigo):
    prod = producto.buscar_producto_por_codigo(codigo)
    if prod:
        return jsonify(prod)
    else:
        return "Producto inexistente", 404

@app.route("/productoss", methods=["POST"])
def cargar_producto():
    codigo = request.form['codigo']
    nombre = request.form['nombre']
    precio = request.form['precio']
    stock = request.form['stock']
    imagen = request.files['imagen'] if 'imagen' in request.files else None
        
    prod = producto.buscar_producto_por_codigo(codigo)
    if not prod:
        nombre_img = secure_filename(imagen.filename) if imagen else None    
        nombre_base, extension = os.path.splitext(nombre_img) if nombre_img else (None, None)
        nombre_img = f"{nombre_base}_{int(time.time())}{extension}" if nombre_img else None        

        if producto.cargar_producto(codigo, nombre, precio, stock, nombre_img):  
            if imagen:
                imagen.save(os.path.join(ruta_img, nombre_img))          
            return jsonify({"mensaje": "Producto agregado"}), 201
        else:
            return jsonify({"mensaje": "Este producto ya existe"}), 400

@app.route("/productoss/<int:codigo>", methods=["PUT"])
def modificar_producto(codigo):  
    imagen = request.files.get('imagen')  
    nombre_img = None

    if imagen:
        nombre_img = secure_filename(imagen.filename)
        nombre_base, extension = os.path.splitext(nombre_img)
        nombre_img = f"{nombre_base}_{int(time.time())}{extension}"
        imagen.save(os.path.join(ruta_img, nombre_img))

    data = request.form
    codigo = data.get("codigo")
    nombre = data.get("nombre")
    precio = data.get("precio")
    stock = data.get("stock")

    prod = producto.buscar_producto_por_codigo(codigo)
    if prod:    
        if imagen and prod["imagen_url"]:
            imagen_vieja = prod["imagen_url"]
            ruta_imagen = os.path.join(ruta_img, imagen_vieja)
            if os.path.exists(ruta_imagen):
                os.remove(ruta_imagen)    
        elif prod["imagen_url"]: 
            nombre_img = prod["imagen_url"]
    

    if producto.modificar_producto(codigo, nombre, precio, stock, nombre_img):
        return jsonify({"mensaje": "Producto actualizado"}), 200
    else:
        return jsonify({"mensaje": "Producto inexistente"}), 404

# Nueva ruta para manejar la solicitud de baja de productos
@app.route("/productoss/<int:codigo>/baja", methods=["GET"])
def mostrar_formulario_baja(codigo):
    prod = producto.buscar_producto_por_codigo(codigo)
    if prod:
        return jsonify(prod)
    else:
        return "Producto inexistente", 404

# Nueva ruta para manejar la solicitud de baja de productos
@app.route("/productoss/<int:codigo>/baja", methods=["POST"])
def dar_de_baja_producto(codigo):
    # Lógica para dar de baja un producto
    if producto.eliminar_producto(codigo):
        return jsonify({"mensaje": "Producto dado de baja correctamente"}), 200
    else:
        return jsonify({"mensaje": "Producto inexistente"}), 404

if __name__ == "__main__":    
    app.run(debug=True)
