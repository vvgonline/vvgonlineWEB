/**
 * Downloads a video file from the given blob URL.
 * @param blobUrl The URL of the blob to download.
 * @param filename The name to save the downloaded file as.
 */
export async function downloadVideo(blobUrl: string, filename: string): Promise<void> {
    try {
        const response = await fetch(blobUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    } catch (error) {
        console.error('Error downloading the video:', error);
    }
}