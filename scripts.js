let questions;
let questionCount;
let pickedQuestionId;
let previouslyDisplayedQuestionIds = [];

if (!localStorage.getItem("previouslyDisplayedQuestionIds")) {
    updatePreviouslyDisplayedQuestionsInLocalStorage();
}

readQuestionsFromFile();

async function readQuestionsFromFile() {
    const request = new Request("./questions.json");
    const response = await fetch(request);
    questions = await response.json();

    updatePreviouslyDisplayedQuestionsList();
}

function getQuestionButtonClick() {
    updatePreviouslyDisplayedQuestionsList();
    questionCount = questions.length;
    const randomlyPickedQuestionId = pickRandomQuestionThatHasntBeenPickedBefore(questionCount);
    const questionToDisplay = questions.find(q => { return q.Id === randomlyPickedQuestionId }).Question;
    document.getElementById("question").innerHTML = questionToDisplay;
}

function updatePreviouslyDisplayedQuestionsInLocalStorage() {
    localStorage.setItem("previouslyDisplayedQuestionIds", JSON.stringify(previouslyDisplayedQuestionIds));
}

function pickRandomQuestionThatHasntBeenPickedBefore(questionCount) {
    do {
        pickedQuestionId = Math.floor(Math.random() * questionCount) + 1;
    } while (previouslyDisplayedQuestionIds.includes(pickedQuestionId));

    previouslyDisplayedQuestionIds.push(pickedQuestionId);
    updatePreviouslyDisplayedQuestionsInLocalStorage();

    return pickedQuestionId;
}

function updatePreviouslyDisplayedQuestionsList() {
    previouslyDisplayedQuestionIds = JSON.parse(localStorage.getItem("previouslyDisplayedQuestionIds"));

    if (!previouslyDisplayedQuestionIds[0]){
        return;
    }
    else{
        console.log("display");
        document.getElementById("history").style.display = "block";
    }
        

    let previouslyDisplayedQuestionsList = document.getElementById("previouslyDisplayedQuestionsList");
    previouslyDisplayedQuestionsList.innerHTML = "";

    for (const id of previouslyDisplayedQuestionIds) {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(questions.find(q => { return q.Id === id }).Question));
        previouslyDisplayedQuestionsList.appendChild(li);
    }
}

function clearHistory(){
    localStorage.setItem("previouslyDisplayedQuestionIds", JSON.stringify([]));
    location.reload();
}