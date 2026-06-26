import { z } from 'zod';

const envSchema = z.object({
  VITE_FIREBASE_API_KEY: z.string().default("AIzaSyBOXVvQm2JxW7JT9CXlFeZqC23iSrX3GoA"),
  VITE_FIREBASE_AUTH_DOMAIN: z.string().default("nakurubnb-b99f2.firebaseapp.com"),
  VITE_FIREBASE_PROJECT_ID: z.string().default("nakurubnb-b99f2"),
  VITE_FIREBASE_STORAGE_BUCKET: z.string().default("nakurubnb-b99f2.firebasestorage.app"),
  VITE_FIREBASE_MESSAGING_SENDER_ID: z.string().default("234989018252"),
  VITE_FIREBASE_APP_ID: z.string().default("1:234989018252:web:3547fa5f00d7ed6d9eefa9"),
  VITE_CLOUDINARY_CLOUD_NAME: z.string().default("demo"),
  VITE_CLOUDINARY_UPLOAD_PRESET: z.string().default("demo"),
});

let _env: z.infer<typeof envSchema>;

try {
  _env = envSchema.parse({
    VITE_FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
    VITE_FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    VITE_FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    VITE_FIREBASE_STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    VITE_FIREBASE_MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    VITE_FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID,
    VITE_CLOUDINARY_CLOUD_NAME: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    VITE_CLOUDINARY_UPLOAD_PRESET: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
  });
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error('❌ Invalid environment variables:', error.format());
    throw new Error('Invalid environment variables. Check console for details.');
  }
  throw error;
}

export const env = _env;
