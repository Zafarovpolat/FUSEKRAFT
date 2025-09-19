
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

  const data = validatedFields.data;

  // Send to Discord
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const embed = {
        title: 'New Contact Form Submission',
        color: 0x00ff00,
        fields: [
          { name: 'Legal Name', value: data.legalName, inline: true },
          { name: 'Artist Name', value: data.artistName, inline: true },
          { name: 'Age', value: data.age.toString(), inline: true },
          { name: 'Nationality', value: data.nationality, inline: true },
          { name: 'Email', value: data.email, inline: false },
          { name: 'Spotify Profile', value: data.spotifyProfile || 'N/A', inline: false },
          { name: 'Selected Service', value: data.selectedService, inline: true },
          { name: 'SoundCloud Link', value: data.soundCloudLink || 'N/A', inline: false },
          { name: 'Assistance Details', value: data.assistanceDetails, inline: false },
          { name: 'Song Reference', value: data.songReference || 'N/A', inline: false },
        ],
        timestamp: new Date().toISOString(),
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ embeds: [embed] }),
      });

      if (!response.ok) {
        console.error('Failed to send to Discord:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending to Discord:', error);
    }
  } else {
    console.warn('DISCORD_WEBHOOK_URL not set');
  }

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
