/*******************************************************************************
 * THE ULTIMATE DOM MANIPULATION & STATE CHEATSHEET
 * Purpose: Reference guide for teaching beginners (The Good vs. The Bad)
 *******************************************************************************/

// =============================================================================
// 1. SELECTING ELEMENTS (The Search Party)
// =============================================================================

// Modern & Flexible (Uses CSS Selectors)
const singleElement = document.querySelector('.class-name');  // Returns the FIRST matching element or null
const allElements   = document.querySelectorAll('li.item');   // Returns a static NodeList (You can use .forEach() on it)

// Traditional & Specific (Older but highly optimized)
const elementById   = document.getElementById('submit-btn');  // Returns single element (No '#' needed)
const elementsByClass= document.getElementsByClassName('item');// Returns a live HTMLCollection (No .forEach() directly!)
const elementsByTag = document.getElementsByTagName('p');     // Returns a live HTMLCollection of all <p> tags


// =============================================================================
// 2. CREATING, MODIFYING, AND APPENDING (The Construction Site)
// =============================================================================

// A. Creating Elements (In Memory)
const newTodoItem = document.createElement('li'); // Creates <li></li> but doesn't show it on screen yet

// B. Modifying Content & Attributes
newTodoItem.textContent = "Buy some coffee ☕";   // SAFE: Strictly handles text, escapes HTML characters
// newTodoItem.innerHTML = "<b>Buy coffee</b>";   // UNSAFE: Parses string as HTML. Avoid with user input!
newTodoItem.classList.add('todo-item', 'active'); // Easily manage CSS classes (.remove() and .toggle() also work)
newTodoItem.setAttribute('data-id', '12345');     // Set custom attributes

// C. Appending / Placing Elements on the Page
const todoListContainer = document.querySelector('#todo-list');

todoListContainer.appendChild(newTodoItem);       // Puts it at the VERY END of the container. Accepts 1 Node only.
// todoListContainer.prepend(newTodoItem);        // Puts it at the VERY START of the container.
// todoListContainer.append(newTodoItem, "Text"); // Modern alternative: Appends multiple elements or raw strings.

// D. Removing Elements
// newTodoItem.remove();                          // Modern: Removes itself directly from the DOM
// todoListContainer.removeChild(newTodoItem);    // Older approach: Parent discards the child element


// =============================================================================
// 3. THE ANTI-PATTERN: "THE BAD WAY" (DOM-Driven / Spaghetti Code)
// =============================================================================
/**
 * CRITIQUE:
 * - The DOM is treating the screen as the database.
 * - Massive Security Vulnerability: Using `innerHTML` allows Cross-Site Scripting (XSS).
 * - Performance Nightmare: `innerHTML +=` destroys and recreates all inner DOM nodes on every update.
 * - Unscalable: Hard to track data, count items, or sync with databases/localStorage.
 */

const badInput = document.querySelector('#bad-input');
const badList = document.querySelector('#bad-list');
const badBtn = document.querySelector('#bad-btn');

if (badBtn) {
    badBtn.addEventListener('click', () => {
        // DANGER: Injecting raw input via innerHTML allows script injections!
        // DANGER: Inline 'onclick' attribute couples HTML structure tightly to JS scope.
        badList.innerHTML += `
            <li>
                ${badInput.value} 
                <button onclick="this.parentElement.remove()">Delete</button>
            </li>
        `;
        badInput.value = '';
    });
}


// =============================================================================
// 4. THE BEST PRACTICE: "THE GOOD WAY" (State-Driven UI)
// =============================================================================
/**
 * BENEFITS:
 * - Single Source of Truth: Data lives cleanly in a JavaScript array/object (State).
 * - Secure: `textContent` completely ensures user input is parsed safely as pure string.
 * - Maintainable: Easily add features (sorting, filtering, counting, localStorage).
 * - Architectural Foundation: This mimics how React, Vue, and Angular handle rendering.
 */

// A. The State (The ultimate data source)
let todoState = [
    { id: 1, text: "Learn DOM basics", completed: false },
    { id: 2, text: "Stop using innerHTML blindly", completed: true }
];

// B. DOM Elements
const goodInput = document.querySelector('#good-input');
const goodList = document.querySelector('#good-list');
const goodBtn = document.querySelector('#good-btn');

// C. The Render Engine (Draws the UI based entirely on State)
function renderTodos() {
    if (!goodList) return;
    
    // 1. Wipe the container clean safely before redraw
    goodList.innerHTML = ''; 

    // 2. Loop through state and dynamically build elements
    todoState.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo.text; 
        
        if (todo.completed) {
            li.style.textDecoration = 'line-through';
        }

        // Create the delete button programmatically
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        
        // Scope variables cleanly inside an event listener closure
        deleteBtn.addEventListener('click', () => {
            deleteTodo(todo.id);
        });

        // Assemble and append to DOM
        li.appendChild(deleteBtn);
        goodList.appendChild(li);
    });
}

// D. State Mutation Functions (Modify data first, then trigger render)
function addTodo() {
    if (!goodInput || !goodInput.value.trim()) return;

    // Push new plain object into data state
    todoState.push({
        id: Date.now(), // Unique identifier
        text: goodInput.value.trim(),
        completed: false
    });

    goodInput.value = ''; // Reset form field
    renderTodos();        // Re-render the UI to match state
}

function deleteTodo(id) {
    // Filter the item out of our data array
    todoState = todoState.filter(todo => todo.id !== id);
    renderTodos();        // Re-render the UI to match state
}

// E. Initialize App Event Listeners
if (goodBtn) {
    goodBtn.addEventListener('click', addTodo);
}

// Run initial render to display default items
renderTodos();