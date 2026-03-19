import React from 'react';
import { HeartHandshake, MessageSquareText, SearchCheck, WalletCards } from 'lucide-react';

const steps = [
  {
    icon: MessageSquareText,
    step: '01',
    title: 'നിങ്ങളുടെ പഠന ആവശ്യം ഞങ്ങളെ അറിയിക്കുക',
    description: 'വിഷയം, ലെവൽ, സ്ഥലം, സമയസൗകര്യം എന്നിവ കുറച്ച് മിനിറ്റിൽ പങ്കിടാം.',
  },
  {
    icon: SearchCheck,
    step: '02',
    title: 'ഏറ്റവും അനുയോജ്യമായ അധ്യാപകരെ ഞങ്ങൾ കണ്ടെത്താം',
    description: 'നിങ്ങളുടെ ആവശ്യത്തിനൊത്തു അനുഭവസമ്പന്നരായ tutors shortlist ചെയ്യുന്നു.',
  },
  {
    icon: WalletCards,
    step: '03',
    title: 'ക്ലാസ്സ് സമയവും ഫീസും തീരുമാനിക്കാം',
    description: 'കുടുംബത്തിനും tutor-നും സൗകര്യപ്രദമായ schedule, fee എന്നിവ finalize ചെയ്യാം.',
  },
  {
    icon: HeartHandshake,
    step: '04',
    title: 'സന്തോഷത്തോടെ പഠനം തുടങ്ങാം',
    description: 'സൂക്ഷ്മമായ follow-up-ോടെ consistent learning journey ആരംഭിക്കുന്നു.',
  },
];

const HowItWorks = () => {
  return (
    <section aria-labelledby="how-it-works-title" className="bg-card py-16 sm:py-20">
      <div className="container">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <p className="mb-3 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            How it works
          </p>
          <h2 id="how-it-works-title" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            ക്ലാസ് ആരംഭിക്കുന്നത് എങ്ങനെ?
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            enquiry അയച്ചതിന് ശേഷം tutor match വരെയുള്ള മുഴുവൻ പ്രക്രിയയും സുതാര്യവും family-friendly-ഉം ആക്കിയാണ് രൂപകൽപ്പന ചെയ്തത്.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <article key={step.step} className="relative rounded-[1.75rem] border border-border bg-background p-6 shadow-sm sm:p-7">
                <div className="mb-6 flex items-center justify-between">
                  <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                    {step.step}
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold leading-8 text-foreground">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
