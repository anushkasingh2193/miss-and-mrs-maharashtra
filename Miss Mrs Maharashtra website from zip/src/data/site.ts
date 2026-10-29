export type PageKey =
  | "home"
  | "about"
  | "categories"
  | "register"
  | "mentors"
  | "winners"
  | "sponsors"
  | "press"
  | "contact";

export const IMG = "https://missandmrsmaharashtra.org/public/";
const LOCAL = "/missmrs-assets/";
const FAST = `${LOCAL}fast/`;
const WEBSITE_ZIP = `${LOCAL}website-zip/`;
const PORTRAIT_WEBSITE_ZIP = `${LOCAL}website-zip-portrait/`;
const CURATED = `${LOCAL}curated/`;
const DRIVE_MM = `${LOCAL}drive-mm/`;
const SEASON_3_WINNERS = `${LOCAL}season-3-winners/`;

const stock = {
  runway: `${FAST}runway.jpg`,
  crown: `${FAST}crown.jpg`,
  portrait: `${FAST}portrait.jpg`,
  stage: `${FAST}stage.jpg`,
  gown: `${FAST}gown.jpg`,
  audience: `${LOCAL}testimonial/IMG_9411.JPG.jpeg`,
  backstage: `${FAST}backstage.jpg`,
  makeup: `${FAST}makeup.jpg`,
  women: `${LOCAL}images/image-1.png`,
  celebration: `${FAST}celebration.jpg`,
  headshot: `${LOCAL}images/siraj.png`,
  fashion: `${LOCAL}gallery/DSC00068.JPG`,
};

export const mAndMWinnerImages = [
  `${DRIVE_MM}DSC00068.jpg`,
  `${DRIVE_MM}DSC00076.jpg`,
  `${DRIVE_MM}DSC00082.jpg`,
  `${DRIVE_MM}DSC00092.jpg`,
  `${DRIVE_MM}DSC00097.jpg`,
  `${DRIVE_MM}TS102025.jpg`,
  `${DRIVE_MM}TS102029.jpg`,
  `${DRIVE_MM}TS102043.jpg`,
  `${DRIVE_MM}TS102060.jpg`,
  `${DRIVE_MM}DSC07912.jpg`,
  `${DRIVE_MM}DSC09813.jpg`,
  `${DRIVE_MM}DSC09835.jpg`,
];

export const mAndMWinnerPortfolio = [
  { image: mAndMWinnerImages[0], eyebrow: "M&M / Season 3", name: "Sash & Crown Study", title: "Mrs. Maharashtra titleholder portrait" },
  { image: mAndMWinnerImages[1], eyebrow: "M&M / Season 3", name: "Blue Gown Portrait", title: "Winner portfolio frame" },
  { image: mAndMWinnerImages[2], eyebrow: "M&M / Season 3", name: "Finale Walk", title: "Stage presence moment" },
  { image: mAndMWinnerImages[3], eyebrow: "M&M / Season 3", name: "Silver Crown Moment", title: "Titleholder editorial" },
  { image: mAndMWinnerImages[5], eyebrow: "M&M / Season 3", name: "Coronation Portrait", title: "Winner stage feature" },
  { image: mAndMWinnerImages[10], eyebrow: "M&M / Season 3", name: "Titleholder Lineup", title: "Finale group coverage" },
];

export const homepageWinnerSlider = [
  { image: `${CURATED}sneha-kalbhor.jpg`, name: "Sneha Kalbhor", place: "Winner", title: "Winner / Mrs. Maharashtra / Season 2" },
  { image: `${CURATED}apoorva-shirbhate.jpg`, name: "Apoorva Shirbhate", place: "1st Runner-Up", title: "1st Runner-Up / Mrs. Maharashtra / Season 2" },
  { image: `${CURATED}archana-kamble.jpg`, name: "Archana Kamble", place: "2nd Runner-Up", title: "2nd Runner-Up / Mrs. Maharashtra / Season 2" },
  { image: "https://missandmrsmaharashtra.org/public/images/winners/Khushi-Chawre-Image-min.png", name: "Khushi Chawre", place: "Winner", title: "Winner / Miss Maharashtra / Season 1" },
  { image: "https://missandmrsmaharashtra.org/public/images/winners/1st-runner-up-mrs-category-Mrs-Trupti-Apreja-scaled.jpg", name: "Trupti Apreja", place: "1st Runner-Up", title: "1st Runner-Up / Mrs. Maharashtra / Season 1" },
  { image: "https://missandmrsmaharashtra.org/public/images/winners/2nd-runner-up-miss-category-Miss-Sonali-Bisen-scaled.jpg", name: "Sonali Bisen", place: "2nd Runner-Up", title: "2nd Runner-Up / Miss Maharashtra / Season 1" },
  { image: "https://missandmrsmaharashtra.org/public/images/winners/2ns-runner-up-mrs-category-Mrs-Anita-Nandanwar-scaled.jpg", name: "Anita Nandanwar", place: "2nd Runner-Up", title: "2nd Runner-Up / Mrs. Maharashtra / Season 1" },
];

