let audio = new Audio(chrome.runtime.getURL("music.mp3"));
let bgImg = chrome.runtime.getURL("img.jpg");

let keyCount = 0;
let max = 10;
let time = 3000;
let timer;
let isStop = false;
let randomQuote = "";

chrome.storage.local.get(["max", "time"], (result) => {
  if (result.max) max = result.max;
  if (result.time) time = result.time;
});

document.addEventListener("keydown", (event) => {
  if (isStop) return;
  keyCount++;

  if (keyCount === 1) {
    timer = setTimeout(() => {
      keyCount = 0;
    }, time);
  }

  if (keyCount > max) {
    showAlert();
    keyCount = 0;
    clearTimeout(timer);
  }
});

const modalStyle = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  background: `url("${bgImg}") no-repeat center/cover`,
  color: "#333",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "24px",
  textAlign: "center",
  zIndex: "999999999999999",
  borderRadius: "10px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
  fontWeight: "bold",
};
const inputFieldStyle = {
  marginTop: "20px",
  padding: "10px",
  fontSize: "18px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  width: "80%",
  maxWidth: "400px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  fontWeight: "regular",
};

const modal = document.createElement("div");
const inputField = document.createElement("input");
function showAlert() {
  start();
}

function start() {
  isStop = true;
  setInputsReadOnly();
  document.body.style.overflow = "hidden";

  const quotes = [
    "당신은 할 수 있습니다!",
    "모든 것은 지나갑니다.",
    "편안하게 숨을 쉬세요.",
    "당신은 소중한 존재입니다.",
    "지금 이 순간을 즐기세요.",
  ];
  randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  modal.innerText = randomQuote;
  modal.appendChild(inputField);
  inputField.placeholder = "위의 글귀를 입력하세요";
  Object.assign(inputField.style, inputFieldStyle);

  inputField.addEventListener("input", () => {
    if (inputField.value === randomQuote) {
      remove();
    } else if (inputField.value.length > randomQuote.length) {
      alert("글귀가 일치하지 않습니다. 다시 시도하세요.");
      inputField.value = "";
    }
  });

  Object.assign(modal.style, modalStyle);
  document.body.appendChild(modal);
  if (audio) audio.play();
  inputField.focus();
}

function remove() {
  isStop = false;
  removeInputsReadOnly();
  document.body.style.overflow = "auto";

  if (document.body) document.body.removeChild(modal);
  if (audio) audio.pause();
}

function setInputsReadOnly() {
  const inputs = document.querySelectorAll("input");
  const textareas = document.querySelectorAll("textarea");

  inputs.forEach((input) => {
    input.readOnly = true;
  });
  textareas.forEach((textarea) => {
    textarea.readOnly = true;
  });
}

function removeInputsReadOnly() {
  const inputs = document.querySelectorAll("input");
  const textareas = document.querySelectorAll("textarea");

  inputs.forEach((input) => {
    input.readOnly = false;
  });
  textareas.forEach((textarea) => {
    textarea.readOnly = false;
  });
}
