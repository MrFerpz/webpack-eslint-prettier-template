import { Task } from "./index.js";

// This gives me a list of the buttons, which I can access with
// index [0], [1], [2]
let toDoButtonList = document.querySelectorAll(".to-do-button");

// And the same for the new entry containers 
let newEntryContainerList = document.querySelectorAll(".new-entries-container");

// Let's do something similar with the input fields - I could do the same but I want to experiment!
let toDoNameInput = document.querySelector("#to-do-name-input");
let toDoDescInput = document.querySelector("#to-do-desc-input");
let doingNameInput = document.querySelector("#doing-name-input");
let doingDescInput = document.querySelector("#doing-desc-input");
let doneNameInput = document.querySelector("#done-name-input");
let doneDescInput = document.querySelector("#done-desc-input");

// Making my own lists of the nodes
let nameInputList = [toDoNameInput, doingNameInput, doneNameInput];
let descInputList = [toDoDescInput, doingDescInput, doneDescInput];

// I want the addToList to add to a different container depending on its stage
function updateDOM(toDoLine, stage) {
    newEntryContainerList[stage].appendChild(toDoLine)
}

// Setting up event listeners for each button, corresponding to the correct container and answers
for (let i = 0; i < toDoButtonList.length; i++) {
    toDoButtonList[i].addEventListener("click", (event) => {

        // Make a new task using the user's input
        let toDo = new Task(nameInputList[i].value, descInputList[i].value, i);
        console.log(toDo);
        
        // Create a styled div with the evaluation as the text
        let toDoText = document.createElement("div");
        toDoText.setAttribute("class", "entry");
        toDoText.innerHTML = toDo.evaluation;

        // Make the movement buttons
        let leftBtn = document.createElement("button");
        leftBtn.setAttribute("class", "left-button");
        leftBtn.innerHTML = "<";

        let removeBtn = document.createElement("button");
        removeBtn.setAttribute("class", "remove-button");
        removeBtn.innerHTML = "x";

        let rightBtn = document.createElement("button");
        rightBtn.setAttribute("class", "right-button");
        rightBtn.innerHTML = ">";

        // Make a To Do Line container holding all the elements
        let toDoLine = document.createElement("div");
        toDoLine.appendChild(toDoText);
        toDoLine.appendChild(leftBtn);
        toDoLine.appendChild(removeBtn);
        toDoLine.appendChild(rightBtn);
        toDoLine.setAttribute("class", "to-do-line")

        // Button changes the stage and updates DOM
        rightBtn.addEventListener("click", () => {
            toDo.stageUp();
            updateDOM(toDoLine, toDo.stage)
        })   

        leftBtn.addEventListener("click", () => {
            toDo.stageDown();
            updateDOM(toDoLine, toDo.stage)
        })

        removeBtn.addEventListener("click", () => {
            toDoLine.remove();
            localStorage.removeItem('task_' + toDo.id);
        })

        event.preventDefault();

        localStorage.setItem("task_" + toDo.id, JSON.stringify(toDo));

        updateDOM(toDoLine, i)
        // Stop the page refreshing lol
    })}