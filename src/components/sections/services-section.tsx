import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const ServiceCard = ({ title, description, price, revisions, genres, notes }: { title: string, description: string, price: number, revisions: number, genres: string[], notes: string }) => (
  <Card className="flex flex-col h-full overflow-hidden relative">
    <CardHeader>
      <CardTitle className="text-2xl font-bold text-primary">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent className="flex-grow flex flex-col justify-between">
      <div>
        <div className="mb-4 flex flex-wrap gap-2">
          {genres.map(genre => (
            <Badge key={genre} variant="secondary">{genre}</Badge>
          ))}
        </div>
        <p className="text-4xl font-black mb-2">${price}<span className="text-lg font-normal text-foreground/70">/song</span></p>
        <p className="text-sm text-accent font-bold">+${revisions} per revision</p>
      </div>
      <div className="mt-6 border-t border-border/20 pt-4">
        <div className="flex items-center text-sm text-foreground/80">
          <Check className="h-4 w-4 mr-2 text-green-400" />
          <span>{notes}</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

export function ServicesSection() {
  const services = [
    {
      title: 'Composition',
      description: 'Full track creation from scratch, tailored to your vision.',
      price: 25,
      revisions: 5,
      genres: ['Phonk', 'Trap', 'Ambient', 'Experimental'],
      notes: 'Low introductory price for the first 10 clients!'
    },
    {
      title: 'Mixing & Mastering',
      description: 'Professional polish to make your tracks radio-ready.',
      price: 30,
      revisions: 5,
      genres: ['All Genres', 'Vocal Processing', 'Stem Mastering'],
      notes: 'Supported by both SXR3NE and VXNTUS for quality assurance.'
    }
  ];

  return (
    <section id="services" className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl">
            Our Services
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            Crafting the future of sound, one beat at a time.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map(service => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
