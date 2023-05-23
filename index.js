const fecha = document.querySelector("#fecha");
const lista = document.querySelector("#lista");
const input = document.querySelector("#input");
const botonEnter = document.querySelector("#boton-enter");
const check = "fa-check-circle";
const uncheck = "fa-circle";
const lineThrough = "line-through";
let listArray;
let id;
//creacion de fecha
const newFecha = new Date();
fecha.innerHTML = newFecha.toLocaleDateString("es-PE", {
  weekday: "long",
  month: "short",
  day: "numeric",
});

//funcion agregar tarea
function agregarTarea(tarea, id, realizado, eliminado) {
  if (eliminado) return;

  const REALIZADO = realizado ? check : uncheck;
  const LINE = realizado ? lineThrough : "";

  const elemento = `
                <li id="elemento">
                    <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                    <p class="text ${LINE}">${tarea}</p>
                    <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
                </li>`;

  lista.insertAdjacentHTML("beforeend", elemento);
}

botonEnter.addEventListener("click", function (event) {
  const task = input.value;

  if (!task) {
    alert("Agregue una tarea");
    return;
  }
  agregarTarea(task, id, false, false);
  listArray.push({
    nombre: task,
    id: id,
    realizado: false,
    eliminado: false,
  });
  localStorage.setItem("toDo", JSON.stringify(listArray));
  input.value = "";
  input.focus();
  id++;
});

document.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    const task = input.value;
    if (task) {
      agregarTarea(task, id, false, false);
      listArray.push({
        nombre: task,
        id: id,
        realizado: false,
        eliminado: false,
      });
    }
    localStorage.setItem("toDo", JSON.stringify(listArray));
    input.value = "";
    id++;
  }

  input.focus();
});

//function tareaRealizada
function tareaRealizada(element) {
  //classList and toggle sirve para cambiar la clase
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector(".text").classList.toggle(lineThrough);
  listArray[element.id].realizado = listArray[element.id].realizado
    ? false
    : true;

  console.log(listArray);
  console.log(listArray[element.id]);
  console.log(listArray[element.id].realizado);
}

function tareaEliminada(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  listArray[element.id] = true;
}

lista.addEventListener("click", (event) => {
  //console.log(event.target)
  const element = event.target;
  const elementData = element.attributes.data.value;
  if (elementData === "realizado") {
    tareaRealizada(element);
  } else if (elementData === "eliminado") {
    tareaEliminada(element);
  }
  localStorage.setItem("toDo", JSON.stringify(listArray));
});

let data = localStorage.getItem("toDo");
if (data) {
  listArray = JSON.parse(data);
  id = listArray.length;
  cargarList(listArray);
} else {
  listArray = [];
  id = 0;
}

function cargarList(event) {
  event.forEach((element) => {
    agregarTarea(
      element.nombre,
      element.id,
      element.realizado,
      element.eliminado
    ); //
  });
}
