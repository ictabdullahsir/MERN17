const addButton = document.querySelector("#addButton");
const todoInput = document.querySelector("#todoInput");
const todoListDiv = document.querySelector("#todoListDiv");

addButton.addEventListener("click", function() {
    
    const todoParagraph = document.createElement("p");
    todoParagraph.textContent = todoInput.value;

    todoListDiv.appendChild(todoParagraph);
})