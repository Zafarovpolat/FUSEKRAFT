import { AudioVisualizerForm } from '@/components/audio-visualizer-form';

export function AudioVisualizerSection() {
  return (
    <section id="visualizer" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl text-glitch" data-text="AI VISUALIZER">
            AI VISUALIZER
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            Harnessing the power of AI to create visuals that react to your sound.
          </p>
        </div>
        <AudioVisualizerForm />
      </div>
    </section>
  );
}
