"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
//define subscribe button
const btnSubscribeButton = document.getElementById('subscribeButton');
//define input textbox
const emailTextBox = document.getElementById('email');
//email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
(_a = document.getElementById('subscribeButton')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    // Validate email
    if (!isValidEmail((emailTextBox === null || emailTextBox === void 0 ? void 0 : emailTextBox.value.trim()) || '')) {
        alert('Please enter a valid email address.');
        emailTextBox === null || emailTextBox === void 0 ? void 0 : emailTextBox.focus();
        return;
    }
    // Clear the email input field after successful submission
    if (emailTextBox) {
        emailTextBox.value = '';
    }
}));
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
//# sourceMappingURL=site.js.map