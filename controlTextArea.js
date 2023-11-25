import { initCompiling } from "./betterCompiler";
export function controlTextArea()
{
var inputField = document.getElementById('coding_area'); // get textarea object
 
     inputField.onkeydown = function(e) { // list for when any key is pressed
 
     if (e.key === 'Tab') { // block to catch when tab key is pressed
 
         this.setRangeText(
 
                 '\t',
 
                 this.selectionStart,
 
                 this.selectionStart,
 
                 'end'
 
             )
 
         return false; //prevent default action
 
     }
 
 };
}

export function submitTextArea(buttonElement)
{
    buttonElement.addEventListener('click', function() {
        var inputField = document.getElementById('coding_area').value;
        //var lines = inputField.value.split('\n');
        initCompiling(inputField)
        
        
    });
};