export const imageRoles = {
  homeHeroPoster: `${LOCAL}videos/contestants-runway-hero-poster.jpg`,
  brandProof: mAndMWinnerImages[10],
  founderPortrait: `${FAST}zoya.jpg`,
  titleMiss: `${LOCAL}featured/title-miss-maharashtra.jpg`,
  titleMrs: `${LOCAL}featured/title-mrs-maharashtra.jpg`,
  mentorHero: `${LOCAL}mentor/kavita-kharayat.webp`,
  sponsorHero: `${PORTRAIT_WEBSITE_ZIP}M&M/M&M s3 winners/TS102046.jpg`,
  sponsorProof: stock.makeup,
  titleholderSpotlight: mAndMWinnerImages[0],
  galleryHero: mAndMWinnerImages[10],
};

export const navItems: Array<{ key: PageKey; label: string }> = [
  { key: "home", label: "Home" },
  { key: "about", label: "About" },
  { key: "categories", label: "Categories" },
  { key: "mentors", label: "Mentors" },
  { key: "winners", label: "Winners" },
  { key: "press", label: "News" },
  { key: "contact", label: "Contact" },
];

export const gallery = [
  `${CURATED}sneha-kalbhor.jpg`,
  `${CURATED}apoorva-shirbhate.jpg`,
  `${CURATED}archana-kamble.jpg`,
  `${FAST}zoya.jpg`,
  `${PORTRAIT_WEBSITE_ZIP}M&M/M&M s3 winners/TS102025.jpg`,
  `${PORTRAIT_WEBSITE_ZIP}MIS/s3 winners/TS102092.jpg`,
  `${PORTRAIT_WEBSITE_ZIP}MIS/s3 winners/TS102120.jpg`,
  `${PORTRAIT_WEBSITE_ZIP}MIS/s3 winners/TS102122.jpg`,
  stock.women,
  stock.makeup,
  `${LOCAL}mentor/mentor_kavita-1367x2048.jpg`,
];

