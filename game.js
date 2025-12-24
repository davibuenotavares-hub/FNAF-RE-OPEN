let energy = 100;
let doorClosed = false;
let windowClosed = false;
let camsOpen = false;
let springPos = "cam";
let alive = true;

const powerTxt = document.getElementById("power");
const door = document.getElementById("door");
const springWindow = document.getElementById("spring-window");
const cams = document.getElementById("cams");
const jumpscare = document.getElementById("jumpscare");
const gameover = document.getElementById("gameover");

// Energia
setInterval(() => {
  if (!alive) return;

  let drain = 0;
  if (doorClosed) drain += 0.15;
  if (windowClosed) drain += 0.15;
  if (camsOpen) drain += 0.2;

  energy -= drain;
  if (energy < 0) energy = 0;

  powerTxt.textContent = Math.floor(energy);

  if (energy <= 0) {
    attack();
  }
}, 500);

// IA Springbonnie
setInterval(() => {
  if (!alive) return;

  const r = Math.random();

  if (r < 0.4) springPos = "cam";
  else if (r < 0.7) springPos = "window";
  else springPos = "door";

  springWindow.style.display = springPos === "window" ? "block" : "none";

  if (springPos === "door" && !doorClosed) attack();
  if (springPos === "window" && !windowClosed) attack();

}, 3000);

// Controles
function toggleDoor() {
  doorClosed = !doorClosed;
  door.classList.toggle("closed");
}

function toggleWindow() {
  windowClosed = !windowClosed;
}

function toggleCams() {
  camsOpen = !camsOpen;
  cams.style.display = camsOpen ? "block" : "none";
}

// Jumpscare
function attack() {
  if (!alive) return;
  alive = false;

  jumpscare.style.display = "block";

  setTimeout(() => {
    jumpscare.style.display = "none";
    gameover.style.display = "flex";
  }, 1500);
}
