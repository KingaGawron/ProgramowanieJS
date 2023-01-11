const control = {
  KeyQ: document.querySelector("#boom"),
  KeyW: document.querySelector("#clap"),
  KeyE: document.querySelector("#hihat"),
  KeyR: document.querySelector("#kick"),
  KeyT: document.querySelector("#openhat"),
  KeyA: document.querySelector("#ride"),
  KeyS: document.querySelector("#snare"),
  KeyD: document.querySelector("#tink"),
  KeyF: document.querySelector("#tom"),
};

const display = {
  KeyQ: document.querySelector("#b0"),
  KeyW: document.querySelector("#b1"),
  KeyE: document.querySelector("#b2"),
  KeyR: document.querySelector("#b3"),
  KeyT: document.querySelector("#b4"),
  KeyA: document.querySelector("#b5"),
  KeyS: document.querySelector("#b6"),
  KeyD: document.querySelector("#b7"),
  KeyF: document.querySelector("#b8"),
};

const records = [];
let recordingTrack = null;
let recordingTime = 3;
let recordingTimeout;
const recordingTimeSliderLabel = document.querySelector("#recordLenghtLabel");
const recordingTimeSlider = document.querySelector("#recordLenght");

recordingTimeSlider.addEventListener("input", (e) => {
  recordingTime = recordingTimeSlider.value;
  recordingTimeSliderLabel.innerHTML =
    "recording time: " + recordingTimeSlider.value + " seconds";
});

document.body.addEventListener("keydown", (e) => {
  playsound(control[e.code]);
  saveSound(control[e.code]);

  display[e.code].classList.add("pulse");
  setTimeout(() => {
    display[e.code].classList.remove("pulse");
  }, 300);
});

const playsound = (soundNode) => {
  const sound = soundNode.cloneNode();
  sound.onended = () => {
    delete sound;
  };
  sound.play();
};
const saveSound = (soundNode) => {
  if (recordingTrack !== null) {
    const rec = records[recordingTrack].rec;
    const start = records[recordingTrack].start;
    rec.push({ offset: Date.now() - start, node: soundNode });
  }
};

const stopRecording = () => {
  recordingTrack = null;
  clearTimeout(recordingTimeout);
  document.querySelectorAll(".recordBtn").forEach((element, num) => {
    element.classList.replace("darken", "lighten");
  });
};

const startRecording = (track) => {
  stopRecording();
  document
    .querySelectorAll(".recordBtn")
    [track].classList.replace("lighten", "darken");
  records[track] = { start: Date.now(), rec: [] };
  recordingTrack = track;
  recordingTimeout = setTimeout(() => {
    stopRecording();
  }, recordingTime * 1000);
};

document.querySelectorAll(".recordBtn").forEach((element, num) => {
  element.addEventListener("click", () => {
    if (recordingTrack == num) {
      stopRecording();
    } else {
      startRecording(num);
    }
  });
});
document.querySelector("#playAll").addEventListener("click", () => {
  stopRecording();
  records.forEach((track) => {
    track.rec.forEach((soundObj) => {
      setTimeout(() => {
        playsound(soundObj.node);
      }, soundObj.offset);
    });
  });
});
document.querySelectorAll(".playBtn").forEach((element, num) => {
  element.addEventListener("click", () => {
    records[num].rec.forEach((soundObj) => {
      setTimeout(() => {
        playsound(soundObj.node);
      }, soundObj.offset);
    });
  });
});
