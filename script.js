let input= document.getElementById("inputBox"); 
let buttons=document.querySelectorAll("button");
let string="";

let arr= Array.from(buttons);

arr.forEach(buttons=>{
    buttons.addEventListener("click", (e)=>{
        if(e.target.innerHTML == '='){
            try {
                // Check for division by zero
                if (string.includes('/0')) {
                    throw new Error('Math Error');
                }
            string=eval(string);
            input.value=string;
        } catch (error) {
            input.value = 'Math Error'; // Show Math Error if division by zero occurs
            string = ''; // Reset string to prevent further calculations
        }
        }
        else if(e.target.innerHTML=='AC'){
            string='';
            input.value=string;
        }
        else if(e.target.innerHTML=='Del'){
            string=string.slice(0, -1);
            input.value=string;
        }
        else{
            string+=e.target.innerHTML;
            input.value=string;
        }   
    })

})