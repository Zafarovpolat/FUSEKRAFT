
'use server';

import { z } from 'zod';
import { generateAudioVisualizations, type GenerateAudioVisualizationsOutput } from '@/ai/flows/generate-audio-visualizations';

// --- Contact Form ---
const contactFormSchema = z.object({
  legalName: z.string().min(1, { message: 'Legal name is required.' }),
  artistName: z.string().min(1, { message: 'Artist name is required.' }),
  age: z.coerce.number().min(14, { message: 'You must be 14 or older.' }),
  nationality: z.string().min(1, { message: 'Nationality is required.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  spotifyProfile: z.string().optional(),
  selectedService: z.enum(['Composition', 'Mixing/Mastering'], { errorMap: () => ({ message: 'Please select a service.' }) }),
  soundCloudLink: z.string().url({ message: 'Please provide a valid SoundCloud URL.' }).or(z.literal('')),
  assistanceDetails: z.string().min(10, { message: 'Please describe your needs in at least 10 characters.' }),
  songReference: z.string().optional(),
});

export type ContactFormState = {
  message: string;
  success: boolean;
  errors?: {
    [key: string]: string[] | undefined;
  };
  resetKey?: string;
};

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const validatedFields = contactFormSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      message: 'Please correct the errors below.',
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Here you would typically send an email or save to a database.
  // For this demo, we'll just log the data.
  console.log('New Contact Form Submission:', validatedFields.data);

  return {
    message: "Your request has been sent! We'll be in touch soon.",
    success: true,
    resetKey: Date.now().toString(),
  };
}


// --- Audio Visualizer ---
const visualizerFormSchema = z.object({
  spotifyProfileLink: z.string().optional(),
  soundCloudProfileLink: z.string().optional(),
}).refine(data => data.spotifyProfileLink || data.soundCloudProfileLink, {
  message: 'Please provide at least one profile link.',
  path: ['spotifyProfileLink'],
});


export type VisualizerFormState = {
  message: string;
  success: boolean;
  visualization?: GenerateAudioVisualizationsOutput;
  errors?: {
    [key: string]: string[] | undefined;
  };
};

export async function generateVisualizationAction(
  prevState: VisualizerFormState,
  formData: FormData
): Promise<VisualizerFormState> {
    const validatedFields = visualizerFormSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
          message: 'Please correct the errors below.',
          success: false,
          errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        const result = await generateAudioVisualizations({
            spotifyProfileLink: validatedFields.data.spotifyProfileLink,
            soundCloudProfileLink: validatedFields.data.soundCloudProfileLink,
        });

        return {
            message: 'Visualization generated successfully!',
            success: true,
            visualization: result,
        };
    } catch (error) {
        console.error("Error generating visualization:", error);
        return {
            message: 'Failed to generate visualization. Please try again.',
            success: false,
        };
    }
}
