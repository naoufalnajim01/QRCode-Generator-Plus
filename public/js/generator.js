/**
 * generator.js - Advanced QR Code Generation
 * MiniQR - Adapted by Naoufal Najim
 * Based on mini-qr by Estee Tey
 */

const QRCodeGenerator = {
    qrCode: null,
    config: {},

    init() {
        this.setupDefaultConfig();
        this.bindEvents();
        this.generateQR();
    },

    setupDefaultConfig() {
        this.config = {
            width: 300,
            height: 300,
            type: "canvas",
            data: "Bonne journée!",
            image: "",
            margin: 10,
            qrOptions: {
                typeNumber: 0,
                mode: "Byte",
                errorCorrectionLevel: "Q"
            },
            imageOptions: {
                hideBackgroundDots: true,
                imageSize: 0.4,
                margin: 0,
                crossOrigin: "anonymous"
            },
            dotsOptions: {
                color: "#000000",
                type: "dots"
            },
            backgroundOptions: {
                color: "transparent"
            },
            cornersSquareOptions: {
                color: "#000000",
                type: "dot"
            },
            cornersDotOptions: {
                color: "#000000",
                type: "dot"
            }
        };
    },

    bindEvents() {
        // Data input
        document.getElementById('qr-data')?.addEventListener('input', (e) => {
            this.config.data = e.target.value;
            this.generateQR();
        });

        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
                document.getElementById(`${tab}-tab`)?.classList.remove('hidden');
            });
        });

        // Logo upload
        document.getElementById('upload-logo')?.addEventListener('click', () => {
            document.getElementById('logo-file')?.click();
        });

        document.getElementById('logo-file')?.addEventListener('change', (e) => {
            const file = e.target.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.config.image = event.target.result;
                    document.getElementById('logo-url').value = '';
                    this.generateQR();
                };
                reader.readAsDataURL(file);
            }
        });

        document.getElementById('logo-url')?.addEventListener('input', (e) => {
            this.config.image = e.target.value;
            this.generateQR();
        });

        document.getElementById('logo-background')?.addEventListener('change', (e) => {
            this.config.imageOptions.hideBackgroundDots = e.target.checked;
            this.generateQR();
        });

        // Colors
        document.getElementById('bg-color')?.addEventListener('input', (e) => {
            this.config.backgroundOptions.color = e.target.value;
            this.generateQR();
        });

        document.getElementById('dots-color')?.addEventListener('input', (e) => {
            this.config.dotsOptions.color = e.target.value;
            this.generateQR();
        });

        document.getElementById('corner-square-color')?.addEventListener('input', (e) => {
            this.config.cornersSquareOptions.color = e.target.value;
            this.generateQR();
        });

        document.getElementById('corner-dot-color')?.addEventListener('input', (e) => {
            this.config.cornersDotOptions.color = e.target.value;
            this.generateQR();
        });

        // Dimensions
        ['width', 'height', 'margin', 'image-margin'].forEach(id => {
            document.getElementById(id)?.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                if (id === 'image-margin') {
                    this.config.imageOptions.margin = value;
                } else {
                    this.config[id.replace('-', '')] = value;
                }
                this.generateQR();
            });
        });

        // Dot type
        document.getElementById('dot-type')?.addEventListener('change', (e) => {
            this.config.dotsOptions.type = e.target.value;
            this.generateQR();
        });

        // Corner types
        document.getElementById('corner-square-type')?.addEventListener('change', (e) => {
            this.config.cornersSquareOptions.type = e.target.value;
            this.generateQR();
        });

        document.getElementById('corner-dot-type')?.addEventListener('change', (e) => {
            this.config.cornersDotOptions.type = e.target.value;
            this.generateQR();
        });

        // Error correction
        document.getElementById('error-correction')?.addEventListener('change', (e) => {
            this.config.qrOptions.errorCorrectionLevel = e.target.value;
            this.generateQR();
        });

        // Export buttons
        document.getElementById('download-png')?.addEventListener('click', () => this.download('png'));
        document.getElementById('download-jpg')?.addEventListener('click', () => this.download('jpeg'));
        document.getElementById('download-svg')?.addEventListener('click', () => this.download('svg'));

        // Quick actions
        document.getElementById('copy-qr-btn')?.addEventListener('click', () => this.copyToClipboard());
        document.getElementById('save-config-btn')?.addEventListener('click', () => this.saveConfig());
        document.getElementById('load-config-btn')?.addEventListener('click', () => this.loadConfig());

        // Scan mode
        document.getElementById('qr-file')?.addEventListener('change', (e) => this.scanQRCode(e));
        document.getElementById('copy-decoded')?.addEventListener('click', () => this.copyDecoded());
        document.getElementById('open-link')?.addEventListener('click', () => this.openLink());

        // Drag & Drop
        const dropZone = document.getElementById('drop-zone');
        if (dropZone) {
            dropZone.addEventListener('click', () => document.getElementById('qr-file')?.click());

            dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropZone.classList.add('drag-over');
            });

            dropZone.addEventListener('dragleave', () => {
                dropZone.classList.remove('drag-over');
            });

            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropZone.classList.remove('drag-over');

                const files = e.dataTransfer?.files;
                if (files && files.length > 0) {
                    const file = files[0];
                    if (file.type.startsWith('image/')) {
                        this.processImageFile(file);
                    } else {
                        this.showNotification('Veuillez déposer une image', 'error');
                    }
                }
            });
        }

        // Templates button
        document.getElementById('templates-btn')?.addEventListener('click', () => this.showDataTemplates());
    },

    showDataTemplates() {
        const modal = document.createElement('div');
        modal.className = 'templates-modal';
        modal.innerHTML = `
            <div class="templates-content">
                <h3>Modèles de données</h3>
                <div class="templates-grid">
                    <button class="template-btn" data-template="url">
                        <strong>URL</strong>
                        <span>https://example.com</span>
                    </button>
                    <button class="template-btn" data-template="email">
                        <strong>Email</strong>
                        <span>mailto:contact@example.com</span>
                    </button>
                    <button class="template-btn" data-template="phone">
                        <strong>Téléphone</strong>
                        <span>tel:+33123456789</span>
                    </button>
                    <button class="template-btn" data-template="sms">
                        <strong>SMS</strong>
                        <span>SMSTO:+33123456789:Bonjour</span>
                    </button>
                    <button class="template-btn" data-template="wifi">
                        <strong>WiFi</strong>
                        <span>WIFI:T:WPA;S:MonReseau;P:MotDePasse;;</span>
                    </button>
                    <button class="template-btn" data-template="vcard">
                        <strong>vCard</strong>
                        <span>Carte de visite numérique</span>
                    </button>
                </div>
                <button class="close-modal">Fermer</button>
            </div>
        `;

        const templates = {
            url: 'https://example.com',
            email: 'mailto:contact@example.com',
            phone: 'tel:+33123456789',
            sms: 'SMSTO:+33123456789:Bonjour!',
            wifi: 'WIFI:T:WPA;S:MonReseau;P:MotDePasse;;',
            vcard: 'BEGIN:VCARD\nVERSION:3.0\nFN:Jean Dupont\nTEL:+33123456789\nEMAIL:jean@example.com\nEND:VCARD'
        };

        document.body.appendChild(modal);

        modal.querySelectorAll('.template-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const template = btn.dataset.template;
                document.getElementById('qr-data').value = templates[template];
                this.config.data = templates[template];
                this.generateQR();
                modal.remove();
            });
        });

        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

    generateQR() {
        const container = document.getElementById('qr-canvas');
        if (!container) return;

        container.innerHTML = '';

        try {
            this.qrCode = new QRCodeStyling(this.config);
            this.qrCode.append(container);
        } catch (error) {
            console.error('QR Generation error:', error);
        }
    },

    download(extension) {
        if (!this.qrCode) return;

        const filename = document.getElementById('filename')?.value || 'qr-code';
        this.qrCode.download({
            name: filename,
            extension: extension
        });

        this.showNotification(`Téléchargé en ${extension.toUpperCase()}`);
    },

    async copyToClipboard() {
        if (!this.qrCode) return;

        try {
            const canvas = document.querySelector('#qr-canvas canvas');
            if (canvas) {
                canvas.toBlob(async (blob) => {
                    if (blob) {
                        await navigator.clipboard.write([
                            new ClipboardItem({ 'image/png': blob })
                        ]);
                        this.showNotification('QR Code copié dans le presse-papiers');
                    }
                });
            }
        } catch (error) {
            this.showNotification('Erreur lors de la copie', 'error');
        }
    },

    saveConfig() {
        try {
            localStorage.setItem('qr-config', JSON.stringify(this.config));
            this.showNotification('Configuration sauvegardée');
        } catch (error) {
            this.showNotification('Erreur lors de la sauvegarde', 'error');
        }
    },

    loadConfig() {
        try {
            const saved = localStorage.getItem('qr-config');
            if (saved) {
                this.config = JSON.parse(saved);
                this.updateUIFromConfig();
                this.generateQR();
                this.showNotification('Configuration chargée');
            } else {
                this.showNotification('Aucune configuration sauvegardée', 'error');
            }
        } catch (error) {
            this.showNotification('Erreur lors du chargement', 'error');
        }
    },

    updateUIFromConfig() {
        document.getElementById('qr-data').value = this.config.data;
        document.getElementById('width').value = this.config.width;
        document.getElementById('height').value = this.config.height;
        document.getElementById('margin').value = this.config.margin;
        document.getElementById('image-margin').value = this.config.imageOptions.margin;
        document.getElementById('bg-color').value = this.config.backgroundOptions.color;
        document.getElementById('dots-color').value = this.config.dotsOptions.color;
        document.getElementById('corner-square-color').value = this.config.cornersSquareOptions.color;
        document.getElementById('corner-dot-color').value = this.config.cornersDotOptions.color;
        document.getElementById('dot-type').value = this.config.dotsOptions.type;
        document.getElementById('corner-square-type').value = this.config.cornersSquareOptions.type;
        document.getElementById('corner-dot-type').value = this.config.cornersDotOptions.type;
        document.getElementById('error-correction').value = this.config.qrOptions.errorCorrectionLevel;
        document.getElementById('logo-background').checked = this.config.imageOptions.hideBackgroundDots;
    },

    // Process Image File (for both file input and drag & drop)
    async processImageFile(file) {
        if (!file.type.startsWith('image/')) {
            this.showNotification('Veuillez sélectionner une image', 'error');
            return;
        }

        try {
            const imageDataURL = await this.fileToDataURL(file);
            const result = await this.decodeQR(imageDataURL);

            if (result) {
                const textarea = document.getElementById('decoded-content');
                if (textarea) textarea.value = result;

                const openBtn = document.getElementById('open-link');
                if (openBtn) {
                    if (this.isValidURL(result)) {
                        openBtn.classList.remove('hidden');
                    } else {
                        openBtn.classList.add('hidden');
                    }
                }

                document.getElementById('scan-result')?.classList.remove('hidden');
                this.showNotification('QR Code décodé avec succès');
            } else {
                this.showNotification('Aucun QR Code trouvé', 'error');
            }
        } catch (error) {
            console.error('Scan error:', error);
            this.showNotification('Erreur lors du scan', 'error');
        }
    },

    // Scan QR Code
    async scanQRCode(event) {
        const file = event.target.files?.[0];
        if (!file) return;
        await this.processImageFile(file);
    },

    fileToDataURL(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = e => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    },

    async decodeQR(imageDataURL) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, imageData.width, imageData.height);

                resolve(code?.data || null);
            };
            img.onerror = () => resolve(null);
            img.src = imageDataURL;
        });
    },

    async copyDecoded() {
        const content = document.getElementById('decoded-content')?.value;
        if (!content) return;

        try {
            await navigator.clipboard.writeText(content);
            this.showNotification('Contenu copié');
        } catch (error) {
            this.showNotification('Erreur lors de la copie', 'error');
        }
    },

    openLink() {
        const content = document.getElementById('decoded-content')?.value;
        if (content && this.isValidURL(content)) {
            window.open(content, '_blank', 'noopener,noreferrer');
        }
    },

    isValidURL(string) {
        try {
            new URL(string);
            return true;
        } catch {
            return false;
        }
    },

    showNotification(message, type = 'success') {
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            background: ${type === 'success' ? '#18181b' : '#dc2626'};
            color: white;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            z-index: 9999;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            animation: slideIn 0.3s ease-out;
        `;

        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    QRCodeGenerator.init();
});

// Add animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);