export const zipWinnerGallery = [
  `${WEBSITE_ZIP}M&M/M&M s1 winners/3R6A5322.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s1 winners/3R6A5339.JPG.jpeg`,
  `${WEBSITE_ZIP}M&M/M&M s1 winners/3R6A5340.JPG.jpeg`,
  `${WEBSITE_ZIP}M&M/M&M s1 winners/AKAL3979.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s1 winners/AKAL3983.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s1 winners/AKAL4002.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s1 winners/AKAL4019.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s1 winners/AKAL4027.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s1 winners/AKAL4034.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s1 winners/DSC_6282.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s1 winners/DSC_6412.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s1 winners/DSC_6437.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s1 winners/DSC_6501.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s1 winners/DSC_6539.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s1 winners/DSC_6613.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s1 winners/DSC_6617.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s1 winners/DSC_6792.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s1 winners/DSC_6805.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s1 winners/DSC_6809.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s1 winners/DSC_6821.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s2 winners/DSC_0418.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s2 winners/ZOHR1935.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s2 winners/ZOHR1945.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s2 winners/ZOHR1949.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s2 winners/ZOHR1975.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s2 winners/ZOHR1976.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s2 winners/ZOHR2004.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s2 winners/ZOHR2006.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s2 winners/ZOHR2029.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s2 winners/ZOHR2042.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s3 winners/DSC00068.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s3 winners/DSC00083.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s3 winners/DSC00089.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s3 winners/DSC00099.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s3 winners/DSC09998.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s3 winners/TS101775.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s3 winners/TS101776.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s3 winners/TS101964.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s3 winners/TS101968.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s3 winners/TS101987.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s3 winners/TS101988.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s3 winners/TS102002.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s3 winners/TS102011.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s3 winners/TS102014.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s3 winners/TS102025.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s3 winners/TS102031.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s3 winners/TS102033.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s3 winners/TS102042.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s3 winners/TS102046.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s3 winners/TS102050.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s3 winners/TS102061.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s3 winners/TS102063.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s3 winners/TS102072.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s3 winners/TS102076.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s3 winners/TS102080.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s3 winners/TS108536.JPG`,
  `${WEBSITE_ZIP}M&M/M&M s3 winners/TS108538.JPG`,
  `${WEBSITE_ZIP}MIS/s2 Winners/navdeep.png`,
  `${WEBSITE_ZIP}MIS/s2 Winners/Screenshot 2026-08-04 141128.png`,
  `${WEBSITE_ZIP}MIS/s2 Winners/ZOHR2080.JPG`,
  `${WEBSITE_ZIP}MIS/s2 Winners/ZOHR2081.JPG`,
  `${WEBSITE_ZIP}MIS/s2 Winners/ZOHR2089.JPG`,
  `${WEBSITE_ZIP}MIS/s2 Winners/ZOHR2090.JPG`,
  `${WEBSITE_ZIP}MIS/s2 Winners/ZOHR2413.JPG`,
  `${WEBSITE_ZIP}MIS/s3 winners/DSC_8878.JPG`,
  `${WEBSITE_ZIP}MIS/s3 winners/TS102092.JPG`,
  `${WEBSITE_ZIP}MIS/s3 winners/TS102120.JPG`,
  `${WEBSITE_ZIP}MIS/s3 winners/TS102122.JPG`,
  `${WEBSITE_ZIP}MIS/s3 winners/TS102124.JPG`,
  `${WEBSITE_ZIP}MIS/s3 winners/TS102129.JPG`,
  `${WEBSITE_ZIP}MIS/s3 winners/TS102131.JPG`,
  `${WEBSITE_ZIP}MIS/s3 winners/TS102133.JPG`,
  `${WEBSITE_ZIP}MIS/s3 winners/TS102142.JPG`,
  `${WEBSITE_ZIP}MIS/s3 winners/TS102145.JPG`,
  `${WEBSITE_ZIP}MIS/s3 winners/TS102148.JPG`,
  `${WEBSITE_ZIP}MS/winners/TS100950.JPG`,
  `${WEBSITE_ZIP}MS/winners/TS100967.JPG`,
  `${WEBSITE_ZIP}MS/winners/TS101267.JPG`,
  `${WEBSITE_ZIP}MS/winners/TS101268.JPG`,
  `${WEBSITE_ZIP}MS/winners/TS101269.JPG`,
  `${WEBSITE_ZIP}MS/winners/TS102272.JPG`,
  `${WEBSITE_ZIP}MS/winners/TS102275.JPG`,
  `${WEBSITE_ZIP}MS/winners/TS102292.JPG`,
  `${WEBSITE_ZIP}MS/winners/TS102299.JPG`,
  `${WEBSITE_ZIP}MS/winners/TS102302.JPG`,
  `${WEBSITE_ZIP}MS/winners/TS102311.JPG`,
  `${WEBSITE_ZIP}MS/winners/TS102314.JPG`,
  `${WEBSITE_ZIP}MS/winners/TS102317.JPG`,
  `${WEBSITE_ZIP}MS/winners/TS102338.JPG`,
  `${WEBSITE_ZIP}MS/winners/TS102339.JPG`,
  `${WEBSITE_ZIP}MS/winners/TS102347.JPG`,
];

const portraitZipImage = (image: string) => image.replace(WEBSITE_ZIP, PORTRAIT_WEBSITE_ZIP).replace(/\.[^/.]+$/, ".jpg");
const portraitZipWinnerGallery = zipWinnerGallery.map(portraitZipImage);

export const winnersGallery = [
  ...portraitZipWinnerGallery,
  ...gallery,
  `${LOCAL}testimonial/DSC00092.JPG`,
  `${LOCAL}testimonial/IMG_9405.JPG_5.jpeg`,
  `${LOCAL}testimonial/IMG_9410.JPG.jpeg`,
  `${LOCAL}testimonial/IMG_9411.JPG.jpeg`,
  `${LOCAL}testimonial/IMG_9412.JPG.jpeg`,
  `${LOCAL}testimonial/IMG_9413.JPG.jpeg`,
  `${LOCAL}testimonial/IMG_9414.JPG.jpeg`,
  `${LOCAL}testimonial/IMG_9415.JPG.jpeg`,
  `${LOCAL}mentor/Zoya-sheikh--scaled.jpg`,
  `${LOCAL}mentor/Megha-kapoor-amesar-1367x2048.jpg`,
  `${LOCAL}mentor/mentor_kavita-1367x2048.jpg`,
  `${LOCAL}mentor/WhatsApp-Image-2024-01-02-at-5.24.03-PM.jpeg`,
];

