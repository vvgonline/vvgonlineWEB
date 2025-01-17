//import * as fs from 'fs';
//import * as os from 'os';
//import * as path from 'path';

//define subscribe button
const btnSubscribeButton = document.getElementById('subscribeButton');
//define input textbox
const emailTextBox = document.getElementById('email') as HTMLInputElement | null;
let newsletterData: { emails: string[] } = { emails: [] };

//email validation
function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

document.getElementById('subscribeButton')?.addEventListener('click', () => {
    // Validate email
    if (!isValidEmail(emailTextBox?.value || '')) {
        alert('Please enter a valid email address.');
        emailTextBox?.focus();
        return;
    }
});