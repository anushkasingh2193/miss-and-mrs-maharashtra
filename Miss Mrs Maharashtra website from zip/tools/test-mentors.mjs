import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const siteSource = readFileSync(new URL("../src/data/site.ts", import.meta.url), "utf8");
const mentorsPageSource = readFileSync(new URL("../src/pages/Mentors.tsx", import.meta.url), "utf8");
const mentorBlock = siteSource.match(/export const mentors = \[([\s\S]*?)\n\];\n\nexport const jury/);

assert.ok(mentorBlock, "mentor roster should be exported before the jury roster");

const expectedMentors = [
  ["Mrs. Zoya Siraj Sheikh", "Founder & Chairman"],
  ["Mr. Siraj Sheikh", "Chairman"],
  ["Mrs. Kavita Kharayat", "Fashion Grooming & Stylist Expert"],
  ["Megha Kapoor Amesar", "Makeover Expert"],
  ["Mrs. Sonali Nakshine", "Voice Modulation Expert"],
  ["Miss Mohini Sharma", "Mentor, Season 1"],
  ["Dr. Girish Chhabrani", "Smile Expert"],
  ["Dr. Anshul Jain", "Skin Expert"],
  ["Mrs. Soniya Khatri", "Diet Expert"],
  ["Dr. Shivangi Garg", "Mental Health Expert"],
];

for (const [name, role] of expectedMentors) {
  assert.match(mentorBlock[1], new RegExp(`name: "${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
  assert.match(mentorBlock[1], new RegExp(`role: "${role.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
}

assert.equal((mentorBlock[1].match(/\{ name:/g) ?? []).length, 10, "mentor roster should contain ten profiles");
assert.match(mentorBlock[1], /mentor\/dr-girish-chhabrani-provisional\.jpeg/);
assert.match(mentorBlock[1], /mentor\/dr-anshul-jain-provisional\.png/);
assert.match(mentorBlock[1], /mentor\/soniya-khatri-provisional\.png/);
assert.match(mentorBlock[1], /mentor\/dr-shivangi-garg-provisional\.png/);
assert.match(siteSource, /mentorHero: `\$\{LOCAL\}mentor\/kavita-kharayat\.webp`/);
assert.match(mentorBlock[1], /mentor\/kavita-kharayat\.webp/);
assert.match(siteSource, /mentor\/img_9410-optimized\.webp/);
assert.match(siteSource, /mentor\/img_9411-optimized\.webp/);
assert.match(siteSource, /mentor\/img_9412-optimized\.webp/);
assert.match(siteSource, /mentor\/img_9413-optimized\.webp/);
assert.match(siteSource, /mentor\/img_9414-optimized\.webp/);
assert.match(mentorsPageSource, /\[mentors\.length, "Mentors"\]/, "mentor count should follow the roster data");
assert.match(mentorsPageSource, /mentor-leadership-grid/, "mentors page should distinguish the leadership team");
assert.match(mentorsPageSource, /mentor-faculty-grid/, "mentors page should use a dedicated faculty layout");
assert.match(mentorsPageSource, /mentor-jury-grid/, "guest jury should use a dedicated editorial layout");
assert.match(mentorsPageSource, /Meet the people behind the preparation\./, "mentors page should explain the faculty section");

console.log("Mentor roster test passed: 10 profiles with current roles and provisional assets.");
