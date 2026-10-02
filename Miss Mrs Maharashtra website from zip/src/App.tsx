import { useState } from "react";
import { Layout } from "@/components/Layout";
import { About } from "@/pages/About";
import { Categories } from "@/pages/Categories";
import { Contact } from "@/pages/Contact";
import { Home } from "@/pages/Home";
import { Mentors } from "@/pages/Mentors";
import { Press } from "@/pages/Press";
import { Register } from "@/pages/Register";
import { Sponsors } from "@/pages/Sponsors";
import { Winners } from "@/pages/Winners";
import type { PageKey } from "@/data/site";
import { useLuxuryHoverMotion } from "@/hooks/useLuxuryHoverMotion";

const pages: Record<PageKey, React.ComponentType<{ navigate: (page: PageKey) => void }>> = {
  home: Home,
  about: About,
  categories: Categories,
  register: Register,
  mentors: Mentors,
  winners: Winners,
  sponsors: Sponsors,
  press: Press,
  contact: Contact,
};

export default function App() {
  const [page, setPage] = useState<PageKey>("home");
  const Page = pages[page];
  useLuxuryHoverMotion();

  return (
    <Layout page={page} navigate={setPage}>
      <Page navigate={setPage} />
    </Layout>
  );
}
