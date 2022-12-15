const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("quote-author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function loadingComplete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

function newQuote() {
  // Pick random quote from apiQuotes
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // If quote is very long, apply class with smaller font-size
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.innerText = quote.text;

  //   Check if author field is blank, replace with "Unknown" if so
  authorText.innerText = !quote.author ? "Unknown" : quote.author;
}

// Get Quotes from API
async function getQuotes() {
  const apiURL = "https://type.fit/api/quotes";

  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    newQuote();
    loadingComplete();
  } catch (err) {}
}

function tweetQuote() {
  const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterURL, "_blank");
}

// On page load
loading();
getQuotes();

// On DOMContent Loaded
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
