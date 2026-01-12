/**
 * Complete i18n system for Générateur QRCode+
 */

const translations = {
    fr: {
        // Modes
        'modes.create': 'Créer',
        'modes.scan': 'Analyser',

        // Actions
        'actions.copy': 'Copier',
        'actions.save': 'Sauvegarder',
        'actions.load': 'Charger',

        // Export
        'export.title': 'Export QR code',
        'export.filename': 'Nom du fichier',

        // Settings
        'settings.title': 'Paramètres pour personnaliser votre code QR',
        'settings.frame.title': 'Paramètres du cadre',
        'settings.frame.new': 'Nouveau!',
        'settings.frame.add': 'Ajouter un cadre',
        'settings.qr.title': 'Paramètres du code QR',
        'settings.qr.data': 'Données à encoder',
        'settings.qr.single': 'Exportation simple',
        'settings.qr.batch': 'Exportation par lots',
        'settings.qr.placeholder': 'Bonne journée!',
        'settings.qr.templates': 'Modèles de données',

        // Logo
        'logo.url': 'URL de l\'image du logo',
        'logo.upload': 'Charger une image',
        'logo.background': 'Avec fond',

        // Colors
        'colors.background': 'Couleur d\'arrière-plan',
        'colors.dots': 'Couleur des points',
        'colors.cornerSquare': 'Couleur du carré des coins',
        'colors.cornerDot': 'Couleur du point d\'angle',

        // Dimensions
        'dimensions.width': 'Largeur (px)',
        'dimensions.height': 'Hauteur (px)',
        'dimensions.borderRadius': 'Rayon de la bordure (px)',
        'dimensions.margin': 'Marge (px)',
        'dimensions.imageMargin': 'Marge de l\'image (px)',

        // Types
        'types.dot': 'Type de point',
        'types.cornerSquare': 'Type de carré des coins',
        'types.cornerDot': 'Type de point d\'angle',
        'types.dots': 'points',
        'types.rounded': 'arrondi',
        'types.classy': 'classe',
        'types.classyRounded': 'arrondi à la classe',
        'types.square': 'carré',
        'types.extraRounded': 'extra-arrondi',
        'types.dot.value': 'point',

        // Error correction
        'error.title': 'Niveau de correction d\'erreur',
        'error.low': 'Faible (7%)',
        'error.medium': 'Moyenne (15%)',
        'error.high': 'Haut (25%)',
        'error.highest': 'Le plus haut (30%)',
        'error.suggested': 'Suggéré',

        // Scan
        'scan.title': 'Scannez un code QR',
        'scan.upload': 'Télécharger l\'image du QR Code',
        'scan.dragDrop': 'ou glisser-déposer une image ici',
        'scan.chooseFile': 'Choisir un fichier',
        'scan.tip': 'Astuce : Pour de meilleurs résultats, utilisez une image claire avec un bon éclairage.',
        'scan.decoded': 'Contenu décodé',
        'scan.copyContent': 'Copier le contenu',
        'scan.openLink': 'Ouvrir le lien'
    },
    en: {
        // Modes
        'modes.create': 'Create',
        'modes.scan': 'Scan',

        // Actions
        'actions.copy': 'Copy',
        'actions.save': 'Save',
        'actions.load': 'Load',

        // Export
        'export.title': 'Export QR code',
        'export.filename': 'File name',

        // Settings
        'settings.title': 'Settings to customize your QR code',
        'settings.frame.title': 'Frame settings',
        'settings.frame.new': 'New!',
        'settings.frame.add': 'Add frame',
        'settings.qr.title': 'QR code settings',
        'settings.qr.data': 'Data to encode',
        'settings.qr.single': 'Single export',
        'settings.qr.batch': 'Batch export',
        'settings.qr.placeholder': 'Have a nice day!',
        'settings.qr.templates': 'Data templates',

        // Logo
        'logo.url': 'Logo image URL',
        'logo.upload': 'Upload image',
        'logo.background': 'With background',

        // Colors
        'colors.background': 'Background color',
        'colors.dots': 'Dots color',
        'colors.cornerSquare': 'Corners Square color',
        'colors.cornerDot': 'Corners Dot color',

        // Dimensions
        'dimensions.width': 'Width (px)',
        'dimensions.height': 'Height (px)',
        'dimensions.borderRadius': 'Border radius (px)',
        'dimensions.margin': 'Margin (px)',
        'dimensions.imageMargin': 'Image margin (px)',

        // Types
        'types.dot': 'Dot type',
        'types.cornerSquare': 'Corners Square type',
        'types.cornerDot': 'Corners Dot type',
        'types.dots': 'dots',
        'types.rounded': 'rounded',
        'types.classy': 'classy',
        'types.classyRounded': 'classy-rounded',
        'types.square': 'square',
        'types.extraRounded': 'extra-rounded',
        'types.dot.value': 'dot',

        // Error correction
        'error.title': 'Error correction level',
        'error.low': 'Low (7%)',
        'error.medium': 'Medium (15%)',
        'error.high': 'High (25%)',
        'error.highest': 'Highest (30%)',
        'error.suggested': 'Suggested',

        // Scan
        'scan.title': 'Scan a QR Code',
        'scan.upload': 'Upload QR Code Image',
        'scan.dragDrop': 'or drag and drop an image here',
        'scan.chooseFile': 'Choose file',
        'scan.tip': 'Tip: For best results, use a clear image with good lighting.',
        'scan.decoded': 'Decoded content',
        'scan.copyContent': 'Copy content',
        'scan.openLink': 'Open link'
    }
};

