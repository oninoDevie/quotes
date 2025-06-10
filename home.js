class HomePage {
    constructor() {
        this.init();
    }

    init() {
        // Initialize Feather icons
        if (typeof feather !== 'undefined') {
            feather.replace();
        }

        // Load progress data
        this.loadProgress();
    }

    loadProgress() {
        const progress = JSON.parse(localStorage.getItem('progress') || '{}');
        
        Object.entries(progress).forEach(([category, data]) => {
            const progressBar = document.querySelector(`.${category} .progress`);
            const progressText = document.querySelector(`.${category} .progress-text`);
            
            if (progressBar) {
                progressBar.style.width = `${data.value}%`;
            }
            
            if (progressText) {
                progressText.textContent = `${data.value}% Complete`;
            }
        });
    }
}

// Initialize the home page when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HomePage();
}); 