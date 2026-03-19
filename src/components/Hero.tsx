import React from 'react';
import { ArrowRight, Award, BookOpen, MessageCircle, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';

const trustPoints = [
  'കേരളത്തിലെ വിദ്യാർത്ഥികളുടെയും രക്ഷിതാക്കളുടെയും വിശ്വസ്ത പഠന സഹായി',
  'Online / Offline / Hybrid options',
  'School, college, music, arts & skill learning',
];

const stats = [
  { icon: Users, value: '500+', label: 'Expert tutors' },
  { icon: BookOpen, value: '50+', label: 'Subjects & skills' },
  { icon: Award, value: '2016', label: 'Kerala trust since' },
];

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,hsl(var(--background)),hsl(var(--secondary)))] pt-24 sm:pt-28">
      <div className="absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.18),transparent_45%),radial-gradient(circle_at_top_right,hsl(var(--accent)/0.12),transparent_35%)]" />
      <div className="container relative pb-16 sm:pb-20">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 text-sm text-foreground shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4 text-warning" />
              <span>കേരളം മുഴുവൻ personalized learning support</span>
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              കേരളത്തിലെ മികച്ച അധ്യാപകർ ഇനി നിങ്ങൾക്കരികിൽ
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              സ്കൂൾ-കോളേജ് ട്യൂഷൻ മുതൽ സംഗീതം, ചിത്രരചന തുടങ്ങി എന്തുപഠിക്കാനും ഏറ്റവും മികച്ച അധ്യാപകരെ ഇവിടെ കണ്ടെത്താം.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 rounded-xl px-6 text-base font-semibold shadow-lg shadow-primary/20">
                <a href="#home-enquiry">
                  ഇപ്പോൾ തന്നെ അന്വേഷിക്കാം
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 rounded-xl px-6 text-base font-semibold">
                <a href="#popular-categories">വിഷയങ്ങൾ പരിശോധിക്കുക</a>
              </Button>
            </div>

            <ul className="mt-8 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 rounded-2xl bg-card/80 px-4 py-3 shadow-sm backdrop-blur">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="relative">
            <div className="absolute -right-4 -top-4 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-8 left-0 h-32 w-32 rounded-full bg-accent/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card/90 p-4 shadow-[0_30px_100px_hsl(var(--primary)/0.15)] backdrop-blur sm:p-5">
              <img
                src="/lovable-uploads/a2a584b4-0ae8-4d70-9e01-dc194aebdc8b.png"
                alt="Student learning online with a tutor from Kerala"
                className="h-full w-full rounded-[1.5rem] object-cover"
                loading="eager"
              />

              <div className="absolute inset-x-6 bottom-6 rounded-[1.5rem] border border-border/60 bg-card/95 p-4 shadow-lg backdrop-blur">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-success/10 text-success">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Start Learning Today</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      enquiry അയച്ചാൽ അനുയോജ്യമായ tutor options വേഗത്തിൽ ലഭിക്കും.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <article key={stat.label} className="rounded-[1.5rem] border border-border bg-card p-4 text-center shadow-sm">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="mt-3 text-xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs leading-5 text-muted-foreground">{stat.label}</p>
                  </article>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-center lg:justify-end">
              <Link to="/students" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">
                മികച്ച അധ്യാപകരെ കണ്ടെത്താം
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Hero;
