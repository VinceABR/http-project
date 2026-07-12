/*
  IT 3203 Project Milestone #2 Quiz Logic
  This script validates the quiz, compares responses with the answer key,
  calculates the final score, displays detailed feedback, and resets the page.
*/

const quizForm = document.getElementById("quiz-form");
const resetButton = document.getElementById("reset-button");
const resultsPanel = document.getElementById("quiz-results");

const answers = {
  q1: "stateless",
  q2: "GET",
  q3: "404",
  q4: "HTTP/3",
  q5: ["TLS", "CDN", "Compression"]
};

function normalizeText(value) {
  return value.trim().toLowerCase();
}

function showFeedback(number, correct, userAnswer, correctAnswer) {
  const feedback = document.getElementById(`feedback-${number}`);
  const question = document.getElementById(`question-${number}`);
  feedback.className = `question-feedback ${correct ? "correct" : "incorrect"}`;
  question.classList.remove("correct-question", "incorrect-question");
  question.classList.add(correct ? "correct-question" : "incorrect-question");
  feedback.innerHTML = `<strong>${correct ? "Correct" : "Incorrect"} — ${correct ? 20 : 0}/20 points.</strong><br>` +
    `Your answer: ${userAnswer || "No answer"}<br>Correct answer: ${correctAnswer}`;
}

quizForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let score = 0;

  const q1Value = document.getElementById("q1").value;
  const q1Correct = normalizeText(q1Value) === answers.q1;
  if (q1Correct) score += 20;
  showFeedback(1, q1Correct, q1Value, "stateless");

  const q2Selected = document.querySelector('input[name="q2"]:checked');
  const q2Value = q2Selected ? q2Selected.value : "";
  const q2Correct = q2Value === answers.q2;
  if (q2Correct) score += 20;
  showFeedback(2, q2Correct, q2Value, "GET");

  const q3Selected = document.querySelector('input[name="q3"]:checked');
  const q3Value = q3Selected ? q3Selected.value : "";
  const q3Correct = q3Value === answers.q3;
  if (q3Correct) score += 20;
  showFeedback(3, q3Correct, q3Value, "404");

  const q4Selected = document.querySelector('input[name="q4"]:checked');
  const q4Value = q4Selected ? q4Selected.value : "";
  const q4Correct = q4Value === answers.q4;
  if (q4Correct) score += 20;
  showFeedback(4, q4Correct, q4Value, "HTTP/3");

  const q5Selected = Array.from(document.querySelectorAll('input[name="q5"]:checked')).map(input => input.value);
  const q5Correct = q5Selected.length === answers.q5.length && answers.q5.every(answer => q5Selected.includes(answer));
  if (q5Correct) score += 20;
  const q5Display = q5Selected.length ? q5Selected.join(", ") : "";
  showFeedback(5, q5Correct, q5Display, "TLS encryption, Content Delivery Networks, and Gzip/Brotli compression");

  const passed = score >= 70;
  const passFail = document.getElementById("pass-fail");
  passFail.textContent = passed ? "PASS" : "FAIL";
  passFail.className = `result-heading ${passed ? "pass" : "fail"}`;
  document.getElementById("total-score").textContent = `Total Score: ${score}/100 (${score}%)`;
  document.getElementById("result-message").textContent = passed
    ? "Great work! You demonstrated a solid understanding of HTTP."
    : "Review the feedback below each question, then reset the quiz and try again.";
  resultsPanel.classList.remove("hidden");
  resultsPanel.focus();
});

resetButton.addEventListener("click", function () {
  quizForm.reset();
  document.querySelectorAll(".question-feedback").forEach(item => {
    item.textContent = "";
    item.className = "question-feedback";
  });
  document.querySelectorAll(".question-card").forEach(item => {
    item.classList.remove("correct-question", "incorrect-question");
  });
  resultsPanel.classList.add("hidden");
  document.getElementById("pass-fail").textContent = "";
  document.getElementById("total-score").textContent = "";
  document.getElementById("result-message").textContent = "";
  window.scrollTo({ top: 0, behavior: "smooth" });
  document.getElementById("q1").focus();
});
