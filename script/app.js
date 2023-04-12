const msg=document.querySelector('.msg');
const guess=document.querySelector('input');
const btn=document.querySelector('.btn');
const rLoad=document.querySelector('.reLoad');
const btnn=document.querySelector('.btnn');
const ansBtn=document.querySelector('.ansBtn');
const ansHidden=document.querySelector('.ansHidden');
const scr=document.querySelector('.scr');
const seeAnsHidden=document.querySelector('.seeAnsHidden');
const gameArea=document.querySelector('.gameArea');
const scoreArea=document.querySelector('.scoreArea');
const quitBtn=document.querySelector('.quitBtn');
let newWord;
let scrCounter=0;
let randomIndexGenerate;
let play=false;
let sWords=[];
btn.addEventListener("click",function(){
    if(!play){
        play=true;
        btn.innerHTML="Guess";
        guess.classList.toggle('hidden');
        rLoad.classList.toggle('btnHidden');
        ansBtn.classList.toggle('seeAnsHidden');
        textList();
        guess.focus();
    }
    else{
        if(newWord.toLowerCase()===guess.value.toLowerCase()){
            play=false;
            msg.innerHTML=`Awesome It's Correct. It is ${newWord}`;
            btn.innerHTML="Play Again";
            guess.classList.toggle('hidden');
            guess.value="";
            rLoad.classList.toggle('btnHidden');
            ansHidden.classList.toggle('ansHidden');
            seeAnsHidden.classList.toggle('seeAnsHidden');
            guess.style.background="#dff9fb";
            scoreUpdate();
        }else if(guess.value!=""){
            msg.innerHTML=`Sorry it was Incorrect. Please Try Again ${randWord.join("")}`;
            guess.focus();
            guess.select();
        }else{
            guess.style.background="#e7b8b8";
            guess.focus();
        }
    }
})
rLoad.addEventListener('click',function(){
    if(rLoad.value!="undefined"){
        textList(); 
        guess.style.background="#dff9fb";  
        guess.focus();  
    }else{
        setInterval(()=>{
            ansHidden.classList.toggle('ansHidden');
            ansHidden.innerHTML="First Click To Start Button!";
        },5000)
    }  
})
ansBtn.addEventListener('click',function(){
    if(play!==false){
    ansHidden.classList.toggle('ansHidden');
    ansHidden.innerHTML=newWord;
    guess.focus();
        setInterval(()=>{
            ansHidden.classList.toggle('ansHidden');
            ansHidden.innerHTML="";
        },5000)
    }
})
const createNewWords = () =>{
    let randomNum =Math.floor(Math.random() * sWords.length);
    let nuwTempSwords=sWords[randomNum];
    return nuwTempSwords;
}
const scrambledWord = (text) =>{
    for(let i=text.length-1; i>=0 ;i-- ){
        let temp=text[i];
        let j=Math.floor(Math.random() * (i+1));
        text[i]=text[j];
        text[j]=temp;
    }
    return text;
}
const scoreUpdate= () =>{
    scrCounter++;
    scr.innerHTML="Your Score is:: "+scrCounter;
}
const textList = () =>{
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'city.json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            let data = JSON.parse(xhr.responseText);
            for (let key in data) {
                let value = data[key];
                sWords.push([key,value.city]);
            }
            randomIndexGenerate=Math.floor(Math.random()*(65-0)+0);
            console.log(randomIndexGenerate);
            newWord=sWords[randomIndexGenerate][1];
            console.log(newWord.toLowerCase());
            newWord=newWord.toLowerCase();
            randWord=scrambledWord(newWord.split(""));
            txt=randWord.join("")
            msg.innerHTML="Your Scrambled Text is:: "+ txt.toLowerCase();
        } else {
            guess.classList.toggle('hidden');
            btn.innerHTML="Click To Start Again";
            msg.innerHTML='Error Occur Refresh Page';
            play=false;
        }
    };
    xhr.send();
}
quitBtn.addEventListener('click',function(){
   window.close(); 
})

