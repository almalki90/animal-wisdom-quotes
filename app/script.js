document.addEventListener('DOMContentLoaded', () => {
    const quoteDisplay = document.getElementById('quote-display');
    const quoteSource = document.getElementById('quote-source');
    const newQuoteBtn = document.getElementById('new-quote-btn');

    let quotes = [];

    async function fetchQuotes() {
        try {
            const response = await fetch('../quotes.json');
            quotes = await response.json();
            displayRandomQuote();
        } catch (error) {
            console.error('Error fetching quotes:', error);
            quoteDisplay.textContent = 'تعذر تحميل الحكم.';
        }
    }

    function displayRandomQuote() {
        if (quotes.length > 0) {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            const randomQuote = quotes[randomIndex];
            quoteDisplay.textContent = `\"${randomQuote.quote}\"` || 'لا توجد حكمة.';
            quoteSource.textContent = `- ${randomQuote.animal} (${randomQuote.source})` || '';
        } else {
            quoteDisplay.textContent = 'لا توجد حكم لعرضها.';
            quoteSource.textContent = '';
        }
    }

    newQuoteBtn.addEventListener('click', displayRandomQuote);

    fetchQuotes();
});

// API Endpoint Simulation (for demonstration on GitHub Pages)
// The quotes.json file itself will serve as the primary API endpoint.
// For more advanced API features (e.g., filtering, single quote by ID),
// a server-side component would be needed, which is beyond static GitHub Pages.
// Users can directly access: [YOUR_GITHUB_PAGES_URL]/quotes.json
