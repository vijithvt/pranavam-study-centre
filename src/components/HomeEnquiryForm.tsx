import React, { useEffect, useMemo, useState } from 'react';
import { Loader2, MessageCircle, ShieldCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type FormFields = {
  studentName: string;
  parentName: string;
  phone: string;
  subject: string;
  level: string;
  mode: string;
  location: string;
  timing: string;
  budget: string;
  notes: string;
};

type FormErrors = Partial<Record<keyof FormFields, string>>;

const WHATSAPP_NUMBER = '919496315903';

const initialFields: FormFields = {
  studentName: '',
  parentName: '',
  phone: '',
  subject: '',
  level: '',
  mode: 'Online',
  location: '',
  timing: '',
  budget: '',
  notes: '',
};

const subjectOptions = [
  'Violin',
  'Carnatic Vocal',
  'Keyboard',
  'Drawing',
  'School Tuition',
  'Maths',
  'Science',
  'English',
  'Programming',
  'College Subjects',
  'Skill-based Learning',
];

const levelOptions = [
  'LP / UP',
  'High School',
  'Higher Secondary',
  'College',
  'Working Professional',
  'Beginner',
  'Intermediate',
  'Advanced',
];

const fieldClassName =
  'flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background transition-all placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

const normalizePhone = (value: string) => {
  const digits = value.replace(/\D/g, '');

  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2);
  }

  if (digits.length === 11 && digits.startsWith('0')) {
    return digits.slice(1);
  }

  return digits;
};

const getError = (value: string, message: string) => {
  if (!value.trim()) return message;
  return '';
};

