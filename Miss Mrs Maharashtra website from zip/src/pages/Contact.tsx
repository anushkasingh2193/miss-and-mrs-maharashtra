import { useState } from "react";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { contactRows, faqs, mapUrl, type PageKey } from "@/data/site";
import { Section } from "@/components/Section";

const contactActions = [
  {
    label: "Email",
    value: "info@missandmrsmaharashtra.org",
    href: "mailto:info@missandmrsmaharashtra.org",
    icon: Mail,
  },
  {
    label: "Call",
    value: "+91 93227 10192",
    href: "tel:+919322710192",
    icon: Phone,
  },
  {
    label: "Call",
    value: "+91 75063 12201",
    href: "tel:+917506312201",
    icon: Phone,
  },
];

export function Contact({ navigate }: { navigate: (page: PageKey) => void }) {
  const [open, setOpen] = useState(0);

  return (
    <>
      <section className="cinematic-band border-b gold-divider px-[clamp(20px,4vw,42px)] py-[clamp(72px,9vw,118px)]">
        <div className="content-wrap">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <div>
              <div className="eyebrow mb-5">Contact</div>
              <div className="mb-4 font-marathi text-2xl text-blush-accent/80">संपर्क</div>
              <h1 className="hero-title max-w-4xl text-blush-ink">Talk to the office.</h1>
              <p className="mt-7 max-w-2xl text-lg font-light leading-8 text-blush-body">
                Auditions, sponsorship, tickets, media accreditation and contestant support are handled by the Nagpur season office.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <button onClick={() => navigate("register")} className="gold-cta inline-flex items-center gap-3 px-7 py-4 text-xs uppercase tracking-[.22em]">
                  Start contestant form <ArrowRight size={15} />
                </button>
                <button onClick={() => navigate("sponsors")} className="inline-flex items-center gap-3 border-b border-blush-accent pb-2 text-xs uppercase tracking-[.22em] text-blush-accent">
                  Partnership options <ArrowRight size={15} />
                </button>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {contactActions.map((action) => {
                const Icon = action.icon;
                return (
                  <a
                    key={`${action.label}-${action.value}`}
                    href={action.href}
                    className="group border gold-divider bg-[#061122]/76 p-5 transition hover:border-blush-accent/60 focus:outline-none focus:ring-2 focus:ring-blush-accent"
                  >
                    <div className="mb-6 flex items-center justify-between text-blush-accent">
                      <span className="text-[10px] uppercase tracking-[.28em]">{action.label}</span>
                      <Icon size={17} />
                    </div>
                    <p className="text-sm leading-6 text-blush-ink group-hover:text-blush-accent">{action.value}</p>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Section className="cinematic-band">
        <div className="grid gap-8 lg:grid-cols-[.82fr_1.18fr]">
          <div className="border gold-divider bg-[#061122]/72 p-7 md:p-9">
            <div className="mb-7 flex items-center gap-3 text-blush-accent">
              <MapPin size={18} />
              <div className="eyebrow">Office</div>
            </div>
            <div className="grid gap-6">
              {contactRows.map((row) => (
                <div key={row.k} className="border-t gold-divider pt-5">
                  <div className="mb-2 text-[10px] uppercase tracking-[.26em] text-blush-muted">{row.k}</div>
                  <p className="text-sm leading-7 text-blush-body">{row.v}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden border gold-divider bg-[#061122]">
            <iframe
              className="min-h-[460px] w-full grayscale invert-[.88] contrast-125"
              src={mapUrl}
              loading="lazy"
              title="Kara Zoya office map"
            />
          </div>
        </div>
      </Section>

      <Section className="cinematic-band !pt-0">
        <div className="mb-10 max-w-3xl">
          <div className="eyebrow mb-5">FAQ</div>
          <h2 className="display-title">Before you apply.</h2>
        </div>
        <div className="border-y gold-divider">
          {faqs.map((faq, idx) => (
            <div key={faq.q} className="border-b gold-divider">
              <button
                type="button"
                onClick={() => setOpen(open === idx ? -1 : idx)}
                className="grid w-full grid-cols-[1fr_auto] gap-5 py-6 text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blush-accent"
              >
                <span className="font-display text-[clamp(1.45rem,2.4vw,2.35rem)] leading-tight text-blush-ink">{faq.q}</span>
                <span className="text-2xl text-blush-accent">{open === idx ? "-" : "+"}</span>
              </button>
              {open === idx ? <p className="max-w-3xl pb-7 text-sm leading-8 text-blush-body">{faq.a}</p> : null}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
