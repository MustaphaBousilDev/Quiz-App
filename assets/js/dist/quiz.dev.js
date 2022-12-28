"use strict";

//let yourname=prompt('What is your name ?')
//if(yourname==null || yourname==''){
//window.location.href="quiz.html"
//}
document.querySelector('.info').style.display = "block";
document.querySelector('.content').style.display = "none";
document.querySelector('.correction').style.display = "none";
document.querySelector('.score').style.display = "none";
var randome_data = [];
var answers_all = document.querySelectorAll('.answer');
var question_ele = document.querySelector('#question');
var answer_a = document.querySelector('#a_text');
var answer_b = document.querySelector('#b_text');
var answer_c = document.querySelector('#c_text');
var answer_d = document.querySelector('#d_text');
var btn_next_q = document.querySelector('.btn__next');
var ul__bar = document.querySelector('.ul__progress_bar');
var ul_li = document.querySelectorAll('.ul__progress_bar li');
var li_item = Array.from(ul_li); //console.log(ul_li)

var score = 0;
var current_quiz = 0;
var my__answer = [];
var answers = document.querySelectorAll('.content form p');
var answers_list = Array.from(answers); /////////////////////////////////////////////////////////

var xmlhttp = new XMLHttpRequest();
var url = "data.json";
var data = [];

xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var myArr = JSON.parse(this.responseText);
    data = myArr; //console.log(data[0])

    console.log(data);
    var mainSerie = [];
    var aliasSerie = [];
    var q = 0;
    var result;
    var n = data.length;

    for (var i = 0; i < n; i++) {
      mainSerie.push(i);
    }

    console.log(mainSerie); //console.log('fffff'+n)

    var s = n;

    while (aliasSerie.length < s) {
      q = mainSerie[Math.floor(Math.random() * n)];
      n--;
      aliasSerie.push(q);
      result = q;
      mainSerie.splice(mainSerie.indexOf(q), 1);
    }

    console.log(aliasSerie);

    for (var _i = 0; _i < aliasSerie.length; _i++) {
      var _n = aliasSerie[_i];
      randome_data[_i] = data[_n];
    }

    console.log(randome_data);
    var question = randome_data[current_quiz].question;
    var a = randome_data[current_quiz].a;
    var b = randome_data[current_quiz].b;
    var c = randome_data[current_quiz].c;
    var d = randome_data[current_quiz].d;
    load_quiz(question, a, b, c, d); //create li progress bare

    bullits(data.length);
    active_progrees();
    document.querySelector('.correction').addEventListener('click', function () {
      fetch_resultant(randome_data, my__answer);
      console.log('ttt');
    }); //fetch resultant 
  }
};

xmlhttp.open("GET", url, true);
xmlhttp.send(); ///////////////////////////////////////////////////////////

btn_next_q.addEventListener('click', function (e) {
  var answer = getSelectAnswer(); //console.log(answer)
  //console.log(data.length)

  if (answer) {
    if (answer === data[current_quiz].correct) {
      score++;
    }

    current_quiz++; //active_progrees()

    if (current_quiz < data.length) {
      active_progrees();
      var question = data[current_quiz].question;
      var a = data[current_quiz].a;
      var b = data[current_quiz].b;
      var c = data[current_quiz].c;
      var d = data[current_quiz].d;
      load_quiz(question, a, b, c, d);
    } else {
      fetch_resultant(randome_data, my__answer);
      console.log('guvkk');
      console.log(randome_data);
      console.log(my__answer);
      document.querySelector('.content').style.display = "none";
      document.querySelector('.info').style.display = "none";
      document.querySelector('.score').style.display = "block";
      document.querySelector('.correction').style.display = "none";
      document.querySelector('.two').classList.remove('current-item');
      document.querySelector('.quiz__score').innerHTML = "Your Answer Correctly".concat(score, "/").concat(data.length);
    }
  }
});
document.querySelector('.btn_start_quiz').addEventListener('click', function () {
  document.querySelector('.content').style.display = "block";
  document.querySelector('.info').style.display = "none";
  document.querySelector('.one').classList.remove('current-item');
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('paragraph')) {
      remove_active_all();
      e.target.classList.add('chicked');
    } else {
      remove_active_all();
      e.target.parentElement.classList.add('chicked');
    }
  }); //console.log(answers)
  //document.querySelector('.content').innerHTML=``
});
document.querySelector('.correction_quize').addEventListener('click', function () {
  document.querySelector('.info').style.display = "none";
  document.querySelector('.content').style.display = "none";
  document.querySelector('.correction').style.display = "block";
  document.querySelector('.correction').classList.add('clicked');
  document.querySelector('.score').style.display = "none";
  document.querySelector('.three').classList.remove('current-item');
});

function remove_active_all() {
  var answers = document.querySelectorAll('.content form p');
  answers.forEach(function (ans) {
    ans.classList.remove('chicked');
  });
}

function load_quiz(question, a, b, c, d) {
  deselect_answer();
  question_ele.innerHTML = question;
  answer_a.innerHTML = a;
  answer_b.innerHTML = b;
  answer_c.innerHTML = c;
  answer_d.innerHTML = d;
}

function getSelectAnswer() {
  var my_answer;
  answers_all.forEach(function (answer) {
    if (answer.checked) {
      my_answer = answer.id;
      my__answer.push(my_answer);
      console.log(my__answer);
    }
  });
  return my_answer;
}

function deselect_answer() {
  answers_all.forEach(function (answer) {
    answer.checked = false;
  });
}

function bullits(len) {
  for (var i = 0; i < len; i++) {
    var pagination_item = document.createElement('li');
    pagination_item.setAttribute('data-index', i);
    ul__bar.append(pagination_item);
  }
}

function active_progrees() {
  var li = ul__bar.querySelectorAll('li'); //console.log(li)

  li[current_quiz].classList.add('active');
}

document.querySelector('form').onsubmit = function (e) {
  e.preventDefault();
};

function fetch_resultant(data, answers) {
  var corrections = document.querySelector('.correction');
  var r = 0;

  for (var i = 0; i < data.length; i++) {
    if (answers[i] != data[i].correct) {
      corrections.innerHTML += "\n        <div class=\"question\">\n        <p># ".concat(data[i].question, "</p>\n        <ul class=\"ul__list\">\n            <li class=\"").concat(answers[i] == 'a' ? 'incorrect' : '', " ").concat(data[i].correct == 'a' ? 'correct' : '', " \">").concat(data[i].a, "</li>\n            <li class=\"").concat(answers[i] == 'b' ? 'incorrect' : '', " ").concat(data[i].correct == 'b' ? 'correct' : '', "\">").concat(data[i].b, "</li>\n            <li class=\"").concat(answers[i] == 'c' ? 'incorrect' : '', " ").concat(data[i].correct == 'c' ? 'correct' : '', "\">").concat(data[i].c, "</li>\n            <li class=\"").concat(answers[i] == 'd' ? 'incorrect' : '', " ").concat(data[i].correct == 'd' ? 'correct' : '', "\">").concat(data[i].d, "</li>\n            <li class=\"exp\">\n                ").concat(data[i].Explication, "\n            </li>\n        </ul>\n    </div>\n        \n        ");
    }
  }
}