export const winnerSeasonGroups = [
  {
    eyebrow: "Mrs. Maharashtra",
    title: "Season 1 Winners",
    note: "The first titleholder archive from the Miss & Mrs. Maharashtra stage.",
    images: [
      `${PORTRAIT_WEBSITE_ZIP}M&M/M&M s1 winners/AKAL3979.jpg`,
      `${PORTRAIT_WEBSITE_ZIP}M&M/M&M s1 winners/AKAL4002.jpg`,
      `${PORTRAIT_WEBSITE_ZIP}M&M/M&M s1 winners/DSC_6501.jpg`,
      `${PORTRAIT_WEBSITE_ZIP}M&M/M&M s1 winners/DSC_6792.jpg`,
    ],
  },
  {
    eyebrow: "Mrs. Maharashtra",
    title: "Season 2 Winners",
    note: "Crowning portraits, runway frames and titleholder moments from Season 2.",
    images: [
      `${CURATED}sneha-kalbhor.jpg`,
      `${CURATED}apoorva-shirbhate.jpg`,
      `${CURATED}archana-kamble.jpg`,
    ],
  },
  {
    eyebrow: "Mrs. Maharashtra",
    title: "Season 3 Winners",
    note: "Mrs. Maharashtra winner, first runner-up and second runner-up from Season 3.",
    images: [
      `${SEASON_3_WINNERS}mrs-maharashtra-winner.jpg`,
      `${SEASON_3_WINNERS}mrs-maharashtra-first-runner-up.jpg`,
      `${SEASON_3_WINNERS}mrs-maharashtra-second-runner-up.jpg`,
    ],
  },
  {
    eyebrow: "Miss Maharashtra",
    title: "Season 2 Winners",
    note: "Miss category titleholder images from the Season 2 winner archive.",
    images: [
      `${PORTRAIT_WEBSITE_ZIP}MIS/s2 Winners/navdeep.jpg`,
      `${PORTRAIT_WEBSITE_ZIP}MIS/s2 Winners/ZOHR2080.jpg`,
      `${PORTRAIT_WEBSITE_ZIP}MIS/s2 Winners/ZOHR2090.jpg`,
    ],
  },
  {
    eyebrow: "Miss Maharashtra",
    title: "Season 3 Winners",
    note: "Miss category titleholder, first runner-up and second runner-up from Season 3.",
    images: [
      `${SEASON_3_WINNERS}miss-supraglobal-india.jpg`,
      `${SEASON_3_WINNERS}miss-maharashtra-first-runner-up.jpg`,
      `${SEASON_3_WINNERS}miss-maharashtra-second-runner-up.jpg`,
    ],
  },
  {
    eyebrow: "Miss Supraglobal",
    title: "Winner Gallery",
    note: "Featured winner portraits from the companion crown pathway.",
    images: [
      `${PORTRAIT_WEBSITE_ZIP}MS/winners/TS100950.jpg`,
      `${PORTRAIT_WEBSITE_ZIP}MS/winners/TS102272.jpg`,
      `${PORTRAIT_WEBSITE_ZIP}MS/winners/TS102292.jpg`,
      `${PORTRAIT_WEBSITE_ZIP}MS/winners/TS102311.jpg`,
      `${PORTRAIT_WEBSITE_ZIP}MS/winners/TS102338.jpg`,
    ],
  },
];

export const stats = [
  { n: "120+", label: "Women trained" },
  { n: "1,000", label: "Finale guests" },
  { n: "18", label: "Designer looks" },
  { n: "40+", label: "Mentors, jury & guests" },
];

export const journey = [
  { no: "01", title: "Submit your interest", body: "Choose Miss or Mrs. Maharashtra, select your audition city and tell the team what the crown would mean for you." },
  { no: "02", title: "Meet the panel", body: "Walk, introduce yourself and speak with the selection team in a city audition built for first-timers and experienced contestants." },
  { no: "03", title: "Train like a finalist", body: "Grooming covers ramp, voice, styling, interview technique, advocacy and stage confidence." },
  { no: "04", title: "Build your portfolio", body: "Finalists receive editorial images and content moments they can use for modelling, media and professional visibility." },
  { no: "05", title: "Own finale night", body: "Four rounds before guests, press and jury, followed by a titleholder year with appearances and national pathway consideration." },
];

export const interestCities = ["Nagpur", "Pune", "Mumbai", "Other Maharashtra city"];

export const categories = [
  {
    key: "miss",
    title: "Miss Maharashtra",
    who: "Single and unmarried women and girls of Maharashtra.",
    pathway: "Miss Supraglobal and Miss Summit International",
    bg: imageRoles.titleMiss,
  },
  {
    key: "mrs",
    title: "Mrs. Maharashtra",
    who: "Married, divorced, widowed women, and single mothers.",
    pathway: "Mrs. India Supranational and Women of the Universe",
    bg: imageRoles.titleMrs,
  },
] as const;

