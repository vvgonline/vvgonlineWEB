//define subscribe button
const btnSubscribeButton = document.getElementById('subscribeButton');
//define input textbox
const emailTextBox = document.getElementById('email') as HTMLInputElement | null;

//email validation
function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

document.getElementById('subscribeButton')?.addEventListener('click', async () => {
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
const video = document.getElementById('hero-video-background');

if (video) {
    video.addEventListener('canplay', () => {
        video.classList.add('video-loaded');
    });
}