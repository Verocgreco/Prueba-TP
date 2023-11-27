const API_URL = "https://jsonplaceholder.typicode.com/users";
const htmlResponse = document.getElementById("app");
const ul = document.createElement("ul");
const p = document.createElement("p");

fetch(API_URL)
  .then((response) => response.json())
  .then((users) => {
    users.forEach((user) => {
      let div = document.createElement("div");
      let element = document.createElement("li");
      const p = document.createElement("p");
      const text = document.createElement("p");

      p.classList.add("p-title");
      p.textContent = `${user.name}`;

      agregarComentario(
        p,
        "Leanne Graham",
        text,
        "- Excelentes productos. Supér recomendables"
      );

      agregarComentario(
        p,
        "Clementine Bauch",
        text,
        "- Siempre me envían todo en tiempo y forma."
      );

      agregarComentario(
        p,
        "Chelsey Dietrich",
        text,
        "- La calidad de los productos es excelente."
      );

      agregarComentario(
        p,
        "Kurtis Weissnat",
        text,
        "- Precios accesibles y buena mercadería. Excelente combinación."
      );

      agregarComentario(
        p,
        "Glenna Reichert",
        text,
        "- Me encantan sus productos. Los felicito"
      );

      agregarComentario(p, "Ervin Howell", text, "- Muy buena atención.");

      agregarComentario(p, "Patricia Lebsack", text, "- Recomendables 100%.");

      agregarComentario(
        p,
        "Mrs. Dennis Schulist",
        text,
        "- Encantada con sus productos, sin duda voy a volver a comprar."
      );

      agregarComentario(
        p,
        "Nicholas Runolfsdottir V",
        text,
        "- Muy rico y saludable todo."
      );

      agregarComentario(
        p,
        "Clementina DuBuque",
        text,
        "- Todo muy rico, gracias por traerlo hasta la puerta de mi casa."
      );

      element.appendChild(p);
      element.appendChild(text);
      div.appendChild(element);
      ul.appendChild(div);
    });
    htmlResponse.appendChild(ul);
  });

function agregarComentario(firstValue, name, secondValue, comentario) {
  if (firstValue.textContent === name) {
    secondValue.textContent = comentario;
  }
}
