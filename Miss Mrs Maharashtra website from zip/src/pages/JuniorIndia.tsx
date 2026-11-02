import type { PageKey } from "@/data/site";

export function JuniorIndia(_: { navigate: (page: PageKey) => void }) {
  return (
    <section className="min-h-[72svh] border-b gold-divider bg-[#020817] px-6 pt-[clamp(72px,10vw,132px)] text-center">
      <h1 className="mx-auto max-w-5xl font-display text-[clamp(3rem,7vw,6.75rem)] leading-[.94] text-blush-ink">
        Meet Junior India Contestants
      </h1>
    </section>
  );
}
