

export const generateTodo = function (parentElement,pubsub) {
    let data = [];
    
    return {
      send: (todo) => {
        return new Promise((resolve, reject) => {
          fetch("/todo/add", {
            method: "POST",
  
            headers: {
              "Content-Type": "application/json",
            },
  
            body: JSON.stringify(todo),
          })
            .then((response) => response.json())
  
            .then((json) => {
              resolve(json); 
            });
        });
      },
  
      load: () => {
        return new Promise((resolve, reject) => {
          fetch("/todo")
            .then((response) => response.json())
  
            .then((json) => {
              resolve(json);
            });
        });
      },
  
  
      deleteTodo: (id) => {
        return new Promise((resolve, reject) => {
          fetch("/todo/" + id, {
            method: "DELETE",
  
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
  
            .then((json) => {
              resolve(json);
            });
        });
      },
  
      render: function () {
        pubsub.subscribe("reload",(d)=>{
      data=d;
      this.render();
        });
        let html = '<table class="table table-striped"><tbody>';
        data.forEach((e, index) => {
          let cssClass = e.completed ? "task-completed " : "";
          console.log(e.url);
          html +=
            "<tr class=" +
            cssClass +
            "table-row" +
            ">" +
            "<td>" +
            "<img src='"+
            e.url +
            "' alt='mere'></td>" +
            '<td><button type="button" class="btn btn-danger" id="' +
            index +
            '">DELETE</button></td>' +
            '<td><button type="button" class="btn btn-success" id="' +
            index +
            '">COMPLETED</button></td>' +
            "</tr>";
        });
        html += "</tbody></table>";
        console.log(html);
        parentElement.innerHTML = html;
        document.querySelectorAll("button.btn-danger").forEach((e, index) => {
          e.onclick = () => {
            this.deleteTodo(data[index].id).then(() => {
              this.load().then((r) => {
                this.setData(r.todos);
                pubsub.publish("imagesAdd",r);
                this.render();
              });
            });
          };
        });
      },
      setData: (newValue) => {
        data = newValue;
      },
    };
  };