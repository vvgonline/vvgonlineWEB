/**
 * Downloads a video file from the given blob URL.
 * @param {string} blobUrl - The URL of the blob to download.
 * @param {string} filename - The name to save the downloaded file as.
 * @returns {Promise<void>} A Promise that resolves when the video has been successfully downloaded.
 */
export async function downloadVideo(blobUrl: string, filename: string): Promise<void> {
    try {
        const response = await fetch(blobUrl);
        const blob = await response.blob();
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
}