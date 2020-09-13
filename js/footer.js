let footerContent;
let randomNr;
let quote;

(function init() {
  getFooterContent();
  getRandomNumber();
})();

function getFooterContent() {
  footerContent = document.getElementById("footer-content");
}

function getRandomNumber() {
  randomNr = Math.floor(Math.random() * 1643);
}

function insertQuote() {
  footerContent.innerText = quote;
}

function getQuotes() {
  fetch("https://type.fit/api/quotes")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      quote = data[randomNr].text;
    })
    .then(() => {
      if (quote.length < 100) {
        insertQuote();
      }
    });
}

function changeQuote() {
  getRandomNumber();
  getQuotes();
}

export { changeQuote, footerContent };
