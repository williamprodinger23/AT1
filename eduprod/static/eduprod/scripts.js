document.addEventListener("DOMContentLoaded", function() {
    let currentQuestionIndex = 0;
    const questions = JSON.parse(document.getElementById('content').getAttribute('data-questions'));
    const content = document.getElementById('content');
    const btn = document.getElementById('revealBtn');
    var corranswer = questions[currentQuestionIndex].fields.correct_Answer;

    function displayQuestion() {
        if (currentQuestionIndex < questions.length) {
            const question = questions[currentQuestionIndex].fields.question;
            content.innerHTML = `<div class='question'>Question: ${question}</div>`;
            for (let i = 1; i <= 4; i++){
                var dir = "answer_" + i
                var selectedquestion = questions[currentQuestionIndex]
                var selectedanswers = selectedquestion.fields[dir]
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
            var corranswer = questions[currentQuestionIndex].fields.correct_Answer;
            content.innerHTML = content.innerHTML + `<p class = "answer">Answer: ${corranswer}</p>`
            content.querySelector(".answer").style.display = "none";
            btn.textContent = "Submit Answer";
        } else {
            content.innerHTML = "No more questions.";
            btn.style.display = "none";
        }
    }

    displayQuestion();

    btn.addEventListener("click", function() {
        const answerElement = content.querySelector('.answer');
        if (btn.textContent === "Submit Answer") {
            answerElement.style.display = "block";
            btn.textContent = "Next Question";
            var selected = content.querySelector("input[name='rad']:checked");
            var correct = selected.getAttribute("data-answer")
            window.alert(`${correct}`)
            if (correct == 'true'){
                const pardiv = content.querySelector("#" + selected.parentElement.id);
                pardiv.style.color = "green";
            } else {
                const pardiv = content.querySelector("#" + selected.parentElement.id);
                pardiv.style.color = "red";
                const correctdiv = content.querySelector("#rad" + corranswer)
                correctdiv.style.color = "green";
            }
        } else {
            currentSelected = 0;
            currentQuestionIndex++;
            displayQuestion();
        }
    });
    
});