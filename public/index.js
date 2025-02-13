import { createNavigator } from "./navigator.js";
import { generateTodo } from "./todo.js";
import { createLogin } from "./login.js";
import { carousel } from "./carousel.js";
import {createPubSub} from "./pubsub.js"

const pages = document.querySelector("#pages");
const tableDiv = document.querySelector("#table");

const navigator = createNavigator(pages);
const table = generateTodo(tableDiv);
const loginComponent = createLogin();
const pubsub = createPubSub();
const carouselComponent = carousel(document.getElementById("carosello"), pubsub);

carouselComponent.build([{id:1, url:"/files/Screenshot 2025-02-12 164341.png"},{id:2, url:"/files/Screenshot 2025-02-12 164352.png"}])
carouselComponent.render();