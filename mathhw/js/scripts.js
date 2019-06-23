"use strict"; 

(function() {

})(); 

const messageWrapper = document.getElementById('message');

alert('Input numbers for your number of pies!')
var a = Number(prompt("Enter first number"));
var b = Number(prompt("Enter second number"));
var c = (a+b);
var d = (c-a);
var e = (d*a);
alert(e);


let message ='\nLet me Read your Receipt: ' + a + ' apples,'; 
message = ' plus ' + b + 'peaches';
message = ' equals' + c + 'pies.';
 message ='Subtract ' + a + ' apples,';
 message =' is going to be' +c+ 'pumpkins';
message ='\nLastly,' + c + ' pumpkins,';
message ='multiplied by ' +d+  'is';
 message = 'going to be' +e+ 'pies';
message ='\nYou Now Have ' + e + ' Pies! Yum.';

messageWrapper.innerText = message; 