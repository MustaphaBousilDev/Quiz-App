"use strict";

var quiz_intro = document.querySelector('.quiz__intro');
var heading = quiz_intro.querySelector('.heading');
var myText = "Hello in Quiz JavaScript";
console.log(heading);
var i = 0;
var typeWraper = setInterval(function () {
  heading.textContent += myText[i];
  i = i + 1;

  if (i > myText.length - 1) {
    clearInterval(typeWraper);
  }
}, 100);