import { startTimer, stopTimer, resetTimer } from "./timer.js";
import { initCompiling } from "./betterCompiler.js";

export function setupAudio(element) {
  console.log("setupAudio() in audio.js");
  function handleClick()
  {
    var inputField = document.getElementById('coding_area').value;
        
    initCompiling(inputField)
    resetTimer();
    startTimer();
  }
  element.addEventListener('click', handleClick)
}

export function stopAudio(element) {
  console.log("setupAudio() in audio.js");
  function handleClick()
  {
    resetTimer();
    stopTimer();
  }
  element.addEventListener('click', handleClick)

}
export function resetAudio(element) {
  console.log("setupAudio() in audio.js");
  
}


export var audioNames = {
  "cymbal": "./samples/Drum Hits/D_B Cymbal 14.wav",
  "hat": "./samples/Drum Hits/D_B Hat 03.wav",
  "kick": "./samples/Drum Hits/D_B Kick 15.wav",
  "fx": "./samples/FX/FX 11.wav",
  "fx2": "./samples/FX/FX 19.wav",
  "fx3": "./samples/FX/Stab 01 (C).wav",
  "perc": "./samples/Drum Hits/D_B Perc 13.wav",
  "snare": "./samples/Drum Hits/D_B Snare 01.wav",
  "tamb": "./samples/Drum Hits/D_B Tamb 02.wav",
  "subkick": "./samples/Drum Hits/Sub Kick 01.wav",
  "longS": "./samples/plus/longS.mp3",
  "1S": "./samples/plus/1s.mp3",
  "2S": "./samples/plus/2s.mp3"
}
export function playAudio(audioName)
{
  var a = new Audio(audioNames[audioName]);
  a.play();
  //pay atention to the playback speed. it should change
}