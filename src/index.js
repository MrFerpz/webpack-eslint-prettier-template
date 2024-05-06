import "./style.css";
import "./domstuff.js";

class Task {
    constructor(name, description, stage) {
        this.name = name;
        this.description = description;
        this.stage = stage;
        this.id = Task.nextId++;
    }

    get evaluation() {
        return `<b>Task</b><br> ${this.name} <br> <b>Description</b><br> ${this.description}`
    }

    stageUp() {
        this.stage++
    }

    stageDown() {
        this.stage--
    }
}

Task.nextId = 1;

export { Task }