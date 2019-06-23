"use strict"; 

(function() {

})(); 

const messageWrapper = document.getElementById('message');

const question = prompt('Do you want to add?);
const age = prompt('What is your age?');
const fruit = prompt('What is your fruit?');

let message = 'Hello, ' + name + '!\n';
message +='\nYou are ' + age + ' years old!\n';

if(age >= 30) {
    message += 'That\'s old!\n';
} else if (age <= 13) {
    message += 'Should you be here?\n'
}

message +='\nYour fruit is ' + fruit + '. yumm.';

messageWrapper.innerText = message; 