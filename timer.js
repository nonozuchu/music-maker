import { every,from_to,play,updateFakeValues,wait } from "./musicStructure";

const miliseconds_in_minute = 60000;
let bpm = 120;
var total_beats = 0;

export var full_beat_ms = (miliseconds_in_minute/bpm);//how many ms in a full beat
const beat_divider = 20;
let subdivided_beat = full_beat_ms/beat_divider;


let semi_beats_counter = 0;
var ms_current = 0;
let current_beat_counter = 0;

let playing = false;

export function setBPM(beats_per_minute) // there are some problems in the division with strange numbers
{
    console.log("setBPM(" + Math.round(beats_per_minute) + ")");
    bpm = Math.round(beats_per_minute);
    full_beat_ms = Math.round(miliseconds_in_minute/bpm);
    subdivided_beat = full_beat_ms/beat_divider;
    console.log("full_beat: " + full_beat_ms +"   subdivided_beat: " + subdivided_beat);
    resetTimer();
}
var intervalID
var newInterval = true;
export function runTimer()
{
    if (!newInterval)// check if should start new interval
    {
        return;
    }
    intervalID = setInterval( //some intresting notes: all the parameters must be in individual arrays as if they were ()
    //ex:  every(0.2, [play], [["KICK"]]); every(0.2, [play], [["KICK"]]);
        () => {
            if (playing == true)// reverse this order!! call a new set Interval each time
            {
                incrementCounters();
                ms_current = semi_beats_counter*subdivided_beat;
                console.log(ms_current);
                updateFakeValues(ms_current,full_beat_ms,current_beat_counter);

                //wait(10, [play], ["CYMBAL"]);
                //every(0.25, [play], [["KICK"]]);
                //from_to(0,10,[every],[[1 ,[play],[["CYMBAL"]]]]);
                //every(5, [play, wait],[  ["KICK"],[ 1, [play],[["CYMBAL"]] ]  ]);
                every(1,
                    [play, wait],
                         [["HAT"],
                 [0.25,[play,wait],[
                            ["KICK"],
                            [0.25,[play,wait], 
                            [["CYMBAL"],
                        [0.25,[play,wait],
                            [["CYMBAL"],
                        [0.25,[play],["CYMBAL"]]]]]]
                         ]
                        ]]);
                //fx kick chimbal chimbal
            }
        }, subdivided_beat
    );
    
}
export function startTimer()
{
    playing = true;
}
export function stopTimer()
{
    playing = false;
}
export function resetTimer()
{
    clearInterval(intervalID);
    playing = false;
    newInterval = true;
    semi_beats_counter = 0;
    current_beat_counter = 0;
    runTimer()
}



function convertToMillisecond(seconds)
{
    return seconds * 1000;
}
export function incrementCounters()
{
    semi_beats_counter++;
    if(ms_current % full_beat_ms == 0)
    {
        current_beat_counter++;
    }
}