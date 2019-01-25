var prefix = "https://cors-anywhere.herokuapp.com/";
var tweetLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

function getQuote() {
    document.querySelector('.quote').innerText = '';
    document.querySelector('.author').innerText = ' ';
    document.querySelector('.spinner').classList.add('show');
    fetch(prefix + quoteUrl, { cache: "no-store" })
        .then(function(resp) {
            return resp.json();
        })
        .then(createTweet);
}

function createTweet(input) {
    var data = input[0];

    var dataElement = document.createElement('div');
    dataElement.innerHTML = data.content;
    var quoteText = dataElement.innerText.trim();
    var quoteAuthor = data.title;

    if (!quoteAuthor.length) {
        quoteAuthor = "Unknown author";
    }

    var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;

    if (tweetText.length > 140) {
	    getQuote();
	} 

	else {
	    var tweet = tweetLink + encodeURIComponent(tweetText);
	    document.querySelector('.quote').innerText = quoteText;
        document.querySelector('.spinner').classList.remove('show');
	    document.querySelector('.author').innerText = "Author: " + quoteAuthor;
	    document.querySelector('.tweet').setAttribute('href', tweet);
	}

}

//showing quote from the start
getQuote();

//adding changing quote event on button
document.querySelector('.trigger').addEventListener('click', function() {
    getQuote();
});


/* ---------------------SPINER------------------------ */

const dot1 = document.querySelector('.dot1');
const dot2 = document.querySelector('.dot2');
let hue = 0;

const adjustBgCol = () => {
  dot1.style.backgroundColor = 'hsl(' + hue + ',50%,50%)';
  dot2.style.backgroundColor = 'hsl(' + hue + ',50%,50%)';
}



setInterval(function(){ 
  hue++;
  adjustBgCol();
}, 15);