const HomeEnquiryForm = () => {
  const [fields, setFields] = useState<FormFields>(initialFields);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handlePrefill = (event: Event) => {
      const customEvent = event as CustomEvent<{ subject?: string }>;
      const nextSubject = customEvent.detail?.subject;

      if (!nextSubject) return;

      setFields((current) => ({ ...current, subject: nextSubject }));
      setErrors((current) => ({ ...current, subject: undefined }));
    };

    window.addEventListener('prefill-enquiry-subject', handlePrefill as EventListener);
    return () => {
      window.removeEventListener('prefill-enquiry-subject', handlePrefill as EventListener);
    };
  }, []);

  const sanitizedPhone = useMemo(() => normalizePhone(fields.phone), [fields.phone]);

  const validate = () => {
    const nextErrors: FormErrors = {
      studentName: getError(fields.studentName, 'വിദ്യാർത്ഥിയുടെ പേര് ചേർക്കൂ.'),
      phone: sanitizedPhone.length !== 10 ? '10 അക്കമുള്ള ശരിയായ ഫോൺ നമ്പർ നൽകൂ.' : '',
      subject: getError(fields.subject, 'ഏത് വിഷയത്തിനാണ് ക്ലാസ് വേണ്ടത് എന്ന് തിരഞ്ഞെടുക്കൂ.'),
      level: getError(fields.level, 'ക്ലാസ് / ലെവൽ തിരഞ്ഞെടുക്കൂ.'),
      location: getError(fields.location, 'ലൊക്കേഷൻ നൽകൂ.'),
    };

    const cleanedErrors = Object.fromEntries(
      Object.entries(nextErrors).filter(([, value]) => Boolean(value))
    ) as FormErrors;

    setErrors(cleanedErrors);
    return Object.keys(cleanedErrors).length === 0;
  };

  const handleFieldChange = (key: keyof FormFields, value: string) => {
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    const message = `നമസ്കാരം, ക്ലാസുകളെക്കുറിച്ച് അറിയാൻ താല്പര്യപ്പെടുന്നു.\n\nStudent Name: ${fields.studentName.trim()}\n\nParent Name: ${fields.parentName.trim() || '-'}\n\nPhone: ${sanitizedPhone}\n\nSubject: ${fields.subject.trim()}\n\nLevel: ${fields.level.trim()}\n\nMode: ${fields.mode.trim()}\n\nLocation: ${fields.location.trim()}\n\nTiming: ${fields.timing.trim() || '-'}\n\nBudget: ${fields.budget.trim() || '-'}\n\nNotes: ${fields.notes.trim() || '-'}`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    const whatsappWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    if (!whatsappWindow) {
      window.location.href = whatsappUrl;
    }

    window.setTimeout(() => {
      setIsSubmitting(false);
    }, 450);
  };

  return (
    <section
      id="home-enquiry"
      aria-labelledby="home-enquiry-title"
      className="scroll-mt-24 rounded-[2rem] border border-border/70 bg-card/95 p-5 shadow-[0_24px_80px_hsl(var(--primary)/0.14)] backdrop-blur sm:p-6"
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            WhatsApp enquiry
          </p>
          <h2 id="home-enquiry-title" className="text-2xl font-bold text-foreground">
            ക്ലാസുകൾക്കായി അന്വേഷിക്കാം
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            മലയാളത്തിലോ English-ലോ വിവരങ്ങൾ അയക്കാം. രക്ഷിതാക്കളും വിദ്യാർത്ഥികളും നേരിട്ട് ചോദിക്കാം.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-1">
            <Label htmlFor="studentName">Student Name *</Label>
            <Input
              id="studentName"
              value={fields.studentName}
              onChange={(event) => handleFieldChange('studentName', event.target.value)}
              placeholder="ഉദാ: Aditya Krishna"
              aria-invalid={Boolean(errors.studentName)}
            />
            {errors.studentName ? <p className="text-sm text-destructive">{errors.studentName}</p> : null}
          </div>

          <div className="space-y-2 sm:col-span-1">
            <Label htmlFor="parentName">Parent Name</Label>
            <Input
              id="parentName"
              value={fields.parentName}
              onChange={(event) => handleFieldChange('parentName', event.target.value)}
              placeholder="ഉദാ: Anitha"
            />
          </div>

          <div className="space-y-2 sm:col-span-1">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              inputMode="numeric"
              value={fields.phone}
              onChange={(event) => handleFieldChange('phone', event.target.value)}
              placeholder="9496315903 / +91 9496315903"
              aria-invalid={Boolean(errors.phone)}
            />
            {errors.phone ? <p className="text-sm text-destructive">{errors.phone}</p> : null}
          </div>

          <div className="space-y-2 sm:col-span-1">
            <Label htmlFor="subject">Subject / Course *</Label>
            <select
              id="subject"
              value={fields.subject}
              onChange={(event) => handleFieldChange('subject', event.target.value)}
              className={fieldClassName}
              aria-invalid={Boolean(errors.subject)}
            >
              <option value="">തിരഞ്ഞെടുക്കൂ</option>
              {subjectOptions.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
            {errors.subject ? <p className="text-sm text-destructive">{errors.subject}</p> : null}
          </div>

          <div className="space-y-2 sm:col-span-1">
            <Label htmlFor="level">Level / Class *</Label>
            <select
              id="level"
              value={fields.level}
              onChange={(event) => handleFieldChange('level', event.target.value)}
              className={fieldClassName}
              aria-invalid={Boolean(errors.level)}
            >
              <option value="">തിരഞ്ഞെടുക്കൂ</option>
              {levelOptions.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
            {errors.level ? <p className="text-sm text-destructive">{errors.level}</p> : null}
          </div>

          <div className="space-y-2 sm:col-span-1">
            <Label htmlFor="mode">Mode</Label>
            <select
              id="mode"
              value={fields.mode}
              onChange={(event) => handleFieldChange('mode', event.target.value)}
              className={fieldClassName}
            >
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div className="space-y-2 sm:col-span-1">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              value={fields.location}
              onChange={(event) => handleFieldChange('location', event.target.value)}
              placeholder="ഉദാ: Kochi / തിരുവനന്തപുരം"
              aria-invalid={Boolean(errors.location)}
            />
            {errors.location ? <p className="text-sm text-destructive">{errors.location}</p> : null}
          </div>

          <div className="space-y-2 sm:col-span-1">
            <Label htmlFor="timing">Preferred Timing</Label>
            <Input
              id="timing"
              value={fields.timing}
              onChange={(event) => handleFieldChange('timing', event.target.value)}
              placeholder="ഉദാ: വൈകിട്ട് 6 മണിക്ക് ശേഷം"
            />
          </div>

          <div className="space-y-2 sm:col-span-1">
            <Label htmlFor="budget">Expected Tutor Fee / Budget</Label>
            <Input
              id="budget"
              value={fields.budget}
              onChange={(event) => handleFieldChange('budget', event.target.value)}
              placeholder="ഉദാ: ₹250 per class"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            id="notes"
            value={fields.notes}
            onChange={(event) => handleFieldChange('notes', event.target.value)}
            placeholder="സിലബസ്, അധ്യാപക preference, special support വേണ്ടതുണ്ടെങ്കിൽ ഇവിടെ എഴുതാം."
            className="min-h-28 rounded-xl"
          />
        </div>

        <div className="space-y-3 rounded-2xl bg-muted/60 p-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-xl bg-success text-success-foreground shadow-lg shadow-success/20 hover:bg-success/90"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                അയക്കുന്നു...
              </>
            ) : (
              <>
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp വഴി അയക്കൂ
              </>
            )}
          </Button>

          <div className="space-y-1 text-center">
            <p className="inline-flex items-center justify-center gap-2 text-sm font-medium text-foreground">
              <ShieldCheck className="h-4 w-4 text-success" />
              നിങ്ങളുടെ വിവരങ്ങൾ തികച്ചും സുരക്ഷിതമാണ്.
            </p>
            <p className="text-xs leading-5 text-muted-foreground">
              Desktop-ൽ WhatsApp app തുറക്കാത്ത പക്ഷം WhatsApp Web തുറക്കാൻ browser prompt കാണിക്കും.
            </p>
          </div>
        </div>
      </form>
    </section>
  );
};

export default HomeEnquiryForm;
