let calculatedVal = document.getElementById("integrated-value");
let mpform = document.getElementById("mpint");
let tpform = document.getElementById("tpint");
let spform = document.getElementById("spint");
let currentPage = window.location.pathname;

function setFinalValue(mpResult) {
  let valueText = calculatedVal.innerText.split(":");
  calculatedVal.innerText = `${valueText[0]}: ${mpResult}`;
}
if (currentPage.includes("midpoint.html")) {
  mpform.addEventListener("submit", (e) => {
   
    e.preventDefault();

    let numbers = new FormData(e.target);

    let formVars = Object.fromEntries(numbers.entries());

    let equation = math.compile(formVars.userEquation);
    let lowerLimit = Number(formVars.lowerLimit);
    let upperLimit = Number(formVars.upperLimit);
    let subIntervals = Number(formVars.subIntervals);
    let negative = false;

    if (upperLimit <= lowerLimit) {
      negative = true;
      let temp = upperLimit;
      upperLimit = lowerLimit;
      lowerLimit = temp;
    }
  
    let h = (upperLimit - lowerLimit) / subIntervals;
    let left = lowerLimit;
    let right = lowerLimit + h;
    let eq = 0;
    while (left < upperLimit) {
      
      let currentMid = (left + right) / 2;

      let mpResult = h * eq;
      if (negative) {
        mpResult *= -1;
      }
      setFinalValue(mpResult);
    }
  });
}

if (currentPage.includes("trapz.html")) {
  tpform.addEventListener("submit", (e) => {
    e.preventDefault();
    let numbers = new FormData(e.target);
    let formVars = Object.fromEntries(numbers.entries());

    let equation = math.compile(formVars.userEquation);
    let upperLimit = Number(formVars.upperLimit);
    let lowerLimit = Number(formVars.lowerLimit);
    let subIntervals = Number(formVars.subIntervals);
    let negative = false;
    if (upperLimit <= lowerLimit) {
      negative = true;
      let temp = upperLimit;
      upperLimit = lowerLimit;
      lowerLimit = temp;
    }
    let point = lowerLimit;
    let eq = 0;
    let h = (upperLimit - lowerLimit) / subIntervals;

    while (point <= upperLimit) {
      if (point === lowerLimit || point === upperLimit) {
        eq += equation.evaluate({ x: point });
      } else {
        eq += 2 * equation.evaluate({ x: point });
      }
      point += h;
    }
    let tpResult = (h / 2) * eq;
    if (negative) {
      tpResult *= -1;
    }
    setFinalValue(tpResult);
  });
}

if (currentPage.includes("simps.html")) {
  spform.addEventListener("submit", (e) => {
    e.preventDefault();

    let numbers = new FormData(e.target);
    let formVars = Object.fromEntries(numbers.entries());

    let equation = math.compile(formVars.userEquation);
    let upperLimit = Number(formVars.upperLimit);
    let lowerLimit = Number(formVars.lowerLimit);
    let subIntervals = Number(formVars.subIntervals);
    let negative = false;
    console.log(negative);

    if (upperLimit <= lowerLimit) {
      negative = true;
      let temp = upperLimit;
      upperLimit = lowerLimit;
      lowerLimit = temp;
    }

    let h = (upperLimit - lowerLimit) / subIntervals;

    let point = lowerLimit;
    let eq = 0;
    let xPlace = 0;
    let xPlaceEven = false;
    while (point <= upperLimit) {
      if (xPlace % 2 === 0) {
        xPlaceEven = true;
      } else {
        xPlaceEven = false;
      }

      if (point === lowerLimit || point === upperLimit) {
        eq += equation.evaluate({ x: point });
      } else if (xPlaceEven) {
        eq += 2 * equation.evaluate({ x: point });
      } else if (!xPlaceEven) {
        eq += 4 * equation.evaluate({ x: point });
      }

      point += h;
      xPlace++;

      let spResult = (h / 3) * eq;
      if (negative) {
        spResult *= -1;
      }
      setFinalValue(spResult);
    }
  });
}

function homepage() {
  window.location.href = "index.html";
}

function integrate() {
  let queryString = window.URL();
  console.log(queryString);
}
