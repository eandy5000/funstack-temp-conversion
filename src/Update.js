import * as R from "ramda";

const MSG = {
  LEFT_VALUE: "LEFT_VALUE",
  RIGHT_VALUE: "RIGHT_VALUE",
  LEFT_UNIT: "LEFT_UNIT",
  RIGHT_UNIT: "RIGHT_UNIT"
};

export function rightUnitMsg(rightUnit) {
  return {
    type: MSG.RIGHT_UNIT,
    rightUnit
  };
}

export function leftUnitMsg(leftUnit) {
  return {
    type: MSG.LEFT_UNIT,
    leftUnit
  };
}

export function leftValueMsg(leftValue) {
  return {
    type: MSG.LEFT_VALUE,
    leftValue
  };
}

export function rightValueMsg(rightValue) {
  return {
    type: MSG.RIGHT_VALUE,
    rightValue
  };
}

export default function update(msg, model) {
  const { leftValue, rightValue, leftUnit, rightUnit } = msg;
  switch (msg.type) {
    case MSG.LEFT_VALUE:
      return {
        ...model,
        leftValue: validValue(leftValue),
        sourceLeft: true,
        rightValue: unitConverter(leftValue, model.rightUnit)
      };
    case MSG.RIGHT_VALUE:
      return {
        ...model,
        rightValue: validValue(rightValue),
        sourceLeft: false,
        leftValue: unitConverter(rightValue, model.leftUnit)
      };
    case MSG.LEFT_UNIT:
      return {
        ...model,
        leftUnit,
        sourceLeft: true,
        leftValue: unitConverter(model.leftValue, leftUnit)
      };
    case MSG.RIGHT_UNIT:
      return {
        ...model,
        rightUnit,
        sourceLeft: false,
        rightValue: unitConverter(model.rightValue, rightUnit)
      };
    default:
      return model;
  }
}

// conversion functions
function unitConverter(temp, convertTo) {
  const converted = R.pipe(validValue)(temp);
  console.log(convertTo);
  if (convertTo === "Celsius") {
    return FtoC(converted);
  } else if (convertTo === "Fahrenheit") {
    return CtoF(converted);
  }
  return converted;
}

function FtoC(temp) {
  return 5 / 9 * (temp - 32);
}

function CtoF(temp) {
  return 9 / 5 * temp + 32;
}

// validation

function validValue(input) {
  return R.pipe(parseInt, R.defaultTo(0))(input);
}
