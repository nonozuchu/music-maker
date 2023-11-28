import { audioNames } from "./audio.js";
import { constructObject } from "./musicStructure.js";

export function initCompiling(text)
{
    resetValues();
    let clean_array = cleanup(text);
    if(checkThatAllright(clean_array))
    {
        doCycle(clean_array, false, 0)
        
    }
    findObjectsWhereGranmpa(0);
    //console.table(objectsList)
    constructObject(objectsList)
}
function findObjectsWhereGranmpa(granmpa_id)
{
    
    for(let j = 0; j < objectsList.length; j++)// go through all items -- parent id = 0  / x0x / 1 / 2 /
    {
        //console.log(objectsList[j].id);
        //console.log(granmpa_id);

        if(objectsList[j].parent_id === granmpa_id)//find every object that has the parent_id --- object.parent id === 0 / 0 / x1x / 2 /
        {
            let object = objectsList[j];
            
            let children_ids = [];
            let found = 0;
            for(let k = 0; k < objectsList.length;k++)
            {
                if(objectsList[k].parent_id === object.id)// find every object that is a child of object --- child.parent.id === object.id / 0 / 1 / x2x /
                {
                    let child = objectsList[k];
                    children_ids.push(child.id);
                    found++; 
                }
            } 
            if(found > 0)
            {
                object.child_funcs_Ids = children_ids;

                for(let k = 0; k < children_ids.length; k++)
                {
                    findObjectsWhereGranmpa(object.id)
                }
            }
        }
    }
}
function doCycle(clean_array, has_parent, parent_id)
{
    let parent_elements = findParentElements(clean_array)

    for( let j =0; j<parent_elements.length; j++)
    {
        if(checkThatAllright(parent_elements[j]))
        {
            createObjects(parent_elements[j],has_parent, parent_id);
        }
    }
    //console.table(objectsList);
}
const functions_list = ["from_to", "every", "wait", "play"]
function cleanup(text)
{
    let array = [];
    for (let i = 0; i < text.length; i++)
    {
        let cur_char = text[i];
        ////console.log(i, " ", cur_char);
        if(cur_char === "/" && text[i+1] === "/")// find comments
        {
            for(let j = i; j < text.length; j++)
            {
                if(text[j] ==="\n")
                {
                    i = j;
                    console.log("comment found!")
                    break;
                }
                
            }
            continue;
        }

        if(cur_char === " " || cur_char === "" || cur_char ==="," || cur_char === "\n" || cur_char === "\t")
        {
            continue;
        }
        if (lookForFunctions(text,i) != false)
        {
            let word = lookForFunctions(text,i);
            array.push(word);
            //console.log("word in lookForFunctions: " +word);
            i += word.length - 1;
            continue;
        }
        if(cur_char === "(" || cur_char === ")" || cur_char === "{" || cur_char === "}")
        {
            array.push(cur_char);
            //console.log("char in () or {}: " +cur_char);
            continue;
        }
        if(lookForParameters(text, i))
        {
            let word = lookForParameters(text,i);
            //console.log("word in lookForFunctions: " +word);
            array.push(word)
            i += word.length - 1;
            continue;
        }
    }
    //console.log(array);
    return array;
}
function findParentElements(clean_array)
{
    var parentLists = []
    let indexes = []
    for (let i = 0; i < clean_array.length; i++)// going through the stripped list ---> [x,x,x,x,]
    {
        if (clean_array[i] === "every" || clean_array[i] === "wait" || clean_array[i] === "from_to" || clean_array[i] === "play")//in case it matches: |yes!
        { 
            let oppening_counter = 0;
            let closing_counter = 0; 
            for(let k = i; k >= 0; k--)//create an reverse loop [ x, x, x,, x ]<-----
            {
                if(clean_array[k] === "{")
                {
                    oppening_counter ++;
                }
                else if (clean_array[k] === "}")
                {
                    closing_counter++;
                }
            }
            if (oppening_counter > closing_counter)// in case its a child
            {
                // do nothing
            }
            else if (oppening_counter == closing_counter)
            {
                //update lists:
                indexes.push(i);
            }
            else
            {
                console.error("something is messed up in the brackets --- findParentElements")
                
            }
        }
    }
    for (let i = 0; i < indexes.length; i ++)
    {
        let firstPart;
        if (i < indexes.length -1)//this condition is just to certify everything is sliced up properly
        {
            firstPart = clean_array.slice(indexes[i], indexes[i+1]);
        }
        else
        {
            firstPart = clean_array.slice(indexes[i]);
        }
        parentLists.push(firstPart)
    }
    return parentLists;
}
function FunctionObject(symbol, parameter1, parameter2, parent_id, id, child_funcs_Ids) {

    this.func = symbol;

    this.parameter1 = parameter1;
    this.parameter2 = parameter2;
    
    this.parent_id = parent_id;
    this.id = id;
    this.child_funcs_Ids = child_funcs_Ids;
}
function resetValues()
{
    objectsList = [];
    cur_id = 0;
}
var objectsList = []
function CreateFunctionObject(symbol, parameter1, parameter2, parent_id, id, child_funcs_Ids)
{
    let object = new FunctionObject(symbol, parameter1, parameter2, parent_id, id, child_funcs_Ids);
    objectsList.push(object);

}
var cur_id = 0;
function generateId()
{
    cur_id++; 
    return cur_id;
}

