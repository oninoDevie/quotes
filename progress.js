class ProgressTracker {
    constructor() {
        this.modal = document.getElementById('progressModal');
        this.form = document.getElementById('progressForm');
        this.currentCategory = null;
        this.charts = {};

        this.init();
    }

    init() {
        // Initialize charts
        this.initializeCharts();
        
        // Bind events
        this.bindEvents();
        
        // Initialize Feather icons
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }

    bindEvents() {
        // Update buttons
        document.querySelectorAll('.update-button').forEach(button => {
            button.addEventListener('click', (e) => {
                this.currentCategory = e.target.closest('.update-button').dataset.category;
                this.showModal();
            });
        });

        // Close modal
        document.querySelector('.close-button').addEventListener('click', () => {
            this.hideModal();
        });

        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.updateProgress();
        });

        // Close modal when clicking outside
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hideModal();
            }
        });
    }

    initializeCharts() {
        const categories = ['reading', 'running', 'sports', 'entertainment', 'productivity'];
        
        categories.forEach(category => {
            const chartContainer = document.querySelector(`.${category} .progress-chart`);
            if (chartContainer) {
                this.charts[category] = new Chart(chartContainer, {
                    type: 'line',
                    data: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                        datasets: [{
                            label: 'Progress',
                            data: this.getRandomData(),
                            borderColor: '#4f46e5',
                            tension: 0.4,
                            fill: true,
                            backgroundColor: 'rgba(79, 70, 229, 0.1)'
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 100,
                                grid: {
                                    display: true,
                                    color: 'rgba(0, 0, 0, 0.1)'
                                }
                            },
                            x: {
                                grid: {
                                    display: false
                                }
                            }
                        }
                    }
                });
            }
        });
    }

    getRandomData() {
        return Array.from({ length: 6 }, () => Math.floor(Math.random() * 100));
    }

    showModal() {
        this.modal.classList.add('show');
        document.getElementById('progressValue').focus();
    }

    hideModal() {
        this.modal.classList.remove('show');
        this.form.reset();
    }

    updateProgress() {
        const value = document.getElementById('progressValue').value;
        const note = document.getElementById('progressNote').value;

        // Update progress bar
        const progressBar = document.querySelector(`.${this.currentCategory} .progress`);
        if (progressBar) {
            progressBar.style.width = `${value}%`;
        }

        // Update progress text
        const progressText = document.querySelector(`.${this.currentCategory} .progress-text`);
        if (progressText) {
            progressText.textContent = `${value}% Complete`;
        }

        // Update chart
        if (this.charts[this.currentCategory]) {
            const data = this.charts[this.currentCategory].data.datasets[0].data;
            data.push(parseInt(value));
            data.shift();
            this.charts[this.currentCategory].update();
        }

        // Save to localStorage
        this.saveProgress(this.currentCategory, value, note);

        // Hide modal
        this.hideModal();
    }

    saveProgress(category, value, note) {
        const progress = JSON.parse(localStorage.getItem('progress') || '{}');
        progress[category] = {
            value: parseInt(value),
            note: note,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('progress', JSON.stringify(progress));
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

// Initialize the progress tracker when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProgressTracker();
}); 