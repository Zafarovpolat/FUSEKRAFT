'use server';
/**
 * @fileOverview Generates audio visualizations based on user's music taste extracted from Spotify and SoundCloud.
 *
 * - generateAudioVisualizations - A function that generates audio visualizations.
 * - GenerateAudioVisualizationsInput - The input type for the generateAudioVisualizations function.
 * - GenerateAudioVisualizationsOutput - The return type for the generateAudioVisualizations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const GenerateAudioVisualizationsInputSchema = z.object({
  spotifyProfileLink: z.string().optional().describe('Link to the user\'s Spotify profile.'),
  soundCloudProfileLink: z.string().optional().describe('Link to the user\'s SoundCloud profile.'),
});
export type GenerateAudioVisualizationsInput = z.infer<typeof GenerateAudioVisualizationsInputSchema>;

const GenerateAudioVisualizationsOutputSchema = z.object({
  visualization: z.string().describe('Data URI containing the audio visualization.'),
});
export type GenerateAudioVisualizationsOutput = z.infer<typeof GenerateAudioVisualizationsOutputSchema>;

export async function generateAudioVisualizations(input: GenerateAudioVisualizationsInput): Promise<GenerateAudioVisualizationsOutput> {
  return generateAudioVisualizationsFlow(input);
}

const audioVisualizationPrompt = ai.definePrompt({
  name: 'audioVisualizationPrompt',
  input: {schema: GenerateAudioVisualizationsInputSchema},
  output: {schema: GenerateAudioVisualizationsOutputSchema},
  prompt: `You are an AI that generates audio visualizations based on a user's music taste.

  The user has provided links to their Spotify and SoundCloud profiles. Extract the music taste of the user by inspecting the profile and generate a unique waveform visualization.

  Spotify Profile Link: {{spotifyProfileLink}}
  SoundCloud Profile Link: {{soundCloudProfileLink}}
  `,
});

const generateAudioVisualizationsFlow = ai.defineFlow(
  {
    name: 'generateAudioVisualizationsFlow',
    inputSchema: GenerateAudioVisualizationsInputSchema,
    outputSchema: GenerateAudioVisualizationsOutputSchema,
  },
  async input => {
    // Call the prompt to generate the audio visualization.
    const {output} = await audioVisualizationPrompt(input);

    // Return the generated visualization.
    return output!;
  }
);