export const pillars = [
  { num: "01", title: "Runway training", body: "Learn posture, pacing, turns and camera awareness before stepping into designer-led finale rounds.", bg: `${LOCAL}pillars-upright/runway-royalty.jpg`, caption: "Opening walk, Season 3", position: "50% 18%" },
  { num: "02", title: "Talent presentation", body: "Shape a ninety-second talent moment that feels confident, stage-ready and true to your story.", bg: `${LOCAL}pillars-upright/talent-showcase.jpg`, caption: "Showcase round, Nagpur", position: "48% 18%" },
  { num: "03", title: "Advocacy voice", body: "Prepare the cause you want to carry as a titleholder, with guidance on clarity, confidence and public impact.", bg: `${LOCAL}pillars-upright/empowering-voices.jpg`, caption: "Advocacy briefing, backstage", position: "50% 18%" },
  { num: "04", title: "Finale presence", body: "A polished coronation night with press, guests, jury and production standards built for a serious state stage.", bg: `${LOCAL}pillars-upright/evening-gala.jpg`, caption: "Coronation night, Civil Lines", position: "50% 18%" },
];

export const timeline = [
  { when: "2022", title: "The founder is crowned", body: "Zoya Sheikh wins Mrs. Maharashtra, then places 3rd Runner-up at Mrs. Universe among 106 international participants." },
  { when: "2023", title: "The idea", body: "Zoya and Siraj Sheikh set out to build a state pageant of national production standard, based in Nagpur." },
  { when: "2024", title: "Season 1", body: "First edition crowned in both categories, with Shreyas Talpade and Sonal Naik on the jury." },
  { when: "2025", title: "Season 2", body: "Sneha Kalbhor crowned Mrs. Maharashtra; the gala sold out eleven days ahead of the night." },
  { when: "2026", title: "Season 3", body: "Auditions expand to Pune and Mumbai. Finale moves to a 1,000-seat venue in Civil Lines, Nagpur." },
];

export const values = [
  { title: "Empowerment", body: "A celebration of women with the courage to dream big, build confidence and step onto a stage that takes them seriously." },
  { title: "Personal growth", body: "Sharper communication, leadership practice, mentoring, styling and professional poise." },
  { title: "Global impact", body: "Titleholders continue toward national and international pageant platforms." },
  { title: "Social impact", body: "Every contestant carries a cause and learns how to turn advocacy into practical work." },
];

export const archive = [
  { no: "I", title: "Backstage calm", image: gallery[0] },
  { no: "II", title: "Runway light", image: gallery[5] },
  { no: "III", title: "Coronation night", image: gallery[4] },
  { no: "IV", title: "Titleholder portrait", image: gallery[1] },
];

export const scoring = [
  { no: "01", round: "Personal interview", note: "Closed jury panel, ten minutes", weight: "30%" },
  { no: "02", round: "Advocacy round", note: "Your cause, argued on stage", weight: "25%" },
  { no: "03", round: "Talent showcase", note: "Ninety seconds, your choice", weight: "20%" },
  { no: "04", round: "Designer runway", note: "Two walks, styled by the house", weight: "15%" },
  { no: "05", round: "Question on stage", note: "Unseen, live, finale night", weight: "10%" },
];

export const mentors = [
  { name: "Mrs. Zoya Siraj Sheikh", role: "Founder & Chairman", bio: "Interior designer, Founder and MD of Kara Zoya Pvt Ltd. Mrs. Maharashtra 2022 and 3rd Runner-up at Mrs. Universe.", bg: `${FAST}zoya.jpg`, position: "50% 8%" },
  { name: "Mr. Siraj Sheikh", role: "Chairman", bio: "Founder of BTP Group. Leads production, partnerships and the titleholder pathway.", bg: `${LOCAL}mentor/mentor_siraz_sheikh-1367x2048.jpg`, position: "50% 0%" },
  { name: "Mrs. Kavita Kharayat", role: "Fashion Grooming & Stylist Expert", bio: "Guides contestants in styling, posture, pacing and confident runway presence.", bg: `${LOCAL}mentor/kavita-kharayat.webp`, position: "50% 4%" },
  { name: "Mr. Sunny Kamble", role: "Show Choreographer & Ramp Walk Trainer", bio: "Builds polished runway movement, stage formations and confident presentation for every show round.", bg: `${LOCAL}mentor/sunny-kamble-drive.webp`, position: "50% 5%" },
  { name: "Megha Kapoor Amesar", role: "Makeover Expert", bio: "Heads hair and makeup for all rounds, and teaches contestants to create polished looks with confidence.", bg: `${LOCAL}mentor/megha-kapoor-amesar-drive.webp`, position: "50% 5%" },
  { name: "Mrs. Sonali Nakshine", role: "Voice Modulation Expert", bio: "Prepares contestants for interviews, public speaking and live on-stage questions.", bg: `${LOCAL}mentor/sonali-nakshine-drive.webp`, position: "50% 5%" },
  { name: "Dr. Girish Chabrani", role: "Smile Expert", bio: "Guides contestants on smile aesthetics, oral presentation and confident stage-ready expression.", bg: `${LOCAL}mentor/dr-girish-chabrani-confirmed.png`, position: "50% 50%" },
  { name: "Dr. Anshul Jain", role: "Skin Expert", bio: "Shares practical skin-care guidance for healthy, camera-ready confidence throughout the season.", bg: `${LOCAL}mentor/dr-anshul-jain-confirmed.png`, position: "50% 10%" },
  { name: "Mrs. Soniya Khatri", role: "Diet Expert", bio: "Supports balanced nutrition, steady energy and sustainable routines through the pageant journey.", bg: `${LOCAL}mentor/soniya-khatri-confirmed.png`, position: "50% 8%" },
  { name: "Dr. Shivangi Garg", role: "Mental Health Expert", bio: "Helps contestants build resilience, emotional balance and calm confidence under pressure.", bg: `${LOCAL}mentor/dr-shivangi-garg-confirmed.webp`, position: "50% 8%" },
];

