class Quiz {
  constructor() {
    this.questions = [
      {
        question: "Which famous game board does NOT have 64 squares?",
        options: ["Checkers", "Othello", "Chess", "Scrabble"],
        answer: "Scrabble"
      },
      {
        question: "Which of these ancestors do you have 64 of?",
        options: [
          "great-great-great-great-grandparents",
          "great-great-grandparents",
          "great-great-great-grandparents",
          "great-great-great-great-great-grandparents"
        ],
        answer: "great-great-great-great-grandparents"
      },
      {
        question: "64 Is the atomic number of what element?",
        options: ["Technetium", "Caesium", "Germanium", "Gadolinium"],
        answer: "Gadolinium"
      },
      {
        question: "What power of 2 equals 64?",
        options: ["2^5", "2^6", "2^8", "2^9"],
        answer: "2^6"
      },
      {
        question: "In which year did the Commodore 64 debut?",
        options: ["1980", "1982", "1984", "1986"],
        answer: "1982"
      },
      {
        question: "Which US state has 64 counties?",
        options: ["Colorado", "Iowa", "New York", "Ohio"],
        answer: "Colorado"
      },
      {
        question:
          "In which year did Paul McCartney (composer of “When I’m Sixty-Four“ turn 64?",
        options: ["2006", "2007", "2008", "2009"],
        answer: "2006"
      },
      {
        question:
          "Which actor was 64 years old when he reprised a famous role many years after the original?",
        options: [
          "Harrison Ford as Indiana Jones in “Indiana Jones and the Kingdom of the Crystal Skull” (2008)",
          "Paul Reubens as Pee-wee Herman in “Pee-wee’s Big Holiday” (2016)",
          "Sylvester Stallone as Rocky Balboa in “Creed” (2005)",
          "Bill Murray as Dr. Peter Venkman in “Ghostbusters: Afterlife” (2021)"
        ],
        answer:
          "Harrison Ford as Indiana Jones in “Indiana Jones and the Kingdom of the Crystal Skull” (2008)"
      },
      {
        question:
          "In approximately what year was the median home price in the USA $64,000?",
        options: ["1965", "1970", "1980", "1975"],
        answer: "1980"
      },
      {
        question:
          "Who was the first US President to be in office at the age of 64?",
        options: [
          "Andrew Jackson",
          "Ronald Reagan",
          "Franklin D. Roosevelt",
          "George W. Bush"
        ],
        answer: "Andrew Jackson"
      }
    ];
    this.shuffledQuestions = this.questions.map((item) => {
      item.userChoice = null;
      return item;
    });
    this.secondsRemaining = 64;
    this.currentIndex = 0;
    this.timer = null;
    this.numberCorrect = 0;

    this.startButton = document.getElementById("start");
    this.landingPage = document.querySelector(".landing");
    this.gamePlayPage = document.querySelector(".gameplay");
    this.gameOverPage = document.querySelector(".game-over");
    this.secondsRemainingEl = document.getElementById("seconds-remaining");
    this.questionTarget = document.querySelector("#question-target");
    this.questionElTemplate = document.getElementById("question-template");
    this.finalScoreEl = document.getElementById("final-score");
    this.recapEl = document.getElementById("recap");
    this.recapOptionTemplate = document.getElementById("recap-option-template");

    this.setupEventListeners();
    this.secondsRemainingEl.textContent = this.secondsRemaining;
  }

  setupEventListeners() {
    this.startButton.addEventListener("click", () => {
      this.startGame();
    });
  }

  startGame() {
    // shuffle the questions
    this.shuffledQuestions = this.shuffle(this.questions);

    this.landingPage.style.display = "none";
    this.displayQuestion();
    this.gamePlayPage.style.display = "block";
    this.startTimer();
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.secondsRemaining--;
      this.secondsRemainingEl.textContent = this.secondsRemaining;
      if (this.secondsRemaining <= 0) {
        this.gameOver();
      }
    }, 1000);
  }

  displayQuestion() {
    this.questionTarget.innerHTML = "";

    const currentQuestion = this.shuffledQuestions[this.currentIndex];
    const questionEl = this.questionElTemplate.content.cloneNode(true);
    const questionText = questionEl.querySelector("#question-text");
    const optionsEl = questionEl.querySelector(".options");
    questionText.textContent = currentQuestion.question;

    const shuffledOptions = this.shuffle(currentQuestion.options);

    shuffledOptions.forEach((option) => {
      const optionEl = document.createElement("button");
      optionEl.textContent = option;
      optionEl.classList.add("option");
      optionEl.addEventListener("click", () => {
        this.checkAnswer(option, currentQuestion.answer);
      });
      optionsEl.appendChild(optionEl);
    });

    this.questionTarget.appendChild(questionEl);
  }

  checkAnswer(selectedAnswer, correctAnswer) {
    this.shuffledQuestions[this.currentIndex].userChoice = selectedAnswer;

    if (selectedAnswer === correctAnswer) {
      this.numberCorrect++;
    }
    if (this.currentIndex < this.shuffledQuestions.length - 1) {
      this.currentIndex++;
      this.displayQuestion();
    } else {
      this.gameOver();
    }
  }

  gameOver() {
    clearInterval(this.timer);
    this.finalScoreEl.textContent = this.numberCorrect + this.secondsRemaining;
    this.gamePlayPage.style.display = "none";

    this.shuffledQuestions.forEach((question, index) => {
      const questionEl = this.questionElTemplate.content.cloneNode(true);
      const questionText = questionEl.querySelector("#question-text");
      const optionsEl = questionEl.querySelector(".options");
      questionText.textContent = question.question;
      const userChoice = question.userChoice;
      const correctAnswer = question.answer;

      question.options.forEach((option) => {
        const optionEl = this.recapOptionTemplate.content.cloneNode(true);

        optionEl.querySelector("button").textContent = option;

        if (userChoice && option === correctAnswer) {
          optionEl.querySelector("i").classList.add("fa-check");
        } else if (
          userChoice &&
          option === userChoice &&
          userChoice !== correctAnswer
        ) {
          optionEl.querySelector("i").classList.add("fa-times");
        }

        if (option === userChoice) {
          optionEl.querySelector("span").innerHTML = "Your&nbsp;Answer";
        } else if (option === correctAnswer) {
          optionEl.querySelector("span").innerHTML = "Correct&nbsp;Answer";
        }

        optionsEl.appendChild(optionEl);
      });
      this.recapEl.appendChild(questionEl);
    });

    this.gameOverPage.style.display = "block";
  }

  shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex]
      ];
    }
    return array;
  }
}

const quiz = new Quiz();
// quiz.gameOver();
