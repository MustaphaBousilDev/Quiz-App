let quiz_intro=document.querySelector('.quiz__intro');
let heading=quiz_intro.querySelector('.heading')
let myText="Hello in Quiz JavaScript"

console.log(heading)

let i=0
    let typeWraper=setInterval(function(){
        heading.innerHTML+=myText[i]
        i=i+1;
        if(i>myText.length - 1){
            clearInterval(typeWraper)
        }
    },100)


