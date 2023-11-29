# MUSIC MAKER MACHINE
#### Video Demo:  https://youtu.be/OKSmCprfuDE
#### Description:
Though a variety of custom made functions, create music through code

### Process:
#### Introduction
Being frustrated by live code music editors such as tydal cycles, I wanted to create a normal code compiler that gave me fine control over every part of the process, where instead of "playing" code, I "produced" code

#### Hystory of development
First things first, I watched a tutorial on react. Although the project didn't continue with this framework, it gave me some basis on using Flask.
Having set up a JS/CSS/HTML workspace with flask, vscode and GitHub, I started work.

#### Some quickly resolved problems:
How to have an text input from user that doesn't disapear? text area + normal button
How to control time? have a timer file (timer js) that controls bpm and intervals and quickstarts the playing with playtree(0)
How to handle interactions with the page? inputHandler.js -- controls all the bmp, stopping and playing timer as well as submiting the code
How to quickstart the whole js files? main.js -- gets called by index.html and calls everything up, also setting a default value for text area
How to ensure propper functioning of text area? controlTextArea.js - not allow normal functioning when tab is pressed, switch to \t

#### Now a difficult question:
How to interpret the user's input into actual, costumized code?
At first, unfamiliar with javascript's objects, I thought of using arrays, after all, they seem to be practical and simple... right?
No, not acctually, and that's the sad history of the start of musicStructure.js.
At first, each function(play, wait, from_to, every) accepted its parameters, as well as a functions array and a parameters array. This quickly became horrible to use as sometimes arrays would look like: [[],[][[[]]]].[][[],[[[[]]]]]
it stayed like this for a while.

#### submitting the users input
To interpret the users input, a gient loop of the size of the quantity of characters in the text area was created. First, all letters and subsequent ones are scanned to see if they are a function, a parameter, a comment or a character to ignore.
For each matching "component", it was appended to a cleared list (all this in betterCompiler.js, compiler.js didn't clear the array). It was appended to a new, clear list.
Going through the list, the compiler then decides what to do based on the component, finally creating a tree of objects that has all the functions, related to each other.

#### playing music
After receiving a tree, the musicStructure.js goes through each component, executing it and all the subsequent children.

### Conclusion
A challenging project overall, this project has been great fun. I've gained some insights on scalability, cleanniness and JS/CSS/HTML.
