(function(){
    'use strict';
    const myForm = document.querySelector('#myform');
    const madlib = document.querySelector('#madlib');

myForm.addEventListener('submit', function(e){
     e.preventDefault();
    
     const noun1 = document.querySelector('#noun1').value;
     const noun2 = document.querySelector('#noun2').value;
     const adj = document.querySelector('#adj').value;
     const verb = document.querySelector('#verb').value;

     let myText = 'Here are the words: ${noun1}, ${noun2}, ${adj}, ${verb}';

     if(noun1 && noun2 && adj && verb){
        myText = 'Good Job you beat the wizard by giving these answers: ${noun1}, ${noun2}, ${adj}, ${verb} Now onto your Next clue.';
   }
   else{
        myText = "Please give me words so I can make your Mad Lib!";
   }
     
     madlib.innerHTML = myText;

});

}())