function createObjects(parent_array, has_parent, parent_id)
{
    if (has_parent){ parent_id = parent_id}
    else{ parent_id = 0}
    let id = generateId();
    let separated = [];
    if(parent_array[0] === "every" && parent_array[1] === "(" && !isNaN(parent_array[2]) && parent_array[3] === ")" && parent_array[4] === "{" && parent_array[parent_array.length - 1] === "}")
    {
        //console.log("every as parent");
        CreateFunctionObject(parent_array[0],parent_array[2], void 0, parent_id, id, void 0)
        //CreateFunctionObject( SYMBOL, P1, P2, P_ID, ID, C_IDS) THROWAWAY
        separated = separateChildFromParent(parent_array,5)
    }
    else if(parent_array[0] === "from_to" && parent_array[1] === "(" && !isNaN(parent_array[2]) && !isNaN(parent_array[3]) && parent_array[4] === ")" && parent_array[5] === "{" && parent_array[parent_array.length - 1] === "}")
    {
        //console.log("from_to as parent");
        CreateFunctionObject(parent_array[0],parent_array[2], parent_array[3], parent_id, id, void 0)
        separated = separateChildFromParent(parent_array, 6)
    }
    else if(parent_array[0] === "wait" && parent_array[1] === "(" && !isNaN(parent_array[2]) && parent_array[3] === ")" && parent_array[4] === "{" && parent_array[parent_array.length - 1] === "}")
    {
        //console.log("wait as parent");
        CreateFunctionObject(parent_array[0],parent_array[2], void 0, parent_id, id, void 0)
        separated = separateChildFromParent(parent_array, 5)
    }
    else if(parent_array[0] === "play" && parent_array[1] === "(" && audioNames[parent_array[2]] && parent_array[3] === ")")
    {
        CreateFunctionObject(parent_array[0], parent_array[2], void 0, parent_id, id, void 0)
        //console.log("play as parent");//TODO: play is a parent that doesnt have any children
    }
    else
    {
        console.error("didn't find any valid functions as " + parent_array[0]);
    }
    if(separated.length == 2)
    {
            doCycle(separated[1], true, id)
        //now we've essencially hit the same point as in the start
        //TODO: go through this whole process, but with parent
    }
    //console.table(separated);
    //console.log("separated ^^^^");
    //TODO: append to parents child index

}
function separateChildFromParent(array, nxt_func_index)
{
    let separetedList = [];
    if(array.length-1 != nxt_func_index)
    {
        let p_array = [];
        let c_array = []
        for (let i = 0; i < nxt_func_index; i++)
        {
            p_array.push(array[i]);
        }
        p_array.push(array[array.length -1]);
        for(let i = nxt_func_index; i < array.length-1; i++)
        {
            c_array.push(array[i]);
        }
        separetedList.push(p_array);
        separetedList.push(c_array);
        //console.log("in separateChildFromParent: successfully separated child from parent, separated list:");
        //console.log(separetedList);

    }
    else
    {
        console.error("in separateChildFromParent: function doesn't have any functions inside of it");
        separetedList.push(array);
    }
    //console.log("separatedList: ")
    //console.log(separetedList);
    return separetedList;
}
function checkThatAllright(clean_array)
{
    let br_oppening_counter = 0;
    let br_closing_counter = 0;

    let p_oppening_counter = 0;
    let p_closing_counter = 0;

    let br_funcs_counter =0;
    let no_br_funcs_counter = 0;

    let needed_args_counter = 0;
    let args_counter = 0;

    for (let i = 0; i < clean_array.length; i++)
    {
        let cur_word = clean_array[i];
        switch (cur_word) {
            case '{':
                br_oppening_counter++
                break;
            case '}':
                br_closing_counter++;
                break;
            case '(':
                p_oppening_counter++;
                break;
            case ')':
                p_closing_counter++;
                break;
            case 'every':
                needed_args_counter += 1;
                br_funcs_counter++;
                break;
            case 'wait':
                needed_args_counter += 1;
                br_funcs_counter++;
                break;
            case 'from_to':
                needed_args_counter += 2;
                br_funcs_counter++;
                break;
            case 'play':
                needed_args_counter += 1;
                no_br_funcs_counter++;
                break;
            default:
                args_counter++;
        }
    }
    //console.log("br_oppening_counter: " +br_oppening_counter) 
    //console.log("br_closing_counter: " +br_closing_counter) 

    //console.log("p_oppening_counter: " +p_oppening_counter) 
    //console.log("p_closing_counter: " +p_closing_counter) 

    //console.log("br_funcs_counter: " +br_funcs_counter) 
    //console.log("no_br_funcs_counter: " +no_br_funcs_counter) 

    //console.log("needed_args_counter: " +needed_args_counter) 
    //console.log("args_counter: " +args_counter) 
    let errors_counter = 0;
    if(br_closing_counter != br_oppening_counter)
    {
        errors_counter++;
        console.error("not all brackets are closed or oppened");
    }
    if(p_oppening_counter != p_closing_counter)
    {
        errors_counter++;
        console.error("not all parenthesis open and close");
    }
    if ((p_closing_counter+p_oppening_counter)/2 != br_funcs_counter+no_br_funcs_counter)
    {
        errors_counter++;
        console.error("not all functions have its necessary parenthesis");
    }
    if (needed_args_counter != args_counter)
    {
        errors_counter++;
        console.error("not all functions have its necessary arguments to execute");
    }
    //console.log(errors_counter)
    if(errors_counter > 0)
    {
        return false;
    }
    return true;
}   
function lookForFunctions(text, cur_i)
{
    for (let i = cur_i; i < text.length; i++)
    {
        for (let j = 0; j < functions_list.length; j++)// check all words
        {
            let confirm = 0;
            let word = functions_list[j];
            for(let k = 0; k < word.length; k++)
            {
                ////console.log(i+k);
                if (text[i+k] == word[k])
                {
                    confirm++;
                }
            }
            if(confirm == word.length)// if this is activated you know you have a function
            {
                return word;
            }
            confirm = 0;
        }
        //if the loop ended, didnt find any
        return false;
    }
    return false;
}

function lookForParameters(text, cur_i)
{
    let new_string = "";
    for (let i = cur_i; i < text.length; i++)
    {
        let char = text[i];
        ////console.log(char);
        if(char == "(" || char == ")" || char == " " || char == "," || char == "{" || char == "}") // if it reached a final symbol
        {
            return new_string;
        }
        else
        {
            new_string += char;
        }
    }
    return new_string;
}