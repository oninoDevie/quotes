class HomePage {
    constructor() {
        this.init();
    }

    async init() {
        // Initialize Feather icons
        if (typeof feather !== 'undefined') {
            feather.replace();
        }

        // Load progress data
        this.loadProgress();

        // Initialize Clerk authentication
        await this.initClerk();

        // Add event listeners
        this.bindEvents();
    }

    async initClerk() {
        if (!window.Clerk || !window.clerkPublishableKey) {
            console.error("Clerk JS SDK or Publishable Key not loaded. Please ensure clerk.browser.js is included and window.clerkPublishableKey is set.");
            return;
        }

        try {
            await window.Clerk.load({
                publishableKey: window.clerkPublishableKey,
            });

            const authContainer = document.getElementById('clerkAuthContainer');
            if (authContainer) {
                // Render the Clerk user button (for signed-in users) or sign-in button (for signed-out users)
                window.Clerk.mountUserButton(authContainer);

                // You might want to also render a sign-in button if the user is not signed in
                // Example: if (!window.Clerk.user) { window.Clerk.mountSignInButton(authContainer); }
                // However, mountUserButton usually handles signed-out state by showing sign-in/sign-up flow
            }
        } catch (error) {
            console.error("Error initializing Clerk:", error);
        }
    }

    bindEvents() {
        // Settings link handler
        const settingsLink = document.getElementById('settingsLink');
        const settingsAction = document.getElementById('settingsAction');
        
        if (settingsLink) {
            settingsLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.showSettings();
            });
        }

        if (settingsAction) {
            settingsAction.addEventListener('click', (e) => {
                e.preventDefault();
                this.showSettings();
            });
        }

        // Add hover effects to progress cards
        const progressCards = document.querySelectorAll('.progress-card');
        progressCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-4px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }

    loadProgress() {
        const progressData = JSON.parse(localStorage.getItem('progressData')) || {};
        
        // Update progress bars and text
        Object.entries(progressData).forEach(([category, data]) => {
            const card = document.querySelector(`.progress-card[data-category="${category}"]`);
            if (card) {
                const progressFill = card.querySelector('.progress-fill');
                const progressText = card.querySelector('.progress-text');
                
                if (progressFill && progressText) {
                    const percentage = this.calculateProgress(data);
                    progressFill.style.width = `${percentage}%`;
                    progressText.textContent = `${percentage}% Complete`;
                }
            }
        });
    }

    calculateProgress(data) {
        // Calculate progress based on the category
        switch (data.category) {
            case 'reading':
                return Math.min((data.booksRead / data.targetBooks) * 100, 100);
            case 'running':
                return Math.min((data.distance / data.targetDistance) * 100, 100);
            case 'sports':
                return Math.min((data.workouts / data.targetWorkouts) * 100, 100);
            case 'entertainment':
                return Math.min((data.moviesWatched / data.targetMovies) * 100, 100);
            case 'productivity':
                return Math.min((data.tasksCompleted / data.targetTasks) * 100, 100);
            default:
                return 0;
        }
    }

    showSettings() {
        // Create and show settings modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Settings</h3>
                    <button class="close-button">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="setting-group">
                        <label>Theme</label>
                        <select id="themeSelect">
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                            <option value="system">System</option>
                        </select>
                    </div>
                    <div class="setting-group">
                        <label>Language</label>
                        <select id="languageSelect">
                            <option value="en">English</option>
                            <option value="es">Español</option>
                        </select>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        requestAnimationFrame(() => modal.classList.add('show'));

        // Close modal when clicking outside or on close button
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal(modal);
            }
        });

        const closeButton = modal.querySelector('.close-button');
        if (closeButton) {
            closeButton.addEventListener('click', () => this.closeModal(modal));
        }

        // Load current settings
        this.loadSettings(modal);
    }

    closeModal(modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }

    loadSettings(modal) {
        const themeSelect = modal.querySelector('#themeSelect');
        const languageSelect = modal.querySelector('#languageSelect');

        if (themeSelect) {
            themeSelect.value = localStorage.getItem('theme') || 'light';
            themeSelect.addEventListener('change', (e) => {
                localStorage.setItem('theme', e.target.value);
                this.applyTheme(e.target.value);
            });
        }

        if (languageSelect) {
            languageSelect.value = localStorage.getItem('language') || 'en';
            languageSelect.addEventListener('change', (e) => {
                localStorage.setItem('language', e.target.value);
                this.applyLanguage(e.target.value);
            });
        }
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }

    applyLanguage(language) {
        // Implement language switching logic here
        console.log(`Language changed to: ${language}`);
    }
}

// Initialize the home page when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HomePage();
}); 