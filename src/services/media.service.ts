/**
 * Media Service for handling file uploads using Cloudinary with robust retry logic.
 */

import { env } from '../lib/env';
import imageCompression from 'browser-image-compression';

export const MediaService = {
  async uploadImage(file: File): Promise<string> {
    const details = await this.uploadImageDetails(file);
    return details.secure_url;
  },

  async retryWithBackoff<T>(
    fn: () => Promise<T>,
    retries = 3,
    delay = 1000,
    backoffFactor = 2,
    onRetry?: (attempt: number, error: any) => void
  ): Promise<T> {
    let attempt = 0;
    while (true) {
      try {
        return await fn();
      } catch (error) {
        attempt++;
        if (attempt > retries) {
          throw error;
        }
        if (onRetry) {
          onRetry(attempt, error);
        }
        const waitTime = delay * Math.pow(backoffFactor, attempt - 1);
        console.warn(`[MediaService] Retry #${attempt} in ${waitTime}ms due to:`, error);
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }
    }
  },

  async uploadImageDetails(file: File, onRetry?: (attempt: number, error: any) => void): Promise<{ secure_url: string; public_id: string }> {
    let compressedFile = file;
    if (file.type.startsWith('image/')) {
      try {
        const compressionOptions = {
          maxSizeMB: 2,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressed = await imageCompression(file, compressionOptions);
        compressedFile = new File([compressed], file.name, {
          type: compressed.type,
          lastModified: Date.now(),
        });
      } catch (err) {
        console.warn('Image compression failed:', err);
      }
    }

    const formData = new FormData();
    formData.append('file', compressedFile);

    const performUpload = async () => {
      const response = await fetch('/api/cloudinary/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        let errorMessage = 'Failed to upload image via backend proxy';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (_) {}
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return {
        secure_url: data.secure_url,
        public_id: data.public_id,
      };
    };

    try {
      // Retry up to 3 times with 1.5s initial delay and factor of 2 (1.5s, 3s, 6s)
      return await this.retryWithBackoff(performUpload, 3, 1500, 2, onRetry);
    } catch (error) {
      console.error('All Cloudinary proxy upload attempts failed:', error);
      throw error;
    }
  }
};