export const jury = [
  { name: "Shreyas Talpade", role: "Actor, Jury S1", bg: `${LOCAL}mentor/img_9410-optimized.webp`, position: "50% 6%" },
  { name: "Sonal Naik", role: "Actress, Jury S1", bg: `${LOCAL}mentor/img_9413-optimized.webp`, position: "50% 6%" },
  { name: "Neha Dhupia", role: "Judge, Supranational", bg: `${LOCAL}testimonial/image-1757942830364-104750829.jpg`, position: "50% 6%" },
  { name: "Terence Lewis", role: "Special Guest S2", bg: `${LOCAL}testimonial/image-1757942638238-755557391.jpg`, position: "50% 6%" },
  { name: "Sandhya Shetty", role: "Anchor, Season 1", bg: `${CURATED}sandhya-shetty.jpg`, position: "50% 6%" },
  { name: "Mr. & Mrs. Kothari", role: "Jury, Season 1", bg: `${LOCAL}mentor/img_9411-optimized.webp`, position: "50% 6%" },
  { name: "Anjali Rathee", role: "Mrs. India 2024", bg: `${CURATED}anjali-rathee.jpg`, position: "50% 6%" },
  { name: "Shweta Pote", role: "Guest, Season 1", bg: `${LOCAL}mentor/img_9414-optimized.webp`, position: "50% 6%" },
];

export const titleholders = [
  { plate: "Plate 01", title: "Winner, Mrs. Maharashtra 2025", name: "Sneha Kalbhor", quote: "A powerful journey of self-discovery and confidence.", bg: `${CURATED}sneha-kalbhor.jpg` },
  { plate: "Plate 02", title: "1st Runner-Up, Mrs. 2025", name: "Apoorva Shirbhate", quote: "A testament to perseverance, passion and personal growth.", bg: `${CURATED}apoorva-shirbhate.jpg` },
  { plate: "Plate 03", title: "2nd Runner-Up, 2025", name: "Archana Kamble", quote: "An inspiring journey that helped me celebrate individuality.", bg: `${CURATED}archana-kamble.jpg` },
  { plate: "Plate 04", title: "Founder, Mrs. Maharashtra 2022", name: "Zoya Siraj Sheikh", quote: "The season that started this platform.", bg: `${FAST}zoya.jpg` },
  { plate: "Plate 05", title: "Special Guest, Season 2", name: "Anjali Rathee", quote: "A beautiful celebration of womanhood.", bg: `${CURATED}anjali-rathee.jpg` },
  { plate: "Plate 06", title: "Anchor, Season 1", name: "Sandhya Shetty", quote: "Beauty, confidence, talent and empowerment.", bg: `${CURATED}sandhya-shetty.jpg` },
];

export const quotes = [
  { text: "An excellent platform for participants to showcase their talent, confidence and potential at the next level.", name: "Shreyas Talpade", role: "Actor, Jury Season 1", bg: `${LOCAL}testimonial/IMG_9410.JPG.jpeg` },
  { text: "The participants are incredibly talented and confident, with amazing energy and enthusiasm.", name: "Sonal Naik", role: "Actress, Jury Season 1", bg: `${LOCAL}testimonial/IMG_9413.JPG.jpeg` },
  { text: "A fantastic event with talented contestants. Wishing everyone a bright future: beauty with brains.", name: "Terence Lewis", role: "Special Guest, Season 2", bg: `${LOCAL}testimonial/image-1757942638238-755557391.jpg` },
];

export const tickets = [
  { name: "Gallery", perk: "Reserved seating with full-stage view", price: "Rs. 1,500" },
  { name: "Premium", perk: "Front-block seating, welcome drink and priority entry", price: "Rs. 4,000" },
  { name: "Patron's Table", perk: "Table of ten with after-party access and programme credit", price: "Rs. 45,000" },
];

