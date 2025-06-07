class QuotesAudioApp {
    constructor() {
        // Initialize properties
        this.quotes = [
            {
                id: "I",
                text: `Yes, Gregory, yes, it's that face, the faceless body, no, the face without a body, the face you see even at the university, yes, yes, Gregory, that face that no longer belongs to that person, but to your mind. Yes, that's how it is, Gregory.

And it's as if you wanted to stop seeing it in people, but you still see it, it's geometric, yes, indeed it is, but more than that, well, it has the shape of her face (yes, hers, yes, indeed it's hers, Gregory).

And on the wall, in black ink, it read:
The world
is crumbling
but in the shape
of a square`
            },
            {
                id: "II",
                text: `That technique of writing 1 short story,
then 1 novel,
and subsequently 1 comedy,
was a family tradition
(...)
Reliable sources say
(collected from Edmundo's texts in the New World)
that Wagner's nightmares had been nothing more than an enchantment
from the non-demiurge and the evils of death,
and the comedy he didn't write [...]`
            },
            {
                id: "Supplizio",
                text: `
The man stated
that his wife
had been
the purest woman
in the narrative
According to the Honest Ones,
that woman knew
the unknown paths,
the colors of bottles,
the flavors of a "Forbidden Kiss"
(which is probably a black and white movie)
Or simply the variant of a poorly delivered speech`
            },
            {
                id: "INFIERNO XIII",
                text: `
The enigma of the just
was denied by the Heaven's dreamer
and, after six nights,
there was no record of fantasies;
your mother's torments and the cries of the stars
have not aged like wine,
neither in Hell nor in our memories.`
            },
            {
                id: "IV",
                text: `
The Sky could be imagined
as an electronic sound
or, if we are to be fair,
as something fictitious.
But solitude cannot be fair,
because the "Other" exists (who denies it at once)
and is the most coveted by men:
HELL.`
            },
            {
                id: "V",
                text: `
On this morning
that has no fog,
we are real
like an old song,
but if we awaken
we wouldn't even know the name.`
            },
            {
                id: "VI",
                text: `
I had no choice but to open my backpack, take out the revolver, and shoot him exactly below the left eye. The choice of left or right was nothing more than a whim of a lady who wore red pants, a white shirt, black shoes (probably a luxury brand). Nothing more than a dark desire for a problem that began in the third week of the "Day of Dreams and Absurd Games." It's already dinnertime, and the coffee has no sugar. We hope that of the seven songs we chose the night before, all have lyrics that speak of women and forgotten wars. [...]`
            },
            {
                id: "VII",
                text: `
It was that one could no longer write on the machine in this way because that's what they had told him in that house where everyone wrote like this: "To the rhythm of the triangle to the rhythm of another similar figure (which evidently wasn't a triangle, perhaps it was a black dog or our failure to shine)`
            },
            {
                id: "VIII",
                text: `
If only the Heaven were a bit more sky blue I'd have no reason to live because forms deform in autumns without warning orphanhood that time doesn't return`
            },
            {
                id: "III X III X",
                text: `
He seeks God, but doesn't find Him
Men say that sixteen years have passed
since the Creation
of that rather lucid fragment
of that quite surreal work for a child his age

COMPLETELY
FORBIDDEN
ARE CHRONOLOGIES AND BIBLIOGRAPHIES

The problems
had nothing to do with Mathematics,
Physics, or the science that serves
but is useless for dreams to appear
and be there at night immediate,
irresolvable, and architectural

Fiction was necessary Not to die from that illness: reality.

They'll attend a party and pass a small note under the table, and they'll write something beautiful. It'll be forbidden to include their name and signature (or any kind of link to the author).
They always wondered why this action was performed. "They'll never know," but it has already been told in stories, melodies, and solitary places.`
            },
            {
                id: "XX",
                text: `XX
One cannot articulate language without diagnosis
nor remedies that store diaries dates and almanacs of years forgotten

I've learned from the dreams of a cross
The cross had no name and it was a shameful act`
            },
            {
                id: "1828",
                text: `
Only the eternal dreamer can feel that which they call knowing the demons of Heaven who know how to fly by plane
Those of dreams, those of traditions, myths or legends

Those of phantasmagorical novels of flights from beyond the grave to the Old Continent
And how to forget the geniuses of the pyramids who understood Statistics, the rhythm of the air and the sound of silence

And above all things they found love not in another being (not at all philosophical) but in the rose petals of that tree he planted, the book he didn't write, and the child he didn't have.
He also emphasized a friend he never got to meet.
For he always argued that he had already written everything in his notebook and that he also duplicated it like one of those doors everyone knows how to open or (if they don't know how) they open it using Arithmetic like in an American movie heist that even I don't remember.`
            }
        ];

        this.currentQuoteIndex = 0;
        this.isPlaying = false;
        this.isPaused = false;
        this.currentWordIndex = 0;
        this.words = [];
        this.speechSynthesis = window.speechSynthesis;
        this.currentUtterance = null;
        this.speechRate = 1.0;
        this.highlightColor = '#4f46e5';

        // DOM elements
        this.elements = {
            quoteDisplay: document.getElementById('quoteDisplay'),
            quoteTitle: document.getElementById('quoteTitle'),
            currentQuote: document.getElementById('currentQuote'),
            totalQuotes: document.getElementById('totalQuotes'),
            progressBar: document.getElementById('progressBar'),
            playPauseBtn: document.getElementById('playPauseBtn'),
            stopBtn: document.getElementById('stopBtn'),
            prevBtn: document.getElementById('prevBtn'),
            nextBtn: document.getElementById('nextBtn'),
            highlightColor: document.getElementById('highlightColor'),
            speechRate: document.getElementById('speechRate'),
            speedValue: document.getElementById('speedValue'),
            errorMessage: document.getElementById('errorMessage')
        };

        this.init();
    }

    init() {
        try {
            // Initialize Feather icons
            if (typeof feather !== 'undefined') {
                feather.replace();
            }

            // Set total quotes
            this.elements.totalQuotes.textContent = this.quotes.length;

            // Load first quote
            this.loadQuote(this.currentQuoteIndex);

            // Bind event listeners
            this.bindEvents();

            // Check speech synthesis support
            this.checkSpeechSynthesisSupport();

            // Initialize settings
            this.updateHighlightColor();
            this.updateSpeechRate();

        } catch (error) {
            this.showError('Failed to initialize application: ' + error.message);
        }
    }

    bindEvents() {
        // Audio controls
        this.elements.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        this.elements.stopBtn.addEventListener('click', () => this.stopReading());
        this.elements.prevBtn.addEventListener('click', () => this.previousQuote());
        this.elements.nextBtn.addEventListener('click', () => this.nextQuote());

        // Settings
        this.elements.highlightColor.addEventListener('change', () => this.updateHighlightColor());
        this.elements.speechRate.addEventListener('input', () => this.updateSpeechRate());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeydown(e));

        // Handle speech synthesis events
        this.speechSynthesis.addEventListener('voiceschanged', () => {
            this.checkSpeechSynthesisSupport();
        });
    }

    checkSpeechSynthesisSupport() {
        if (!('speechSynthesis' in window)) {
            this.showError('Speech synthesis is not supported in this browser.');
            this.elements.playPauseBtn.disabled = true;
            return false;
        }
        return true;
    }

    loadQuote(index) {
        try {
            if (index < 0 || index >= this.quotes.length) {
                throw new Error('Quote index out of range');
            }

            const quote = this.quotes[index];
            
            // Update title and counter
            this.elements.quoteTitle.textContent = quote.id;
            this.elements.currentQuote.textContent = index + 1;

            // Process and display text
            this.processText(quote.text);
            
            // Reset progress
            this.updateProgress(0);
            
            // Update button states
            this.updateNavigationButtons();

            // Stop any current speech
            this.stopReading();

        } catch (error) {
            this.showError('Failed to load quote: ' + error.message);
        }
    }

    processText(text) {
        // Clean and split text into words
        const cleanText = text.trim();
        this.words = cleanText.split(/\s+/).filter(word => word.length > 0);

        // Create HTML with wrapped words
        const wrappedText = this.words.map((word, index) => {
            const escapedWord = this.escapeHtml(word);
            return `<span class="word" data-index="${index}">${escapedWord}</span>`;
        }).join(' ');

        // Update display
        this.elements.quoteDisplay.innerHTML = wrappedText;
        this.currentWordIndex = 0;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    togglePlayPause() {
        if (!this.checkSpeechSynthesisSupport()) return;

        try {
            if (this.isPlaying && !this.isPaused) {
                this.pauseReading();
            } else if (this.isPaused) {
                this.resumeReading();
            } else {
                this.startReading();
            }
        } catch (error) {
            this.showError('Failed to control playback: ' + error.message);
        }
    }

    startReading() {
        if (!this.checkSpeechSynthesisSupport()) return;

        const quote = this.quotes[this.currentQuoteIndex];
        this.words = quote.text.split(/\s+/);
        this.currentWordIndex = 0;

        // Create new utterance
        this.currentUtterance = new SpeechSynthesisUtterance(quote.text);
        this.currentUtterance.rate = this.speechRate;
        
        // Get available voices and select a good one
        const voices = this.speechSynthesis.getVoices();
        const preferredVoice = voices.find(voice => voice.lang === 'en-US' && voice.name.includes('Google')) || 
                             voices.find(voice => voice.lang === 'en-US') || 
                             voices[0];
        
        if (preferredVoice) {
            this.currentUtterance.voice = preferredVoice;
        }

        // Add event listeners for better synchronization
        this.currentUtterance.onboundary = (event) => {
            if (event.name === 'word') {
                this.highlightWord(this.currentWordIndex);
                this.currentWordIndex++;
                this.updateProgress((this.currentWordIndex / this.words.length) * 100);
            }
        };

        this.currentUtterance.onend = () => {
            this.isPlaying = false;
            this.isPaused = false;
            this.currentWordIndex = 0;
            this.updatePlayButton();
            this.clearHighlights();
            this.updateProgress(100);
        };

        this.currentUtterance.onpause = () => {
            this.isPaused = true;
            this.updatePlayButton();
        };

        this.currentUtterance.onresume = () => {
            this.isPaused = false;
            this.updatePlayButton();
        };

        // Start reading
        this.speechSynthesis.speak(this.currentUtterance);
        this.isPlaying = true;
        this.updatePlayButton();
    }

    pauseReading() {
        if (this.currentUtterance) {
            this.speechSynthesis.pause();
            this.isPaused = true;
            this.updatePlayButton();
        }
    }

    resumeReading() {
        if (this.currentUtterance) {
            this.speechSynthesis.resume();
            this.isPaused = false;
            this.updatePlayButton();
        }
    }

    stopReading() {
        if (this.currentUtterance) {
            this.speechSynthesis.cancel();
            this.isPlaying = false;
            this.isPaused = false;
            this.currentWordIndex = 0;
            this.updatePlayButton();
            this.clearHighlights();
            this.updateProgress(0);
        }
    }

    highlightWord(index) {
        this.clearHighlights();
        if (index >= 0 && index < this.words.length) {
            const wordElements = this.elements.quoteDisplay.getElementsByClassName('word');
            if (wordElements[index]) {
                wordElements[index].style.backgroundColor = this.highlightColor;
                wordElements[index].scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }
    }

    clearHighlights() {
        const highlightedWords = document.querySelectorAll('.word.highlighted, .word.current');
        highlightedWords.forEach(word => {
            word.classList.remove('highlighted', 'current');
        });
    }

    updatePlayButton() {
        const icon = this.elements.playPauseBtn.querySelector('i');
        if (this.isPlaying && !this.isPaused) {
            icon.setAttribute('data-feather', 'pause');
            this.elements.playPauseBtn.setAttribute('aria-label', 'Pause');
        } else {
            icon.setAttribute('data-feather', 'play');
            this.elements.playPauseBtn.setAttribute('aria-label', 'Play');
        }
        
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }

    updateProgress(percentage) {
        this.elements.progressBar.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
    }

    updateNavigationButtons() {
        this.elements.prevBtn.disabled = this.currentQuoteIndex === 0;
        this.elements.nextBtn.disabled = this.currentQuoteIndex === this.quotes.length - 1;
    }

    previousQuote() {
        if (this.currentQuoteIndex > 0) {
            this.currentQuoteIndex--;
            this.loadQuote(this.currentQuoteIndex);
        }
    }

    nextQuote() {
        if (this.currentQuoteIndex < this.quotes.length - 1) {
            this.currentQuoteIndex++;
            this.loadQuote(this.currentQuoteIndex);
        }
    }

    updateHighlightColor() {
        this.highlightColor = this.elements.highlightColor.value;
        document.documentElement.style.setProperty('--highlight-color', this.highlightColor);
    }

    updateSpeechRate() {
        this.speechRate = parseFloat(this.elements.speechRate.value);
        this.elements.speedValue.textContent = `${this.speechRate.toFixed(1)}x`;
        
        // Update current utterance if playing
        if (this.currentUtterance && this.isPlaying) {
            // Note: Rate change during playback requires stopping and restarting
            // This is a limitation of the Web Speech API
        }
    }

    handleKeydown(event) {
        // Prevent action if user is typing in an input
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            return;
        }

        switch (event.key) {
            case ' ':
            case 'Enter':
                event.preventDefault();
                this.togglePlayPause();
                break;
            case 'Escape':
                event.preventDefault();
                this.stopReading();
                break;
            case 'ArrowLeft':
                event.preventDefault();
                this.previousQuote();
                break;
            case 'ArrowRight':
                event.preventDefault();
                this.nextQuote();
                break;
        }
    }

    showError(message) {
        this.elements.errorMessage.textContent = message;
        this.elements.errorMessage.classList.add('show');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            this.elements.errorMessage.classList.remove('show');
        }, 5000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        new QuotesAudioApp();
    } catch (error) {
        console.error('Failed to initialize Quotes Audio App:', error);
        
        // Show fallback error message
        const errorDiv = document.getElementById('errorMessage');
        if (errorDiv) {
            errorDiv.textContent = 'Failed to initialize application. Please refresh the page.';
            errorDiv.classList.add('show');
        }
    }
});
