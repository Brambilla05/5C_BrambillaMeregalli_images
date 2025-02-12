import { createNavigator } from "./navigator.js";
import { generateTodo } from "./todo.js";
import { createLogin } from "./login.js";

const pages = document.querySelector("#pages");
const tableDiv = document.querySelector("#table");

const navigator = createNavigator(pages);
const table = generateTodo(tableDiv);
const loginComponent = createLogin();
