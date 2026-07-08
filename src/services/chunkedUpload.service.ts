import { UploadProgress } from '../types/engine';

/**
 * Service to handle uploading large files in sequential chunks with automatic retries and progress reporting.
 */
export const ChunkedUploadService = {
  async uploadFileInChunks(
    file: File,
    onProgress?: (progress: UploadProgress) => void,
    abortSignal?: AbortSignal,
    chunkSize = 5 * 1024 * 1024 // 5MB chunks by default
  ): Promise<{ url: string; fileName: string }> {
    const totalSize = file.size;
    const totalChunks = Math.ceil(totalSize / chunkSize);
    const uploadId = `${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    
    let uploadedBytes = 0;

    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
      if (abortSignal?.aborted) {
        throw new Error('Upload aborted');
      }

      const start = chunkIndex * chunkSize;
      const end = Math.min(start + chunkSize, totalSize);
      const chunkBlob = file.slice(start, end);
      const currentChunkSize = end - start;

      const formData = new FormData();
      formData.append('chunk', chunkBlob, file.name);
      formData.append('uploadId', uploadId);
      formData.append('chunkIndex', chunkIndex.toString());
      formData.append('totalChunks', totalChunks.toString());
      formData.append('fileName', file.name);

      // Perform upload with exponential backoff retry logic
      let attempt = 0;
      const maxAttempts = 3;
      let success = false;
      let responseData: any = null;

      while (attempt < maxAttempts && !success) {
        if (abortSignal?.aborted) {
          throw new Error('Upload aborted');
        }
        try {
          const response = await fetch('/api/upload/chunk', {
            method: 'POST',
            body: formData,
            signal: abortSignal,
          });

          if (!response.ok) {
            throw new Error(`Server responded with ${response.status}`);
          }

          responseData = await response.json();
          success = true;
        } catch (error) {
          attempt++;
          if (attempt >= maxAttempts) {
            throw new Error(`Failed to upload chunk ${chunkIndex} after ${maxAttempts} attempts: ${error}`);
          }
          const backoff = 1000 * Math.pow(2, attempt);
          await new Promise((resolve) => setTimeout(resolve, backoff));
        }
      }

      uploadedBytes += currentChunkSize;
      
      onProgress?.({
        bytesTransferred: uploadedBytes,
        totalBytes: totalSize,
        percentage: Math.min(100, Math.round((uploadedBytes / totalSize) * 100)),
      });

      if (responseData && responseData.status === 'completed') {
        return {
          url: responseData.url,
          fileName: responseData.fileName,
        };
      }
    }

    if (totalChunks === 0) {
      throw new Error('Cannot upload empty file');
    }

    throw new Error('Upload finished but did not receive complete status from server.');
  }
};
