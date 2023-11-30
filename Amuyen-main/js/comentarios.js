const URL = "https://amuyen.pythonanywhere.com/clientes";
const URL_LOCAL = "http://127.0.0.1:5000/clientes";

// Capturamos el evento de envío del formulario
document
  .getElementById("formulario")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evitamos que se envie el form

    var formData = new FormData();
    formData.append("nombre", document.getElementById("nombre").value);
    formData.append("apellido", document.getElementById("apellido").value);
    formData.append("comentario", document.getElementById("comentario").value);

    fetch(URL_LOCAL, {
      method: "POST",
      body: formData,
    })
      .then(function (response) {
        if (response.ok) {
          alert("Comentario agregado correctamente.");
          // Limpiar el formulario para el proximo producto
          document.getElementById("nombre").value = "";
          document.getElementById("apellido").value = "";
          document.getElementById("comentario").value = "";
          return response.json();
        } else {
          throw new Error("Error, el comentario ya existe.");
        }
      })
      .catch(function (error) {
        alert(error.message);
      });
  });
