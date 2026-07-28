const todos = []
const todoDivList = document.querySelector('#todoListDiv')
const addButton = document.querySelector('#addButton')
const todoInput = document.querySelector('#todoInput')

function render(){
    todoDivList.innerHTML = ""
    todos.forEach((t)=>{
        const todoParagraph = document.createElement("p");
        todoParagraph.textContent = t;
        todoDivList.appendChild(todoParagraph);
    })
}

addButton.addEventListener('click', ()=>{
    const todoValue = todoInput.value
    todos.push(todoValue)
    render()
    todoInput.value = ""
})