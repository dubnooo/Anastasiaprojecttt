document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "Покажи героя, який має ультимейт Black Hole?",
            answers: [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrDzbelpRh1h8NU8N_FNL3HLzNn2js8sBnVw&s", 
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqNJksFyrcstxpwlbi9F-UDsEltywgpSKFwg&s", 
                 "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnMDTrOYz1a4RQoJiqhu69A1u0xwkewphO5g&s", 
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIvNU7heq9evj2TA2FGrn4naxFKYgvSkGOPg&s"  
            ],
            correct: 1,
            isImageQuiz: true
        },
        {
            question: "Покажи героя-лучника (range carry), який часто грає на легкій лінії?",
            answers: [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThVOm66mt-3vlenXrg9xqVU6pgfTMDUfJMew&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZL3jCAXeZ3bb08HibnL4mWRC-UckKrQ34Yg&s",
                "https://files.bo3.gg/uploads/image/62816/image/webp-df1f85bed68507f1d594a4ace8a2cbb6.webp", 
                "https://games.24tv.ua/resources/photos/news/202011/1471829.jpg?v=1661266709000"  
            ],
            correct: 3,
            isImageQuiz: true
        },
        {
            question: "Покажи героя, який може ставати невидимим без предметів?",
            answers: [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcM1LK2MUjQssvM4nVTOkQpjwshJzh1brWqg&s",
                "https://cdn.fastly.steamstatic.com/apps/dota2/images/workshop/guidelines/smeevil_crop.jpg?v=1459382400", 
                "https://img.redbull.com/images/c_fill,g_auto,w_400,h_294/q_auto,f_auto/redbullcom/2017/06/23/1331860782206_3/dota-2-esports-hero-underlord", 
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKYortP3Mhm_1u8IZnNpVaHTvRiJlgYnlesg&s"  
            ],
            correct: 2,
            isImageQuiz: true
        },
        {
            question: "Покажи героя, який може створювати свої копії (ілюзії)",
            answers: [
               "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbo1RbyMNmSa9nPgoVSywi2eaYoHjqd1ijtA&s", 
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_Z6sZAU4AKwN6sYF5s9OkTMiTlMpKqDwQ0Q&s", 
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJkubVpw5qWPGTcJCAQjjTMQeiYab7o2oTyg&s", 
                "https://i.pinimg.com/736x/f5/5b/f8/f55bf83da2ceffcd4e842d23b64fd60e.jpg"  
            ],
            correct: 0,
            isImageQuiz: true
        },
        {
            question: "Покажи героя, який має здатність перевертати час назад",
            answers: [
               "https://files.bo3.gg/uploads/image/62818/image/webp-d3ddbef23c3a2656c44e00df967bb7d6.webp", 
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpU_H7a50kGR2PCtE6mj3FrPFZ86YnEqghdQ&s", 
                "https://cdn.steamstatic.com/apps/dota2/images/dota_react/largo/largo_header.jpg", 
                "https://cdna.artstation.com/p/assets/images/images/033/142/958/large/matt-knifton-111.jpg?1608560679" 
            ],
            correct: 0,
            isImageQuiz: true
        }
    ];

    const startScreen = document.querySelector('#start-screen');
    const quizScreen = document.querySelector('#quiz-screen');
    const resultScreen = document.querySelector('#result-screen');
    const startBtn = document.querySelector('#start-btn');
    const restartBtn = document.querySelector('#restart-btn');
    const resultText = document.querySelector('.result-text');
    const questionText = document.querySelector('#question-text');
    const answersContainer = document.querySelector('#answers-container');
    const timerDisplay = document.querySelector('#timer');
    const scoreL = document.querySelector('#score-display');
    const finalScoreDisplay = document.querySelector('#final-score');

    let questionIndex = 0;
    let score = 0;
    let timer = 15;
    let interval;

    function showQuestion(question) {
        clearInterval(interval);
        startTimer();

        answersContainer.innerHTML = '';
        questionText.innerText = question.question;

        question.answers.forEach((answer, i) => {
            const button = document.createElement('button');
            button.classList.add('answer-btn');

            if (question.isImageQuiz) {
                const img = document.createElement('img');
                img.src = answer;
                button.appendChild(img);
                button.classList.add('image-option');
            } else {
                button.innerText = answer;
            }

            button.addEventListener('click', () => checkAnswer(button, i));
            answersContainer.appendChild(button);
        });
    }

    function checkAnswer(button, i) {
        clearInterval(interval);
        const correct = questions[questionIndex].correct;
        
        if (i === correct) {
            score++;
            button.classList.add('correct');
        } else {
            button.classList.add('wrong');
        }

        document.querySelectorAll('.answer-btn').forEach(btn => btn.disabled = true);
        setTimeout(nextQuestion, 1000);
    }

    function nextQuestion() {
        questionIndex++;
        if (questionIndex < questions.length) {
            showQuestion(questions[questionIndex]);
        } else {
            showResult();
        }
    }

    function showResult() {
        quizScreen.classList.add('hide');
        resultScreen.classList.remove('hide');
        const accuracy = Math.round((score / questions.length) * 100);
        resultText.innerText = `Твій результат: ${accuracy}%`;
        finalScoreDisplay.innerText = score;
    }

    function startTimer() {
        timer = 15;
        timerDisplay.innerText = `Час: ${timer}`;
        scoreL.innerText = `Бали: ${score}`;
        interval = setInterval(() => {
            timer--;
            timerDisplay.innerText = `Час: ${timer}`;
            if (timer <= 0) {
                clearInterval(interval);
                nextQuestion();
            }
        }, 1000);
    }

    function startGame() {
        startScreen.classList.add('hide');
        resultScreen.classList.add('hide');
        quizScreen.classList.remove('hide');
        questionIndex = 0;
        score = 0;
        showQuestion(questions[questionIndex]);
    }

    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', startGame);
});

function createDollar() {
    const container = document.getElementById('money-container');
    const dollar = document.createElement('div');
    
    dollar.innerText = '🔪'; // Можна замінити на '💰' або '💸'
    dollar.classList.add('dollar');
    
    // Випадкова позиція від 0 до 100% ширини екрана
    dollar.style.left = Math.random() * 100 + 'vw';
    
    // Випадкова тривалість падіння від 3 до 7 секунд
    const duration = Math.random() * 4 + 3;
    dollar.style.animationDuration = duration + 's';
    
    // Випадковий розмір (щоб була перспектива)
    dollar.style.fontSize = Math.random() * 20 + 20 + 'px';

    container.appendChild(dollar);

    // Видаляємо елемент після завершення анімації, щоб не перевантажувати пам'ять
    setTimeout(() => {
        dollar.remove();
    }, duration * 1000);
}

// Запускаємо створення доларів кожні 300 мс
setInterval(createDollar, 300);

