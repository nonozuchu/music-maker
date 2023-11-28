import { setupAudio, stopAudio } from './audio.js'
import { controlTextArea, submitTextArea } from './controlTextArea.js';
import { resetTimer, setBPM } from './timer.js'

document.addEventListener('DOMContentLoaded', function() {

setupAudio(document.querySelector('#play_audio'));
stopAudio(document.querySelector('#stop_audio'));
configureSetBPM(document.querySelector('#submit_bpm'));
controlTextArea();
submitTextArea(document.querySelector('#submit_code'));

function configureSetBPM(buttonElement) {
    // Assuming you have some logic to set BPM when the button is pressed
    buttonElement.addEventListener('click', function() {
      // Your BPM setting logic goes here

      const bpmInput = document.getElementById("bpm_input");//set placeholder to bpm
      let bpmValue = Math.round(bpmInput.value);
      bpmInput.value = bpmValue;
      if (isNaN(bpmValue))
      {
        alert("BPM should be a number");
      }
      else
      {
        bpmInput.placeholder = bpmValue;
        resetTimer();
        console.log(bpmValue);
        setBPM(bpmValue);
      }
      
    });
  }
});