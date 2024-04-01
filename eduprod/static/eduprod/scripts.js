document.addEventListener("DOMContentLoaded", function() {
    //Create Variables
    let currentQuestionIndex = 0;
    const questions = JSON.parse(document.getElementById('content').getAttribute('data-questions'));
    const content = document.getElementById('content');
    const btn = document.getElementById('revealBtn');
    var corranswer = questions[currentQuestionIndex].fields.correct_Answer;
    var score = 0;
    var dir = "";
    var selectedquestion = questions[currentQuestionIndex];
    var selectedanswers = selectedquestion.fields[dir];
    const bar_score = document.getElementById('bar-score')

    function displayQuestion() {
        bar_score.innerHTML = `Score: ${score}`
        if (currentQuestionIndex < questions.length) {
            const question = questions[currentQuestionIndex].fields.question; //Get Question Data
            content.innerHTML = `<div class='question'>Question: ${question}</div>`;
            
            //Show The 4 Answers For Current Question
            for (let i = 1; i <= 4; i++){
                dir = "answer_" + i; 
                selectedquestion = questions[currentQuestionIndex]; 
                selectedanswers = selectedquestion.fields[dir];
                corranswer = parseInt(questions[currentQuestionIndex].fields.correct_Answer); 

                //If The Current Answer Has A Value Then Assign A Variable Saying If It Is Correct Or Not And Draw It To The Screen
                var correctans = false; 
                if (selectedanswers !== null){
                    if (corranswer === i){
                        correctans = true;
                    } else {
                        correctans = false;
                    }
                    content.innerHTML = content.innerHTML + `<div class="option" id = "rad${i}"><input type="radio" name = "rad" value = "${i}" data-answer = "${correctans}">${selectedanswers}</input></div>`
                };
            };

            //Get Correct Answer Value And Add To P Object And Hide It
            //Set Button Text To 'Submit Answer'
            //Add Current Question Index To 'QUIZ' Title
            var tdir = "answer_" + corranswer; 
            const corranswertext = questions[currentQuestionIndex].fields[tdir];
            content.innerHTML = content.innerHTML + `<p class = "answer">The Correct Answer Is: ${corranswertext}</p>`;
            content.querySelector(".answer").style.display = "none";
            btn.textContent = "Submit Answer";
            const title_text = document.querySelector("#bar-title");
            title_text.innerText = `QUIZ:   ${currentQuestionIndex + 1} / ${questions.length}`;
        } else { 
            //No More Questions Then Tell User No More Questions, Ask User If They Want To Try Again And Then Reset Score
            content.innerHTML = `No more questions. Your Final Score Was ${score}, Do You Want To Try Again?`;
            btn.textContent = "Try Again";
            score = 0;
        }
    }

    displayQuestion();

    btn.addEventListener("click", function() { //If Button Is Pressed
        const answerElement = content.querySelector('.answer');
        if (btn.textContent === "Submit Answer") {
            var selected = content.querySelector("input[name='rad']:checked"); //Get Selected Answer
            if (selected != null){ //Is There An Answer Selected
                btn.textContent = "Next Question";
                var correct = selected.getAttribute("data-answer")
                
                //Is Answer Correct, Tell User If They Are Correct Or Not And Increment Score If They Are Correct
                if (correct == 'true'){
                    const pardiv = content.querySelector("#" + selected.parentElement.id);
                    pardiv.style.color = "green";
                    score ++;
                } else {
                    const pardiv = content.querySelector("#" + selected.parentElement.id);
                    pardiv.style.color = "red";
                    const correctdiv = content.querySelector("#rad" + corranswer);
                    correctdiv.style.color = "green";
                    answerElement.style.display = "block";
                }

            } else { //If There No Answer Selected Then Alert User To Select And Answer
                window.alert("An Answer Needs To Be Slected To Submit!")
            }
        } else {
            //If All Questions Are Answers Then Restart To Beginning
            //If There Are More Questions Then Go To Next Question
            if (currentQuestionIndex >= questions.length){
                currentQuestionIndex = 0;
            } else {
                currentQuestionIndex ++;
            }
            displayQuestion();
        };
    });
    
});