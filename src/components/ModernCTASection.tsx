import React from 'react';
import { ArrowUpRight, MessageCircleHeart } from 'lucide-react';

import { Button } from '@/components/ui/button';

const ModernCTASection = () => {
  return (
    <section aria-labelledby="final-cta-title" className="bg-card py-16 sm:py-20">
      <div className="container">
        <div className="relative overflow-hidden rounded-[2.25rem] border border-border bg-primary px-6 py-10 text-primary-foreground shadow-[0_30px_100px_hsl(var(--primary)/0.25)] sm:px-10 sm:py-14 lg:px-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary-foreground)/0.18),transparent_35%),radial-gradient(circle_at_bottom_right,hsl(var(--accent)/0.18),transparent_35%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-2xl">
              <p className="mb-3 inline-flex rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-semibold text-primary-foreground">
                Start Learning Today
              </p>
              <h2 id="final-cta-title" className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                ഇന്ന് തന്നെ മികച്ച അധ്യാപകരെ കണ്ടെത്തൂ
              </h2>
              <p className="mt-4 text-base leading-7 text-primary-foreground/80 sm:text-lg">
                സ്കൂൾ, കോളേജ്, സംഗീതം, drawing, skill-based learning — എന്ത് പഠിക്കാനും അനുയോജ്യമായ tutor match ചെയ്യാൻ ഞങ്ങൾ സഹായിക്കും.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button asChild size="lg" variant="secondary" className="h-12 rounded-xl px-6 text-base font-semibold text-secondary-foreground">
                <a href="#home-enquiry">
                  <MessageCircleHeart className="mr-2 h-5 w-5" />
                  ഇപ്പോൾ തന്നെ അന്വേഷിക്കാം
                </a>
              </Button>
              <Button asChild size="lg" className="h-12 rounded-xl border border-primary-foreground/15 bg-primary-foreground/10 px-6 text-base font-semibold text-primary-foreground hover:bg-primary-foreground/20">
                <a href="#popular-categories">
                  വിഷയങ്ങൾ പരിശോധിക്കുക
                  <ArrowUpRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernCTASection;
