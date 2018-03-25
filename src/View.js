import * as R from "ramda";
import hh from "hyperscript-helpers";
import { h } from "virtual-dom";

const { div, pre, h1, select, option, input } = hh(h);

function view(model) {
  //constants
  const UNITS = ["Fahrenheit", "Celsius", "Kelvin"];

  // markup
  const header = div({ className: "tc" }, [
    h1({ className: "bb" }, "Temperature Unit Converter")
  ]);

  function converterMarkup(side) {
    const inputValue = side === "left" ? model.leftValue : model.rightValue;
    const selectValue = side === "left" ? model.leftUnit : model.rightUnit;
    return div({ className: "w-50", side }, [
      div(
        { className: "tc" },
        input({ oninput: e => console.log(e.target.value), value: inputValue })
      ),
      div(
        { className: "tc ma2" },
        select(
          { onchange: e => console.log(e.target.value) },
          unitOptions(selectValue)
        )
      )
    ]);
  }

  function unitOptions(selectValue) {
    return R.map(unit => {
      const selectedUnit = unit === selectValue;
      return option({ selected: selectedUnit }, unit);
    }, UNITS);
  }

  function bothSides() {
    return div({ className: "flex" }, [
      converterMarkup("left"),
      converterMarkup("right")
    ]);
  }

  //model view
  function seeModel() {
    return pre(JSON.stringify(model, null, 2));
  }

  //output
  function output() {
    return div([header, bothSides(), seeModel()]);
  }

  return output();
}

export default view;
