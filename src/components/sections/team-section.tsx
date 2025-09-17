import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SpotifyIcon } from '@/components/icons/SpotifyIcon';
import { YoutubeIcon } from '@/components/icons/YoutubeIcon';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const TeamMemberCard = ({ name, alias, bio, stats, socials, imageId }: { name: string, alias: string, bio: string, stats: { label: string, value: string }[], socials: { name: string, href: string, icon: React.ElementType }[], imageId: string }) => {
  const imageData = PlaceHolderImages.find(img => img.id === imageId);

  return (
    <Card className="flex flex-col items-center text-center overflow-hidden">
      <CardHeader className="items-center">
        {imageData && (
          <div className="relative w-40 h-40 mb-4 rounded-full overflow-hidden border-2 border-primary">
            <Image
              src={imageData.imageUrl}
              alt={`Profile of ${name}`}
              fill
              className="object-cover"
              data-ai-hint={imageData.imageHint}
            />
          </div>
        )}
        <CardTitle className="text-3xl font-black text-primary">{alias}</CardTitle>
        <CardDescription className="text-foreground/80">{name}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-foreground/90 mb-6">{bio}</p>
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {stats.map(stat => (
            <Badge key={stat.label} variant="outline" className="text-sm py-1 px-3 border-accent/50 text-accent">
              <span className="font-bold mr-2">{stat.value}</span> {stat.label}
            </Badge>
          ))}
        </div>
        <div className="flex justify-center space-x-4">
          {socials.map(social => (
            <Link key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name} className="group">
              <social.icon className="h-7 w-7 text-foreground/70 transition-all duration-300 group-hover:text-primary group-hover:scale-110"/>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export function TeamSection() {
  const team = [
    {
      name: 'Matthew Edward',
      alias: 'SXR3NE',
      bio: 'A master of atmospheric phonk, SXR3NE specializes in crafting immersive soundscapes that blend haunting melodies with hard-hitting 808s. His sound is a journey through neon-drenched cityscapes and digital dreams.',
      stats: [
        { label: 'Views', value: '1M+' },
        { label: 'Streams', value: '500K+' },
      ],
      socials: [
        { name: 'Spotify', href: '#', icon: SpotifyIcon },
        { name: 'YouTube', href: '#', icon: YoutubeIcon },
      ],
      imageId: 'matthew-edward'
    },
    {
      name: 'Zafarov Polat',
      alias: 'VXNTUS',
      bio: 'The architect of aggressive, high-energy phonk, VXNTUS is known for his distorted basslines and complex drum patterns. His production style is raw, powerful, and designed to make an impact.',
      stats: [
        { label: 'Features', value: '20+' },
        { label: 'Projects', value: '5+' },
      ],
      socials: [
        { name: 'Spotify', href: '#', icon: SpotifyIcon },
        { name: 'YouTube', href: '#', icon: YoutubeIcon },
      ],
      imageId: 'zafarov-polat'
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-32">
       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl">
            Meet Our Team
          </h2>
        </div>
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          {team.map(member => (
            <TeamMemberCard key={member.name} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
}
