import { type CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { imageRoles, jury, mentors, type PageKey } from "@/data/site";

type Profile = (typeof mentors)[number] & { zoom?: number; origin?: string };

type PortraitStyle = CSSProperties & {
  "--portrait-zoom": number;
  "--portrait-hover-zoom": number;
};

function MentorProfile({ profile, featured = false }: { profile: Profile; featured?: boolean }) {
  const zoom = profile.zoom ?? 1.002;
  const portraitStyle: PortraitStyle = {
    objectPosition: profile.position,
    transformOrigin: profile.origin ?? "50% 50%",
    "--portrait-zoom": zoom,
    "--portrait-hover-zoom": zoom + 0.033,
  };

  return (
    <article className={`mentor-profile reveal${featured ? " mentor-profile--lead" : ""}`}>
      <div className="mentor-profile__portrait">
        <img
          src={profile.bg}
          alt={`${profile.name}, ${profile.role}`}
          style={portraitStyle}
          loading="lazy"
          decoding="async"
        />
        <div className="mentor-profile__shade" aria-hidden="true" />
      </div>
      <div className="mentor-profile__content">
        <p className="mentor-profile__role">{profile.role}</p>
        <h3>{profile.name}</h3>
        <p className="mentor-profile__bio">{profile.bio}</p>
      </div>
    </article>
  );
}

export function Mentors({ navigate }: { navigate: (page: PageKey) => void }) {
  const leadership = mentors.slice(0, 2);
  const faculty = mentors.slice(2);

  return (
    <div className="mentor-page">
      <section className="mentor-hero">
        <div className="content-wrap mentor-hero__inner">
          <div className="mentor-hero__copy reveal">
            <p className="mentor-hero__label">Season faculty and guest jury</p>
            <h1>Guidance for every stage.</h1>
            <p className="mentor-hero__intro">
              Expert preparation in presentation, wellbeing, voice, styling and stage confidence from first briefing to finale night.
            </p>
            <dl className="mentor-hero__facts" aria-label="Mentorship programme at a glance">
              {[[mentors.length, "Mentors"], [jury.length, "Jury voices"], ["3", "Audition cities"]].map(([value, label]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className="mentor-hero__visual reveal">
            <div className="mentor-hero__frame">
              <img
                src={imageRoles.mentorHero}
                alt="Mrs. Kavita Kharayat, fashion grooming and stylist expert"
                style={{ objectPosition: "50% 8%" }}
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
              <div className="mentor-hero__shade" aria-hidden="true" />
              <figcaption>
                <span>Season faculty</span>
                <strong>Mentorship with presence.</strong>
              </figcaption>
            </div>
          </figure>
        </div>
      </section>

      <section className="mentor-roster section-pad">
        <div className="content-wrap">
          <header className="mentor-section-heading reveal">
            <div>
              <p>Leadership and faculty</p>
              <h2>Meet the people behind the preparation.</h2>
            </div>
            <p>
              A multidisciplinary team helps contestants build the composure, clarity and professional habits expected of a titleholder.
            </p>
          </header>

          <div className="mentor-leadership-grid">
            {leadership.map((profile) => (
              <MentorProfile key={profile.name} profile={profile} featured />
            ))}
          </div>

          <div className="mentor-subsection-title reveal">
            <h2>Specialist faculty</h2>
            <span>{faculty.length} experts</span>
          </div>
          <div className="mentor-faculty-grid">
            {faculty.map((profile) => (
              <MentorProfile key={profile.name} profile={profile} />
            ))}
          </div>
        </div>
      </section>

      <section className="mentor-jury-section section-pad">
        <div className="content-wrap">
          <header className="mentor-section-heading mentor-section-heading--jury reveal">
            <div>
              <p>Guest jury</p>
              <h2>Perspective from stage, screen and pageantry.</h2>
            </div>
            <p>Artists, titleholders and industry guests bring an experienced outside eye to the Maharashtra stage.</p>
          </header>

          <div className="mentor-jury-grid">
            {jury.map((member) => (
              <article key={member.name} className="mentor-jury-card reveal">
                <img
                  src={member.bg}
                  alt={`${member.name}, ${member.role}`}
                  style={{ objectPosition: member.position }}
                  loading="lazy"
                  decoding="async"
                />
                <div className="mentor-jury-card__shade" aria-hidden="true" />
                <div className="mentor-jury-card__caption">
                  <p>{member.role}</p>
                  <h3>{member.name}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mentor-cta section-pad">
        <div className="content-wrap mentor-cta__inner reveal">
          <div>
            <p>Prepare with purpose</p>
            <h2>Ready to begin your titleholder journey?</h2>
          </div>
          <div className="mentor-cta__actions">
            <button type="button" className="gold-cta" onClick={() => navigate("register")}>
              Register interest <ArrowRight size={16} aria-hidden="true" />
            </button>
            <button type="button" className="mentor-cta__secondary" onClick={() => navigate("contact")}>
              Meet the team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
