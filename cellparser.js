let updatedTime;
const sheetHeaders = ["A", "B", "C", "D", "E", "F", "G", "H"];
let benefits = [];

document.addEventListener("DOMContentLoaded", () => {
  const benefitCards = document.querySelector("#benefits-cards");
  getSpreadsheetData(benefitCards);
});

async function getSpreadsheetData(benefitCards) {
  const response = await fetch(
    "https://spreadsheets.google.com/feeds/cells/1lGbwUsEVuwUH2a8BzXMu2FOSk5X5TvBsmXjSWhkQVv4/od6/public/basic?alt=json"
  );
  const json = await response.json();

  updatedTime = json.feed.updated.$t;
  updatedTime = updatedTime.substring(0, updatedTime.indexOf("T"));
  document.querySelector(
    "#updated-time"
  ).textContent = `Updated on: ${updatedTime}`;
  let benefitDetails = {};
  for (let i = 8; i != json.feed.entry.length; i++) {
    //i = 8 because i don't want the header row
    const cellSerial = json.feed.entry[i].title.$t;
    let cellContent = json.feed.entry[i].content.$t;

    switch (true) {
      case cellSerial.indexOf("A") >= 0:
        benefitDetails.title = cellContent;
        break;
      case cellSerial.indexOf("B") >= 0:
        benefitDetails.type = cellContent;
        break;
      case cellSerial.indexOf("C") >= 0:
        benefitDetails.sourceName = cellContent;
        break;
      case cellSerial.indexOf("D") >= 0:
        benefitDetails.sourceLink = cellContent;
        break;
      case cellSerial.indexOf("E") >= 0:
        benefitDetails.moneyAmount = cellContent;
        break;
      case cellSerial.indexOf("F") >= 0:
        benefitDetails.description = cellContent;
        break;
      case cellSerial.indexOf("G") >= 0:
        benefitDetails.applyText = cellContent;
        break;
      case cellSerial.indexOf("H") >= 0:
        benefitDetails.applyLink = cellContent;
        benefits.push(benefitDetails);
        makeCard(benefitDetails, benefitCards);
        benefitDetails = {};
        break;
    }
  }
}

let order = 0;

function makeCard(benefitDetails, benefitCards) {
  let cardTemplate = `
  <div style="order: ${++order}; background-color:${backgroundColor(
    benefitDetails.type
  )}" class=" hidden benefits-card" id=${lostworkChecker(benefitDetails.type)}>
          <div class="benefits-card-title">${benefitDetails.title}</div>
          <div class="benefits-card-title">Funds: ${
            benefitDetails.moneyAmount
          }</div>
          <div class="benefits-card-type">Type: ${benefitDetails.type}</div>
          <div class="benefits-card-source"> <a href="${undefinedToEmpty(
            benefitDetails.sourceLink
          )}">${undefinedToEmptySource(benefitDetails.sourceName)}</a></div>
          <div class="benefits-card-amount">${undefinedToEmpty(
            benefitDetails.amount
          )}</div>
          <div class="benefits-card-description">${
            benefitDetails.description
          }</div>
          <div class="benefits-card-apply">${createApplyLink(
            benefitDetails.applyLink,
            benefitDetails.applyText
          )}
        </div>
        </div>
`;

  benefitCards.insertAdjacentHTML("afterbegin", cardTemplate);
}

function backgroundColor(type) {
  switch (type) {
    case "Lost income/laid-off":
      return "mistyrose";

    case "Recurring":
      return "lavenderblush";

    case "Renters":
      return "linen";

    case "Recurring":
      return "antiquewhite";

    case "Quarantined":
      return "azure";

    case "Parents":
      return "honeydew";

    case "Students":
      return "seashell";
  }
}

function lostworkChecker(type) {
  if (type == "Lost income/laid-off") {
    return "lostwork";
  } else {
    return type;
  }
}

function undefinedToEmpty(data) {
  if (data == undefined) {
    return "";
  } else {
    return data;
  }
}

function undefinedToEmptySource(link) {
  if (link == undefined) {
    return "";
  } else {
    return "Source: " + link;
  }
}

// function createLink(applyLink) {
//   if (applyLink == undefined) {
//     createLinkEnd = "";
//     return "";
//   } else {
//     createLinkEnd = "</a>";
//     return `<a href="${applyLink}>`;
//   }
// }

function createApplyLink(link, text) {
  if (link == "#") {
    return text;
  } else {
    return `<a href="${link}">${text}</a>`;
  }
}
