import initModel from "./Model";
// import update from './Update';
import view from "./View";
// import app from './App';
import createElement from "virtual-dom/create-element";

const node = document.getElementById("app");

let rootNode = createElement(view(initModel));

node.appendChild(rootNode);
