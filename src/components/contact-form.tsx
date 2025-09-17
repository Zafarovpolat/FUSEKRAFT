'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef } from 'react';
import { submitContactForm, type ContactFormState } from '@/app/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { CheckCircle } from 'lucide-react';

const initialState: ContactFormState = {
  message: '',
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg" className="w-full font-bold text-lg py-6 pulse-glow-primary">
      {pending ? 'Sending...' : 'Submit Request'}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useFormState(submitContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        // Success is handled by the Alert below
      } else {
        toast({
          variant: 'destructive',
          title: 'Validation Error',
          description: state.message,
        });
      }
    }
  }, [state, toast]);

  useEffect(() => {
    if (state.success && state.resetKey) {
      formRef.current?.reset();
    }
  }, [state.success, state.resetKey]);

  return (
    <>
      {state.success ? (
        <Alert variant="default" className="border-green-500/50 text-green-400 [&>svg]:text-green-500">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      ) : (
        <form ref={formRef} action={formAction} className="space-y-8" key={state.resetKey}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="legalName">Legal Name (First and Last)</Label>
              <Input name="legalName" id="legalName" placeholder="John Doe" required className="bg-background/80" />
              {state.errors?.legalName && <p className="text-sm text-destructive">{state.errors.legalName[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="artistName">Artist Name (Alias)</Label>
              <Input name="artistName" id="artistName" placeholder="ANDROMEDA" required className="bg-background/80" />
              {state.errors?.artistName && <p className="text-sm text-destructive">{state.errors.artistName[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age (14+)</Label>
              <Input name="age" id="age" type="number" placeholder="20" required className="bg-background/80" />
              {state.errors?.age && <p className="text-sm text-destructive">{state.errors.age[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="nationality">Nationality</Label>
              <Input name="nationality" id="nationality" placeholder="e.g., Georgia" required className="bg-background/80" />
              {state.errors?.nationality && <p className="text-sm text-destructive">{state.errors.nationality[0]}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Your email</Label>
            <Input name="email" id="email" type="email" placeholder="example@example.com" required className="bg-background/80" />
            {state.errors?.email && <p className="text-sm text-destructive">{state.errors.email[0]}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="spotifyProfile">Link to your Spotify Artist Profile</Label>
            <Input name="spotifyProfile" id="spotifyProfile" placeholder='or "N/A"' className="bg-background/80" />
            {state.errors?.spotifyProfile && <p className="text-sm text-destructive">{state.errors.spotifyProfile[0]}</p>}
          </div>
          <div className="space-y-2">
            <Label>Your Selected Service</Label>
            <Select name="selectedService" required>
              <SelectTrigger className="w-full bg-background/80">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Composition">Composition</SelectItem>
                <SelectItem value="Mixing/Mastering">Mixing/Mastering</SelectItem>
              </SelectContent>
            </Select>
            {state.errors?.selectedService && <p className="text-sm text-destructive">{state.errors.selectedService[0]}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="soundCloudLink">Private SoundCloud Link</Label>
            <Input name="soundCloudLink" id="soundCloudLink" placeholder="https://soundcloud.com/..." className="bg-background/80" />
             {state.errors?.soundCloudLink && <p className="text-sm text-destructive">{state.errors.soundCloudLink[0]}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="assistanceDetails">Assistance with what, exactly?</Label>
            <Textarea name="assistanceDetails" id="assistanceDetails" placeholder="Drums, Clarity, Vocals..." required className="bg-background/80 min-h-[120px]" />
            {state.errors?.assistanceDetails && <p className="text-sm text-destructive">{state.errors.assistanceDetails[0]}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="songReference">Song Reference [Optional]</Label>
            <Input name="songReference" id="songReference" placeholder="YouTube/Spotify/SoundCloud link" className="bg-background/80" />
            {state.errors?.songReference && <p className="text-sm text-destructive">{state.errors.songReference[0]}</p>}
          </div>
          <SubmitButton />
        </form>
      )}
    </>
  );
}
