const questions =[
    { question:"Ən böyük ada hansıdır?",
      options:[
        "A) Kalimantan",
        "B) Qrenlandiya",
        "C) Madaqaskar",
      ],
      answer: "B) Qrenlandiya"
    },
    { question:"Ən böyük göl hansıdır?",
    options:[
      "A) Xəzər",
      "B) Baykal",
      "C) Göygöl",
    ],
    answer: "A) Xəzər"
  },
  { question:"Avropanın ən hündür zirvəsi hansıdır?",
  options:[
    "A) Bazardüzü",
    "B) Monblan",
    "C) Everest",
  ],
  answer: "B) Monblan"
},
{ question:"Dünyanın ən böyük ölkəsi hansıdır?",
options:[
  "A) Rusiya",
  "B) ABŞ",
  "C) Çin",
],
answer: "A) Rusiya"
},
{ question:"Ən uzun çay hansıdır?",
options:[
  "A) Kür",
  "B) Yantszı",
  "C) Nil",
],
answer: "C) Nil"
}
];
class QuestionGame {
    point =0;
    nextQuestionIndex=-1;
    qData = [];
    currentquestion =null;
    questionWeight=null;

    constructor(data){
        this.qData=data;
        this.questionWeight=Math.round(100/this.qData.length)
    }
    incrementPoint(){
        console.log(this.point);
        console.log(this.questionWeight);
        this.point+=this.questionWeight
    }
    nextQuestion(){
        if (this.nextQuestionIndex==this.qData.length-1) {
            console.log('end');
            progressBar.style.width='100%';
            gameOver()
            return false
        } else {
            this.nextQuestionIndex+=1;
            const questionItem=this.qData[this.nextQuestionIndex]
            this.currentquestion=questionItem;
            return questionItem;
        }
    }
}
const game =new QuestionGame(questions);


const pointEl=document.querySelector("#pointEl");
const progressBar=document.querySelector("#progressBar");
const qTitle=document.querySelector("#qTitle");
const btnGroup =document.querySelector("#btnGroup");
let barWidth=0;

function startGame() {
    game.nextQuestion();

    const qObj =game.currentquestion;
    qTitle.innerHTML=(game.nextQuestionIndex+1) + '.'+qObj.question;
    const btnOptions =qObj.options.map((option)=> `
    <button class="btn btn-outline-light" onclick="evaluateAnswers('${option}')">${option}</button>
`
    )
    .join("");
    btnGroup.innerHTML = btnOptions;
}
startGame();

function evaluateAnswers(userOption) {
    const correctAnswer=game.currentquestion.answer;
    const buttons=document.querySelectorAll('#btnGroup button')
    buttons.forEach(button=>{
        const option=button.innerText;
        if (option===userOption) {
            button.classList.remove('btn-outline-light')
            if(userOption===correctAnswer){
                button.classList.add('bg-success')
                game.incrementPoint()
                pointEl.innerHTML=game.point;
            }else{
                button.classList.add('bg-danger')
                buttons.forEach(button=>{
                    if(button.innerText===correctAnswer){
                        button.classList.add('bg-success')
                    }
                })
            }
        }
    })
  
    barWidth+=game.questionWeight;
    progressBar.style.width=barWidth+'%'
    setTimeout(startGame,1000)
}

function gameOver() {
    
    const game_over = document.querySelector('#game_over');
    const questions_block=document.querySelector('#questions_block')

    questions_block.classList.add('d-none');
    game_over.classList.remove('d-none');
    game_over.classList.add('d-block');
}