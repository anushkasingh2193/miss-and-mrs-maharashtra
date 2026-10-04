import { quotes } from "@/data/site";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { cn } from "@/lib/utils";

type Testimonial = {
  quote: string;
  image: string;
  name: string;
  role: string;
};

const testimonials: Testimonial[] = [
  ...quotes.map((quote) => ({
    quote: quote.text,
    image: quote.bg,
    name: quote.name,
    role: quote.role,
  })),
  {
    quote: "The pageant celebrates beauty, confidence, talent and empowerment on one stage.",
    image: "/missmrs-assets/curated/sandhya-shetty.jpg",
    name: "Sandhya Shetty",
    role: "Anchor, Season 1",
  },
  {
    quote: "A beautiful celebration of womanhood, bringing together confident and inspiring women.",
    image: "/missmrs-assets/curated/anjali-rathee.jpg",
    name: "Anjali Rathee",
    role: "Mrs. India 2024",
  },
  {
    quote: "The mentoring journey helps contestants find presence, voice and purpose before they reach the runway.",
    image: "/missmrs-assets/mentor/Megha-kapoor-amesar-1367x2048.jpg",
    name: "Megha Kapoor Amesar",
    role: "Makeover Partner",
  },
  {
    quote: "Every finalist leaves with more than photos: she leaves with confidence, discipline and a stronger public voice.",
    image: "/missmrs-assets/mentor/Zoya-sheikh--scaled.jpg",
    name: "Zoya Siraj Sheikh",
    role: "Founder & Chairman",
  },
  {
    quote: "Season 3 brings the same serious standard to more cities, more contestants and a larger finale stage.",
    image: "/missmrs-assets/images/TS101966.JPG",
    name: "Season Office",
    role: "Kara Zoya Pvt Ltd",
  },
  {
    quote: "A state platform with national ambition, built for women ready to represent Maharashtra with grace.",
    image: "/missmrs-assets/gallery/TS101989.JPG",
    name: "Miss & Mrs. Maharashtra",
    role: "Season 3",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export function TestimonialsSection() {
  return (
    <section className="cinematic-band relative overflow-hidden px-[clamp(20px,4vw,42px)] py-16 md:py-20">
      <div className="content-wrap">
        <div className="mx-auto flex max-w-xl flex-col items-center justify-center gap-4 text-center">
          <div className="eyebrow">In their words</div>
          <h2 className="display-title">Trusted by mentors, titleholders and partners.</h2>
          <p className="text-sm leading-7 text-blush-muted">
            Real voices from the pageant ecosystem show what the platform is known for:
            confidence, preparation, visibility and stage discipline.
          </p>
        </div>

        <div
          className={cn(
            "mx-auto mt-10 flex h-[440px] justify-center gap-6 overflow-hidden",
            "[mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]",
          )}
        >
          <InfiniteSlider direction="vertical" speed={30} speedOnHover={15}>
            {firstColumn.map((testimonial) => (
              <TestimonialsCard key={testimonial.name} testimonial={testimonial} />
            ))}
          </InfiniteSlider>
          <InfiniteSlider className="hidden md:block" direction="vertical" speed={50} speedOnHover={25} reverse>
            {secondColumn.map((testimonial) => (
              <TestimonialsCard key={testimonial.name} testimonial={testimonial} />
            ))}
          </InfiniteSlider>
          <InfiniteSlider className="hidden lg:block" direction="vertical" speed={35} speedOnHover={17}>
            {thirdColumn.map((testimonial) => (
              <TestimonialsCard key={testimonial.name} testimonial={testimonial} />
            ))}
          </InfiniteSlider>
        </div>
      </div>
    </section>
  );
}

function TestimonialsCard({
  testimonial,
  className,
  ...props
}: React.ComponentProps<"figure"> & {
  testimonial: Testimonial;
}) {
  const { quote, image, name, role } = testimonial;

  return (
    <figure
      className={cn(
        "w-full max-w-xs border gold-divider bg-[#061122]/74 p-8 shadow-[0_20px_70px_rgba(0,0,0,.24)] backdrop-blur-md",
        className,
      )}
      {...props}
    >
      <blockquote className="font-display text-2xl leading-snug text-blush-ink">
        "{quote}"
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <Avatar className="size-10">
          <AvatarImage alt={`${name} portrait`} src={image} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <cite className="not-italic leading-5 text-blush-ink">{name}</cite>
          <span className="text-xs uppercase leading-5 tracking-[.22em] text-blush-muted">
            {role}
          </span>
        </div>
      </figcaption>
    </figure>
  );
}

export default TestimonialsSection;
