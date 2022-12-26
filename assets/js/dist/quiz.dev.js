"use strict";

//let yourname=prompt('What is your name ?')
//if(yourname==null || yourname==''){
//window.location.href="quiz.html"
//}
document.querySelector('.info').style.display = "block";
document.querySelector('.content').style.display = "none";
document.querySelector('.correction').style.display = "none";
document.querySelector('.score').style.display = "none";
var answers_all = document.querySelectorAll('.answer');
var question_ele = document.querySelector('#question');
var answer_a = document.querySelector('#a_text');
var answer_b = document.querySelector('#b_text');
var answer_c = document.querySelector('#c_text');
var answer_d = document.querySelector('#d_text');
var btn_next_q = document.querySelector('.btn__next');
var ul__bar = document.querySelector('.ul__progress_bar');
var ul_li = document.querySelectorAll('.ul__progress_bar li');
var li_item = Array.from(ul_li);
console.log(ul_li);
var score = 0;
var current_quiz = 0;
var answers = document.querySelectorAll('.content form p');
var answers_list = Array.from(answers); /////////////////////////////////////////////////////////

var xmlhttp = new XMLHttpRequest();
var url = "data.json";
var data = [];

xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var myArr = JSON.parse(this.responseText);
    data = myArr; //console.log(data[0])

    var question = data[current_quiz].question;
    var a = data[current_quiz].a;
    var b = data[current_quiz].b;
    var c = data[current_quiz].c;
    var d = data[current_quiz].d;
    load_quiz(question, a, b, c, d); //create li progress bare

    bullits(data.length);
    active_progrees();
  }
};

xmlhttp.open("GET", url, true);
xmlhttp.send(); ///////////////////////////////////////////////////////////

btn_next_q.addEventListener('click', function (e) {
  var answer = getSelectAnswer();
  console.log(answer);
  console.log(data.length);

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
      my_answer = answer.id; //console.log(my_answer)
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
  var li = ul__bar.querySelectorAll('li');
  console.log(li);
  li[current_quiz].classList.add('active');
}

document.querySelector('form').onsubmit = function (e) {
  e.preventDefault();
};