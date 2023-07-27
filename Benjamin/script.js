let timerInterval;
let startTime = 0;
let elapsedTime = 0;
let isTimerRunning = false;

function formatTime(timeInSeconds) {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function updateTimer() {
  const currentTime = Math.floor((Date.now() - startTime) / 1000) + elapsedTime;
  document.getElementById("timer").textContent = formatTime(currentTime);
}

function startTimer() {
  if (!isTimerRunning) {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
    isTimerRunning = true;
    document.getElementById("startBtn").disabled = true;
    document.getElementById("stopBtn").disabled = false;
    document.getElementById("continueBtn").disabled = true;
  }
}

function stopTimer() {
  if (isTimerRunning) {
    clearInterval(timerInterval);
    elapsedTime += Math.floor((Date.now() - startTime) / 1000);
    isTimerRunning = false;
    document.getElementById("startBtn").disabled = true;
    document.getElementById("stopBtn").disabled = true;
    document.getElementById("continueBtn").disabled = false;
  }
}

function continueTimer() {
  if (!isTimerRunning) {
    startTime = Date.now() - (elapsedTime * 1000);
    timerInterval = setInterval(updateTimer, 1000);
    isTimerRunning = true;
    document.getElementById("startBtn").disabled = true;
    document.getElementById("stopBtn").disabled = false;
    document.getElementById("continueBtn").disabled = true;
  }
}

function resetTimer() {
  stopTimer();
  elapsedTime = 0;
  document.getElementById("timer").textContent = formatTime(elapsedTime);
  document.getElementById("startBtn").disabled = false;
  document.getElementById("continueBtn").disabled = true;
}

function suggestAction(action) {
  stopTimer();
  if (action === "tired") {
    document.getElementById("result").textContent = "Benjamin It's okay to take a break and get some rest. You can continue coding later.";
  } else if (action === "coding") {
    document.getElementById("result").textContent = "Great! Keep up the good work and keep coding! Benjamin";
  }
}

document.getElementById("startBtn").addEventListener("click", startTimer);
document.getElementById("stopBtn").addEventListener("click", stopTimer);
document.getElementById("continueBtn").addEventListener("click", continueTimer);
document.getElementById("resetBtn").addEventListener("click", resetTimer);

function askTiredOrCoding() {
  const response = prompt("Are you tired? (yes/no)").toLowerCase();

  if (response === "yes") {
    suggestAction("tired");
  } else if (response === "no") {
    suggestAction("coding");
  } else {
    console.log("Invalid response. Please answer with 'yes' or 'no'.");
  }
}

askTiredOrCoding();
