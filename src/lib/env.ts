import { z } from 'zod';

const envSchema = z.object({
  VITE_FIREBASE_API_KEY: z.string().optional().default(""),
  VITE_FIREBASE_AUTH_DOMAIN: z.string().optional().default(""),
  VITE_FIREBASE_PROJECT_ID: z.string().optional().default(""),
  VITE_FIREBASE_STORAGE_BUCKET: z.string().optional().default(""),
  VITE_FIREBASE_MESSAGING_SENDER_ID: z.string().optional().default(""),
  VITE_FIREBASE_APP_ID: z.string().optional().default(""),
  VITE_CLOUDINARY_CLOUD_NAME: z.string().optional().default("demo"),
  VITE_CLOUDINARY_UPLOAD_PRESET: z.string().optional().default("demo"),
});

let _env: z.infer<typeof envSchema> = {
  VITE_FIREBASE_API_KEY: "",
  VITE_FIREBASE_AUTH_DOMAIN: "",
  VITE_FIREBASE_PROJECT_ID: "",
  VITE_FIREBASE_STORAGE_BUCKET: "",
  VITE_FIREBASE_MESSAGING_SENDER_ID: "",
  VITE_FIREBASE_APP_ID: "",
  VITE_CLOUDINARY_CLOUD_NAME: "demo",
  VITE_CLOUDINARY_UPLOAD_PRESET: "demo",
};

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
  console.error('❌ Environment parsing error:', error);
}

export const env = _env;
