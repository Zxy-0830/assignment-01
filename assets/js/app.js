'use strict';
const { log } = console;

const clockEl = document.getElementById("clock"),
      alarmForm = document.getElementById("alarm-form"),
      alarmHourInput = document.getElementById("alarm-hour"),
      alarmMinuteInput = document.getElementById("alarm-minute"),
      alarmStatus = document.getElementById("alarm-status"),
      alarmTimeEl = document.getElementById("alarm-time"),
      alarmAudio = document.getElementById("alarm-audio");

// Store alarm time in minutes; null means no alarm is set
let alarmTime = null;

// Update the clock every second and check the alarm
setInterval(() => {
  const now = new Date();
  const hh = now.getHours(), mm = now.getMinutes();
  clockEl.textContent = `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
  
  if (alarmTime !== null && (hh * 60 + mm) === alarmTime) {
    alarmAudio.play();
    alarmTime = null;
    alarmStatus.classList.add("hidden");
  }
}, 1000);

// Handle alarm form submission
alarmForm.addEventListener("submit", e => {
  e.preventDefault();
  const h = parseInt(alarmHourInput.value, 10),
        m = parseInt(alarmMinuteInput.value, 10);

  if (isNaN(h) || h < 0 || h > 23 || isNaN(m) || m < 0 || m > 59) {
    alert("Please enter a valid hour (0-23) and minute (0-59)!");
    return;
  }
  alarmTime = h * 60 + m;
  alarmStatus.classList.remove("hidden");
  alarmTimeEl.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
});
