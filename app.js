function wait(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

function crearDiv() {
  let main = document.querySelector("main");
  let div = document.createElement("div");
  div.id = "div-principal";
  div.innerHTML = `
  <h1>Escoge una opción:</h1>
  <br />
  <button class="options">A</button>
  <button class="options">B</button>
  <p class="message"></p>
  `;
  main.appendChild(div);
}

function userSelection() {}

window.addEventListener("load", async function () {
  await wait(1000);
  crearDiv();
  let result = await Promise.race([displaySelection(), rejectOnEscape(), unexpectedKey()]);
  switch (result) {
    case "unexpectedKey":
      document.querySelector(".message").innerText = `Seleccionaste: ${result} y no es una tecla válida`;
      break;
    case "a":
    case "b":
      document.querySelector(".message").innerText = `Seleccionaste: ${result}`;
  }
});

window.addEventListener("load", async function () {
  await wait(20000);
  document.getElementById("div-principal").remove();
});

async function rejectOnEscape() {
  await waitForUserSelection(["Escape"]);
  document.getElementById("div-principal").remove();
}

async function displaySelection() {
  let selection = await waitForUserSelection(["a", "b"]);
  return selection;
}

async function unexpectedKey() {
  let selection = await waitForUserSelection();
  return "unexpectedKey";
}

function waitForUserSelection(keys) {
  return new Promise((resolve) => {
    function efecto(event) {
      if (!keys || keys.includes(event.key)) {
        document.removeEventListener("keydown", efecto);
        resolve(event.key);
      }
    }
    document.addEventListener("keydown", efecto);
  });
}

// EJEMPLO CARGAR VINOS DESDE UNA API

// async function cargaVinos() {
//   let response = await fetch("https://api.sampleapis.com/wines/reds");
//   let data = await response.json();
//   return data;
// }

// console.log(await cargaVinos());
