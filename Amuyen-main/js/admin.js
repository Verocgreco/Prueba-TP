document.addEventListener("DOMContentLoaded", function () {
    const botonEnviar = document.getElementById("enviar");
    const ingresada = document.getElementById("contraseña");
    const acceso = document.getElementById("acceso")
    const popup = document.getElementById("popup")

    botonEnviar.addEventListener("click", function () {
        if (ingresada.value === "amuyen") {
            const accesoBotones = '<div class="botones">'                
                + '<button id="btnCarga"><h1>Carga de productos</h1></button>'
                + '<button id="btnActualizar"><h1> Actualización de productos</h1></button>'
                + '<button id="btnBaja"><h1>Baja de productos</h1></button></div>';

            acceso.innerHTML = accesoBotones;
            popup.innerHTML = '';
            const btnCarga = document.getElementById("btnCarga");
            const btnActualizar = document.getElementById("btnActualizar");
            const btnBaja = document.getElementById("btnBaja");

            btnCarga.addEventListener("click", function () {                
                window.location.href = "carga.html";       
            });

            btnActualizar.addEventListener("click", function (){
                window.location.href = "actualizacion.html";
            });

            btnBaja.addEventListener("click", function (){  
                window.location.href = "baja.html";
            });
        } else {
            alert("Contraseña incorrecta")
        }
    })
});
