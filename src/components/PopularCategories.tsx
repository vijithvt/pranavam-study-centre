import React from 'react';
import { ArrowUpRight, BookOpen, Brush, Code2, Calculator, MicVocal, Music2, NotebookText, Piano, Sigma } from 'lucide-react';

const categories = [
  {
    title: 'വയലിൻ',
    english: 'Violin',
    icon: Music2,
    accent: 'bg-primary/10 text-primary',
  },
  {
    title: 'കർണാടക സംഗീതം',
    english: 'Carnatic Vocal',
    icon: MicVocal,
    accent: 'bg-accent/10 text-accent',
  },
  {
    title: 'കീബോർഡ്',
    english: 'Keyboard',
    icon: Piano,
    accent: 'bg-warning/10 text-warning',
  },
  {
    title: 'ചിത്രരചന',
    english: 'Drawing',
    icon: Brush,
    accent: 'bg-primary/10 text-primary',
  },
  {
    title: 'സ്കൂൾ ട്യൂഷൻ',
    english: 'School Tuition',
    icon: NotebookText,
    accent: 'bg-accent/10 text-accent',
  },
  {
    title: 'കണക്ക്',
    english: 'Maths',
    icon: Calculator,
    accent: 'bg-warning/10 text-warning',
  },
  {
    title: 'സയൻസ്',
    english: 'Science',
    icon: Sigma,
    accent: 'bg-primary/10 text-primary',
  },
  {
    title: 'ഇംഗ്ലീഷ്',
    english: 'English',
    icon: BookOpen,
    accent: 'bg-accent/10 text-accent',
  },
  {
    title: 'പ്രോഗ്രാമിംഗ്',
    english: 'Programming',
    icon: Code2,
    accent: 'bg-warning/10 text-warning',
  },
];

const PopularCategories = () => {
  const handleCategoryClick = (subject: string) => {
    window.dispatchEvent(new CustomEvent('prefill-enquiry-subject', { detail: { subject } }));
    document.getElementById('home-enquiry')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section aria-labelledby="popular-categories-title" className="bg-background py-16 sm:py-20">
      <div className="container">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <p className="mb-3 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            Popular categories
          </p>
          <h2 id="popular-categories-title" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            കൂടുതൽ ചോദിക്കപ്പെടുന്ന വിഷയങ്ങൾ
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            സംഗീതം മുതൽ സ്കൂൾ ട്യൂഷൻ വരെ — കേരളത്തിലുടനീളം കുടുംബങ്ങൾ ഏറ്റവും കൂടുതൽ അന്വേഷിക്കുന്ന പഠനവിഷയങ്ങൾ.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <button
                key={category.english}
                type="button"
                onClick={() => handleCategoryClick(category.english)}
                className="group rounded-[1.75rem] border border-border bg-card p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:translate-y-0 motion-reduce:transform-none sm:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${category.accent}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
                <div className="mt-6 space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">{category.title}</h3>
                  <p className="text-sm font-medium text-muted-foreground">{category.english}</p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    മികച്ച അധ്യാപകരുമായി വേഗത്തിൽ ബന്ധപ്പെടാൻ tap ചെയ്യൂ.
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
