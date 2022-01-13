const redSlider = document.querySelector("#red");
const greenSlider = document.querySelector("#green");
const blueSlider = document.querySelector("#blue");
const elementWhosBckIsToChange = document.body;
const elementToShowActualColorData = document.querySelector(
  "#containerToShowColorCode"
);
const headerMain = document.querySelector("#headerMain");

const buttonColorRed = document.querySelector("#buttonRed");
const buttonColorGreen = document.querySelector("#buttonGreen");
const buttonColorBlue = document.querySelector("#buttonBlue");
const buttonColorRandom = document.querySelector("#buttonRandom");

let state = {
  redRgbValue: 50,
  greenRgbValue: 50,
  blueRgbValue: 50,
  colorHexaDezimal: "",
};

//let colorHexaDezimal;

function updateDataState() {
  state.redRgbValue = redSlider.value;
  state.greenRgbValue = greenSlider.value;
  state.blueRgbValue = blueSlider.value;

  state.colorHexaDezimal = convertColorRgbToHexa(
    state.redRgbValue,
    state.greenRgbValue,
    state.blueRgbValue
  );
}

function setToThisColor(color) {
  //alert("Farbe: " + color);
  switch (color) {
    case "red":
      redSlider.value = 255;
      greenSlider.value = 0;
      blueSlider.value = 0;
      break;
    case "green":
      redSlider.value = 0;
      greenSlider.value = 255;
      blueSlider.value = 0;
      break;
    case "blue":
      redSlider.value = 0;
      greenSlider.value = 0;
      blueSlider.value = 255;
      break;
    case "random":
      break;
  }
}

function getRandomColorsFromApi() {
  let randomColors = [];
  const p = fetch("https://dummy-apis.netlify.app/api/color");
  let p2 = p.then((antwort) => {
    //console.log(antwort.status); // 200
    //console.log(antwort.ok); // true
    if (antwort.ok) {
      return antwort.json(); // returns a promise with the actual resource
    }
  });

  p2.then((data) => {
    //console.log("rot: " + data.rgb.r);

    randomColors.push(data.rgb.r);
    randomColors.push(data.rgb.g);
    randomColors.push(data.rgb.b);

    handleButtonRandomColorEvent(
      randomColors[0],
      randomColors[1],
      randomColors[2]
    );
  });
}

function convertColorRgbToHexa(r, g, b) {
  r = Number(r).toString(16);
  g = Number(g).toString(16);
  b = Number(b).toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return "#" + r + g + b;
}

function renderFrontend() {
  elementToShowActualColorData.innerText = state.colorHexaDezimal;
  // set range-field to actual value
  redSlider.value = state.redRgbValue;
  greenSlider.value = state.greenRgbValue;
  blueSlider.value = state.blueRgbValue;

  elementWhosBckIsToChange.style.backgroundColor = state.colorHexaDezimal;
}

function handleInputEvent(red, green, blue) {
  // update state
  updateDataState(red, green, blue);
  // render frontend, on basis of state
  renderFrontend();
}
function handleButtonRandomColorEvent(red, green, blue) {
  state.redRgbValue = red;
  state.greenRgbValue = green;
  state.blueRgbValue = blue;

  state.colorHexaDezimal = convertColorRgbToHexa(
    state.redRgbValue,
    state.greenRgbValue,
    state.blueRgbValue
  );

  renderFrontend();
}

function handleButtonClickEvent(buttonColorValue) {
  setToThisColor(buttonColorValue);
  updateDataState();
  renderFrontend();
}

headerMain.addEventListener("input", handleInputEvent);
//headerMain.addEventListener("range", handleInputEvent);

buttonColorRed.addEventListener("click", function (e) {
  handleButtonClickEvent(buttonColorRed.value);
});
buttonColorGreen.addEventListener("click", function (e) {
  handleButtonClickEvent(buttonColorGreen.value);
});
buttonColorBlue.addEventListener("click", function (e) {
  handleButtonClickEvent(buttonColorBlue.value);
});
buttonColorRandom.addEventListener("click", function (e) {
  getRandomColorsFromApi();
});

let theButtons = document.querySelectorAll(".changeColorButton");

window.onload = function () {
  handleInputEvent();
};
