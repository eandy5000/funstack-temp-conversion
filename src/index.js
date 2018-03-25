import initModel from "./Model";
import update from "./Update";
import view from "./View";
// import app from './App';
import { diff, patch } from "virtual-dom";
import createElement from "virtual-dom/create-element";

const node = document.getElementById("app");

function app(model, update, view, node) {
  let currentModel = model;
  let currentView = view(currentModel, dispatch);
  let rootNode = createElement(currentView);
  node.appendChild(rootNode);
  function dispatch(msg) {
    currentModel = update(msg, currentModel);
    const updatedView = view(currentModel, dispatch);
    const patches = diff(currentView, updatedView);
    rootNode = patch(rootNode, patches);
    currentView = updatedView;
  }
}
app(initModel, update, view, node);
