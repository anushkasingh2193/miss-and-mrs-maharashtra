import { useEffect, useMemo, useState } from "react";
import { Check } from "lucide-react";
import { auditionCities, categories, documents, eligibility, receives, type PageKey } from "@/data/site";
import { Section } from "@/components/Section";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  dob: string;
  email: string;
  phone: string;
  city: string;
  occupation: string;
  statement: string;
  consent: boolean;
};

type Errors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  name: "",
  dob: "",
  email: "",
  phone: "",
  city: "Nagpur - 3 October 2026",
  occupation: "",
  statement: "",
  consent: false,
};

const feeNotes = ["Interest form is free", "Rs. 2,500 only after slot confirmation", "Team follow-up for shortlisted applicants"];

export function Register(_: { navigate: (page: PageKey) => void }) {
  const [cat, setCat] = useState<"miss" | "mrs">("miss");
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("mmm-application-draft");
    if (!raw) return;
    try {
      const draft = JSON.parse(raw) as { form?: Partial<FormState>; cat?: "miss" | "mrs" };
      setForm((current) => ({ ...current, ...draft.form }));
      if (draft.cat) setCat(draft.cat);
    } catch {
      localStorage.removeItem("mmm-application-draft");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("mmm-application-draft", JSON.stringify({ form, cat }));
  }, [form, cat]);

  const wordCount = useMemo(() => form.statement.trim().split(/\s+/).filter(Boolean).length, [form.statement]);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const validate = () => {
    const next: Errors = {};
    if (form.name.trim().length < 3) next.name = "Enter your full name as on your ID.";
    if (!/^\d{2}\s*\/\s*\d{2}\s*\/\s*\d{4}$/.test(form.dob)) next.dob = "Use DD / MM / YYYY.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email.";
    if (form.phone.replace(/\D/g, "").length < 10) next.phone = "Enter a 10-digit mobile number.";
    if (form.occupation.trim().length < 2) next.occupation = "Tell us what you do.";
    if (wordCount < 15) next.statement = "Write at least 15 words.";
    if (!form.consent) next.consent = "Confirm this before submitting.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <section className="cinematic-band border-b gold-divider px-[clamp(20px,4vw,42px)] py-[clamp(72px,9vw,118px)]">
        <div className="content-wrap">
          <div className="eyebrow mb-5">Season 3 · Contestant interest</div>
          <h1 className="hero-title max-w-4xl text-blush-ink">Start your crown journey.</h1>
          <p className="mt-7 max-w-2xl text-lg font-light leading-8 text-blush-body">
            Share your category, city and story. The season office reviews every interest form and contacts eligible applicants for the next audition step.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {feeNotes.map((note, idx) => (
              <span
                key={note}
                className={cn(
                  "border px-4 py-3 text-[10px] uppercase tracking-[.2em]",
                  idx === 0 ? "border-blush-accent/70 text-blush-accent" : "border-blush-accent/20 text-blush-muted",
                )}
              >
                {note}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Section className="cinematic-band">
        {submitted ? (
          <div className="mx-auto max-w-3xl border gold-divider bg-[#061122]/76 p-8 text-center md:p-12">
            <div className="mx-auto mb-6 grid size-14 place-items-center rounded-full bg-blush-accent text-[#020817]">
              <Check />
            </div>
            <div className="eyebrow mb-5">Application received</div>
            <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] leading-none text-blush-ink">Thank you, {form.name || "Applicant"}.</h2>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-blush-body">
              Your application for {cat === "miss" ? "Miss Maharashtra" : "Mrs. Maharashtra"} has been saved for {form.city}. The audition team will contact shortlisted applicants.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-8 border-b border-blush-accent pb-2 text-xs uppercase tracking-[.24em] text-blush-accent"
            >
              Edit my application
            </button>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr]">
            <form onSubmit={submit} className="border gold-divider bg-[#061122]/76 p-6 md:p-10">
              <div className="mb-8">
                <div className="eyebrow mb-3">Application form</div>
                <h2 className="font-display text-[clamp(2.1rem,3.8vw,4rem)] leading-none text-blush-ink">Which crown path fits you?</h2>
              </div>

              <div className="mb-8 grid gap-3 md:grid-cols-2">
                {categories.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setCat(item.key)}
                    className={cn(
                      "border gold-divider bg-[#0B1A30]/72 p-5 text-left transition hover:border-blush-accent/55 focus:outline-none focus:ring-2 focus:ring-blush-accent",
                      cat === item.key && "border-blush-accent bg-blush-accent/10",
                    )}
                  >
                    <h3 className="font-display text-3xl text-blush-ink">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-blush-body">{item.who}</p>
                  </button>
                ))}
              </div>

              <div className="grid gap-6">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Full name" error={errors.name}>
                    <input className="form-field" aria-invalid={!!errors.name} placeholder="As on your ID" value={form.name} onChange={(e) => setField("name", e.target.value)} />
                  </Field>
                  <Field label="Date of birth" error={errors.dob}>
                    <input className="form-field" aria-invalid={!!errors.dob} inputMode="numeric" placeholder="DD / MM / YYYY" value={form.dob} onChange={(e) => setField("dob", e.target.value)} />
                  </Field>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Email" error={errors.email}>
                    <input className="form-field" type="email" aria-invalid={!!errors.email} value={form.email} onChange={(e) => setField("email", e.target.value)} />
                  </Field>
                  <Field label="Phone" error={errors.phone}>
                    <input className="form-field" type="tel" aria-invalid={!!errors.phone} value={form.phone} onChange={(e) => setField("phone", e.target.value)} />
                  </Field>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Audition city">
                    <select className="form-field" value={form.city} onChange={(e) => setField("city", e.target.value)}>
                      {auditionCities.map((city) => (
                        <option key={city.city}>{city.city} - {city.date}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Occupation" error={errors.occupation}>
                    <input className="form-field" aria-invalid={!!errors.occupation} value={form.occupation} onChange={(e) => setField("occupation", e.target.value)} />
                  </Field>
                </div>
                <Field label="What would you use the title for?" error={errors.statement}>
                  <textarea
                    className="form-field min-h-32"
                    aria-invalid={!!errors.statement}
                    value={form.statement}
                    onChange={(e) => setField("statement", e.target.value)}
                    placeholder="Tell the selection team about your confidence journey, ambition, advocacy idea or reason for stepping onto the stage."
                  />
                </Field>
                <p className="text-sm text-blush-muted">{wordCount} words</p>
                <label className="grid cursor-pointer grid-cols-[28px_1fr] gap-4 text-left">
                  <input className="peer sr-only" type="checkbox" checked={form.consent} onChange={(event) => setField("consent", event.target.checked)} />
                  <span className={cn("grid size-7 place-items-center border border-blush-accent text-[#020817] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blush-accent", form.consent && "bg-blush-accent")}>{form.consent ? <Check size={15} /> : null}</span>
                <span className="text-sm leading-7 text-blush-body">I confirm the information is accurate and I meet the eligibility criteria for the category I selected.</span>
                </label>
                {errors.consent ? <p className="text-sm text-blush-accent">{errors.consent}</p> : null}
              </div>

              <button type="submit" className="gold-cta mt-9 px-8 py-4 text-xs uppercase tracking-[.24em]">
                Submit interest form
              </button>
            </form>

            <aside className="grid gap-6">
              <InfoPanel title="Before you start" items={documents} />
              <InfoPanel title="Eligibility" items={eligibility} />
              <InfoPanel title="What you receive" items={receives} />
            </aside>
          </div>
        )}
      </Section>
    </>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[.22em] text-blush-muted">{label}</span>
      {children}
      {error ? <span className="mt-2 block text-sm text-blush-accent">{error}</span> : null}
    </label>
  );
}

function InfoPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border gold-divider bg-[#061122]/58 p-6">
      <h3 className="font-display text-3xl text-blush-ink">{title}</h3>
      <ul className="mt-5 grid gap-3 text-sm leading-7 text-blush-body">
        {items.map((item) => (
          <li key={item} className="border-t gold-divider pt-3">{item}</li>
        ))}
      </ul>
    </div>
  );
}
