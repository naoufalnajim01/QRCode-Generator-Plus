/**
 * main.js - Interface Logic
 * MiniQR - Adapted by Naoufal Najim
 * Based on mini-qr by Estee Tey
 */

class MiniQRApp {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || this.getSystemTheme();
        this.currentMode = 'create';
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.bindEvents();
    }

    getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // Theme Management
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const lightIcon = document.getElementById('theme-icon-light');
        const darkIcon = document.getElementById('theme-icon-dark');

        if (theme === 'dark') {
            lightIcon?.classList.add('hidden');
            darkIcon?.classList.remove('hidden');
        } else {
            lightIcon?.classList.remove('hidden');
            darkIcon?.classList.add('hidden');
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
    }

    // Mode Management
    switchMode(mode) {
        this.currentMode = mode;

        // Update buttons
        document.querySelectorAll('.mode-btn').forEach(btn => {
            if (btn.dataset.mode === mode) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update content
        const createMode = document.getElementById('create-mode');
        const scanMode = document.getElementById('scan-mode');

        if (mode === 'create') {
            createMode?.classList.remove('hidden');
            scanMode?.classList.add('hidden');
        } else {
            createMode?.classList.add('hidden');
            scanMode?.classList.remove('hidden');
        }
    }

    // Event Binding
    bindEvents() {
        // Theme toggle
        document.getElementById('theme-toggle')?.addEventListener('click', () => this.toggleTheme());

        // Mode toggle
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', () => this.switchMode(btn.dataset.mode));
        });

        // File selection for scan mode
        document.getElementById('select-file')?.addEventListener('click', () => {
            document.getElementById('qr-file')?.click();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                if (e.key === '1') {
                    e.preventDefault();
                    this.switchMode('create');
                } else if (e.key === '2') {
                    e.preventDefault();
                    this.switchMode('scan');
                }
            }
        });
    }
}

// Initialize app
window.miniQR = new MiniQRApp();