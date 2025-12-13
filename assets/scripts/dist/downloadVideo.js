var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Downloads a video file from the given blob URL.
 * @param {string} blobUrl - The URL of the blob to download.
 * @param {string} filename - The name to save the downloaded file as.
 * @returns {Promise<void>} A Promise that resolves when the video has been successfully downloaded.
 */
export function downloadVideo(blobUrl, filename) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(blobUrl);
            const blob = yield response.blob();
            const url = window.URL.createObjectURL(blob);
            // Create a new anchor element and set its properties
            const link = document.createElement('a');
            link.style.display = 'none';
            link.href = url;
            link.download = filename;
            // Append the anchor to the body of the document and trigger a click event
            document.body.appendChild(link);
            link.click();
            // Clean up by revoking the object URL and removing the anchor element from the body
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
        }
        catch (error) {
            console.error('Error downloading the video:', error);
        }
    });
}
//# sourceMappingURL=downloadVideo.js.map