let currentLang = localStorage.getItem('language') || 'fr';

function t(key) {
    return translations[currentLang]?.[key] || key;
}

function updateUILanguage() {
    // Mode buttons
    const createBtn = document.querySelector('[data-mode="create"] span');
    const scanBtn = document.querySelector('[data-mode="scan"] span');
    if (createBtn) createBtn.textContent = t('modes.create');
    if (scanBtn) scanBtn.textContent = t('modes.scan');

    // Action buttons
    updateButtonText('#copy-qr-btn', t('actions.copy'));
    updateButtonText('#save-config-btn', t('actions.save'));
    updateButtonText('#load-config-btn', t('actions.load'));

    // Export section
    updateText('.export-section h3', t('export.title'));
    updateText('.export-section label', t('export.filename'));

    // Settings
    updateText('.settings-section h2', t('settings.title'));

    // Settings groups
    const frameTitle = document.querySelector('.settings-group:nth-of-type(1) summary');
    if (frameTitle) {
        const badge = frameTitle.querySelector('.badge');
        frameTitle.childNodes[0].textContent = t('settings.frame.title') + ' ';
        if (badge) badge.textContent = t('settings.frame.new');
    }

    const qrTitle = document.querySelector('.settings-group:nth-of-type(2) summary');
    if (qrTitle) qrTitle.childNodes[0].textContent = t('settings.qr.title');

    // Frame checkbox
    const frameCheckbox = document.querySelector('label:has(#add-frame) span');
    if (frameCheckbox) frameCheckbox.textContent = t('settings.frame.add');

    // Data tabs
    updateText('.tab-btn[data-tab="simple"]', t('settings.qr.single'));
    updateText('.tab-btn[data-tab="batch"]', t('settings.qr.batch'));

    // Textarea placeholder
    const dataTextarea = document.getElementById('qr-data');
    if (dataTextarea) dataTextarea.placeholder = t('settings.qr.placeholder');

    // Templates button
    updateButtonText('#templates-btn', t('settings.qr.templates'));

    // Logo section
    const logoLabels = document.querySelectorAll('.settings-content label');
    logoLabels.forEach(label => {
        const text = label.textContent.trim();
        if (text.includes('URL') || text.includes('logo')) {
            label.textContent = t('logo.url');
        }
    });

    updateButtonText('#upload-logo', t('logo.upload'));

    const logoCheckbox = document.querySelector('label:has(#logo-background) span');
    if (logoCheckbox) logoCheckbox.textContent = t('logo.background');

    // Color labels
    updateColorLabels();

    // Dimension labels
    updateDimensionLabels();

    // Type selects
    updateTypeSelects();

    // Error correction
    updateErrorCorrection();

    // Scan section
    updateText('#scan-mode h2', t('scan.title'));
    updateText('#drop-zone h3', t('scan.upload'));

    const dragDropText = document.querySelector('#drop-zone p:not(.hint)');
    if (dragDropText) dragDropText.textContent = t('scan.dragDrop');

    updateButtonText('#select-file', t('scan.chooseFile'));

    const tipText = document.querySelector('#drop-zone .hint');
    if (tipText) tipText.textContent = t('scan.tip');

    updateText('#scan-result h3', t('scan.decoded'));
    updateButtonText('#copy-decoded', t('scan.copyContent'));
    updateButtonText('#open-link', t('scan.openLink'));
}

