document.addEventListener("DOMContentLoaded", () => {
  const questionArea = document.querySelector(".questions");
  questionArea.addEventListener("click", (e) => {
    checkIfInputClicked(e);
  });
});

function checkIfInputClicked(e) {
  if (e.target.nodeName == "INPUT" && e.srcElement.value != "bc") {
    let benefitName = e.srcElement.value;
    removeNoChecksElement();
    revealBenefit(benefitName);
  }
}

function removeNoChecksElement() {
  document.querySelector("#no-checks").classList.add("hidden");
}

function revealBenefit(benefitName) {
  let selectorString = `div#${benefitName}`;
  let elementToToggle = document.querySelectorAll(selectorString);
  for (let index in elementToToggle) {
    elementToToggle[index].classList.toggle("hidden");
  }
}
