$workT = $("#session-length");
$breakT = $("#break-length");
$status = $("#status");

// Controls for Break Length
$("#break-decrement").click(function () {
  $status.text("Break!");
  if (+$breakT.text() > 1) {
    $breakT.text(+$breakT.text() - 1);
  }
});

$("#break-increment").click(function () {
  $status.text("Break!");
  $breakT.text(+$breakT.text() + 1);
});

// Controls for Session Length
$("#session-decrement").click(function () {
  $status.text("Work!");
  if (+$workT.text() > 1) {
    $workT.text(+$workT.text() - 1);
  }
});

$("#session-increment").click(function () {
  $status.text("Work!");
  $workT.text(+$workT.text() + 1);
});

var audio = new Audio("http://soundbible.com/grab.php?id=1377&type=mp3");

function beep() {
  audio.play();
}

function pad(val) {
  return ("00" + val).slice(-2);
}

var el = document.getElementById("time-left");

function updateDisplay(t) {
  var hours = Math.floor(t / 3600);
  t -= hours * 3600;
  var minutes = Math.floor(t / 60);
  t -= minutes * 60;
  var seconds = Math.floor(t);
  el.innerHTML = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
}

time = 0;
updateDisplay(time);
var running = true;
var tlast = new Date().getTime();

function update() {
  if (time <= 0.0) {
    // Already done
    return;
  }
  var tnow = new Date().getTime();
  var dt = (tnow - tlast) / 1000.0;
  tlast = tnow;
  time -= dt;
  if ($status.text() === "Work!") {
    totalTime = $workT.text() * 60;
    water = "rgba(25, 139, 201, 1)";
  }

  if ($status.text() === "Break!") {
    totalTime = $breakT.text() * 60;
    water = "#FF8633"; //brown light
  }

  fraction = 1 - time / totalTime;

  if (time <= 0.0) {
    //el.innerHTML = 'Finished';
    if ($status.text() === "Work!") {
      beep();
      $status.text("Break!");
      time = $breakT.text() * 60;
    } else {
      beep();
      $status.text("Work!");
      time = $workT.text() * 60;
    }
  }
  updateDisplay(time);
  if (running) {
    requestAnimationFrame(update);
  }
}

function run() {
  $status.text("Work!");
  if (time <= 0.0) {
    time = $workT.text() * 60;
  }
  tlast = new Date().getTime();
  running = true;
  requestAnimationFrame(update);
}

function pause() {
  running = false;
}

function stop() {
  running = false;
  time = 0;
  el.innerHTML = "00:00:00";
  $status.text("Work!");
  $workT.text(25);
  $breakT.text(5);
}

var bStart = document.querySelector(".fa-play");
var bPause = document.querySelector(".fa-pause");
var bReset = document.querySelector(".fa-refresh");

bStart.onclick = run;
bPause.onclick = pause;
bReset.onclick = stop;
