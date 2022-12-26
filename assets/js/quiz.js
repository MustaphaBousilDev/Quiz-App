//let yourname=prompt('What is your name ?')
//if(yourname==null || yourname==''){
//window.location.href="quiz.html"
//}
document.querySelector('.info').style.display="block"
document.querySelector('.content').style.display="none"
document.querySelector('.correction').style.display="none"
document.querySelector('.score').style.display="none"


let answers_all=document.querySelectorAll('.answer')
let question_ele=document.querySelector('#question')
let answer_a=document.querySelector('#a_text')
let answer_b=document.querySelector('#b_text')
let answer_c=document.querySelector('#c_text')
let answer_d=document.querySelector('#d_text')
let btn_next_q=document.querySelector('.btn__next')
let ul__bar=document.querySelector('.ul__progress_bar')
let ul_li=document.querySelectorAll('.ul__progress_bar li')
let li_item=Array.from(ul_li)
console.log(ul_li)


let score=0
let current_quiz=0

let answers=document.querySelectorAll('.content form p')
let answers_list=Array.from(answers)

/////////////////////////////////////////////////////////
var xmlhttp = new XMLHttpRequest();
var url = "data.json";
let data=[];
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        data=myArr
        //console.log(data[0])
        let question=data[current_quiz].question 
        let a=data[current_quiz].a 
        let b=data[current_quiz].b 
        let c=data[current_quiz].c 
        let d=data[current_quiz].d
        load_quiz(question,a,b,c,d);
        
        //create li progress bare
        bullits(data.length);
        active_progrees()
        
    }
};

xmlhttp.open("GET", url,true);
xmlhttp.send();



///////////////////////////////////////////////////////////

btn_next_q.addEventListener('click',function(e){
    let answer=getSelectAnswer();
    console.log(answer)
    console.log(data.length)
    if(answer){
        if(answer===data[current_quiz].correct){
            score++;
        }
        current_quiz++;
        //active_progrees()
        if(current_quiz < data.length){
            active_progrees()
            let question=data[current_quiz].question 
            let a=data[current_quiz].a 
            let b=data[current_quiz].b 
            let c=data[current_quiz].c 
            let d=data[current_quiz].d
            load_quiz(question,a,b,c,d);
        }else{
            document.querySelector('.content').style.display="none"
            document.querySelector('.info').style.display="none"
            document.querySelector('.score').style.display="block"
            document.querySelector('.correction').style.display="none"
            document.querySelector('.two').classList.remove('current-item')
            document.querySelector('.quiz__score').innerHTML=`Your Answer Correctly${score}/${data.length}`
        }
    }
})







document.querySelector('.btn_start_quiz').addEventListener('click',()=>{
    document.querySelector('.content').style.display="block"
    document.querySelector('.info').style.display="none"
    document.querySelector('.one').classList.remove('current-item')
    
    document.addEventListener('click',function(e){
        if(e.target.classList.contains('paragraph')){
            remove_active_all()
            e.target.classList.add('chicked')
            
        }else{
            remove_active_all()
            e.target.parentElement.classList.add('chicked')
        }
    })
    //console.log(answers)
    //document.querySelector('.content').innerHTML=``
    
})



document.querySelector('.correction_quize').addEventListener('click',()=>{
    document.querySelector('.info').style.display="none"
    document.querySelector('.content').style.display="none"
    document.querySelector('.correction').style.display="block"
    document.querySelector('.score').style.display="none"
    document.querySelector('.three').classList.remove('current-item')
})



function remove_active_all(){
    let answers=document.querySelectorAll('.content form p')
    answers.forEach((ans)=>{
        ans.classList.remove('chicked')
    })
}

function load_quiz(question,a,b,c,d){
    deselect_answer();
    question_ele.innerHTML=question 
    answer_a.innerHTML=a 
    answer_b.innerHTML=b 
    answer_c.innerHTML=c 
    answer_d.innerHTML=d 
}

function getSelectAnswer(){
    let my_answer;
    answers_all.forEach((answer)=>{
        if(answer.checked){
            my_answer=answer.id 
            //console.log(my_answer)
        }
    })
    return my_answer 
}
function deselect_answer(){
    answers_all.forEach((answer)=>{
        answer.checked=false 
    })
}

function bullits(len){
    for(let i=0;i<len;i++){
        let pagination_item=document.createElement('li')
        pagination_item.setAttribute('data-index',i)
        ul__bar.append(pagination_item)
    }
}


    function active_progrees(){
        let li=ul__bar.querySelectorAll('li')
        console.log(li)
        li[current_quiz].classList.add('active')
    }




document.querySelector('form').onsubmit=function(e){
    e.preventDefault()
}
