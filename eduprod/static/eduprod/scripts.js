document.addEventListener("DOMContentLoaded", function() {
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
            const question = questions[currentQuestionIndex].fields.question;
            content.innerHTML = `<div class='question'>Question: ${question}</div>`;
            for (let i = 1; i <= 4; i++){
                dir = "answer_" + i;
                selectedquestion = questions[currentQuestionIndex];
                selectedanswers = selectedquestion.fields[dir];
                corranswer = questions[currentQuestionIndex].fields.correct_Answer;
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
            var tdir = "answer_" + corranswer;
            const corranswertext = questions[currentQuestionIndex].fields[tdir];
            content.innerHTML = content.innerHTML + `<p class = "answer">The Correct Answer Is: ${corranswertext}</p>`
            content.querySelector(".answer").style.display = "none";
            btn.textContent = "Submit Answer";
            const title_text = document.querySelector(".bar-title")
            title_text.innerText = `QUIZ:   ${currentQuestionIndex + 1} / ${questions.length}`
        } else {
            content.innerHTML = `No more questions. Your Final Score Was ${score}, Do You Want To Try Again`;
        }
    }

    displayQuestion();

    btn.addEventListener("click", function() {
        const answerElement = content.querySelector('.answer');
        if (btn.textContent === "Submit Answer") {
            var selected = content.querySelector("input[name='rad']:checked");
            if (selected != null){
                btn.textContent = "Next Question";
                var correct = selected.getAttribute("data-answer")
                if (correct == 'true'){
                    const pardiv = content.querySelector("#" + selected.parentElement.id);
                    pardiv.style.color = "green";
                    score ++;
                } else {
                    const pardiv = content.querySelector("#" + selected.parentElement.id);
                    pardiv.style.color = "red";
                    const correctdiv = content.querySelector("#rad" + corranswer)
                    correctdiv.style.color = "green";
                    answerElement.style.display = "block";
                }
            }
        } else {
            currentSelected = 0;
            if (currentQuestionIndex >= questions.length){
                currentQuestionIndex = 0;
            } else {
                currentQuestionIndex ++;
            }
            displayQuestion();
        };
    });
    
});