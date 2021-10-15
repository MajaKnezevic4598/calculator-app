const switchTheme = document.querySelectorAll(".change-theme>div");
const theme1 = document.getElementById("theme-1");
const theme2 = document.getElementById("theme-2");
const theme3 = document.getElementById("theme-3");
const body = document.querySelector("body");

//display1 showing history
const display1 = document.querySelector(".display-1");
//diplay2 - end result
const display2 = document.querySelector(".display-2");
//temp result
const tempResult = document.querySelector(".temp-result");
const numberButtons = document.querySelectorAll(".numbers");
const operationButtons = document.querySelectorAll(".operation");
const equal = document.querySelector(".equal");
console.log(numberButtons);
const reset = document.querySelector(".reset");
const del = document.querySelector(".del");

let activeTheme = localStorage.getItem("theme");
console.log(activeTheme);

function activeTheme1() {
  theme1.classList.add("theme1");
  theme2.classList.remove("theme2");
  theme3.classList.remove("theme3");
  body.className = "theme-1";
  localStorage.setItem("theme", "theme-1");
}

function activeTheme2() {
  theme2.classList.add("theme2");
  theme1.classList.remove("theme1");
  theme3.classList.remove("theme3");
  body.className = "theme-2";
  localStorage.setItem("theme", "theme-2");
}

function activeTheme3() {
  theme3.classList.add("theme3");
  theme2.classList.remove("theme2");
  theme1.classList.remove("theme1");
  body.className = "theme-3";
  localStorage.setItem("theme", "theme-3");
}

if (activeTheme === "theme-1") {
  activeTheme1();
} else if (activeTheme === "theme-2") {
  activeTheme2();
} else if (activeTheme === "theme-3") {
  activeTheme3();
}

theme1.addEventListener("click", () => {
  activeTheme = localStorage.getItem("theme");
  if (
    activeTheme === "theme-3" ||
    activeTheme === "theme-2" ||
    activeTheme === "theme-1"
  ) {
    activeTheme1();
  }
});

theme2.addEventListener("click", () => {
  activeTheme = localStorage.getItem("theme");
  if (
    activeTheme === "theme-3" ||
    activeTheme === "theme-2" ||
    activeTheme === "theme-1"
  ) {
    activeTheme2();
  }
});
theme3.addEventListener("click", () => {
  activeTheme = localStorage.getItem("theme");
  if (
    activeTheme === "theme-3" ||
    activeTheme === "theme-2" ||
    activeTheme === "theme-1"
  ) {
    activeTheme3();
  }
});

let dis1Num = "";
let dis2Num = "";
let result = null;
let lastOperation = "";
let haveDot = false;

numberButtons.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === "." && haveDot) {
      return;
    }
    dis2Num += e.target.innerText;
    display2.innerText = dis2Num;
  });
});

operationButtons.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    //prvo proveravamo da li imamo broj nad kojim treba da napravimo operaciju
    if (!dis2Num) return;
    haveDot = false;
    console.log(e.currentTarget);
    const operationName = e.currentTarget.innerText;
    console.log(operationName);
    if (dis1Num && dis2Num && lastOperation) {
      mathOperation();
    } else {
      result = parseFloat(dis2Num);
    }
    console.log(result);
    clearVar(operationName);
    lastOperation = operationName;
  });
});

function clearVar(name = "") {
  dis1Num += dis2Num + " " + name + " ";
  display1.innerText = dis1Num;
  display2.innerText = "";
  dis2Num = "";
  tempResult.innerText = result;
}

function mathOperation() {
  if (lastOperation === "X") {
    result = parseFloat(result) * parseFloat(dis2Num);
  } else if (lastOperation === "+") {
    result = parseFloat(result) + parseFloat(dis2Num);
  } else if (lastOperation === "-") {
    result = parseFloat(result) - parseFloat(dis2Num);
  } else if (lastOperation === "/") {
    result = (parseFloat(result) / parseFloat(dis2Num)).toFixed(2);
  }
}

equal.addEventListener("click", function (e) {
  if (!dis1Num && !dis2Num) return;
  haveDot = false;
  mathOperation();
  clearVar();
  display2.innerText = result;
  tempResult.innerText = "";
  dis2Num = result;
  dis1Num = "";
});

reset.addEventListener("click", function (e) {
  display1.innerText = "0";
  display2.innerText = "0";
  tempResult.innerText = "0";
  dis1Num = "";
  dis2Num = "";
  result = null;
});

del.addEventListener("click", deleteLastNumber);

function deleteLastNumber() {
  let str = display2.textContent;
  console.log(str);

  if (str.length == 1) {
    str = "0";
    display2.textContent = str;
    dis2Num = "";
  } else if (str.length > 1) {
    let newString = str.slice(0, -1);
    display2.textContent = newString;
    dis2Num = newString;
  }
}
