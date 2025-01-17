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
import * as fs from 'fs';
//import { IncomingMessage } from 'http'; // For IP address
//define subscribe button
const btnSubscribeButton = document.getElementById('subscribeButton');
//define input textbox
const emailTextBox = document.getElementById('email');
// let newsletterData: { emails: string[] } = { emails: [] };
//json file path
const url = 'https://vvgonline.net/assets/scripts/dist/newsletterSubmission.json';
// Function to get IP address from browser
function getClientIp() {
    return __awaiter(this, void 0, void 0, function* () {
        const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
        const candidates = [
            // Try to use external IP detection services (replace with your preferred service)
            fetch('https://api.ipify.org?format=text')
                .then((response) => response.text())
                .catch(() => ''),
            // Fallback to unreliable browser-based detection
            window.RTCPeerConnection ? new Promise((resolve) => {
                const pc = new RTCPeerConnection();
                pc.createDataChannel('');
                pc.createOffer().then((offer) => {
                    var _a;
                    pc.setLocalDescription(offer);
                    const ip = offer.sdp ? (_a = offer.sdp.match(ipRegex)) === null || _a === void 0 ? void 0 : _a[0] : undefined;
                    resolve(ip);
                }).catch(() => resolve(undefined));
            }) : undefined,
        ];
        for (const candidate of candidates) {
            const ip = yield candidate;
            if (ip && ipRegex.test(ip)) {
                return ip;
            }
        }
        return undefined;
    });
}
// Function to write email data to JSON file
function writeEmailDataToJSON(email, date, time, ipAddress, deviceType = 'Browser', // Default device type
browser = navigator.userAgent // Use browser user agent
) {
    const filePath = url;
    const emailData = {
        email,
        date,
        time,
        ipAddress,
        deviceType,
        browser,
    };
    try {
        const currentData = fs.readFileSync(filePath, 'utf-8');
        const parsedData = JSON.parse(currentData) || [];
        parsedData.push(emailData);
        fs.writeFileSync(filePath, JSON.stringify(parsedData, null, 2));
        console.log('Email data written to JSON file successfully.');
    }
    catch (error) {
        console.error('Error writing email data to JSON file:', error);
        // Handle errors gracefully, e.g., display an error message to the user
    }
}
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
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const ipAddress = (yield getClientIp()) || 'Unknown';
    if (emailTextBox) {
        writeEmailDataToJSON(emailTextBox.value.toString(), date, time, ipAddress);
    }
    // Clear the email input field after successful submission
    if (emailTextBox) {
        emailTextBox.value = '';
    }
}));
function getBrowser() {
    const userAgent = navigator.userAgent;
    const isChrome = userAgent.indexOf('Chrome') > -1;
    const isFirefox = userAgent.indexOf('Firefox') > -1;
    const isSafari = userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1;
    const isEdge = userAgent.indexOf('Edge') > -1;
    const isOpera = userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1;
    if (isChrome) {
        return 'Chrome';
    }
    else if (isFirefox) {
        return 'Firefox';
    }
    else if (isSafari) {
        return 'Safari';
    }
    else if (isEdge) {
        return 'Edge';
    }
    else if (isOpera) {
        return 'Opera';
    }
    else {
        return 'Other';
    }
}
function getDeviceType() {
    const userAgent = navigator.userAgent;
    const isMobile = Boolean(navigator.userAgent.match(/Mobi/));
    if (isMobile) {
        return 'mobile';
    }
    else {
        return 'desktop';
    }
}
//# sourceMappingURL=site.js.map