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
var objects;
export function constructObject( objectsList)
{
    objects = objectsList;
}
export function playTree(parent_id)
{
    
    for(let j = 0; j < objects.length; j++)// go through all items -- parent id = 0  / x0x / 1 / 2
    {
        
        //console.log(parent_id);

        if(objects[j].parent_id === parent_id)//find every object that has the parent_id --- object.parent id === 0 / 0 / x1x / 2 /
        {
            console.table(objects[j]);
            let object = objects[j];
            switch(object.func){
                case("every"):
                every(object.parameter1,object.id);
                break;
                case("wait"):
                wait(object.parameter1, object.id);
                break;
                case ("from_to"):
                from_to(object.parameter1,object.parameter2, object.id);
                break;
                case("play"):
                play(object.parameter1, object.id);
                break;
                default:
                    console.error("unknown function in playTree");
            }
        }
    }
}
export async function every(beat_multiplier,id)
{
    if ((f_ms_current) % (f_full_beat_ms * beat_multiplier) == 0)
    {
        playTree(id);
    }

}
//some from_to(0,200,
//[from_to, every]    ,
//[
//     [  0,100,[every],[0.2],  ],
// [0.5,[play],['2.wav']  ]);
export function from_to(from, to, id )
{
    if(f_beat_counter >= from && f_beat_counter <= to)
    {
        console.log("PASSED!");
        playTree(id);
    }
    else
    {
        return;
    }
}

export function wait(beat_multiplier,id) {
    console.log("wait called:")
    console.log({beat_multiplier, full_beat_ms})
    let a = setTimeout(() => {
        console.log("hello there, setTimeout working!")
        playTree(id);
        clearTimeout(a);
    }, beat_multiplier * f_full_beat_ms); // Convert seconds to milliseconds
    
}

export async function play(audio)
{
    console.log("received audio as: "+ audio);
    playAudio(audio);
}
