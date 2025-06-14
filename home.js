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
        } catch (error) {
            console.error("Error initializing Clerk:", error);
        }
    }

    bindEvents() {
        const accederBtn = document.getElementById('accederBtn');
        if (accederBtn) {
            accederBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (window.Clerk.user) {
                    // User is signed in, perhaps redirect to a dashboard or show user options
                    window.Clerk.openUserProfile(); // Example: Open user profile
                } else {
                    // User is signed out, open sign-in flow
                    window.Clerk.openSignIn();
                }
            });
        }

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

        const themeToggleBtn = document.getElementById('themeToggleBtn');
        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', () => this.toggleTheme());
        }
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

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        this.applyTheme(newTheme);
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const themeToggleIcon = document.querySelector('#themeToggleBtn i');
        if (themeToggleIcon) {
            if (theme === 'dark') {
                themeToggleIcon.setAttribute('data-feather', 'moon');
            } else {
                themeToggleIcon.setAttribute('data-feather', 'sun');
            }
            feather.replace({ 'stroke-width': 2, 'width': 24, 'height': 24 });
        }
    }

    applyLanguage(language) {
        // Implement language switching logic here
        console.log(`Language changed to: ${language}`);
    }
}

// Initialize the home page when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const homePage = new HomePage();
    // Apply initial theme based on localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        homePage.applyTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        homePage.applyTheme('dark');
    } else {
        homePage.applyTheme('light');
    }
}); 