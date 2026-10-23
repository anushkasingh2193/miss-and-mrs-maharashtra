import { quotes } from "@/data/site";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Testimonial = {
  quote: string;
  image: string;
  name: string;
  role: string;
};

const testimonials: Testimonial[] = quotes.slice(0, 3).map((quote) => ({
    quote: quote.text,
    image: quote.bg,
    name: quote.name,
    role: quote.role,
  }));

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

        <div className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialsCard key={testimonial.name} testimonial={testimonial} />
          ))}
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
        "h-full w-full border gold-divider bg-[#061122]/74 p-8 shadow-[0_20px_70px_rgba(0,0,0,.24)]",
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
