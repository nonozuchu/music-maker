export function initCompiling(text)
{
    

}
const functions_list = ["from_to", "every", "wait", "play"]
function cleanup(text)
{
    let array = [];
    for (let i = 0; i < text.lenght; i++)
    {
        let cur_char = text[i];
        if(cur_char === " " || cur_char === "" || cur_char ===",")
        {
            continue;
        }
        if (lookForFunctions(text,i) != false)
        {
            let word = lookForFunctions(text,i);
            array.push(word);
            console.log("word in lookForFunctions: " +word);
            i += word.length - 1;
            continue;
        }
        if(cur_char === "(" || cur_char === ")" || cur_char === "{" || cur_char)
        {
            array.push(cur_char);
            continue;
        }
        if()

    }
}
function lookForFunctions(text, cur_i)
{
    for (let i = cur_i; i < text.lenght; i++)
    {
        
        for (let j = 0; j < functions_list.length; j++)// check all words
        {
            let confirm = 0;
            let word = functions_list[j];
            for(let k = 0; k < word.length; k++)
            {
                console.log(i+k);
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

}