export const sponsorNames = ["Beauty & Makeup", "Designer Wardrobe", "Hospitality", "Media Coverage", "Wellness Partner", "Gifting Partner"];

export const homepageSponsors = [
  { name: "Prime White", logo: `${WEBSITE_ZIP}M&M/sponsor/PRIME WHITE.png` },
  { name: "Norbexi", logo: `${WEBSITE_ZIP}M&M/sponsor/Norbexi PNG Logo  (1).png` },
  { name: "Karan Kothari", logo: `${WEBSITE_ZIP}M&M/sponsor/Karan Kothari Logo.png` },
  { name: "C9 Beverages", logo: `${WEBSITE_ZIP}M&M/sponsor/C9 beverages logo.png` },
  { name: "BTP Group", logo: `${WEBSITE_ZIP}M&M/sponsor/btp group.png` },
  { name: "GB", logo: `${WEBSITE_ZIP}M&M/sponsor/gb-logo (1).png` },
];

export const tiers = [
  { tier: "Associate", price: "Rs. 1.5L", slots: "Six slots per season", bestFor: "Local visibility during auditions and finale week", perks: ["Logo on stage backdrop", "Four gala passes", "Social media feature post", "Programme half-page"] },
  { tier: "Powered By", price: "Rs. 6L", slots: "Two slots per season", bestFor: "Brands that want category-level presence", featured: true, perks: ["Category naming rights", "Ten gala passes", "Jury-round branding", "Titleholder appearance days x3"] },
  { tier: "Title Partner", price: "On request", slots: "One slot per season", bestFor: "Long-term brand ownership of the season", perks: ["Event renamed with your brand", "Stage presence", "Year-long ambassadorship", "Co-branded press"] },
];

export const partnerProof = {
  quote: "The titleholder appearances gave us visibility far beyond finale night.",
  name: "Megha Kapoor Amesar",
  role: "Megha's Makeover, Makeover Partner, Seasons 1 & 2",
};

export const documents = [
  "Government photo ID: Aadhaar, passport or driving licence.",
  "Domicile proof, or a document showing five years of residence in Maharashtra.",
  "Marriage certificate for Mrs. category only.",
  "Two digital photographs: one headshot without makeup and one full-length JPEG, minimum 2000px on the long edge.",
  "Bank details for the refundable security deposit, if you reach finale week.",
];

export const eligibility = [
  "Women of Maharashtra: domicile, or five years of residence in the state.",
  "Miss category: open to all single and unmarried women and girls.",
  "Mrs. category: open to married, divorced and widowed women, and single mothers.",
  "No minimum height, weight or complexion requirement.",
  "No prior national title held in the same category.",
  "Available for all four days of finale week in Nagpur, 18-21 November 2026.",
];

export const receives = [
  "Professional portfolio shoot and usable contestant media assets.",
  "Ramp, grooming, styling, voice and interview preparation before finale week.",
  "Designer wardrobe guidance and stage styling for runway rounds.",
  "Press, social and pageant-channel visibility through the season.",
  "National pathway consideration for Miss Supraglobal, Miss Summit International, Mrs. India Supranational and Women of the Universe.",
];

export const policies = [
  { title: "Application fee & refunds", body: "The Rs. 2,500 application fee covers your city audition and grooming day. It is non-refundable once the audition slot is confirmed. If we cancel or reschedule an audition and you cannot attend the new date, the fee is refunded in full within fourteen working days." },
  { title: "Withdrawal", body: "You may withdraw at any point up to seven days before the finale week without penalty. After that, wardrobe and production costs already committed in your name are non-recoverable." },
  { title: "Code of conduct", body: "Contestants, mentors, jury and crew work to a single written code: no discrimination on caste, religion, body type or marital status; no solicitation of contestants by sponsors or crew; no fees or gifts to jury members." },
  { title: "Safeguarding", body: "A named female chaperone is present at every audition, rehearsal and shoot. Changing areas are staffed and access-controlled. Contestants under 21 may bring one guardian to all events at no cost." },
  { title: "Image rights", body: "We use audition and event footage to promote the pageant. You keep the right to use your portfolio images for your own professional work, without restriction and without credit to us." },
];

export const videos = [
  { src: "https://www.youtube.com/embed/8kqrAmJsu84?si=0q2cbPQ75TgxnMLb", title: "Miss & Mrs. Maharashtra stage coverage", feature: "Main stage" },
  { src: "https://www.youtube.com/embed/KRnhxxDhM-8?si=X33TbI2ChdzX3or2", title: "Titleholder and contestant moments", feature: "Spotlight" },
  { src: "https://www.youtube.com/embed/Q0F9Arci1Eg?si=tob9obbRXQynS2jY", title: "Contestants on why they applied", feature: "Stories" },
  { src: "https://www.youtube.com/embed/TrnZrtVOJw0", title: "Season coverage and pageant highlights", feature: "Backstage" },
];

