import { useEffect, useMemo, useState } from "react";
import { Check } from "lucide-react";
import { categories, interestCities, type PageKey } from "@/data/site";
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
  city: "Nagpur",
  occupation: "",
  statement: "",
  consent: false,
};

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
    <Section className="register-flow-section">
      <h1 className="mx-auto text-center font-display text-[clamp(3rem,6vw,5.5rem)] leading-[.96] tracking-[-.03em] text-blush-ink">
        Start your crown journey
      </h1>

      {submitted ? (
          <div className="register-success mx-auto mt-10 max-w-3xl p-8 text-center md:p-12">
            <div className="mx-auto mb-6 grid size-14 place-items-center rounded-full bg-blush-accent text-[#020817]">
              <Check />
            </div>
            <h2 className="font-display text-[clamp(2.3rem,4.3vw,4.3rem)] leading-[1.02] text-blush-ink">Thank you, {form.name || "Applicant"}.</h2>
            <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-blush-body">
              Your interest has been received. We’ll contact eligible applicants when dates are announced.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-8 border-b border-blush-accent pb-2 text-xs uppercase tracking-[.24em] text-blush-accent"
            >
              Edit form
            </button>
          </div>
      ) : (
        <form onSubmit={submit} className="register-form-panel mx-auto mt-10 max-w-4xl p-6 md:p-10">
          <fieldset className="mb-8">
            <legend className="mb-3 text-xs uppercase tracking-[.22em] text-blush-muted">Choose category</legend>
            <div className="mb-8 grid gap-3 md:grid-cols-2">
              {categories.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setCat(item.key)}
                  className={cn(
                    "register-choice-card text-left transition focus:outline-none focus:ring-2 focus:ring-blush-accent",
                    cat === item.key && "is-selected",
                  )}
                >
                  <span className="font-display text-3xl text-blush-ink">{item.title}</span>
                </button>
              ))}
            </div>
          </fieldset>

              <div className="register-field-grid grid gap-6">
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
                  <Field label="Preferred city">
                    <select className="form-field" value={form.city} onChange={(e) => setField("city", e.target.value)}>
                      {interestCities.map((city) => (
                        <option key={city}>{city}</option>
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
                    placeholder="Share your ambition in a few words."
                  />
                </Field>
                <p className="text-sm text-blush-muted">{wordCount} words</p>
                <label className="grid cursor-pointer grid-cols-[28px_1fr] gap-4 text-left">
                  <input className="peer sr-only" type="checkbox" checked={form.consent} onChange={(event) => setField("consent", event.target.checked)} />
                  <span className={cn("grid size-7 place-items-center border border-blush-accent text-[#020817] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blush-accent", form.consent && "bg-blush-accent")}>{form.consent ? <Check size={15} /> : null}</span>
                  <span className="text-sm leading-7 text-blush-body">I confirm these details are accurate and I meet the selected category requirements.</span>
                </label>
                {errors.consent ? <p className="text-sm text-blush-accent">{errors.consent}</p> : null}
              </div>

              <button type="submit" className="gold-cta mt-9 px-8 py-4 text-xs uppercase tracking-[.24em]">
                Submit interest form
              </button>
        </form>
      )}
    </Section>
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
