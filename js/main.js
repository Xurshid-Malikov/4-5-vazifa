let elForm = document.querySelector(".js-form");
let elInput = document.querySelector(".js-input");
let elList = document.querySelector(".js-list");
let elAll = document.querySelector(".js-all");
let elComplet = document.querySelector(".js-complet");
let elUncom = document.querySelector(".js-uncom");


let todos = [];

let renderTodo = (array, node) => {

  let a = 0
  let b = 0
  
  array.forEach(element => {
    let newItem = document.createElement("li");
    let newSpan = document.createElement("span");
    let newButton = document.createElement("button");
    let newCheckbox = document.createElement("input");

    newSpan.textContent = element.name;
    newButton.textContent = "Delete"
    newButton.setAttribute("class", "delete-btn");
    newButton.dataset.todoId = element.id;
    newCheckbox.setAttribute("type", "checkbox");
    newCheckbox.setAttribute("class", "todo-check");
    newCheckbox.dataset.todoId = element.id;

    if (element.isComplete) {
      newSpan.style.textDecoration = "line-through"
      newCheckbox.checked = true;
      a = ++a;
    }
    else{
      b = ++b;
    }

    newItem.appendChild(newCheckbox);
    newItem.appendChild(newSpan);
    newItem.appendChild(newButton);
    node.appendChild(newItem);
  })
  elComplet.textContent = a;
  elUncom.textContent = b;
};

elList.addEventListener("click", function (evt) {
  if (evt.target.matches(".delete-btn")) {
    let deletedId = evt.target.dataset.todoId;
    elList.innerHTML = "";
    let findedIndex = todos.findIndex((todo) => todo.id == deletedId);
    todos.splice(findedIndex, 1);
      elAll.textContent = todos.length
      elUncom.textContent = todos.length
    renderTodo(todos, elList);
  } else if (evt.target.matches(".todo-check")) {
    let checkedId = evt.target.dataset.todoId;
    elList.innerHTML = "";
    let findedElement = todos.find((todo) => todo.id == checkedId)
    findedElement.isComplete = !findedElement.isComplete;
    renderTodo(todos, elList);
  }
})

elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  elList.innerHTML = "";
  let elInputVal = elInput.value;

    elAll.textContent = todos.length + 1
    elUncom.textContent = todos.length + 1

  let obj = {
    id: todos.length ? todos[todos.length - 1].id + 1 : 0,
    name: elInputVal,
    isComplete: false
  }
  todos.push(obj)
  renderTodo(todos, elList);
  elInput.value = "";
})