function updateButtonText(selector, text) {
    const btn = document.querySelector(selector);
    if (btn) {
        Array.from(btn.childNodes).forEach(node => {
            if (node.nodeType === 3 && node.textContent.trim()) {
                node.textContent = ' ' + text;
            }
        });
    }
}

function updateText(selector, text) {
    const elem = document.querySelector(selector);
    if (elem) elem.textContent = text;
}

function updateColorLabels() {
    const colorItems = document.querySelectorAll('.color-item');
    const keys = ['colors.background', 'colors.dots', 'colors.cornerSquare', 'colors.cornerDot'];
    colorItems.forEach((item, index) => {
        const label = item.querySelector('label');
        if (label && keys[index]) {
            label.textContent = t(keys[index]);
        }
    });
}

function updateDimensionLabels() {
    const dimensionItems = document.querySelectorAll('.dimension-item');
    const keys = ['dimensions.width', 'dimensions.height', 'dimensions.borderRadius', 'dimensions.margin', 'dimensions.imageMargin'];
    dimensionItems.forEach((item, index) => {
        const label = item.querySelector('label');
        if (label && keys[index]) {
            label.textContent = t(keys[index]);
        }
    });
}

function updateTypeSelects() {
    // Dot type
    const dotTypeLabel = document.querySelector('label[for="dot-type"]') ||
        Array.from(document.querySelectorAll('.settings-content > div > label'))
            .find(l => l.textContent.includes('Type de point') || l.textContent.includes('Dot type'));
    if (dotTypeLabel) dotTypeLabel.textContent = t('types.dot');

    const dotSelect = document.getElementById('dot-type');
    if (dotSelect) {
        dotSelect.options[0].textContent = t('types.dots');
        dotSelect.options[1].textContent = t('types.rounded');
        dotSelect.options[2].textContent = t('types.classy');
        dotSelect.options[3].textContent = t('types.classyRounded');
        dotSelect.options[4].textContent = t('types.square');
        dotSelect.options[5].textContent = t('types.extraRounded');
    }

    // Corner square type
    const cornerSquareLabels = Array.from(document.querySelectorAll('.settings-content > div > label'));
    const cornerSquareLabel = cornerSquareLabels.find(l =>
        l.textContent.includes('carré des coins') || l.textContent.includes('Corners Square')
    );
    if (cornerSquareLabel) cornerSquareLabel.textContent = t('types.cornerSquare');

    const cornerSquareSelect = document.getElementById('corner-square-type');
    if (cornerSquareSelect) {
        cornerSquareSelect.options[0].textContent = t('types.dot.value');
        cornerSquareSelect.options[1].textContent = t('types.square');
        cornerSquareSelect.options[2].textContent = t('types.extraRounded');
    }

    // Corner dot type
    const cornerDotLabel = cornerSquareLabels.find(l =>
        l.textContent.includes('point d\'angle') || l.textContent.includes('Corners Dot')
    );
    if (cornerDotLabel) cornerDotLabel.textContent = t('types.cornerDot');

    const cornerDotSelect = document.getElementById('corner-dot-type');
    if (cornerDotSelect) {
        cornerDotSelect.options[0].textContent = t('types.dot.value');
        cornerDotSelect.options[1].textContent = t('types.square');
    }
}

function updateErrorCorrection() {
    const errorLabels = Array.from(document.querySelectorAll('.settings-content > div > label'));
    const errorLabel = errorLabels.find(l =>
        l.textContent.includes('correction') || l.textContent.includes('Error')
    );
    if (errorLabel) errorLabel.textContent = t('error.title');

    const errorSelect = document.getElementById('error-correction');
    if (errorSelect) {
        errorSelect.options[0].textContent = t('error.low');
        errorSelect.options[1].textContent = t('error.medium');
        errorSelect.options[2].textContent = t('error.high');
        errorSelect.options[3].textContent = t('error.highest');
    }

    const hint = document.querySelector('.hint');
    if (hint && hint.textContent.includes('Suggéré') || hint.textContent.includes('Suggested')) {
        hint.textContent = t('error.suggested');
    }
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    updateUILanguage();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const langSelector = document.getElementById('lang-selector');
    if (langSelector) {
        langSelector.value = currentLang;
        langSelector.addEventListener('change', (e) => {
            setLanguage(e.target.value);
        });
    }

    // Initial update after a short delay to ensure DOM is ready
    setTimeout(updateUILanguage, 100);
});
