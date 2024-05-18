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
  try {
    await wait(3000);
    crearDiv();
    let selection = await Promise.race([
      waitForUserSelection(),
      rejectOnEscape()
    ]);
    document.querySelector(
      ".message"
    ).innerText = `Seleccionaste: ${selection}`;
  } catch (err) {
    console.log(err);
    document.getElementById("div-principal").remove();
  }

  // wait(3000)
  //   .then(() => crearDiv())
  //   .then(() => Promise.race([waitForUserSelection(), rejectOnEscape()]))
  //   .then((selection) => {
  //     document.querySelector(
  //       ".message"
  //     ).innerText = `Seleccionaste: ${selection}`;
  //   })
  //   .catch(() => document.getElementById("div-principal").remove());
});

function waitForUserSelection() {
  return new Promise((resolve) => {
    document.addEventListener("keydown", (event) => {
      if (event.key === "a" || event.key === "A") {
        console.log("A");
        resolve("A");
      } else if (event.key === "b" || event.key === "B") {
        console.log("B");
        resolve("B");
      }
    });
  });
}

function rejectOnEscape() {
  return new Promise((resolve, reject) => {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        console.log("Escape key pressed");
        reject("Escape key pressed");
      }
    });
  });
}
