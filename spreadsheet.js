let updated;
const sheetHeaders = [
  "type: ",
  ", sourcename: ",
  ", sourcelink: ",
  ", moneyamount: ",
  ", descriptionincode:",
  ", applytext: ",
  ", applylink: ",
];

async function getSpreadsheetData() {
  const response = await fetch(
    "https://spreadsheets.google.com/feeds/list/1lGbwUsEVuwUH2a8BzXMu2FOSk5X5TvBsmXjSWhkQVv4/od6/public/basic?alt=json"
  );
  const json = await response.json();
  updated = json.feed.updated.$t;
  makeCards(json.feed.entry);
}

function makeCards(sheetRows) {
  console.log(sheetRows);
  for (let rowIndex in sheetRows) {
    let benefitDetails = {};
    benefitDetails.title = sheetRows[rowIndex].title.$t;
    let content = sheetRows[rowIndex].content.$t;

    benefitDetails.type = content.substring(
      content.indexOf(sheetHeaders[0]) + sheetHeaders[0].length,
      content.indexOf(sheetHeaders[1])
    );
    benefitDetails.sourceName = content.substring(
      content.indexOf(sheetHeaders[1]) + sheetHeaders[1].length,
      content.indexOf(sheetHeaders[2])
    );
    benefitDetails.sourceLink = content.substring(
      content.indexOf(sheetHeaders[2]) + sheetHeaders[2].length,
      content.indexOf(sheetHeaders[3])
    );
    benefitDetails.moneyAmount = content.substring(
      content.indexOf(sheetHeaders[3]) + sheetHeaders[3].length,
      content.indexOf(sheetHeaders[4])
    );
    benefitDetails.description = content.substring(
      content.indexOf(sheetHeaders[4]) + sheetHeaders[4].length,
      content.indexOf(sheetHeaders[5])
    );
    benefitDetails.applyText = content.substring(
      content.indexOf(sheetHeaders[5]) + sheetHeaders[5].length,
      content.indexOf(sheetHeaders[6])
    );
    benefitDetails.applyLink = content.substring(
      content.indexOf(sheetHeaders[6]) + sheetHeaders[6].length,
      content.indexOf(content.length)
    );
    console.log(benefitDetails);
  }
}

function splitString() {
  let amount;
  let description;
  let apply;
}

let cardTemplate = `
  <div class="benefits-card">
          <div class="benefits-card-title"></div>
          <div class="benefits-card-type"></div>
          <div class="benefits-card-amount"></div>
          <div class="benefits-card-description"></div>
          <div class="benefits-card-apply"></div>
        </div>
`;

getSpreadsheetData();
