const gurlArray = [
    'https://vvgonline.net/Blog/Digital-Assets-The-Real-Estate-of-the-Virtual-World.html',
    'https://vvgonline.net/Blog/Another-Post.html',
    'https://vvgonline.net/Blog/Some-Other-Article.html'
];
export function shareFacebook(index) {
    if (index >= 0 && index < gurlArray.length) {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${gurlArray[index]}`;
        window.open(url, '_blank');
    }
    else {
        console.error('Invalid index');
    }
}
export function shareTwitter(index) {
    if (index >= 0 && index < gurlArray.length) {
        const url = `https://twitter.com/intent/tweet?url=${gurlArray[index]}`;
        window.open(url, '_blank');
    }
    else {
        console.error('Invalid index');
    }
}
export function copyLink(index) {
    if (index >= 0 && index < gurlArray.length) {
        navigator.clipboard.writeText(gurlArray[index]).then(() => {
            alert('Link copied to clipboard');
        }).catch((err) => {
            console.error('Failed to copy: ', err);
        });
    }
    else {
        console.error('Invalid index');
    }
}
// Attach functions to the global window object
window.shareFacebook = shareFacebook;
window.shareTwitter = shareTwitter;
window.copyLink = copyLink;
//# sourceMappingURL=share-button-script.js.map