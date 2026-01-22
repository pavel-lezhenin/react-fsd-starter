import { z } from 'zod';

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_PORT: z.string().optional().default('3000'),
  VITE_PREVIEW_PORT: z.string().optional().default('4173'),
  VITE_ENABLE_MSW: z.string().optional().default('false'),
});

function validateEnv(): z.infer<typeof envSchema> {
  const parsed = envSchema.safeParse(import.meta.env);

  if (!parsed.success) {
    console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
    throw new Error('Invalid environment variables');
  }

  return parsed.data;
}

export const env = validateEnv();
