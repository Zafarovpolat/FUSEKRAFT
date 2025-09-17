'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import Image from 'next/image';
import { generateVisualizationAction, type VisualizerFormState } from '@/app/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const initialState: VisualizerFormState = {
  message: '',
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full font-bold">
      {pending ? 'Generating...' : 'Generate Visualization'}
    </Button>
  );
}

export function AudioVisualizerForm() {
  const [state, formAction] = useFormState(generateVisualizationAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && !state.success) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <Card className="liquid-glass w-full max-w-2xl mx-auto">
      <form action={formAction}>
        <CardHeader>
          <CardTitle>Generate Audio Visualization</CardTitle>
          <CardDescription>Enter your Spotify or SoundCloud profile to generate a unique waveform visualization based on your music taste.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="spotifyProfileLink">Spotify Profile Link</Label>
            <Input id="spotifyProfileLink" name="spotifyProfileLink" placeholder="https://open.spotify.com/user/..." />
            {state.errors?.spotifyProfileLink && <p className="text-sm text-destructive mt-1">{state.errors.spotifyProfileLink[0]}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="soundCloudProfileLink">SoundCloud Profile Link</Label>
            <Input id="soundCloudProfileLink" name="soundCloudProfileLink" placeholder="https://soundcloud.com/..." />
            {state.errors?.soundCloudProfileLink && <p className="text-sm text-destructive mt-1">{state.errors.soundCloudProfileLink[0]}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-4">
          <SubmitButton />
          {state.success && state.visualization && (
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Generation Complete!</AlertTitle>
              <AlertDescription className="mt-2">
                <p>Here is your generated audio visualization:</p>
                <div className="mt-4 rounded-lg overflow-hidden border-2 border-primary pulse-glow-primary">
                  <Image
                    src={state.visualization.visualization}
                    alt="Generated Audio Visualization"
                    width={1280}
                    height={720}
                    className="w-full h-auto"
                  />
                </div>
              </AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
