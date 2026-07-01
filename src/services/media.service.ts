/**
 * Media Service for handling file uploads using Cloudinary.
 */

import { env } from '../lib/env';
import imageCompression from 'browser-image-compression';

export const MediaService = {
  async uploadImage(file: File): Promise<string> {
    const details = await this.uploadImageDetails(file);
    return details.secure_url;
  },

  async uploadImageDetails(file: File): Promise<{ secure_url: string; public_id: string }> {
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

    try {
      const response = await fetch('/api/cloudinary/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload image via backend proxy');
      }

      const data = await response.json();
      return {
        secure_url: data.secure_url,
        public_id: data.public_id,
      };
    } catch (error) {
      console.error('Error uploading via proxy:', error);
      throw error;
    }
  }
};

