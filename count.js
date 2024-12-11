let timer = document.querySelector(".timer");
let selectTime = document.querySelector(".select-time");
let time = document.querySelector(".time");
let startTime = document.querySelector("#start-time");
let restart = document.querySelector("#restart");
const hoursDropdown = document.getElementById("hours");
const minutesDropdown = document.getElementById("min");
const secondsDropdown = document.getElementById("sec");

let isRunning = false;
let interval;
let totalSeconds = 0;

function startTimer() {
  interval = setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;
      updateTimerDisplay();
    } else {
      clearInterval(interval);
      isRunning = false;
      startTime.innerHTML = '<i class="fa-solid fa-play"></i>';
      restart.style.opacity = "1";
      restart.style.pointerEvents = "auto";
      alert("Time's up!");
      resetDropdowns();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  timer.innerText = `${hrs.toString().padStart(2, "0")} : ${mins
    .toString()
    .padStart(2, "0")} : ${secs.toString().padStart(2, "0")}`;
}

function resetDropdowns() {
  hoursDropdown.value = "00";
  minutesDropdown.value = "00";
  secondsDropdown.value = "00";
}

startTime.addEventListener("click", () => {
  if (!isRunning) {
    const hours = parseInt(hoursDropdown.value) || 0;
    const minutes = parseInt(minutesDropdown.value) || 0;
    const seconds = parseInt(secondsDropdown.value) || 0;

    if (totalSeconds === 0) {
      totalSeconds = hours * 3600 + minutes * 60 + seconds;
    }

    isRunning = true;
    startTimer();
    startTime.innerHTML = '<i class="fa-solid fa-pause"></i>';
    restart.style.opacity = "0.5";
    restart.style.pointerEvents = "none";
  } else {
    clearInterval(interval);
    isRunning = false;
    startTime.innerHTML = '<i class="fa-solid fa-play"></i>';
    restart.style.opacity = "0.5";
    restart.style.pointerEvents = "none";
  }
});

restart.addEventListener("click", () => {
  if (!isRunning) {
    clearInterval(interval);
    totalSeconds = 0;
    isRunning = false;
    startTime.innerHTML = '<i class="fa-solid fa-play"></i>';
    timer.innerText = "00 : 00 : 00";
    resetDropdowns();
    restart.style.opacity = "1";
    restart.style.pointerEvents = "auto";
  }
});
