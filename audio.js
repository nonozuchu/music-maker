import { startTimer, stopTimer, resetTimer } from "./timer"

export function setupAudio(element) {
  console.log("setupAudio() in audio.js");
  element.addEventListener('click', () => startTimer())
}

export function stopAudio(element) {
  console.log("setupAudio() in audio.js");
  element.addEventListener('click', () => stopTimer())
}
export function resetAudio(element) {
  console.log("setupAudio() in audio.js");
  element.addEventListener('click', () => resetTimer())
}

export var audioNames = {
  "CYMBAL": "./samples/Drum Hits/D_B Cymbal 14.wav",
  "HAT": "./samples/Drum Hits/D_B Hat 02.wav",
  "KICK": "./samples/Drum Hits/D_B Kick 15.wav",
  "FX": "./samples/FX/FX 06.wav"
}
export function playAudio(audioName)
{
  var a = new Audio(audioNames[audioName]);
  a.play();
  //pay atention to the playback speed. it should change
}