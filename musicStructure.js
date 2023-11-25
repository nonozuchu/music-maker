import { playAudio } from "./audio";
import { full_beat_ms } from "./timer";

let f_ms_current = 0;
let f_full_beat_ms = 0;
let f_beat_counter = 0;

export function updateFakeValues(true_ms_current, true_full_beat_ms, true_beat_counter)
{
    f_ms_current = true_ms_current;
    f_full_beat_ms = true_full_beat_ms;
    f_beat_counter = true_beat_counter;
}

export function constructMusicPlayer()
{

}
export function playMusic()
{

}

export async function every(beat_multiplier,functions,parameters)
{
    if ((f_ms_current) % (f_full_beat_ms * beat_multiplier) == 0)
    {
        functions.forEach(function (func, index)
        {
            //parameters = parameters.flat(1);
            //console.log("func:  " + func +"\n");
            //console.log("parameters[index]  " + parameters[index]+ "\n");
            func(...parameters[index]);
        });
    }

}
//some from_to(0,200,
//[from_to, every]    ,
//[
//     [  0,100,[every],[0.2],  ],
// [0.5,[play],['2.wav']  ]);
export function from_to(from, to, functions, parameters )
{
    //console.log("fake beat counter: " + f_beat_counter);
    //console.log("from: " + from + "\nto:  " +to);
    //console.log("typeof(from): " + typeof(from) + "\ntypef(to):  " +typeof(to));
    if(f_beat_counter >= from && f_beat_counter <= to)
    {
        console.log("PASSED!");
        functions.forEach(function (func, index)
        {
            //parameters = parameters.flat(1);
            //console.log("func:  " + func +"\n");
            //console.log("parameters[index].flat(1)  " + parameters[index].flat(1)+ "\n");
            func(...parameters[index]);
        });
    }
    else
    {
        return;
    }
}

export function wait(beat_multiplier, functions, parameters) {
    //if (!Array.isArray(functions) || !Array.isArray(parameters) || functions.length !== parameters.length) {
    //  throw new Error('Invalid input: functions and parameters must be arrays of the same length');
    //}
    console.log("beat_multiplier, functions, parameters\n" + beat_multiplier+ functions + parameters);
    setTimeout(() => {
        functions.forEach(function (func, index)
        {
            func(...parameters[index]);
        });
    }, beat_multiplier * f_full_beat_ms); // Convert seconds to milliseconds
}

export async function play(audio)
{
    console.log("received audio as: "+ audio);
    playAudio(audio);
}
