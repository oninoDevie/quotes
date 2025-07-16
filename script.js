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
of a square`,
                audio: "audio/audio1.mp3"
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
and the comedy he didn't write [...]`,
                audio: "audio/audio2.mp3"
            },
            {
                id: "III",
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
Or simply the variant of a poorly delivered speech`,
                audio: "audio/audio3.mp3"
            },
            {
                id: "IV",
                text: `
The enigma of the just
was denied by the Heaven's dreamer
and, after six nights,
there was no record of fantasies;
your mother's torments and the cries of the stars
have not aged like wine,
neither in Hell nor in our memories.`,
                audio: "audio/audio4.mp3"
            },
            {
                id: "V",
                text: `
The Sky could be imagined
as an electronic sound
or, if we are to be fair,
as something fictitious.
But solitude cannot be fair,
because the "Other" exists (who denies it at once)
and is the most coveted by men:
HELL.`,
                audio: "audio/audio5.mp3"
            },
            {
                id: "VI",
                text: `
On this morning
that has no fog,
we are real
like an old song,
but if we awaken
we wouldn't even know the name.`,
                audio: "audio/audio6.mp3"
            },
            {
                id: "VII",
                text: `
I had no choice but to open my backpack, take out the revolver, and shoot him exactly below the left eye. The choice of left or right was nothing more than a whim of a lady who wore red pants, a white shirt, black shoes (probably a luxury brand). Nothing more than a dark desire for a problem that began in the third week of the "Day of Dreams and Absurd Games." It's already dinnertime, and the coffee has no sugar. We hope that of the seven songs we chose the night before, all have lyrics that speak of women and forgotten wars. [...]`,
                audio: "audio/audio5.mp3"
            },
            {
                id: "VIII",
                text: `
It was that one could no longer write on the machine in this way because that's what they had told him in that house where everyone wrote like this: "To the rhythm of the triangle to the rhythm of another similar figure (which evidently wasn't a triangle, perhaps it was a black dog or our failure to shine)`,
                audio: "audio/audio6.mp3"
            },
            {
                id: "IX",
                text: `
If only the Heaven were a bit more sky blue I'd have no reason to live because forms deform in autumns without warning orphanhood that time doesn't return`
            },
            {
                id: "X",
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
                id: "XI",
                text: `XX
One cannot articulate language without diagnosis
nor remedies that store diaries dates and almanacs of years forgotten`,
            },
            {
                id: "XII",
                text: `
Only the eternal dreamer can feel that which they call knowing the demons of Heaven who know how to fly by plane
Those of dreams, those of traditions, myths or legends

Those of phantasmagorical novels of flights from beyond the grave to the Old Continent
And how to forget the geniuses of the pyramids who understood Statistics, the rhythm of the air and the sound of silence

And above all things they found love not in another being (not at all philosophical) but in the rose petals of that tree he planted, the book he didn't write, and the child he didn't have.
He also emphasized a friend he never got to meet.
For he always argued that he had already written everything in his notebook and that he also duplicated it like one of those doors everyone knows how to open or (if they don't know how) they open it using Arithmetic like in an American movie heist that even I don't remember.`
            },
            {
                id: "NEW1",
                text: `They'll attend a party and pass a small note under the table, and they'll write something beautiful. It'll be forbidden to include their name and signature (or any kind of link to the author).
They always wondered why this action was performed. "They'll never know," but it has already been told in stories, melodies, and solitary places.`
            },
            {
                id: "XX",
                text: `One cannot articulate language without diagnosis
nor remedies that store diaries dates and almanacs of years forgotten`
            },
            {
                id: "NEW2",
                text: `I've learned from the dreams of a cross 
The cross had no name and it was a shameful act`
            },
            {
                id: "1828",
                text: `Only the eternal dreamer can feel that which they call knowing the demons of Heaven who know how to fly by plane
Those of dreams, those of traditions, myths or legends
Those of phantasmagorical novels of flights from beyond the grave to the Old Continent
 And how to forget the geniuses of the pyramids who understood Statistics, the rhythm of the air and the sound of silence
And above all things they found love not in another being (not at all philosophical) but in the rose petals of that tree he planted, the book he didn't write, and the child he didn't have.
He also emphasized a friend he never got to meet.
For he always argued that he had already written everything in his notebook and that he also duplicated it like one of those doors everyone knows how to open or (if they don't know how) they open it using Arithmetic like in an American movie heist that even I don't remember.`
            },
            {
                id: "1919",
                text: `I was writing verses in my room while Mom knitted in the living room, enjoying her senile life which was gradually coming to an end. With the pencil in my left hand and the alcohol in my right, I was finishing a poem for her (and, when I say her, I don't mean my mother, but the girl I met that summer of '16). Sorrow and joy have already befallen me, and I know no one has experienced them as I have. In that somber atmosphere, where a lamp lit my desk and memories caused cataclysms in every corner of my mind, I idealized her and it pleased me; perhaps with tears or joy. "Did you love her and pay her back with evil? If you ever meet her, though it's probable you won't, tell her you love her and that you hoped she wouldn't arrive; because complicated is the situation of one who mistreats with love, cries smiling, and cannot ask for forgiveness." The wind whispered, calm, through the room's window and the alcohol was doing its work: imprisoning the heart. It had been a week since her death; I couldn't bear the guilt any longer. I killed her, yes, and I did it with love. I know it was the best option; no other punishment would pay for what she did to me. Those intense verses caused a vast path of memories, my dementia increased, and death was my escape. And now I don't know from where I'm writing; perhaps from some place in hell where my lost soul wanders. 
Sweet nightmare of romantic summer, 
how much I hate you and how much I love you!`
            },
            {
                id: "TWO HELLS",
                text: `I
I'll always remember you (just for that special way you cross your fingers)
                                            and I'll always remember you
                     (maybe for that absurd sound 
                                                        of two thousand nine)
and I'll only remember you because there's little time, little, 
very little time until they wake up.

           II
It's hard to forget I've been part of those conversations where we listened to Lucy in the Sky with Diamonds and that also had the smell of burnt pancakes
and the coffee wasn't sweet and the coffee also had no milk and the coffee wasn't coffee
                because
           the bell rang
           like a ticktock
             in the hallway
               and yes
(I'll repeat seven more times that yes)
        it was all at six in the morning,
before the tram passes,
before the swan cowers and before stomachs dream`
            },
            {
                id: "2000",
                text: `Gregory is sitting down, but he's hungry and broke (plus he's already morally defeated). It's a quarter past three, and he still hasn't had lunch. He's already been told the same old things more than four times: that he's an idiot, that no one will ever love him, that he's useless, and that when he's an old man, he'll never smile. He won't have hair, and his bones will be just as disgusting as any other disciple's or beginner's.
"I'm an idiot, yes, I'm the biggest idiot of the 21st century," he told himself. "Look at the clock, it's late, look at the clock, it's awake now."

My fantasy
takes shape
      in 4 
silent spaces`
            },
            {
                id: "1655",
                text: `I once heard of an ancient theorem that explained why we can still see that same face even if the person no longer exists. Yes, it was also a profound encounter between two souls connecting through sounds. And the other encounter of two ghosts murmuring gothic poems; other men no longer laugh, no longer laugh, no longer dream, because they have lost their voice, and it is autumn, and you do not embrace me.`
            },
            {
                id: "V",
                text: `
1
They swore
one day
to reach
a path

2
On that path
color and sounds
did not exist

3
Everything
was already
interpreted

2
The real
problem
always
was that 
there was no message 
and the interpreter
could not return
from their dream

1
And all that was
mentioned was lost
among the
tears
of a tree

One, two, three, four, five!

Of some neoclassical tradition
or some fantastic movement
it must have learned
the mastery of equidistant forms.
Regarding the unresolved process, the woman has not asked about anyone again, neither her daughter nor any specific person. She said she didn't have a phone number, but —in alternate and metaphysical realities— she was in a dream. Her composition has been the greatest enigma of the people, and there was no return.`
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
        this.audioTimings = []; // Array to store word timings
        this.audioPlayer = null;

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
            errorMessage: document.getElementById('errorMessage'),
            audioFile: document.getElementById('audioFile'),
            audioPlayer: document.getElementById('audioPlayer')
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
        this.elements.audioFile.addEventListener('change', (e) => this.handleAudioFile(e));

        // Audio player events
        this.elements.audioPlayer.addEventListener('timeupdate', () => this.updateWordHighlight());
        this.elements.audioPlayer.addEventListener('ended', () => this.stopReading());
        this.elements.audioPlayer.addEventListener('error', (e) => this.showError('Audio playback error: ' + e.message));

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
            this.elements.quoteTitle.textContent = `Quote ${quote.id}`;
            this.elements.currentQuote.textContent = index + 1;
            
            // Process and display text
            this.words = this.processText(quote.text);
            this.elements.quoteDisplay.innerHTML = this.words.map(word => 
                `<span class="word">${this.escapeHtml(word)}</span>`
            ).join(' ');

            // Load audio if available
            if (quote.audio) {
                this.elements.audioPlayer.src = quote.audio;
                this.loadAudioTimingsFromFile(quote.audio);
            } else {
                this.elements.audioPlayer.src = '';
                this.audioTimings = [];
            }

            // Reset state
            this.currentWordIndex = 0;
            this.clearHighlights();
            this.updateProgress(0);
            this.updateNavigationButtons();
            this.updatePlayButton();

        } catch (error) {
            this.showError('Failed to load quote: ' + error.message);
        }
    }

    processText(text) {
        // Clean and split text into words
        const cleanText = text.trim();
        const words = cleanText.split(/\s+/).filter(word => word.length > 0);
        return words;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    handleAudioFile(event) {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            this.elements.audioPlayer.src = url;
            this.loadAudioTimings(file);
        }
    }

    async loadAudioTimings(file) {
        try {
            // Here you would implement the logic to load word timings
            // This could be from a separate JSON file or from the audio file metadata
            // For now, we'll create dummy timings for demonstration
            const duration = await this.getAudioDuration(file);
            this.audioTimings = this.words.map((_, index) => {
                return (duration / this.words.length) * index;
            });
        } catch (error) {
            this.showError('Failed to load audio timings: ' + error.message);
        }
    }

    getAudioDuration(file) {
        return new Promise((resolve, reject) => {
            const audio = new Audio();
            audio.addEventListener('loadedmetadata', () => {
                resolve(audio.duration);
            });
            audio.addEventListener('error', reject);
            audio.src = URL.createObjectURL(file);
        });
    }

    async loadAudioTimingsFromFile(audioPath) {
        // Dummy timings igual que antes, pero usando el archivo de la ruta
        try {
            const duration = await this.getAudioDurationFromPath(audioPath);
            this.audioTimings = this.words.map((_, index) => {
                return (duration / this.words.length) * index;
            });
        } catch (error) {
            this.showError('Failed to load audio timings: ' + error.message);
        }
    }

    getAudioDurationFromPath(audioPath) {
        return new Promise((resolve, reject) => {
            const audio = new Audio();
            audio.addEventListener('loadedmetadata', () => {
                resolve(audio.duration);
            });
            audio.addEventListener('error', reject);
            audio.src = audioPath;
        });
    }

    updateWordHighlight() {
        const currentTime = this.elements.audioPlayer.currentTime;
        const wordIndex = this.audioTimings.findIndex(time => time > currentTime) - 1;
        
        if (wordIndex >= 0 && wordIndex < this.words.length) {
            this.highlightWord(wordIndex);
            this.updateProgress((wordIndex / this.words.length) * 100);
        }
    }

    togglePlayPause() {
        if (this.elements.audioPlayer.src) {
            if (this.isPlaying) {
                this.pauseReading();
            } else {
                this.startReading();
            }
        } else {
            // Fallback to speech synthesis if no audio file is loaded
            if (this.isPlaying) {
                this.pauseReading();
            } else {
                this.startReading();
            }
        }
    }

    startReading() {
        if (this.elements.audioPlayer.src) {
            this.elements.audioPlayer.play();
            this.isPlaying = true;
            this.isPaused = false;
            this.updatePlayButton();
        } else {
            // Fallback to speech synthesis
            this.startSpeechSynthesis();
        }
    }

    pauseReading() {
        if (this.elements.audioPlayer.src) {
            this.elements.audioPlayer.pause();
        } else {
            this.speechSynthesis.pause();
        }
        this.isPlaying = false;
        this.isPaused = true;
        this.updatePlayButton();
    }

    stopReading() {
        if (this.elements.audioPlayer.src) {
            this.elements.audioPlayer.pause();
            this.elements.audioPlayer.currentTime = 0;
        } else {
            this.speechSynthesis.cancel();
        }
        this.isPlaying = false;
        this.isPaused = false;
        this.currentWordIndex = 0;
        this.clearHighlights();
        this.updateProgress(0);
        this.updatePlayButton();
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

    startSpeechSynthesis() {
        if (!this.checkSpeechSynthesisSupport()) {
            return;
        }

        // Cancel any ongoing speech
        this.speechSynthesis.cancel();

        // Create new utterance
        const utterance = new SpeechSynthesisUtterance(this.quotes[this.currentQuoteIndex].text);
        utterance.rate = this.speechRate;
        
        // Handle word boundaries
        utterance.onboundary = (event) => {
            if (event.name === 'word') {
                const wordIndex = this.words.findIndex(word => 
                    event.charIndex >= this.quotes[this.currentQuoteIndex].text.indexOf(word) &&
                    event.charIndex < this.quotes[this.currentQuoteIndex].text.indexOf(word) + word.length
                );
                if (wordIndex >= 0) {
                    this.highlightWord(wordIndex);
                    this.updateProgress((wordIndex / this.words.length) * 100);
                }
            }
        };

        // Handle end of speech
        utterance.onend = () => {
            this.isPlaying = false;
            this.isPaused = false;
            this.updatePlayButton();
            this.updateProgress(100);
        };

        // Start speaking
        this.currentUtterance = utterance;
        this.speechSynthesis.speak(utterance);
        this.isPlaying = true;
        this.isPaused = false;
        this.updatePlayButton();
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

