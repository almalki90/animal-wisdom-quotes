document.addEventListener('DOMContentLoaded', () => {
    const quoteDisplay = document.getElementById('quote-display');
    const quoteAnimal = document.getElementById('quote-animal');
    const quoteSource = document.getElementById('quote-source');
    const newQuoteBtn = document.getElementById('new-quote-btn');

    let quotes = [];
    let currentQuoteIndex = -1;

    async function fetchQuotes() {
        try {
            // محاولة جلب الملف من مسارات مختلفة
            const paths = [
                '../quotes.json',
                './quotes.json',
                '/animal-wisdom-quotes/quotes.json',
                'https://raw.githubusercontent.com/almalki90/animal-wisdom-quotes/master/quotes.json'
            ];

            let response;
            for (const path of paths) {
                try {
                    response = await fetch(path);
                    if (response.ok) {
                        quotes = await response.json();
                        console.log(`Successfully loaded quotes from: ${path}`);
                        displayRandomQuote();
                        return;
                    }
                } catch (e) {
                    console.log(`Failed to load from ${path}`);
                }
            }

            throw new Error('Could not load quotes from any source');
        } catch (error) {
            console.error('Error fetching quotes:', error);
            quoteDisplay.textContent = 'تعذر تحميل الحكم. يرجى إعادة تحميل الصفحة.';
            quoteAnimal.textContent = '';
            quoteSource.textContent = '';
        }
    }

    function displayRandomQuote() {
        if (quotes.length > 0) {
            currentQuoteIndex = Math.floor(Math.random() * quotes.length);
            const randomQuote = quotes[currentQuoteIndex];
            
            quoteDisplay.textContent = randomQuote.quote || 'لا توجد حكمة.';
            quoteAnimal.textContent = randomQuote.animal || 'حيوان';
            quoteSource.textContent = randomQuote.source || '';
            
            // إضافة تأثير الظهور
            quoteDisplay.style.animation = 'none';
            setTimeout(() => {
                quoteDisplay.style.animation = 'fadeIn 0.6s ease';
            }, 10);
        } else {
            quoteDisplay.textContent = 'لا توجد حكم لعرضها.';
            quoteAnimal.textContent = '';
            quoteSource.textContent = '';
        }
    }

    newQuoteBtn.addEventListener('click', displayRandomQuote);

    // تحميل الحكم عند تحميل الصفحة
    fetchQuotes();
});
