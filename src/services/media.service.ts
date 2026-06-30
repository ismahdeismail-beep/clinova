/**
 * Media Service for handling file uploads using Cloudinary.
 */

import { env } from '../lib/env';
import imageCompression from 'browser-image-compression';

export const MediaService = {
  async uploadImage(file: File): Promise<string> {
    const cloudName = env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = env.VITE_CLOUDINARY_UPLOAD_PRESET;

    let compressedFile = file;
    if (file.type.startsWith('image/')) {
      try {
        const compressionOptions = {
          maxSizeMB: 2,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressed = await imageCompression(file, compressionOptions);
        // Retain original name on the compressed file if available
        compressedFile = new File([compressed], file.name, {
          type: compressed.type,
          lastModified: Date.now(),
        });
      } catch (err) {
        console.warn('Image compression failed, uploading original file:', err);
      }
    }

    const formData = new FormData();
    formData.append('file', compressedFile);
    formData.append('upload_preset', uploadPreset);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to upload image to Cloudinary');
      }

      const data = await response.json();
      return data.secure_url; // Returns the public HTTPS URL of the uploaded image
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw error;
    }
  },

  async uploadImageDetails(file: File): Promise<{ secure_url: string; public_id: string }> {
    const cloudName = env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = env.VITE_CLOUDINARY_UPLOAD_PRESET;

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
    formData.append('upload_preset', uploadPreset);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to upload image to Cloudinary');
      }

      const data = await response.json();
      return {
        secure_url: data.secure_url,
        public_id: data.public_id,
      };
    } catch (error) {
      console.error('Error uploading to Cloudinary details:', error);
      throw error;
    }
  }
};

