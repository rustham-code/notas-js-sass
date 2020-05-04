const taskIco = `<svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clip-rule="evenodd"/>
</svg>
`;

const doneIco = `<svg class="bi bi-x-octagon-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M11.46.146A.5.5 0 0011.107 0H4.893a.5.5 0 00-.353.146L.146 4.54A.5.5 0 000 4.893v6.214a.5.5 0 00.146.353l4.394 4.394a.5.5 0 00.353.146h6.214a.5.5 0 00.353-.146l4.394-4.394a.5.5 0 00.146-.353V4.893a.5.5 0 00-.146-.353L11.46.146zm.394 4.708a.5.5 0 00-.708-.708L8 7.293 4.854 4.146a.5.5 0 10-.708.708L7.293 8l-3.147 3.146a.5.5 0 00.708.708L8 8.707l3.146 3.147a.5.5 0 00.708-.708L8.707 8l3.147-3.146z" clip-rule="evenodd"/>
</svg>`
  
// entonces aqui guardo una lista de objetos 
// que es la innfo 
let todoItems = [ 
];

let doneItems= [ 
];

 // se actualiza la interfaz con cualquier cambio que se haya hecho 
function updateUI(){
  const container = document.querySelector('.list-group');
  container.innerHTML = '';
  todoItems.forEach( (task, i) => {
    paintTask(task, i);
  })
}

// muestra los objetos guardados en la interfaz 
function paintTask(task, i){
	const container = document.querySelector('.list-group');
  const checked = task.isSelected ? 'checked' : '';
  container.insertAdjacentHTML ('beforeend', `
      <li class="list-item list-group-item ${checked} text-success"> 
       <input type="checkbox" ${checked} onchange="changeTask(event,${i})"/>
        <span>${task.name}</span>
        <div class="left">
           <button class="btn btn-sm" onclick="deleteTask(${i})">${taskIco}</button>
        </div>
      </li>
   `);
}

// para saber si esta checkeada la tarea 
function changeTask(event, i){ 
todoItems[i].isSelected = event.target.checked;
if(!todoItems[i].isSelected){
devolver(i);
}
updateDone();
deleteTask();
}

// elimina la tarea (objeto)
function deleteTask(index){
		todoItems.splice(index, 1);
    updateUI();
}
function deleteDone(index){
		doneItems.splice(index, 1);
    updateDone();
}

// agrega un objeto a la lista de objetos 
function addTask(){
	const input = document.querySelector('#input-task');
  if(input.value == ''){
  	return;
  }
  const task = {
     name : input.value,
     isSelected: false
  };
  todoItems.push(task);
  input.value = '';
  
  doneItems.push(task);
  
  updateUI();
}

// muestra graficamente una tarea checkeada
function paintDone(task, i){
	const contCompleto = document.querySelector('.completas');
  const checked1 = task.isSelected ? 'checked' : '';
  contCompleto.insertAdjacentHTML ('beforeend', `
      <li class="list-item list-group-item ${checked1} text-danger"> 
       <input type="checkbox" ${checked1} onchange="changeTask(event,${i})"/>
        <span>${task.name}</span>
        <div class="left">
           <button class="btn btn-sm" onclick="deleteDone(${i})">${doneIco}</button>
        </div>
      </li>
   `);
}
 //actualiza la interfaz de la tarea checkeada 
function updateDone(){
  const contCompleto = document.querySelector('.completas');
  contCompleto.innerHTML = '';
  doneItems.forEach( (task, i) => {
    paintDone(task, i);
  })
}
function devolver(i){

todoItems[i]=doneItems[i];
updateUI();
}
