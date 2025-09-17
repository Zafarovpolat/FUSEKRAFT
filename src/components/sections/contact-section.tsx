import { ContactForm } from '@/components/contact-form';

export function ContactSection() {
  return (
    <section id="contact" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl text-glitch" data-text="You ready? Let's get to it!">
            You ready? Let's get to it!
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            We can't wait to hear what you've got! Please fill in the important details below so we can start crafting your sound.
          </p>
        </div>

        <div className="max-w-4xl mx-auto liquid-glass rounded-2xl p-6 md:p-10">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
