import { ArrowRight, Instagram, Mail, MapPin, Menu, Phone, Sparkles, X } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import { contactRows, navItems, type PageKey } from "@/data/site";
import { useCountdown } from "@/hooks/useCountdown";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

export function Layout({ page, navigate, children }: { page: PageKey; navigate: (page: PageKey) => void; children: ReactNode }) {
  const [menu, setMenu] = useState(false);
  const [sticky, setSticky] = useState(false);
  const countdown = useCountdown();
  useScrollReveal();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setMenu(false);
  }, [page]);

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (target: PageKey) => {
    if (target !== page) navigate(target);
  };

  return (
    <div className="page-shell">
      <header className="site-header sticky top-0 z-50 border-b gold-divider backdrop-blur-2xl">
        <div className="content-wrap flex min-h-[var(--header-height)] items-center gap-5 px-[clamp(18px,3.6vw,38px)]">
          <button onClick={() => go("home")} className="site-logo mr-auto text-left text-blush-ink transition hover:text-blush-hover" aria-label="Go to home page">
            <span className="site-logo-kicker">MISS &amp; MRS.</span>
            <span className="site-logo-word">MAHARASHTRA</span>
          </button>
          <nav className="hidden items-center gap-5 lg:flex" aria-label="Main navigation">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => go(item.key)}
                className={cn("nav-link text-[10px] uppercase tracking-[.2em] text-blush-body transition hover:text-blush-accent", page === item.key && "is-active text-blush-accent")}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <button onClick={() => go("register")} className="gold-cta hidden items-center gap-2 px-5 py-2.5 text-[10px] uppercase tracking-[.2em] sm:inline-flex">
            Register <ArrowRight size={15} />
          </button>
          <button className="lg:hidden" onClick={() => setMenu((v) => !v)} aria-label="Toggle menu">
            {menu ? <X /> : <Menu />}
          </button>
        </div>
        {menu ? (
          <div className="border-t gold-divider bg-blush-page/98 px-5 py-4 lg:hidden">
            <div className="grid gap-3">
              {[...navItems, { key: "register" as PageKey, label: "Register" }].map((item) => (
                <button key={item.key} onClick={() => go(item.key)} className={cn("py-3 text-left text-sm uppercase leading-7 tracking-[.18em] text-blush-body", page === item.key && "text-blush-accent")}>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      <main className={page !== "register" ? "pb-20 sm:pb-0" : undefined}>{children}</main>

      {sticky && page !== "register" ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t gold-divider bg-blush-page/92 px-5 py-3 backdrop-blur-xl sm:py-4">
          <div className="content-wrap flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-blush-body">{countdown[0].v} days left. Applications close 30 September 2026.</p>
            <button onClick={() => go("register")} className="gold-cta inline-flex items-center justify-center gap-2 px-5 py-3 text-[11px] uppercase tracking-[.2em]">
              Apply now <ArrowRight size={15} />
            </button>
          </div>
        </div>
      ) : null}

      <footer className="footer-cinema relative overflow-hidden border-t hairline bg-[#061122] px-[clamp(20px,4vw,42px)]">
        <div className="content-wrap relative z-10 py-[clamp(58px,7vw,110px)]">
          <div className="beam-frame beam-frame-strong grid gap-10 border gold-divider bg-[#061122]/72 p-[clamp(28px,5vw,64px)] lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <div>
              <div className="eyebrow mb-5">Season three</div>
              <h2 className="font-display text-[clamp(2.8rem,5.8vw,6.6rem)] leading-[.9] text-blush-ink">Your season starts here.</h2>
              <p className="mt-7 max-w-xl text-lg font-light leading-8 text-blush-body">Applications are open for women ready to step into the Miss & Mrs. Maharashtra spotlight.</p>
            </div>
            <div className="flex flex-col gap-4 lg:items-end">
              <button onClick={() => go("register")} className="gold-cta inline-flex w-fit items-center gap-3 px-8 py-4 text-xs uppercase tracking-[.24em]">
                Apply now <ArrowRight size={16} />
              </button>
              <button onClick={() => go("contact")} className="inline-flex w-fit items-center gap-3 border-b border-blush-accent pb-2 text-xs uppercase tracking-[.24em] text-blush-accent">
                Speak to the team <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>

        <div className="relative z-10 -mx-[clamp(20px,4vw,42px)] overflow-hidden border-y gold-divider py-5">
          <div className="marquee-track flex w-max gap-10 text-xs uppercase tracking-[.34em] text-blush-accent">
            {Array.from({ length: 2 }).map((_, repeat) => (
              <div key={repeat} className="flex gap-10">
                {["MISS MAHARASHTRA", "MRS MAHARASHTRA", "RUNWAY", "GROOMING", "CROWN", "NATIONAL PATHWAY", "NAGPUR FINALE"].map((item) => (
                  <span key={`${repeat}-${item}`} className="whitespace-nowrap">{item}</span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="content-wrap relative z-10 grid gap-10 py-12 md:grid-cols-[1.2fr_.7fr_.7fr_1fr]">
          <div>
            <div className="flex items-center gap-3 text-blush-accent">
              <Sparkles size={18} />
              <span className="text-xs uppercase tracking-[.28em]">Miss & Mrs.</span>
            </div>
            <div className="mt-4 font-display text-4xl leading-none text-blush-ink">Maharashtra</div>
            <p className="mt-5 max-w-sm text-sm leading-7 text-blush-body">A state pageant built in Nagpur for confidence, representation and national-standard grooming.</p>
          </div>
          <FooterLinks title="Pageant" items={[["about", "About"], ["categories", "Categories"], ["register", "Register"], ["mentors", "Mentors"]]} go={go} />
          <FooterLinks title="Media" items={[["winners", "Gallery"], ["press", "Press"], ["sponsors", "Sponsors"], ["contact", "Contact"]]} go={go} />
          <div>
            <h3 className="eyebrow mb-4">Contact</h3>
            <div className="grid gap-4 text-sm leading-6 text-blush-body">
              <FooterContact icon={<MapPin size={15} />} text={contactRows[0]?.v || "Nagpur, Maharashtra"} />
              <FooterContact icon={<Mail size={15} />} text={contactRows[1]?.v || "info@missandmrsmaharashtra.org"} />
              <FooterContact icon={<Phone size={15} />} text={contactRows[2]?.v || "+91 93227 10192"} />
            </div>
            <a className="mt-6 inline-flex items-center gap-2 text-sm text-blush-accent transition hover:text-blush-hover" href="https://www.instagram.com/missandmrsmaharashtraofficial/" target="_blank" rel="noreferrer">
              <Instagram size={16} /> Instagram
            </a>
          </div>
        </div>

        <div className="content-wrap relative z-10 flex flex-col gap-3 border-t gold-divider py-6 text-xs uppercase tracking-[.22em] text-blush-muted sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright 2026 Miss & Mrs. Maharashtra</p>
          <p>Kara Zoya Pvt Ltd - Nagpur</p>
        </div>
      </footer>
    </div>
  );
}

function FooterContact({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className="flex gap-3">
      <span className="mt-1 text-blush-accent">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function FooterLinks({ title, items, go }: { title: string; items: Array<[PageKey, string]>; go: (page: PageKey) => void }) {
  return (
    <div>
      <h3 className="eyebrow mb-4">{title}</h3>
      <div className="grid gap-3">
        {items.map(([key, label]) => (
          <button key={key} onClick={() => go(key)} className="text-left text-sm text-blush-body hover:text-blush-accent">
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
