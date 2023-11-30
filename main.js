import { runTimer } from './timer.js';


//document.querySelector('#app').innerHTML = `code goes here`

var defaultText = "//Welcome to MUSIC MAKER MACHINE!\n//\n//Through a combination of functions and the availible sounds, you can create any music you want\n//\n//Simply combine and nest functions. Start by changing some values! \n//\n//FUNCTIONS:\n//	every(i_beat) {other functions...}\n//\n//	wait(i_beats) {other functions...}\n//\n//	from_to(first_beat,last_beat) {other functions...}\n//\n//	play(sound)\n//\n//SOUNDS:\n//\tcymbal,hat,kick,fx,fx2,fx3,perc,snare,tamb,subkick\n//\n//Happy code/music making!\n\n\n\nfrom_to(1,23)\n{\n\tevery(1)\n\t{\n\t\tplay(kick)\n\t\twait(0.25)\n\t\t{\n\t\t\tplay(kick)\n\t\t}\n}\n}\nfrom_to(8,23)\n{\n\tevery(0.5)\n\t{\n\t\tplay(cymbal)\n\t}\n\tevery(0.75)\n\t{\n\t\tplay(hat)\n\t}\n}\nfrom_to(15,26)\n{\n\tevery(1)\n\t{\n\t\tplay(snare)\n\t\twait(0.35)\n\t\t{\n\t\t\tplay(tamb)\n\t\t}\n\t}\n}\nfrom_to(20,30)\n{\n\tevery(0.10)\n\t{\n\t\tplay(perc)\n\t}\n}";
//if (document.getElementById('coding_area').value != defaultText)
//{
//    sessionStorage.setItem('text', document.getElementById('coding_area').value);
//    document.getElementById('coding_area').value = sessionStorage.getItem('text');
//}
//else
//{
//    sessionStorage.clear();
//    
//}

document.getElementById('coding_area').value = defaultText;
runTimer();
