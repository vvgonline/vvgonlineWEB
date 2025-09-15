import { downloadVideo } from './downloadVideo.js';
// import { shareFacebook, shareTwitter, copyLink } from './share-button-script.js';
import { initializeSlideNavigation, toggleFullscreen } from './presentation.js';

// Initialize the slide navigation when the application starts
initializeSlideNavigation();

// Add event listener for fullscreen toggle button
const fullscreenBtn = document.getElementById('fullscreenBtn') as HTMLButtonElement | null;
fullscreenBtn?.addEventListener('click', toggleFullscreen);

console.log('Hello from site.ts!');

// Define subscribe button
const btnSubscribeButton = document.getElementById('subscribeButton') as HTMLButtonElement | null;
// Define input textbox
const emailTextBox = document.getElementById('email') as HTMLInputElement | null;

// Email validation
function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

btnSubscribeButton?.addEventListener('click', async () => {
    // Validate email
    if (!isValidEmail(emailTextBox?.value.trim() || '')) {
        alert('Please enter a valid email address.');
        emailTextBox?.focus();
        return;
    }

    // Clear the email input field after successful submission
    if (emailTextBox) {
        emailTextBox.value = '';
    }
});

/**
 * A reference to the HTML video element with the ID 'hero-video-background'.
 * This element is expected to be present in the DOM and is used for displaying
 * the background video on the hero section of the webpage.
 */
const video = document.getElementById('hero-video-background') as HTMLVideoElement | null;

if (video) {
    video.addEventListener('canplay', () => {
        video.classList.add('video-loaded');
    });
}

document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        downloadVideo('blob:https://learn.microsoft.com/41852f3e-1f0e-43cd-a57a-2742ff170a3c', 'video.mp4');
    }

    if (e.key === 'Escape' && document.fullscreenElement) {
        document.exitFullscreen();
    }

    // Add this new block to handle 'f' key press for fullscreen
    if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
    }
});

// Example usage
// shareFacebook(0);
// shareTwitter(0);
// copyLink(0);