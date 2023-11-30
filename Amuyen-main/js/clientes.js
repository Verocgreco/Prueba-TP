const API_URL_LOCAL = "http://127.0.0.1:5000/clientes";
const API_URL = "https://amuyen.pythonanywhere.com/clientes";
const htmlResponse = document.getElementById("app");
const ul = document.createElement("ul");
const p = document.createElement("p");

fetch(API_URL_LOCAL)
  .then(response => {
    console.log(response);
    return response.json();
  })

  .then((customers) => {
    customers.forEach((customer) => {
      let div = document.createElement("div");
      let element = document.createElement("li");
      const nombre = document.createElement("p");
      const comentario = document.createElement("p");

      nombre.classList.add("p-title");
      nombre.textContent = `${customer.nombre} ${customer.apellido}`;
      comentario.textContent = `${customer.comentario}`;

      element.appendChild(nombre);
      element.appendChild(comentario);
      div.appendChild(element);
      ul.appendChild(div);
    });
    htmlResponse.appendChild(ul);
  });
