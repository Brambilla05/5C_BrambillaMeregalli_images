import { createNavigator } from "./navigator.js";
import { generateTodo } from "./todo.js";
import { createLogin } from "./login.js";
import { carousel } from "./carousel.js";
import {createPubSub} from "./pubsub.js"
import {uploadFile} from "./upload.js";


const pages = document.querySelector("#pages");
const tableDiv = document.querySelector("#tb");
const submit=document.getElementById("submit");

const navigator = createNavigator(pages);
const loginComponent = createLogin();
const pubsub = createPubSub();
const carouselComponent = carousel(document.getElementById("carosello"), pubsub);
const table = generateTodo(tableDiv,pubsub);
table.render();
const upload= uploadFile(document.getElementById("todoInput"), pubsub)


carouselComponent.build([{id:1, url:"/files/Screenshot 2025-02-12 164341.png.jpg"},{id:2, url:"/files/Screenshot 2025-02-12 164352.png.jpg"}])
carouselComponent.render();
upload.build([{id:1, url:"/files/Screenshot 2025-02-12 164341.png.jpg"},{id:2, url:"/files/Screenshot 2025-02-12 164352.png.jpg"}]);

submit.onclick=()=>{
    upload.handleSubmit(document.getElementById("todoInput"));

}
upload.render();