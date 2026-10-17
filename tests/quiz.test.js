// Tests use Node's built-in test runner, so nothing needs to be installed.
// Run them with:  npm test
const { test } = require("node:test");
const assert = require("node:assert/strict");
const {
  shuffle,
  isCorrect,
  createQuiz,
  answerQuestion,
  isQuizFinished,
  calculatePercentage,
  isNewBestScore,
  getGrade,
  getFeedbackMessage,
  formatTimeLeft,
} = require("../src/quiz.js");

test("isCorrect returns true for the right answer", () => {
  assert.equal(isCorrect({ answer: 2 }, 2), true);
});

test("isCorrect returns false for a wrong answer", () => {
  assert.equal(isCorrect({ answer: 2 }, 0), false);
});

test("createQuiz returns a new initial state without changing its questions", () => {
  const questions = [{ answer: 1 }];
  const state = createQuiz(questions);

  assert.deepEqual(state, { questions, current: 0, score: 0 });
  assert.notEqual(state, questions);
  assert.notEqual(state.questions, questions);
});

test("answerQuestion records a correct answer and advances without mutating input", () => {
  const state = { questions: [{ answer: 1 }], current: 0, score: 0 };
  const result = answerQuestion(state, 1);

  assert.equal(result.correct, true);
  assert.deepEqual(result.state, { questions: state.questions, current: 1, score: 1 });
  assert.deepEqual(state, { questions: [{ answer: 1 }], current: 0, score: 0 });
  assert.notEqual(result.state, state);
});

test("answerQuestion advances without increasing the score for a wrong answer", () => {
  const state = { questions: [{ answer: 1 }], current: 0, score: 2 };
  const result = answerQuestion(state, 0);

  assert.equal(result.correct, false);
  assert.deepEqual(result.state, { questions: state.questions, current: 1, score: 2 });
  assert.deepEqual(state, { questions: [{ answer: 1 }], current: 0, score: 2 });
});

test("isQuizFinished reports whether all questions have been answered", () => {
  const questions = [{ answer: 0 }];
  assert.equal(isQuizFinished(createQuiz(questions)), false);
  assert.equal(isQuizFinished(answerQuestion(createQuiz(questions), 0).state), true);
  assert.equal(isQuizFinished(createQuiz([])), true);
});

test("calculatePercentage rounds to a whole number", () => {
  assert.equal(calculatePercentage(2, 3), 67);
});

test("calculatePercentage returns 0 when there are no questions", () => {
  assert.equal(calculatePercentage(0, 0), 0);
});

test("isNewBestScore returns true when there is no previous best", () => {
  assert.equal(isNewBestScore(0, null), true);
});

test("isNewBestScore returns true for a higher score", () => {
  assert.equal(isNewBestScore(81, 80), true);
});

test("isNewBestScore returns false for a tied or lower score", () => {
  assert.equal(isNewBestScore(80, 80), false);
  assert.equal(isNewBestScore(79, 80), false);
});

test("shuffle keeps every item and does not change the original array", () => {
  const original = [1, 2, 3, 4, 5];
  const result = shuffle(original);
  assert.deepEqual([...result].sort(), [1, 2, 3, 4, 5]);
  assert.deepEqual(original, [1, 2, 3, 4, 5]);
});

test("getGrade includes the 90% boundary in A", () => {
  assert.equal(getGrade(90), "A");
  assert.equal(getGrade(89), "B");
});

test("getGrade includes the 75% boundary in B", () => {
  assert.equal(getGrade(75), "B");
  assert.equal(getGrade(74), "C");
});

test("getGrade includes the 50% boundary in C", () => {
  assert.equal(getGrade(50), "C");
  assert.equal(getGrade(49), "Keep practicing");
});

test("getFeedbackMessage returns the message for each grade", () => {
  assert.equal(getFeedbackMessage("A"), "Excellent work!");
  assert.equal(getFeedbackMessage("B"), "Good job!");
  assert.equal(getFeedbackMessage("C"), "You can do better!");
  assert.equal(getFeedbackMessage("Keep practicing"), "Keep practicing!");
});

test("formatTimeLeft includes the clock and remaining seconds", () => {
  assert.equal(formatTimeLeft(12), "⏱ 12s");
});

test("formatTimeLeft formats zero seconds", () => {
  assert.equal(formatTimeLeft(0), "⏱ 0s");
});
