"use strict";
//import * as fs from 'fs';
//import * as os from 'os';
//import * as path from 'path';
var _a;
//define subscribe button
const btnSubscribeButton = document.getElementById('subscribeButton');
//define input textbox
const emailTextBox = document.getElementById('email');
let newsletterData = { emails: [] };
//email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
(_a = document.getElementById('subscribeButton')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    // Validate email
    if (!isValidEmail((emailTextBox === null || emailTextBox === void 0 ? void 0 : emailTextBox.value) || '')) {
        alert('Please enter a valid email address.');
        emailTextBox === null || emailTextBox === void 0 ? void 0 : emailTextBox.focus();
        return;
    }
});
//# sourceMappingURL=site.js.map