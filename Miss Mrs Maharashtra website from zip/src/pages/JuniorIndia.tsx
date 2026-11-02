import type { PageKey } from "@/data/site";

export function JuniorIndia(_: { navigate: (page: PageKey) => void }) {
  return (
    <section className="min-h-[72svh] border-b gold-divider bg-[#020817] px-4 pt-20 text-center sm:px-6 sm:pt-24 lg:pt-28">
      <h1 className="mx-auto whitespace-nowrap font-sans text-base font-light leading-none tracking-normal text-blush-ink sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl">
        Meet Junior India Contestants
      </h1>
    </section>
  );
}
