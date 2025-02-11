let todos = [];
const todoInput = document.getElementById("todoInput");
const insertButton = document.getElementById("submit");
const parentElement = document.getElementById("tb");
const render = () => {
    console.log(todos);
    let html = "";
    html += ""
    console.log(html)
    
    parentElement.innerHTML = html;
    console.log(document.querySelectorAll(".btn-outline-success"));
    document.querySelectorAll(".btn-outline-success").forEach((button, index) => {
        button.onclick = () => {
            completeTodo(todos[index]).then(() => {
                load().then((json) => {
                    todos = json.todos;
                    render();
                });
            });
        }
    })
    
    document.querySelectorAll(".btn-outline-danger").forEach((button, index) => {
        button.onclick = () => {
            deleteTodo(todos[index].id).then(() => {
                load().then((json) => {
                    todos = json.todos;
                    render();
                });
            });
        }
    });
}

const send = (todo) => {
    return new Promise((resolve, reject) => {
        fetch("/add", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(todo)
        })
            .then((response) => response.json())
            .then((json) => {
                resolve(json);
            })
    })
}

const load = () => {
    return new Promise((resolve, reject) => {
        fetch("/get")
            .then((response) => response.json())
            .then((json) => {
                resolve(json);
            })
    })
}

insertButton.onclick = () => {
    const todo = {
        name: todoInput.value,
        completed: false
    }
    send({ todo: todo })
        .then(() => load())
        .then((json) => {
            todos = json.todos;
            todoInput.value = "";
            render();
        });
}

load().then((json) => {
    todos = json.todos;
    render();
});


const deleteTodo = (id) => {
    return new Promise((resolve, reject) => {
        fetch("/delete/" + id, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"

            },
        })
            .then((response) => response.json())
            .then((json) => {
                resolve(json);
            })
    })
}

setInterval(() => {
    load().then((json) => {
        todos = json.todos;
        todoInput.value = "";
        render();
    });
}, 30000);