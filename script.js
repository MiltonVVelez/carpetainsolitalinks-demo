document.addEventListener('DOMContentLoaded', () => {
// Set current year dynamically
const yearEl = document.getElementById('current-year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

const shareBtn = document.getElementById('share-btn');
const toast = document.getElementById('toast');

// Modern Mobile Native Share integration
shareBtn.addEventListener('click', async () => {
    const shareData = {
    title: document.title,
    text: 'Explore my links and latest projects!',
    url: window.location.href,
    };

    if (navigator.share) {
    try {
        await navigator.share(shareData);
    } catch (err) {
        if (err.name !== 'AbortError') {
        copyToClipboard();
        }
    }
    } else {
    copyToClipboard();
    }
});

function copyToClipboard() {
    if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(window.location.href)
        .then(showToast)
        .catch(fallbackCopy);
    } else {
    fallbackCopy();
    }
}

function fallbackCopy() {
    const tempInput = document.createElement('input');
    tempInput.value = window.location.href;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast();
}

function showToast() {
    toast.classList.add('show');
    setTimeout(() => {
    toast.classList.remove('show');
    }, 2500);
}
});