export const youtubeChannelUrl = "https://youtube.com/@missmrs.maharashtra?si=hPMFhDSZFTgQF2f0";

export const latestNews = [
  {
    src: videos[0].src,
    feature: "Main stage",
    date: "Oct 2026",
    title: "Season 3 enters finale preparation",
    summary: "With all three city auditions complete, selected contestants move into grooming, portfolio and finale-week preparation.",
  },
  {
    src: videos[1].src,
    feature: "Spotlight",
    date: "Oct 2026",
    title: "Inside the crown pathway",
    summary: "Contestants prepare for ramp, advocacy, interviews and the titleholder responsibilities that continue after coronation night.",
  },
  {
    src: videos[2].src,
    feature: "Stories",
    date: "Sep 2026",
    title: "Why women choose the pageant stage",
    summary: "Personal voices on confidence, representation, visibility and the decision to step into a public platform.",
  },
  {
    src: videos[3].src,
    feature: "Backstage",
    date: "Jun 2026",
    title: "Behind the crown: production notes",
    summary: "Backstage energy, titleholder moments, mentor preparation and the production discipline behind the season.",
  },
];

export const newsroomArticles = [
  {
    type: "Announcement",
    date: "Aug 2026",
    title: "Season 3 audition tour completed across three cities",
    summary: "Nagpur, Pune and Mumbai hosted the Season 3 selection tour before contestants moved into finale preparation.",
  },
  {
    type: "Contestant story",
    date: "Jul 2026",
    title: "From first walk to confident stage presence",
    summary: "A closer look at how grooming, interview preparation and runway practice help first-time contestants prepare for the finale.",
  },
  {
    type: "Media feature",
    date: "Jun 2026",
    title: "Inside the titleholder year after coronation night",
    summary: "Public appearances, shoots, advocacy moments and national pathways shape the months that follow the crown.",
  },
];

export const press = [
  { outlet: "Official release", head: "Season 3 completes auditions across Nagpur, Pune and Mumbai", date: "Oct 2026" },
  { outlet: "Pageant desk", head: "Miss & Mrs. Maharashtra moves into finale preparation", date: "Oct 2026" },
  { outlet: "Season coverage", head: "Coronation night brings finalists, designers and jury voices to Nagpur", date: "Dec 2025" },
  { outlet: "Titleholder update", head: "Mrs. Maharashtra titleholder pathway continues beyond the finale", date: "Dec 2025" },
];

export const pressKit = [
  { name: "Brand assets", meta: "Logo, lockups and approved pageant marks" },
  { name: "Season brief", meta: "Audition cities, format, dates and category overview" },
  { name: "Editorial images", meta: "Curated stage, titleholder and founder photography" },
  { name: "Founder profile", meta: "Zoya Siraj Sheikh biography and credentials" },
];

export const faqs = [
  { q: "Do I need modelling experience to apply?", a: "No. Most contestants have never walked a ramp. The grooming week prepares first-timers." },
  { q: "Is there a height or weight requirement?", a: "None. There is no minimum height, weight band or complexion criterion." },
  { q: "Can I apply if I have children?", a: "Yes. In the Mrs. category, mothers are explicitly welcome." },
  { q: "What does the Rs. 2,500 application fee cover?", a: "The city audition, grooming day and administrative processing. It does not guarantee selection." },
  { q: "When are the next auditions?", a: "Season 3 auditions are complete. Register your interest and the team will share next-season cities and dates when they are announced." },
  { q: "How long is the finale commitment?", a: "Four days in Nagpur, 18-21 November 2026." },
  { q: "What happens after I win?", a: "The title runs for a full year with public appearances, community programmes, content opportunities and national platform consideration." },
];

export const contactRows = [
  { k: "Office", v: "Kara Zoya Pvt Ltd, 3rd Floor, Sumit Apartments, Plot 493, Professor's Colony, Hanuman Nagar, Nagpur, Maharashtra 440024" },
  { k: "Email", v: "info@missandmrsmaharashtra.org" },
  { k: "Phone", v: "+91 93227 10192 · +91 75063 12201" },
  { k: "Hours", v: "Available all time" },
];

export const mapUrl = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d29773.42880645608!2d79.104182!3d21.125376!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c177501de04d%3A0xddc79fbb0639764a!2sKara%20Zoya%20Pvt%20Ltd.!5e0!3m2!1sen!2sus!4v1762935048528!5m2!1sen!2sus";
