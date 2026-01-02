export function getFileType(filePath) {
    if (!filePath) return 'unknown';
    
    // Extract extension (handle query strings/hashes)
    const extension = filePath.split('.').pop().split(/[#?]/)[0].toLowerCase();
    
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'];
    const videoExtensions = ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv'];
    
    if (imageExtensions.includes(extension)) return 'image';
    if (videoExtensions.includes(extension)) return 'video';
    
    return 'unknown';
}