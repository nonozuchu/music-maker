import {every, from_to, wait, play} from "./musicStructure";
import { audioNames} from "./audio"
const functions = {
    "every": every,
    "from_to": from_to,
    "wait": wait,
    "play": play
}






const parenthesis = ["(", ")"] ;
const brackets = ["{", "}" ];
const br_funcs = ["every", "wait", "from_to", "play"];

export function interpretSubmit(text)
{
    //const object1 = new Token(1, 'ABC');
    //const object2 = new Token(2, 'XYZ'); 
    var brackets_counter = [0,0];
    var br_funcs_counter = 0;
    var funcs_counter = 0;
    for (let i = 0; i < text.length; i++)// cycle throug all characters in text
    {
        if( text[i] == " ")
        {
            continue;
        }
        for (let j = 0; j < br_funcs.length; j++)// check all words
        {
            let confirm = 0;
            let word = br_funcs[j];

            for(let k = 0; k < word.length; k++)
            {
                if (text[i+k] == word[k])
                {
                    confirm++;
                }
            }
            if(confirm == word.length)// if this is activated you know you have a function
            {
                i += word.length;
                // CHECK the following and checking if its "("
                if(lookFor(i, text, "(") == false)
                {
                    console.error("no ( found after: " + word);
                    continue;
                }
                else if (lookFor(i, text, "("))
                {
                    i = lookFor(i, text, "(") + 1;
                    console.log("passed! func( -- found");

                    let par= lookBetween( [" ", ","],")", i, text);
                    if(par.array == false || par.lastIndex == false)
                    {
                        console.error("not found ')' or empty argument ()")
                    }
                    if(par.array != false && par.lastIndex != false)
                    {
                        i = par.lastIndex;
                        console.log("par.lastIndex: " + par.lastIndex);
                        checkFunctions(i, par.array, word,text);
                    }
                }
            }

            
        }
    }
}
function lookFor(current_i, text, letter)
{
    for(let i = current_i; i < text.length; i++)
    {
        if(text[i] != " " && text[i]!= "")
        {
            if (text[i] == letter)// is the next symbol the symbol required?
            {
                
                return i;
            }
            else //if its not
            {
                console.log("aaaa" +letter);
                return false;
            }
        }
    }}
function lookBetween(dividers_chars,final_symbol ,current_i, text)
{
    let return_array = [];
    let new_string = "";
    for (let i = current_i; i < text.length; i++)// there is a problem: last number not seem.
    {
        let char = text[i];
        console.log(char);
        if(char == final_symbol) // if it reached a final symbol
        {
            if (new_string != "")
            {
                return_array.push(new_string);
            }

            return { array: return_array, lastIndex: i+1 };
        }
        if(!dividers_chars.includes(char)) // if its not a divider --ok
        {
            new_string += char;
        }
        else if (dividers_chars.includes(char))// if encountered  a divider --ok
        {
            if (new_string != "")
            {
                return_array.push(new_string);
                new_string = "";
            }
        }
    }
    return { array: false, lastIndex: false };
}
// Creating multiple instances
//const object1 = new Token(1, 'ABC');
//const object2 = new Token(2, 'XYZ');

function cleanUpNumbers(array_of_values, cuantity)
{
    if (array_of_values.length != cuantity)
    {
        console.error("not enought arguments");
        return false;
    }
    confirm = 0;
    for (let j = 0; j < cuantity; j++)
    {
        if (!isNaN(array_of_values[j]))
        {
            confirm++;
        }
    }
    if (confirm == cuantity)
    {return true;}
    else{
        return false;
    }
}
function cleanUpSound(array_of_values, cuantity)
{
    if (array_of_values.length != cuantity)
    {
        console.error("not enought arguments");
        return false;
    }
    confirm = 0;
    for (let j = 0; j < cuantity; j++)
    {
        if (audioNames[array_of_values[j]])
        {
            confirm++;
        }
    }
    if (confirm == cuantity)
    {return true;}
}


function checkFunctions(i, argument_array,word,text)
{
    switch (word) 
    {
        case 'every':
            if(cleanUpNumbers(argument_array, 1) == false)
            {
                console.error("does not correspond in every: " + i );
            }
            if(lookFor(i, text, "{") == false)
            {console.error(" no { after " +i);}
            else{i = lookFor(i, text, "{")}
            break;
        case 'from_to':
            if(!cleanUpNumbers(argument_array, 2))
            {
                console.error("does not correspond in from_to: " + i );
                //TODO: Ok, found everything, so what?? now you want to check for functions inside all this
            }
            if(lookFor(i, text, "{") != false)
            {
                i = lookFor(i, text, "{")
            }
            else{console.error(" no { after " +i);}
            break;
        case 'wait':
            if(!cleanUpNumbers(argument_array, 1))
            {
                console.error("argument does not correspond in wait: " + i );
                //TODO: Ok, found everything, so what?? now you want to check for functions inside all this
            }
            if(lookFor(i, text, "{") != false)
            {
                i = lookFor(i, text, "{")
            }
            else{console.error(" no { after " +i);}
            break;
        case 'play':
            console.log("play(" + argument_array + ")");
            if(!cleanUpSound(argument_array, 1))
            {
                console.error("does not correspond in play, not a valid value: " + i );
                //TODO: Ok, found everything, so what?? now you want to check for functions inside all this
            }
            else{

            }
            break;
    }
}