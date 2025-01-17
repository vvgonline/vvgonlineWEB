import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
//import { IncomingMessage } from 'http'; // For IP address

//define subscribe button
const btnSubscribeButton = document.getElementById('subscribeButton');
//define input textbox
const emailTextBox = document.getElementById('email') as HTMLInputElement | null;
// let newsletterData: { emails: string[] } = { emails: [] };
//json file path
const url = 'https://vvgonline.net/assets/scripts/dist/newsletterSubmission.json';

// Function to get IP address from browser
async function getClientIp(): Promise<string | undefined> {
    const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    const candidates = [
        // Try to use external IP detection services (replace with your preferred service)
        fetch('https://api.ipify.org?format=text')
            .then((response) => response.text())
            .catch(() => ''),
        // Fallback to unreliable browser-based detection
        window.RTCPeerConnection ? new Promise<string | undefined>((resolve) => {
            const pc = new RTCPeerConnection();
            pc.createDataChannel('');
            pc.createOffer().then((offer) => {
                pc.setLocalDescription(offer);
                const ip = offer.sdp ? offer.sdp.match(ipRegex)?.[0] : undefined;
                resolve(ip);
            }).catch(() => resolve(undefined));
        }) : undefined,
    ];

    for (const candidate of candidates) {
        const ip = await candidate;
        if (ip && ipRegex.test(ip)) {
            return ip;
        }
    }

    return undefined;
}

// Function to write email data to JSON file
function writeEmailDataToJSON(
    email: string,
    date: string,
    time: string,
    ipAddress: string,
    deviceType: string = 'Browser', // Default device type
    browser: string = navigator.userAgent // Use browser user agent
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
    } catch (error) {
      console.error('Error writing email data to JSON file:', error);
      // Handle errors gracefully, e.g., display an error message to the user
    }
  }

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
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const ipAddress = await getClientIp() || 'Unknown';

    if (emailTextBox) {
        writeEmailDataToJSON(emailTextBox.value.toString(), date, time, ipAddress);
    }

    // Clear the email input field after successful submission
    if (emailTextBox) {
        emailTextBox.value = '';
    }
});

function getBrowser(): string {
    const userAgent = navigator.userAgent;
    const isChrome = userAgent.indexOf('Chrome') > -1;
    const isFirefox = userAgent.indexOf('Firefox') > -1;
    const isSafari = userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1;
    const isEdge = userAgent.indexOf('Edge') > -1;
    const isOpera = userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1;

    if (isChrome) {
        return 'Chrome';
    } else if (isFirefox) {
        return 'Firefox';
    } else if (isSafari) {
        return 'Safari';
    } else if (isEdge) {
        return 'Edge';
    } else if (isOpera) {
        return 'Opera';
    } else {
        return 'Other';
    }
}

function getDeviceType(): string {
    const userAgent = navigator.userAgent;
    const isMobile = Boolean(navigator.userAgent.match(/Mobi/));

    if (isMobile) {
        return 'mobile';
    } else {
        return 'desktop';
    }
}