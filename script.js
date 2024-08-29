const NextButton = document.getElementById("nextbtn");

NextButton.addEventListener("click", navigateToQuiz);
function navigateToQuiz() {
    window.location.href = 'ChooseType.html';
}