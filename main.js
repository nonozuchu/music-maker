import { runTimer } from './timer';


//document.querySelector('#app').innerHTML = `code goes here`

document.getElementById('coding_area').value = "//Welcome to MUSIC MAKER MACHINE!\n//\n//through a combination of functions and the availible sounds, you can create any music you want\n//\n//simply combine and nest functions \n//\n//\n//FUNCTIONS:\n//	every(i_beat) {other functions...}\n//\n//	wait(i_beats) {other functions...}\n//\n//	from_to(first_beat,last_beat) {other functions...}\n//\n//	play(sound)\n//\n//SOUNDS:\n//\tcymbal,hat,kick,fx,fx2,fx3,perc,snare,tamb,subkick\n\nfrom_to(10,50){\nevery(1){\nplay(kick)\n}\nevery(5){\nplay(fx2)\n}\n}\nfrom_to(0,60){\nevery(1){\nplay(kick)\nwait(0.8){\nplay(cymbal)\n}\n}\n}";
runTimer();
