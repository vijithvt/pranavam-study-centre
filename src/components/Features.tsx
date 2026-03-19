import React from 'react';
import { BadgeCheck, BookOpenCheck, Clock3, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: BadgeCheck,
    title: 'ശ്രദ്ധാപൂർവ്വം match ചെയ്യുന്ന അധ്യാപകർ',
    description: 'വിഷയം മാത്രം അല്ല, പഠനശൈലി, level, location എന്നിവയും പരിഗണിക്കുന്നു.',
  },
  {
    icon: BookOpenCheck,
    title: 'സംഗീതം മുതൽ അക്കാദമിക്സ് വരെ',
    description: 'Violin, Carnatic, Drawing, Maths, Science, English, Programming തുടങ്ങി വിപുലമായ options.',
  },
  {
    icon: Clock3,
    title: 'വേഗത്തിലുള്ള പ്രതികരണം',
    description: 'enquiry ലഭിച്ചാൽ earliest possible time-ൽ guidance നൽകാൻ ടീം ശ്രദ്ധിക്കുന്നു.',
  },
  {
    icon: ShieldCheck,
    title: 'Premium, trustworthy experience',
    description: 'കുടുംബങ്ങൾക്ക് ആത്മവിശ്വാസം നൽകുന്ന വ്യക്തമായ communication, support, follow-up.',
  },
];

const Features = () => {
  return (
    <section aria-labelledby="features-title" className="bg-background py-16 sm:py-20">
      <div className="container">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <p className="mb-3 inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
            Why choose us
          </p>
          <h2 id="features-title" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            പഠനത്തിന് വേണ്ടത് match, clarity, trust
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            Pranavam Study Centre ഒരു സാധാരണ listing platform അല്ല — ശരിയായ tutor connect ചെയ്യാൻ സഹായിക്കുന്ന localized learning partner ആണ്.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article key={feature.title} className="rounded-[1.75rem] border border-border bg-card p-6 shadow-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{feature.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
