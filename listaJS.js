let arrayTareas = [];
//let ListaCheckBox = [];
let agregar = () => {
  let tarea = document.getElementById("tareas").value.trim();
  if (tarea !== "") {
    let fechaHoraActual = new Date();
    let fechaHoraFormateada = fechaHoraActual.toLocaleString();
    arrayTareas.push({
      nombretareas: tarea,
      FechaHora: fechaHoraFormateada,
      tachado: false,
      tiempoCheck:null,
    });
    document.getElementById("tareas").value = "";
    Pantalla();
  }
};

const Pantalla = () => {
  let lista = document.getElementById("Tareasescritas");
  lista.innerHTML = "";
  arrayTareas.forEach((todo, indice) => {
    let check = "";
    let tachar=""
    if (todo.tachado) {
      check = "checked";
      tachar="text-decoration: line-through; text-decoration-color:red; color:red;"
      }

    let li = document.createElement("li");
    li.innerHTML = `<div style="${tachar}"><input ${check} onclick="Tachar(${indice})" type="checkbox"/>${todo.nombretareas} - ${todo.FechaHora}</div>`;
    lista.appendChild(li);
  });
};
Pantalla();

const Tachar = (i) => {
  if (!arrayTareas[i].tachado) {
    arrayTareas[i].tiempoCheck = new Date(); 
  } else {
    arrayTareas[i].tiempoCheck = null; 
  }
  arrayTareas[i].tachado = !arrayTareas[i].tachado;
  Pantalla();
}

let MostrarTareaMasRapida=()=>{
let tareasCompletadas=arrayTareas.filter(tarea=>tarea.tachado && tarea.tiempoCheck!==null)
if(tareasCompletadas.length===0){
document.getElementById("TareaRapida").innerText = "No hay tareas completadas."
return
}
let tareaMasRapida = tareasCompletadas.reduce((tareaAntigua, tareaActual) => {
return (tareaActual.tiempoCheck < tareaAntigua.tiempoCheck) ? tareaActual : tareaAntigua;
});
document.getElementById("TareaRapida").innerText = `La primera tarea que completaste fue: ${tareaMasRapida.nombretareas}, hecha en ${tareaMasRapida.tiempoCheck.toLocaleString()}.`
}
Pantalla()


