import React from 'react';
import { Quote, Star } from 'lucide-react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const testimonials = [
  {
    name: 'രമ്യാ നായർ',
    role: 'Parent, Kochi',
    quote:
      'എന്റെ മകൾക്ക് violin teacher അന്വേഷിക്കുമ്പോൾ വളരെ confusion ഉണ്ടായിരുന്നു. ഇവിടെ enquiry നൽകിയതിന് ശേഷം വളരെ patient ആയൊരു teacher connect ചെയ്തു. ഇപ്പോൾ അവൾ സന്തോഷത്തോടെ practice ചെയ്യുന്നു.',
  },
  {
    name: 'അനൂപ് രാജ്',
    role: 'Parent, Thrissur',
    quote:
      'Maths tutor വേണ്ടിയിരുന്നു. location, timing എല്ലാം പരിഗണിച്ച് match ചെയ്ത് തന്നത് വലിയ സഹായമായി. communication വളരെ professional ആയിരുന്നു.',
  },
  {
    name: 'ദേവിക എസ്',
    role: 'Student, തിരുവനന്തപുരം',
    quote:
      'Online Carnatic classes തുടങ്ങാൻ ആഗ്രഹം ഉണ്ടായിരുന്നു. Malayalam-ൽ സംസാരിച്ച് ചോദിക്കാൻ കഴിഞ്ഞത് തന്നെ confidence നൽകി. നല്ല tutor കിട്ടി.',
  },
  {
    name: 'ഷീന ജോസഫ്',
    role: 'Parent, Kottayam',
    quote:
      'School tuition-ക്കും English support-നും enquiry നൽകി. കുടുംബമായി സംസാരിക്കാൻ എളുപ്പമായൊരു experience ആയിരുന്നു. trustworthy feel ചെയ്തു.',
  },
];

const Testimonials = () => {
  return (
    <section aria-labelledby="testimonials-title" className="bg-primary py-16 text-primary-foreground sm:py-20">
      <div className="container">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <p className="mb-3 inline-flex rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-semibold text-primary-foreground">
            Social proof
          </p>
          <h2 id="testimonials-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
            കേരളത്തിലെ കുടുംബങ്ങൾ പറയുന്നത്
          </h2>
          <p className="mt-4 text-base leading-7 text-primary-foreground/80 sm:text-lg">
            mobile swipe, keyboard navigation, clear readability — എല്ലാം ശ്രദ്ധിച്ച് രൂപകൽപ്പന ചെയ്ത testimonial experience.
          </p>
        </div>

        <Carousel
          opts={{ align: 'start', loop: true }}
          className="mx-auto max-w-6xl px-3 sm:px-12"
          aria-label="Testimonials from students and parents"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.name} className="md:basis-1/2 xl:basis-1/3">
                <article className="flex h-full flex-col rounded-[1.75rem] bg-card p-6 text-card-foreground shadow-xl sm:p-7">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex gap-1 text-warning">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <Quote className="h-5 w-5 text-primary" />
                  </div>
                  <p className="flex-1 text-sm leading-7 text-muted-foreground">“{testimonial.quote}”</p>
                  <footer className="mt-6 border-t border-border pt-4">
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </footer>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 border-primary-foreground/15 bg-card text-card-foreground hover:bg-card" />
          <CarouselNext className="right-0 border-primary-foreground/15 bg-card text-card-foreground hover:bg-card" />
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
