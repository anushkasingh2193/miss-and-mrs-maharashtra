import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Section({ children, tone = "page", className = "", id }: { children: ReactNode; tone?: "page" | "tint" | "dark"; className?: string; id?: string }) {
  return (
    <section id={id} className={cn("section-pad", tone === "tint" && "bg-blush-tint", tone === "dark" && "bg-[#061122] text-white", className)}>
      <div className="content-wrap">{children}</div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <div className="reveal mb-12 max-w-3xl">
      <div className="eyebrow mb-5">{eyebrow}</div>
      <h2 className="display-title mb-6">{title}</h2>
      {body ? <p className="max-w-2xl text-[17px] font-light leading-8 text-blush-body">{body}</p> : null}
    </div>
  );
}

export function Hero({ eyebrow, title, body, image }: { eyebrow: string; title: string; body: string; image: string }) {
  return (
    <section className="relative min-h-[72vh] overflow-hidden bg-[#061122] text-white">
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center opacity-70"
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#061122] via-[#061122]/35 to-[#061122]/70" />
      <div className="content-wrap relative z-10 flex min-h-[72vh] flex-col justify-end px-[clamp(20px,4vw,42px)] pb-[clamp(72px,9vw,128px)] pt-24">
        <div className="eyebrow mb-5 text-blush-wash">{eyebrow}</div>
        <h1 className="hero-title max-w-4xl">{title}</h1>
        <p className="mt-7 max-w-2xl text-lg font-light leading-8 text-blush-body">{body}</p>
      </div>
    </section>
  );
}

export function ImageTile({ image, title, meta, body, className = "" }: { image: string; title: string; meta?: string; body?: string; className?: string }) {
  return (
    <div className={cn("group reveal image-card luxury-hover-card overflow-hidden bg-blush-wash", className)}>
      <div className="image-clip luxury-hover-media aspect-[4/5] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="image-settle luxury-hover-image h-full w-full object-cover object-center"
          loading="lazy"
          decoding="async"
        />
        <div className="luxury-hover-overlay absolute inset-0 bg-gradient-to-t from-[#020817]/72 via-transparent to-transparent opacity-85" />
      </div>
      <div className="luxury-hover-content border border-t-0 hairline bg-blush-page p-6">
        <h3 className="luxury-hover-title font-display text-2xl">{title}</h3>
        {meta ? <p className="mt-2 text-xs uppercase tracking-[.2em] text-blush-muted">{meta}</p> : null}
        {body ? <p className="mt-4 text-sm leading-7 text-blush-body">{body}</p> : null}
        <span className="luxury-hover-arrow mt-5 text-blush-accent" aria-hidden="true">
          <ArrowRight size={15} />
        </span>
      </div>
    </div>
  );
}
